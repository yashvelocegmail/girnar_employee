import React, { useState } from 'react'

function DesignerHeadTaskAllocationComponent(props) {
    const [formValues, setFormValues] = useState({
        description_status: [
            {
                description: "",
                status: ""
            }
        ],
        role: "",
        employee: ""
    })

    const [formValues1, setFormValues1] = useState(
        [{
            description: "",
            status: ""
        }]
    )
    let addFormFields1 = () => {
        setFormValues1([...formValues1, { description: "", status: "" }])
    }
    let removeFormFields1 = (i) => {
        let newFormValues1 = [...formValues1];
        newFormValues1.splice(i, 1);
        setFormValues1(newFormValues1)
    }
    const onChangeDescriptionStatus = (e, i) => {
        const newformvalues = [...formValues1]
        newformvalues[i][e.target.name] = e.target.value;
        setFormValues1(newformvalues)
        let formValues=props.formValues
        formValues[props.index].description_status=newformvalues
        props.setFormValues(formValues)
        console.log(formValues)
    }
    return (
        <div class="card-body">
            <div class="card card-primary card-outline">
                <div class="card-header">
                    <label>Select Role</label>
                    <select className="form-control" type="text" name="role" onChange={(e) => props.roleChange(props.index, e)}>
                        <option>Select</option>
                        <option value={props.element.role || "designer_head"}>Designer Head</option>
                        <option value={props.element.role || "designer"}>Designer</option>
                        <option value={props.element.role || "programmer"}>Programmer</option>
                        <option value={props.element.role || "machine_operator"}>Machine Operator</option>
                        <option value={props.element.role || "transporter"}>Transporter</option>
                    </select>
                    <div className="form-group">
                        <label>Employee name</label>
                        {/* {props.employeeOption[props.index]===undefined?[]:props.employeeOption[props.index].data.map((employee)=>(
                                                                    <p>{employee.id}</p>
                                                                ))} */}
                        <select onChange={(e) => props.employeeChange(props.index, e)} className='form-control' name="employee">

                            <option>Select</option>
                            {props.employeeOption[props.index] === undefined ? [] : props.employeeOption[props.index].data.map((employee) => (
                                <option value={employee.id || props.element.employee}>{employee.name}</option>
                            ))}
                        </select>
                    </div>
                    {formValues1.map((element1, index1) => (
                        <div className="form-group" key={index1}>
                            <label>Description</label>
                            <input className="form-control" type="text" name="description"
                                // value={element1.description || ""} 
                                defaultValue={props.element.description || element1.description||""}
                                onChange={e => onChangeDescriptionStatus(e, index1)} />
                            <label>Status</label>
                            {/* <input className="form-control" type="text" name="status" value={props.element.status || ""} onChange={e => handleChange(props.index, e)} /> */}
                            <select className="form-control" type="text" name="status" defaultValue={props.element.status ||  element1.status ||""} onChange={e => onChangeDescriptionStatus(e, index1)} >
                                <option>Select</option>
                                <option value="assigned">Assigned</option>
                                <option value="completed">Completed</option>
                            </select>
                            {
                                index1 ?
                                    <button type="button" className="btn btn-danger" onClick={() => removeFormFields1(index1)}>Remove</button>
                                    : null
                            }
                        </div>
                    ))}
                    <div className="button-section">
                        <button className="btn btn-info" type="button" onClick={() => addFormFields1()}>Add</button>

                    </div>


                    <label >File Upload</label>
                    <input type="file" name="file" onChange={(e) => props.fileChange(props.index, e)} />

                </div>
            </div>
            {
                props.index ?
                    <button type="button" className="btn btn-danger" onClick={() => props.removeFormFields(props.index)}>Remove</button>

                    : null
            }
            <div className="button-section">
                <button className="btn btn-info" type="button" onClick={() => props.addFormFields()}>Add</button>

            </div>
        </div>
    )
}

export default DesignerHeadTaskAllocationComponent