import React from "react";
import ReactDOM from "react-dom";
import './index.css';
import "./styles/styles.scss";
import FormikApp from"./components/CancerFamilyReg"
// import MyDate from"./components/steps/MyDate.js"
import BootstrapDialog from "./components/dialog/BootstrapDialog";
import CancerInfo from "./components/steps/CancerInfo";
import BootstrapDialogOld from "./components/dialog/BootstrapDialog-old";

const template = (
  // <MyDate/>
  // <BootstrapDialogOld/>
  <FormikApp/>
  // <CancerInfo/>
);

ReactDOM.render(template, document.getElementById("root"));
