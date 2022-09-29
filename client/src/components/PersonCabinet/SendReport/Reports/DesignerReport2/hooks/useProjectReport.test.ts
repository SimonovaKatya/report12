import { useProjectReports } from "./useProjectReports";
import { renderHook,act } from "@testing-library/react-hooks";

describe("useTableStatistic", () => {

  test("initial state is empty array", () => {
    const { result } = renderHook(() => useProjectReports());

    expect(result.current.projectReports).toEqual([]);
  });

  test("addProjectReport method add one report to state", () => {
    const { result } = renderHook(() => useProjectReports());

    act(() => {
      result.current.addProjectReport()
    })

    expect(result.current.projectReports.length).toBe(1);
  });

  test("addProjectReport method is function", () => {
    const { result } = renderHook(() => useProjectReports());

    expect(typeof result.current.addProjectReport).toBe('function');
  });

  test("deleteProjectReport method is function", () => {
    const { result } = renderHook(() => useProjectReports());

    expect(typeof result.current.deleteProjectReport).toBe('function');
  });

  test("deleteProjectReport method delete projectReport by id", () => {
    const { result } = renderHook(() => useProjectReports());
    result.current.projectReports = [ { id: 123, project: '', comments: [  ] }]

    act(() => {
      result.current.deleteProjectReport(123)
    })

    expect(result.current.projectReports).toEqual([]);
  });

  test("deleteProjectReport method nor delete projectReports  with other id", () => {
    const { result } = renderHook(() => useProjectReports());
    const expected = [ { id: 123, project: '', comments: [  ] }, { id: 321, project: '', comments: [  ] }]
    result.current.projectReports = expected
    console.log(result.current.projectReports);
    act(() => {
      result.current.deleteProjectReport(444)
    })
    console.log(result.current.projectReports);
    expect(result.current.projectReports).toEqual(expected);
  });
});