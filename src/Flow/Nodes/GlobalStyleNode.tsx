import { Handle, NodeProps, Position, Node, useNodesData, Background } from '@xyflow/react';
import { useState, useCallback } from 'react';
import useRFStore, { RFState } from '@/store/rfStore';
import { shallow } from 'zustand/shallow';
import { PresetScheme, PresetSchemeCSS } from '@/types/presetScheme';

import NodeFrame from './NodeFrame';
import { HandlesRef } from '@/types/HandleNode';
import { ColorResult, SketchPicker } from 'react-color'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Sun, Moon } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

import styled from "styled-components"
import { Label } from '@/components/ui/label';

const ColorBlock = styled.div`
    background-color: ${props => props.theme.backgroundColor};
    `;




export type GlobalStyleNodeData = Node<
    {
        colorScheme: PresetScheme
        theme: "light" | "dark"
    } & HandlesRef,
    'global'
>;


const selector = (state: RFState) => ({
    updateNodeData: state.updateNodeData
});



function GlobalStyleNode(props: NodeProps<GlobalStyleNodeData>) {

    const [dialogOpen, setDialogOpen] = useState<boolean>(false)

    const { updateNodeData } = useRFStore(
        selector,
        shallow,
    );

    const selfNodeData = useNodesData(props.id) as GlobalStyleNodeData



    return <NodeFrame label='Color Scheme'>


        <Dialog open={dialogOpen} onOpenChange={(value) => {
            setDialogOpen(value)
        }}>
            <DialogTrigger>
                <div className='w-20 h-4 grid grid-cols-5'>
                    {
                        PresetSchemeCSS[selfNodeData.data.colorScheme].map((ele, index) => {
                            return <ColorBlock key={index} className="w-4" theme={{
                                backgroundColor: ele
                            }} />
                        })
                    }


                </div>
            </DialogTrigger>
            <DialogContent className='w-96'>
                <DialogHeader>
                    <DialogTitle>Pick a color Scheme</DialogTitle>
                    <DialogDescription>
                        The selected color scheme determine the default color of the chart
                    </DialogDescription>
                    <ScrollArea className='h-72'>
                        {
                            [PresetScheme.default, PresetScheme.red, PresetScheme.orange, PresetScheme.yellow, PresetScheme.lime, PresetScheme.emerald, PresetScheme.cyan, PresetScheme.blue, PresetScheme.violet, PresetScheme.fuchsia, PresetScheme.rose, PresetScheme.neutral].map((e,i) => {
                                return <div className='flex w-80 my-4 justify-center' key={i} onClick={() => {
                                    updateNodeData(props.id, {
                                        colorScheme: e
                                    })
                                    setDialogOpen(false)
                                }}>
                                    {
                                        PresetSchemeCSS[e].map((color, index) => {
                                            return <ColorBlock className={`w-8 h-8`} key={index} theme={{
                                                backgroundColor: color
                                            }} />
                                        })
                                    }
                                </div>
                            })
                        }
                    </ScrollArea>
                </DialogHeader>
            </DialogContent>
        </Dialog>
        <Separator />
        <Label className='text-xs'>Theme</Label>
        <Tabs defaultValue="dark" className="w-22 py-0 h-4" onValueChange={(e) => {
            updateNodeData(props.id, {
                theme: e
            })
        }}>
            <TabsList className='py-0 h-6'>
                <TabsTrigger value="light" className='p-1 my-0'><Sun className='h-2 w-2' /></TabsTrigger>
                <TabsTrigger value="dark" className='p-1 my-0'><Moon className='h-2 w-2' /></TabsTrigger>
            </TabsList>

        </Tabs>
        <Handle id={`${props.id}_c`} type="source" position={Position.Top} isConnectableEnd={false} className='w-2 h-2 bg-rose-500' />
    </NodeFrame>
}

export default GlobalStyleNode


