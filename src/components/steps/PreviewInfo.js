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

    createTablePersonDetaios(){
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
    createUI(){
        this.state.editedRecordCount= this.props.editedRecordCount;
        console.log("&&&&&&&&&&&&&&&&&&&&&&&  :" + this.props.editedRecordCount)
        this.state.arrayOfChangedFields = this.props.arrayOfChangedFields;

        // this.props.arrayOfChangedFields.map((values,i)=>{
        //     console.log("&&&&&&&&&&&&&&&&&&&&&&&  arrayOfChangedFields:" + values.column)

        // })
        
        
        if(this.props.enableSaveButton){
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
                
                {this.createTablePersonDetaios()}

                <h4>Updated Cancer Details |</h4>
                {this.createUI()}
                
                
            </div>
        )
    }
}