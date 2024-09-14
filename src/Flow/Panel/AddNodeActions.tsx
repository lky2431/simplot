import { DataSourceData } from "../Nodes/DataSourceNode";
import { nanoid } from "nanoid";
import { GraphDataType } from "@/types/handleTypes";
import { WindowNodeData } from "../Nodes/WindowNode";
import { PlotData } from "@/types/PlotData";
import { BackgroundNodeData } from "../Nodes/BackgroundNode";
import { ColorNodeData } from "../Nodes/ColorNode";
import { ContoCatNodeData } from "../Nodes/ContoCatNode";
import { MergeNodeData } from "../Nodes/MergeNode";
import { LinePlotData } from "../Nodes/LinePlotNode";
import { PlotType } from "@/types/PlotTypes";
import { BarPlotData } from "../Nodes/BarPlotNode";
import { AreaPlotData } from "../Nodes/AreaPlotNode";
import { GlobalStyleNodeData } from "../Nodes/GlobalStyleNode";
import { PresetScheme } from "@/types/presetScheme";
import { PiePlotData } from "../Nodes/PiePlotNode";
import { ScatterPlotData } from "../Nodes/ScatterPlotNode";


const emptyDataSet: PlotData = {
    datas: [

    ]

}


export function AddDataSourceNode(origin: () => { x: number, y: number }) {

    const nodeId: string = nanoid()
    const node: DataSourceData = {
        id: nodeId,
        type: 'datasource',
        data: {
            handlesType: {
                [`${nodeId}_o`]: GraphDataType.categoricalData
            },
            dataset: [],
            importedFile: null
        },
        position: origin(),
    }
    return node
}



export function AddLinePlotNode(origin: () => { x: number, y: number }) {
    const nodeId: string = nanoid()
    const node: LinePlotData = {
        id: nodeId,
        type: 'lineplot',
        data: {
            handlesType: {
                [`${nodeId}_x`]: GraphDataType.unknownData,
                [`${nodeId}_y`]: GraphDataType.continuousData,
                [`${nodeId}_o`]: GraphDataType.continousPlotData,
                [`${nodeId}_c`]: GraphDataType.color
            },
            dataset: {
                datas: [
                    {
                        dataset: [],
                        plottype: PlotType.Line,
                        datatype: GraphDataType.unknownData,
                        style: {
                            strokeWidth: 1
                        },
                        id: nodeId
                    }
                ]
            }
        },
        position: origin(),
    }
    return node
}

export function AddBarPlotNode(origin: () => { x: number, y: number }) {
    const nodeId: string = nanoid()
    const node: BarPlotData = {
        id: nodeId,
        type: 'barplot',
        data: {
            handlesType: {
                [`${nodeId}_x`]: GraphDataType.categoricalData,
                [`${nodeId}_y`]: GraphDataType.continuousData,
                [`${nodeId}_o`]: GraphDataType.categoricalPlotData,
                [`${nodeId}_c`]: GraphDataType.color
            },
            dataset: {
                datas: [
                    {
                        dataset: [],
                        plottype: PlotType.Bar,
                        datatype: GraphDataType.categoricalData,
                        style: {

                        },
                        id: nodeId
                    }
                ]
            }
        },
        position: origin(),
    }
    return node
}

export function AddAreaPlotNode(origin: () => { x: number, y: number }) {
    const nodeId: string = nanoid()
    const node: AreaPlotData = {
        id: nodeId,
        type: 'areaplot',
        data: {
            handlesType: {
                [`${nodeId}_x`]: GraphDataType.unknownData,
                [`${nodeId}_y`]: GraphDataType.continuousData,
                [`${nodeId}_o`]: GraphDataType.unknownPlotData,
                [`${nodeId}_c`]: GraphDataType.color
            },
            dataset: {
                datas: [
                    {
                        dataset: [],
                        plottype: PlotType.Area,
                        datatype: GraphDataType.categoricalData,
                        style: {

                        },
                        id: nodeId
                    }
                ]
            }
        },
        position: origin(),
    }
    return node
}

