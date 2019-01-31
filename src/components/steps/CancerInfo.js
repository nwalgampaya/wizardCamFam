
import React from 'react';
import {Button, DropdownButton, MenuItem, Modal,  OverlayTrigger, Tooltip} from 'react-bootstrap';
import DatePicker from 'react-date-picker';
import '../../App.css';
import { withFormik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { properties } from '../../properties.js';
import cloneDeep from 'lodash/cloneDeep';

class CancerInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          cancerInfo:[],
        
          show: false,
          showAddCancer:false,
          currentSourceOFDeath:2,
          
        

          selectedId:'',

          //Edit Modal Dialog variables
          isArrayEmpty:false, 
          // cancerInfoEdited:[{id:'',age:'',complaints:''}],          
          cancerInfoEdited:[{id:'',
                            site: {id:'',code:'', description:''},
                            complaints:''}],          
          // cancerInfoEdited: new  Object,
          tumorNo:'',
          siteData:[],
          latralcodeData:[],
          histocodesData:[],
          behaviourcodesData:[],
          ageDiagnosisData:[],
          diagSourceData:[],
          tissueData:[],
          siteEditDlg:'',
          siteDescription:'',
          siteId:'',
          lateralFromDb:'',
          histocodesFromDb:'',
          behaviourcodesFromDb:'',
          ageDiagnosisFromDb:'',
          diagSourceFromDb:'',
          tissueFromDb:'',
          changedParameters: [],
          cancerInfoCopy:[],
          enableSaveButton: false,  // this should be modified to 'true' when each and every individual field is modified in the dialog 

          // Object Array
          changedColumn:{
            id:'',
            column:'',
            previousVal:'',
            newVal:'',
          },

          arrayEditedData:[],
          arrayEditedParam:[],
          editedRecordCount:0,
          
        }
        this.handleShow = this.handleShow.bind(this);
        this.handleShowAddCancer = this.handleShowAddCancer.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleCloseAddCancer = this.handleCloseAddCancer.bind(this);        
        this.handleSaveAddCancer = this.handleSaveAddCancer.bind(this);        
        
        this.handleSave = this.handleSave.bind(this);    
        this.handleTxtChange = this.handleTxtChange.bind(this);
        this.setCurrentSource = this.setCurrentSource.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
        // handleSubmit

      }

    
  componentDidMount() {

    this.state.editedRecordCoun = this.props.editedRecordCoun;
    // if(this.props.editedRecordCoun=='undefined'){

    //   this.state.editedRecordCoun= 0;
    // }else {
    // }
    console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL" + this.props.editedRecordCount)
    console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL Length" + this.state.arrayEditedData.length)

    // const urlProfession = properties.baseUrl + "practitionerscore/" ;
    // fetch saved practitioner rec id
    
    // const urlCancerInfo = properties.baseUrl + "patients/" + personID + "cancers";
    //TODO - remove the hard code
    const urlCancerInfo = properties.baseUrl + "patients/" + "121000186001" + "/cancers";
    fetch(urlCancerInfo)
      .then(response => response.json())
      .then((data) => {

        this.setState({
          cancerInfo: data,
          
        });
        console.log("site &&&&&&&&&&&&&&&&&&&&&77" + this.state.cancerInfo[1].site.code);
        // this.state.profession.push(data);
      })

    const urlIcdcodes = properties.baseUrl + "icdcodes";
    fetch(urlIcdcodes)
      .then(response => response.json())
      .then((data) => {

        // console.log("siteData : "+ data);
        this.setState({
          siteData: data,

        });

        // this.state.siteData.map((values,i)=>{
        //   // console.log("siteData : "+ values.id);
        //   if(values.id== 2){
        //   console.log("siteData : "+ values.code);

        //   }
        // })
        // this.state.profession.push(data);
      })

      
      const urlLatralcodes = properties.baseUrl + "latralcodes";
      fetch(urlLatralcodes)
        .then(response => response.json())
        .then((data) => {
  
          // console.log("siteData : "+ data);
          this.setState({
            latralcodeData: data,
  
          });
          // this.state.profession.push(data);
        })

      const urlHistocodes = properties.baseUrl + "histocodes";
      fetch(urlHistocodes)
        .then(response => response.json())
        .then((data) => {
  
          // console.log("histocodes : "+ data);
          this.setState({
            histocodesData: data,
  
          });
          // this.state.profession.push(data);
        })
      const urlBehaviourcode = properties.baseUrl + "behaviourcodes";
      fetch(urlBehaviourcode)
        .then(response => response.json())
        .then((data) => {
  
          // console.log("urlBehaviourcode : "+ data);
          this.setState({
            behaviourcodesData: data,
  
          });
          // this.state.profession.push(data);
        })

        // const urlAgeDiagnosis = properties.baseUrl + "behaviourcodes";
        // fetch(urlAgeDiagnosis)
        //   .then(response => response.json())
        //   .then((data) => {
    
        //     console.log("ageDiagnosisData : "+ data);
        //     this.setState({
        //       ageDiagnosisData: data,
    
        //     });
        //     // this.state.profession.push(data);
        //   })

          const urlSource = properties.baseUrl + "srlcodes";
          fetch(urlSource)
            .then(response => response.json())
            .then((data) => {
      
              // console.log("urlBehaviourcode : "+ data);
              this.setState({
                diagSourceData: data,
      
              });
              // this.state.profession.push(data);
            })

            const urltissue = properties.baseUrl + "tissuestatus";
            fetch(urltissue)
              .then(response => response.json())
              .then((data) => {
        
                console.log("urlBehaviourcode : "+ data);
                this.setState({
                  tissueData: data,
        
                });
                // this.state.profession.push(data);
              })

      }

    

  
    
    
    // handleSubmit() {
    //   console.log("in handleSubmit AAAA" )

    //   this.setState({ showAddCancer: false });
    //   // this.setState({ showAddCancer: false });
    // }
    handleClose() {
        this.setState({ show: false });
        
        // this.setState({ showAddCancer: false });
      }
    handleSave() {  
      // console.log("in handleSave" + this.state.cancerInfo[200].age)
      console.log("in handleSave tumorNo " + this.state.tumorNo)
      
      
      this.recordEditedData();
      // alert("Saving" + this.state.cancerInfo[this.state.selectedId].age)
       this.setState({ show: false });

      }
    //capture edited records and compair with the original data   
    recordEditedData(){
      // this.state.cancerInfoEdited = this.state.cancerInfo;
      // this.state.cancerInfoEdited[this.state.tumorNo] = JSON.parse(JSON.stringify(this.state.cancerInfo));
      this.state.cancerInfoEdited[this.state.tumorNo] = [...this.state.cancerInfo[this.state.tumorNo]];
      // this.state.changedParameters[this.state.tumorNo] = [...this.state.cancerInfo[this.state.tumorNo]];
      // this.state.changedParameters[this.state.tumorNo] = JSON.parse(JSON.stringify(this.state.cancerInfo));
      // this.state.changedParameters[this.state.tumorNo] = cloneDeep(this.state.cancerInfo[this.state.tumorNo]);
      this.state.cancerInfoCopy[this.state.tumorNo] = cloneDeep(this.state.cancerInfo[this.state.tumorNo]);
      
      // this.setState({ changedParameters:JSON.parse(JSON.stringify(this.state.cancerInfo)) });
      if(!this.state.isArrayEmpty){
        // this.makeEmptyArray();
      }
      this.createEditedArray();
      this.getChangedFieldsOnly();
     
      // var eq = JSON(this.state.cancerInfoEdited) == JSON(this.state.cancerInfo);
  
      // console.log("eq  : " + eq)
    }

    makeEmptyArray(){
      this.state.changedParameters.map((values,i)=>{
        values.age=''
        values.complaints=''
        values.location=''
        values.score=''
        values.sex=''
        values.specialty=''
        values.specificcomplaint=''
        values.issuetype=''
        values.risk=''
        
      })  
      this.state.isArrayEmpty=true
    }


    // This arrary "changedParameters" is declared to capture only the changed values from the Edit dialog.
