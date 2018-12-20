import React from "react";
import ReactDOM from "react-dom";
// import { Field } from 'react-final-form'
import DatePicker from 'react-date-picker';
import { withFormik, Form, Field } from 'formik'
import * as Yup from 'yup'
import '../App.css';
import '../index.css';
import "../styles/styles.scss";
import Wizard from '../Wizard'
import Welcome from './steps/Welcome.js'
import CancerInfo from "./steps/CancerInfo";
import BootstrapDialog from "./dialog/BootstrapDialog";
import PreviewInfo from "./steps/PreviewInfo";
import ChoosePath from "./steps/ChoosePath";
import Individual from "./steps/Individual";
import Family from "./steps/Family";
import FamilySearch from "./steps/FamilySearch";
// import CancerInfo from './steps/CancerInfo'
// import DropdownMenu, { DropdownItemGroup, DropdownItem } from '@atlaskit/dropdown-menu';

// import ComboDatePicker from '../reactComboDatePicker.js'


class CancerFamilyReg extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
// Values form Db
            gender: 'Male',
            dateOFDOB: 'mm/dd/yyyy',
            status:'zzz',
            dateOfDeath:'1/1/1',
            //todu
            aodeath:'',
            sourceOFDeath:'',
            courseOFDeath:'',
            dateOfLKDA:'',
            sourceOfLiveDate:'',
            fPI1Status:'',
            fPI2Status:'',
            fPI3Status:'',
            fPI4Status:'',
            relationshipCode:'',

