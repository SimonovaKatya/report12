import React from "react";
import s from './DesignerReport2.module.scss'
import {TableHeader} from "./components/TableHeader/TableHeader";
import {ProjectReport} from "./components/ProjectReport/ProjectReport";
import {TableFooter} from "./components/TableFooter/TableFooter";
import {useProjectReports} from "./hooks/useProjectReports";
import {TableStatistic} from "./components/TableStatistic/TableStatistic";

export const DesignerReport2 = () => {
    const {
        deleteProjectReport,
        addProjectReport,
        projectReports,
        addProjectReportComment,
        deleteProjectReportComment,
        onCommentChange,
        onProjectChange
    } = useProjectReports()

    return (
        <>
            <div className={s['table']}>
                <TableHeader/>
                {projectReports.map((projectReport) => (
                        <ProjectReport addProjectReportComment={addProjectReportComment}
                                       deleteProjectReportComment={deleteProjectReportComment}
                                       projectReport={projectReport}
                                       deleteProjectReport={deleteProjectReport}
                                       onCommentChange={onCommentChange}
                                       onProjectChange={onProjectChange}
                        />
                    )
                )}
                <TableFooter addProjectReport={addProjectReport}/>
            </div>
            <TableStatistic projectReports={projectReports}/>
        </>
    )
}
