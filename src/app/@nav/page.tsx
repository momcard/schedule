import React from 'react';
import Download from "@/app/@nav/Download";
import Background from "@/app/@nav/Background";
import Create from "@/app/@nav/Create";
import Control from "@/app/@nav/Control";
import Schedule from "@/app/@nav/Schedule";
import Items from "@/app/@nav/Items";

import styles from '@/assets/styles.module.scss'
import Template from "@/app/@nav/Template.tsx";

export default function Page() {

    return (
        <nav className={styles.nav}>

            <Template/>

            <Download/>

            <Background/>

            <Control/>

            <Schedule/>

            <Create/>

            <Items/>

        </nav>
    );
}