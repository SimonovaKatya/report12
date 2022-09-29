import React from "react";

import { Button } from "antd";

const DesProjectsList = (props) => {
  return (
    <div>
      {props.projects.length === 0 ? (
        <div className="text-left">Список проектов пуст</div>
      ) : (
        props.projects.map((item, key) => {
          return (
            <div
              onClick={props.onClickCard.bind(this, key)}
              className={"border"}
            >
              <div style={{ padding: "15px" }} className="text-left">
                <strong>
                  № {key + 1} {item.project.label}
                </strong>
              </div>
              <div
                className="text-right"
                style={{ paddingRight: "5px", paddingBottom: "10px" }}
              >
                <Button
                  onClick={props.onClickDeleteCard.bind(this, key)}
                  type="primary"
                  danger
                  size="small"
                >
                  Удалить
                </Button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default DesProjectsList;
