import { Handle, NodeProps, Position, Node, useHandleConnections, useNodesData } from '@xyflow/react';
import { useEffect, useState, useCallback } from 'react';
import useRFStore, { RFState } from '@/store/rfStore';
import { shallow } from 'zustand/shallow';
import { PlotData } from '@/types/PlotData';
import NodeFrame from './NodeFrame';
import { Slider } from "@/components/ui/slider"
import { HandlesRef } from '@/types/HandleNode';
import { Checkbox } from '@/components/ui/checkbox';
import { WindowData } from '@/types/windowData';

import { Label } from '@/components/ui/label';
import { useConnectionData } from './useConnectionData';
import { Separator } from '@radix-ui/react-select';
import { Input } from '@/components/ui/input';


export type WindowNodeData = Node<
    {
        window: WindowData
    } & HandlesRef,
    'window'
>;


const selector = (state: RFState) => ({
    updateNodeData: state.updateNodeData
});



function WindowNode(props: NodeProps<WindowNodeData>) {

    const { updateNodeData } = useRFStore(
        selector,
        shallow,
    );

    const cData = useConnectionData({
        id: `${props.id}_c`,
        type: "target"
    })

    const selfNodeData = useNodesData<WindowNodeData>(props.id)

    useEffect(() => {
        if (cData.length == 0) {
            updateNodeData(props.id, {
                window: {
                    ...selfNodeData?.data.window,
                    color: undefined
                }
            })
            return
        }
        updateNodeData(props.id, {
            window: {
                ...selfNodeData?.data.window,
                color: cData[0].data.color.hex
            }
        })
    }, [cData])

    const PropertiesPicker = useCallback(({ property, label, value }: { property: string, label: string, value: number }) => {
        const selfNodeData = useNodesData<WindowNodeData>(props.id)
        return <div className='flex flex-col items-start'>
            <div className='flex items-stretch w-24'>
                <Label className='text-[0.4rem] grow text-gray-300'>{label}</Label>
            </div>

            <div className='h-[3px]'></div>

            <Slider defaultValue={[value]} max={100} step={1} min={5} onValueChange={(value: number[]) => {
                console.log(selfNodeData?.data.window)

                updateNodeData(props.id, {
                    window: {
                        ...selfNodeData?.data.window,
                        [property]: value[0]
                    }
                })
            }} />
        </div>
    }, [])

    const PropertiesCheckBox = ({ property, label, value }: { property: string, label: string, value: boolean }) => {
        return <div className='flex'>
            <Checkbox defaultChecked={value} onCheckedChange={
                (value: boolean) => {
                    updateNodeData(props.id, {
                        window: {
                            ...selfNodeData?.data.window,
                            [property]: value
                        }
                    })

                }
            } />
            <div className='w-2' />
            <Label className='text-[0.4rem] grow text-gray-300'>{label}</Label>

        </div>

    }


    return <NodeFrame label='Window'>
        <div className='w-28 flex flex-col items-start mt-2'>

            <div className='flex items-stretch w-28'>
                <Label className='text-[0.4rem] grow'>Aspect Ratio</Label>
                <Label className='text-[0.4rem]'>{selfNodeData?.data.window.aspectRatio ?? 1}</Label>
            </div>

            <div className='h-[3px]'></div>

            <Slider defaultValue={[1]} max={2.0} step={0.01} min={0.7} onValueChange={(value) => {
                updateNodeData(props.id, {
                    window: {
                        ...selfNodeData?.data.window,
                        aspectRatio: value[0]
                    }
                })
            }} />
        </div>
        <Separator />
        <Label className='text-[0.6rem]'>Margin</Label>
        <div className='w-28 grid grid-cols-2 gap-x-4 gap-y-1'>
            <PropertiesPicker label="top" property="topMargin" value={selfNodeData?.data.window.topMargin ?? 0} />
            <PropertiesPicker label="bottom" property="bottomMargin" value={selfNodeData?.data.window.bottomMargin ?? 0} />
            <PropertiesPicker label="left" property="leftMargin" value={selfNodeData?.data.window.leftMargin ?? 0} />
            <PropertiesPicker label="right" property="rightMargin" value={selfNodeData?.data.window.rightMargin ?? 0} />
        </div>
        <Separator />
        <div className='w-28 my-1'>
            <PropertiesPicker label="Font Size" property='fontSize' value={selfNodeData?.data.window.fontSize ?? 12} />
        </div>
        <Separator />

        <div className='w-28 grid grid-cols-2 gap-x-4 gap-y-1'>
            <PropertiesCheckBox label="X-Axis" property='showXAxis' value={selfNodeData?.data.window.showXAxis ?? true} />
            <PropertiesCheckBox label="Y-Axis" property='showYAxis' value={selfNodeData?.data.window.showYAxis ?? true} />
            <PropertiesCheckBox label="X-Grid" property='showXGrid' value={selfNodeData?.data.window.showXGrid ?? true} />
            <PropertiesCheckBox label="Y-Grid" property='showYGrid' value={selfNodeData?.data.window.showYGrid ?? true} />
            <PropertiesCheckBox label="Legend" property='legend' value={selfNodeData?.data.window.legend ?? false} />
        </div>

        <Input className='w-28 h-4 text-[8px] rounded p-1 text-center' placeholder='title' value={selfNodeData?.data.window.title} onChangeCapture={(event) => {
            updateNodeData(props.id, {
                window: {
                    ...selfNodeData?.data.window,
                    title: event.currentTarget.value
                }
            })
        }} />
        <Input className='w-28 h-4 text-[8px] rounded p-1 text-center' placeholder='x-axis label' value={selfNodeData?.data.window.xAxisLabel} onChangeCapture={(event) => {
            updateNodeData(props.id, {
                window: {
                    ...selfNodeData?.data.window,
                    xAxisLabel: event.currentTarget.value
                }
            })
        }} />
        <Input className='w-28 h-4 text-[8px] rounded p-1 text-center' placeholder='y-axis label' value={selfNodeData?.data.window.yAxisLabel} onChangeCapture={(event) => {
            updateNodeData(props.id, {
                window: {
                    ...selfNodeData?.data.window,
                    yAxisLabel: event.currentTarget.value
                }
            })
        }} />
        <div className='h-1' />

        <Handle id={`${props.id}_w`} type="source" position={Position.Left} isConnectableEnd={false} className='w-2 h-2 bg-pink-500' />
        <Handle id={`${props.id}_c`} type="target" position={Position.Bottom} isConnectableStart={false} isConnectableEnd={cData.length < 1} className='w-2 h-2'><p className='absolute text-[9px] bottom-1.5 w-24'>frame color</p></Handle>
    </NodeFrame>
}

export default WindowNode