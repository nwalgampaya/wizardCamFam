import React from "react";
// import React, { Component } from 'react';

export default class HeaderPanel extends React.Component {
  render() {
    return (
      <div>
        <div class="box headerPanel1">
          <div class="headerPanel1Div">
            <span class="headerPanel1Span">
              Patient ID :{this.props.patientDetials.personCID}
            </span>
          </div>

          <div class="headerPanel2">
            <span class="headerPanel2Span">
              <b>Person ID </b> : {this.props.patientDetials.personID}&nbsp;
              <b>Family ID </b> {this.props.patientDetials.familyID}&nbsp;
              <b>MotherID </b> : {this.props.patientDetials.motherID} &nbsp;
              <b>FatherID </b> :{this.props.patientDetials.fatherID}&nbsp;
              <b>TwinID </b> : {this.props.patientDetials.twinID}
            </span>
          </div>
          <div class="headerPanel3">
            <span class="headerPanel3Span">
              <b>EPI_Q_COLON</b> :
              {this.props.patientDetials.ePIQColon.description}
              &nbsp;&nbsp; <b>BLOOD</b> :
              {this.props.patientDetials.blood.description}
            </span>
          </div>
          <div class="headerPanel3">
            <span class="headerPanel3Span">
              <b>BUCCAL_SALIVA </b>
              {this.props.patientDetials.buccalSalvia.description}
            </span>
          </div>
        </div>
      </div>
    );
  }
}
