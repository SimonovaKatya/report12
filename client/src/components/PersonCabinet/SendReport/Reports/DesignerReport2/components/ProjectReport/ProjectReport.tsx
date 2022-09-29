import React, {SyntheticEvent} from "react";
import DropDownList from "../../../UserReport/ProjectList/DropDownList/DropDownList";
import {CellWrapper} from "../CellWrapper/CellWrapper";
import {ProjectComments} from "./ProjectComments/ProjectComments";
import {ProjectReport as ProjectReportType} from "../../types/Models";

interface Props {
    projectReport: ProjectReportType
    deleteProjectReport: (id: number) => void
    addProjectReportComment: (id: number) => void
    deleteProjectReportComment: (params: { projectReportId: number, projectReportCommentId: number }) => void
    onCommentChange: (params: { projectReportId: number, projectReportCommentId: number }) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    onProjectChange: (projectReportId: number) => (e: SyntheticEvent<Element, Event>) => void
}

export const ProjectReport = (props: Props) => {
    const {
        projectReport,
        deleteProjectReport,
        deleteProjectReportComment,
        addProjectReportComment,
        onCommentChange,
        onProjectChange
    } = props

    const onDelete = (): void => deleteProjectReport(projectReport.id)

    const projectSum = (field: 'hours' | 'listsNumber'): number => {
        return projectReport.comments.reduce((sum, comment) => sum + +comment[field], 0)
    }

    const cells = [
        <DropDownList onChange={(e) => onProjectChange(projectReport.id)(e)} value={projectReport.project}/>,
        <CellWrapper>{projectSum('hours')}</CellWrapper>,
        <CellWrapper>{projectSum('listsNumber')}</CellWrapper>,
        <ProjectComments deleteProjectReportComment={deleteProjectReportComment}
                         addProjectReportComment={addProjectReportComment}
                         projectReport={projectReport}
                         onCommentChange={onCommentChange}
        />,
        <button onClick={onDelete}>remove</button>
    ]

    return <>{cells.map(cell => <CellWrapper>{cell}</CellWrapper>)}</>
}