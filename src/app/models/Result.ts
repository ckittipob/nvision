export interface IResult {
    id: string;
    confidence: number;
    parent: string;
    name: string,
    bounding_box: IDetectBox,
    hover: boolean
}

export interface IDetectBox {
    bottom: number;
    left: number;
    right: number;
    top: number
}

export interface IObjectDetected {
    selected: boolean;
    color: string;
    parent: string;
    detected: IResult[]
}

