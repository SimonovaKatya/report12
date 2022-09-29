import React from "react"
import s from './ProjectComments.module.scss'
import classnames from "classnames";
import {ProjectReport} from "../../../types/Models";

interface Props {
    projectReport: ProjectReport
    addProjectReportComment: (id: number) => void
    deleteProjectReportComment: (params: { projectReportId: number, projectReportCommentId: number }) => void
    onCommentChange: (params: { projectReportId: number, projectReportCommentId: number }) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export const ProjectComments = (props: Props) => {
    const {
        addProjectReportComment,
        deleteProjectReportComment,
        projectReport,
        onCommentChange
    } = props

    const addComment = () => addProjectReportComment(projectReport.id)


    const deleteComment = (projectReportCommentId: number) => deleteProjectReportComment({
        projectReportId: projectReport.id,
        projectReportCommentId
    })

    const onInputChange = (projectReportCommentId: number): (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void => {
        return onCommentChange({projectReportId: projectReport.id, projectReportCommentId})
    }
    // TODO add input's validation
    return (
        <div>
            <div className={s['project-comments']}>
                {
                    projectReport.comments.map(({id, hours, listsNumber, workPercent,info}) => (
                        <div className={s['project-comment']}>
                            <textarea onChange={(e) => onInputChange(id)(e)} value={info}
                                      name='info' className={s['project-comment__textarea']}/>
                            <div>
                                <div
                                    className={classnames(s['project-comment__inputs'], s['project-comment__inputs_border-bottom'])}>
                                    <input onChange={(e) => onInputChange(id)(e)} value={hours} type="number"
                                           name='hours' min="0"
                                           className={s['project-comment__input']}/> ч.
                                    <input onChange={(e) => onInputChange(id)(e)} value={workPercent} type="number"
                                           name='workPercent' min="0"
                                           className={s['project-comment__input']}/> %
                                </div>
                                <div className={s['project-comment__inputs']}>
                                    <input onChange={(e) => onInputChange(id)(e)} value={listsNumber} type="number"
                                           name='listsNumber' min="0"
                                           className={s['project-comment__input']}/> листов в архив
                                </div>
                            </div>
                            <div>
                                <button disabled={projectReport.comments.length === 1}
                                        onClick={() => deleteComment(id)}>
                                    remove
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className={s['footer-section']}>
                <button onClick={addComment}>add</button>
            </div>
        </div>
    )
}