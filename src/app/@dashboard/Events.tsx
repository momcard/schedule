'use client'

import {useEffect, useRef, useState} from "react";
import Moveable from "react-moveable";
import Selecto from "react-selecto";
import {TypeItem} from "@/types/item";
import {Viewable} from "@/components/Viewable";
import {Editable} from "@/components/Editable";
import {useGlobalContext} from "@/context/global";
import {TypeDesignItem, TypeSchedule} from "@/types/schedule";

export default function Events() {

    const {aoItems, setAoItems, aoSchedule, setAoSchedule, designDate, setDesignDate, designWeek, setDesignWeek} = useGlobalContext();

    const [targets, setTargets] = useState<Array<SVGElement | HTMLElement>>([]);
    const moveableRef = useRef<Moveable>(null);
    const selectoRef = useRef<Selecto>(null);
    const [keepRatio, setKeepRatio] = useState(false)
    const [count, setCount] = useState(0)

    useEffect(() => {

        if (aoItems?.length != count) {
            setCount(aoItems?.length || 0)
            setTargets([])
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [aoItems?.length]);

    return (
        <>
            <Moveable
                ref={moveableRef}
                target={targets}
                ables={[Viewable, Editable]}
                snappable={true}
                bounds={{left: 0, top: 0, bottom: 0, right: 0, position: "css"}}
                draggable={true}
                resizable={true}
                scalable={true}
                keepRatio={keepRatio}
                rotatable={true}
                pinchable={false}
                pinchOutside={true}
                useResizeObserver={true}
                props={{
                    dimensionViewable: true,
                    editable: true,
                }}
                onRender={e => {
                    e.target.style.cssText += e.cssText;

                    const type = e.target.dataset.type
                    if (!type) return;

                    if (type === 'image') {
                        if (!keepRatio) setKeepRatio(true)
                    } else {
                        if (keepRatio) setKeepRatio(false)
                    }

                }}
                onRenderEnd={e => {

                    const target = e.target as HTMLElement
                    const type = target.dataset.type

                    if (!type) return;

                    if (["text","image"].indexOf(type) !== -1) {

                        const item: TypeItem | undefined = aoItems?.find(v => v.id === Number(target.dataset.id));


                        if (!item?.id) return;

                        if (target?.offsetWidth) item.width = target.offsetWidth;
                        if (target?.offsetHeight) item.height = target.offsetHeight;
                        if (e.transform) item.transform = e.transform;

                        setAoItems({...item})

                    } else if (type === 'schedule') {

                        const item: TypeSchedule | undefined = aoSchedule?.find(v => v.id === Number(target.dataset.id));

                        if (!item?.id) return;

                        if (target?.offsetWidth) item.width = target.offsetWidth;
                        if (target?.offsetHeight) item.height = target.offsetHeight;
                        if (e.transform) item.transform = e.transform;

                        setAoSchedule({...item})

                    } else if (type === 'date') {

                        const item: TypeDesignItem | undefined = designDate?.find(v => v.id === Number(target.dataset.id));

                        if (!item?.id) return;

                        if (target?.offsetWidth) item.width = target.offsetWidth;
                        if (target?.offsetHeight) item.height = target.offsetHeight;
                        if (e.transform) item.transform = e.transform;

                        setDesignDate({...item})

                    } else if (type === 'week') {

                        const item: TypeDesignItem | undefined = designWeek?.find(v => v.id === Number(target.dataset.id));

                        if (!item?.id) return;

                        if (target?.offsetWidth) item.width = target.offsetWidth;
                        if (target?.offsetHeight) item.height = target.offsetHeight;
                        if (e.transform) item.transform = e.transform;

                        setDesignWeek({...item})

                    }

                }}
                onDrag={e => {
                    e.target.style.transform = e.transform;
                }}
                onResize={e => {
                    e.target.style.width = `${e.width}px`;
                    e.target.style.height = `${e.height}px`;
                    e.target.style.transform = e.drag.transform;
                }}
                onRotate={e => {
                    e.target.style.transform = e.drag.transform;
                }}
                onClickGroup={e => {
                    selectoRef.current!.clickTarget(e.inputEvent, e.inputTarget);
                }}
                onDragGroup={e => {
                    e.events.forEach(ev => {
                        ev.target.style.transform = ev.transform;
                    });
                }}
                onDragGroupEnd={e => {

                    let updateItems:TypeItem[] = [];
                    let updateSchedule:TypeSchedule[] = [];
                    let updateDate:TypeDesignItem[] = [];
                    let updateWeek:TypeDesignItem[] = [];

                    e.events.forEach(ev => {

                        const target = ev.target as HTMLElement
                        const type = ev.target.dataset.type

                        if (!type) return;
                        if (!ev?.lastEvent?.transform) return;

                        if (["text","image"].indexOf(type) !== -1) {

                            const item: TypeItem | undefined = aoItems?.find(v => v.id === Number(target.dataset.id));

                            if (!item?.id) return;

                            updateItems = [...updateItems, {...item, transform: ev.lastEvent.transform}]

                        } else if (type === 'schedule') {

                            let item: TypeSchedule | undefined = aoSchedule?.find(v => v.id === Number(target.dataset.id));

                            if (!item?.id) return;

                            updateSchedule = [...updateSchedule, {...item, transform: ev.lastEvent.transform}]

                        } else if (type === 'date') {

                            let item: TypeDesignItem | undefined = designDate?.find(v => v.id === Number(target.dataset.id));

                            if (!item?.id) return;

                            updateDate = [...updateDate, {...item, transform: ev.lastEvent.transform}]

                        } else if (type === 'week') {

                            let item: TypeDesignItem | undefined = designWeek?.find(v => v.id === Number(target.dataset.id));

                            if (!item?.id) return;

                            updateWeek = [...updateWeek, {...item, transform: ev.lastEvent.transform}]

                        }

                    });

                    if (updateItems && updateItems.length) {

                        let newAoItems:TypeItem[] = [];
                        aoItems?.map((item:TypeItem) => {

                            const change:TypeItem|undefined = updateItems?.find(v => v.id === item.id)
                            if (change?.id) {

                                newAoItems = [...newAoItems, {...change}]

                            } else {

                                newAoItems = [...newAoItems, {...item}]

                            }

                        })

                        setAoItems(newAoItems)

                    }

                    if (updateSchedule && updateSchedule.length) {

                        let newSchedule:TypeSchedule[] = [];
                        aoSchedule?.map((item:TypeSchedule) => {

                            const change:TypeSchedule|undefined = updateSchedule?.find(v => v.id === item.id)
                            if (change?.id) {

                                newSchedule = [...newSchedule, {...change}]

                            } else {

                                newSchedule = [...newSchedule, {...item}]

                            }

                        })

                        setAoSchedule(newSchedule)

                    }

                    if (updateDate && updateDate.length) {

                        let newDesignDate:TypeDesignItem[] = [];
                        designDate?.map((item:TypeDesignItem) => {

                            const change:TypeDesignItem|undefined = updateDate?.find(v => v.id === item.id)
                            if (change?.id) {

                                newDesignDate = [...newDesignDate, {...change}]

                            } else {

                                newDesignDate = [...newDesignDate, {...item}]

                            }

                        })

                        setDesignDate(newDesignDate)

                    }

                    if (updateWeek && updateWeek.length) {

                        let newDesignWeek:TypeDesignItem[] = [];
                        designWeek?.map((item:TypeDesignItem) => {

                            const change:TypeDesignItem|undefined = updateWeek?.find(v => v.id === item.id)
                            if (change?.id) {

                                newDesignWeek = [...newDesignWeek, {...change}]

                            } else {

                                newDesignWeek = [...newDesignWeek, {...item}]

                            }

                        })

                        setDesignWeek(newDesignWeek)

                    }

                }}
            />

            <Selecto
                ref={selectoRef}
                dragContainer={".main"}
                selectableTargets={[".cube"]}
                hitRate={0}
                selectByClick={true}
                selectFromInside={false}
                toggleContinueSelect={["shift"]}
                ratio={0}
                onDragStart={e => {
                    const moveable = moveableRef.current!;
                    const target = e.inputEvent.target;
                    if (
                        moveable.isMoveableElement(target)
                        || targets.some(t => t === target || t.contains(target))
                    ) {
                        e.stop();
                    }
                }}
                onSelectEnd={e => {
                    const moveable = moveableRef.current!;
                    if (e.isDragStart) {
                        e.inputEvent.preventDefault();

                        moveable.waitToChangeTarget().then(() => {
                            moveable.dragStart(e.inputEvent);
                        });
                    }
                    setTargets(e.selected);
                }}
            ></Selecto>
        </>
    )
}