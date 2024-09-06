'use client'

import React, {useRef, useState} from "react";
import {useTranslations} from "next-intl";
import {Button, Tabs, Tab, Chip} from "@nextui-org/react";

import {format} from "date-fns";
import {useGlobalContext} from "@/context/global";
import {scheduleDate} from "@/utils/date";
import ModalWeekFormat from "@/components/ModalWeekFormat";
import DesignCommon from "@/components/DesignCommon";
import {TypeSchedule} from "@/types/schedule";

import styles from "@/assets/modal.module.scss";

import IconClose from "@/assets/images/close.svg"

export default function DesignWeek({isDesignWeekOpen, setDesignWeekOpen}: {
    isDesignWeekOpen: boolean;
    setDesignWeekOpen: any;
}) {

    const tNavigation = useTranslations('Navigation');
    const tTabs = useTranslations('Tabs');
    const tButton = useTranslations('Button');
    const {aoData, setAoData, designWeek} = useGlobalContext();
    const modalRef = useRef<HTMLDivElement | null>(null);
    const [isWeekFormat, setIsWeekFormat] = useState<boolean>(false);

    const onClose = () => {

        setDesignWeekOpen(false)

    }

    return isDesignWeekOpen && (
        <div ref={modalRef} className={styles.modal}>

            <div className="flex justify-center items-center">

                <div className="flex-auto items-center font-bold text-large">{tNavigation('designWeek')}</div>

                <Button
                    isIconOnly
                    aria-label="Close"
                    className="bg-transparent"
                    onClick={() => onClose()}
                >
                    <IconClose className={styles.close__icon}/>
                </Button>

            </div>

            <div className="flex flex-col gap-5">

                <Button
                    color="primary" size="lg" variant="flat"
                    onClick={() => {
                        setIsWeekFormat(true)
                    }}>
                    {tButton('isWeekFormat')}
                </Button>

                <div className="flex flex-col gap-2">

                    <Tabs
                        size="lg"
                        color="primary"
                        aria-label="Tab"
                        selectedKey={aoData.scheduleWeekDesign}
                        onSelectionChange={(key) => {
                            if (key === aoData.scheduleWeekDesign) return;
                            setAoData({...aoData, "scheduleWeekDesign": key.toString()})

                        }}
                        classNames={{
                            tabList: "w-full"
                        }}
                    >
                        <Tab key="common" title={tTabs('common')}/>
                        <Tab key="individual" title={tTabs('individual')}/>
                    </Tabs>

                    <div className="mt-2 flex flex-col gap-5">

                        {aoData.scheduleWeekDesign === 'common' &&
                            <>
                                <div className="flex flex-col gap-2 border-dashed border-2 border-primary-500 p-2">
                                    <DesignCommon type={`week_common`} data={designWeek[0]}/>
                                </div>
                            </>
                        }

                        {aoData.scheduleWeekDesign === 'individual' && designWeek?.map((item: TypeSchedule, index: number) => {

                            return (
                                <div key={item.id} data-id={item.id} data-type="week"
                                     style={{
                                         position: 'relative',
                                         zIndex: 3000
                                     }}
                                     className={`cube ${styles.schedule}`}
                                >
                                    <div
                                        className="flex flex-col gap-2 border-dashed border-2 border-primary-500 p-2 pt-3">

                                        <Chip color="primary">
                                            {format(scheduleDate(aoData.scheduleStart, item.id - 1), aoData.scheduleDateFormat)}
                                        </Chip>

                                        <DesignCommon type={`week`} data={item}/>

                                    </div>
                                </div>
                            )

                        })}

                    </div>

                </div>


            </div>

            <ModalWeekFormat
                isWeekFormat={isWeekFormat}
                setIsWeekFormat={setIsWeekFormat}
            />

        </div>
    );
}
