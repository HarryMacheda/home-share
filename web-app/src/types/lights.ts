export interface Status {
    type: number;
    message: string;
}
export interface Colour {
    red:number,
    green:number,
    blue:number,
    hex: string
}

export interface DeviceSettings {
    id: number;
    name: string | null;
    location: string | null;
    status: Status;
    colour: Colour | null;
}
