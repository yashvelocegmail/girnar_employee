import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Modal, Button } from "react-bootstrap";
import Header from '../../Header';
import Menu from '../../Menu';
import { api_url } from '../ApiUrl';
function Task() {
    //States
    const [employeeOption, setemployeeOption] = useState([]);
    //Dynamic Fields
    const [formValues, setFormValues] = useState([{ description: "", status: "", role: "", employee: "" }])

    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        console.log(e.target.name)
        if (e.target.name === "role") {
            axios.post(api_url + "read_employee_by_position.php", { position: e.target.value })
                .then((res) => {
                    console.log(res.data)
                    //setemployeeOption(res.data);


                })
        }
        console.log(formValues)
        setFormValues(newFormValues);
    }
    let addFormFields = () => {
        setFormValues([...formValues, { description: "", status: "", role: "", employee: "" }])
    }
    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }
    //Get employee Data


    const roleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues)
        axios.post(api_url + "read_employee_by_position.php", { position: newFormValues[i][e.target.name] })
            .then((res) => {
                let employeeValues = [...employeeOption];
                employeeValues[i] = res.data;
                console.log(employeeOption)
                setemployeeOption(employeeValues);
            })
    }
    const employeeChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues)
        console.log(newFormValues)
    }
    const onFormSubmit = (e) => {
        e.preventDefault();
        console.log(formValues)
    }
    return (
        <>
            <Header />
            <Menu />
            <div className='content-wrapper'>
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
                                    <form onSubmit={onFormSubmit}>
                                        <div className="card-body">
                                            <div className="form-group">
                                                <label >PO-Id</label>
                                                <select className='form-control'>
                                                    <option>Select</option>
                                                    <option>PO-1</option>
                                                    <option>PO-2</option>
                                                </select>
                                            </div>
                                            {formValues.map((element, index) => (
                                                <div class="card-body">
                                                    <div class="card card-primary card-outline">
                                                        <div class="card-header">
                                                            <label>Select Role</label>
                                                            <select className="form-control" type="text" name="role" onChange={e => roleChange(index, e)}>
                                                                <option>Select</option>
                                                                <option value={element.role || "designer_head"}>Designer Head</option>
                                                                <option value={element.role || "designer"}>Designer</option>
                                                                <option value={element.role || "programmer"}>Programmer</option>
                                                                <option value={element.role || "machine_operator"}>Machine Operator</option>
                                                                <option value={element.role || "transporter"}>Transporter</option>
                                                            </select>
                                                            <div className="form-group">
                                                                <label>Employee name</label>
                                                                {/* {employeeOption[index]===undefined?[]:employeeOption[index].data.map((employee)=>(
                                                                    <p>{employee.id}</p>
                                                                ))} */}
                                                                <select onChange={e => employeeChange(index, e)} className='form-control' name="employee">

                                                                    <option>Select</option>
                                                                    {employeeOption[index] === undefined ? [] : employeeOption[index].data.map((employee) => (
                                                                        <option value={employee.id || element.employee}>{employee.name}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <div className="form-group" key={index}>
                                                                <label>Description</label>
                                                                <input className="form-control" type="text" name="description" value={element.description || ""} onChange={e => handleChange(index, e)} />
                                                                <label>Status</label>
                                                                <input className="form-control" type="text" name="status" value={element.status || ""} onChange={e => handleChange(index, e)} />

                                                            </div>


                                                            <label >File Uploaded</label>
                                                            <img src="https://picsum.photos/200/35" alt="File" />

                                                        </div>
                                                    </div>
                                                    {
                                                        index ?
                                                            <button type="button" className="btn btn-danger" onClick={() => removeFormFields(index)}>Remove</button>
                                                            : null
                                                    }
                                                    <div className="button-section">
                                                        <button className="btn btn-info" type="button" onClick={() => addFormFields()}>Add</button>

                                                    </div>
                                                </div>

                                            ))}
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
            </div>
        </>

    )
}

export default Task;
