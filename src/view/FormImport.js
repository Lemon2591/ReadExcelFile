import React, { Component } from "react";
import ComponentImport from "../component-import/ComponentImport";
import ResutlData from "../showDataComponent/ResutlData";
import Logo from "../logo.svg";
import "../showDataComponent/ResultData.css";
import Header from "../ComponentView/Header";
export class FormImport extends Component {
  render() {
    return (
      <>
        <Header />
        {/* <div className="">
          <img src={Logo} className="App-logo"></img>
        </div> */}
        <ComponentImport />
        {/* <ResutlData /> */}
      </>
    );
  }
}

export default FormImport;
