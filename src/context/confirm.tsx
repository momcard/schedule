'use client'

import React, {useState, useContext, createContext} from 'react';
import Confirm from "@/components/Confirm";

interface IConfirmContextProps {
    confirm: ({title, content, onCancel, onConfirm}: {
        title: string;
        content: string;
        onCancel?: () => void;
        onConfirm?: () => void;
    }) => Promise<boolean>;
}

interface ConfirmState {
    title: string;
    content: string;
    onCancel: () => void;
    onConfirm: () => void;
}

const ConfirmContext = createContext<IConfirmContextProps>({
    confirm: () => new Promise((_, reject) => reject()),
});

export const useConfirmContext = () => useContext(ConfirmContext);

export const ConfirmProvider = ({children}: { children: React.ReactNode }) => {
    const [state, setState] = useState<ConfirmState>();

    const confirm = ({
                         title = '', content = '', onConfirm = function () {
        }, onCancel = function () {
        }
                     }): Promise<boolean> => {
        return new Promise((resolve) => {
            setState({
                title: title,
                content: content,
                onCancel: async () => {
                    setState(undefined);
                    resolve(false);
                    if (typeof onCancel === 'function') {
                        await onCancel()
                    }
                },
                onConfirm: async () => {
                    setState(undefined);
                    resolve(true);
                    if (typeof onConfirm === 'function') {
                        await onConfirm()
                    }
                },
            });
        });
    };

    return (
        <ConfirmContext.Provider value={{confirm}}>
            {children}
            {state && (
                <Confirm
                    title={state.title}
                    content={state.content}
                    onCancel={state.onCancel}
                    onConfirm={state.onConfirm}
                />
            )}
        </ConfirmContext.Provider>
    );
};