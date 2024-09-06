import {TypeDesign} from "@/types/design";

export interface TypeSchedule extends TypeDesign {
    id: number;
    content?:string;
}

export interface TypeDesignItem extends TypeDesign {
    id: number;
}