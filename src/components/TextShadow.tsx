'use client'

import React, {useEffect, useState} from "react";
import {useTranslations} from "next-intl";
import {Button, Textarea} from "@nextui-org/react";
import {useGlobalContext} from "@/context/global";
import {useModalContext} from "@/context/modal";

export default function TextShadow({data, type}: {
    data: any,
    type: string,
}) {

    const tButton = useTranslations('Button');
    const tLabel = useTranslations('Label');
    const {setAoUpdate} = useGlobalContext();
    const {modalData, setModalData} = useModalContext();
    const [value, setValue] = useState(data.textShadow);

    useEffect(() => {

        setValue(data.textShadow)

    }, [data.textShadow]);

    return (
        <div className="flex flex-col gap-2">
            <Button onClick={() => {
                setModalData({
                    ...modalData,
                    type: type,
                    data: data,
                    isTextShadow: true,
                })
            }}>{tButton('isTextShadow')}</Button>
            <Textarea
                label={tLabel('textShadow')}
                minRows={1}
                maxRows={10}
                variant="bordered"
                disableAnimation={true}
                classNames={{
                    base: "w-full",
                    input: "resize-y",
                }}
                value={value}
                onChange={(e) => {
                    setValue(e.currentTarget.value)
                }}
                onBlur={(e: any) => {
                    setAoUpdate({
                        type: type,
                        data: data,
                        key: "textShadow",
                        value: e.currentTarget.value
                    })
                }}
            />
        </div>
    )

}