import { create } from "zustand";

export type ProjectState = {
    name: string | undefined,
    setName: (name: string) => void,
    id: string | undefined,
    setId: (id: string) => void
    clear: () => void
}

const useProjectStore = create<ProjectState>(((set) => ({
    name: undefined,
    id: undefined,
    setName: (name:string) => {
        set({
            name: name
        })
        
    },
    setId: (id:string) => {
        set({
            id: id
        })
    },
    clear: () => {
        set({
            id: undefined,
            name: undefined
        })
    }
})));

export default useProjectStore