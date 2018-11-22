
import React from 'react';
import {Button, DropdownButton, MenuItem, Modal,  OverlayTrigger, Tooltip} from 'react-bootstrap';
import DatePicker from 'react-date-picker';


export default class CancerInfo extends React.Component {

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
        
        

          selectedId:''
        }
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSave = this.handleSave.bind(this);    
        this.handleTxtChange = this.handleTxtChange.bind(this);
        this.setCurrentSource = this.setCurrentSource.bind(this);
      }

    componentDidMount(){
       
        
            // const urlProfession = properties.baseUrl + "practitionerscore/" ;
            // fetch saved practitioner rec id
            console.log("SEL this.jsonId%%%%%%%%%%%%%%%%%%% : " + this.state.jsonId)
            const urlProfession = "http://localhost:8090/ProneSpringBoot/api/practitioners/";
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
      }
    handleSave() {    
      alert("Saving" + this.state.cancerInfo[this.state.selectedId].age)
       this.setState({ show: false });
      }
    handleShow(id) {
        console.log("in handleShow"+  id )
        this.setState({ show: true });
        this.state.selectedId=id
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

                <Modal show={this.state.show} onHide={this.handleClose} keyboard={false} selectedid={this.state.selectedId}>
                  
                  <Modal.Header closeButton>
                    <Modal.Title>Cancer Edit</Modal.Title>
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
                    <h4>Text in a modal</h4>
                    <p>
                      Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </p>

                    <h4>Tooltips in a modal</h4>
                  

                    <hr />

                    
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={this.handleClose}>Close</Button>
                    <Button onClick={this.handleSave}>Save</Button>

                  </Modal.Footer>
                </Modal>

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
