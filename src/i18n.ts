import {getRequestConfig} from 'next-intl/server';
import {headers} from 'next/headers';
import {notFound} from 'next/navigation';

const locales = ["ko", "ja", "en"];

export default getRequestConfig(async () => {

    const headersList = headers();
    const locale = headersList.get("locale") || "ko";

    if (!locales.includes(locale as any)) notFound();

    return {
        locale,
        messages: (await import(`../messages/${locale}.json`)).default
    };

});