'use client'

import {useEffect, useState} from "react";
import {useGlobalContext} from "@/context/global";
import {getLocalStorage, setLocalStorage} from "@/utils/storage";

export function useStorage() {

    const {aoData, aoSchedule, aoItems, setAoData, setAoSchedule, setAoItems, designDate, setDesignDate, designWeek, setDesignWeek} = useGlobalContext();
    const [mount, setMount] = useState(false)

    useEffect(() => {

        setMount(true)

        const storageData = getLocalStorage("ao-data");
        const storageSchedule = getLocalStorage("ao-schedule");
        const storageItems = getLocalStorage("ao-items");
        const storageDesignDate = getLocalStorage("ao-design-date");
        const storageDesignWeek = getLocalStorage("ao-design-week");

        if (storageData) {

            setAoData(storageData)

        }

        if (storageSchedule) {

            setAoSchedule(storageSchedule)

        }

        if (storageItems) {

            setAoItems(storageItems)

        }

        if (storageDesignDate) {

            setDesignDate(storageDesignDate)

        }

        if (storageDesignWeek) {

            setDesignWeek(storageDesignWeek)

        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {

        if (mount) {

            setLocalStorage("ao-data", aoData)

        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [aoData]);

    useEffect(() => {

        if (mount) {

            setLocalStorage("ao-schedule", aoSchedule)

        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [aoSchedule]);

    useEffect(() => {

        if (mount) {

            setLocalStorage("ao-items", aoItems)

        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [aoItems]);

    useEffect(() => {

        if (mount) {

            setLocalStorage("ao-design-date", designDate)

        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [designDate]);

    useEffect(() => {

        if (mount) {

            setLocalStorage("ao-design-week", designWeek)

        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [designWeek]);

    return null;
}