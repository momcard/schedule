'use client'

import React, {useEffect, useState} from "react";
import {useTranslations} from "next-intl";
import {Input} from "@nextui-org/react";
import {useGlobalContext} from "@/context/global";

export default function Colors({data, type}: {
    data: any;
    type: string;
}) {

    const tLabel = useTranslations('Label');
    const {setAoUpdate} = useGlobalContext();
    const [valueColor, setValueColor] = useState(data.color);
    const [valueBackgroundColor, setValueBackgroundColor] = useState(data.backgroundColor);
    const [valueBorderColor, setValueBorderColor] = useState(data.borderColor);

    useEffect(() => {

        setValueColor(data.color)

    }, [data.color]);

    useEffect(() => {

        setValueBackgroundColor(data.backgroundColor)

    }, [data.backgroundColor]);

    useEffect(() => {

        setValueBorderColor(data.borderColor)

    }, [data.borderColor]);

    return (
        <div className="flex flex-row gap-2">
            {data?.type !== 'image' &&
                <Input
                    type="color"
                    label={tLabel('color')}
                    value={valueColor}
                    onChange={(e) => {
                        setValueColor(e.currentTarget.value)
                    }}
                    onBlur={(e: any) => {
                        setAoUpdate({
                            type: type,
                            data: data,
                            key: "color",
                            value: e.currentTarget.value
                        })
                    }}
                />
            }
            <Input
                type="color"
                label={tLabel('backgroundColor')}
                value={valueBackgroundColor}
                onChange={(e) => {
                    setValueBackgroundColor(e.currentTarget.value)
                }}
                onBlur={(e: any) => {
                    setAoUpdate({
                        type: type,
                        data: data,
                        key: "backgroundColor",
                        value: e.currentTarget.value
                    })
                }}
            />
            <Input
                type="color"
                label={tLabel('borderColor')}
                value={valueBorderColor}
                onChange={(e) => {
                    setValueBorderColor(e.currentTarget.value)
                }}
                onBlur={(e: any) => {
                    setAoUpdate({
                        type: type,
                        data: data,
                        key: "borderColor",
                        value: e.currentTarget.value
                    })
                }}
            />
        </div>
    )

}