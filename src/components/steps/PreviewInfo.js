import React from 'react';
// import React, { Component } from 'react';


export default class PreviewInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
     
     
        }
    }

    createUI(){
        return this.props.changedParameters.map((values,i)=> 

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
                <tr>
                    <td>
                        {values.age}
                    </td>
                    <td>
                        {values.id}
                    </td>
                </tr>
            </tbody>

        </table>
        //     <div key={i}>
        //        <input type="text" value={el||''} onChange={this.handleChange.bind(this, i)} />
        //        <input type='button' value='remove' onClick={this.removeClick.bind(this, i)}/>
        //     </div>          
        )
     }
    render() {

        return (
            <div>
                {this.createUI()}
                RRRRRRRRR
                {/* {console.log("ddddddd " + this.props.changedParameters[27].age)} */}
                {
                    this.props.changedParameters.map((values,i)=>{
                {console.log("ddddddd " + i + " : " + this.props.changedParameters[i].age)}
                {console.log("ddddddd " + i + " : " + this.props.changedParameters[i].id)}
                {this.props.changedParameters[i].age}
                    })
                
                }
            </div>
        )
    }
}