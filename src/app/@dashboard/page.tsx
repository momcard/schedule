'use client'

import {useEffect, useState} from "react";
import {Spinner} from "@nextui-org/react";
import {useGlobalContext} from "@/context/global";
import {useContainerContext} from "@/context/container";

import ItemDate from "@/app/@dashboard/itemDate";
import ItemText from "@/app/@dashboard/itemText";
import ItemImage from "@/app/@dashboard/itemImage";
import Events from "@/app/@dashboard/Events";

import styles from '@/assets/styles.module.scss'
import {useTranslations} from "next-intl";

export default function Page() {

    const tFooter = useTranslations('Footer');
    const {aoData} = useGlobalContext();
    const containerRef: any = useContainerContext();
    const [mount, setMount] = useState(false)

    useEffect(() => {

        setMount(true)

    }, []);

    return (
        <>
            <div className={styles.wrap}>
                <div ref={containerRef} className={`container ${styles.container}`} style={{
                    width: aoData.width,
                    height: aoData.height,
                    backgroundImage: `url('${aoData.backgroundImage}')`
                }}>

                    {!mount &&
                        <div className="w-full h-full flex justify-center items-center">
                            <Spinner size="lg"/>
                        </div>
                    }

                    {mount &&
                        <>
                            <ItemDate/>
                            <ItemText/>
                            <ItemImage/>
                            <Events/>
                        </>
                    }

                </div>
            </div>
            <div className="flex flex-col gap-1 absolute right-0 bottom-0 p-5">
                <div className="text-small text-right whitespace-pre text-gray-400">
                    {tFooter('message')}
                </div>
                <div className="text-small text-right whitespace-pre text-gray-500">
                    {tFooter.rich('ao', {
                        guidelines: () => <a href="https://bj.afreecatv.com/vhzaoadmiral" target="_blank" className="text-sm">https://bj.afreecatv.com/vhzaoadmiral</a>
                    })}
                </div>
            </div>
        </>
    );
}
