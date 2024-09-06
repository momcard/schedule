'use client'

import React, {useRef, useState} from "react";
import {useTranslations} from "next-intl";
import {Button, Tabs, Tab, Chip} from "@nextui-org/react";

import {format} from "date-fns";
import {useGlobalContext} from "@/context/global";
import {scheduleDate} from "@/utils/date";
import ModalDateFormat from "@/components/ModalDateFormat";
import DesignCommon from "@/components/DesignCommon";
import {TypeSchedule} from "@/types/schedule";

import styles from "@/assets/modal.module.scss";

import IconClose from "@/assets/images/close.svg"

export default function DesignDate({isDesignDateOpen, setDesignDateOpen}: {
    isDesignDateOpen: boolean;
    setDesignDateOpen: any;
}) {

    const tNavigation = useTranslations('Navigation');
    const tTabs = useTranslations('Tabs');
    const tButton = useTranslations('Button');
    const {aoData, setAoData, designDate} = useGlobalContext();
    const modalRef = useRef<HTMLDivElement | null>(null);
    const [isDateFormat, setIsDateFormat] = useState<boolean>(false);

    const onClose = () => {

        setDesignDateOpen(false)

    }

    return isDesignDateOpen && (
        <div ref={modalRef} className={styles.modal}>

            <div className="flex justify-center items-center">

                <div className="flex-auto items-center font-bold text-large">{tNavigation('designDate')}</div>

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
                        setIsDateFormat(true)
                    }}>
                    {tButton('isDateFormat')}
                </Button>

                <div className="flex flex-col gap-2">

                    <Tabs
                        size="lg"
                        color="primary"
                        aria-label="Tab"
                        selectedKey={aoData.scheduleDateDesign}
                        onSelectionChange={(key) => {
                            if (key === aoData.scheduleDateDesign) return;
                            setAoData({...aoData, "scheduleDateDesign": key.toString()})

                        }}
                        classNames={{
                            tabList: "w-full"
                        }}
                    >
                        <Tab key="common" title={tTabs('common')}/>
                        <Tab key="individual" title={tTabs('individual')}/>
                    </Tabs>

                    <div className="mt-2 flex flex-col gap-5">

                        {aoData.scheduleDateDesign === 'common' &&
                            <>
                                <div className="flex flex-col gap-2 border-dashed border-2 border-primary-500 p-2">
                                    <DesignCommon type={`date_common`} data={designDate[0]}/>
                                </div>
                            </>
                        }

                        {aoData.scheduleDateDesign === 'individual' && designDate?.map((item: TypeSchedule, index: number) => {

                            return (
                                <div key={item.id} data-id={item.id} data-type="date"
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

                                        <DesignCommon type={`date`} data={item}/>

                                    </div>
                                </div>
                            )

                        })}

                    </div>

                </div>


            </div>

            <ModalDateFormat
                isDateFormat={isDateFormat}
                setIsDateFormat={setIsDateFormat}
            />

        </div>
    );
}
