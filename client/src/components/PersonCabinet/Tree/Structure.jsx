import React from "react";
import {
  PartitionOutlined,
  FolderOutlined,
  DownOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { Tree, Spin } from "antd";
import * as constants from "../../../constants";

class Structure extends React.Component {
  state = {
    tree: "",
    load: false,
  };
  recursive = (root, num) => {
    if (root) {
      return root.map((item, index) => {
        num += `-${index}`;
        if (item.code !== undefined) {
          let a = item.users ? item.users : [];
          if (item.subdepartments) {
            a = a.concat(item.subdepartments);
          }
          return {
            title: item.code + " " + item.label,
            key: num,
            icon: <FolderOutlined />,
            children: this.recursive(a, num),
          };
        } else {
          return { title: item.name, key: num, icon: <SmileOutlined /> };
        }
      });
    }
    return;
  };
  loadTree = () => {
    let token = localStorage.getItem("token");
    let myHeaders = new Headers();

    myHeaders.append("Authorization", token);

    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    this.setState({ load: true });
    fetch(`${constants.PATH}structure/`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        let a = this.recursive(result);
        this.setState({ tree: a, load: false });
      });
  };
  componentDidMount() {
    this.loadTree();
  }

  render() {
    return (
      <Spin spinning={this.state.load} tip="Loading...">
        <div className="container-fluid">
          <div className="label row">
            <label className="text-left col-md-12">
              <PartitionOutlined
                style={{
                  float: "left",
                  fontSize: "23px",
                  padding: "2px",
                  transform: "rotate(90deg)",
                }}
              />
              <h4>Структура подразделений</h4>
              <hr className="normal hr" />
            </label>
          </div>
          <div className="row">
            <div
              className="col-md-6"
              style={{ backgroundColor: "rgba(0,0,0,0)" }}
            >
              <Tree
                showIcon
                defaultExpandAll
                defaultSelectedKeys={["0-0-0"]}
                switcherIcon={<DownOutlined />}
                treeData={this.state.tree}
              />
              ,
            </div>
          </div>
        </div>
      </Spin>
    );
  }
}

export default Structure;
