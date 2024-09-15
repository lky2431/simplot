import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button";
import { Input } from "./ui/input";

import { Plus, Target } from "lucide-react";

import { useNavigate } from '@tanstack/react-router'
import { GraphDataType } from "@/types/handleTypes";
import { nanoid } from "nanoid";
import { PresetScheme } from "@/types/presetScheme";

import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";



const NewProject = () => {
    const navigate = useNavigate({ from: '/dashboard' })

    const newProject = useMutation(api.project.create_project)


    const createProject = async () => {
        const project = default_project()
        const projectId = await newProject({
            name: project.name,
            nodes: project.nodes,
            edges: project.edges,
            importedFiles: project.importedFiles
        })
        navigate({
            to: `/editor/${projectId}`
        })
    }

    return <Button className="bg-neutral-700 text-white hover:bg-purple-300" onClick={createProject}><Plus className="h-4 w-4" />New Project</Button>
}

//create this function to ensure that id start with a letter
const nnanoid = () => {
    return "e" + nanoid()
}

const default_project = () => {
    const outputId = nnanoid()
    const windowId = nnanoid()
    const colorSchemeId = nnanoid()
    const datasource1 = nnanoid()
    const datasource2 = nnanoid()
    const edge1 = nnanoid()
    const edge2 = nnanoid()

    return {
        nodes: [
            {
                id: outputId,
                type: 'output',
                data: {
                    handlesType: {
                        [`${outputId}_i`]: GraphDataType.unknownPlotData,
                        [`${outputId}_b`]: GraphDataType.backgroundData,
                        [`${outputId}_w`]: GraphDataType.windowData,
                        [`${outputId}_s`]: GraphDataType.colorScheme
                    },
                    dataset: {
                        datas: []
                    },
                },
                position: { x: 100, y: 340 },
            },
            {

                id: windowId,
                type: "window",
                data: {
                    handlesType: {
                        [`${windowId}_w`]: GraphDataType.windowData,
                        [`${windowId}_c`]: GraphDataType.color
                    },
                    window: {

                    }
                },
                position: { x: 400, y: 200 }
            },
            {
                id: colorSchemeId,
                type: "global",
                data: {
                    handlesType: {
                        [`${colorSchemeId}_o`]: GraphDataType.colorScheme

                    },
                    colorScheme: PresetScheme.default,
                    theme: "dark"

                },
                position: { x: 100, y: 500 }
            },
            {
                id: datasource1,
                type: 'datasource',
                data: {
                    handlesType: {
                        [`${datasource1}_o`]: GraphDataType.categoricalData
                    },
                    dataset: [],
                    importedFile: null
                },
                position: { x: 0, y: 0 },
            },
            {
                id: datasource2,
                type: 'datasource',
                data: {
                    handlesType: {
                        [`${datasource2}_o`]: GraphDataType.categoricalData
                    },
                    dataset: [],
                    importedFile: null
                },
                position: { x: 200, y: 0 },
            },
        ],
        edges: [
            {
                source: windowId,
                sourceHandle: `${windowId}_w`,
                target: outputId,
                targetHandle: `${outputId}_w`,
                id: edge1
            },
            {
                source: colorSchemeId,
                sourceHandle: `${colorSchemeId}_c`,
                target: outputId,
                targetHandle: `${outputId}_c`,
                id: edge2
            },
        ],
        importedFiles: [],

        name: "Untitled"
    }
}



export default NewProject