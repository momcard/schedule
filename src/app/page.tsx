'use client'

import React from "react";
import {useStorage} from "@/hooks/storage";
import ModalFont from "@/components/ModalFont";
import ModalTextShadow from "@/components/ModalTextShadow";
import ModalBoxShadow from "@/components/ModalBoxShadow";
import {useModalContext} from "@/context/modal";

export default function Page() {

    useStorage()

    const {modalData} = useModalContext();

    return (
        <>
            <ModalFont isModal={modalData.isFont}/>
            <ModalTextShadow isModal={modalData.isTextShadow}/>
            <ModalBoxShadow isModal={modalData.isBoxShadow}/>
        </>
    );

}