import React from "react";
import ReactDOM from "react-dom";
import Wizard from '../Wizard'
import Welcome from './steps/Welcome.js'
import CancerInfo from "./steps/CancerInfo";
import BootstrapDialog from "./dialog/BootstrapDialog";
import PreviewInfo from "./steps/PreviewInfo";
import ChoosePath from "./steps/ChoosePath";
import Individual from "./steps/Individual";
import Family from "./steps/Family";
import FormikApp from"./CancerFamilyReg"
import '../App.css';

export default class StartPageRegistry extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            //Used to get the selection between the family and the individual
            choosePathFamily:'',
            firstPage:'',
            secoundPage:'',
            thirdPage:'',
            fourthPage:'',
        }
    }

    handleChooseOption = (chooseTheFamily) => {
        this.setState({choosePathFamily: chooseTheFamily});
        
    }

    choosePath(){
        console.log("choose path : " + this.state.choosePathFamily)
             if(this.state.choosePathFamily){
                 this.state.firstPage= <FormikApp />
                 this.state.secoundPage=<CancerInfo onSaveChangeInfo={this.handleChangedRecFrmChild}/>
                 this.state.thirdPage = <PreviewInfo  arrayEditedData= {this.state.arrayEditedData} enableSaveButton={this.state.enableSaveButton}/>
                //  fourthPage:'',

                 return <Family/>
             }else {
                 return <Individual />
             }
 
     }

    handleChangedRecFrmChild = (arrayEditedDataArr, enableSaveButton) => {
        this.setState({arrayEditedData: arrayEditedDataArr});
        this.setState({enableSaveButton : enableSaveButton});
        
    }

    render(){

        return (
            // isModalOpenValue={this.state.isModalOpen}
            <Wizard >
                <Wizard.Page>
                    <Welcome />
                </Wizard.Page> 
                <Wizard.Page>
                    <ChoosePath onChooseOption={this.handleChooseOption}/>
                </Wizard.Page>
                <Wizard.Page>
                    
                    {this.choosePath()}
                    
                </Wizard.Page>

                <Wizard.Page>
                    {/* <FormikApp />  */}
                    {this.state.firstPage}

                </Wizard.Page> 
                {/* <div  className="hidden"> */}
                <Wizard.Page >
                    {/* <CancerInfo onSaveChangeInfo={this.handleChangedRecFrmChild}/> */}
                    {this.state.secoundPage}
                </Wizard.Page>
                {/* </div> */}

                <Wizard.Page>
                    {/* <PreviewInfo  arrayEditedData= {this.state.arrayEditedData} enableSaveButton={this.state.enableSaveButton}/> */}
                    {this.state.thirdPage}
                </Wizard.Page>
            </Wizard>
        )
    }
}