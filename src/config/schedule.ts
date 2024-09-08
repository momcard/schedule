'use client'

import {TypeItem} from "@/types/item";
import {TypeData} from "@/types/data";
import {todayWeek} from "@/utils/date";
import {TypeDesignItem, TypeSchedule} from "@/types/schedule";

const id = "ao"

const templateData: TypeData = require(`@/data/template/${id}/data.json`)
const templateSchedule: TypeSchedule[] = require(`@/data/template/${id}/schedule.json`)
const templateItems: TypeItem[] = require(`@/data/template/${id}/items.json`)
const templateDate: TypeDesignItem[] = require(`@/data/template/${id}/date.json`)
const templateWeek: TypeDesignItem[] = require(`@/data/template/${id}/week.json`)

const aoData: TypeData = {
    locale: 'ko',
    zIndex: 1000,
    width: 1280,
    height: 720,
    backgroundImage: "",
    scheduleStart: todayWeek(),
    scheduleDateFormat: "M/d",
    scheduleWeekFormat: "(eee)",
    scheduleDateDesign: "common",
    scheduleWeekDesign: "common",
    scheduleContentDesign: "individual"
}

export const configAoData: TypeData = {...aoData, ...templateData}

export const configAoSchedule: TypeSchedule[] = templateSchedule

export const configAoItems: TypeItem[] = templateItems

export const configDesignDate: TypeDesignItem[] = templateDate

export const configDesignWeek: TypeDesignItem[] = templateWeek
