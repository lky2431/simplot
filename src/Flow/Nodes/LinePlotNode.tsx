import { Handle, NodeProps, Position, Node, useHandleConnections, useNodesData } from '@xyflow/react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { HandlesRef } from '@/types/HandleNode';
import { useEffect, useState } from 'react';
import useRFStore, { RFState } from '@/store/rfStore';
import { shallow } from 'zustand/shallow';
import { PlotData } from '@/types/PlotData';
import { PlotType } from '@/types/PlotTypes';
import NodeFrame from './NodeFrame';
import { GraphDataType } from '@/types/handleTypes';
import { useConnectionData } from './useConnectionData';
import PlottypeNode, { PlotTypeData } from './PlottypeNode';
import { Label } from '@/components/ui/label';

import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';




export type LinePlotData = Node<
    {
        dataset: PlotData
    } & HandlesRef,
    'lineplot'
>

const selector = (state: RFState) => ({
    removeEdge: state.removeEdge,
    updateNodeData: state.updateNodeData,
    getNodeById: state.getNodeById
});



function LinePlotNode(props: NodeProps<LinePlotData>) {

    const { updateNodeData } = useRFStore(
        selector,
        shallow,
    );

    const cNodeData = useConnectionData({
        id: `${props.id}_c`,
        type: "target"
    })



    useEffect(() => {
        if (cNodeData.length > 0) {
            updateNodeData(props.id, {
                dataset: {
                    datas: [
                        {
                            ...selfNodeData?.data.dataset.datas[0],
                            style: {
                                ...selfNodeData?.data.dataset.datas[0].style,
                                color: cNodeData[0].data.color.hex
                            }
                        }
                    ]
                }
            })
        }
    }, [cNodeData])



    const selfNodeData = useNodesData<LinePlotData>(props.id)
    return PlottypeNode(props, {
        label: "Line Chart",
        children: (
            <>
                <div className='w-24 flex flex-col items-start mt-2'>
                    <div className='flex items-stretch w-24'>
                        <Label className='text-[0.4rem] grow'>Stroke Width</Label>
                        <Label className='text-[0.4rem]'>{selfNodeData?.data.dataset.datas[0].style.strokeWidth}</Label>
                    </div>

                    <div className='h-[3px]'></div>

                    <Slider defaultValue={[1]} max={20.0} step={0.1} min={0.1} onValueChange={(value) => {
                        updateNodeData(props.id, {
                            dataset: {
                                datas: [
                                    {
                                        ...selfNodeData?.data.dataset.datas[0],
                                        style: {
                                            ...selfNodeData?.data.dataset.datas[0].style,
                                            strokeWidth: value[0]
                                        }
                                    }
                                ]
                            }
                        })
                    }} />
                </div>


            </>

        )
    })
}

export default LinePlotNode