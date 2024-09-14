import { Handle, NodeProps, Position, Node, useHandleConnections, useNodesData } from '@xyflow/react';
import { useEffect, useState } from 'react';
import useRFStore, { RFState } from '@/store/rfStore';
import { shallow } from 'zustand/shallow';
import { PlotData } from '@/types/XyData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { HandleNode, HandlesRef } from '@/types/HandleNode';
import { Label } from '@/components/ui/label';
import NodeFrame from './NodeFrame';

export type PlotColorNodeData = Node<
    {
        dataset: PlotData
    } & HandlesRef,
    'plotcolor'
>;

enum ColorType {
    preset = "preset",
    custom = "custom"
}


const selector = (state: RFState) => ({
    updateNodeData: state.updateNodeData,
    getNodeById: state.getEdgeById
});

const presetColor: any[] = []

function PlotColorNode(props: NodeProps<PlotColorNodeData>) {
    const [colorType, setColorType] = useState<ColorType>(ColorType.preset)

    const { updateNodeData, getNodeById } = useRFStore(
        selector,
        shallow,
    );

    const iConnection = useHandleConnections({
        type: 'target',
        id: `${props.id}_i`
    })

    const [iNode, setiNode] = useState<string[]>([])

    const iNodeData = useNodesData(iNode)

    useEffect(() => {
        if (iNodeData.length == 0) {
            updateNodeData(props.id, {
                dataset: {
                    graphMapping: {

                    },
                    data: [],
                    styleMapping: {}
                } as PlotData
            })
            return
        }
        let dataset: PlotData = iNodeData[0].data.dataset as PlotData
        updateNodeData(props.id, {
            dataset: {
                ...dataset
            }
        })
    }, [iNodeData])


    useEffect(() => {
        setiNode(iConnection.map((c) => c.source))
    }, [iConnection])


    const setColor = (color: any) => {
        updateNodeData(props.id, {

        })
    }



    return <NodeFrame label='Plot type'>
        <Select onValueChange={(value: ColorType) => {
            setColorType(value)
        }}>
            <SelectTrigger className="w-24 text-[12px]">
                <SelectValue placeholder="Type" className='w-16 text-[12px]' />
            </SelectTrigger>
            <SelectContent className='px-2'>
                <SelectItem className='text-xs' value={ColorType.preset}>Preset</SelectItem>
                <SelectItem className='text-xs' value={ColorType.custom}>Custom</SelectItem>
            </SelectContent>
        </Select>
        {
            colorType == ColorType.preset ?
                <div className='grid-cols-4 m-2'>
                    {
                        presetColor.map((color) => {
                            return <div onClick={setColor}></div>
                        })
                    }
                </div> :
                <div></div>
        }
        <Handle id={`${props.id}_i`} type="target" position={Position.Top} isConnectableStart={false} />
        <Handle id={`${props.id}_o`} type="source" position={Position.Bottom} isConnectableEnd={false} />


    </NodeFrame>
}

export default PlotColorNode