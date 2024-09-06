'use client'

import {MoveableManagerInterface, Renderer} from "react-moveable";
import Menu from "@/components/Menu";

export const Editable = {
    name: "editable",
    props: [],
    events: [],
    render(moveable: MoveableManagerInterface<any, any>, React: Renderer) {
        const rect = moveable.getRect();
        const el = moveable.getDragElement();
        const {pos2} = moveable.state;

        // Add key (required)
        // Add class prefix moveable-(required)
        const EditableViewer = moveable.useCSS("div", `
        {
            position: absolute;
            left: 0px;
            top: 0px;
            will-change: transform;
            transform-origin: 0px 0px;
        }
        .custom-button {
            width: 24px;
            height: 24px;
            margin-bottom: 4px;
            background: #4af;
            border-radius: 4px;
            appearance: none;
            border: 0;
            color: white;
            font-weight: bold;
        }
            `);
        return <EditableViewer key={"editable-viewer"} className={"moveable-editable"} style={{
            transform: `translate(${pos2[0]}px, ${pos2[1]}px) rotate(${rect.rotation}deg) translate(10px)`,
        }}>
            {el?.dataset?.id &&
                <Menu type={el.dataset.type || ""} id={el.dataset.id} />
            }
        </EditableViewer>;
    },
} as const;
