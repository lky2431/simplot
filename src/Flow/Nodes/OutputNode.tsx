import { Handle, NodeProps, Position, Node, useHandleConnections, useNodesData } from '@xyflow/react';

import { useEffect, useState } from 'react';
import useRFStore, { RFState } from '@/store/rfStore';
import { shallow } from 'zustand/shallow';
import { PlotData } from '@/types/PlotData';
import NodeFrame from './NodeFrame';
import { Label } from '@/components/ui/label';
import { useConnectionData } from './useConnectionData';
import { HandlesRef } from '@/types/HandleNode';
import { BackgroundData } from '@/types/backgroundData';
import { WindowData } from '@/types/windowData';
import { PresetScheme } from '@/types/presetScheme';

export type OutputNodeData = Node<
    {
        dataset: PlotData,
        background: BackgroundData,
        window: WindowData,
        colorScheme: PresetScheme
    } & HandlesRef,
    'output'
>;


const selector = (state: RFState) => ({
    updateNodeData: state.updateNodeData
});

function OutputNode(props: NodeProps<OutputNodeData>) {

    const { updateNodeData } = useRFStore(
        selector,
        shallow,
    );

    const backgroundData = useConnectionData({
        type: 'target',
        id: `${props.id}_b`
    })
    const windowData = useConnectionData({
        type: 'target',
        id: `${props.id}_w`
    })


    const iNodeData = useConnectionData({
        type: 'target',
        id: `${props.id}_i`
    })

    const cNodeData = useConnectionData({
        type: 'target',
        id: `${props.id}_c`
    })

    useEffect(() => {
        if (iNodeData.length == 0) {
            updateNodeData(props.id, {
                dataset: {
                    datas: []

                }
            })
            return
        }
        let dataset: PlotData = iNodeData[0].data.dataset as PlotData
        updateNodeData(props.id, {
            dataset: dataset
        })
    }, [iNodeData])

    useEffect(() => {
        if (backgroundData.length == 0) {
            updateNodeData(props.id, {
                background: {}
            })
            return
        }
        let background: BackgroundData = backgroundData[0].data.background as BackgroundData
        updateNodeData(props.id, {
            background: background
        })
    }, [backgroundData])

    useEffect(() => {
        if (windowData.length == 0) {
            updateNodeData(props.id, {
                window: {},
                theme: undefined
            })
            return
        }
        let window: WindowData = windowData[0].data.window as WindowData

        updateNodeData(props.id, {
            window: window,

        })
    }, [windowData])

    useEffect(() => {
        if (cNodeData.length == 0) {
            updateNodeData(props.id, {
                colorScheme: undefined
            })
            return
        }
        let colorScheme = cNodeData[0].data.colorScheme as PresetScheme
        let theme: "light" | "dark" = cNodeData[0].data.theme as ("light" | "dark")
        updateNodeData(props.id, {
            colorScheme: colorScheme,
            theme: theme
        })
    }, [cNodeData])


    return <NodeFrame label='Output' className='hover:bg-transparent'>
        <div className='h-8'>  </div>
        <Handle id={`${props.id}_i`} type="target" position={Position.Top} isConnectableStart={false} className='w-2 h-2' > <p className='absolute text-[9px] top-1.5'>
            data
        </p></Handle>
        <Handle id={`${props.id}_w`} type="target" position={Position.Right} isConnectableStart={false} isConnectableEnd={windowData.length < 1} className='w-2 h-2 bg-pink-500' >
            <p className='absolute text-[9px] right-full top-1'>
                window
            </p>
        </Handle>
        <Handle id={`${props.id}_b`} type="target" position={Position.Left} isConnectableStart={false} isConnectableEnd={backgroundData.length < 1} className='w-2 h-2 bg-blue-500' >
            <p className='absolute text-[9px] left-full top-1'>
                background
            </p>
        </Handle>
        <Handle id={`${props.id}_c`} type="target" position={Position.Bottom} isConnectableStart={false} isConnectableEnd={cNodeData.length < 1} className='w-2 h-2 bg-rose-500' >
            <p className='absolute text-[9px] bottom-1.5'>
                style
            </p>
        </Handle>

    </NodeFrame>
}
<Label>style</Label>
export default OutputNode