import {addDays, startOfWeek} from "date-fns";

export function todayWeek() {

    return scheduleDate(startOfWeek(startOfWeek(new Date())), 1)

}

export function scheduleDate(date: Date, index: number) {
    return addDays(date, index)
}
