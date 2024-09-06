'use client'

import React, {useEffect, useState} from "react";
import {useTranslations} from "next-intl";
import {Input} from "@nextui-org/react";
import {useGlobalContext} from "@/context/global";

export default function Size({data, type}: {
    data: any;
    type: string;
}) {

    const tLabel = useTranslations('Label');
    const {setAoUpdate} = useGlobalContext();
    const [width, setWidth] = useState(data?.width?.toString());
    const [height, setHeight] = useState(data?.height?.toString());

    useEffect(() => {

        setWidth(data.width)

    }, [data.width]);

    return (
        <>
            <div className="flex gap-2">
                <Input
                    size={'sm'}
                    label={tLabel('width')}
                    variant="bordered"
                    maxLength={4}
                    classNames={{
                        base: "w-full",
                    }}
                    value={width || ""}
                    onChange={(e) => {
                        setWidth(e.currentTarget.value)
                    }}
                    onBlur={(e: any) => {
                        setAoUpdate({
                            type: type,
                            data: data,
                            key: "width",
                            value: Number(e.currentTarget.value)
                        })
                    }}
                />
                <Input
                    size={'sm'}
                    label={tLabel('height')}
                    variant="bordered"
                    maxLength={4}
                    classNames={{
                        base: "w-full",
                    }}
                    value={height || ""}
                    onChange={(e) => {
                        setHeight(e.currentTarget.value)
                    }}
                    onBlur={(e: any) => {
                        setAoUpdate({
                            type: type,
                            data: data,
                            key: "height",
                            value: Number(e.currentTarget.value)
                        })
                    }}
                />
            </div>
        </>
    )

}