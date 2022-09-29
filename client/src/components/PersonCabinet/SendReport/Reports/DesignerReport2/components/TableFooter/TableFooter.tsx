import {CellWrapper} from "../CellWrapper/CellWrapper";
import React from "react";

interface Props {
    addProjectReport: () => void
}


export const TableFooter = React.memo(({addProjectReport}:Props) => {
    const cells = [
        <div style={{gridColumn: '1 / 5'}} />,
        <CellWrapper>
            <button onClick={addProjectReport}>add</button>
        </CellWrapper>

    ]

    return <>{cells.map(cell => cell)}</>
})