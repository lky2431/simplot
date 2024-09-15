import useRFStore, { RFState } from "@/store/rfStore";
import { shallow } from 'zustand/shallow';
import {
    ComposedChart,
    Line,
    Area,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Pie,
    Legend,
    Scatter,
    PieChart,
    Label,
    ResponsiveContainer,
    Cell,
} from 'recharts';
import { PlotType } from "@/types/PlotTypes";
import { OutputNodeData } from "@/Flow/Nodes/OutputNode";
import styled from "styled-components"
import { WindowData } from "@/types/windowData";
import { BackgroundData } from "@/types/backgroundData";
import { GraphDataType } from "@/types/handleTypes";
import { PresetScheme, PresetSchemeCSS } from "@/types/presetScheme";
import { useMemo, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Download, Save } from "lucide-react";
import { toPng } from 'html-to-image'
import { useToast } from "@/components/ui/use-toast";
import useProjectStore, { type ProjectState } from "@/store/projectStore"
import useImportedFileStore, { type ImportedFilesState } from "@/store/fileStore";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api"
import { Id } from "../../convex/_generated/dataModel"
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox"


const projectSelector = (state: ProjectState) => ({
    name: state.name,
    id: state.id,
    setName: state.setName,
    pub: state.public,
    setPublic: state.setPublic
})

const rfSelector = (state: RFState) => ({
    nodes: state.nodes,
    edges: state.edges,
    output: state.nodes.filter((node) => node.type == "output")[0] as OutputNodeData,
});

const fileSelector = (state: ImportedFilesState) => ({
    importedFiles: state.importedFiles
})


const colorSchemeOrder: number[] = [4, 5, 3, 6, 2, 7, 1, 8, 0, 9]

const RADIAN = Math.PI / 180;

const AspectContainer = styled.div`
    background: ${props => props.theme.backgroundColor};
    width:100%;
    aspect-ratio: ${props => props.theme.ratio};
    height:auto
    `;

const Title = styled.h6`
        color:${props => props.theme.color};
        text-align: center;
        margin-top: ${[props => props.theme.padding]}px;
        font-weight: bold;
        position:absolute;
        left: 0; 
        right: 0; 
        margin-inline: auto; 
    `

