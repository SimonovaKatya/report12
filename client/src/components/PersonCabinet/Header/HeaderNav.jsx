import React from "react";
import PersonData from "../PersonData/PersonData";
import { Layout, Modal } from "antd";
import "./HeaderNav.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { PersonDataApi } from "../../../api";

class HeaderNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false, card: "" };
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    const init = async () => {
      let _card = await PersonDataApi.getPersonCard(token);
      let flag = false;
      try {
        flag = true;
        const n = _card.fullname;
      } catch {
        if (flag) {
          _card = new Object();
          _card.fullname = "full name";
          _card.username = "username";
          _card.id = 0;
          _card.posts = null;
        }
      }
      this.setState({
        card: _card.fullname,
      });
    };
    init().then();
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };
  logOut = () => {
    localStorage.setItem("token", "");
    localStorage.setItem("checkReg", "False");
  };
  render() {
    return (
      <Navbar
        className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm"
        collapseOnSelect
        expand="lg"
      >
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Navbar.Brand href="#home">Система отчетности</Navbar.Brand>
          <Nav className="mr-auto"></Nav>
          <Nav>
            <Nav.Link href="#deets" onClick={this.showModal}>
              {this.state.card}
            </Nav.Link>
            <Nav.Link href="#memes" onClick={this.logOut}>
              Выйти
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Modal
          title="Личные данные"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={900}
        >
          <PersonData />
        </Modal>
      </Navbar>
    );
  }
}
export default HeaderNav;
