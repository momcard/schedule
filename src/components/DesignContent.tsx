'use client'

import React, {useRef} from "react";
import {useTranslations} from "next-intl";
import {Button, Tabs, Tab, Chip} from "@nextui-org/react";

import {format} from "date-fns";
import {useGlobalContext} from "@/context/global";
import {scheduleDate} from "@/utils/date";
import DesignCommon from "@/components/DesignCommon";
import {TypeSchedule} from "@/types/schedule";

import styles from "@/assets/modal.module.scss";

import IconClose from "@/assets/images/close.svg"

export default function DesignContent({isDesignContentOpen, setDesignContentOpen}: {
    isDesignContentOpen: boolean;
    setDesignContentOpen: any
}) {

    const tNavigation = useTranslations('Navigation');
    const tTabs = useTranslations('Tabs');
    const {aoData, setAoData, aoSchedule} = useGlobalContext();
    const modalRef = useRef<HTMLDivElement | null>(null);

    const onClose = () => {

        setDesignContentOpen(false)

    }

    return isDesignContentOpen && (
        <div ref={modalRef} className={styles.modal}>

            <div className="flex justify-center items-center">

                <div className="flex-auto items-center font-bold text-large">{tNavigation('designContent')}</div>

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

                <div className="flex flex-col gap-2">

                    <Tabs
                        size="lg"
                        color="primary"
                        aria-label="Tab"
                        selectedKey={aoData.scheduleContentDesign}
                        onSelectionChange={(key) => {
                            if (key === aoData.scheduleContentDesign) return;
                            setAoData({...aoData, "scheduleContentDesign": key.toString()})

                        }}
                        classNames={{
                            tabList: "w-full"
                        }}
                    >
                        <Tab key="common" title={tTabs('common')}/>
                        <Tab key="individual" title={tTabs('individual')}/>
                    </Tabs>

                    <div className="mt-2 flex flex-col gap-5">

                        {aoData.scheduleContentDesign === 'common' &&
                            <>
                                <div className="flex flex-col gap-2 border-dashed border-2 border-primary-500 p-2">
                                    <DesignCommon type={`schedule_common`} data={aoSchedule[0]}/>
                                </div>
                            </>
                        }

                        {aoData.scheduleContentDesign === 'individual' && aoSchedule?.map((item: TypeSchedule) => {

                            return (
                                <div key={item.id} data-id={item.id} data-type="schedule"
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

                                        <DesignCommon type={`schedule`} data={item}/>

                                    </div>
                                </div>
                            )

                        })}

                    </div>

                </div>

            </div>

        </div>
    );
}
