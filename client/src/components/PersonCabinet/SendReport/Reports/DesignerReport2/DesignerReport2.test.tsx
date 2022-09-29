import { TableStatistic } from "./components/TableStatistic/TableStatistic";
import renderer from "react-test-renderer";
import React from "react";
import { DesignerReport2 } from "./DesignerReport2";

describe('DesignReport2', () => {

  test('Has projectReports attribute', () => {
    const testInstance = renderer.create(
      <DesignerReport2 />,
    ).root

    expect(testInstance.findByType(TableStatistic).props.projectReports).toEqual(projectReports);
  });
})