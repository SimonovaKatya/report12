import React from "react";

interface Props {
    children: React.ReactNode
}

export const CellWrapper = ({children}: Props) => {
    return <div style={{padding: '1rem'}}>{children}</div>
}