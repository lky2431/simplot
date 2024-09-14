
import { Input } from "@/components/ui/input"
import { useState } from "react"
import Papa from "papaparse";
import { FileSpreadsheet } from "lucide-react";
import { Label } from "@/components/ui/label";
import useImportedFileStore, { ImportedFilesState } from "@/store/fileStore";


const selector = (state: ImportedFilesState) => ({
    importedFile: state.importedFiles,
    addImportedFile: state.addImportedFiles
});


function ImportFilePage() {
    let { importedFile, addImportedFile } = useImportedFileStore(selector)



    function readCSV(file: any) {
        if (file == null) {
            return
        }
        for (let i in importedFile) {
            if (importedFile[i].name == file.name) {
                return
            }
        }
        Papa.parse(file, {
            header: false,
            dynamicTyping: true,
            complete: (results) => {
                addImportedFile({ name: file.name, data: results.data })
            }
        })
    }


    return (
        <div className="flex flex-col items-center mt-8 gap-4">
            <Label>Import .csv file. The imported files can be used as data source of the graph</Label>
            <Input className="w-64 m-4 border-4 text-white bg-neutral-600" type="file" accept=".csv" onChange={(e) => {
                if (e.target.files != null) {
                    readCSV(e.target.files![0])
                }
            }} />
            <div className="flex flex-wrap gap-4">
                {
                    importedFile.map((file) => {
                        return <div key={file.name} className="flex flex-col m-4 justify-center items-center gap-2">
                            <FileSpreadsheet size={64} />
                            <Label className="text-xs">{file.name}</Label>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default ImportFilePage