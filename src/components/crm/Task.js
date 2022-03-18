import React, { useState } from 'react'
import { Modal, Button } from "react-bootstrap";
import Header from '../../Header';
import Menu from '../../Menu';
function Task() {
    const [showModal, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const openModal = () => {
        handleShow();
    }
    const [formValues, setFormValues] = useState([{ name: "", email: "" }])
    const [formValues1, setFormValues1] = useState([{ description1: "", status1: "" }])
    const [formValues2, setFormValues2] = useState([{ description2: "", status2: "" }])
    const [formValues3, setFormValues3] = useState([{ description3: "", status3: "" }])
    const [formValues4, setFormValues4] = useState([{ description4: "", status4: "" }])
    const [inspectionParametersFormValues,setInspectionParametersFormValues] = useState([{parameter:"",result:""}])
    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
    }

    let handleChange1 = (i, e) => {
        let newFormValues1 = [...formValues1];
        newFormValues1[i][e.target.name] = e.target.value;
        setFormValues1(newFormValues1);
    }
    let handleChange2 = (i, e) => {
        let newFormValues2 = [...formValues2];
        newFormValues2[i][e.target.name] = e.target.value;
        setFormValues(newFormValues2);
    }
    let handleChange3 = (i, e) => {
        let newFormValues3 = [...formValues3];
        newFormValues3[i][e.target.name] = e.target.value;
        setFormValues(newFormValues3);
    }
    let handleChange4 = (i, e) => {
        let newFormValues4 = [...formValues4];
        newFormValues4[i][e.target.name] = e.target.value;
        setFormValues(newFormValues4);
    }
    let handleChangeInspectionParameters = (i, e) => {
        let newFormValues5 = [...inspectionParametersFormValues];
        newFormValues5[i][e.target.name] = e.target.value;
        setInspectionParametersFormValues(newFormValues5);
    }
    let addFormFields = () => {
        setFormValues([...formValues, { name: "", email: "" }])
    }
    let addFormFields1 = () => {
        setFormValues1([...formValues1, { description1: "", status1: "" }])
    }
    let addFormFields2 = () => {
        setFormValues2([...formValues2, { description2: "", status2: "" }])
    }
    let addFormFields3 = () => {
        setFormValues3([...formValues3, { description3: "", status3: "" }])
    }
    let addFormFields4 = () => {
        setFormValues4([...formValues4, { description4: "", status4: "" }])
    }
    let addFormFieldsInspectionParameters = () => {
        setInspectionParametersFormValues([...inspectionParametersFormValues, { parameter: "", result: "" }])
    }
    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }
    let removeFormFields1 = (i) => {
        let newFormValues1 = [...formValues1];
        newFormValues1.splice(i, 1);
        setFormValues1(newFormValues1)
    }
    let removeFormFields2 = (i) => {
        let newFormValues2 = [...formValues2];
        newFormValues2.splice(i, 1);
        setFormValues2(newFormValues2)
    }
    let removeFormFields3 = (i) => {
        let newFormValues3 = [...formValues3];
        newFormValues3.splice(i, 1);
        setFormValues3(newFormValues3)
    }
    let removeFormFields4 = (i) => {
        let newFormValues4 = [...formValues4];
        newFormValues4.splice(i, 1);
        setFormValues4(newFormValues4)
    }
    let removeFormFieldsInspectionParameters = (i) => {
        let newFormValues5 = [...inspectionParametersFormValues];
        newFormValues5.splice(i, 1);
        setInspectionParametersFormValues(newFormValues5)
    }
    return (
        <>
        <Header />
        <Menu />
        <div className='content-wrapper'>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Task View</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="card-body">
                            <div>
                            <h5>Designer Head</h5>
                            <p><strike>Task-1</strike></p>
                            <p><strike>Task-2</strike></p>
                            <p>Task-3</p>
                            <p>Task-4</p>
                            </div>
                            <div>
                            <h5>Designer</h5>
                            <p><strike>Task-1</strike></p>
                            <p><strike>Task-2</strike></p>
                            <p>Task-3</p>
                            <p>Task-4</p>
                            </div>
                            <div>
                            <h5>Programmer</h5>
                            <p><strike>Task-1</strike></p>
                            <p><strike>Task-2</strike></p>
                            <p>Task-3</p>
                            <p>Task-4</p>
                            </div>
                            <div>
                            <h5>Machine Operator</h5>
                            <p><strike>Task-1</strike></p>
                            <p><strike>Task-2</strike></p>
                            <p>Task-3</p>
                            <p>Task-4</p>
                            </div>
                            <div>
                            <h5>Transporter</h5>
                            <p><strike>Task-1</strike></p>
                            <p><strike>Task-2</strike></p>
                            <p>Task-3</p>
                            <p>Task-4</p>
                            </div>
                        </div>
                        <div class="card-footer">
                            
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <section class="content">
                <div className="container-fluid">
                    <div className="row">
                        {/* left column */}
                        <div className="col-md-12">
                            {/* general form elements */}
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h3 className="card-title">Task Creation</h3>
                                </div>
                                {/* /.card-header */}
                                {/* form start */}
                                <form>
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label >PO-Id</label>
                                            <select className='form-control'>
                                                <option>Select</option>
                                                <option>PO-1</option>
                                                <option>PO-2</option>
                                            </select>
                                        </div>
                                        <div class="card-body">
                                            <div class="card card-primary card-outline">
                                                <div class="card-header">
                                                    <label >Designer Head</label>
                                                    <select className='form-control'>
                                                        <option>Select</option>
                                                        <option>Yash</option>
                                                        <option>Ganesh</option>
                                                    </select>
                                                    {formValues.map((element, index) => (
                                                        <div className="form-group" key={index}>
                                                            <label>Description</label>
                                                            <input className="form-control" type="text" name="description" value={element.name || ""} onChange={e => handleChange(index, e)} />
                                                            <label>Status</label>
                                                            <input className="form-control" type="text" name="task" value={element.email || ""} onChange={e => handleChange(index, e)} />
                                                            {
                                                                index ?
                                                                    <button type="button" className="btn btn-danger" onClick={() => removeFormFields(index)}>Remove</button>
                                                                    : null
                                                            }
                                                        </div>
                                                    ))}
                                                    <div className="button-section">
                                                        <button className="btn btn-info" type="button" onClick={() => addFormFields()}>Add</button>

                                                    </div>
                                                    {/* <label >File Uploaded</label>
                                                    <img src="https://picsum.photos/200/35" alt="File" /> */}

                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-body">
                                            <div class="card card-primary card-outline">
                                                <div class="card-header">
                                                    <label >Designer</label>
                                                    <select className='form-control'>
                                                        <option>Select</option>
                                                        <option>Yash</option>
                                                        <option>Ganesh</option>
                                                    </select>
                                                    {formValues1.map((element, index) => (
                                                        <div className="form-group" key={index}>
                                                            <label>Description</label>
                                                            <input className="form-control" type="text" name="description1" value={element.description1 || ""} onChange={e => handleChange1(index, e)} />
                                                            <label>Status</label>
                                                            <input className="form-control" type="text" name="status1" value={element.status1 || ""} onChange={e => handleChange1(index, e)} />
                                                            {
                                                                index ?
                                                                    <button type="button" className="btn btn-danger" onClick={() => removeFormFields1(index)}>Remove</button>
                                                                    : null
                                                            }
                                                        </div>
                                                    ))}
                                                    <div className="button-section">
                                                        <button className="btn btn-info" type="button" onClick={() => addFormFields1()}>Add</button>

                                                    </div>
                                                    {/* <label >File Uploaded</label>
                                                    <img src="https://picsum.photos/200/35" alt="File" /> */}

                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-body">
                                            <div class="card card-primary card-outline">
                                                <div class="card-header">
                                                    <label >Programmer</label>
                                                    <select className='form-control'>
                                                        <option>Select</option>
                                                        <option>Yash</option>
                                                        <option>Ganesh</option>
                                                    </select>
                                                    {formValues2.map((element, index) => (
                                                        <div className="form-group" key={index}>
                                                            <label>Description</label>
                                                            <input className="form-control" type="text" name="description2" value={element.description2 || ""} onChange={e => handleChange2(index, e)} />
                                                            <label>Status</label>
                                                            <input className="form-control" type="text" name="status2" value={element.status2 || ""} onChange={e => handleChange2(index, e)} />
                                                            {
                                                                index ?
                                                                    <button type="button" className="btn btn-danger" onClick={() => removeFormFields2(index)}>Remove</button>
                                                                    : null
                                                            }
                                                        </div>
                                                    ))}
                                                    <div className="button-section">
                                                        <button className="btn btn-info" type="button" onClick={() => addFormFields2()}>Add</button>

                                                    </div>
                                                    {/* <label >File Uploaded</label>
                                                    <img src="https://picsum.photos/200/35" alt="File" /> */}

                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-body">
                                            <div class="card card-primary card-outline">
                                                <div class="card-header">
                                                    <label >Machine Operator</label>
                                                    <select className='form-control'>
                                                        <option>Select</option>
                                                        <option>Yash</option>
                                                        <option>Ganesh</option>
                                                    </select>
                                                    {formValues3.map((element, index) => (
                                                        <div className="form-group" key={index}>
                                                            <label>Description</label>
                                                            <input className="form-control" type="text" name="description3" value={element.description3 || ""} onChange={e => handleChange3(index, e)} />
                                                            <label>Status</label>
                                                            <input className="form-control" type="text" name="status3" value={element.status3 || ""} onChange={e => handleChange3(index, e)} />
                                                            {
                                                                index ?
                                                                    <button type="button" className="btn btn-danger" onClick={() => removeFormFields3(index)}>Remove</button>
                                                                    : null
                                                            }
                                                        </div>
                                                    ))}
                                                    <div className="button-section">
                                                        <button className="btn btn-info" type="button" onClick={() => addFormFields3()}>Add</button>

                                                    </div>
                                                    <hr />
                                                    {inspectionParametersFormValues.map((element, index) => (
                                                        <div className="form-group" key={index}>
                                                            <label>Parameter</label>
                                                            <input className="form-control" type="text" name="parameter" value={element.parameter || ""} onChange={e => handleChangeInspectionParameters(index, e)} />
                                                            <label>Result</label>
                                                            {/* <input className="form-control" type="text" name="result" value={element.result || ""} onChange={e => handleChangeInspectionParameters(index, e)} /> */}
                                                            <select  className="form-control" type="text" name="result" value={element.result || ""} onChange={e => handleChangeInspectionParameters(index, e)}>
                                                                <option>Select</option>
                                                                <option>Pass</option>
                                                                <option>Fail</option>
                                                            </select>
                                                            {
                                                                index ?
                                                                    <button type="button" className="btn btn-danger" onClick={() => removeFormFieldsInspectionParameters(index)}>Remove</button>
                                                                    : null
                                                            }
                                                        </div>
                                                    ))}
                                                    <div className="button-section">
                                                        <button className="btn btn-info" type="button" onClick={() => addFormFieldsInspectionParameters()}>Add</button>

                                                    </div>
                                                    {/* <label >File Uploaded</label>
                                                    <img src="https://picsum.photos/200/35" alt="File" /> */}

                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-body">
                                            <div class="card card-primary card-outline">
                                                <div class="card-header">
                                                    <label >Transporter</label>
                                                    <select className='form-control'>
                                                        <option>Select</option>
                                                        <option>Yash</option>
                                                        <option>Ganesh</option>
                                                    </select>
                                                    {formValues4.map((element, index) => (
                                                        <div className="form-group" key={index}>
                                                            <label>Description</label>
                                                            <input className="form-control" type="text" name="description4" value={element.description4 || ""} onChange={e => handleChange4(index, e)} />
                                                            <label>Status</label>
                                                            <input className="form-control" type="text" name="status4" value={element.status4 || ""} onChange={e => handleChange4(index, e)} />
                                                            {
                                                                index ?
                                                                    <button type="button" className="btn btn-danger" onClick={() => removeFormFields4(index)}>Remove</button>
                                                                    : null
                                                            }
                                                        </div>
                                                    ))}
                                                    <div className="button-section">
                                                        <button className="btn btn-info" type="button" onClick={() => addFormFields4()}>Add</button>

                                                    </div>
                                                    {/* <label >File Uploaded</label>
                                                    <img src="https://picsum.photos/200/35" alt="File" /> */}

                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="form-group">
                                            <label >Operation</label>
                                            <select className='form-control'>
                                                <option>Select</option>
                                                <option>Laser Cutting</option>
                                                <option>Bending</option>
                                                <option>Powder Coating</option>
                                                <option>Machining</option>
                                                <option>Grinding</option>
                                            </select>
                                        </div> */}
                                        {/* <div className="form-group">
                                            <label >Time Required</label>
                                            <input className="form-control" placeholder="Enter part material" />
                                        </div>
                                        <div className="form-group">
                                            <label >Process Status</label>
                                            <input className="form-control" placeholder="Enter part material" />
                                        </div> */}
                                    </div>
                                    {/* /.card-body */}
                                    <div className="card-footer">
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
            <section class="content">
                <div className="container-fluid">
                    <div className="row">
                        {/* left column */}
                        <div className="col-md-12">
                            <div class="card">
                                <div class="card-header">
                                    <h3 class="card-title">Task Allocation</h3>
                                </div>
                                <div class="card-body">
                                    <table id="example1" class="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th>WO Id</th>
                                                <th>Emnployee Name</th>
                                                <th>Operation</th>
                                                <th>Time Required</th>
                                                <th>Process Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>WO-1</td>
                                                <td>Yash</td>
                                                <td>Designing</td>
                                                <td>4</td>
                                                <td><p><small class="badge badge-info"><i class="fas fa-clock"></i>Issued</small></p></td>
                                                <td><i onClick={openModal} className="fas fa-eye fa-fw" />
                                                    <i className="fas fa-edit fa-fw" />
                                                    <i className="fas fa-trash fa-fw" /></td>
                                            </tr>
                                        </tbody>

                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
        </>
        
    )
}

export default Task;

