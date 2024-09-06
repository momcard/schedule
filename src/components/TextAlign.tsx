'use client'

import {useTranslations} from "next-intl";
import {Tab, Tabs} from "@nextui-org/react";
import {useGlobalContext} from "@/context/global";

export default function TextAlign({data, type}: {
    data: any;
    type: string;
}) {

    const tTabs = useTranslations('Tabs');
    const {setAoUpdate} = useGlobalContext();

    return (
        <>
            <Tabs
                size="sm"
                color="primary"
                aria-label="textAlign"
                selectedKey={data.textAlign}
                onSelectionChange={(key) => {
                    if (key === data.textAlign) return;
                    setAoUpdate({
                        type: type,
                        data: data,
                        key: "textAlign",
                        value: key.toString()
                    })
                }}
                classNames={{
                    tabList: "w-full"
                }}
            >
                <Tab key="left" title={tTabs('left')}/>
                <Tab key="center" title={tTabs('center')}/>
                <Tab key="right" title={tTabs('right')}/>
            </Tabs>
        </>
    )

}