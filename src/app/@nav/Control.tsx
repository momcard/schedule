'use client'

import React from 'react';
import {useTranslations} from "next-intl";
import {Input} from "@nextui-org/react";
import {useGlobalContext} from "@/context/global";

export default function Control() {

    const t = useTranslations('Label');
    const {aoData, setAoData} = useGlobalContext();

    return (
        <div className="flex flex-col gap-2 border-solid border-2 rounded-lg border-primary-500 p-2">

            <div className="flex gap-2">
                <Input
                    label={t('width')}
                    variant="bordered"
                    maxLength={4}
                    classNames={{
                        base: "w-full",
                    }}
                    name="width"
                    value={aoData?.width || ""}
                    onChange={(e) => setAoData({...aoData, [e.target.name]: Number(e.target.value)})}
                />
                <Input
                    label={t('height')}
                    variant="bordered"
                    maxLength={4}
                    classNames={{
                        base: "w-full",
                    }}
                    name={t('height')}
                    value={aoData?.height || ""}
                    onChange={(e) => setAoData({...aoData, [e.target.name]: Number(e.target.value)})}
                />
            </div>

        </div>
    );
}