'use client'

import Size from "@/components/Size";
import Colors from "@/components/Colors";
import TextAlign from "@/components/TextAlign";
import Font from "@/components/Font";
import Border from "@/components/Border";
import TextShadow from "@/components/TextShadow";

export default function DesignCommon({type, data}: {
    type: string;
    data: any;
}) {

    return (
        <>

            <Size type={type} data={data}/>

            <Colors type={type} data={data}/>

            <TextAlign type={type} data={data}/>

            <Font type={type} data={data}/>

            <Border type={type} data={data}/>

            <TextShadow type={type} data={data}/>

        </>
    );

}