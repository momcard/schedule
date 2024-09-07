import type {Metadata} from "next";
import {NextIntlClientProvider} from "next-intl";
import {getLocale, getMessages} from "next-intl/server";
import {Providers} from "@/app/providers";
import {GlobalContextProvider} from "@/context/global";
import {ModalContextProvider} from "@/context/modal";
import {ContainerContextProvider} from "@/context/container";

import "@/assets/globals.scss";
import styles from '@/assets/styles.module.scss'
import {TypeFont} from "@/types/font.ts";

export const metadata: Metadata = {
    title: "AO",
    description: "AO",
};

export default async function RootLayout({children, nav, dashboard}: Readonly<{
    children: React.ReactNode;
    nav: React.ReactNode;
    dashboard: React.ReactNode;
}>) {

    const locale = await getLocale();
    const messages = await getMessages();
    const fontList: TypeFont[] = require(`@/data/font/${locale}.json`)

    import(`@/assets/font/${locale}/styles.scss`)

    return (
        <html lang={locale} className='light'>
        <body className={`font-NotoSansKRRegular`}>
        <Providers>
            <NextIntlClientProvider messages={messages}>
                <GlobalContextProvider locale={locale} fontList={fontList}>
                    <ModalContextProvider>
                        <ContainerContextProvider>
                            <div className={styles.root}>
                                {nav}
                                <main className={`main ${styles.main}`}>
                                    {dashboard}
                                    {children}
                                </main>
                            </div>
                        </ContainerContextProvider>
                    </ModalContextProvider>
                </GlobalContextProvider>
            </NextIntlClientProvider>
        </Providers>
        </body>
        </html>
    );
}