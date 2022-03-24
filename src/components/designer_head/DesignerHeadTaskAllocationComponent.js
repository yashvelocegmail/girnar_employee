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
    const [formValues2, setFormValues2] = useState(
        [{
            parameter: "",
            result: ""
        }]
    )
    let addFormFields1 = () => {
        setFormValues1([...formValues1, { description: "", status: "" }])
    }
    let removeFormFields1 = (i) => {
        console.log(i)
        let newFormValues = [...formValues1];
        console.log(formValues1,i)
        //console.log(newFormValues1.splice(i, 1))
        newFormValues.splice(i, 1);
        setFormValues1(newFormValues)
        console.log(newFormValues)
    }
    let addFormFields2 = () => {
        setFormValues2([...formValues2, { parameter: "", result: "" }])
    }
    let removeFormFields2 = (i) => {
        let newFormValues2 = [...formValues2];
        newFormValues2.splice(i, 1);
        setFormValues2(newFormValues2)
    }
    const onChangeDescriptionStatus = (e, i) => {
        const newformvalues = [...formValues1]
        newformvalues[i][e.target.name] = e.target.value;
        setFormValues1(newformvalues)
        let formValues=props.formValues
        formValues[props.index].description_status=newformvalues
        props.setFormValues(formValues)
        console.log(formValues1)
    }
    const onChangeParameterResult=(e,i)=>{
        const newformvalues = [...formValues2]
        newformvalues[i][e.target.name] = e.target.value;
        setFormValues2(newformvalues)
        let formValues=props.formValues
        formValues[props.index].parameter_result=newformvalues
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
                        <option key="1" value={ "designer_head"}>Designer Head</option>
                        <option key="2" value={ "designer"}>Designer</option>
                        <option key="3" value={ "programmer"}>Programmer</option>
                        <option key="4" value={ "machine_operator"}>Machine Operator</option>
                        <option key="5" value={ "transporter"}>Transporter</option>
                    </select>
                    <div className="form-group">
                        <label>Employee name</label>
                        {/* {props.employeeOption[props.index]===undefined?[]:props.employeeOption[props.index].data.map((employee)=>(
                                                                    <p>{employee.id}</p>
                                                                ))} */}
                        <select onChange={(e) => props.employeeChange(props.index, e)} className='form-control' name="employee">

                            <option>Select</option>
                            {props.employeeOption[props.index] === undefined ? [] : props.employeeOption[props.index].data.map((employee) => (
                                <option defaultValue={employee.id || props.element.employee}>{employee.name}</option>
                            ))}
                        </select>
                    </div>
                    {formValues1.map((element1, index1) => (
                        <div className="form-group" key={index1}>
                            <label>Description</label>
                            <input className="form-control" type="text" name="description"
                                // value={element1.description || ""} 
                                value={props.element.description || element1.description||""}
                                onChange={e => onChangeDescriptionStatus(e, index1)} />
                            <label>Status</label>
                            {/* <input className="form-control" type="text" name="status" value={props.element.status || ""} onChange={e => handleChange(props.index, e)} /> */}
                            <select className="form-control" type="text" name="status" value={props.element.status ||  element1.status ||""} onChange={e => onChangeDescriptionStatus(e, index1)} >
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
                    {props.machineOperatorValues===false?[]:props.machineOperatorIndex!==props.index?[]:formValues2.map((element2, index2) => (
                        <>
                        <div className="form-group" key={index2}>
                            <label>Parameter</label>
                            <input className="form-control" type="text" name="parameter"
                                // value={element1.description || ""} 
                                defaultValue={props.element.parameter || element2.parameter||""}
                                onChange={e => onChangeParameterResult(e, index2)} />
                            <label>Result</label>
                            {/* <input className="form-control" type="text" name="status" value={props.element.status || ""} onChange={e => handleChange(props.index, e)} /> */}
                            <select className="form-control" type="text" name="result" defaultValue={props.element.result ||  element2.result ||""} onChange={e => onChangeParameterResult(e, index2)} >
                                <option>Select</option>
                                <option value="fail">Fail</option>
                                <option value="pass">Pass</option>
                            </select>
                            {
                                index2 ?
                                    <button type="button" className="btn btn-danger" onClick={() => removeFormFields2(index2)}>Remove</button>
                                    : null
                            }
                            <br />
                        </div>
                        <div className="button-section">
                        <button className="btn btn-info" type="button" onClick={() => addFormFields2()}>Add</button>

                    </div></>
                        
                    ))}
                    


                    <label >File Upload</label>
                    <input type="file" name="file" onChange={(e) => props.fileChange(props.index, e)} />

                </div>
            </div>
            {
                props.index ?
                    <button type="button" className="btn btn-danger" onClick={() => props.removeFormFields(props.index)}>Remove</button>

                    : null
            }<br/>
            <div className="button-section">
                <button className="btn btn-info" type="button" onClick={() => props.addFormFields()}>Add</button>

            </div>
        </div>
    )
}

export default DesignerHeadTaskAllocationComponent