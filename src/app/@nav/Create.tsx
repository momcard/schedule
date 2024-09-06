'use client'

import React, {useRef} from 'react';
import {useTranslations} from "next-intl";
import {Button} from "@nextui-org/react";
import {useGlobalContext} from "@/context/global";
import {itemsCreateID} from "@/lib/create";

export default function Create() {

    const t = useTranslations('Button');
    const {aoData, aoItems, setAoItems} = useGlobalContext();
    const fileRef = useRef<HTMLInputElement | null>(null);

    const onCreateText = () => {
        try {
            const zIndex = aoData.zIndex
            setAoItems([...aoItems, {
                id: itemsCreateID(),
                zIndex: zIndex,
                width: 300,
                height: 100,
                transform: 'translate(0px, 0px)',
                type: "text",
                content: "",
                borderColor: "#006FEE",
                borderWidth: 5,
                borderRadius: 20,
                backgroundColor: "#FFFFFF",
                color: "#000000",
                fontSize: 32,
                fontName: "NotoSansKRBlack",
                fontItalic: false,
                letterSpacing: 1,
                lineHeight: 1,
                textAlign: "center",
                textShadow: "none",
                boxShadow: "none",
                opacity: 100
            }]);
        } catch (error) {
            console.error(error)
        }
    }

    const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader()
            reader.addEventListener('load', () => {

                    const img: string = reader.result?.toString() || '';
                    const zIndex = aoData.zIndex;

                    try {
                        setAoItems([...aoItems, {
                            id: itemsCreateID(),
                            zIndex: zIndex,
                            transform: 'translate(0px, 0px)',
                            type: "image",
                            content: img,
                            borderColor: "#006FEE",
                            backgroundColor: "transparent",
                            opacity: 100,
                            boxShadow: "none",
                        }]);
                    } catch (error) {
                        console.error(error)
                    }

                    e.target.value = '';

                },
            )
            reader.readAsDataURL(e.target.files[0])

        }
    }

    return (
        <div className="grid grid-cols-2 gap-2">

            <Button color="primary" size="lg" variant="ghost">
                {t('createImage')}
                <input ref={fileRef} type="file" accept="image/*" onChange={onSelectFile}
                       className="z-10 w-full h-full absolute opacity-0"/>
            </Button>

            <Button color="primary" size="lg" variant="ghost" onClick={() => onCreateText()}>
                {t('createText')}
            </Button>

        </div>
    );
}