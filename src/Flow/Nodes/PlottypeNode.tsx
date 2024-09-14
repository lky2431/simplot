import { Handle, NodeProps, Position, Node, useHandleConnections, useNodesData } from '@xyflow/react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { HandlesRef } from '@/types/HandleNode';
import { ReactNode, useEffect, useState } from 'react';
import useRFStore, { RFState } from '@/store/rfStore';
import { shallow } from 'zustand/shallow';
import { PlotData } from '@/types/PlotData';
import { PlotType } from '@/types/PlotTypes';
import NodeFrame from './NodeFrame';
import { GraphDataType } from '@/types/handleTypes';
import { useConnectionData } from './useConnectionData';



export type PlotTypeData = Node<
    {
        dataset: PlotData
    } & HandlesRef,
    'plottype'
>;




const selector = (state: RFState) => ({
    removeEdge: state.removeEdge,
    updateNodeData: state.updateNodeData,
    getNodeById: state.getNodeById
});


function PlottypeNode<T extends Node = Node<Record<string, unknown>, string>>(
    props: NodeProps<T>,
    { label, children, multiY = false, onDataChange }: { label: string, children: ReactNode, multiY?: boolean, onDataChange?: (xNodeData: Pick<Node, "id" | "type" | "data">[], yNodeData: Pick<Node, "id" | "type" | "data">[]) => void }) {

    const { removeEdge, updateNodeData } = useRFStore(
        selector,
        shallow,
    );

    const outputConnection = useHandleConnections({
        type: 'source',
        id: `${props.id}_o`
    })

    const isInputValid = () => {
        if (xNodeData.length == 0 || yNodeData.length == 0) {
            return false
        }
        return true
    }

    const isValid = () => {
        if (!isInputValid()) {
            return false
        }
        if (selfNodeData?.data.dataset == null) {
            return false
        }
        return true
    }

    const selfNodeData = useNodesData<PlotTypeData>(props.id)
    const xNodeData = useConnectionData({
        type: 'target',
        id: `${props.id}_x`
    })
    const yNodeData = useConnectionData({
        type: 'target',
        id: `${props.id}_y`
    })


    useEffect(() => {
        if (onDataChange) {
            onDataChange(xNodeData, yNodeData)
        } else {
            defaultDataChange(xNodeData, yNodeData)
        }

    }, [xNodeData, yNodeData])

    const defaultDataChange = (xNodeData: Pick<Node, "id" | "type" | "data">[], yNodeData: Pick<Node, "id" | "type" | "data">[]) => {
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
            handlesType: {
                ...selfNodeData.data.handlesType,
                [`${props.id}_o`]: xNodeData[0].data.datatype == GraphDataType.categoricalData ? GraphDataType.categoricalPlotData : GraphDataType.continousPlotData
            },
            dataset: {

                datas: [
                    {
                        ...selfNodeData.data.dataset.datas[0],
                        dataset: xyDataSet,
                        datatype: xNodeData[0].data.datatype,
                        label: yNodeData[0].data.label
                    }
                ]
            }
        })
    }


    const removeOutput = () => {
        for (let i in outputConnection) {
            removeEdge(outputConnection[i].edgeId)
        }
    }

    const border = () => {
        if (selfNodeData?.data.dataset.datas.length == 0) {
            return undefined
        }
        if (selfNodeData?.data.dataset.datas[0].datatype == undefined) {
            return undefined
        }
        if (selfNodeData?.data.dataset.datas[0].datatype == GraphDataType.categoricalData || selfNodeData?.data.dataset.datas[0].datatype == GraphDataType.piePlotData) {
            return "border-yellow-500"
        }
        return "border-green-500"
    }

    const isYNodeConnectable = () => {
        if (multiY) {
            return true;
        }
        return yNodeData.length < 1
    }


    return (
        <NodeFrame label={label} className={border()}>
            {children}


            <p className='text-[10px] text-center'>output</p>
            <Handle id={`${props.id}_x`} type="target" position={Position.Top} className='bg-green-600 w-2 h-2 left-3' isConnectable={xNodeData.length < 1}><p className='text-[10px] m-1'>x</p></Handle>
            <Handle id={`${props.id}_y`} type="target" position={Position.Top} className='bg-green-600 w-2 h-2' isConnectable={isYNodeConnectable()}><p className='text-[10px] mt-1'>y</p></Handle>
            <Handle id={`${props.id}_o`} type="source" position={Position.Bottom} className={isValid() ? 'bg-green-600 w-2 h-2' : 'w-2 h-2 bg-red-500'} isConnectable={isValid()} ></Handle>
        </NodeFrame>


    )


}

export default PlottypeNode