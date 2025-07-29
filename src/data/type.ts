import { StaticImageData } from "next/image";

export type CardItemsMenu = {
    id?: number;
    title: string;
    description: string;
    image: StaticImageData | string;
    slug?: string;
    time: string;
    people: string;
    steps? : Array<{
        stepNumber: number;
        description: string;
    }>
}