import SpreadSheet, { CellBase, EmptySelection, EntireColumnsSelection, EntireRowsSelection, Matrix, RangeSelection, Selection } from "react-spreadsheet"
import useImportedFileStore, { ImportedFilesState } from "@/store/fileStore";
import { FileSpreadsheet } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useRef } from "react";

import { SelectionMode, useNodesData } from "@xyflow/react";
import { Separator } from "@/components/ui/separator";
import useRFStore, { RFState } from "@/store/rfStore";
import { shallow } from "zustand/shallow";
import { DataSourceData } from "@/Flow/Nodes/DataSourceNode";


const fileSelector = (state: ImportedFilesState) => ({
    importedFile: state.importedFiles,
});

const rfSelector = (state: RFState) => ({
    updateNodeData: state.updateNodeData
})


interface cellItem extends CellBase<any> {
    value: string | number
}


type SelectedCell = Record<number, Record<number, boolean>>



function SpreadSheetMain({ dataUpdate, onSelectionChange, currentSelection, id }: { dataUpdate: (data: any[]) => void, onSelectionChange: (selection: SelectedCell) => void, currentSelection?: SelectedCell, id: string }) {
    const [sheetData, setSheetData] = useState<Matrix<cellItem> | null>(null)
    const [cellSelection, setCellSelection] = useState<Selection | undefined>(undefined)
    const [resultData, setResultData] = useState<any[] | null>(null)
    const [error, SetError] = useState<string | null>('Data not specified')

    const timerId = useRef<any>(undefined)

    const { updateNodeData } = useRFStore(rfSelector, shallow)
    const nodeData = useNodesData<DataSourceData>(id)





    useEffect(() => {
        if (nodeData?.data.file != null) {
 
            let d: any[] = nodeData?.data.file.data.map((row: any, x: number) =>
                row.map((item: any, y: number) => {
                    return {
                        value: item,
                        readOnly: true,
                        className: currentSelection?.[y]?.[x] ? "bg-neutral-700" : ""
                    }
                })
            )
            setSheetData(d)
        }
    }, [nodeData?.data.file, currentSelection])



    useEffect(() => {
        SetError(null)
        if (cellSelection instanceof EmptySelection) {
            //SetError('Data not specified')
        }
        if (cellSelection instanceof RangeSelection) {
            if (timerId.current != undefined) {
                clearTimeout(timerId.current)
            }
            timerId.current = setTimeout(() => {
                let selection: RangeSelection = cellSelection
                RangeSelectionHandler(selection)
            }, 200)
        }
    }, [cellSelection])

    const RangeSelectionHandler = (selection: RangeSelection) => {
        //console.log(selection)
        const sameRow: boolean = selection.range.end.row == selection.range.start.row
        const sameColumn: boolean = selection.range.end.column == selection.range.start.column
        if ((!sameRow) && (!sameColumn)) {
            setResultData(null)
            SetError("Select data in one column or row only")
            return
        }
        let finalData: any[] = []
        let selectedCellTemp: SelectedCell = {}
        if (sameColumn) {
            let smallIndex: number = selection.range.start.row
            let largerIndex: number = selection.range.end.row
            if (smallIndex > largerIndex) {
                smallIndex = largerIndex
                largerIndex = selection.range.start.row
            }
            for (let i = smallIndex; i <= largerIndex; i++) {
                finalData.push(nodeData?.data.file?.data[i][selection.range.start.column])
                if (selectedCellTemp[selection.range.start.column] == undefined) {
                    selectedCellTemp[selection.range.start.column] = {}
                }
                selectedCellTemp[selection.range.start.column][i] = true
                //selectedCellTempArray.push([selection.range.start.column, i])
            }

        } else {
            let smallIndex: number = selection.range.start.column
            let largerIndex: number = selection.range.end.column
            if (smallIndex > largerIndex) {
                smallIndex = largerIndex
                largerIndex = selection.range.start.column
            }
            for (let i = smallIndex; i <= largerIndex; i++) {
                finalData.push(nodeData?.data.file?.data[selection.range.start.row][i])
                if (selectedCellTemp[i] == undefined) {
                    selectedCellTemp[i] = {}
                }
                selectedCellTemp[i][selection.range.start.row] = true
                //selectedCellTempArray.push([i, selection.range.start.row])
            }
        }
        finalData = finalData.filter((data) => {
            return data != null
        })
        onSelectionChange(selectedCellTemp)
        setResultData(finalData)
        dataUpdate(finalData)
    }

    let { importedFile } = useImportedFileStore(fileSelector)


    return <div className="flex flex-col gap-4 grow">

        <div className="basis-1/6 gap-2 flex flex-initial mt-4">
            {
                importedFile.length > 0 ?
                    importedFile.map((file) => {
                        return <div key={file.name} className={` flex flex-col m-4 justify-center items-center gap-2  rounded-lg ${nodeData?.data.file?.name == file.name ? "bg-neutral-600 p-3" : ""}`} onClick={(e) => {
                            updateNodeData(id, {
                                ...nodeData,
                                file: file
                            })
                        }}>
                            <FileSpreadsheet size={64} />
                            <Label>{file.name}</Label>
                        </div>
                    }) : <Label>
                        Imported a data source first
                    </Label>
            }
        </div>
        <Separator />

        <div className="basis-5/6 flex gap-4">
            <div className="gap-2 rounded-lg p-4 flex flex-col min-w-48 max-w-64 items-start text-start min-h-36">
                <Label>Please select a range of cell in a single column or row</Label>
                {resultData && <Label>Number of item: {resultData.length}</Label>}
                {error && <Label className="text-red-500">{error}</Label>}
            </div>
            <Separator orientation="vertical" />
            {
                sheetData != null && <SpreadSheet<CellBase>

                    data={sheetData}
                    onSelect={(selected: Selection) => {
                        if (selected instanceof RangeSelection) {
                            setCellSelection(selected)
                        }
                    }
                    }
                    darkMode={true}
                    selected={cellSelection}



                ></SpreadSheet>

            }

            
        </div>
    </div>


}



export default SpreadSheetMain


