import {useEffect} from "react";
import {Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";

import {useTranslations} from "next-intl";

interface Props {
    title: string;
    content: string;
    onCancel: () => void;
    onConfirm: () => void;
}

const Confirm = ({ title, content, onConfirm, onCancel }: Props) => {

    const tButton = useTranslations('Button');
    const {isOpen, onOpen, onClose} = useDisclosure();

    const handleChange = () => {

        handleBack();

    };

    const handleBack = () => {

        onClose();
        onCancel();

    };

    const handleConfirm = () => {

        onClose();
        onConfirm();

    }

    useEffect(() => {

        onOpen()

    }, [onOpen]);

    useEffect(() => {
        const handleEnter = (e: KeyboardEvent) => {
            if (e.key === "Enter") {
                handleConfirm();
            }
        };
        window.addEventListener("keydown", handleEnter);
        return () =>
            window.removeEventListener("keydown", handleEnter);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Modal isOpen={isOpen}
               onOpenChange={handleChange}
               placement="center"
               scrollBehavior={`inside`}
               classNames={{
                   backdrop: "z-[100000]",
                   wrapper: "z-[100000]",
               }}
               hideCloseButton={true}
        >
            <ModalContent>
                <ModalHeader>
                   {title}
                </ModalHeader>
                <ModalBody>
                    <div dangerouslySetInnerHTML={{ __html: content }} className=""></div>
                </ModalBody>
                <ModalFooter>
                    <Button color={`primary`} onPress={handleConfirm}>
                        {tButton('confirm')}
                    </Button>
                    <Button color={`default`} onPress={handleBack}>
                        {tButton('cancel')}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default Confirm;