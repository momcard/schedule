'use client'

import {Spinner} from "@nextui-org/react";

interface LoaderProps {
    overlay?: boolean | undefined;
    color?: string | undefined;
}

export function Loader({overlay = true, color = "default"}: LoaderProps) {

    return (
        <>
            <Spinner color="primary" size="lg" className="z-[10000002] absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"/>
            <div className="opacity-0 fixed left-0 top-0 z-[10000000] min-w-[100vw] min-h-[100vh]"></div>
        </>
    );

}