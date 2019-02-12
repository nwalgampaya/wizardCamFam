import React from 'react';
// import React, { Component } from 'react';
import '../../App.css';

export default class DateSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dateArray: [],
            monthArray: [],
            yearArray: [],
            selectedDate: '',
            selectedMonth: '',
            selectedYear: '',

        }

        // this.setDate = this.setDate.bind(this);
    }

    setDate(event) {
        console.log("date Value" + event.target.value)
        this.setState({
            selectedDate: event.target.value,
        });

        this.props.onSelectDate(event.target.value)
    }

    setMonth(event) {
        console.log("selectedMonth Value" + event.target.value)
        this.setState({
            selectedMonth: event.target.value,
        });
        this.props.onSelectMonth(event.target.value)

    }
    setYear(event) {
        console.log("selectedYear Value" + event.target.value)
        this.setState({
            selectedYear: event.target.value,
        });
        this.props.onSelectYear(event.target.value)

    }
    componentWillMount() {
        this.getDateArray();
        this.getMonths();
        this.getYears();

    }

    getDateArray() {
        var i;
        for (i = 1; i < 32; i++) {
            this.state.dateArray[i] = i;
            // console.log(this.state.dateArray[i])
        }
        this.state.dateArray[i + 1] = 99
    }

    getMonths() {
        var i;
        for (i = 1; i < 13; i++) {
            this.state.monthArray[i] = i;
            // console.log(this.state.monthArray[i])
        }
        this.state.monthArray[i + 1] = 99
    }

    getYears() {
        var i;
        var j = 0;
        for (i = 2019; i > 1800; i--) {
            j = ++j;
            this.state.yearArray[j] = i;
            // console.log("j"+ j)
        }
        this.state.yearArray[j + 1] = 9999
    }
    render() {

        return (

            <div className="date-table">

                <table>
                    <tbody>
                        <tr>
                            <td>
                                <div className="col-sm-4">
                                    <select disabled={this.props.isAlive} className="form-control " value={this.state.currentCourseOfLiveMonth} onChange={this.setMonth.bind(this)} name="monthColumn">
                                        <option >{"Month"}</option>
                                        {
                                            this.state.monthArray.map((value, i) => {


                                                // console.log("ageGroup ID :  " + ageGroup);
                                                return <option key={i} /*value={ageGroup}*/>{value}</option>

                                            })

                                        }
                                    </select>
                                </div>
                                {/* </td> */}
                                {/* <td> */}
                                <div className="col-sm-4">
                                    <select disabled={this.props.isAlive} className="form-control " value={this.state.currentCourseOfLiveDate} onChange={this.setDate.bind(this)} name="dateColumn">
                                        <option >{"Day"}</option>

                                        {
                                            this.state.dateArray.map((value, i) => {


                                                // console.log("ageGroup ID :  " + ageGroup);
                                                return <option key={i} /*value={ageGroup}*/>{value}</option>

                                            })

                                            // <option >{"Hospital Rec"}</option>
                                        }
                                    </select>
                                </div>
                                <div className="col-sm-4">
                                    <select disabled={this.props.isAlive} className="form-control " value={this.state.currentCourseOfLiveDate} onChange={this.setYear.bind(this)} name="yearColumn">
                                        <option >{"Year"}</option>

                                        {
                                            this.state.yearArray.map((value, i) => {


                                                // console.log("ageGroup ID :  " + ageGroup);
                                                return <option key={i} /*value={ageGroup}*/>{value}</option>

                                            })

                                            // <option >{"Hospital Rec"}</option>
                                        }
                                    </select>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>


            </div>
        )
    }
}