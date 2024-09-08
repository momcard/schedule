'use client'

import React, {useState, useContext, createContext} from 'react';
import Alert from "@/components/Alert.tsx";

interface IAlertContextProps {
    alert: ({title, content, onConfirm}: {
        title: string;
        content: string;
        onConfirm?: () => void;
    }) => Promise<boolean>;
}

interface AlertState {
    title: string;
    content: string;
    onConfirm: () => void;
}

const AlertContext = createContext<IAlertContextProps>({
    alert: () => new Promise((_, reject) => reject()),
});

export const useAlertContext = () => useContext(AlertContext);

export const AlertProvider = ({children}: { children: React.ReactNode }) => {
    const [state, setState] = useState<AlertState>();

    const alert = ({
                       title = '', content = '', onConfirm = function () {
        }
                   }): Promise<boolean> => {
        return new Promise((resolve) => {
            setState({
                title: title,
                content: content,
                onConfirm: async () => {
                    setState(undefined);
                    resolve(true);
                    if (typeof onConfirm === 'function') {
                        onConfirm()
                    }
                },
            });
        });
    };

    return (
        <AlertContext.Provider value={{alert}}>
            {children}
            {state && (
                <Alert
                    title={state.title}
                    content={state.content}
                    onConfirm={state.onConfirm}
                />
            )}
        </AlertContext.Provider>
    );
};
