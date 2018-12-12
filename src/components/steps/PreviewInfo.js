import React from 'react';
// import React, { Component } from 'react';


export default class PreviewInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editedRecordCount:0,
     
        }
    }

    createUI(){
        this.state.editedRecordCount= this.props.editedRecordCount;
        console.log("&&&&&&&&&&&&&&&&&&&&&&&  :" + this.props.editedRecordCount)
        if(this.props.enableSaveButton){
        return this.props.arrayEditedData.map((values,i)=> 
        
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
                {this.createUI()}
                
                
            </div>
        )
    }
}