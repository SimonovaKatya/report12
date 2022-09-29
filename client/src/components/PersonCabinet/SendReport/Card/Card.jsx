import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Card = (props) => {
  return (
    <div>
      {/* <div className="row"> */}
      {/* <div className="col-sm-9"> */}
      {/* <div className="col-sm-12"> */}
      <div className="card">
        <h5 className="card-header">Отчет о проделанной работе</h5>
        <div className="card-body">
          <h5 className="card-title">Список проектов</h5>
          <p className="card-text">ДанилЮраалыраплырплкрпкрп пррвп пррп</p>
          <button class="btn btn-primary">Добавить проект</button>
        </div>
      </div>
      {/* </div> */}
      {/* </div> */}
      {/* </div> */}
    </div>
  );
};

export default Card;
