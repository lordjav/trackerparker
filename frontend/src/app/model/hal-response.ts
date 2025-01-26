import { Parking } from "./parking.type";

export interface HalResponse {
    _embedded: {
        parkingList: Parking[];
    },
    _links: {
        first: {
            href: string;
        },
        self: {
            href: string;
        },
        next: {
            href: string;
        },
        last: {
            href: string;
        }
    },
    page: {
        size: number;
        totalElements: number;
        totalPages: number;
        number: number;
    }
}
