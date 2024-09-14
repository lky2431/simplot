import { Handle, NodeProps, Position, Node, useHandleConnections, useNodesData, } from '@xyflow/react';
import { useEffect, useState, useCallback } from 'react';
import useRFStore, { RFState } from '@/store/rfStore';
import { shallow } from 'zustand/shallow';
import NodeFrame from './NodeFrame';
import { HandlesRef } from '@/types/HandleNode';
import { BackgroundData } from '@/types/backgroundData';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useConnectionData } from './useConnectionData';



export type BackgroundNodeData = Node<
    {
        background: BackgroundData,
        backgroundType?: BackgroundType
    } & HandlesRef,
    'background'
>;


const selector = (state: RFState) => ({
    updateNodeData: state.updateNodeData
});

enum BackgroundType {
    mono = "Mono",
    gradient = "Gradient"
}

function BackgroundNode(props: NodeProps<BackgroundNodeData>) {


    const { updateNodeData } = useRFStore(
        selector,
        shallow,
    );



    const selfNodeData = useNodesData<BackgroundNodeData>(props.id)

    const c1NodeData = useConnectionData({
        type: 'target',
        id: `${props.id}_c1`
    })

    const c2NodeData = useConnectionData({
        type: 'target',
        id: `${props.id}_c2`
    })

    const background = props.data.backgroundType ?? BackgroundType.mono

    useEffect(() => {
        if (c1NodeData.length == 0 && c2NodeData.length == 0) {
            updateNodeData(props.id, {
                background: {
                    color: undefined,
                    color1: undefined,
                    color2: undefined
                }
            })
            return
        }

        let color
        let color1
        let color2
        if (c1NodeData.length == 0) {
            color = undefined
            color1 = undefined
            color2 = background == BackgroundType.gradient ? c2NodeData[0].data.color : undefined
        } else if (c2NodeData.length == 0) {
            color = background == BackgroundType.mono ? c1NodeData[0].data.color : undefined
            color1 = background == BackgroundType.gradient ? c1NodeData[0].data.color : undefined
            color2 = undefined
        } else {
            color = background == BackgroundType.mono ? c1NodeData[0].data.color : undefined
            color1 = background == BackgroundType.gradient ? c1NodeData[0].data.color : undefined
            color2 = background == BackgroundType.gradient ? c2NodeData[0].data.color : undefined
        }
        updateNodeData(props.id, {
            background: {
                color: color,
                color1: color1,
                color2: color2
            }
        })
    }, [c1NodeData, c2NodeData, background])




    return <NodeFrame label='Background'>
        <div className='h-2' />
        <Select value={background} onValueChange={(value: BackgroundType) => {
            updateNodeData(props.id, {
                backgroundType: value
            })
        }}>
            <SelectTrigger className="w-24 text-[12px]">
                <SelectValue placeholder="Type" className='w-16 text-[12px]' >{background}</SelectValue>
            </SelectTrigger>
            <SelectContent className='px-2'>
                <SelectItem className='text-xs' value={BackgroundType.mono}>Mono</SelectItem>
                <SelectItem className='text-xs' value={BackgroundType.gradient}>Gradient</SelectItem>
            </SelectContent>
        </Select>
        {

            <Handle id={`${props.id}_c2`} type="target" isConnectableEnd={c2NodeData.length < 1} className="bottom-1 w-2 h-2 bg-yellow-500" position={Position.Left}>
                <p className='absolute text-[9px] bottom-full left-full '>color</p>
            </Handle>
        }
        <Handle id={`${props.id}_c1`} type="target" position={Position.Left} isConnectableEnd={c1NodeData.length < 1} className='top-1 w-2 h-2 bg-yellow-500'>
            <p className='absolute text-[9px] top-1/2 left-full '>
                color
            </p>
        </Handle>
        <Handle id={`${props.id}_b`} type="source" position={Position.Right} isConnectableEnd={false} className='w-2 h-2 bg-blue-500' />
    </NodeFrame>
}

export default BackgroundNode