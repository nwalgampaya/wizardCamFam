import React from "react";
// import React, { Component } from 'react';
import { properties } from "../../properties.js";

export default class FamilySaveInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      PatientLKDDTO: {
        patientIDs: [],
        lkdDate: "",
        lkdSource: {
          code: ""
        }
      }
    };
  }

  onSaveCancerFamilyID(e) {
    console.log("onSaveCancerFamilyID");
    this.state.PatientLKDDTO.patientIDs = this.props.chkBoxId;
    this.state.PatientLKDDTO.lkdDate = this.props.currentLKD;
    this.state.PatientLKDDTO.lkdSource.code = this.props.selectedSrlCode;

    const urlSavefamilyId = properties.baseUrl + "patients/lkd";

    var request = new Request(urlSavefamilyId, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state.PatientLKDDTO),
      mode: "cors",
      credentials: "same-origin",
      crossDomain: true
    });

    fetch(request)
      .then(response => {
        console.log("response" + response.json);
        return response.json();
      })
      //   .then((jsonObject) => {
      //     console.log("UPDATED ID :" + jsonObject.sessionid);
      //     this.state.jsonId = jsonObject.sessionid;
      //     // document.write(`ID ${jsonObject.id} was created!`);
      //   })
      //   .then(() => {
      //     // if (this.state.jsonId.length !== 0) {
      //     // //   this.fetchPractitionerId(this.state.jsonId)
      //     // console.log("has length")
      //     // }
      //   })
      .catch(error => {
        document.write(error);
      });
  }
  createUI() {
    return (
      // this.props.changedParameters.map((values, i) =>
      <table className="TFtable">
        <tbody>
          <tr>
            <th>Selected Individual Id</th>
          </tr>
          {this.props.chkBoxId.map((value, i) => (
            <tr key={i}>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      //     <div key={i}>
      //        <input type="text" value={el||''} onChange={this.handleChange.bind(this, i)} />
      //        <input type='button' value='remove' onClick={this.removeClick.bind(this, i)}/>
      //     </div>
    );
  }

  render() {
    return (
      <div>
        {this.createUI()}

        {
          // this.props.changedParameters.map((values, i) => {
          //     // {console.log("ddddddd " + i + " : " + this.props.changedParameters[i].age)}
          //     // {console.log("ddddddd " + i + " : " + this.props.changedParameters[i].id)}
          //     { this.props.changedParameters[i].age }
          // })
        }
      </div>
    );
  }
}