import React from 'react';
import ReactDOM from 'react-dom';
import {Button, DropdownButton, MenuItem, Modal,  OverlayTrigger, Tooltip} from 'react-bootstrap';

export default class AddCancerModal extends React.Component {

    constructor(props, context) {
        super(props, context);
    
        // this.handleShow = this.handleShow.bind(this);
        // this.handleClose = this.handleClose.bind(this);
        // this.handleSave = this.handleSave.bind(this);    
        //   this.handleTxtChange = this.handleTxtChange.bind(this);
    
        this.state = {
       
        
          showAddCancer: false,
          textValue:'test123',
          selectedId:''
        };
      }

      date_diff_indays = function(date1, date2) {
        var dt1 = new Date(date1);
        var dt2 = new Date(date2);
        return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
        }
      componentDidMount(){
        var d1 = new Date("12/31/1885")
        var d2 = new Date("02/02/2005")
        console.log(Math.floor((d2-d1)/31536000000));
        // console.log("Minus : "+ this.date_diff_indays('12/02/2012', '11/04/2014').toUTCString());

        if(d1<new Date()){
          console.log("In If" );

        }else{
          console.log("In else");
          
        }
      }

      render(){
        return(
          <div>
            test
          </div>
        )
      }
}