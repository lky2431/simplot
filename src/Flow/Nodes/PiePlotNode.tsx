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
import { Separator } from '@/components/ui/separator';





export type PiePlotData = Node<
    {
        dataset: PlotData
    } & HandlesRef,
    'pieplot'
>

const selector = (state: RFState) => ({
    removeEdge: state.removeEdge,
    updateNodeData: state.updateNodeData,
    getNodeById: state.getNodeById
});




function PiePlotNode(props: NodeProps<PiePlotData>) {

    const { updateNodeData } = useRFStore(
        selector,
        shallow,
    );


    const selfNodeData = useNodesData<PiePlotData>(props.id)
    const innerRadius = selfNodeData?.data.dataset.datas[0].style.innerRadius ?? 0
    const outerRadius = selfNodeData?.data.dataset.datas[0].style.outerRadius ?? 100
    return PlottypeNode(props, {
        label: "Pie Chart",
        children: (
            <>
                <div className='flex items-stretch w-24'>
                    <Label className='text-[0.4rem] grow'>inner radius</Label>
                    <Label className='text-[0.4rem]'>{innerRadius}</Label>
                </div>
                <div className='h-[1px]'></div>
                <Slider value={[innerRadius]} max={200} step={1} min={0} onValueChange={(value) => {
                    if (value[0] < outerRadius) {
                        updateNodeData(props.id, {
                            dataset: {
                                datas: [
                                    {
                                        ...selfNodeData?.data.dataset.datas[0],
                                        style: {
                                            ...selfNodeData?.data.dataset.datas[0].style,
                                            innerRadius: value[0]
                                        }
                                    }
                                ]
                            }
                        })

                    }
                }} />
                <Separator />
                <div className='flex items-stretch w-24'>
                    <Label className='text-[0.4rem] grow'>outer radius</Label>
                    <Label className='text-[0.4rem]'>{outerRadius}</Label>
                </div>
                <div className='h-[1px]'></div>
                <Slider value={[outerRadius]} max={200} step={1} min={0} onValueChange={(value) => {
                    if (value[0] > innerRadius) {
                        updateNodeData(props.id, {
                            dataset: {
                                datas: [
                                    {
                                        ...selfNodeData?.data.dataset.datas[0],
                                        style: {
                                            ...selfNodeData?.data.dataset.datas[0].style,
                                            outerRadius: value[0]
                                        }
                                    }
                                ]
                            }
                        })
                    }
                }} />

                <div className='flex gap-2 my-2'>
                    <Label className='text-[9px]'>show label</Label>

                    <Checkbox checked={selfNodeData?.data.dataset.datas[0].style.showLabel ?? false} onCheckedChange={
                        (value: boolean) => {
                            updateNodeData(props.id, {
                                dataset: {
                                    datas: [
                                        {
                                            ...selfNodeData?.data.dataset.datas[0],
                                            style: {
                                                ...selfNodeData?.data.dataset.datas[0].style,
                                                showLabel: value
                                            }
                                        }
                                    ]
                                }
                            })

                        }
                    } />
                </div>
            </>
        ),
        onDataChange: useCallback((xNodeData, yNodeData) => {
            if (xNodeData.length == 0 || yNodeData.length == 0) {
                //removeOutput()
                return
            }
            let xDataSet: any[] = xNodeData[0].data.dataset as any[]
            let yDataSet: any[] = yNodeData[0].data.dataset as any[]
            
            if (xDataSet.length > yDataSet.length) {
                xDataSet = xDataSet.slice(0, yDataSet.length)

            } else if (xDataSet.length < yDataSet.length) {
                yDataSet = yDataSet.slice(0, xDataSet.length)
            }
            let xyDataSet: any[] = []
            for (let i in xDataSet) {
                xyDataSet.push({
                    x: xDataSet[i],
                    y: yDataSet[i]
                })
            }

            updateNodeData(props.id, {
                dataset: {
                    datas: [
                        {
                            ...selfNodeData.data.dataset.datas[0],
                            dataset: xyDataSet,
                            label: yNodeData[0].data.label
                        }
                    ]
                }
            })
        }, [innerRadius, outerRadius])
    })
}

export default PiePlotNode