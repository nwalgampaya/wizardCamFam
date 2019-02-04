import React from "react";
import ReactDOM from "react-dom";


export default class FamilySearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
     
            familyData:[],
        }
    }

    componentDidMount(){
        // const urlAgegroup = "http://128.250.143.10:8090/ProneSpringBoot/api/professions/";
        // fetch(urlAgegroup)
        //   .then(response => response.json())
        //   .then((data) => {

        //     console.log(data);
        //     this.setState({

        //       // flats: data
        //       familyData: data,
        //       familyId:'',

        //     });
        //   })


    }

    setfamilyId(event){
        console.log("Sex :" + event.target.value);
    // this.setState
    this.setState({
        familyId: event.target.value,
    });
    }
    showFamilyId() {
        console.log("In showFamily")
        return (this.state.familyData.map((value, i) => 
            <tr>
                <td><input onChange={this.setfamilyId.bind(this)} value={i} type="radio" name="familyId"/></td>
                <td>{value.id}</td>
            </tr>
        ))
    }
    render(){

        return(

            <div>
                <h3>Family Scarch</h3>
                <p>Please enter the Family ID that you would like to update: </p>
                <input type="text" /> <br/>
                <button type="button"> Search</button>
                <button type="button"> Reset</button>

                <table>
                    <tbody>
                        <tr>
                            <th>    </th>
                            <th> Family id</th>
                        </tr>
                           {this.showFamilyId()}
                    </tbody>
                </table>
            </div>
        )
    }
}