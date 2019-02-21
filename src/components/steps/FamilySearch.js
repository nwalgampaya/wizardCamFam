import React from "react";
import ReactDOM from "react-dom";
import Autocomplete from 'react-autocomplete'
import { properties } from '../../properties.js';
import DatePicker from 'react-date-picker';

export default class FamilySearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            familyData: [],
            individualId: [],
            currentLKD: '',
            sendCurrentLKD: '',
            isSearched: false,
            srlcodesRest: [],
            selectedSrlCode: '',
            familyIdValue: '',
            chkBoxId: [],
            // { id:'',
            //   value:'',

            // },
        }
        this.handleLkd = this.handleLkd.bind(this);
        this.handleSearchGetFamily = this.handleSearchGetFamily.bind(this);



    }


    handleLkd(currentLKD) {
        console.log("handleLkd :" + currentLKD);
        this.setState({
            currentLKD: currentLKD
        });

        this.state.sendCurrentLKD = this.convert(currentLKD)

        console.log("currentDOB : ddddddddddddddddddddddd : " + this.state.sendCurrentLKD);

    }
    convert(str) {
        console.log("ddddddddddddddddddddddd" + str)
        var str2 = "" + str

        // var mnth = str2.slice(4,7)
        // var date = str2.slice(9,10)
        // var year = str2.slice(12,15)

        // console.log("Mnt" + mnth)
        var mnths = {
            Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
            Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12"
        },
            date = str2.split(" ");

        // console.log("date new 1" + date[1])
        // console.log("date new 2" + date[2])
        // console.log("date new 3" + date[3])
        // return [ date[3], mnths[date[1]], date[2] ].join("-");
        return [date[3], mnths[date[1]], date[2]].join("");
    }


    componentDidMount() {
        const urlfamilyId = properties.baseUrl + "patients/family/";
        console.log("in compdidmount" + urlfamilyId)

        fetch(urlfamilyId)
            .then(response => response.json())
            .then((data) => {

                // console.log(data);
                this.setState({
                    familyData: data,

                });
                // this.state.profession.push(data);
                // console.log("data :" +data);

            })
            .catch((error) => {
                console.log("Error :");

                document.write("Error : " + error);
            });



        const urlsrlcodes = properties.baseUrl + "srlcodes/";

        fetch(urlsrlcodes)
            .then(response => response.json())
            .then((data) => {

                // console.log(data);
                this.setState({
                    srlcodesRest: data,

                });
                // this.state.IndividualData = data;
                // console.log("data :" + data);

            })
            .catch((error) => {
                console.log("Error :");


                document.write("Error : " + error);
            });



    }

    setfamilyId(event) {
        console.log("Sex :" + event.target.value);
        // this.setState
        this.setState({
            familyId: event.target.value,
        });


    }
    showFamilyId() {
        console.log("In showFamily")

        if (this.state.isSearched == true) {
            return (this.state.individualId.map((value, i) =>
                <tr key={i}>
                    {/* value={this.state.chkBoxId} */}
                    {/* {i+","+value} */}
                    <td><input className="form-check-input" type="checkbox" id={i} value={value} name="individualChkbx" onChange={this.setCheckBoxValues.bind(this)} /></td>

                    {/* <td><input onChange={this.setfamilyId.bind(this)} value={i} type="radio" name="familyId"/></td> */}
                    <td>{value}</td>
                </tr>
            ))
        }
    }

    setCheckBoxValues(event) {
        console.log("chkBoxId id:" + event.target.id);
        console.log("chkBoxId value :" + event.target.value);

        // Get all the checked values into an array
        this.state.chkBoxId[event.target.id] = event.target.value

        this.setState({
            chkBoxId: this.state.chkBoxId
        });

        //ToDo remove this code
        // this.state.chkBoxId.map((value) => {
        //     console.log("Selected chkbx values : " + value)
        // })

    }
    setFamilyValue(value) {
        console.log("family Id :" + value);
        this.setState({
            familyIdValue: value,
        });

    }

    handleSearchGetFamily() {

        console.log("individualId : " + this.state.value);

        var familyIdValue = this.state.familyIdValue;
        const urlIndividualId = properties.baseUrl + "patients/family/" + familyIdValue;

        fetch(urlIndividualId)
            .then(response => response.json())
            .then((data) => {

                console.log("individualId" + data);
                this.setState({
                    individualId: data,

                });
                // this.state.individualId = data;

            })
            .catch((error) => {
                console.log("Error :");


                document.write("Error : " + error);
            });
        console.log("data : " + this.state.individualId);
        this.state.isSearched = true;

        this.state.individualId.map((value, i) => {
            console.log("individual : " + value)

        })
    }

    setSrlcodes(event) {
        console.log("Srlcode :" + event.target.value);
        // this.setState
        this.setState({
            selectedSrlCode: event.target.value,
        });

    }
    onSelectCancerFamId(e) {
        console.log(" onSelectCancerFamId onSelectCancerFamId ")
        this.props.onFamilySearch(this.state.chkBoxId, this.state.selectedSrlCode, this.state.sendCurrentLKD)

    }

    handleSubmit() {
        console.log("In submit")
        const urlFamilyLkd = properties.baseUrl + "patients/family/" + this.state.value + "?lkd=" + this.state.sendCurrentLKD;

        fetch(urlFamilyLkd)
            .then(response => response.json())
            .then((data) => {

                console.log(data);
                this.setState({
                    familyLkd: data,

                });
                // this.state.IndividualData = data;
                console.log("data :" + this.state.familyLkd);

            })
            .catch((error) => {
                console.log("Error :");


                document.write("Error : " + error);
            });

    }

    onSavePatientOnly() {
        console.log("onSavePatientOnly in family component")
    }
    render() {
        //var value='';
        return (

            <div>
                <h3>Family Scarch</h3>
                <p>Please enter the Family ID that you would like to update: </p>

                <br />
                <br />
                <br />
                <Autocomplete
                    items={this.state.familyData}

                    shouldItemRender={(item, value) => item.indexOf(value) > -1}
                    getItemValue={item => item}
                    renderItem={(item, highlighted) =>
                        <div
                            key={item}
                            style={{ backgroundColor: highlighted ? '#eee' : 'transparent' }}
                        >
                            {item}
                        </div>
                    }
                    value={this.state.familyIdValue}
                    //   onChange={this.setFamilyValue.bind(this)}
                    onChange={e => this.setState({ familyIdValue: e.target.value })}
                    onSelect={this.setFamilyValue.bind(this)}
                // onSelect={familyIdValue => this.setState({ familyIdValue })}
                //   on

                />


                <div className="col-sm-5">
                    <select className="form-control dorp-box" value={this.state.selectedSrlCode} onChange={this.setSrlcodes.bind(this)} name="srlCodesColumn">
                        <option >{"Choose One"}</option>
                        {

                            this.state.srlcodesRest.map((read, i) => {
                                this.state.read = read.description;
                                // console.log("profession ID :  " + read.id);
                                return <option key={read.id} value={read.code}>{read.description}</option>
                            })
                        }

                        {/* <option >{"Hospital Rec"}</option> */}
                        }
                                            </select>

                </div>

                <DatePicker
                    onChange={this.handleLkd}
                    value={this.state.currentLKD}
                />
                <br /><br />
                {/* disabled={this.state.sendCurrentLKD =='' && this.state.familyIdValue =='' &&  this.state.selectedSrlCode ==''} */}
                <button disabled={this.state.sendCurrentLKD == '' || this.state.familyIdValue == '' || this.state.selectedSrlCode == ''} type="button" onClick={this.handleSearchGetFamily}> Search</button>
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