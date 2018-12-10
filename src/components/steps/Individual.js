import React from 'react';
import Wizard from '../../Wizard'
import FormikApp from"../CancerFamilyReg"
import PreviewInfo from "./PreviewInfo";
// import ChoosePath from "./steps/ChoosePath";
import Family from "./Family";
// import React, { Component } from 'react';
import CancerInfo from "./CancerInfo";


export default class Individual extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            choosePathFamily:'',
     
        }
    }


    render(){

        return(

            <div>

                <h2>In Individual Screen</h2>
              
            </div>
        )
    }
}