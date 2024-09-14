
import { PlotType } from "./PlotTypes"
import { GraphDataType } from "./handleTypes"

export type PlotData = {
    datas: {
        dataset: any[],
        plottype: PlotType,
        datatype: GraphDataType,
        style: {

            [props: string]: any
        },
        id: string,
        label?: string
    }[]
}



