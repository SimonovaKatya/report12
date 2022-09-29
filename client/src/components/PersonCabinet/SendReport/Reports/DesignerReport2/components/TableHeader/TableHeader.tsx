import React from "react";
import {CellWrapper} from "../CellWrapper/CellWrapper";

export const TableHeader = React.memo(() => {
    const titles = ['Проект', "Часы", "Архив", "Проблемы и комментарии", ""]

    return <>{titles.map((title,index) => <CellWrapper key={index}>{title}</CellWrapper>)}</>
})