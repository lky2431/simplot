import { HandleNode } from "./HandleNode";

export enum GraphDataType {
    continuousData = "continuous",
    categoricalData = " categorical",
    unknownData = "unknown",
    continousPlotData = "continuous_plot",
    categoricalPlotData = 'categorical_plot',
    unknownPlotData = "unknown_plot",
    backgroundData = "background",
    windowData = "window",
    color = "color",
    colorScheme= "color_scheme",
    piePlotData = "pie_plot"
}


export const GraphDataCompatChecker = (source: HandleNode, target: HandleNode, srcHandle: string, targetHandle: string): string | null => {
    let srcType = source.data.handlesType![srcHandle]
    let targetType = target.data.handlesType![targetHandle]

    if (srcType == targetType) {
        return null;
    }

    /*if (srcType != targetType) {
        if (source.type == "plottype" && srcType == GraphDataType.continuousData && targetType == GraphDataType.categoricalData) {
            return "cannot assign categorical data to y axis"
        }
    }*/
    if (targetType == GraphDataType.unknownData && (srcType == GraphDataType.continuousData || srcType == GraphDataType.categoricalData)) return null
    if (targetType == GraphDataType.unknownPlotData && (srcType == GraphDataType.continousPlotData || srcType == GraphDataType.categoricalPlotData || srcType == GraphDataType.piePlotData)) return null

    return `cannot attach ${srcType} data to ${targetType} node`

}

