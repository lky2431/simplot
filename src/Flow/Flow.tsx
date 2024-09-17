import { ReactFlow, Panel, NodeOrigin, Connection, useReactFlow, Edge, Node, Background } from '@xyflow/react';
import { shallow } from 'zustand/shallow';
import { GraphDataCompatChecker } from '@/types/handleTypes';
import useRFStore, { type RFState } from '../store/rfStore';
import { HandleNode } from '@/types/HandleNode';
import { useToast } from '@/components/ui/use-toast';
import OutputNode from './Nodes/OutputNode';
import PlottypeNode from './Nodes/PlottypeNode';
import DataSourceNode from './Nodes/DataSourceNode';
import PlotColorNode from './Nodes/PlotColorNode';
import PanelParent from './Panel/PanelParent';
import WindowNode from './Nodes/WindowNode';
import BackgroundNode from './Nodes/BackgroundNode'
import ColorNode from './Nodes/ColorNode';
import ContoCatNode from './Nodes/ContoCatNode';
import MergeNode from './Nodes/MergeNode';
import LinePlotNode from './Nodes/LinePlotNode';
import BarPlotNode from './Nodes/BarPlotNode';
import AreaPlotNode from './Nodes/AreaPlotNode';
import GlobalStyleNode from './Nodes/GlobalStyleNode';
import PiePlotNode from './Nodes/PiePlotNode';
import ScatterPlotNode from './Nodes/ScatterPlotNode';


const selector = (state: RFState) => ({
    nodes: state.nodes,
    edges: state.edges,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    addEdge: state.addEdge,
    addChildNode: state.addChildNode,
    getNodeById: state.getNodeById,
    setNodes: state.setNodes,
    setEdges: state.setEdges
});

const nodeTypes = {
    output: OutputNode,
    plottype: PlottypeNode,
    datasource: DataSourceNode,
    plotcolor: PlotColorNode,
    window: WindowNode,
    background: BackgroundNode,
    color: ColorNode,
    contocat: ContoCatNode,
    merge: MergeNode,
    lineplot: LinePlotNode,
    barplot: BarPlotNode,
    areaplot: AreaPlotNode,
    pieplot: PiePlotNode,
    global: GlobalStyleNode,
    scatterplot: ScatterPlotNode
};

function Flow() {
    const { nodes, edges, onNodesChange, onEdgesChange, getNodeById, addEdge } = useRFStore(
        selector,
        shallow,
    );

    const { toast } = useToast()
    const onBeforeDelete = async ({ nodes, edges }: { nodes: Node[], edges: Edge[] }) => {
        for (let i in nodes) {
            if (nodes[i].type == "output") {
                return false
            }
        }
        return true
    }

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            onBeforeDelete={onBeforeDelete}
            colorMode='dark'
            onConnect={(connection: Connection) => {
                addEdge(connection)
            }}
            isValidConnection={(connection: Connection | Edge): boolean => {
                const source = getNodeById(connection.source) as HandleNode
                const target = getNodeById(connection.target) as HandleNode
                if (source && target && connection.sourceHandle && connection.targetHandle) {
                    
                    let checker: string | null = GraphDataCompatChecker(source, target, connection.sourceHandle, connection.targetHandle)
                    if (checker != null) {
                        toast({
                            description: checker,
                            variant: "destructive"
                        })
                        return false
                    }
                    return true
                }
                return false
            }}
            fitView
        >
            <Panel ><PanelParent /></Panel>
            <Background />
        </ReactFlow>

    );
}

export default Flow;