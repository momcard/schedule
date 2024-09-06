'use client'

import React, {useEffect} from "react";
import {
    Button,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody, ModalFooter, useDisclosure
} from "@nextui-org/react";
import {useGlobalContext} from "@/context/global";
import boxShadowData from "@/data/boxShadow.json";
import {useModalContext} from "@/context/modal";

export default function ModalBoxShadow({isModal}: {
    isModal: boolean;
}) {

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
            setModalData({...modalData, isBoxShadow:false})
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
                        <ModalHeader className="flex flex-col gap-1">box-shadow</ModalHeader>
                        <ModalBody>

                            <div className="flex flex-wrap gap-10">
                                {boxShadowData.map((value: string, key: number) => {
                                    return (
                                        <div key={key}
                                             className={`flex items-center justify-center cursor-pointer text-medium ${modalData.data?.boxShadow === value ? "bg-primary-300" : ""} `}
                                             style={{
                                                 width: 150,
                                                 height: 100,
                                                 boxShadow: value
                                             }}
                                             onClick={() => {
                                                 setAoUpdate({
                                                     type: modalData.type,
                                                     data: modalData.data,
                                                     key: "boxShadow",
                                                     value: value
                                                 })
                                                 onClose()
                                             }}
                                        >
                                            #{key}
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
