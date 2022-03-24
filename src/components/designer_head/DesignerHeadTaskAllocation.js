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
    const [machineOperatorValues, setMachineOperatorValues] = useState(false);
    const [machineOperatorIndex, setMachineOperatorIndex] = useState(false);
    //Dynamic Fields
    // const [formValues, setFormValues] = useState([{ description_status: [{
    //     description:"",
    //     status:""
    // }], role: "", employee: "" }])
    const [formValues, setFormValues] = useState([{
        description_status: [{
            description: "",
            status: ""
        }],
        parameter_result: [{
            parameter: "",
            result: ""
        }],
        role: "",
        employee: "",
        file: ""
    }])
    const [formValues1, setFormValues1] = useState([{ description: "", status: "" }])

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
        setFormValues([...formValues, { description_status: [], role: "", employee: "", file: "" }])
        console.log(formValues)
    }
    // let addFormFields1 = () => {
    //     setFormValues1([...formValues1, { description: "", status: "" }])
    // }
    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }
    // let removeFormFields1 = (i) => {
    //     let newFormValues1 = [...formValues1];
    //     newFormValues1.splice(i, 1);
    //     setFormValues1(newFormValues1)
    // }
    //Get employee Data


    const roleChange = (i, e) => {
        let newFormValues = [...formValues];

        newFormValues[i][e.target.name] = e.target.value;

        if (newFormValues[i][e.target.name] === "machine_operator") 
        {
            setMachineOperatorValues(true);
            setMachineOperatorIndex(i)
        }
        else 
        {
            setMachineOperatorValues(true);
        }
        setFormValues(newFormValues)
        console.log("Role", newFormValues[i][e.target.name])
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
    const fileChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.files[0];
        setFormValues(newFormValues)
        console.log(i)
        console.log(formValues)
    }
    const onFormSubmit = (e) => {
        e.preventDefault();
        //console.log(formValues)
        let items=[]
        formValues.map((formdata) => {
            const formData = new FormData();
            formData.append('role', formdata.role);
            formData.append('parameter_result', JSON.stringify(formdata.parameter_result));
            formData.append('file', formdata.file);
            formData.append('employee', formdata.employee);
            formData.append('description_status', JSON.stringify(formdata.description_status));
            
            items.push(formdata)
            
        })
        console.log(items)
        const config = {
            headers: { 'content-type': 'application/json' }
        }
        axios.post(api_url + "create_work_order.php", items, config)
            .then(() => {

            })
        
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
                                                <DesignerHeadTaskAllocationComponent formValues={formValues} setFormValues={setFormValues} element={element} index={index} roleChange={roleChange} employeeChange={employeeChange} formValues1={formValues1} handleChange1={handleChange1} removeFormFields={removeFormFields} addFormFields={addFormFields} employeeOption={employeeOption} fileChange={fileChange} machineOperatorValues={machineOperatorValues} machineOperatorIndex={machineOperatorIndex} />

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
