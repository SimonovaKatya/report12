import React, {SyntheticEvent, useState} from "react";
import {ProjectReportComment, ProjectReport} from "../types/Models";

interface Return {
    projectReports: ProjectReport[]
    addProjectReport: () => void
    deleteProjectReport: (id: number) => void
    addProjectReportComment: (id: number) => void
    deleteProjectReportComment: (params: { projectReportId: number, projectReportCommentId: number }) => void
    onCommentChange: (params: { projectReportId: number, projectReportCommentId: number }) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    onProjectChange: (projectReportId: number) => (e: SyntheticEvent<Element, Event>) => void
}

export const useProjectReports = (): Return => {
    const [projectReports, setProjectReports] = useState<ProjectReport[]>([])

    const createNewComment = (): ProjectReportComment => {
        return {
            id: Math.random(),
            info: "",
            hours: 0,
            listsNumber: 0,
            workPercent: 0
        }
    }

    const addProjectReport = (): void => {
        console.log('addProjectReport start', projectReports);
        const newProjectReport = {
            id: Math.random(),
            project: '',
            comments: [
                createNewComment()
            ]
        }
        const newProjectReports = [...projectReports, newProjectReport]

        setProjectReports(newProjectReports)

        console.log('addProjectReport end', newProjectReports);
    }


    const deleteProjectReport = (projectReportId: number): void => {
        console.log('deleteProjectReport start', projectReports);
        const newProjectReports = [...projectReports.filter(({id}) => id !== projectReportId)]
        setProjectReports(newProjectReports)
        console.log('deleteProjectReport end', newProjectReports);
    }


    const addProjectReportComment = (projectReportId: number): void => {
        const updatedProjectReports = projectReports.map((projectReport) => {
            if (projectReport.id !== projectReportId) return projectReport

            return {...projectReport, comments: [...projectReport.comments, createNewComment()]}
        })
        setProjectReports([...updatedProjectReports])
    }

    const deleteProjectReportComment = (params: { projectReportId: number, projectReportCommentId: number }): void => {
        const {projectReportCommentId, projectReportId} = params

        const updatedProjectReports = projectReports.map((projectReport) => {
            if (projectReport.id !== projectReportId) return projectReport

            return {
                ...projectReport,
                comments: projectReport.comments.filter(comment => comment.id !== projectReportCommentId)
            }
        })
        setProjectReports([...updatedProjectReports])
    }


    const onCommentChange = (params: { projectReportId: number, projectReportCommentId: number }) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {projectReportCommentId, projectReportId} = params

        const updatedProjectReports = projectReports.map((projectReport) => {
            if (projectReport.id !== projectReportId) return projectReport

            return {
                ...projectReport,
                comments: projectReport.comments.map(comment => {
                    if (comment.id !== projectReportCommentId) return comment
                    return {...comment, [e.target.name]: e.target.value}
                })
            }
        })
        setProjectReports([...updatedProjectReports])
    };

    const onProjectChange = (projectReportId: number) => (e: SyntheticEvent<Element, Event>) => {
        const updatedProjectReports = projectReports.map((projectReport) => {
            if (projectReport.id !== projectReportId) return projectReport

            return {
                ...projectReport,
                project: (e.target as HTMLElement).innerText,
            }
        })
        setProjectReports([...updatedProjectReports])
    };

    return {
        addProjectReport,
        deleteProjectReport,
        projectReports,
        addProjectReportComment,
        deleteProjectReportComment,
        onCommentChange,
        onProjectChange
    }
}