//ToDO
      createEditedArray(){
          // console.log("in handleSave tumorNo early"  + this.state.cancerInfoEdited[this.state.tumorNo].site.code)

          // console.log("in handleSave tumorNo before"  + this.state.cancerInfoEdited[this.state.tumorNo].site.code)
          console.log("in handleSave tumorNo before"  + this.state.cancerInfo[this.state.tumorNo].site.code)

          
          // if(this.state.siteEditDlg!="undefined"){
          if(this.state.cancerInfoCopy[this.state.tumorNo].site.code != this.state.siteEditDlg){

            this.setSiteDataForEditDialog();
            // this.state.cancerInfoEdited[this.state.tumorNo].location= 44
          }
          if(this.state.cancerInfoCopy[this.state.tumorNo].lateral.description != this.state.lateralFromDb){
            console.log("lateral changed ***********" + this.state.lateralFromDb)
            this.setLateralDataForEditDialog();
          }
          console.log("in " + this.state.siteEditDlg);
          console.log("in handleSave age afterin handleSave age after" + this.state.cancerInfo[this.state.tumorNo].site.id)
          console.log("in handleSave age afterin changedParameters age after" + this.state.cancerInfoCopy[this.state.tumorNo].site.code)
          // console.log("in handleSave age afterin handleSave age after" + this.state.cancerInfoEdited[this.state.tumorNo].site.description)
          console.log("in handleSave age tumor No" + this.state.tumorNo)
          
          // console.log("in handleSave complaints after" + this.state.cancerInfoEdited[this.state.tumorNo].complaints)
          // console.log("in handleSave location after" + this.state.cancerInfoEdited[this.state.tumorNo].location  )


      }

      getChangedFieldsOnly(){
         if( JSON.stringify(this.state.cancerInfoEdited[this.state.tumorNo]) == JSON.stringify(this.state.cancerInfo[this.state.tumorNo])  ){
        console.log("if equal")
        
        }else{
        console.log("Not equal : " + this.state.tumorNo)
        console.log("Not equal nn" + this.state.cancerInfo[this.state.tumorNo].age)
        console.log("Not equal ed  :" + this.state.cancerInfoEdited[this.state.tumorNo].age)

        
        /** Looping to get all the parameters of the object "cancerInfoEdited" using param (***) 
         * Creating a new Object every time the save is pressed - if not it will update to the same last object every time
         *  This will capture all the changed fields in the Edit dialog box and put into the 'arrayEditedData'
         *  Complex Array ====> (arrayEditedData [arrayEditedParam{Object cancerInfo}]) **/
        // this.state.arrayEditedData[this.state.tumorNo] = [...this.state.arrayEditedData[this.state.tumorNo]];
         
                /**  This will be in play when back is pressed in "Preview" screen, will add new records on top of previous values. **/
                if(this.props.arrayEditedData!= undefined){
                  this.state.arrayEditedData = this.props.arrayEditedData;
                  // this.setState((prevState, props) => ({
                  //   arrayEditedData: [this.state.arrayEditedData,...prevState.arrayEditedData]
                  // }));
                }

        

        var EditedParam = new Array;
        for(var param in this.state.cancerInfoEdited[this.state.tumorNo]){
          var changeCol= new  Object;
          // console.log(param + ':: ' + this.state.cancerInfo[this.state.tumorNo][param]);
          // console.log(param + ':: ' + this.state.cancerInfoEdited[this.state.tumorNo][param]);
          changeCol.column=param
          changeCol.previousVal=this.state.cancerInfoCopy[this.state.tumorNo][param]
          changeCol.newVal=this.state.cancerInfoEdited[this.state.tumorNo][param]

          if(param=="site"){
            changeCol.previousVal=changeCol.previousVal.code
            console.log("--------------------------------" + changeCol.previousVal)
          }if(param=="lateral"){
            changeCol.previousVal=changeCol.previousVal.description
          }
          console.log("PARAM" + param)
          EditedParam[this.state.editedRecordCount]=changeCol;
          this.state.editedRecordCount++;
        }
        
        // console.log("before i /////////////////////////////// : " )


        this.state.arrayEditedData[this.state.tumorNo] =EditedParam;
       
        
        
        }
        this.sendDataToParent()
      }

      sendDataToParent(){
        this.state.arrayEditedData.map((values,i)=>{
          // console.log("i : " + values)
          values.map((values,i)=>{
          console.log("i : " + i)
          if(values.column=="site"){

            console.log("previousVal : " + values.previousVal.code)
          }if(values.column=="lateral"){

            console.log("previousVal : " + values.previousVal.code)
          }else{

            console.log("previousVal : " + values.previousVal)
          }
            console.log("newVal: " + values.newVal)
          })
        })
        this.props.onSaveChangeInfo(this.state.arrayEditedData,this.state.enableSaveButton )
      }

      setSiteDescriptionANDId(code){
        // console.log("siteData code: "+ code )
        // var siteDescription
        
        this.state.siteData.map((values,i)=>{
            // console.log("siteData : "+ values.id);
            if(values.code== code){
              console.log("siteData : "+ values.description);
              this.state.cancerInfo[this.state.tumorNo].site.description = values.description
              this.state.cancerInfo[this.state.tumorNo].site.id = values.id
          }
        })
        // return codeDescription
      }
  

      setSiteDataForEditDialog(){
        this.state.cancerInfo[this.state.tumorNo].site.code = this.state.siteEditDlg
        this.state.cancerInfoEdited[this.state.tumorNo].site= this.state.siteEditDlg
        this.setSiteDescriptionANDId(this.state.cancerInfo[this.state.tumorNo].site.code)
      }

      setLateralDescriptionANDId(code){
        // console.log("siteData code: "+ code )
        // var siteDescription
        
        this.state.latralcodeData.map((values,i)=>{
            // console.log("siteData : "+ values.id);
            if(values.code== code){
              console.log("lateralData : "+ values.description);
              this.state.cancerInfo[this.state.tumorNo].lateral.description = values.description
              this.state.cancerInfo[this.state.tumorNo].lateral.id = values.id
          }
        })
        // return codeDescription
      }
      setLateralDataForEditDialog(){
        this.state.cancerInfo[this.state.tumorNo].lateral.description = this.state.lateralFromDb
        this.state.cancerInfoEdited[this.state.tumorNo].lateral= this.state.lateralFromDb
        this.setSiteDescriptionANDId(this.state.cancerInfo[this.state.tumorNo].site.code)
      }


    handleCloseAddCancer() {
        this.setState({ showAddCancer: false });
        // this.props.onOpenDialog("false"); 
        // this.setState({ showAddCancer: false });
      }
    handleSaveAddCancer() {    
          // alert("Saving" + this.state.cancerInfo[this.state.selectedId].age)
          // this.setState({ showAddCancer: false });
          }
    handleShowAddCancer(){
        // console.log("in handleShow"+  id )
        // this.setState({ show: false });
        this.setState({ showAddCancer: true });
        // this.state.selectedId=id
        console.log("in handleShow selectedId ;"+  this.state.selectedId )
      }
    handleTxtChange (e) {  
        //alert("txt" + e.target.value)
        // this.state.textValue= e.target.value;
        this.setState({ textValue: e.target.value})
    }

