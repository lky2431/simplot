import { Handle, NodeProps, Position, Node, useHandleConnections, useNodesData } from '@xyflow/react';
import { useEffect, useState } from 'react';
import useRFStore, { RFState } from '@/store/rfStore';
import { shallow } from 'zustand/shallow';
import NodeFrame from './NodeFrame';
import { HandlesRef } from '@/types/HandleNode';
import { GraphDataType } from '@/types/handleTypes';


export type ContoCatNodeData = Node<
    {
        dataset: any[],
        datatype: GraphDataType
    } & HandlesRef,
    'contocat'
>;


const selector = (state: RFState) => ({
    updateNodeData: state.updateNodeData
});



function ContoCatNode(props: NodeProps<ContoCatNodeData>) {

    const { updateNodeData } = useRFStore(
        selector,
        shallow,
    );

    const [input, setInput] = useState<string[]>([])

    const inputNodeData = useNodesData(input)

    const selfNodeData = useNodesData(props.id) as ContoCatNodeData

    const iConnection = useHandleConnections({
        type: 'target',
        id: `${props.id}_i`
    })

    useEffect(() => {
        if (inputNodeData.length > 0) {
            if (inputNodeData[0].data.dataset) {
                updateNodeData(props.id, {
                    ...selfNodeData.data,
                    dataset: inputNodeData[0].data.dataset
                })
            }
        }
    }, [inputNodeData])

    useEffect(() => {
        setInput(iConnection.map((i) => (i.source)))
    }, [iConnection])

    return <NodeFrame label='Con to Cat' className='border-yellow-600'>

        <Handle id={`${props.id}_i`} type="target" position={Position.Top} isConnectableStart={false} className='w-2 h-2 bg-yellow-500' />
        <Handle id={`${props.id}_o`} type="source" position={Position.Bottom} isConnectableEnd={false} className='w-2 h-2 bg-yellow-500' />
    </NodeFrame>
}

export default ContoCatNode