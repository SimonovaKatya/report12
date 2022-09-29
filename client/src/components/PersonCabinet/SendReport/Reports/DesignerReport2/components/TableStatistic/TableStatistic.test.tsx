import renderer from 'react-test-renderer';
import {TableStatistic} from "./TableStatistic";
import React from "react";
import {ProjectReport} from "../../types/Models";
import {queryByAttribute, render} from "@testing-library/react";

const getById = queryByAttribute.bind(null, 'id');

describe('TableStatistic', () => {

    /* инициализация тестов*/
    let projectReports: ProjectReport[] = [
        {id: 2, project: 'project1', comments: []}
    ]

    let testInstance = renderer.create(
        <TableStatistic projectReports={projectReports}/>,
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

        const tableStatistic = render(
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