// Edit Modal Dialog functions    
   handleShow(id) {
        console.log("in handleShow"+  id )
        console.log("in siteEditDlg"+  this.state.siteEditDlg )
console.log("handleShow RECORD COUNT " + this.state.editedRecordCount)
        
        this.setState({ show: true });
        // this.setState({ showAddCancer: true });
        this.state.selectedId=id
        // this will be the unique id of the selected record.
        this.state.tumorNo = id
        console.log("in handleShow selectedId ;"+  this.state.selectedId )

        this.loadDataToEditDialog(id);
      }
    
      // Values set in here will be displayed in the 'select' boxes in the Edit dialog  
    loadDataToEditDialog(id){
        console.log("loadDataToEditDialog TUmorNo : " + this.state.cancerInfo[id].site.code)
//ToDu
// save the changed row in to an array , this will be compaired with the original data in the review.
      // this.state.siteEditDlg= this.state.cancerInfo[id].site.code
      this.setState({ siteEditDlg : this.state.cancerInfo[id].site.code })
        // + " | " +this.state.cancerInfo[id].site.description     })
      this.setState({ lateralFromDb : this.state.cancerInfo[id].lateral.description })
      this.setState({ histocodesFromDb : this.state.cancerInfo[id].histology.code + " | " +this.state.cancerInfo[id].histology.description     })
      this.setState({ behaviourcodesFromDb :  this.state.cancerInfo[id].behaviour.description })
      this.setState({ ageDiagnosisFromDb :  this.state.cancerInfo[id].ageDiagnosis })
      this.setState({ diagSourceFromDbFromDb :  this.state.cancerInfo[id].diagSource.description })
      this.setState({ tissueFromDbFromDb :  this.state.cancerInfo[id].tissue.description })  

     console.log("siteEditDlg behaviourcodesFromDb' ageDiagnosisFromDbFromDb"+ this.state.ageDiagnosisFromDb)   

    } 
    setCurrentSource(){

      console.log("setCurrentSource  setCurrentSource setCurrentSourcsetCurrentSource")

    }
    setSiteNew(event){
      console.log("setSiteNew setSiteNew setSiteNew")
    }
    setSite(event) {
      console.log("Site :" + event.target.value);
      
        this.setState({
          siteEditDlg: event.target.value,
        });

        if(this.state.siteEditDlg!=event.target.value){
          this.state.enableSaveButton = true;
        }else{
          this.state.enableSaveButton = false;
        }
        // this.state.cancerInfo[200].age = event.target.value
      
      // this.setClearValue()
    }
    setLateral(event){
      this.setState({
        lateralFromDb: event.target.value,
      });

      if(this.state.lateralFromDb!=event.target.value){
        this.state.enableSaveButton = true;
      }else{
        this.state.enableSaveButton = false;
      }
    }
    setCurrentAge(event){
      this.setState({
        ageDiagnosisFromDb: event.target.value,
        });
    }
    closeDialog(){
      console.log("CloseDialog Only when Add Cancer save----------------------------" + this.props.values.ageOfDigColumn)

      this.state.showAddCancer=false;
    }
    componentDidUpdate(prevProps) {
      console.log("In didupdate")
      const { success: wasSuccess = false } = prevProps.status || {};
      const { success: isSuccess = false } = this.props.status || {};
      if (isSuccess ) {
      console.log("In didupdate IF")
      // this.state.showAddCancer=false;

         this.closeDialog();
        // this.htmlForm.submit();
      }
    }
    render() {

      const {      
        values,
        errors,
        touched,
        isSubmitting,
      
      } = this.props;
        let rows = this.state.cancerInfo.map((cancer ,i) => {
          // console.log("in render"+ person.id)
          // console.log("in render i :"+ i)
        return <PersonRow key = {cancer.id} rowId ={i} cancerInfo = {cancer}  handleShow= {this.handleShow}/>
      })

        return (
            <div>
              <table> 
                <tbody>
                    <tr>
                        <th>
                            TUMOR_NO
                        </th>
                        <th>
                            SITE
                        </th>
                        <th>
                            LATERAL
                        </th>
                        <th>
                            HISTOLOGY
                        </th>
                        <th>
                            BEHAVIOR
                        </th>
                        <th>
                            DIAGNOSIS DATE
                        </th>
                        <th>
                            AGE DIAGNOSIS
                        </th>
                        <th>
                            DIAGNOSIS SOURCE:
                        </th>
                        <th>
                            TISSUE
                        </th>
                        <th>
                            UPDATE
                        </th>
                        


                    </tr>
                   
                        {rows}
                   
                    
                    </tbody>
                </table>
                <td><br/>
                <Button  bsSize="small"  onClick={this.handleShowAddCancer}>
                  Add Cancer
                </Button>
        </td>

{/* Modal for Editing New Cancer - START*/}
                <div >
                  
                <Modal /* backdrop={false} */ dialogClassName="dialogclassname" show={this.state.show} onHide={this.handleClose} keyboard={false} selectedid={this.state.selectedId}>
                  
                  <Modal.Header  closeButton={false} >
                    <Modal.Title >
                    <div className="modalHeader">Cancer Edit</div></Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                  {/* value= {}this.state.data[].name */} 
                  {/* Condition for the value is needed to render the element at the the initial load */}
                  {/* <input type="text" onChange={this.handleTxtChange}  value = {this.state.selectedId=='' ? this.state.cancerInfo[0].age : this.state.cancerInfo[this.state.selectedId].age}/> */}
                    
                  <div className="row form-check form-check-inline">
                    <div className="col-sm-5">
                      Site: 
                    </div>
                    <div className="col-sm-5">
                      <select /**disabled={this.state.isAlive}**/ className="form-control dorp-box" defaultValue={this.state.siteEditDlg} onChange={this.setSite.bind(this)} name="currentDeathColumn">
                      {
                        this.state.siteData.map((siteGroup, i) => {
                          // console.log("location ID :  " + siteGroup.id);

                          this.state.siteGroup = siteGroup.description;
                          return <option key={siteGroup.value} defaultValue={this.state.siteEditDlg}>{siteGroup.code/*+" | "+siteGroup.description*/}</option>
  
                        })
                        
                        // <option >{"Hospital Rec"}</option>
                        
                      } 
                      </select>
                    </div><br/><br/>
                  </div>
                  <div className="row form-check form-check-inline">
                    <div className="col-sm-5">
                      Lateral: 
                    </div>
                    <div className="col-sm-5">
                      <select /**disabled={this.state.isAlive}**/ className="form-control dorp-box" value={this.state.lateralFromDb} onChange={this.setLateral.bind(this)} name="currentDeathColumn">
                      {
                        this.state.latralcodeData.map((lateralList, i) => {
                          // console.log("location ID :  " + siteGroup.id);

                          this.state.lateralList = lateralList.description; 
                          return <option key={lateralList.value} defaultValue={this.state.lateralFromDb}>{lateralList.description}</option>
  
                        })
                        // <option >{"Hospital Rec"}</option>
                      }
                      </select>
                    </div><br/><br/>
                  </div>
                  <div className="row form-check form-check-inline">
                    <div className="col-sm-5">
                       Histology: 
                    </div>
                    <div className="col-sm-5">
                      <select /**disabled={this.state.isAlive}**/ className="form-control dorp-box" value={this.state.histocodesFromDb} onChange={this.setCurrentSource.bind(this)} name="currentDeathColumn">
                      {
                        this.state.histocodesData.map((histocodesList, i) => {
                          // console.log("location ID :  " + siteGroup.id);

                          this.state.histocodesList = histocodesList.description; 
                          return <option key={histocodesList.value} defaultValue={this.state.histocodesFromDb}>{histocodesList.code+" | "+histocodesList.description}</option>
  
                        })
                        
                      }
                      </select>
                    </div><br/><br/>
                  </div>
                  <div className="row form-check form-check-inline">
                    <div className="col-sm-5">
                      Behaviour: 
                    </div>
                    <div className="col-sm-5">
                      <select /**disabled={this.state.isAlive}**/ className="form-control dorp-box" value={this.state.behaviourcodesFromDb} onChange={this.setCurrentSource.bind(this)} name="currentDeathColumn">
                      {
                         this.state.behaviourcodesData.map((behaviourcodesList, i) => {
                          // console.log("location ID :  " + siteGroup.id);

                          this.state.behaviourcodesList = behaviourcodesList.description; 
                          return <option key={behaviourcodesList.value} defaultValue={this.state.behaviourcodesFromDb}>{behaviourcodesList.description}</option>
  
                        })
                        
                      }
                      </select>
                    </div><br/><br/>
                  </div>  
                  <div className="row form-check form-check-inline">
                      <div className="col-sm-5">
                        Date Of Diagnosis: :
                      </div>
                      <div className="col-sm-4"> 
                          <DatePicker
                          // onChange={this.oncurrentDOBChange}
                          value={this.state.currentDOB}
                          />
                      </div><br/><br/>
                  </div>
                  <div className="row form-check form-check-inline">
                      <div className="col-sm-5">
                        Age Of Diagnosis: 
                      </div>
                      <div className="col-sm-4"> 
                        <input type= "text" placeholder="age" value = {this.state.ageDiagnosisFromDb} onChange={this.setCurrentAge.bind(this)}/>
                      </div><br/><br/>
                  </div>
                  <div className="row form-check form-check-inline">
                    <div className="col-sm-5">
                    Source:
                    </div>
                    <div className="col-sm-5">
                      <select disabled={this.state.isAlive} className="form-control dorp-box" value={this.state.diagSourceFromDb} onChange={this.setCurrentSource.bind(this)} name="currentDeathColumn">
                      {
                        
                        this.state.diagSourceData.map((diagSourceList, i) => {
                          // console.log("location ID :  " + siteGroup.id);

                          this.state.diagSourceList = diagSourceList.description; 
                          return <option key={diagSourceList.value} defaultValue={this.state.diagSourceFromDb}>{diagSourceList.description}</option>
  
                        })
                      }
                      </select>
                    </div><br/><br/>
                  </div>
                  <div className="row form-check form-check-inline">
                    <div className="col-sm-5">
                        Tissue:
                    </div>
                    <div className="col-sm-5">
                      <select disabled={this.state.isAlive} className="form-control dorp-box" value={this.state.tissueFromDb} onChange={this.setCurrentSource.bind(this)} name="currentDeathColumn">
                      {
                       this.state.tissueData.map((tissueList, i) => {
                          // console.log("location ID :  " + siteGroup.id);

                          this.state.tissueList = tissueList.description; 
                          return <option key={tissueList.value} defaultValue={this.state.tissueFromDb}>{tissueList.description}</option>
  
                        }) 
                        
                      }
                      </select>
                    </div><br/><br/>
                  </div>
                   
                    
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={this.handleClose}>Close</Button>
                    <Button disabled= {!this.state.enableSaveButton} onClick={this.handleSave}>Save</Button>

                  </Modal.Footer>
                </Modal>
                </div>
{/* Modal for Editing New Cancer - END*/}
{/* Modal for Adding New Cancer - START*/}

                <Modal backdrop={false}  dialogClassName="dialogclassname" show={this.state.showAddCancer} onHide={this.handleCloseAddCancer} keyboard={false} selectedid={this.state.selectedId}>
                 {/* onSubmit={this.props.handleSubmit} */}
                 <Form   >
                  
                  <Modal.Header  closeButton={false} >
                    <Modal.Title >
                    <div className="modalHeader">Add Cancer</div></Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                  {/* value= {}this.state.data[].name */} 
                  {/* Condition for the value is needed to render the element at the the initial load */}
                  {/* <input type="text" onChange={this.handleTxtChange}  value = {this.state.selectedId=='' ? this.state.cancerInfo[0].age : this.state.cancerInfo[this.state.selectedId].age}/> */}
                    
                  <div className="row form-check form-check-inline">
                    <div className="col-sm-5 asteric-required">
                      Site:
                    </div>
                    <div className="col-sm-5">
                      <select className="form-control dorp-box" value={this.state.currentSourceOFDeath} onChange={this.setSiteNew.bind(this)} name="currentDeathColumn">
                      {                       
                                                this.state.siteData.map((siteGroup, i) => {
                                                  // console.log("location ID :  " + siteGroup.id);
                        
                                                  this.state.siteGroup = siteGroup.name;
                                                  return <option key={siteGroup.value} value={siteGroup.id}>{siteGroup.name}</option>
                          
                                                })
                        // <option >{"Hospital Rec"}</option>
                      }
                      </select>
                    </div><br/><br/>
                  </div>
                  <div className="row form-check form-check-inline">
                    <div className="col-sm-5 asteric-required">
                      Lateral: 
                    </div>
                    <div className="col-sm-5">
                      <select required="true" disabled={this.state.isAlive} className="form-control dorp-box" value={this.state.currentSourceOFDeath} onChange={this.setCurrentSource.bind(this)} name="currentDeathColumn">
                      {
                        
                        <option >{"Hospital Rec"}</option>
                      }
                      </select>
                    </div><br/><br/>
                  </div>
                  <div className="row form-check form-check-inline">
                    <div className="col-sm-5 asteric-required">
                       Histology: 
                    </div>
                    <div className="col-sm-5">
                      <select disabled={this.state.isAlive} className="form-control dorp-box" value={this.state.currentSourceOFDeath} onChange={this.setCurrentSource.bind(this)} name="currentDeathColumn">
                      {
                        
                        <option >{"Hospital Rec"}</option>
                      }
                      </select>
                    </div><br/><br/>
                  </div>
                  <div className="row form-check form-check-inline">
                    <div className="col-sm-5 asteric-required">
                      Behaviour: 
                    </div>
                    <div className="col-sm-5">
                      <select disabled={this.state.isAlive} className="form-control dorp-box" value={this.state.currentSourceOFDeath} onChange={this.setCurrentSource.bind(this)} name="currentDeathColumn">
                      {
                        
                        <option >{"Hospital Rec"}</option>
                      }
                      </select>
                    </div><br/><br/>
                  </div>  
                  <div className="row form-check form-check-inline">
                      <div className="col-sm-5 asteric-required">
                        Date Of Diagnosis: :
                      </div>
                      <div className="col-sm-4"> 
                          <DatePicker
                          // onChange={this.oncurrentDOBChange}
                          value={this.state.currentDOB}
                          />
                      </div><br/><br/>
                    </div>
                    <div className="row form-check form-check-inline">
                      <div className="col-sm-5 asteric-required">
                        Age Of Diagnosis: 
                      </div>
                      <div className="col-sm-4"> 
                      <Field type= "text" placeholder="age" name="ageOfDigColumn" />
                          <div className="inline-error">{ touched.ageOfDigColumn && errors.ageOfDigColumn && <p>{errors.ageOfDigColumn}</p> }</div>
                      </div><br/><br/>
                    </div>

                    
                  <div className="row form-check form-check-inline">
                    <div className="col-sm-5 asteric-required">
                    Source:
                    </div>
                    <div className="col-sm-5">
                      <select disabled={this.state.isAlive} className="form-control dorp-box" value={this.state.currentSourceOFDeath} onChange={this.setCurrentSource.bind(this)} name="currentDeathColumn">
                      {
                        
                        <option >{"Hospital Rec"}</option>
                      }
                      </select>
                    </div><br/><br/>
                  </div>
                  <div className="row form-check form-check-inline">
                    <div className="col-sm-5 asteric-required">
                        Tissue:
                    </div>
                    <div className="col-sm-5">
                      <select disabled={this.state.isAlive} className="form-control dorp-box" value={this.state.currentSourceOFDeath} onChange={this.setCurrentSource.bind(this)} name="currentDeathColumn">
                      {
                        
                        <option >{"Hospital Rec"}</option>
                      }
                      </select>
                    </div><br/><br/>
                  </div>
                    {/* <hr /> */}

                    
                  </Modal.Body>
                  <Modal.Footer>
                    <button type="submit" onClick={this.handleCloseAddCancer} >Close</button>
                    {/* <Button onClick={this.handleCloseAddCancer} >Close</Button> */}
                    {/* <button  disabled={isSubmitting}>Save</button> */}
                    {/* <button  type= "submit" disabled={isSubmitting}>Save</button> */}
                    <button type="submit">submit</button>
                    {/* <Button disabled= {!this.state.enableSaveButton} onClick={this.handleSave}>Save</Button> */}

                    {/* <Button onClick={this.handleSaveAddCancer}>Save</Button> */}

                  </Modal.Footer>
                </Form>
                </Modal>
{/* Modal for Adding New Cancer END*/}                

            </div>
        )
    }
}


