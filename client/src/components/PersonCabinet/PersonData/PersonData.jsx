import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./PersonData.css";
import { Card } from "antd";
import { Form } from "antd";
import * as constants from "../../../constants";

class PersonData extends Component {
  state = {
    cabinet: "",
  };
  loadPersonDate = async () => {
    let myHeaders = new Headers();
    let token = localStorage.getItem("token");
    myHeaders.append("Authorization", token);
    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    await fetch(`${constants.PATH}/cabinet`, requestOptions)
      .then((response) => response.json())
      .then((result) => this.setState({ cabinet: result[0].fields }));
  };
  componentDidMount() {
    this.loadPersonDate();
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <Card>
              <div className="row">
                <div className="col-lg-12">
                  <Form
                    labelCol={{ span: 7 }}
                    wrapperCol={{ span: 12 }}
                    layout="horizontal"
                  >
                    <Form.Item label="Имя">
                      <div className="form-control form-control-sm">
                        {this.state.cabinet.first_name}
                      </div>
                    </Form.Item>
                    <Form.Item label="Фамилия" style={{ marginTop: "-20px" }}>
                      <div className="form-control form-control-sm">
                        {this.state.cabinet.last_name}
                      </div>
                    </Form.Item>
                    <Form.Item label="Отчество" style={{ marginTop: "-20px" }}>
                      <div className="form-control form-control-sm">
                        {this.state.cabinet.middle_name}
                      </div>
                    </Form.Item>
                  </Form>
                  <Form
                    layout="horizontal"
                    labelCol={{ span: 7 }}
                    wrapperCol={{ span: 5 }}
                    layout="horizontal"
                  >
                    <Form.Item
                      label="Дата рождения"
                      style={{ marginTop: "-20px" }}
                    >
                      <div>22.02.2020</div>
                    </Form.Item>
                    <Form.Item label="Пол" style={{ marginTop: "-20px" }}>
                      <div>женский</div>
                    </Form.Item>
                    <Form.Item label="Стаж" style={{ marginTop: "-20px" }}>
                      <div className="form-control form-control-sm"></div>
                    </Form.Item>
                    <Form.Item label="Смена" style={{ marginTop: "-20px" }}>
                      <div className="form-control form-control-sm"></div>
                    </Form.Item>
                    <Form.Item
                      label="Дата трудоустройства"
                      style={{ marginTop: "-20px" }}
                    >
                      <div className="form-control form-control-sm"></div>
                    </Form.Item>
                    <Form.Item
                      label="Допустимое время опоздания"
                      style={{ marginTop: "-20px" }}
                    >
                      <div className="form-control form-control-sm"></div>
                    </Form.Item>
                  </Form>
                  <Form
                    labelCol={{ span: 7 }}
                    wrapperCol={{ span: 12 }}
                    layout="horizontal"
                  >
                    <Form.Item
                      label="Совместительство"
                      style={{ marginTop: "-20px" }}
                    >
                      <div className="form-control form-control-sm"></div>
                    </Form.Item>
                    <Form.Item
                      label="Входит в группы"
                      style={{ marginTop: "-20px" }}
                    >
                      <div className="form-control form-control-sm"></div>
                    </Form.Item>
                  </Form>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* <div className="row mb-2">
                    
                    <div className="col-md-8">
                    
                        <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                            <div className="col p-3 d-flex flex-column position-static"> 
                                <div className="col-md-8 order-md-1">
                                    <div className="row">
                                        <div className="col-md-6 mb-3"> */}
        {/* <label for="firstName">Имя</label> */}
        {/* <h6 align="left">Имя</h6>
                                            <div className="form-control" id="firstName">
                                                {this.state.cabinet.first_name}
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-3"> */}
        {/* <label for="lastName">Фамилия</label> */}
        {/* <h6 align="left">Фамилия</h6>
                                            <div className="form-control" id="lastName">
                                                {this.state.cabinet.last_name}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3"> */}
        {/* <label for="middleName">Отчество</label> */}
        {/* <h6 align="left">Отчество</h6>
                                        <div className="form-control" id="middleName">
                                            {this.state.cabinet.middle_name}
                                        </div>   */}
        {/* <br/>                                      */}
        {/* </div>  
                                    <div className="row">
                                        <div className="col-md-6 mb-3"> */}
        {/* <label for="birth">Дата рождения</label> */}
        {/* <h6 align="left">Дата рождения</h6>
                                            <div className="form-control" id="birth">                                                
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-3"> */}
        {/* <label for="sex">Пол</label> */}
        {/* <h6 align="left">Пол</h6>
                                            <div className="form-control" id="sex">                                                
                                            </div>
                                        </div>
                                    </div>  
                                    <div className="row">
                                        <div className="col-md-6 mb-3"> */}
        {/* <label for="stazh">Стаж</label> */}
        {/* <h6 align="left">Стаж</h6>
                                            <div className="form-control" id="stazh">                                                
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-3"> */}
        {/* <label for="smena">Смена</label> */}
        {/* <h6 align="left">Смена</h6>
                                            <div className="form-control" id="stazh">                                                
                                            </div>
                                        </div>
                                    </div> 
                                    <div className="mb-3"> */}
        {/* <label for="datework">Дата трудоустройства</label> */}
        {/* <h6 align="left">Дата трудоустройства</h6>
                                        <div className="form-control" id="datework">                                            
                                        </div>  
                                    </div> 
                                    <div className="mb-3"> */}
        {/* <label for="latetime">Допустимое время опозданий</label> */}
        {/* <h6 align="left">Допустимое время опозданий</h6>
                                        <div className="form-control" id="latetime">                                            
                                        </div>  
                                    </div>  
                                    <div className="mb-3"> */}
        {/* <label for="part">Совместительство</label> */}
        {/* <h6 align="left">Совместительство</h6>
                                        <div className="form-control" id="part">                                            
                                        </div>  
                                    </div> 
                                    <div className="mb-3"> */}
        {/* <label for="groupin">Входит в группы</label> */}
        {/* <h6 align="left">Входит в группы</h6>
                                        <div className="form-control" id="groupin">                                            
                                        </div>  
                                    </div>                                 
                                </div>                            
                            </div>
                        </div>
                    </div>
                </div> */}
      </div>
    );
  }
}

export default PersonData;
