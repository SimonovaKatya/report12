export interface ProjectReportComment {
    id: number
    hours: number;
    info: string;
    workPercent: number;
    listsNumber: number
}

export interface ProjectReport {
    id: number;
    project: string;
    comments: Array<ProjectReportComment>;
}