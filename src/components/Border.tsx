'use client'

import {useTranslations} from "next-intl";
import {Button, Slider} from "@nextui-org/react";
import {useGlobalContext} from "@/context/global";
import {useModalContext} from "@/context/modal";

export default function Border({data, type}: {
    data: any;
    type: string;
}) {

    const tLabel = useTranslations('Label');
    const tButton = useTranslations('Button');
    const {setAoUpdate} = useGlobalContext();
    const {modalData, setModalData} = useModalContext();

    return (
        <>
            <div className="flex gap-5 p-2">
                <Slider
                    label={tLabel('borderWidth')}
                    step={1}
                    minValue={0}
                    maxValue={100}
                    value={data.borderWidth || 0}
                    onChange={(v) => {
                        setAoUpdate({
                            type: type,
                            data: data,
                            key: "borderWidth",
                            value: Number(v)
                        })
                    }}
                    className="max-w-md"
                />
                <Slider
                    label={tLabel('borderRadius')}
                    step={1}
                    minValue={0}
                    maxValue={500}
                    value={data.borderRadius || 0}
                    onChange={(v) => {
                        setAoUpdate({
                            type: type,
                            data: data,
                            key: "borderRadius",
                            value: Number(v)
                        })
                    }}
                    className="max-w-md"
                />
            </div>
            <div className="flex p-2">
                <Slider
                    label={tLabel('opacity')}
                    step={1}
                    minValue={0}
                    maxValue={100}
                    value={data.opacity || 0}
                    onChange={(v) => {
                        setAoUpdate({
                            type: type,
                            data: data,
                            key: "opacity",
                            value: Number(v)
                        })
                    }}
                    className="max-w-md"
                />
            </div>
            <Button
                onClick={() => {
                    setModalData({
                        ...modalData,
                        type: type,
                        data: data,
                        isBoxShadow: true,
                    })
                }}>
                {tButton('isBoxShadow')}
            </Button>
        </>
    )

}