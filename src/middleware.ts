import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import Negotiator from "negotiator";
import { match } from "@formatjs/intl-localematcher";

function getLocale(request: NextRequest): string | undefined {
    const negotiatorHeaders: Record<string, string> = {};
    request.headers.forEach((value, key) => {
        negotiatorHeaders[key] = value;
    });
    const locales: string[] = ["ko", "ja", "en"];
    const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
    return match(languages, locales, "ko");
}

export default async function middleware(request: NextRequest) {

    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('locale', getLocale(request) || "ko")

    return NextResponse.next({
        request: {
            // New request headers
            headers: requestHeaders,
        },
    })

}
