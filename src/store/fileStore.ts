import { create } from "zustand";
import { ImportedFile } from "@/types/ImportedFile";
import { devtools } from 'zustand/middleware'

export type ImportedFilesState = {
    importedFiles: ImportedFile[];
    addImportedFiles: (file: ImportedFile) => void;
    clearImportedFiles: () => void;
    setImportedFiles: (files: ImportedFile[]) => void

}

const useImportedFileStore = create<ImportedFilesState>(((set, get) => ({

    importedFiles: [],
    addImportedFiles: (file) => {
        set({
            importedFiles: [...get().importedFiles, file]
        })
        console.log(JSON.stringify(get().importedFiles))

    },
    clearImportedFiles: () => {
        set({
            importedFiles: []
        })
    },
    setImportedFiles: (files) => {
        set({
            importedFiles: files
        })
    }
})));

export default useImportedFileStore