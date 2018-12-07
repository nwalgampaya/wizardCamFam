
import React from 'react';
import {Button, DropdownButton, MenuItem, Modal,  OverlayTrigger, Tooltip} from 'react-bootstrap';
import DatePicker from 'react-date-picker';
import '../../App.css';
import { withFormik, Form, Field } from 'formik'
import * as Yup from 'yup'

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
          cancerInfoEdited:[{id:'',age:'',complaints:''}],          
          tumorNo:'',
          siteData:[],
          siteEditDlg:'',
          changedParameters: [],
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

    componentDidMount(){
      
console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL")
        
            // const urlProfession = properties.baseUrl + "practitionerscore/" ;
            // fetch saved practitioner rec id
            console.log("SEL this.jsonId%%%%%%%%%%%%%%%%%%% : " + this.state.jsonId)
            const urlProfession = "http://128.250.143.10:8090/ProneSpringBoot/api/practitionersTest/";
            fetch(urlProfession)
              .then(response => response.json())
              .then((data) => {
        
                console.log("score" + data);
                this.setState({
                    cancerInfo: data,
        
                });
                // this.state.profession.push(data);
              })
              // const = properties.baseUrl +"uageRecs/";
              // const urlAgegroup = properties.baseUrl + 'ageRecs';
            const urlAgegroup = "http://128.250.143.10:8090/ProneSpringBoot/api/ageRecs/";
            fetch(urlAgegroup)
              .then(response => response.json())
              .then((data) => {

                console.log(data);
                this.setState({

                  // flats: data
                  siteData: data

                });
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
      this.state.cancerInfoEdited[this.state.tumorNo] = [...this.state.cancerInfo[this.state.tumorNo]];
      this.state.changedParameters[this.state.tumorNo] = [...this.state.cancerInfo[this.state.tumorNo]];
      if(!this.state.isArrayEmpty){
        this.makeEmptyArray();
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

      createEditedArray(){
          console.log("in handleSave tumorNo early"  + this.state.cancerInfoEdited[this.state.tumorNo].age)

          console.log("in handleSave tumorNo before"  + this.state.cancerInfoEdited[this.state.tumorNo].age)
          
          if(this.state.siteEditDlg!="undefined"){
            this.state.cancerInfoEdited[this.state.tumorNo].age = this.state.siteEditDlg
            this.state.cancerInfoEdited[this.state.tumorNo].location= 44
          }

          console.log("in handleSave age after" + this.state.cancerInfoEdited[this.state.tumorNo].age)
          console.log("in handleSave age after" + this.state.cancerInfo[this.state.tumorNo].age)
          
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
        var i=0;
        var EditedParam = new Array;
        for(var param in this.state.cancerInfoEdited[this.state.tumorNo]){
          var changeCol= new  Object;
          console.log(param + ':: ' + this.state.cancerInfo[this.state.tumorNo][param]);
          console.log(param + ':: ' + this.state.cancerInfoEdited[this.state.tumorNo][param]);
          changeCol.column=param
          changeCol.previousVal=this.state.cancerInfo[this.state.tumorNo][param]
          changeCol.newVal=this.state.cancerInfoEdited[this.state.tumorNo][param]

          console.log("--------------------------------" + this.state.tumorNo)
          // this.state.arrayEditedParam[i] =changeCol;
          EditedParam[i]=changeCol;
          i++;
        }
        
        this.state.arrayEditedData[this.state.tumorNo] = EditedParam;
        
        
        }
        this.sendDataToParent()
      }

      sendDataToParent(){
        this.state.arrayEditedData.map((values,i)=>{
          // console.log("i : " + values)
          values.map((values,i)=>{
          console.log("i : " + i)
          console.log("previousVal : " + values.previousVal)
          console.log("newVal: " + values.newVal)
          })
        })
        this.props.onSaveChangeInfo(this.state.arrayEditedData,this.state.enableSaveButton)
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
        console.log("loadDataToEditDialog TUmorNo : " + this.state.cancerInfo[id].age)
//ToDu
// save the changed row in to an array , this will be compaired with the original data in the review.
      this.state.siteEditDlg=this.state.cancerInfo[id].age
    } 
    setCurrentSource(){

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
                      <select disabled={this.state.isAlive} className="form-control dorp-box" value={this.state.siteEditDlg} onChange={this.setSite.bind(this)} name="currentDeathColumn">
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
                    <div className="col-sm-5">
                      Lateral: 
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
                    <div className="col-sm-5">
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
                    <div className="col-sm-5">
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
                        <input type= "text" placeholder="age"></input>
                      </div><br/><br/>
                  </div>
                  <div className="row form-check form-check-inline">
                    <div className="col-sm-5">
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
                    <div className="col-sm-5">
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
                      <select className="form-control dorp-box" value={this.state.currentSourceOFDeath} onChange={this.setCurrentSource.bind(this)} name="currentDeathColumn">
                      {
                        
                        <option >{"Hospital Rec"}</option>
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
          { props.cancerInfo.id }
        </td>
        <td>
          { props.cancerInfo.age }
        </td>
        <td>
          { props.cancerInfo.complaints }
        </td>
        <td>
          { props.cancerInfo.location }
        </td>
        <td>
          { props.cancerInfo.score }
        </td>
        <td>
          { props.cancerInfo.sex }
        </td>
        <td>
          { props.cancerInfo.specialty }
        </td>
        <td>
          { props.cancerInfo.specificcomplaint }
        </td>
        <td>
          { props.cancerInfo.issuetype }
        </td>
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