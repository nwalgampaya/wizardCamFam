
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
          cancerInfo:[{
            id: 1,
            name: "Simon Bailey"
          }, {
            id: 2 ,
            name: "Thomas Burleson"
          }],
        
          show: false,
          showAddCancer:false,

        

          selectedId:''
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
       
        
            // const urlProfession = properties.baseUrl + "practitionerscore/" ;
            // fetch saved practitioner rec id
            console.log("SEL this.jsonId%%%%%%%%%%%%%%%%%%% : " + this.state.jsonId)
            const urlProfession = "http://localhost:8090/ProneSpringBoot/api/practitioners/175";
            fetch(urlProfession)
              .then(response => response.json())
              .then((data) => {
        
                console.log("score" + data);
                this.setState({
                    cancerInfo: data,
        
                });
                // this.state.profession.push(data);
              })
        
          
    }

    handleClose() {
        this.setState({ show: false });
        // this.setState({ showAddCancer: false });
      }
    handleSave() {    
      // alert("Saving" + this.state.cancerInfo[this.state.selectedId].age)
       this.setState({ show: false });
      }
    handleShow(id) {
        console.log("in handleShow"+  id )
        this.setState({ show: true });
        // this.setState({ showAddCancer: true });
        this.state.selectedId=id
        console.log("in handleShow selectedId ;"+  this.state.selectedId )
      }
    handleCloseAddCancer() {
        this.setState({ showAddCancer: false });
        // this.setState({ showAddCancer: false });
      }
    handleSaveAddCancer() {    
          // alert("Saving" + this.state.cancerInfo[this.state.selectedId].age)
          this.setState({ showAddCancer: false });
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
    setCurrentSource(){

    }
    render() {

      const {      
        values,
        errors,
        touched,
        isSubmitting
      
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
                      <select disabled={this.state.isAlive} className="form-control dorp-box" value={this.state.currentSourceOFDeath} onChange={this.setCurrentSource.bind(this)} name="currentDeathColumn">
                      {
                        
                        <option >{"Hospital Rec"}</option>
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
                    <Button onClick={this.handleSave}>Save</Button>

                  </Modal.Footer>
                </Modal>
                </div>

{/* Modal for Adding New Cancer - START*/}
                 <Form /* onSubmit={this.handleSubmit} */>

                <Modal backdrop={false}  dialogClassName="dialogclassname" show={this.state.showAddCancer} onHide={this.handleCloseAddCancer} keyboard={false} selectedid={this.state.selectedId}>
                  
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
                    <button  onClick={this.handleSubmit} disabled={isSubmitting}>Save</button>
                    {/* <Button onClick={this.handleSaveAddCancer}>Save</Button> */}

                  </Modal.Footer>
                </Modal>
                </Form>
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
    


    mapPropsToValues({email,ageOfDigColumn}) {
    
        return {
            email: email || '',
            // aodeathColumn:'fromDb',
            // currentaodeathColumn: "testin",
            ageOfDigColumn:'',
            vitalStatusColumn: 1,
        }
    },

    validationSchema: Yup.object().shape({
        email: Yup.string().email('Email not valid').required('Email is required'),
        ageOfDigColumn: Yup.string().required('value is required'),
        // password: Yup.string().min(9, 'Password must be 9 characters or longer').required('Password is required')
      }),

      handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
        console.log("SUBMIT")
        setTimeout(() => {
          if (values.email === 'andrew@test.io') {
            setErrors({ email: 'That email is already taken' })
          } else {
            resetForm()
          }
          setSubmitting(false)
        }, 2000)
      }  
})(CancerInfo) 



export default DialogFormikApp;

// TODo
// {/* <Form /* onSubmit={this.handleSubmit} */>