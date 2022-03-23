import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Modal, Button } from "react-bootstrap";
import Header from '../../Header';
import Menu from '../../Menu';
import { api_url } from '../ApiUrl';
import DesignerHeadTaskAllocationComponent from './DesignerHeadTaskAllocationComponent';
function Task() {
    //States
    const [employeeOption, setemployeeOption] = useState([]);
    //Dynamic Fields
    // const [formValues, setFormValues] = useState([{ description_status: [{
    //     description:"",
    //     status:""
    // }], role: "", employee: "" }])
    const [formValues, setFormValues] = useState([{
        description_status: [{
            description:"",
            status:""
        }
           
        ],
        role: "",
        employee: "",
        file:""
    }])
    const [formValues1,setFormValues1] = useState([{description:"",status:""}])
    
    let handleChange1 = (i, e) => {
        let newFormValues = [...formValues1];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues1(newFormValues);
        // console.log(formValues)
        // setFormValues([...formValues,newFormValues])
        console.log(i)
        //setWorkOrder({ ...workOrder, designer_head_description_status: newFormValues })
    }
    let addFormFields = () => {
        setFormValues([...formValues, { description_status:[], role: "", employee: "",file:"" }])
        console.log(formValues)
    }
    let addFormFields1 = () => {
        setFormValues1([...formValues1, { description: "", status: ""}])
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
    //Get employee Data


    const roleChange = (i, e) => {
        let newFormValues = [...formValues];
        
        newFormValues[i][e.target.name] = e.target.value;
        console.log(newFormValues[i][e.target.name])
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
        console.log(i)
        console.log(formValues)
    }
    const fileChange=(i,e)=>{
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues)
        console.log(i)
        console.log(formValues)
    }
    const onFormSubmit = (e) => {
        e.preventDefault();
        //setFormValues({...formValues.description_status,formValues1});
        //setFormValues({...formValues,description_status:formValues1})
        console.log(formValues1)
        
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
                                                <DesignerHeadTaskAllocationComponent formValues={formValues} setFormValues={setFormValues} element={element} index={index} roleChange={roleChange} employeeChange={employeeChange} formValues1={formValues1} handleChange1={handleChange1} removeFormFields={removeFormFields} addFormFields={addFormFields} employeeOption={employeeOption} fileChange={fileChange} />

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
