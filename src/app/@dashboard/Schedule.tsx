'use client'

import {useRef} from 'react';
import {useTranslations} from "next-intl";
import {format} from "date-fns";
import {ko,ja} from 'date-fns/locale';
import {useGlobalContext} from "@/context/global";
import {scheduleDate} from "@/utils/date";
import {TypeDesignItem, TypeSchedule} from "@/types/schedule";

import {hexToRGB} from "@/utils/color";

import styles from '@/assets/styles.module.scss'
import {justifyContent} from "@/utils/design";

export default function Schedule() {

    const t = useTranslations('Placeholder');
    const {aoData, aoSchedule, designDate, designWeek} = useGlobalContext();
    const wrapRef = useRef<HTMLDivElement>(null);

    return (
        <>

            <div ref={wrapRef} className="elements selecto-area">

                <div className="flex flex-col">
                    {designDate?.map((item: TypeDesignItem, index: number) => {

                        return (
                            <div key={index} data-id={item.id} data-type="date"
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
                                 className={`cube ${styles.text} ${item?.fontName ? `font-${item.fontName}` : ""}`}
                            >
                                {format(scheduleDate(aoData.scheduleStart, item.id - 1), aoData.scheduleDateFormat)}
                            </div>
                        )

                    })}
                </div>

                <div className="flex flex-col">
                    {designWeek?.map((item: TypeDesignItem, index: number) => {

                        return (
                            <div key={index} data-id={item.id} data-type="week"
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
                                 className={`cube ${styles.text} ${item?.fontName ? `font-${item.fontName}` : ""}`}
                            >
                                {aoData.locale === 'ko' && format(scheduleDate(aoData.scheduleStart, item.id - 1), aoData.scheduleWeekFormat, { locale: ko })}
                                {aoData.locale === 'ja' && format(scheduleDate(aoData.scheduleStart, item.id - 1), aoData.scheduleWeekFormat, { locale: ja })}
                                {['ko','ja'].indexOf(aoData.locale) === -1 && format(scheduleDate(aoData.scheduleStart, item.id - 1), aoData.scheduleWeekFormat)}
                            </div>
                        )

                    })}
                </div>

                <div className="flex flex-col">
                    {aoSchedule?.map((item: TypeSchedule, index: number) => {

                        return (
                            <div key={index} data-id={item.id} data-type="schedule"
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
                                 className={`cube ${styles.text} ${item?.fontName ? `font-${item.fontName}` : ""}`}
                            >
                                {item.content || t("content")}
                            </div>
                        )

                    })}
                </div>

            </div>


        </>
    );
}
