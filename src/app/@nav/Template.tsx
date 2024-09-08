'use client'

import React, {useState} from 'react';
import {useTranslations} from "next-intl";
import {Button} from "@nextui-org/react";
import ModalTemplate from "@/components/ModalTemplate.tsx";

export default function Template() {

    const t = useTranslations('Button');
    const [isModal, setIsModal] = useState<boolean>(false);

    return (
        <>
            <Button color="primary" size="lg" onClick={() => setIsModal(true)}>{t('template')}</Button>
            <ModalTemplate isModal={isModal} setIsModal={setIsModal}/>
        </>
    );
}