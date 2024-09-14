import { Handle, NodeProps, Position, Node, useHandleConnections, useNodesData } from '@xyflow/react';
import { useConnectionData } from './useConnectionData';

import { useEffect, useState } from 'react';
import useRFStore, { RFState } from '@/store/rfStore';
import { shallow } from 'zustand/shallow';
import { PlotData } from '@/types/PlotData';
import NodeFrame from './NodeFrame';
import { Label } from '@/components/ui/label';
import { GlobalStyle } from '@/types/globalStyleData';
import { HandlesRef } from '@/types/HandleNode';
import { GraphDataType } from '@/types/handleTypes';


export type MergeNodeData = Node<
    {
        dataset: PlotData
    } & HandlesRef,
    'merge'
>;


const selector = (state: RFState) => ({
    updateNodeData: state.updateNodeData
});

function MergeNode(props: NodeProps<MergeNodeData>) {

    const { updateNodeData } = useRFStore(
        selector,
        shallow,
    );


    const selfNodeData = useNodesData(props.id)

    const iNodeData = useConnectionData({
        type: 'target',
        id: `${props.id}_i`
    })

    useEffect(() => {
        console.log(`iNodeData change ${iNodeData.length}`)
        if (iNodeData.length == 0) {
            updateNodeData(props.id, {
                dataset: {
                    datas: [

                    ],
                    handlesType: {
                        [`${props.id}_i`]: GraphDataType.unknownPlotData,
                        [`${props.id}_o`]: GraphDataType.unknownPlotData,
                    }
                }
            })
            return
        }
        let datas: any[] = []
        for (let i in iNodeData) {
            datas = datas.concat(iNodeData[i].data.dataset.datas)
        }
        updateNodeData(props.id, {
            dataset: {
                datas: datas
            },
            handlesType: {
                [`${props.id}_i`]: ConvertNode(iNodeData[0].data.dataset?.datas[0].datatype),
                [`${props.id}_o`]: ConvertNode(iNodeData[0].data.dataset?.datas[0].datatype),
            }
        })
    }, [iNodeData])

    const ConvertNode = (datatype: GraphDataType)=>{
        switch (datatype) {
            case GraphDataType.continuousData:
                return GraphDataType.continousPlotData
            case GraphDataType.categoricalData:
                return GraphDataType.categoricalPlotData
            case GraphDataType.piePlotData:
                return GraphDataType.piePlotData
            default:
                return datatype
        }
    }

    const border = () => {
        if (selfNodeData?.data.dataset.datas.length == 0) {
            return undefined
        }
        if (selfNodeData?.data.dataset.datas[0].datatype == undefined) {
            return undefined
        }
        if (selfNodeData?.data.dataset.datas[0].datatype == GraphDataType.categoricalData) {
            return "border-yellow-500"
        }
        return "border-green-500"
    }



    return <NodeFrame label='Merge' className={border()}>
        <Handle id={`${props.id}_i`} type="target" position={Position.Top} isConnectableStart={false} />
        <Handle id={`${props.id}_o`} type="source" position={Position.Bottom} isConnectableEnd={false} className='w-2 h-2 bg-purple-500' />

    </NodeFrame>
}
<Label>style</Label>
export default MergeNode