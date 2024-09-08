import React, {useState,useEffect} from "react";
import {
    Button,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody, ModalFooter, useDisclosure
} from "@nextui-org/react";
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";
import {useTranslations} from "next-intl";
import {useGlobalContext} from "@/context/global";
import {useAlertContext} from "@/context/alert";
import {useConfirmContext} from "@/context/confirm";

import {TypeTemplate} from "@/types/template.ts";
import templateList from "@/data/template.json";
import {Loader} from "@/components/Loader.tsx";

export default function ModalTemplate({isModal, setIsModal}: {
    isModal: boolean;
    setIsModal: (v: boolean) => void;
}) {

    const tTemplate = useTranslations('Template');
    const tError = useTranslations('Error');
    const {aoData, setAoData, setAoSchedule, setAoItems, setDesignDate, setDesignWeek} = useGlobalContext();
    const {alert} = useAlertContext();
    const {confirm} = useConfirmContext();
    const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();
    const [progress, setProgress] = useState(false)

    const templateConfirm = (id:string) => {
        return confirm({
            title: tTemplate('confirm.title'),
            content: tTemplate('confirm.content'),
            onConfirm: async function () {
                await templateUpdate(id)
            }
        });
    }

    const templateUpdate = async (id: string) => {

        setProgress(true);

        await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/template`, {
            cache: 'no-store',
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id
            }),
        })
            .then(response => response.json())
            .then(data => {

                if (data?.error) {
                    throw new Error(data?.error?.message || tError('message'));
                }

                if (data?.templateData) {
                    setAoData({...aoData, ...data.templateData})
                }

                if (data?.templateSchedule) {
                    setAoSchedule(data.templateSchedule)

                }

                if (data?.templateItems) {
                    setAoItems(data.templateItems)
                }

                if (data?.templateDate) {
                    setDesignDate(data.templateDate)
                }


                if (data?.templateWeek) {
                    setDesignWeek(data.templateWeek)
                }

                setProgress(false)
                onClose()

            })
            .catch(error => {
                console.error(error);
                setProgress(false)
                if (typeof error.message === 'string') {
                    alert({
                        title: tError('title'),
                        content: error.message,
                    });
                }
            });

    }

    useEffect(() => {

        if (isModal) {
            onOpen()
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isModal]);

    useEffect(() => {

        if (isModal && !isOpen) {
            setIsModal(false)
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
                        <ModalHeader className="flex flex-col gap-1">Template</ModalHeader>
                        <ModalBody>
                            {progress && (
                                <Loader />
                            )}
                            <div className="flex flex-wrap gap-10">
                                {templateList.map((item: TypeTemplate, index: number) => {
                                    return (
                                        <Card shadow="sm" key={index} isPressable
                                              onPress={() => templateConfirm(item.id)}>
                                            <CardBody className="overflow-visible p-0">
                                                <Image
                                                    shadow="sm"
                                                    radius="lg"
                                                    width="100%"
                                                    alt={item.title}
                                                    className="w-full object-cover h-[140px]"
                                                    src={`/template/${item.id}.png`}
                                                />
                                            </CardBody>
                                            <CardFooter className="text-small justify-between">
                                                <b>{item.title}</b>
                                            </CardFooter>
                                        </Card>
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
