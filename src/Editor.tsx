import Flow from '@/Flow/Flow'
import { ReactFlowProvider } from '@xyflow/react'
import { Toaster } from '@/components/ui/toaster'
import Graph from '@/Graph/graph'
import { Separator } from '@radix-ui/react-separator'
import { useParams } from '@tanstack/react-router'
import { api } from '../convex/_generated/api'
import { useQuery } from 'convex/react'
import { Id } from "../convex/_generated/dataModel"
import { useEffect } from 'react'
import useImportedFileStore, { type ImportedFilesState } from './store/fileStore'
import useProjectStore, { type ProjectState } from './store/projectStore'
import useRFStore, { type RFState } from './store/rfStore'
import { shallow } from 'zustand/shallow'
import { useUser } from "@clerk/clerk-react";


const rfSelector = (state: RFState) => ({

  setNodes: state.setNodes,
  setEdges: state.setEdges
});

const fileSelector = (state: ImportedFilesState) => ({
  setImportedFiles: state.setImportedFiles
})

const projectSelector = (state: ProjectState) => ({
  setName: state.setName,
  setId: state.setId,
  setPublic: state.setPublic
})


const Editor = () => {

  const params = useParams({ from: '/editor/$editorId' })

  const project = useQuery(api.project.get_project, { projectId: params.editorId as Id<"project"> })

  const { setNodes, setEdges } = useRFStore(rfSelector, shallow)
  const { setImportedFiles } = useImportedFileStore(fileSelector, shallow)
  const { setName, setId, setPublic } = useProjectStore(projectSelector, shallow)

  useEffect(() => {
    if (project == undefined || project == null) {
      return
    }
    setEdges(project.project.edges)
    setNodes(project.project.nodes)
    setId(project.project._id)
    setImportedFiles(project.project.importedFiles)
    setName(project.project.name)
    setPublic(project.project.public)
  }, [project])

  const buildContent = () => {
    if (project?.owned) {
      return <div className='h-screen w-screen flex font-sans'>
        <Toaster />
        <div className='h-full grow '>
          <ReactFlowProvider>
            <Flow />

          </ReactFlowProvider>
          <Toaster />
        </div>
        <Separator />
        <div className='h-full w-[600px] min-w-[600px]'>
          <Graph owned={true} />
        </div>
      </div>
    } else {
      return <div className='h-screen w-screen flex font-sans'>
        <div className='h-full w-1/3 ' />
        <Separator />
        <div className='h-full w-1/3 flex justify-center'>
          <div className="h-full w-[600px] min-w-[600px]">
            <Graph owned={false} />
          </div>
        </div>
        <Separator />
        <div className='h-full w-1/3 ' />
      </div>
    }
  }

  return project ? buildContent() : <div>Loading...</div>
}

export default Editor