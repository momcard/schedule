'use client'

import React, {useState, useContext} from 'react';
import {TypeData} from "@/types/data";
import {TypeItem} from "@/types/item";
import {configAoData, configAoItems, configAoSchedule, configDesignDate, configDesignWeek} from "@/config/schedule";
import {TypeDesignItem, TypeSchedule} from "@/types/schedule";
import {TypeFont} from "@/types/font.ts";

interface IGlobalContextProps {
    fontList: TypeFont[];
    setAoUpdate: (value: any) => void;

    aoData: any;
    setAoData: (value: any) => void;

    aoSchedule: TypeSchedule[];
    setAoSchedule: (value: any) => void;

    aoItems: TypeItem[];
    setAoItems: (value: any) => void;
    delAoItems: (value: number) => void;

    designDate: TypeDesignItem[];
    setDesignDate: (value: any) => void;

    designWeek: TypeDesignItem[];
    setDesignWeek: (value: any) => void;
}

const GlobalContext = React.createContext<IGlobalContextProps>({
    fontList: [],

    setAoUpdate: () => {
    },

    aoData: {},
    setAoData: () => {
    },

    aoSchedule: [],
    setAoSchedule: () => {
    },

    aoItems: [],
    setAoItems: () => {
    },
    delAoItems: () => {
    },

    designDate: [],
    setDesignDate: () => {
    },

    designWeek: [],
    setDesignWeek: () => {
    },
});

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalContextProvider = ({locale, fontList, children}: {
    locale: string;
    fontList: any;
    children: React.ReactNode;
}) => {

   // const [fontList, setFontList] = useState<TypeFont[]>(fontList)

    const [aoData, setAoData] = useState<TypeData>({...configAoData, locale: locale})
    const [aoSchedule, setCurrentAoSchedule] = useState<TypeSchedule[]>(configAoSchedule)
    const [aoItems, setCurrentItems] = useState<TypeItem[]>(configAoItems)
    const [designDate, setCurrentDesignDate] = useState<TypeDesignItem[]>(configDesignDate)
    const [designWeek, setCurrentDesignWeek] = useState<TypeDesignItem[]>(configDesignWeek)

    const setAoUpdate = ({type, data, key, value}: {
        type: string;
        data: any;
        key: string;
        value: any;
    }) => {

        if (["text", "image"].indexOf(type) !== -1) {

            setAoItems({...data, [key]: value})

        } else if (type === 'schedule') {

            setAoSchedule({...data, [key]: value})

        } else if (type === 'date') {

            setDesignDate({...data, [key]: value})

        } else if (type === 'week') {

            setDesignWeek({...data, [key]: value})

        } else if (type === 'schedule_common') {

            const update = aoSchedule.map(item => {
                item = {...item, [key]: value}
                return item;
            });

            setCurrentAoSchedule(update);

        } else if (type === 'date_common') {

            const update = designDate.map(item => {
                item = {...item, [key]: value}
                return item;
            });

            setCurrentDesignDate(update);

        } else if (type === 'week_common') {

            const update = designWeek.map(item => {
                item = {...item, [key]: value}
                return item;
            });

            setCurrentDesignWeek(update);

        }

    }

    const setAoSchedule = (item: TypeSchedule | TypeSchedule[]) => {

        if (Array.isArray(item) === false) {

            const update = aoSchedule.map((o) => {
                if (o.id === item.id) {
                    return item;
                } else {
                    return o;
                }
            });

            setCurrentAoSchedule(update);

        } else {

            setCurrentAoSchedule(item);

        }

    };

    const setAoItems = (item: TypeItem | TypeItem[]) => {

        if (Array.isArray(item) === false) {

            const update = aoItems.map((o) => {
                if (o.id === item.id) {
                    return item;
                } else {
                    return o;
                }
            });

            setCurrentItems(update);

        } else {

            setCurrentItems(item);

        }

    };

    const delAoItems = (id: number) => {
        const newItems = aoItems.filter(item => item.id !== id);
        setCurrentItems(newItems);
    }

    const setDesignDate = (item: TypeDesignItem | TypeDesignItem[]) => {

        if (Array.isArray(item) === false) {

            const update = designDate.map((o) => {
                if (o.id === item.id) {
                    return item;
                } else {
                    return o;
                }
            });

            setCurrentDesignDate(update);

        } else {

            setCurrentDesignDate(item);

        }

    };

    const setDesignWeek = (item: TypeDesignItem | TypeDesignItem[]) => {

        if (Array.isArray(item) === false) {

            const update = designWeek.map((o) => {
                if (o.id === item.id) {
                    return item;
                } else {
                    return o;
                }
            });

            setCurrentDesignWeek(update);

        } else {

            setCurrentDesignWeek(item);

        }

    };

    return (
        <GlobalContext.Provider
            value={{
                fontList: fontList,

                setAoUpdate: setAoUpdate,

                aoData: aoData,
                setAoData: setAoData,

                aoItems: aoItems,
                setAoItems: setAoItems,
                delAoItems: delAoItems,

                aoSchedule: aoSchedule,
                setAoSchedule: setAoSchedule,

                designDate: designDate,
                setDesignDate: setDesignDate,

                designWeek: designWeek,
                setDesignWeek: setDesignWeek,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
