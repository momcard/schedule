'use client'

import {useState} from 'react';
import {useTranslations} from "next-intl";
import {Button, DatePicker} from "@nextui-org/react";
import {format} from "date-fns";
import {parseDate, getLocalTimeZone} from "@internationalized/date";
import {useGlobalContext} from "@/context/global";
import {TypeSchedule} from "@/types/schedule";
import Content from "@/components/Content";
import DesignDate from "@/components/DesignDate";
import DesignWeek from "@/components/DesignWeek";
import DesignContent from "@/components/DesignContent";

export default function Schedule() {

    const t = useTranslations();
    const {aoData, aoSchedule, setAoData} = useGlobalContext();
    const [isDesignDateOpen, setDesignDateOpen] = useState<boolean>(false);
    const [isDesignWeekOpen, setDesignWeekOpen] = useState<boolean>(false);
    const [isDesignContentOpen, setDesignContentOpen] = useState<boolean>(false);

    return (
        <div className="flex flex-col gap-2 border-solid border-2 rounded-lg border-primary-500 p-2">
            <DatePicker
                color="primary"
                label={t('Label.scheduleStart')}
                value={parseDate(format(aoData.scheduleStart, "yyyy-MM-dd"))}
                onChange={(v) => {
                    setAoData({...aoData, "scheduleStart": v.toDate(getLocalTimeZone())})
                }}
            />

            <div className="grid grid-cols-3 gap-2">
                <Button
                    color="primary"
                    size="sm"
                    variant="flat"
                    onClick={() => {
                        setDesignDateOpen(true)
                    }}>
                    {t('Button.designDate')}
                </Button>
                <Button
                    color="primary"
                    size="sm"
                    variant="flat"
                    onClick={() => {
                        setDesignWeekOpen(true)
                    }}>
                    {t('Button.designWeek')}
                </Button>
                <Button
                    color="primary"
                    size="sm"
                    variant="flat"
                    onClick={() => {
                        setDesignContentOpen(true)
                    }}>
                    {t('Button.designContent')}
                </Button>
            </div>

            <div className="flex flex-col gap-2">

                {aoSchedule.map((item:TypeSchedule) => {

                    return (
                        <div key={item.id}>
                            <Content data={item} type="schedule"/>
                        </div>
                    )

                })}

            </div>

            <DesignDate
                isDesignDateOpen={isDesignDateOpen}
                setDesignDateOpen={setDesignDateOpen}
            />

            <DesignWeek
                isDesignWeekOpen={isDesignWeekOpen}
                setDesignWeekOpen={setDesignWeekOpen}
            />

            <DesignContent
                isDesignContentOpen={isDesignContentOpen}
                setDesignContentOpen={setDesignContentOpen}
            />

        </div>
    );
}