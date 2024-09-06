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
import dateFormatData from "@/data/dateFormat.json";

export default function ModalDateFormat({isDateFormat, setIsDateFormat}: {
    isDateFormat: boolean;
    setIsDateFormat: any;
}) {

    const tNavigation = useTranslations('Navigation');
    const {aoData, setAoData} = useGlobalContext();
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    useEffect(() => {

        if (isDateFormat) {
            onOpen()
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDateFormat]);

    useEffect(() => {

        if (isDateFormat && !isOpen) {
            setIsDateFormat(false)
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
                        <ModalHeader className="flex flex-col gap-1">{tNavigation('designDateFormat')}</ModalHeader>
                        <ModalBody>

                            <div className="flex flex-wrap gap-6">
                                {dateFormatData.map((value: string, key: number) => {

                                    return (
                                        <div key={key}
                                             className={`p-4 rounded hover:text-primary flex items-center justify-center cursor-pointer text-medium ${aoData.scheduleDateFormat === value ? "bg-primary text-white hover:text-white" : ""} `}
                                             style={{
                                                 width: 170,
                                                 boxShadow: value
                                             }}
                                             onClick={() => {
                                                 setAoData({...aoData, "scheduleDateFormat": value})
                                                 onClose()
                                             }}
                                        >
                                            {value}
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
