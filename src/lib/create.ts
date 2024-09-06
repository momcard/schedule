import {getLocalStorage} from "@/utils/storage";
import {TypeItem} from "@/types/item";

export const itemsCreateID = () => {

    const items:TypeItem[]|null = getLocalStorage("ao-items");
    const id = Math.floor(Math.random() * 1000000);

    const item = items?.find(v => v.id === id);

    if (item?.id) {
        throw new Error('Error Create ID');
    }

    return id;

}