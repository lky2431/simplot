import { Handle, NodeProps, Position, Node, useHandleConnections, useNodesData } from '@xyflow/react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import SpreadSheetMain from '@/SpreadSheet/SpreadSheetMain';
import useRFStore, { RFState } from '@/store/rfStore';
import { HandlesRef, HandleNode } from '@/types/HandleNode';
import { GraphDataType } from '@/types/handleTypes';
import { ImportedFile } from '@/types/ImportedFile';
import NodeFrame from './NodeFrame';
import { Input } from '@/components/ui/input';


export type DataSourceData = HandleNode<
    {
        dataset: any[],
        datatype?: GraphDataType,
        file?: ImportedFile,
        selectedCoordinate?: Record<number, Record<number, boolean>>,
        label?: string
    } & HandlesRef,
    'datasource'
>;

const selector = (id: string) => (state: RFState) => ({
    updateNodeData: state.updateNodeData,
    node: state.getNodeById(id)
})

function DataSourceNode(props: NodeProps<DataSourceData>) {
    const { node, updateNodeData } = useRFStore(selector(props.id))

    const isContinuous = (dataset: any[]) => {
        for (let i in dataset) {
            if (isNaN(dataset[i])) {
                return false
            }
        }
        return true
    }

    const haveData = () => {
        return selfNodeData?.data.dataset.length > 0
    }

    const selfNodeData = useNodesData<DataSourceData>(props.id)

    const border = () => {
        if (selfNodeData?.data.datatype == undefined) {
            return undefined
        }
        if (selfNodeData?.data.datatype == GraphDataType.categoricalData) {
            return "border-yellow-500"
        }
        return "border-green-500"
    }

    const dotColor = () => {
        if (!haveData()) {
            return 'bg-gray-500 w-2 h-2'
        }
        if (selfNodeData?.data.datatype == GraphDataType.categoricalData) {
            return "bg-yellow-500 w-2 h-2"
        }
        return "bg-green-500 w-2 h-2"
    }

    return <NodeFrame label={'Import Data'} className={border()}>
        <div className='flex flex-col justify-start'>
            {props.data.datatype != null && <Label className="text-[0.6rem] text-neutral-200">{props.data.datatype == GraphDataType.categoricalData ? "Categorical" : "Continuous"}</Label>}
            {props.data.dataset.length != 0 && <Label className="text-[0.6rem] text-neutral-200">Data Size: {props.data.dataset.length}</Label>}
        </div>

        <span className='h-1' />
        <Dialog>
            <DialogTrigger asChild><Button size='sm' className='text-white text-[0.4rem] bg-neutral-700 border border-neutral-500 px-1.5 py-1 rounded-sm hover:bg-neutral-500'>EDIT</Button></DialogTrigger>
            <DialogContent className="max-w-screen h-screen">
                <DialogHeader>
                    <DialogTitle>Edit DataSource</DialogTitle>
                    <DialogDescription></DialogDescription>
                    <SpreadSheetMain id={props.id}
                        dataUpdate={(dataset: any[]) => {
                            if (node && node.data.handlesType) {
                                let _dataType: GraphDataType = isContinuous(dataset) ? GraphDataType.continuousData : GraphDataType.categoricalData
                                updateNodeData(props.id, {
                                    dataset: dataset,
                                    handlesType: {
                                        ...node.data.handlesType,
                                        [`${props.id}_o`]: _dataType
                                    },
                                    datatype: _dataType
                                })
                            }
                        }}
                        onSelectionChange={
                            (selection) => {
                                updateNodeData(props.id, {

                                    selectedCoordinate: selection
                                })
                            }
                        }
                        currentSelection={
                            selfNodeData?.data.selectedCoordinate as Record<number, Record<number, boolean>> | undefined
                        }
                    />
                </DialogHeader>
            </DialogContent>
        </Dialog>
        <Input className='w-20 h-4 text-[8px] rounded p-1 text-center' placeholder='data label' value={selfNodeData?.data.label} onChangeCapture={(event) => {
            updateNodeData(props.id, {
                label: event.currentTarget.value
            })
        }} />

        <Handle id={`${props.id}_o`} type="source" position={Position.Bottom} className={dotColor()} isConnectable={haveData()} isConnectableEnd={false} />
    </NodeFrame>
}

export default DataSourceNode