const PersonRow = (props) => {
  
    return (
      <tr>
        <td>
          { props.cancerInfo.tumorNo }
        </td>
        
        <td>
          { props.cancerInfo.site.description }
        </td>
        <td>
          { props.cancerInfo.lateral.description }
        </td>
        <td>
          { props.cancerInfo.histology.description }
        </td>
        <td>
          { props.cancerInfo.behaviour.description }
        </td>
        <td>
          {props.cancerInfo.dateOfDiagnosis!= null? props.cancerInfo.dateOfDiagnosis.slice(4,6)+"/"+props.cancerInfo.dateOfDiagnosis.slice(6,8)+"/"+props.cancerInfo.dateOfDiagnosis.slice(0,4):"N/A" }
        </td>
         <td>
          { props.cancerInfo.ageDiagnosis }
        </td>
        <td>
          { props.cancerInfo.diagSource.description }
        </td>
        
        <td>
          { props.cancerInfo.tissue!=null ? props.cancerInfo.tissue.description: null }
        </td>
        {/*<td>
          { props.cancerInfo.issuetype }
        </td> */}
        <td>
           <Button  bsSize="small" onClick={()=> props.handleShow(props.rowId)} >
             Edit
           </Button>
        </td>

      </tr>
    );
  }
  const DialogFormikApp = withFormik({
    


    mapPropsToValues({ageOfDigColumn,show}) {
    
        return {
            // email: email || '',
            // aodeathColumn:'fromDb',
            // currentaodeathColumn: "testin",
            ageOfDigColumn:'',
            show:false
            // vitalStatusColumn: 1,
        }
    },

    validationSchema: Yup.object().shape({
        // email: Yup.string().email('Email not valid').required('Email is required'),
        ageOfDigColumn: Yup.string().required('value is required'),
        // password: Yup.string().min(9, 'Password must be 9 characters or longer').required('Password is required')
      }),

      // The value for variable "show=false" is passed to the method componentDidUpdate() and used in closing the dialog.
      handleSubmit(values, { resetForm, setErrors, setSubmitting, setStatus, onOpenDialog }) {
        console.log("SUBMIT" + values.show)
        // this.setState({show: false}) ;
        if(values.show==false){
          setStatus({ success: true });
        }else{
          setStatus({ success: false });
        }

        // setStatus({showAddCancer:false});
        // resetForm()
        //Sending value to parent
        // onOpenDialog(true);
        setTimeout(() => {
          if (values.email === 'andrew@test.io') {
            setErrors({ email: 'That email is already taken' })
          } else {
            resetForm()
          }
          setSubmitting(false)
        }, 100)
      }  
})(CancerInfo) 



export default DialogFormikApp;

// TODo
// {/* <Form /* onSubmit={this.handleSubmit} */>