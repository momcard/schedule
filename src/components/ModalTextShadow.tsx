'use client'

import React, {useEffect} from "react";
import {useTranslations} from "next-intl";
import {
    Button,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody, ModalFooter, useDisclosure
} from "@nextui-org/react";
import {useGlobalContext} from "@/context/global";
import textShadowData from "@/data/textShadow.json";

import styles from "@/assets/styles.module.scss";
import {TypeTextShadow} from "@/types/design";
import {useModalContext} from "@/context/modal";

export default function ModalTextShadow({isModal}: {
    isModal: boolean;
}) {

    const tExample = useTranslations('Example');
    const {setAoUpdate} = useGlobalContext();
    const {modalData, setModalData} = useModalContext();
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    useEffect(() => {

        if (isModal) {
            onOpen()
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isModal]);

    useEffect(() => {

        if (isModal && !isOpen) {
            setModalData({...modalData, isTextShadow:false})
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    return (
        <Modal size="5xl"
               isOpen={isOpen}
               scrollBehavior="inside"
               onOpenChange={onOpenChange}
               classNames={{
                   backdrop: "z-[10000]",
                   wrapper: "z-[10000]"
               }}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">text-shadow</ModalHeader>
                        <ModalBody>

                            <div className="grid grid-cols-2 gap-10">

                                {textShadowData.map((row: TypeTextShadow, key: number) => {
                                    return (
                                        <div key={key} className="flex flex-col gap-2 rounded-2xl p-3 cursor-pointer bg-gray-300"
                                             onClick={() => {
                                                 setAoUpdate({
                                                     type: modalData.type,
                                                     data: modalData.data,
                                                     key: "textShadow",
                                                     value: row.textShadow
                                                 })
                                                 onClose()
                                             }}
                                        >
                                            <div style={{
                                                letterSpacing: 10,
                                                color: row.color,
                                                fontSize: row.fontSize,
                                                textShadow: row.textShadow
                                            }} className={styles['font-NotoSansKRBlack']}
                                            >
                                                {tExample('content')}
                                            </div>
                                            <div className="flex bg-gray-500 rounded-2xl p-3 text-white break-all">
                                                {row.textShadow}
                                            </div>
                                        </div>
                                    )
                                })}

                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
