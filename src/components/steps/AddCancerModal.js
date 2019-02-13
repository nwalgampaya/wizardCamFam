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

      componentDidMount(){
        var d1 = new Date("03/17/2014")
        var d2 = new Date("04/17/2013")
        console.log((new Date()));
        console.log(d1);

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
