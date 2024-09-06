'use client'

import React, {useState, useContext} from 'react';
import {TypeModal} from "@/types/modal";

interface IModalContextProps {
    modalData: any;
    setModalData: (value: any) => void;
}

export const ModalContext = React.createContext<IModalContextProps>({
    modalData: {},
    setModalData: () => {
    },
});

export const useModalContext = () => useContext(ModalContext);

export const ModalContextProvider = ({children}: {
    children: React.ReactNode;
}) => {

    const [modalData, setModalData] = useState<TypeModal>({
        type:"",
        data: {},
        isFont: false,
        isBoxShadow: false,
        isTextShadow: false,
    })

    return (
        <ModalContext.Provider
            value={{
                modalData: modalData,
                setModalData: setModalData,
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};
