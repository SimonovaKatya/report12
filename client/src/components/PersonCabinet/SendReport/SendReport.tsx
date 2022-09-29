import React, { useEffect, useState, FC } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from "react-router-dom";
import DesignerReport from "./DesignerReport/DesignerReport";
import { PersonDataApi } from "../../../api";

type StatusReport = {
  status: string;
};

interface IProps {
  chosenDate: Date;
}

function SendReport(props: IProps) {
  const history = useHistory();
  const token = localStorage.getItem("token");
  const [status, setStatus] = useState(false);
  useEffect(() => {
    const init = async () => {
      if (!token) {
        history.push("/");
        return;
      }
      const status = await PersonDataApi.getReportStatus(token);
      setStatus(status?.status);
    };
    init().then();
  }, []);

  return (
    <div>
      <div className="container-fluid">
        <DesignerReport {...props} />
      </div>
    </div>
  );
}
export default SendReport;
