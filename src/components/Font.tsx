'use client'

import {useTranslations} from "next-intl";
import {Button, Checkbox, Slider} from "@nextui-org/react";
import {useGlobalContext} from "@/context/global";
import {useModalContext} from "@/context/modal";

export default function Font({data, type}: {
    data: any;
    type: string;
}) {

    const tButton = useTranslations('Button');
    const tLabel = useTranslations('Label');
    const {setAoUpdate} = useGlobalContext();
    const {modalData, setModalData} = useModalContext();

    return (
        <>
            <div className="w-full flex gap-2">
                <Button color="primary" size="md" variant="flat" onClick={() => {
                    setModalData({
                        ...modalData,
                        type: type,
                        data: data,
                        isFont: true,
                    })
                }} className="grow">
                    {tButton('isFont')}
                </Button>
                <Checkbox isSelected={Boolean(data.fontItalic)} onValueChange={(v) => {
                    setAoUpdate({
                        type: type,
                        data: data,
                        key: "fontItalic",
                        value: Boolean(v)
                    })
                }} className="grow-0">
                    {tButton('fontItalic')}
                </Checkbox>
            </div>
            <div className="flex gap-5 p-2">
                <Slider
                    label={tLabel('fontSize')}
                    step={1}
                    minValue={8}
                    maxValue={200}
                    value={data.fontSize || 0}
                    onChange={(v) => {
                        setAoUpdate({
                            type: type,
                            data: data,
                            key: "fontSize",
                            value: Number(v)
                        })
                    }}
                    className="max-w-md"
                />
                <Slider
                    label={tLabel('padding')}
                    step={1}
                    minValue={0}
                    maxValue={200}
                    value={data.padding || 0}
                    onChange={(v) => {
                        setAoUpdate({
                            type: type,
                            data: data,
                            key: "padding",
                            value: Number(v)
                        })
                    }}
                    className="max-w-md"
                />
            </div>
            <div className="flex gap-5 p-2">
                <Slider
                    label={tLabel('letterSpacing')}
                    step={0.1}
                    minValue={-10}
                    maxValue={20}
                    value={data.letterSpacing || 0}
                    onChange={(v) => {
                        setAoUpdate({
                            type: type,
                            data: data,
                            key: "letterSpacing",
                            value: Number(v)
                        })
                    }}
                    className="max-w-md"
                />
                <Slider
                    label={tLabel('lineHeight')}
                    step={0.1}
                    minValue={1}
                    maxValue={2}
                    value={data.lineHeight || 0}
                    onChange={(v) => {
                        setAoUpdate({
                            type: type,
                            data: data,
                            key: "lineHeight",
                            value: Number(v)
                        })
                    }}
                    className="max-w-md"
                />
            </div>
        </>
    )

}