import {TypeDesign} from "@/types/design";

export interface TypeItem extends TypeDesign {
    id: number;
    type: string;
    content: string;
}