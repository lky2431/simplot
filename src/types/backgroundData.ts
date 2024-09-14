import { ColorResult } from "react-color"

export type BackgroundData = {

    background?: ColorBackground | GradientBackground
}

export type ColorBackground = {
    color: ColorResult
}

export type GradientBackground = {
    color1: ColorResult
    color2: ColorResult
}