import React from "react";
import ReactDOM from "react-dom";
import Autocomplete from "react-autocomplete";
import { properties } from "../../properties.js";
import DatePicker from "react-date-picker";

export default class FamilySearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      familyData: [],
      individualId: [],
      currentLKD: "",
      sendCurrentLKD: "",
      isSearched: false,
      srlcodesRest: [],
      selectedSrlCode: "",
      familyIdValue: "",
      chkBoxId: [],
      apierror: { debugMessage: "", status: "", timestamp: "", message: "" },
      error: false,
      errorMsg: ""
      // { id:'',
      //   value:'',

      // },
    };
    this.handleLkd = this.handleLkd.bind(this);
    this.handleSearchGetFamily = this.handleSearchGetFamily.bind(this);
  }

  handleLkd(currentLKD) {
    console.log("handleLkd :" + currentLKD);
    this.setState({
      currentLKD: currentLKD
    });

    this.state.sendCurrentLKD = this.convert(currentLKD);

    console.log(
      "currentDOB : ddddddddddddddddddddddd : " + this.state.sendCurrentLKD
    );
  }
  convert(str) {
    console.log("ddddddddddddddddddddddd" + str);
    var str2 = "" + str;

    // var mnth = str2.slice(4,7)
    // var date = str2.slice(9,10)
    // var year = str2.slice(12,15)

    // console.log("Mnt" + mnth)
    var mnths = {
        Jan: "01",
        Feb: "02",
        Mar: "03",
        Apr: "04",
        May: "05",
        Jun: "06",
        Jul: "07",
        Aug: "08",
        Sep: "09",
        Oct: "10",
        Nov: "11",
        Dec: "12"
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
    console.log("in compdidmount" + urlfamilyId);

    fetch(urlfamilyId)
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        this.setState({
          familyData: data
        });
        // this.state.profession.push(data);
        // console.log("data :" +data);
      })
      .catch(error => {
        console.log("Error :");

        document.write("Error : " + error);
      });

    const urlsrlcodes = properties.baseUrl + "srlcodes/";

    fetch(urlsrlcodes)
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        this.setState({
          srlcodesRest: data
        });
        // this.state.IndividualData = data;
        // console.log("data :" + data);
      })
      .catch(error => {
        console.log("Error :");

        document.write("Error : " + error);
      });
  }

  setfamilyId(event) {
    console.log("Sex :" + event.target.value);
    // this.setState
    this.setState({
      familyId: event.target.value
    });
  }
  showFamilyId() {
    console.log("In showFamily");

    if (this.state.isSearched == true) {
      return this.state.individualId.map((value, i) => (
        <tr key={i}>
          {/* value={this.state.chkBoxId} */}
          {/* {i+","+value} */}
          <td>
            <input
              className="form-check-input"
              type="checkbox"
              id={i}
              value={value}
              name="individualChkbx"
              onChange={this.setCheckBoxValues.bind(this)}
            />
          </td>

          {/* <td><input onChange={this.setfamilyId.bind(this)} value={i} type="radio" name="familyId"/></td> */}
          <td>{value}</td>
        </tr>
      ));
    }
  }

  setCheckBoxValues(event) {
    console.log("chkBoxId id:" + event.target.id);
    console.log("chkBoxId value :" + event.target.value);

    // Get all the checked values into an array
    this.state.chkBoxId[event.target.id] = event.target.value;

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
      familyIdValue: value
    });
  }
  setErrorFalse() {
    this.setState({ error: false });
  }
  setErrortrue() {
    this.setState({ error: true });
  }
  handleSearchGetFamily() {
    console.log("individualId : " + this.state.value);

    var familyIdValue = this.state.familyIdValue;
    const urlIndividualId =
      properties.baseUrl + "patients/family/" + familyIdValue;
    let status;
    fetch(urlIndividualId)
      .then(response => {
        status = response.status;
        return response.json();
      })
      .then(data => {
        if (status == 200) {
          console.log(data);
          this.setErrorFalse();
          this.setState({
            individualId: data
          });
          this.state.isSearched = true;

          this.state.individualId.map((value, i) => {
            console.log("individual : " + value);
          });
        } else if (status == 404) {
          console.log(data);
          this.state.errorMsg = data.apierror.message;
          this.setErrortrue();
          //   this.setState({
          //     errorMsg: data.api(error.message
          //   });
        }
      })
      .catch(error => {
        console.log("Error :");

        document.write("Error : " + error);
      });
    console.log("data : " + this.state.individualId);
    this.state.isSearched = true;

    this.state.individualId.map((value, i) => {
      console.log("individual : " + value);
    });
  }

  setSrlcodes(event) {
    console.log("Srlcode :" + event.target.value);
    // this.setState
    this.setState({
      selectedSrlCode: event.target.value
    });
  }
  onSelectCancerFamId(e) {
    console.log(" onSelectCancerFamId onSelectCancerFamId ");
    this.props.onFamilySearch(
      this.state.chkBoxId,
      this.state.selectedSrlCode,
      this.state.sendCurrentLKD
    );
  }

  handleSubmit() {
    console.log("In submit");
    const urlFamilyLkd =
      properties.baseUrl +
      "patients/family/" +
      this.state.value +
      "?lkd=" +
      this.state.sendCurrentLKD;

    fetch(urlFamilyLkd)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          familyLkd: data
        });
        // this.state.IndividualData = data;
        console.log("data :" + this.state.familyLkd);
      })
      .catch(error => {
        console.log("Error :");

        document.write("Error : " + error);
      });
  }

  onSavePatientOnly() {
    console.log("onSavePatientOnly in family component");
  }
  render() {
    const userDiv = {
      marginTop: "5px",
      marginBottom: "10px",
      textAlign: "right",
      width: "100%",
      display: "flex",
      marginRight: "5px"
    };

    const passDiv = {
      marginTop: "10px",
      textAlign: "right",
      width: "100%",
      display: "flex"
    };
    const loginDiv = {
      marginLeft: "25px",
      marginBottom: "20px",
      textAlign: "left"
    };

    const buttonDiv = {
      marginRight: "5px"
    };

    const h3Align = {
      textAlign: "center",
      marginLeft: "40%"
    };
    var errorDiv = {
      display: this.state.error ? "block" : "none",
      // marginLeft: "40px",
      textAlign: "center",
      marginBottom: "5px",
      width: "100%"
    };
    return (
      <div>
        <h3 style={h3Align}>Family Search</h3>
        <p>Please enter the Family ID that you would like to update: </p>

        <div className="row">
          <div className="col-sm-4">
            <div className="col-sm-12 control-margin">Family ID:</div>
            <div className="col-sm-12 control-margin">
              <Autocomplete
                wrapperStyle={{ width: "100%" }}
                inputProps={{
                  style: {
                    width: "100%",
                    height: "42px",
                    border: "1px solid #e6e6e6",
                    padding: "0 35px 0 19px",
                    color: "#999",
                    bordeRadius: "4px"
                  },
                  placeholder: "Enter Family ID"
                }}
                wrapperStyle={{ width: "100%" }}
                className="form-control"
                items={this.state.familyData}
                shouldItemRender={(item, value) => item.indexOf(value) > -1}
                getItemValue={item => item}
                renderItem={(item, highlighted) => (
                  <div
                    key={item}
                    style={{
                      backgroundColor: highlighted ? "#eee" : "transparent"
                    }}
                  >
                    {item}
                  </div>
                )}
                value={this.state.familyIdValue}
                //   onChange={this.setFamilyValue.bind(this)}
                onChange={e => this.setState({ familyIdValue: e.target.value })}
                onSelect={this.setFamilyValue.bind(this)}
                // onSelect={familyIdValue => this.setState({ familyIdValue })}
                //   on
              />
            </div>
          </div>

          <div className="col-sm-4 ">
            <div className="col-sm-12 control-margin">Source:</div>

            <div className="col-sm-12">
              <select
                className="form-control"
                value={this.state.selectedSrlCode}
                onChange={this.setSrlcodes.bind(this)}
                name="srlCodesColumn"
              >
                <option>{"Choose One"}</option>
                {this.state.srlcodesRest.map((read, i) => {
                  this.state.read = read.description;
                  // console.log("profession ID :  " + read.id);
                  return (
                    <option key={read.id} value={read.code}>
                      {read.description}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="col-sm-4 ">
            <div className="col-sm-12 control-margin">LKD Date:</div>
            <div className="col-sm-12 control-margin">
              <DatePicker
                onChange={this.handleLkd}
                value={this.state.currentLKD}
              />
            </div>
          </div>
        </div>
        <div className="inline-error" style={errorDiv}>
          <ul>
            <li className="validationMsg">{this.state.errorMsg}</li>
          </ul>
        </div>
        <br />
        <br />
        {/* disabled={this.state.sendCurrentLKD =='' && this.state.familyIdValue =='' &&  this.state.selectedSrlCode ==''} */}

        <div className="form-group" style={userDiv}>
          <div className="col-sm-5 control-margin" />
          <div className="col-sm-4  control-margin" style={loginDiv}>
            <button
              className="btn btn-primary"
              style={buttonDiv}
              disabled={
                this.state.sendCurrentLKD == "" ||
                this.state.familyIdValue == "" ||
                this.state.selectedSrlCode == ""
              }
              type="button"
              onClick={this.handleSearchGetFamily}
            >
              Search
            </button>
            <button className="btn btn-primary" type="button">
              {" "}
              Reset
            </button>
          </div>
        </div>

        <table className="TFtable">
          <tbody>
            <tr>
              <th> Select </th>
              <th> Individual id</th>
            </tr>
            {this.showFamilyId()}
          </tbody>
        </table>
      </div>
    );
  }
}
