import {NextResponse} from "next/server";
import {getTranslations} from "next-intl/server";

import {TypeTemplate} from "@/types/template.ts";
import {TypeData} from "@/types/data.ts";
import {TypeDesignItem, TypeSchedule} from "@/types/schedule.ts";
import {TypeItem} from "@/types/item.ts";

import templateList from "@/data/template.json";

export async function PUT(
    req: Request,
) {

    const t = await getTranslations('Error');
    const data = await req.json()

    if (!data.id) {
        return NextResponse.json({
            error: {
                code: 'id',
                message: t('template'),
            }
        }, {status: 400});
    }

    const template: TypeTemplate | undefined = templateList?.find(v => v.id === data.id);
    if (!template?.id) {
        return NextResponse.json({
            error: {
                code: 'id',
                message: t('template'),
            }
        }, {status: 400});
    }

    const templateData: TypeData = require(`@/data/template/${data.id}/data.json`)
    const templateSchedule: TypeSchedule[] = require(`@/data/template/${data.id}/schedule.json`)
    const templateItems: TypeItem[] = require(`@/data/template/${data.id}/items.json`)
    const templateDate: TypeDesignItem[] = require(`@/data/template/${data.id}/date.json`)
    const templateWeek: TypeDesignItem[] = require(`@/data/template/${data.id}/week.json`)

    return NextResponse.json({
        templateData: templateData,
        templateSchedule: templateSchedule,
        templateItems: templateItems,
        templateDate: templateDate,
        templateWeek: templateWeek,
    }, {status: 200});

}