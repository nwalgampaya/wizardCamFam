import React from "react";
import ReactDOM from "react-dom";
import './index.css';
import "./styles/styles.scss";
import FormikApp from "./components/CancerFamilyReg"
// import MyDate from"./components/steps/MyDate.js"
import BootstrapDialog from "./components/dialog/BootstrapDialog";
import CancerInfo from "./components/steps/CancerInfo";
import BootstrapDialogOld from "./components/dialog/BootstrapDialog-old";
import StartPageRegistry from "./components/StartPageRegistry"
import TestValidations from "./components/TestValidations";
import DateSelect from "./components/util/DateSelect"

const template = (
  // <MyDate/>
  // <BootstrapDialogOld/>
  <FormikApp />
  // <DateSelect />
  // <CancerInfo/>
  // <StartPageRegistry/>
);

ReactDOM.render(template, document.getElementById("root"));
