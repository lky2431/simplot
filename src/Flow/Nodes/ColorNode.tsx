import { Handle, NodeProps, Position, Node, useNodesData } from '@xyflow/react';
import { useState, useCallback } from 'react';
import useRFStore, { RFState } from '@/store/rfStore';
import { shallow } from 'zustand/shallow';

import NodeFrame from './NodeFrame';
import { HandlesRef } from '@/types/HandleNode';
import { ColorResult, SketchPicker } from 'react-color'
import styled from "styled-components";




export type ColorNodeData = Node<
    {
        color: ColorResult
    } & HandlesRef,
    'color'
>;


const selector = (state: RFState) => ({
    updateNodeData: state.updateNodeData
});

const ColorBlock = styled.div`
        background-color: ${props => props.theme.color};
        width:24px;
        height:18px;
    `;


function ColorNode(props: NodeProps<ColorNodeData>) {

    const [open, setOpen] = useState<boolean>(false)

    const { updateNodeData } = useRFStore(
        selector,
        shallow,
    );

    const selfNodeData = useNodesData(props.id) as ColorNodeData

    const theme = {
        color: selfNodeData?.data.color.hex ?? "#555555"
    }

    const changeColor = useCallback((color: ColorResult) => {
        updateNodeData(props.id, {
            color: color
        })
    }, [])



    return <NodeFrame label='Color'>
        <div className='p-1' onClick={() => { setOpen(!open) }}>
            <ColorBlock theme={theme} />
        </div>

        <div>
            {
                open && <div className='absolute '>
                    <div className='fixed top-0 bottom-0 left-0 right-0' onClick={() => { setOpen(false) }} />
                    <SketchPicker disableAlpha={true} presetColors={[]} width="24" className="nodrag w-32 text-black text-[8px]" color={selfNodeData?.data.color.hex} onChange={changeColor} /></div>
            }
        </div>

        <Handle id={`${props.id}_c`} type="source" position={Position.Left} isConnectableEnd={false} className='w-2 h-2 bg-yellow-500' />


    </NodeFrame>
}

export default ColorNode