// current values
            currentGender:'',
            currentDOB: '',
            currentStatus:'',
            currentDeath:'',
            //todu
            currentaodeath:'',
            currentSourceOFDeath:'',
            currentCourseOFDeath:'',
            currentLKDA:'',
            // currentsourceOfLiveDate:'',
            currentCourseOfLiveDate:'',
            currentfPI1Status:'',
            currentfPI2Status:'',
            currentfPI3Status:'',
            currentfPI4Status:'',
            currentRelationshipCode:'',


            // Boolean Values
            isAlive : true,

            // Values from Rest Service
            existingPersonData:[],

            // isModalOpen:'',

            //To assign Values from CancerInfo
            changedParameters:[],
            cancerInfoArr:[],
            enableSaveButton:'',

            //Used to get the selection between the family and the individual
            choosePathFamily:'',

            //This object is used to carry the edited data to the preview screen
            // changedField:{
            //     id:'',
            //     column:'',
            //     previousVal:'',
            //     newVal:'',
            //   },
            arrayOfChangedFields:[],
            countChangedFields:0,
            columnExist:false,


            //Transfered from StartPageRegistry
            firstPage:'',
            secoundPage:'',
            thirdPage:'',
            fourthPage:'',

            //Family path
            sixthPage:'',
            sevenththPage:'',

            //Get data from child
            // arrayOfChangedFields:[],
            //Transfered from StartPageRegistry
        };
        this.oncurrentDOBChange = this.oncurrentDOBChange.bind(this);
        this.setCurrentLKDA = this.setCurrentLKDA.bind(this);
        this.setCurrentDeath = this.setCurrentDeath.bind(this);
        this.setcurrentRelationshipCode = this.setcurrentRelationshipCode.bind(this);
    }

            //Transfered from StartPageRegistry

            // handleChooseOption = (chooseTheFamily) => {
            //     this.setState({choosePathFamily: chooseTheFamily});
                
            // }
        
            choosePath(){
                console.log("choose path : " + this.state.choosePathFamily)
                     if(this.state.choosePathFamily){
                         //  fourthPage:'',
                         this.state.sixthPage=<FamilySearch />
                         
                         return <Family/>
                        }else {
                            // this.state.firstPage= <FormikApp />
                            // this.state.secoundPage=<CancerInfo onSaveChangeInfo={this.handleChangedRecFrmChild} arrayEditedData= {this.state.arrayEditedData}/>
                            // this.state.firstPage= <FormikApp />
                            this.state.secoundPage=<CancerInfo onSaveChangeInfo={this.handleChangedRecFrmChild} arrayEditedData= {this.state.arrayEditedData}/>
                            this.state.thirdPage = <PreviewInfo  arrayEditedData= {this.state.arrayEditedData} enableSaveButton={this.state.enableSaveButton} arrayOfChangedFields={this.state.arrayOfChangedFields} />
                         return <Individual />
                     }
         
             }
        
            handleChangedRecFrmChild = (arrayEditedDataArr, enableSaveButton ) => {
                this.setState({arrayEditedData: arrayEditedDataArr});
                this.setState({enableSaveButton : enableSaveButton});
               
            }
            //Transfered from StartPageRegistry

    // This function is used to fill an array to carry the data to the preview screen
    setPreviewScreenData(columnName, previousValue, nextValue){

        // var columnExist = false;

        //Have to initiate a fresh object of 'changedField' in every scenario or will get fault results 
        var changedField= new  Object;
        if(this.state.arrayOfChangedFields.length!=0){
            this.state.arrayOfChangedFields.map((value,i)=>{
                if(value.column==columnName){
                    changedField.column=columnName;
                    changedField.previousVal=previousValue;
                    changedField.newVal= nextValue;
                    this.state.arrayOfChangedFields[i] = changedField;
                    console.log("values :"+i + " : "+ value.column)
                    this.state.columnExist=true;
                }
            })

            if(!this.state.columnExist){
                changedField.column=columnName;
                changedField.previousVal=previousValue;
                changedField.newVal= nextValue;
                this.state.arrayOfChangedFields[ this.state.countChangedFields] =changedField;
                console.log("values noteq :"+this.state.countChangedFields + " : "+columnName)
                // this.state.columnExist=false;

                this.setState({countChangedFields : ++this.state.countChangedFields })

            }
                this.state.columnExist=false;
            
        }else {
            // var changedField= new  Object;
            changedField.column=columnName;
            changedField.previousVal=previousValue;
            changedField.newVal= nextValue;
            this.state.arrayOfChangedFields[this.state.countChangedFields] = changedField;
            console.log("First Time: "+this.state.countChangedFields + " : ")
            
            this.setState({countChangedFields : ++this.state.countChangedFields })
        }

console.log("countChangedFields"+ this.state.countChangedFields)
        
       
        this.state.arrayOfChangedFields.map((value,i)=>{
            console.log("values :"+i + " : "+ value.column)
            console.log("values :"+i + " : "+ value.newVal)

        })

        // Send the filled Array to parent as and when data is filled
        // this.props.onSendDataToPreview(this.state.arrayOfChangedFields)
    }
    setSex(event) {
        
        console.log("Sex :" + event.target.value);
        this.setState({
            currentGender: event.target.value,
        });
        
        this.setPreviewScreenData("Gender",this.state.gender,event.target.value)

    }
    oncurrentDOBChange(currentDOB) {
            console.log("Sex :" + currentDOB);
    this.setState ({
            currentDOB: currentDOB
        });
    }
    // onnewdobChange = newdob => this.setState({ newdob })

    setCurrentStatus(event){
        console.log("in SetCurrentStatus")
        if(event.target.value==2){
            this.setState({
                isAlive : false,
            })
        }else{
            this.setState({
                isAlive : true,
            })
        }
        this.setState({
            currentStatus: event.target.value,
          });

        this.setPreviewScreenData("Vital Status",this.state.currentStatus,event.target.value)

    }

    setCurrentDeath(currentDeath){
        this.setState({
            currentDeath: currentDeath,
          });
    }

    setCurrentSource(event){
        this.setState({
            currentSourceOFDeath: event.target.value,
          });
    }
    
    setCurrentLKDA(currentLKDA) {
        console.log("setCurrentLKDA :" + currentLKDA);
        this.setState ({
            currentLKDA: currentLKDA
        });
    }

    setSourceLKD(event){
        console.log("setSourceLKD :" + event.target.value); 
        this.setState({
            currentCourseOfLiveDate: event.target.value,
          });
    }

    setcurrentfPI1Status(event){
        console.log("setcurrentfPI1Status :" + event.target.value); 
        this.setState({
            currentfPI1Status: event.target.value,
          });
    }
    setcurrentfPI2Status(event){
        console.log("setcurrentfPI2Status :" + event.target.value); 
        this.setState({
            currentfPI2Status: event.target.value,
          });
    }
    setcurrentfPI3Status(event){
        console.log("setcurrentfPI3Status :" + event.target.value); 
        this.setState({
            currentfPI3Status: event.target.value,
          });
    }
    setcurrentfPI4Status(event){
        console.log("setcurrentfPI4Status :" + event.target.value); 
        this.setState({
            currentfPI4Status: event.target.value,
          });
    }

    setcurrentRelationshipCode(event){
        console.log("setcurrentRelationshipCode :" + event.target.value); 
        this.setState({
            currentRelationshipCode: event.target.value,
          });
    }


    getFromDB(){
        // existingPersonData

        // const urlProfession = properties.baseUrl + "professions/";
        const urlProfession =  "professions/";
        fetch(urlProfession)
          .then(response => response.json())
          .then((data) => {
    
            console.log(data);
            this.setState({
                existingPersonData: data,
    
            });

            this.assignDbDataToFields()
            // this.state.profession.push(data);
          })

    }

    // To assign values form data base to 'Existing Details" variables.
    assignDbDataToFields(){

        this.state.existingPersonData.map((read, i) => {
            this.state.gender= 'Female', //read.gender,
            this.state.dateOFDOB= read.dateOFDOB,
            this.state.status= read.status,
            this.state.dateOfDeath= read.dateOfDeath,
            //this.state.= //this.existingPersonData.//u
            this.state.aodeath= read.aodeath,
            this.state.sourceOFDeath= read.sourceOFDeath,
            this.state.courseOFDeath= read.courseOFDeath,
            this.state.dateOfLKDA= read.dateOfLKDA,
            this.state.sourceOfLiveDate= read.sourceOfLiveDate,
            this.state.fPI1Status= read.fPI1Status,
            this.state.fPI2Status= read.fPI2Status,
            this.state.fPI3Status= read.fPI3Status,
            this.state.fPI4Status= read.fPI4Status,
            this.state.relationshipCode= read.relationshipCode
        })    
    }

    // Used for saving 'New Details' to the db
    postRequest() {
        let data = {
            currentGender:this.state.currentGender,
            currentDOB:this.state.currentDOB, 
            currentStatus:this.state.currentStatus,
            currentDeath:this.state.currentDeath,
            // todu
            currentaodeath:this.state.currentaodeath,
            currentSourceOFDeath:this.state.currentSourceOFDeath,
            currentCourseOFDeath:this.state.currentCourseOFDeath,
            currentLKDA:this.state.currentLKDA,
            // this.state.urrentsourceOfLiveDate,
            currentCourseOfLiveDate:this.state.currentCourseOfLiveDate,
            currentfPI1Status:this.state.currentfPI1Status,
            currentfPI2Status:this.state.currentfPI2Status,
            currentfPI3Status:this.state.currentfPI3Status,
            currentfPI4Status:this.state.currentfPI4Status,
            currentRelationshipCode:this.state.currentRelationshipCode,
        }

        // const url = properties.baseUrl + 'practitioners/create';
        const url = 'practitioners/create';

        var request = new Request(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        mode: "cors",
        credentials: "same-origin",
        crossDomain: true

        });

        fetch(request)
        .then((response) => {
            return response.json();
        })
        .then((jsonObject) => {
            console.log("CREATED ID :" + jsonObject.id);
            this.state.jsonId = jsonObject.id;
            // document.write(`ID ${jsonObject.id} was created!`);
        })
        .then(() => {
            if (this.state.jsonId.length !== 0) {
            this.fetchPractitionerId(this.state.jsonId)
            }
        })
        .catch((error) => {
            document.write(error);
        });
    }


    // setDialogState(isModalOpenValue){
        // console.log("isModalOpen&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& : " + isModalOpenValue)
        // this.setState({isModalOpen:isModalOpenValue})
        // this.state.isModalOpen=isModalOpenValue
        
    // }

    handleChangedRecFrmChild = (arrayEditedDataArr, enableSaveButton) => {
        this.setState({arrayEditedData: arrayEditedDataArr});
        this.setState({enableSaveButton : enableSaveButton});
        
    }
    handleChooseOption = (chooseTheFamily) => {
        this.setState({choosePathFamily: chooseTheFamily});
        
    }
    // choosePath(){
    //    console.log("choose path : " + this.state.choosePathFamily)
    //         if(this.state.choosePathFamily){
    //             return <Family/>
    //         }else {
    //             return <Individual />
    //         }

    // }


    render() {

        // Formik : Passing the props
        const {      
            values,
            errors,
            touched,
            isSubmitting
          
        } = this.props;


        return (
            // isModalOpenValue={this.state.isModalOpen}
            // <Wizard >
            //     <Wizard.Page>
            //         <Welcome />
            //     </Wizard.Page> 
            //     <Wizard.Page>
            //         <ChoosePath onChooseOption={this.handleChooseOption}/>
            //     </Wizard.Page>
            //     <Wizard.Page>
                    
            //         {this.choosePath()}
                    
            //     </Wizard.Page>

                    //  {/* onOpenDialog={this.setDialogState} */}
                // {/* <Wizard.Page>
                //     <CancerInfo onSaveChangeInfo={this.handleChangedRecFrmChild}/>
                // </Wizard.Page>
                // <Wizard.Page>
                //     <PreviewInfo  arrayEditedData= {this.state.arrayEditedData} enableSaveButton={this.state.enableSaveButton}/>
                // </Wizard.Page> */}
<Wizard choosePathFamily={this.state.choosePathFamily}>
                <Wizard.Page>
                    <Welcome />  {/* Page 0 */}
                </Wizard.Page> 
                <Wizard.Page>
                    <ChoosePath onChooseOption={this.handleChooseOption}/>    {/* Page 1 */}
                </Wizard.Page>
                <Wizard.Page>
                    {this.choosePath()}                                       {/* Page 2 */}  
                </Wizard.Page>
{/* Pages for the INDIVIDUAL flow START                 */}                
                <Wizard.Page>
                <div>                                                          {/* Page 3 */} 
                {/* <Wizard.Page> */}
                    <div className="row">
                        {/* <div className="form-horizontal"> */}
                        <div className="modal-body row">
                            <div className="col-sm-12">
                                <div className="row">
{/* Existing Details Start */}
                                    <div className="col-sm-6">
                                        <div className="col-sm-12">
                                            Existing Details
                                        </div> <br/>   
                                        <div className="col-sm-12">
                                            Gender:
                                        </div>

                                        <div className="col-sm-12">
                                            {/* <span>{this.state.gender}</span> */}
                                            <Field type="email" name="email" value={this.state.gender} placeholder="Email"/><br/>
                                            <div className="validationMsg">
                                            {/* <Error name="ageColumn" /> */}
                                                { touched.email && errors.email && <p>{errors.email}</p> }
                                            </div>
                                        </div><br/>
                                        <div className="col-sm-12">
                                            Date of Birth:
                                        </div>

                                        <div className="col-sm-12">
                                            <span>{this.state.dateOFDOB}</span>
                                        </div> <br/>                                       
                                        <div className="col-sm-12">
                                            Vital Status: 
                                        </div>

                                        <div className="col-sm-12">
                                            <span>{this.state.status}</span>
                                        </div><br/>

                                        <div className="col-sm-12">
                                            Date of Death:
                                        </div>

                                        <div className="col-sm-12">
                                            <span>{this.state.dateOfDeath}</span>
                                        </div><br/>

                                        <div className="col-sm-12">
                                            Age of Death: 
                                        </div>

                                        <div className="col-sm-12">
                                            <span><label className="form-check-label" name ="aodeathColumn"  >{values.aodeathColumn}</label></span>
                                            {/* {this.state.aodeath} */}
                                        </div><br/>
                                        
                                        <div className="col-sm-12">
                                            Source of Death Information: 
                                        </div>

                                        <div className="col-sm-12">
                                            <span>{this.state.sourceOFDeath}</span>
                                        </div><br/>

                                        <div className="col-sm-12">
                                            Cause of Death:  
                                        </div>

                                        <div className="col-sm-12">
                                            <span>{this.state.courseOFDeath}</span>
                                        </div><br/>

                                        <div className="col-sm-12">
                                            Last Known Date:  
                                        </div>

                                        <div className="col-sm-12">
                                            <span>{this.state.dateOfLKDA}</span>
                                        </div><br/>

                                        <div className="col-sm-12">
                                            Source of Last Known Date:   
                                        </div>

                                        <div className="col-sm-12">
                                            <span>{this.state.sourceOfLiveDate}</span>
                                        </div><br/>

                                        <div className="col-sm-12">
                                            EPI FUP 1 STATUS: 
                                        </div>

                                        <div className="col-sm-12">
                                            <span>{this.state.fPI1Status}</span>
                                        </div><br/>

                                        <div className="col-sm-12">
                                            EPI FUP 2 STATUS: 
                                        </div>

                                        <div className="col-sm-12">
                                            <span>{this.state.fPI2Status}</span>
                                        </div><br/>

                                        <div className="col-sm-12">
                                            EPI FUP 3 STATUS: 
                                        </div>

                                        <div className="col-sm-12">
                                            <span>{this.state.fPI3Status}</span>
                                        </div><br/>


                                        <div className="col-sm-12">
                                            EPI FUP 4 STATUS: 
                                        </div>

                                        <div className="col-sm-12">
                                            <span>{this.state.fPI4Status}</span>
                                        </div><br/>
                                     </div>


{/* Existing Details End */}    

{/* New Details Start*/}
                                    <div className="col-sm-6">
                                        <div className="col-sm-12">
                                            New Details
                                        </div><br/>
                                        <div className="col-sm-12">
                                            Gender:
                                            </div>
                                        <div className="col-sm-12">
                                            <div className="form-check form-check-inline" onChange={this.setSex.bind(this)} >
                                                <Field className="form-check-input" type="radio" value="1" checked={this.state.currentGender == 1 ? true : false} name="genderColumn" />
                                                <label className="form-check-label" >Male</label>
                                                <Field className="form-check-input" type="radio" value="2" checked={this.state.currentGender == 2 ? true : false} name="genderColumn" />
                                                <label className="form-check-label" >Female</label>
                                                <Field className="form-check-input" type="radio" value="3" checked={this.state.currentGender == 3 ? true : false} name="genderColumn" />
                                                <label className="form-check-label" >Unknown</label>

                                            </div><br/>
                                        </div> <br/>   
                                        <div className="col-sm-12">
                                            Date of Birth:
                                        </div>
                                        <div className="col-sm-4"> 
                                            <DatePicker
                                            onChange={this.oncurrentDOBChange}
                                            value={this.state.currentDOB}
                                            />
                                        </div><br/>
                                        <div className="col-sm-12">
                                            Vital Status:
                                        </div>
                                        <div className="col-sm-12" value={this.state.currentStatus}>
                                            <div className="form-check form-check-inline" onChange={this.setCurrentStatus.bind(this)} >
                                                <input className="form-check-input" type="radio" value="1" checked={this.state.currentStatus == 1 ? true : false} name="vitalStatusColumn" />
                                                <label className="form-check-label" >Alive</label>
                                                <input className="form-check-input" type="radio" value="2" checked={this.state.currentStatus == 2 ? true : false} name="vitalStatusColumn" />
                                                <label className="form-check-label" >Dead</label>
                                                <input className="form-check-input" type="radio" value="3" checked={this.state.currentStatus == 3 ? true : false} name="vitalStatusColumn" />
                                                <label className="form-check-label" >Unknown</label>

                                        </div>
                                        </div><br/>                                        
                                        <div className="col-sm-12">
                                            Date of Death: 
                                        </div>

                                        <div  className="col-sm-5"> 
                                            <DatePicker disabled={this.state.isAlive}
                                            onChange={this.setCurrentDeath}
                                            value={this.state.currentDeath}
                                            />
                                        </div><br/>
                                        <div className="col-sm-12">
                                            Age of Death: 
                                        </div>
                                        <div className="col-sm-4">
                                            {/* <span disabled={this.state.isAlive} name ="currentaodeathColumn" > </span> */}
                                            <input type="text" name="currentaodeathColumn" disabled={this.state.isAlive}/> 
                                                {/* // {this.state.currentaodeath}
                                                value={"values.currentaodeathColumn"} */}
                                             {/* <label type="label" name ="currentaodeathColumn" value={values.currentaodeathColumn}></input> */}
                                             
                                        </div><br/>


                                        <div className="col-sm-12">
                                            Source of Death Information: 
                                        </div>
                                        <div className="col-sm-5">
                                            <select disabled={this.state.isAlive} className="form-control dorp-box" value={this.state.currentSourceOFDeath} onChange={this.setCurrentSource.bind(this)} name="currentDeathColumn">
                                            {
                                                // this.state.ageData.map((ageGroup, i) => {
                                                    
                                                //     this.state.ageGroup = ageGroup.name;
                                                //     console.log("location ID :  " + ageGroup.id);
                                                //     return <option key={ageGroup.value} value={ageGroup.id}>{ageGroup.name}</option>
                                                    
                                                // })
                                                
                                                <option >{"Hospital Rec"}</option>
                                            }
                                            </select>
                                        </div><br/>
                                        {/* <div className="form-check-inline col-sm-12">
                                            <div className="col-sm-4">
                                                Cause of Death:  
                                            </div>
                                            
                                           

                                            <div className="col-sm-2">
                                                (Unknown)  
                                            </div>
                                        </div> */}



                                        <div className="form-check-inline col-sm-12">
                                            <div className="col-sm-6">
                                                Cause of Death:  
                                            </div>
                                            
                                             {/* <div className="col-sm-1"></div> */}

                                            <div className="col-sm-2">
                                                (Unknown)  
                                            </div>
                                        </div>

                                        <div className="form-check-inline col-sm-12">
                                            <div className="col-sm-6">
                                                <input type="text" name="currentCourseOFDeathColumn" disabled={this.state.isAlive}/> 
                                            </div>
                                            
                                            {/* <div className="col-sm-1"></div> */}

                                            <div className="col-sm-1">
                                                <input className="form-check-input" type="checkbox" name="unknownCourseOFDeath" disabled={this.state.isAlive} />
                                            </div>
                                        </div>
                                        <br/>
                                                {/* <span>{this.state.currentCourseOFDeath}</span> */}
                                                {/* checked={values.newsletter} */}

                                        <div className="col-sm-12">
                                            Last Known Date:  
                                        </div>
                                        <div className="col-sm-4"> 
                                            <DatePicker
                                            onChange={this.setCurrentLKDA}
                                            value={this.state.currentLKDA}
                                            />
                                        </div><br/> 
                                        <div className="col-sm-12">
                                            Source of Last Known Date:  
                                        </div>
                                        <div className="col-sm-5">
                                            <select className="form-control dorp-box" value={this.state.currentCourseOfLiveDate} onChange={this.setSourceLKD.bind(this)} name="sourceLKDColumn">
                                            {
                                                // this.state.ageData.map((ageGroup, i) => {
                                                    
                                                //     this.state.ageGroup = ageGroup.name;
                                                //     console.log("location ID :  " + ageGroup.id);
                                                //     return <option key={ageGroup.value} value={ageGroup.id}>{ageGroup.name}</option>
                                                    
                                                // })
                                                
                                                <option >{"Hospital Rec"}</option>
                                            }
                                            </select>
                                        </div><br/>
                                        <div className="col-sm-12">
                                            EPI FUP 1 STATUS:   
                                        </div>
                                        <div className="col-sm-5">
                                            <select className="form-control dorp-box" value={this.state.currentfPI1Status} onChange={this.setcurrentfPI1Status.bind(this)} name="fPI1StatusColumn">
                                            {
                                                // this.state.ageData.map((ageGroup, i) => {
                                                    
                                                //     this.state.ageGroup = ageGroup.name;
                                                //     console.log("location ID :  " + ageGroup.id);
                                                //     return <option key={ageGroup.value} value={ageGroup.id}>{ageGroup.name}</option>
                                                    
                                                // })
                                                
                                                <option >{"Hospital Rec"}</option>
                                            }
                                            </select>
                                        </div><br/>
                                        <div className="col-sm-12">
                                            EPI FUP 2 STATUS:   
                                        </div>
                                        <div className="col-sm-5">
                                            <select className="form-control dorp-box" value={this.state.currentfPI2Status} onChange={this.setcurrentfPI2Status.bind(this)} name="fPI2StatusColumn">
                                            {
                                                // this.state.ageData.map((ageGroup, i) => {
                                                    
                                                //     this.state.ageGroup = ageGroup.name;
                                                //     console.log("location ID :  " + ageGroup.id);
                                                //     return <option key={ageGroup.value} value={ageGroup.id}>{ageGroup.name}</option>
                                                    
                                                // })
                                                
                                                <option >{"Hospital Rec"}</option>
                                            }
                                            </select>
                                        </div><br/>
                                        <div className="col-sm-12">
                                            EPI FUP 3 STATUS:   
                                        </div>
                                        <div className="col-sm-5">
                                            <select className="form-control dorp-box" value={this.state.currentfPI3Status} onChange={this.setcurrentfPI3Status.bind(this)} name="fPI3StatusColumn">
                                            {
                                                // this.state.ageData.map((ageGroup, i) => {
                                                    
                                                //     this.state.ageGroup = ageGroup.name;
                                                //     console.log("location ID :  " + ageGroup.id);
                                                //     return <option key={ageGroup.value} value={ageGroup.id}>{ageGroup.name}</option>
                                                    
                                                // })
                                                
                                                <option >{"Hospital Rec"}</option>
                                            }
                                            </select>
                                        </div><br/>
                                        <div className="col-sm-12">
                                            EPI FUP 4 STATUS:   
                                        </div>
                                        <div className="col-sm-5">
                                            <select className="form-control dorp-box" value={this.state.currentfPI4Status} onChange={this.setcurrentfPI4Status.bind(this)} name="fPI4StatusColumn">
                                            {
                                                // this.state.ageData.map((ageGroup, i) => {
                                                    
                                                //     this.state.ageGroup = ageGroup.name;
                                                //     console.log("location ID :  " + ageGroup.id);
                                                //     return <option key={ageGroup.value} value={ageGroup.id}>{ageGroup.name}</option>
                                                    
                                                // })
                                                
                                                <option >{"Hospital Rec"}</option>
                                            }
                                            </select>
                                        </div><br/>
                                        <div className="col-sm-12">
                                            Relationship Code:    
                                        </div>
                                        <div className="col-sm-5">
                                            <select className="form-control dorp-box" value={this.state.currentRelationshipCode} onChange={this.setcurrentRelationshipCode.bind(this)} name="currentRelCodeColumn">
                                            {
                                                // this.state.ageData.map((ageGroup, i) => {
                                                    
                                                //     this.state.ageGroup = ageGroup.name;
                                                //     console.log("location ID :  " + ageGroup.id);
                                                //     return <option key={ageGroup.value} value={ageGroup.id}>{ageGroup.name}</option>
                                                    
                                                // })
                                                
                                                <option >{"Hospital Rec"}</option>
                                            }
                                            </select>
                                        </div><br/>                                        
                                        


                                            <br></br>
                                        
                                        <div className="col-sm-12">

                                        </div>
                                    </div>
{/* current Details End*/}                                    
                                </div>

                            </div>
                            {/* </div> */}
                        </div>
                    </div>
            </div>
            </Wizard.Page> 
                <Wizard.Page >
                    {this.state.secoundPage}                                           {/* Page 4 -- Dialog page */} 
                    {/* <CancerInfo onSaveChangeInfo={this.handleChangedRecFrmChild} arrayEditedData= {this.state.arrayEditedData}/> */}
                </Wizard.Page>
                <Wizard.Page>
                    {this.state.thirdPage}                                              {/* Page 5 -- Preview Page */}
                </Wizard.Page>
{/* Pages for the INDIVIDUAL flow END                 */}                

{/* Pages for the Family flow START                 */}
                <Wizard.Page>
                    <div>
                        {this.state.sixthPage}                                                               {/* Page 6 */}      
                    </div>
                </Wizard.Page>
                <Wizard.Page>
                    <div>
                        Seven                                                               {/* Page 7 */}      
                    </div>
                </Wizard.Page>
{/* Pages for the Family flow END                 */}                
                <Wizard.Page>
                    <div>
                        Last                                                               {/* Page 8 */}      
                    </div>
                </Wizard.Page>
            </Wizard>
                // </Wizard.Page>
                // <Wizard.Page>
                //     <CancerInfo onSaveChangeInfo={this.handleChangedRecFrmChild}/>
                // </Wizard.Page>
                // <Wizard.Page>
                //     <PreviewInfo  arrayEditedData= {this.state.arrayEditedData} enableSaveButton={this.state.enableSaveButton}/>
                // </Wizard.Page>
                //     {/* <BootstrapDialogOld/> */}
                    // {/* <BootstrapDialog/> */}
            // </Wizard>


        );

    }
}
const FormikApp = withFormik({
    


    mapPropsToValues({email,aodeathColumn, currentaodeathColumn}) {
    
        return {
            email: email || '',
            aodeathColumn:'fromDb',
            currentaodeathColumn: "testin",
            vitalStatusColumn: 1,
        }
    },
    handleSubmit(){
        console.log("CancerFamilyReg SUBMIT " )
    },
    validationSchema: Yup.object().shape({
        email: Yup.string().email('Email not valid').required('Email is required'),
        // password: Yup.string().min(9, 'Password must be 9 characters or longer').required('Password is required')
      }),
})(CancerFamilyReg) 



export default FormikApp;
    {/* <DropdownMenu
      trigger="Choices"
      triggerType="button"
      shouldFlip={false}
      position="right middle"
      onOpenChange={this.setcurrentRelationshipCode.bind(this)}
    >         <DropdownItemGroup>
    <DropdownItem>Sydney</DropdownItem>
    <DropdownItem>Melbourne</DropdownItem>
  </DropdownItemGroup>
</DropdownMenu> */}
{/* <div style={{ margin: '20px' }}> */}
// ReactDOM.render(template, document.getElementById("app"));



// Page 1 Functions
    //getFromDB(),assignDbDataToFields(), postRequest()
// Page 2 Functions
    //