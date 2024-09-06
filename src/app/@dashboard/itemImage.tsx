'use client'

import {useRef} from 'react';
import {useGlobalContext} from "@/context/global";
import {TypeItem} from "@/types/item";
import {hexToRGB} from "@/utils/color";

import styles from '@/assets/styles.module.scss'

export default function ItemImage() {

    const {aoItems} = useGlobalContext();
    const itemRef = useRef<null[] | HTMLElement[]>([]);

    return (
        <>
            {aoItems?.length > 0 && aoItems.map((item: TypeItem, index: number) => {
                    if (item.type !== 'image') return
                    return (
                        <div key={item.id} ref={(element) => {
                            itemRef.current[index] = element;
                        }} data-id={item.id} data-type={item.type}
                             style={{
                                 zIndex: item.zIndex,
                                 transform: item.transform,
                                 width: item?.width || "auto",
                                 height: item?.height || "auto",
                                 borderColor: item.borderColor ? hexToRGB(item.borderColor, item.opacity) : "none",
                                 borderWidth: item.borderWidth || 0,
                                 borderRadius: item.borderRadius || 0,
                                 backgroundColor: item.backgroundColor ? hexToRGB(item.backgroundColor, item.opacity) : "none",
                                 boxShadow: item.boxShadow || "none",
                             }}
                             className={`cube ${styles[item.type]}`}
                        >
                            <picture>
                                <img src={item.content}
                                     className={styles.img}
                                     alt=""/>
                            </picture>
                        </div>
                    )
                }
            )}
        </>
    );
}
