'use client'

import React, {useEffect} from 'react';
import {useTranslations} from "next-intl";
import {Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
import {useGlobalContext} from "@/context/global";
import {useModalContext} from "@/context/modal";
import {TypeFont} from "@/types/font";

export default function ModalFont({isModal}: {
    isModal: boolean;
}) {

    const tNavigation = useTranslations('Navigation');
    const tExample = useTranslations('Example');
    const {fontList, setAoUpdate} = useGlobalContext();
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
            setModalData({...modalData, isFont:false})
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
                        <ModalHeader className="flex flex-col gap-1">{tNavigation('font')}</ModalHeader>
                        <ModalBody>
                            <div className="flex flex-col gap-10">
                                {fontList.map((font: TypeFont) => (
                                    <div key={font.id} className="flex flex-col gap-2">
                                        <h2>{font.name}</h2>
                                        <div className="flex flex-wrap gap-2">
                                            {font.weight.map((weight: string) => {
                                                const key: string = `${font.id}${weight}`
                                                return (
                                                    <div key={key}
                                                         className={`border-dashed border-2 p-2 ${modalData.data?.fontName === key ? "border-primary-500" : "border-gray-200"} `}>
                                                        <div
                                                            className={`font-${key} cursor-pointer text-4xl`}
                                                            onClick={() => {
                                                                setAoUpdate({
                                                                    type: modalData.type,
                                                                    data: modalData.data,
                                                                    key: "fontName",
                                                                    value: key
                                                                })
                                                                onClose()
                                                            }}
                                                        >
                                                            {tExample('font')} {weight}
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                ))}
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
