import React from 'react';
// import React, { Component } from 'react';


export default class ChoosePath extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chooseTheFamily:'',
     
        }

        this.handleFamily = this.handleFamily.bind(this);
        this.handleIndividual = this.handleIndividual.bind(this);
    }

    handleFamily(){
        this.setState({chooseTheFamily:true});
        this.state.chooseTheFamily=true;
console.log("in family : "+  this.state.chooseTheFamily)
        this.props.onChooseOption(this.state.chooseTheFamily)
    }
    handleIndividual(){
        this.setState({chooseTheFamily:false});
        this.state.chooseTheFamily=false;

console.log("in individual : "+  this.state.chooseTheFamily)

        this.props.onChooseOption(this.state.chooseTheFamily)

    }
    render(){

        return(

            <div>

                <button type="submit" onClick={this.handleFamily}>Family </button>
                <button type="submit" onClick={this.handleIndividual}> Individual </button>

            </div>
        )
    }
}