export function AddPiePlotNode(origin: () => { x: number, y: number }) {
    const nodeId: string = nanoid()
    const node: PiePlotData = {
        id: nodeId,
        type: 'pieplot',
        data: {
            handlesType: {
                [`${nodeId}_x`]: GraphDataType.categoricalData,
                [`${nodeId}_y`]: GraphDataType.continuousData,
                [`${nodeId}_o`]: GraphDataType.piePlotData,
            },
            dataset: {
                datas: [
                    {
                        dataset: [],
                        plottype: PlotType.Pie,
                        datatype: GraphDataType.piePlotData,
                        style: {

                        },
                        id: nodeId
                    }
                ]
            }
        },
        position: origin(),
    }
    return node
}

export function AddScatterPlotNode(origin: () => { x: number, y: number }) {
    const nodeId: string = nanoid()
    const node: ScatterPlotData = {
        id: nodeId,
        type: 'scatterplot',
        data: {
            handlesType: {
                [`${nodeId}_x`]: GraphDataType.categoricalData,
                [`${nodeId}_y`]: GraphDataType.continuousData,
                [`${nodeId}_o`]: GraphDataType.unknownPlotData,
            },
            dataset: {
                datas: [
                    {
                        dataset: [],
                        plottype: PlotType.Scatter,
                        datatype: GraphDataType.categoricalData,
                        style: {

                        },
                        id: nodeId
                    }
                ]
            }
        },
        position: origin(),
    }
    return node
}

export function AddWindowNode(origin: () => { x: number, y: number }) {
    const nodeId: string = nanoid()
    const node: WindowNodeData = {
        id: nodeId,
        type: "window",
        data: {
            handlesType: {
                [`${nodeId}_w`]: GraphDataType.windowData,
                [`${nodeId}_c`]: GraphDataType.color
            },
            window: {

            }
        },
        position: origin()
    }
    return node
}




export function AddBackgroundNode(origin: () => { x: number, y: number }) {
    const nodeId: string = nanoid()
    const node: BackgroundNodeData = {
        id: nodeId,
        type: "background",
        data: {
            handlesType: {
                [`${nodeId}_c1`]: GraphDataType.color,
                [`${nodeId}_c2`]: GraphDataType.color,
                [`${nodeId}_b`]: GraphDataType.backgroundData
            },
            background: {

            }
        },
        position: origin()
    }
    return node
}

export function AddColorNode(origin: () => { x: number, y: number }) {
    const nodeId: string = nanoid()
    const node: ColorNodeData = {
        id: nodeId,
        type: "color",
        data: {
            color: { hex: "#555555" },
            handlesType: {
                [`${nodeId}_c`]: GraphDataType.color
            },
        },
        position: origin()
    }
    return node
}

export function AddContoCatNode(origin: () => { x: number, y: number }) {
    const nodeId: string = nanoid()
    const node: ContoCatNodeData = {
        id: nodeId,
        type: "contocat",
        data: {
            handlesType: {
                [`${nodeId}_i`]: GraphDataType.continuousData,
                [`${nodeId}_o`]: GraphDataType.categoricalData
            },
            datatype: GraphDataType.categoricalData,
            dataset: []
        },
        position: origin()
    }
    return node
}

export function AddMergeNode(origin: () => { x: number, y: number }) {
    const nodeId: string = nanoid()
    const node: MergeNodeData = {
        id: nodeId,
        type: "merge",
        data: {
            handlesType: {
                [`${nodeId}_i`]: GraphDataType.unknownPlotData,
                [`${nodeId}_o`]: GraphDataType.unknownPlotData

            },
            dataset: {
                datas: []
            }
        },
        position: origin()
    }
    return node
}

export function AddGlobalStyleNode(origin: () => { x: number, y: number }) {
    const nodeId: string = nanoid()
    const node: GlobalStyleNodeData = {
        id: nodeId,
        type: "global",
        data: {
            handlesType: {
                [`${nodeId}_o`]: GraphDataType.colorScheme

            },
            colorScheme: PresetScheme.default,
            theme: "dark"

        },
        position: origin()
    }
    return node
}