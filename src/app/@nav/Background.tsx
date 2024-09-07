'use client'

import React, {useRef} from 'react';
import {useTranslations} from "next-intl";
import {Button} from "@nextui-org/react";
import {useGlobalContext} from "@/context/global";

export default function Background() {

    const t = useTranslations('Button');
    const {aoData, setAoData} = useGlobalContext();
    const fileRef = useRef<HTMLInputElement | null>(null);

    const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader()
            reader.addEventListener('load', () => {

                    const img: string = reader.result?.toString() || 'none';

                    setAoData({...aoData, "backgroundImage": img})

                    e.target.value = '';

                },
            )
            reader.readAsDataURL(e.target.files[0])

        }
    }

    return (
        <>
            {aoData.backgroundImage &&
                <div className="w-full flex gap-2">
                    <Button color="primary" size="lg" variant="ghost" className="grow">
                        {t("backgroundChange")}
                        <input ref={fileRef} type="file" accept="image/*" onChange={onSelectFile}
                               className="z-10 w-full h-full absolute opacity-0 cursor-pointer"/>
                    </Button>
                    <Button color="primary" size="lg" variant="ghost" className="grow"
                            onClick={() => {
                                setAoData({...aoData, "backgroundImage": ""})
                            }}>
                        {t("backgroundDelete")}
                    </Button>
                </div>
            }

            {!aoData.backgroundImage &&
                <Button color="primary" size="lg" variant="ghost">
                    {t("backgroundImage")}
                    <input ref={fileRef} type="file" accept="image/*" onChange={onSelectFile}
                           className="z-10 w-full h-full absolute opacity-0 cursor-pointer"/>
                </Button>
            }

        </>
    );
}