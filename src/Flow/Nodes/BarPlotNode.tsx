import { Handle, NodeProps, Position, Node, useHandleConnections, useNodesData } from '@xyflow/react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { HandlesRef } from '@/types/HandleNode';
import { useEffect, useState, useCallback } from 'react';
import useRFStore, { RFState } from '@/store/rfStore';
import { shallow } from 'zustand/shallow';
import { PlotData } from '@/types/PlotData';
import { PlotType } from '@/types/PlotTypes';
import { GraphDataType } from '@/types/handleTypes';
import { useConnectionData } from './useConnectionData';
import PlottypeNode from './PlottypeNode';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';





export type BarPlotData = Node<
    {
        dataset: PlotData,
        barType: BarPlotType
    } & HandlesRef,
    'barplot'
>

const selector = (state: RFState) => ({
    removeEdge: state.removeEdge,
    updateNodeData: state.updateNodeData,
    getNodeById: state.getNodeById
});

export enum BarPlotType {
    Seperated = "Seperated Bar",
    Stacked = "Stacked Bar",
}





function BarPlotNode(props: NodeProps<BarPlotData>) {

    const { updateNodeData } = useRFStore(
        selector,
        shallow,
    );



    const selfNodeData = useNodesData<BarPlotData>(props.id)
    const plotType = selfNodeData?.data.barType ?? BarPlotType.Seperated
    return PlottypeNode(props, {
        label: "Bar Chart",
        children: (
            <>
                <Select onValueChange={(value: BarPlotType) => {

                    updateNodeData(props.id, {
                        dataset: {
                            datas: selfNodeData?.data.dataset.datas.map((data) => {
                                return {
                                    ...data,
                                    stackId: value == BarPlotType.Stacked ? props.id : undefined
                                }
                            })
                        },
                        barType: value
                    })
                }} value={plotType}>
                    <SelectTrigger className="w-24 text-[12px]">
                        <SelectValue placeholder="Type" className='w-16 text-[12px]' defaultValue={plotType}></SelectValue>
                    </SelectTrigger>
                    <SelectContent className='px-2'>
                        <SelectItem className='text-xs' value={BarPlotType.Seperated}>{BarPlotType.Seperated}</SelectItem>
                        <SelectItem className='text-xs' value={BarPlotType.Stacked}>{BarPlotType.Stacked}</SelectItem>
                    </SelectContent>
                </Select>

            </>

        ),
        onDataChange: useCallback((xNodeData, yNodeData) => {
      
            if (xNodeData.length == 0 || yNodeData.length == 0) {
                return
            }

            let xDataSet: any[] = xNodeData[0].data.dataset as any[]
            let smallestIndex = xDataSet.length
            for (let i in yNodeData) {
                let length = yNodeData[i].data.dataset.length
                if (length < smallestIndex) {
                    smallestIndex = length
                }
            }
            xDataSet = xDataSet.slice(0, smallestIndex)
            let yDataSets: number[][] = []
            for (let i in yNodeData) {
                yDataSets.push(yNodeData[i].data.dataset.slice(0, smallestIndex))
            }

            let xyDataSets: any[][] = []

            for (let i in yDataSets) {
                let xyDataSet = []
                for (let num in xDataSet) {
                    xyDataSet.push({
                        x: xDataSet[num],
                        y: yDataSets[i][num]
                    })
                }
                xyDataSets.push(xyDataSet)
            }

            const datas = xyDataSets.map((xyDataSet, index) => {
                return {
                    dataset: xyDataSet,
                    datatype: GraphDataType.categoricalData,
                    plottype: PlotType.Bar,
                    stackId: plotType == BarPlotType.Stacked ? props.id : undefined,
                    id: props.id,
                    label: yNodeData[index].data.label
                }
            })
            updateNodeData(props.id, {
                dataset: {
                    datas: datas
                }
            })
        }, [plotType]),
        multiY: true
    })
}

export default BarPlotNode