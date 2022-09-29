import renderer from 'react-test-renderer';
import React from "react";
import {ProjectComments} from "./ProjectComments";
import {ProjectReport} from "../../../types/Models";


describe('ProjectComments', () => {

    /* инициализация тестов*/
    const projectReport: ProjectReport = {
        comments: [{id: 23, info: '23', hours: 543, workPercent: 43, listsNumber: 75}],
        project: '123',
        id: 2
    }
    let testInstance = renderer.create(
        <ProjectComments projectReport={projectReport}
                         deleteProjectReportComment={({projectReportCommentId, projectReportId}) => {
                             projectReport.comments = projectReport.comments.filter(c => c.id !== projectReportCommentId)
                         }}
                         addProjectReportComment={(id) => {
                             projectReport.comments = [...projectReport.comments, {
                                 id,
                                 hours: 9,
                                 info: '',
                                 workPercent: 0,
                                 listsNumber: 0
                             }]
                         }}
                         onCommentChange={({projectReportCommentId, projectReportId}) => {
                             projectReport.comments = projectReport.comments.map(c => {
                                 if (c.id === projectReportCommentId) {
                                     c.info = '23'
                                 }
                                 return c
                             })

                             return (e) => {

                             }
                         }}
        />,
    ).root

    beforeEach(() => {
        projectReports = [
            {id: 2, project: 'project1', comments: []}
        ]
        testInstance = renderer.create(
            <TableStatistic projectReports={projectReports}/>,
        ).root
    })
    /* */

    test('projectReportsSum work correctly and put result in div', () => {
        projectReports = [
            {
                id: 2,
                project: 'project1',
                comments: [
                    {id: 1, info: '...', hours: 5, workPercent: 7, listsNumber: 6},
                    {id: 2, info: '...', hours: 2, workPercent: 7, listsNumber: 6},
                    {id: 3, info: '...', hours: 4.7, workPercent: 7, listsNumber: 6},
                ]
            }
        ]

        let tableStatistic = render(
            <TableStatistic projectReports={projectReports}/>,
        )

        expect(getById(tableStatistic.container, 'hours-result')?.innerHTML).toBe('Итого: 11.7 ч.')
    })

    test('Has projectReports attribute', () => {
        expect(testInstance.findByType(TableStatistic).props.projectReports).toEqual(projectReports);
    });

    test('submit btn content equal to "отправить"', () => {
        expect(testInstance.findByType("button").children).toStrictEqual(['отправить']);
    });
})

