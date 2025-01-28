export type Parking = {
    id: number,
    plate: string,
    entryTime: Date,
    exitTime: Date,
    charge: number,
    chargedBy: string,
    comment: string | null
}