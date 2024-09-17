import { create } from "zustand";
import { ImportedFile } from "@/types/ImportedFile";
import { devtools } from 'zustand/middleware'

export type ImportedFilesState = {
    importedFiles: ImportedFile[];
    replaceImportFiles: (file: ImportedFile, i: number) => void;
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
    },
    replaceImportFiles: (file, i) => {
        const _im = get().importedFiles
        _im[i] = file
        set({
            importedFiles: _im
        })
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