'use client'

import React, {useState, useEffect} from 'react';
import {useTranslations} from "next-intl";
import {Button} from "@nextui-org/react";
import domtoimage from 'dom-to-image';
import {saveAs} from 'file-saver';
import {useGlobalContext} from "@/context/global";
import {useContainerContext} from "@/context/container";

export default function Download() {

    const t = useTranslations('Button');
    const {aoData} = useGlobalContext();
    const containerRef = useContainerContext();

    const [ref, setRef] = useState<any>(null);

    const handleDownload = () => {

        if (ref?.current === null) {
            return;
        }

        const image = ref.current;

        const filter = (node: any) => {
            if (node.classList && node.classList.contains("moveable-control-box")) {
                return false;
            } else if (node?.tagName?.toLowerCase() === 'button') {
                return false;
            }
            return true;
        };

        domtoimage.toBlob(image, {filter: filter, width: aoData.width, height: aoData.height}).then((blob) => {
            saveAs(blob, 'schedule.png');
        });
    };

    useEffect(() => {

        if (containerRef) {
            setRef(containerRef);
        }

    }, [containerRef]);

    return (
        <Button color="primary" size="lg" onClick={() => handleDownload()}>{t('download')}</Button>
    );
}