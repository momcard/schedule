'use client'

import  { MoveableManagerInterface, Renderer } from "react-moveable";

export const Viewable = {
    name: "dimensionViewable",
    props: [],
    events: [],
    render(moveable: MoveableManagerInterface<any, any>, React: Renderer) {
        const rect = moveable.getRect();

        // Add key (required)
        // Add class prefix moveable-(required)
        return <div key={"dimension-viewer"} className={"moveable-dimension"} style={{
            position: "absolute",
            left: `${rect.width / 2}px`,
            top: `${rect.height + 20}px`,
            background: "#4af",
            borderRadius: "2px",
            padding: "2px 4px",
            color: "white",
            fontSize: "13px",
            whiteSpace: "nowrap",
            fontWeight: "bold",
            willChange: "transform",
            transform: `translate(-50%, 0px)`,
        }}>
            {Math.round(rect.offsetWidth)} x {Math.round(rect.offsetHeight)}
        </div>;
    },
} as const;