function Graph({ owned }: { owned: boolean }) {

    const { output, nodes, edges } = useRFStore(
        rfSelector,
        shallow
    );

    const { name, id, setName, pub, setPublic } = useProjectStore(
        projectSelector,
        shallow
    )

    const { importedFiles } = useImportedFileStore(
        fileSelector,
        shallow
    )

    const saveNewProject = useMutation(api.project.save_project)

    const { toast } = useToast()

    const ref = useRef<HTMLDivElement>(null)

    const downloadImage = useCallback(() => {
        if (ref.current === null) {
            return
        }

        toPng(ref.current, { cacheBust: true, })
            .then((dataUrl) => {
                const link = document.createElement('a')
                link.download = `image_${id}.png`
                link.href = dataUrl
                link.click()
            })
            .catch((err) => {
                console.log(err)
            })
    }, [ref])


    const saveProject = async () => {

        if (name) {
            console.log({
                id: id as Id<"project">,
                name: name!,
                nodes: nodes,
                edges: edges,
                importedFiles: importedFiles
            })
            await saveNewProject({
                id: id as Id<"project">,
                name: name!,
                nodes: nodes,
                edges: edges,
                importedFiles: importedFiles,
                pub: pub??false
            })
            toast({
                description: "project saved",
                variant: "default"
            })
        } else {
            console.log("no name")
        }
    }

    const datas: any[] = output.data.dataset.datas
    const window: WindowData = output.data.window
    const background: BackgroundData = output.data.background
    const colorScheme: PresetScheme = output.data.colorScheme ?? PresetScheme.default
    const theme = output.data.theme

    let menuBar = () => {
        if (owned) {
            return <div className="flex justify-end absolute  gap-4  w-full bg-neutral-900 p-4 items-center">
                <Input className="bg-none" value={name} onChange={(e) => {
                    setName(e.currentTarget.value)
                }} placeholder="project name" />
                <div className="flex items-center space-x-2 border border-neutral-600 p-2 rounded-full">
                    <Checkbox id="terms" className="w-4 h-4" checked={pub ?? false} onCheckedChange={(e) => {
                        setPublic(e as boolean)
                    }} />
                    <div className="w-2" />
                    <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Public
                    </label>
                </div>
                <div className=" hover:bg-neutral-700" onClick={saveProject}><Save /></div>
                <div className=" hover:bg-neutral-700" onClick={downloadImage}><Download /></div>
            </div>
        }
        return <div className="flex justify-end absolute  gap-4  w-full bg-neutral-900 p-4 items-center">
            <p className="grow">{name}</p>
            <div className=" hover:bg-neutral-700" onClick={downloadImage}><Download /></div>
        </div>

    }

    let renderData = useMemo(() => {
        if (datas.length == 0) {
            return []
        }
        const map = new Map();
        for (let i in datas) {
            let dataset = datas[i].dataset as any[]
            for (let j in dataset) {
                if (!map.has(dataset[j].x)) {
                    map.set(dataset[j].x, { [`${i}`]: dataset[j].y })
                } else {

                    map.set(dataset[j].x, {
                        ...map.get(dataset[j].x),
                        [`${i}`]: dataset[j].y
                    })
                }
            }
        }
        let _renderData: any[] = []
        map.forEach((value, key, map) => {
            _renderData.push({
                ...value,
                x: key
            })
        })
        return _renderData
    }, [datas])

    if (datas.length == 0) {
        return <div className="relative h-full w-full">
            {menuBar()}<div className="absolute m-auto inset-y-0 w-max h-max text-center inset-x-0">
                Attach data to output node to preview
            </div></div>
    }

    const aspectRatio: number = window?.aspectRatio ?? 1
    let backgroundColor: string
    if (background?.color) { //Color Background
        backgroundColor = background?.color.hex ?? "#dddddd"
    } else if (background?.color1 && background?.color2) { //Gradient Background
        backgroundColor = `linear-gradient(to top, ${background?.color1.hex} , ${background?.color2.hex});`
    } else if (background?.color1) {
        backgroundColor = background?.color1.hex ?? "#dddddd"
    } else {
        const t = theme ?? "dark"
        if (t == "light") {
            backgroundColor = "#fdfdfd"
        } else {
            backgroundColor = "#111111"
        }
    }







    const isContinuous = () => {
        return datas[0].datatype == GraphDataType.continousPlotData
    }

    const frameColor = () => {
        if (window?.color) {
            return window?.color
        }
        const t = theme ?? "dark"
        if (t == "light") {
            return "#999999"
        } else {
            return "#bbbbbb"
        }
    }

    const indexColor = (index: number) => {
        return PresetSchemeCSS[colorScheme][colorSchemeOrder[index % 10]];
    }

    const buildContent = () => {
        if (datas[0].plottype == PlotType.Pie) {
            return <AspectContainer theme={{
                ratio: aspectRatio,
                backgroundColor: backgroundColor
            }} ref={ref} >

                <Title theme={{
                    color: frameColor(),
                    padding: (window?.topMargin ?? 5) + 10
                }}>{window?.title}</Title>
                <ResponsiveContainer className={'p-2'} >
                    <PieChart margin={{ top: (window?.topMargin ?? 5) + ((window?.title ?? "").length > 0 ? 40 : 0), right: window?.rightMargin ?? 5, left: window?.leftMargin ?? 5, bottom: window?.bottomMargin ?? 5 }}>
                        {datas.map((data, index) => {
                            return <Pie
                                key={`${index}`}
                                dataKey={`${index}`}
                                data={renderData}
                                isAnimationActive={false}
                                innerRadius={datas[index].style.innerRadius ?? 0}
                                outerRadius={datas[index].style.outerRadius ?? 100}
                                label={(datas[index].style.showLabel ?? false) ? ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: { cx: number, cy: number, midAngle: number, innerRadius: number, outerRadius: number, percent: number, index: number }) => {
                                    const radius = (outerRadius) * 1.3;
                                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                                    const y = cy + radius * Math.sin(-midAngle * RADIAN);
                                    return (
                                        <text x={x} y={y} fill={frameColor()} textAnchor={'middle'} dominantBaseline="central" fontSize={window?.fontSize ?? 12}>
                                            {`${renderData[index].x}`}
                                        </text>
                                    );
                                } : undefined}>
                                {
                                    renderData.map((entry, index) => {
                                        return <Cell key={index} fill={indexColor(index)} style={{
                                            filter: `drop-shadow(0px 0px 8px ${indexColor(index)}`
                                        }}></Cell>
                                    })
                                }
                            </Pie>
                        })}
                    </PieChart>
                </ResponsiveContainer>
            </AspectContainer>
        }
        return <AspectContainer theme={{
            ratio: aspectRatio,
            backgroundColor: backgroundColor
        }} ref={ref}>
            <Title theme={{
                color: frameColor(),
                padding: (window?.topMargin ?? 5) + 10
            }}>{window?.title}</Title>



            <ResponsiveContainer className={'p-2'} >
                <ComposedChart margin={{
                    top: (window?.topMargin ?? 5) + ((window?.title ?? "").length > 0 ? 40 : 0),
                    right: window?.rightMargin ?? 5,
                    left: window?.leftMargin ?? 5,
                    bottom: window?.bottomMargin ?? 5
                }} data={renderData}>
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    {
                        datas.map((data, index) => {
                            switch (data.plottype) {
                                case PlotType.Bar:
                                    return <Bar key={index} dataKey={`${index}`} barSize={20} fill={indexColor(index)} stackId={datas[index].stackId} isAnimationActive={false} style={{
                                        filter: `drop-shadow(0px 0px 10px ${indexColor(index)}`
                                    }}></Bar>
                                case PlotType.Line:
                                    return <Line key={index} type="monotone" dataKey={`${index}`} strokeWidth={data.style.strokeWidth} isAnimationActive={false} dot={false} stroke={data.style.color ?? indexColor(index)} style={{
                                        filter: `drop-shadow(0px 0px 10px ${indexColor(index)}`
                                    }} ></Line>
                                case PlotType.Scatter:
                                    return <Scatter key={index} dataKey={`${index}`} isAnimationActive={false} fill={indexColor(index)} style={{
                                        filter: `drop-shadow(0px 0px 10px ${indexColor(index)}`
                                    }}></Scatter>
                                case PlotType.Area:
                                    return <Area key={index} type="monotone" dataKey={`${index}`} isAnimationActive={false} fill={indexColor(index)} stroke={PresetSchemeCSS[colorScheme][9]} stackId={datas[index].stackId} style={{
                                        filter: `drop-shadow(0px 0px 10px ${indexColor(index)}`
                                    }}></Area>
                            }
                        })
                    }
                    {((window?.showXGrid ?? true) || (window?.showYGrid ?? true)) && <CartesianGrid horizontal={window?.showXGrid ?? true} vertical={window?.showYGrid ?? true} stroke={frameColor()} />}
                    <XAxis type={isContinuous() ? "number" : "category"} dataKey="x" tick={{ fontSize: window?.fontSize ?? 12 }} hide={!(window?.showXAxis ?? true)} stroke={frameColor()} >
                        {
                            window?.xAxisLabel && <Label value={window?.xAxisLabel} offset={-8} position="insideBottom" />
                        }
                    </XAxis>
                    <YAxis type="number" tick={{ fontSize: window?.fontSize ?? 12 }} hide={!(window?.showYAxis ?? true)} stroke={frameColor()} label={{ value: window?.yAxisLabel, angle: -90, position: 'insideLeft' }} />
                    {(window?.legend ?? false) && <Legend payload={datas.map((d, index) => {
                        return { value: d.label, dataKey: 0, color: indexColor(index) }
                    })} />}
                </ComposedChart>
            </ResponsiveContainer>
        </AspectContainer>
    }




    return (
        <div className="relative w-full h-full">
            <div className="absolute m-auto inset-y-0 h-max w-full" >
                {
                    buildContent()
                }
            </div>
            {menuBar()}


        </div>

    );



}

export default Graph