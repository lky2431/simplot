import { create } from "zustand";
import { GraphDataType } from "@/types/handleTypes";
import { HandleNode } from "@/types/HandleNode";
import { immer } from 'zustand/middleware/immer'
import { devtools } from 'zustand/middleware'





import {
    Edge,
    EdgeChange,
    Node,
    NodeChange,
    OnNodesChange,
    OnEdgesChange,
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
    Connection
} from '@xyflow/react';

export type RFState = {
    nodes: (Node | HandleNode)[];
    edges: Edge[];
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    addChildNode: (node: HandleNode) => void;
    addEdge: (connection: Connection) => void;
    removeEdge: (edgeId: string) => void
    updateNodeData: (nodeId: string, data: any) => void;
    getNodeById: (nodeID: string) => (Node | HandleNode) | undefined
    getEdgeById: (edgeId: string) => Edge | undefined
    setNodes: (nodes: HandleNode[]) => void
    setEdges: (edges: Edge[]) => void
};



const useRFStore = create<RFState>()(
    devtools((set, get) => ({
        nodes: [

            {
                id: 'c',
                type: 'output',
                data: {
                    handlesType: {
                        ['c_i']: GraphDataType.unknownPlotData,
                        ['c_b']: GraphDataType.backgroundData,
                        [`c_w`]: GraphDataType.windowData,
                        [`c_s`]: GraphDataType.colorScheme
                    },
                    dataset: {
                        datas: [
                            {

                            }
                        ]

                    },
                    style: {

                    }
                },
                position: { x: 100, y: 340 },
            },
        ],
        edges: [],
        onNodesChange: (changes: NodeChange[]) => {
            set({
                nodes: applyNodeChanges(changes, get().nodes),
            });
        },
        onEdgesChange: (changes: EdgeChange[]) => {
            set({
                edges: applyEdgeChanges(changes, get().edges),
            });
        },
        addEdge: (connection: Connection) => {
            set({
                edges: addEdge(connection, get().edges)
            })
        },
        removeEdge: (edgeId: string) => {
            set({
                edges: get().edges.filter((edge: Edge) => {
                    return edge.id != edgeId
                })
            })
        },
        addChildNode: (node: HandleNode) => {
            set({
                nodes: [...get().nodes, node],
            });
        },
        updateNodeData: (nodeId: string, data: any) => {
            set({
                nodes: get().nodes.map((node) => {
                    if (node.id === nodeId) {
                        return {
                            ...node,
                            data: {
                                ...node.data,
                                ...data
                            }
                        }
                    }
                    return node;
                }),
            });
            console.log(get().nodes)
        },

        getNodeById: (nodeId: string) => {
            let nodes: (Node | HandleNode)[] = get().nodes
            for (let i in nodes) {
                if (nodes[i].id == nodeId) {
                    return nodes[i]
                }
            }
        },
        getEdgeById: (edgeId: string) => {
            let edges: Edge[] = get().edges
            for (let i in edges) {
                if (edges[i].id == edgeId) {
                    return edges[i]
                }
            }
        },
        setNodes(nodes) {
            set({
                nodes: nodes
            })
        },
        setEdges(edges) {
            set({
                edges: edges
            })
        },
    }))
)

export default useRFStore;

