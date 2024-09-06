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
import weekFormatData from "@/data/weekFormat.json";
import {format} from "date-fns";
import {ko, ja} from "date-fns/locale";

export default function ModalWeekFormat({isWeekFormat, setIsWeekFormat}: {
    isWeekFormat: boolean;
    setIsWeekFormat: any;
}) {

    const tNavigation = useTranslations('Navigation');
    const {aoData, setAoData} = useGlobalContext();
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    useEffect(() => {

        if (isWeekFormat) {
            onOpen()
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isWeekFormat]);

    useEffect(() => {

        if (isWeekFormat && !isOpen) {
            setIsWeekFormat(false)
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
                        <ModalHeader className="flex flex-col gap-1">{tNavigation('designWeekFormat')}</ModalHeader>
                        <ModalBody>

                            <div className="flex flex-wrap gap-6">
                                {weekFormatData.map((value: string, key: number) => {

                                    return (
                                        <div key={key}
                                             className={`p-4 rounded hover:text-primary flex items-center justify-center cursor-pointer text-medium ${aoData.scheduleWeekFormat === value ? "bg-primary text-white hover:text-white" : ""} `}
                                             style={{
                                                 width: 170,
                                                 boxShadow: value
                                             }}
                                             onClick={() => {
                                                 setAoData({...aoData, "scheduleWeekFormat": value})
                                                 onClose()
                                             }}
                                        >
                                            {aoData.locale === 'ko' && format(aoData.scheduleStart, value, { locale: ko })}
                                            {aoData.locale === 'ja' && format(aoData.scheduleStart, value, { locale: ja })}
                                            {['ko','ja'].indexOf(aoData.locale) === -1 && format(aoData.scheduleStart, value)}
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
