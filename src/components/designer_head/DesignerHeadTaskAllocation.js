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
    const [purchaseOrderOption,setPurchaseOrderOption] = useState();
    //Dynamic Fields
    // const [formValues, setFormValues] = useState([{ description_status: [{
    //     description:"",
    //     status:""
    // }], role: "", employee: "" }])
    const [roleArray,setRoleArray]=useState([
        {
            key:1,
            value:"designer_head",
            name:"Designer Head",
            disabled:false
        },
        {
            key:2,
            value:"designer",
            name:"Designer",
            disabled:false
        },
        {
            key:3,
            value:"programmer",
            name:"Programmer",
            disabled:false
        },
        {
            key:4,
            value:"machine_operator",
            name:"Machine Operator",
            disabled:false
        },
        {
            key:5,
            value:"transporter",
            name:"Transporter",
            disabled:false
        }
    ])
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
        file: "",
        po:""
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
        console.log(formValues[i].role)
        // setRoleArray(
        //     roleArray.map((role) => {
        //       if (role.value === formValues[i].role) {
        //         return { ...role, disabled:false };
        //       } else {
        //         return role;
        //       }
        //     })   
        // )
        console.log(roleArray)
    }
    // let removeFormFields1 = (i) => {
    //     let newFormValues1 = [...formValues1];
    //     newFormValues1.splice(i, 1);
    //     setFormValues1(newFormValues1)
    // }
    //Get employee Data
    const [purchaseOrder, setPurchaseOrder] = useState();
    useEffect(() => {
        axios.get(api_url + "read_purchase_order_crm.php")
            .then((res) => {
                setPurchaseOrder(res.data)
            })
    },[])

    const roleChange = (i, e) => {
        //Disabling values
        // setRoleArray(
        //     roleArray.map((role) => {
        //       if (role.value === e.target.value) {
        //           if(role.disabled===true)
        //           {
        //             return {...role,disabled:false };
        //           }
        //           else
        //           {
        //             return {...role,disabled:true };
        //           }

        //       }
        //       else {
        //         return role;
        //       }
        //     })
        // )
        let newFormValues = [...formValues];

        newFormValues[i][e.target.name] = e.target.value;

        if (newFormValues[i][e.target.name] === "machine_operator") {
            setMachineOperatorValues(true);
            setMachineOperatorIndex(i)
        }
        else {
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
        console.log(e.target.value)
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues)
        console.log(i)
        console.log(formValues)
    }
    const poChange = (e) => {
        localStorage.setItem("po",e.target.value)
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
        console.log(localStorage.getItem('po'))
        formValues.map((formdata) => {
            const formData = new FormData();
            formData.append('role', formdata.role);
            formData.append('po', localStorage.getItem('po'));
            formData.append('parameter_result', JSON.stringify(formdata.parameter_result));
            formData.append('file', formdata.file);
            formData.append('employee', formdata.employee);
            formData.append('description_status', JSON.stringify(formdata.description_status));

            console.log(formData)
            const config = {
                headers: { 'content-type': 'application/json' }
            }
            axios.post(api_url + "create_work_order.php", formData, config)
                .then(() => {
    
                })
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
                                                <select onChange={poChange} name="po" className='form-control'>
                                                    <option>Select</option>
                                                    {purchaseOrder === undefined ? [] : purchaseOrder.data.map((purchaseorder) => (
                                                        <option key={purchaseorder.id} value={purchaseorder.id}>{purchaseorder.purchase_order}</option>
                                                    ))}
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
