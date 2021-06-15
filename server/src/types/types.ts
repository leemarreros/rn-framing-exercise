export enum FrameNamesEnum {
    "newYork" = "New York",
    "sanFrancisco" = "San Francisco",
    "lasVegas" = "Las Vegas",
    "greenRain" = "Green Rain",
    "yellowLime" = "Yellow Lime"
}

export type FrameNamesType = "None" | "New York" | "San Francisco" | "Las Vegas" | "Green Rain" | "Yellow Lime";
export const arrayFrameNames: FrameNamesType[] = ["None", "New York", "San Francisco", "Las Vegas", "Green Rain", "Yellow Lime"]

export type ShapeType = "Round" | "Square";
export enum ShapeEnum {
    ROUND = "Round",
    SQUARE = "Square"
}

export interface responseFrameI {
    response: string;
}

export function enumKeys<O extends object, K extends keyof O = keyof O>(obj: O): K[] {
    return Object.keys(obj).filter(k => Number.isNaN(+k)) as K[];
}