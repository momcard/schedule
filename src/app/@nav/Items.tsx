'use client'

import {TypeItem} from "@/types/item";
import {useGlobalContext} from "@/context/global";

import Content from "@/components/Content";
import Size from "@/components/Size";
import Colors from "@/components/Colors";
import TextAlign from "@/components/TextAlign";
import Font from "@/components/Font";
import Border from "@/components/Border";
import TextShadow from "@/components/TextShadow";

import styles from '@/assets/styles.module.scss'

export default function Items() {

    const {aoItems} = useGlobalContext();

    return (
        <>
            {aoItems?.slice(0).reverse().map((item: TypeItem) => {
                    return (
                        <div key={item.id} className="flex flex-col gap-2 border-dashed border-2 border-primary-500 p-2"
                        >
                            {item.type === 'text' &&
                                <Content type={item.type} data={item}/>
                            }
                            {item.type === 'image' &&
                                <picture className={styles.nav_picture}>
                                    <img src={item.content}
                                         className={styles.nav_img}
                                         alt=""/>
                                </picture>
                            }

                            {item.type === 'text' &&
                                <Size type={item.type} data={item}/>
                            }

                            <Colors type={item.type} data={item}/>

                            {item.type === 'text' &&
                                <TextAlign type={item.type} data={item}/>
                            }

                            {item.type === 'text' &&
                                <Font type={item.type} data={item}/>
                            }

                            <Border type={item.type} data={item}/>

                            {item.type === 'text' &&
                                <TextShadow type={item.type} data={item}/>
                            }
                        </div>
                    )
                }
            )}

        </>
    );
}