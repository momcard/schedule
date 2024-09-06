'use client'

import {useRef} from 'react';
import {useTranslations} from "next-intl";
import {useGlobalContext} from "@/context/global";
import {TypeItem} from "@/types/item";
import {hexToRGB} from "@/utils/color";

import styles from '@/assets/styles.module.scss'
import {justifyContent} from "@/utils/design";

export default function ItemText() {

    const t = useTranslations('Placeholder');
    const {aoItems} = useGlobalContext();
    const itemRef = useRef<null[] | HTMLElement[]>([]);

    return (
        <>
            {aoItems?.length > 0 && aoItems.map((item: TypeItem, index: number) => {
                    if (item.type !== 'text') return
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
                                 color: item.color || "none",
                                 fontSize: item.fontSize || 15,
                                 fontStyle: item.fontItalic ? "italic" : "normal",
                                 letterSpacing: item.letterSpacing,
                                 lineHeight: item.lineHeight,
                                 justifyContent: justifyContent(item?.textAlign),
                                 textAlign: item?.textAlign || "center",
                                 textShadow: item.textShadow || "none",
                                 boxShadow: item.boxShadow || "none",
                                 paddingLeft: item.padding || 0,
                                 paddingRight: item.padding || 0
                             }}
                             className={`cube ${styles[item.type]} ${item?.fontName ? `font-${item.fontName}` : ""}`}
                        >
                            <>{item.content || t("content")}</>
                        </div>
                    )
                }
            )}
        </>
    );
}
