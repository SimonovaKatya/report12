import React from "react";
import {ProjectReport} from "../../types/Models";

interface Props {
    projectReports: ProjectReport[]
}

export const TableStatistic = ({projectReports}: Props) => {
    const projectReportsSum = (field: 'hours' | 'listsNumber') => {
        return projectReports.reduce((projectReportSum, projectReport) => {
            return projectReportSum + projectReport.comments.reduce((sum, comment) => sum + +comment[field], 0)
        }, 0)
    }

    const onSubmit = (): void => {
        console.log(projectReports)
    }

    const isDisableSubmitBtn = (): boolean => {
        if(!projectReports.length) return true

        return projectReports.some(({project,comments}) => {
            if(!project) return true
            return comments.some(({listsNumber,hours,info,workPercent}) =>{
                return !listsNumber || !hours || !info || !workPercent
            })
        })
    }

    return (
        <div style={{display: "flex", flexDirection: 'column', alignItems: 'flex-end'}}>
            <div id={'hours-result'} style={{textAlign: 'end'}}>Итого: {projectReportsSum('hours')} ч.</div>
            <div style={{textAlign: 'end'}}>Итого: {projectReportsSum('listsNumber')} листов</div>
            <button disabled={isDisableSubmitBtn()} onClick={onSubmit}>отправить</button>
        </div>
    )
}