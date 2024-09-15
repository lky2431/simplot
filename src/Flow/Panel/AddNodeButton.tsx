import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "@/components/ui/menubar"

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

import useRFStore, { RFState } from "@/store/rfStore";
import { shallow } from "zustand/shallow";
import {
    AddDataSourceNode,
    AddWindowNode,
    AddBackgroundNode,
    AddColorNode,
    AddContoCatNode,
    AddMergeNode,
    AddLinePlotNode,
    AddBarPlotNode,
    AddAreaPlotNode,
    AddGlobalStyleNode,
    AddPiePlotNode,
    AddScatterPlotNode
} from "./AddNodeActions";
import { useReactFlow, Viewport } from "@xyflow/react";



const selector = (state: RFState) => ({
    addChildNode: state.addChildNode
})

export default function AddNodeMenu() {
    const { addChildNode } = useRFStore(selector, shallow)
    const reactFlow = useReactFlow();


    const pos = () => {
        const view: Viewport = reactFlow.getViewport()
        console.log(JSON.stringify(view))
        return { x: -(view.x - 50) / view.zoom, y: -(view.y - 50) / view.zoom }

    }

    return (
        <Menubar >
            <MenubarMenu>
                <MenubarTrigger className="m-0 bg-secondary">
                    <Plus className="h-4 w-4 border-white text-white" />
                </MenubarTrigger>
                <MenubarContent>
                    <MenubarSub>
                        <MenubarSubTrigger>Data</MenubarSubTrigger>
                        <MenubarSubContent>
                            <AddNodeButton label="Import Data Source" action={() => {
                                addChildNode(AddDataSourceNode(pos))
                            }} />
                            <AddNodeButton label="Continuous to Category" action={() => {
                                addChildNode(AddContoCatNode(pos))
                            }} />
                        </MenubarSubContent>
                    </MenubarSub>
                    <MenubarSub>
                        <MenubarSubTrigger>Chart</MenubarSubTrigger>
                        <MenubarSubContent>
                            <AddNodeButton label="Bar Chart" action={() => {
                                addChildNode(AddBarPlotNode(pos))
                            }} />
                            <AddNodeButton label="Line Chart" action={() => {
                                addChildNode(AddLinePlotNode(pos))
                            }} />
                            <AddNodeButton label="Area Chart" action={() => {
                                addChildNode(AddAreaPlotNode(pos))
                            }} />
                            <AddNodeButton label="Scatter Chart" action={() => {
                                addChildNode(AddScatterPlotNode(pos))
                            }} />
                            <AddNodeButton label="Pie Chart" action={() => {
                                addChildNode(AddPiePlotNode(pos))
                            }} />
                            <AddNodeButton label="Merge" action={() => {
                                addChildNode(AddMergeNode(pos))
                            }} />
                        </MenubarSubContent>
                    </MenubarSub>
                    <MenubarSub>
                        <MenubarSubTrigger>Style</MenubarSubTrigger>
                        <MenubarSubContent>
                            <AddNodeButton label="Window" action={() => {
                                addChildNode(AddWindowNode(pos))
                            }} />
                            <AddNodeButton label="Background" action={() => {
                                addChildNode(AddBackgroundNode(pos))
                            }} />
                            <AddNodeButton label="Color Picker" action={() => {
                                addChildNode(AddColorNode(pos))
                            }} />
                            <AddNodeButton label="Color Scheme" action={() => {
                                addChildNode(AddGlobalStyleNode(pos))
                            }} />
                        </MenubarSubContent>
                    </MenubarSub>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    )
}

function AddNodeButton({ label, action }: { label: string, action: () => void }) {
    return <MenubarItem onClick={action}>{label}</MenubarItem>
}


