import React from 'react';
// import React, { Component } from 'react';


export default class PreviewInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editedRecordCount:0,
            arrayOfChangedFields:[],
     
        }
    }

    createTablePersonDetails(){
        return(
       
        
        <table>
            <tbody>
                <tr>
                        <th>
                        Column Name
                        </th>
                        <th>
                        Previous Value
                        </th>
                        <th>
                            New Value
                        </th>
                </tr>
        {/* {values.map((val,i)=> */}
       {this.loopPersonDetails()}
                

            </tbody>

        </table>
        //     <div key={i}>
        //        <input type="text" value={el||''} onChange={this.handleChange.bind(this, i)} />
        //        <input type='button' value='remove' onClick={this.removeClick.bind(this, i)}/>
        //     </div>          
    )

    
    
    
}
        loopPersonDetails(){
            return (this.props.arrayOfChangedFields.map((values,i)=> 
            <tr>
            <td>
                {values.column}
            </td>
            <td>
                {values.previousVal}
                {/* {this.props.arrayEditedData[i].age} */}

            </td>
            <td>
            {values.newVal}

            {/* {this.props.changedParameters[i].age} */}
            {/* {values.id} */}
            </td>
        </tr>))



        }

        createNewCancerUI() {
            if (this.props.isCanecerAdded) {
                return (

                    <div>
                        <h3>Added Cancer Details</h3>
                        {this.createCancerFields()}

                    </div>
                )
            }
        }

        createCancerFields() {
            console.log("In new Cancer Preview")
            // || this.props.isCancerEdited
            // if(this.props.isCanecerAdded ){
            return (
                this.props.newCancerArr.map((values, i) =>
                    <table>
                        <tbody>
                            <tr>
                                <th>
                                    Column Name
                                </th>
                                <th>
                                    Value
                                </th>
                            </tr>
                            <tr>
                                <td>
                                    <p> Site</p>
                                </td>
                                <td>
                                    {values.site.code}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p> Lateral</p>
                                </td>
                                <td>
                                    {values.lateral.description}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p> Histology</p>
                                </td>
                                <td>
                                    {/* {values.histology.code} */}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p> Behavior</p>
                                </td>
                                <td>
                                    {values.behaviour.description}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p> Date Of Diagnosis</p>
                                </td>
                                <td>
                                    {/* {values.site.code} */}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p> Age Of Diagnosis</p>
                                </td>
                                <td>
                                    {/* {values.lateral.code} */}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p> Source</p>
                                </td>
                                <td>
                                    {values.diagSource.description}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p> Tissue</p>
                                </td>
                                <td>
                                    {values.tissue.description}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                )
            )
        }  

        createEditedCancerUI() {

            if (this.props.isCancerEdited) {
                return (

                    <div>
                        <h4>Updated Cancer Details |</h4>
                        {this.showCancerEditedFields()}

                    </div>
                )
            }
        }    
        showCancerEditedFields(){
        this.state.editedRecordCount= this.props.editedRecordCount;
        console.log("&&&&&&&&&&&&&&&&&&&&&&&  :" + this.props.editedRecordCount)
        this.state.arrayOfChangedFields = this.props.arrayOfChangedFields;

        // this.props.arrayOfChangedFields.map((values,i)=>{
        //     console.log("&&&&&&&&&&&&&&&&&&&&&&&  arrayOfChangedFields:" + values.column)

        // })
        
        
        // if(this.props.isCancerEdited){
        return (
         this.props.arrayEditedData.map((values,i)=> 
        
        <table>
            <tbody>
                <tr>
                        <th>
                        Column Name
                        </th>
                        <th>
                        Previous Value
                        </th>
                        <th>
                            New Value
                        </th>
                </tr>
        {values.map((val,i)=>
                <tr>
                    <td>
                        {val.column}
                    </td>
                    <td>
                        {val.previousVal}
                        {/* {this.props.arrayEditedData[i].age} */}

                    </td>
                    <td>
                    {val.newVal}

                    {/* {this.props.changedParameters[i].age} */}
                    {/* {values.id} */}
                    </td>
                </tr>
        )
    }    
            </tbody>

        </table>
        //     <div key={i}>
        //        <input type="text" value={el||''} onChange={this.handleChange.bind(this, i)} />
        //        <input type='button' value='remove' onClick={this.removeClick.bind(this, i)}/>
        //     </div>          
    ))
    
     }

     createUI(){

        if(this.props.isCanecerAdded || this.props.isCancerEdited){
            
            return( 
            <div>
                {this.createEditedCancerUI()}
                    
                {this.createNewCancerUI()}
            </div>
            )
        }else{
            return( 
            <div>
                <h2> Review Details </h2>
                <p> No data changes have been made. Please Exit Record or make changes to Save to Database.</p>
            </div>)
        }
     }
    render() {

        return (
            <div>
                <h2> Review Details </h2>
                <p> Please ensure the below updates are correct before clicking "Save to Database" .</p> 
                
                {this.createTablePersonDetails()}

                {this.createUI()}
                
                {/* {this.createCancerFields()} */}
                
                
            </div>
        )
    }
}