'use client'

import React, { createContext, createRef, useContext } from "react";

const ContainerContext = createContext({});
const containerRef = createRef();

export const ContainerContextProvider = ({children}:{
    children: React.ReactNode;
}) => {
    return (
        <ContainerContext.Provider value={containerRef}>
            {children}
        </ContainerContext.Provider>
    );
};

export const useContainerContext = () => useContext(ContainerContext);