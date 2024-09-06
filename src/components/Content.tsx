'use client'

import React, {useEffect, useState} from "react";
import {useTranslations} from "next-intl";
import {Textarea} from "@nextui-org/react";
import {useGlobalContext} from "@/context/global";
import {format} from "date-fns";
import {scheduleDate} from "@/utils/date";

export default function Content({data, type}: {
    data: any;
    type: string;
}) {

    const tPlaceholder = useTranslations('Placeholder');
    const {aoData, setAoUpdate} = useGlobalContext();
    const [value, setValue] = useState(data.content);

    useEffect(() => {

        setValue(data.content)

    }, [data.content]);

    return (
        <Textarea
            label={type === 'schedule' ? format(scheduleDate(aoData.scheduleStart, data.id - 1), aoData.scheduleDateFormat) : ""}
            placeholder={tPlaceholder('content')}
            minRows={type === 'schedule' ? 1 : 3}
            maxRows={10}
            variant="bordered"
            disableAnimation={true}
            classNames={{
                base: "w-full",
                input: "resize-y",
            }}
            value={value || ""}
            onChange={(e) => {
                setValue(e.currentTarget.value)
            }}
            onBlur={(e: any) => {
                setAoUpdate({
                    type: type,
                    data: data,
                    key: "content",
                    value: e.currentTarget.value
                })
            }}
        />
    )

}