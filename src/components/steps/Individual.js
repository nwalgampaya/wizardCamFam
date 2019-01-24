import React from 'react';
import Wizard from '../../Wizard'
import FormikApp from"../CancerFamilyReg"
import PreviewInfo from "./PreviewInfo";
// import ChoosePath from "./steps/ChoosePath";
import Family from "./Family";
// import React, { Component } from 'react';
import CancerInfo from "./CancerInfo";
import { properties } from '../../properties.js';

export default class Individual extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            choosePathFamily:'',
            patientId:'',
            selectedPersonData:[]
     
        }
    }

    setPatientId(e) {
        this.setState({
          patientId: e.target.value,
        });
        this.state.patientId = e.target.value,
        console.log("patientId " + e.target.value)
        this.getPatientDetails()
      }

     
      getPatientDetails(){

        console.log("patientId getPatientDetails"        )

        const urlpatients =  properties.baseUrl + "patients/"+ this.state.patientId;
        fetch(urlpatients)
          .then(response => response.json())
          .then((data) => {
    
              this.setState({
                  selectedPersonData: data,
                  
                });
                console.log("pdata"+this.state.selectedPersonData.personCID);
                this.props.onInsertPatientId(this.state.selectedPersonData)
            // this.assignDbDataToFields()
            // this.state.profession.push(data);
          })
      }
    render(){

        return(

            <div>
                <p> Please enter Patient ID to update a participant's follow-up and cancer data </p>
                <h4> Patient ID:</h4>
                <input type="text" value={this.state.patientId} onChange={this.setPatientId.bind(this)} name="iDColumn"/> 
                {/* <p>{this.state.patientId}</p> */}
                {/* <h2>In Individual Screen</h2> */}
              
            </div>
        )
    }
}