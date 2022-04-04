import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Header from '../../Header';
import Menu from '../../Menu';
import { api_url } from '../ApiUrl';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Modal, Button } from "react-bootstrap";


function DesignerProduction() {
    const [showModal, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const openModal = () => {
        handleShow();
    }
    //Form Values
    const [editFormValues, setEditFormValues] = useState([{ description: "", status: "" }])
    const [editFormValues1, setEditFormValues1] = useState([{ description1: "", status1: "" }])
    const [editFormValues2, setEditFormValues2] = useState([{ description2: "", status2: "" }])
    const [editFormValues3, setEditFormValues3] = useState([{ description3: "", status3: "" }])
    const [editFormValues4, setEditFormValues4] = useState([{ description4: "", status4: "" }])
    const [editInspectionParametersFormValues, setEditInspectionParametersFormValues] = useState([{ parameter: "", result: "" }])
    let editHandleChange = (i, e) => {
        let newFormValues = [...editFormValues];
        newFormValues[i][e.target.name] = e.target.value;
        setEditFormValues(newFormValues);
        setEditWorkOrder({ ...editWorkOrder, designer_head_description_status: newFormValues })
    }

    let editHandleChange1 = (i, e) => {
        let newFormValues1 = [...editFormValues1];
        newFormValues1[i][e.target.name] = e.target.value;
        setEditFormValues1(newFormValues1);
        setEditWorkOrder({ ...editWorkOrder, designer_description_status: newFormValues1 })
    }
    let editHandleChange2 = (i, e) => {
        let newFormValues2 = [...editFormValues2];
        newFormValues2[i][e.target.name] = e.target.value;
        setEditFormValues(newFormValues2);
        setEditWorkOrder({ ...editWorkOrder, programmer_description_status: newFormValues2 })
    }
    let editHandleChange3 = (i, e) => {
        let newFormValues3 = [...editFormValues3];
        newFormValues3[i][e.target.name] = e.target.value;
        setEditFormValues(newFormValues3);
        setEditWorkOrder({ ...editWorkOrder, machine_operator_description_status: newFormValues3 })
    }
    let editHandleChange4 = (i, e) => {
        let newFormValues4 = [...editFormValues4];
        newFormValues4[i][e.target.name] = e.target.value;
        setEditFormValues(newFormValues4);
        setEditWorkOrder({ ...editWorkOrder, transporter_description_status: newFormValues4 })
    }
    let editHandleChangeInspectionParameters = (i, e) => {
        let newFormValues5 = [...editInspectionParametersFormValues];
        newFormValues5[i][e.target.name] = e.target.value;
        setEditInspectionParametersFormValues(newFormValues5);
        setEditWorkOrder({ ...editWorkOrder, machine_operator_parameter: newFormValues5 })
    }
    let addEditFormFields = () => {
        setEditFormValues([...editFormValues, { description: "", status: "" }])
    }
    let addEditFormFields1 = () => {
        setEditFormValues1([...editFormValues1, { description1: "", status1: "" }])
    }
    let addEditFormFields2 = () => {
        setEditFormValues2([...editFormValues2, { description2: "", status2: "" }])
    }
    let addEditFormFields3 = () => {
        setEditFormValues3([...editFormValues3, { description3: "", status3: "" }])
    }
    let addEditFormFields4 = () => {
        setEditFormValues4([...editFormValues4, { description4: "", status4: "" }])
    }
    let addEditFormFieldsInspectionParameters = () => {
        setEditInspectionParametersFormValues([...editInspectionParametersFormValues, { parameter: "", result: "" }])
    }
    let removeEditFormFields = (i) => {
        let newFormValues = [...editFormValues];
        newFormValues.splice(i, 1);
        setEditFormValues(newFormValues)
        setEditWorkOrder({ ...editWorkOrder, designer_head_description_status: newFormValues })
    }
    let removeEditFormFields1 = (i) => {
        let newFormValues1 = [...editFormValues1];
        newFormValues1.splice(i, 1);
        setEditFormValues1(newFormValues1)
        setEditWorkOrder({ ...editWorkOrder, designer_description_status: newFormValues1 })
    }
    let removeEditFormFields2 = (i) => {
        let newFormValues2 = [...editFormValues2];
        newFormValues2.splice(i, 1);
        setEditFormValues2(newFormValues2)
        setEditWorkOrder({ ...editWorkOrder, programmer_description_status: newFormValues2 })
    }
    let removeEditFormFields3 = (i) => {
        let newFormValues3 = [...editFormValues3];
        newFormValues3.splice(i, 1);
        setEditFormValues3(newFormValues3)
        setEditWorkOrder({ ...editWorkOrder, machine_operator_description_status: newFormValues3 })
    }
    let removeEditFormFields4 = (i) => {
        let newFormValues4 = [...editFormValues4];
        newFormValues4.splice(i, 1);
        setEditFormValues4(newFormValues4)
        setEditWorkOrder({ ...editWorkOrder, transporter_description_status: newFormValues4 })
    }
    let removeEditFormFieldsInspectionParameters = (i) => {
        let newFormValues5 = [...editInspectionParametersFormValues];
        newFormValues5.splice(i, 1);
        setEditInspectionParametersFormValues(newFormValues5)
        setEditWorkOrder({ ...editWorkOrder, machine_operator_parameter: newFormValues5 })
    }
    //Form values
    const [showModal1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);

    //Get data for options table
    const [purchaseOrder, setPurchaseOrder] = useState();
    const [designerHead, setDesignerHead] = useState();
    const [designer, setDesigner] = useState();
    const [programmer, setProgrammer] = useState();
    const [machineOperator, setMachineOPerator] = useState();
    const [transporter, setTransporter] = useState();
    useEffect(() => {
        axios.get(api_url + "read_purchase_order_crm.php")
            .then((res) => {
                setPurchaseOrder(res.data)
            })
        axios.post(api_url + "read_employee_by_position.php", { position: "designer_head" })
            .then((res) => {
                setDesignerHead(res.data);
            })
        axios.post(api_url + "read_employee_by_position.php", { position: "designer" })
            .then((res) => {
                setDesigner(res.data);
            })
        axios.post(api_url + "read_employee_by_position.php", { position: "programmer" })
            .then((res) => {
                setProgrammer(res.data);
            })
        axios.post(api_url + "read_employee_by_position.php", { position: "machine_operator" })
            .then((res) => {
                setMachineOPerator(res.data);
            })
        axios.post(api_url + "read_employee_by_position.php", { position: "transporter" })
            .then((res) => {
                setTransporter(res.data);
            })
    }, [])


    //States
    const [readWorkOrder, setReadWorkOrder] = useState({
        id: "",
        work_order: "",
        purchase_order: "",
        designer_head: "",
        designer_head_name: "",
        designer_head_description_status: [{}],
        designer_head_approval_by_crm_operator: "",
        designer_head_approval_by_super_admin: "",
        designer_head_file: "",
        designer: "",
        designer_name: "",
        designer_description_status: [],
        designer_approval_by_designer_head: "",
        designer_file: "",
        programmer: "",
        rogrammer_name: "",
        programmer_description_status: [],
        programmer_approval_by_designer: "",
        programmer_approval_by_designer_head: "",
        programmer_file: "",
        machine_operator: "",
        machine_operator_name: "",
        machine_operator_description_status: "",
        machine_operator_approval_by_designer: "",
        machine_operator_file: "",
        machine_operator_parameter: "",
        transporter: "",
        transporter_name: "",
        transporter_description_status: "",
        transporter_approval_by_crm_operator: "",
        transporter_file: "",
    })
    const [singleWorkOrder, setSingleWorkOrder] = useState({
        id: "",
        work_order: "",
        purchase_order: "",
        designer_head: "",
        designer_head_name: "",
        designer_head_description_status: [{}],
        designer_head_approval_by_crm_operator: "",
        designer_head_approval_by_super_admin: "",
        designer_head_file: "",
        designer: "",
        designer_name: "",
        designer_description_status: [],
        designer_approval_by_designer_head: "",
        designer_file: "",
        programmer: "",
        rogrammer_name: "",
        programmer_description_status: [],
        programmer_approval_by_designer: "",
        programmer_approval_by_designer_head: "",
        programmer_file: "",
        machine_operator: "",
        machine_operator_name: "",
        machine_operator_description_status: "",
        machine_operator_approval_by_designer: "",
        machine_operator_file: "",
        machine_operator_parameter: "",
        transporter: "",
        transporter_name: "",
        transporter_description_status: "",
        transporter_approval_by_crm_operator: "",
        transporter_file: "",
    })
    const [editWorkOrder, setEditWorkOrder] = useState({
        id: "",
        work_order: "",
        purchase_order: "",
        designer_head: "",
        designer_head_name: "",
        designer_head_description_status: [],
        designer_head_approval_by_crm_operator: "",
        designer_head_approval_by_super_admin: "",
        designer_head_file: "",
        designer: "",
        designer_name: "",
        designer_description_status: [],
        designer_approval_by_designer_head: "",
        designer_file: "",
        programmer: "",
        rogrammer_name: "",
        programmer_description_status: [],
        programmer_approval_by_designer: "",
        programmer_approval_by_designer_head: "",
        programmer_file: "",
        machine_operator: "",
        machine_operator_name: "",
        machine_operator_description_status: "",
        machine_operator_approval_by_designer: "",
        machine_operator_file: "",
        machine_operator_parameter: "",
        transporter: "",
        transporter_name: "",
        transporter_description_status: "",
        transporter_approval_by_crm_operator: "",
        transporter_file: "",
    })
    //Read
    const [readFormValues, setReadFormValues] = useState([{ description: "", status: "" }])
    const [readFormValues1, setReadFormValues1] = useState([{ description1: "", status1: "" }])
    const [readFormValues2, setReadFormValues2] = useState([{ description2: "", status2: "" }])
    const [readFormValues3, setReadFormValues3] = useState([{ description3: "", status3: "" }])
    const [readFormValues4, setReadFormValues4] = useState([{ description4: "", status4: "" }])
    const [readInspectionParametersFormValues, setReadInspectionParametersFormValues] = useState([{ parameter: "", result: "" }])
    const onRead = (row) => {
        handleShow1();
        setSingleWorkOrder({
            id: row.id,
            work_order: row.work_order,
            purchase_order: row.purchase_order,
            designer_head: row.designer_head,
            designer_head_description_status: JSON.parse(row.designer_head_description_status.slice(1, -1)),
            designer_head_file: row.designer_head_file,
            designer: row.designer,
            designer_description_status: JSON.parse(row.designer_description_status.slice(1, -1)),
            designer_file: row.designer_file,
            programmer: row.programmer,
            programmer_description_status: JSON.parse(row.programmer_description_status.slice(1, -1)),
            programmer_file: row.programmer_file,
            machine_operator: row.machine_operator,
            machine_operator_description_status: JSON.parse(row.machine_operator_description_status.slice(1, -1)),
            machine_operator_parameter: JSON.parse(row.machine_operator_parameter.slice(1, -1)),
            machine_operator_file: row.machine_operator_file,
            transporter: row.transporter,
            transporter_description_status: JSON.parse(row.transporter_description_status.slice(1, -1)),
            transporter_file: row.transporter_file

        })
        setReadFormValues(JSON.parse(row.designer_head_description_status.slice(1, -1)))
        setReadFormValues1(JSON.parse(row.designer_description_status.slice(1, -1)))
        setReadFormValues2(JSON.parse(row.programmer_description_status.slice(1, -1)))
        setReadFormValues3(JSON.parse(row.machine_operator_description_status.slice(1, -1)))
        setReadInspectionParametersFormValues(JSON.parse(row.machine_operator_parameter.slice(1, -1)))
        setReadFormValues4(JSON.parse(row.transporter_description_status.slice(1, -1)))

        console.log(singleWorkOrder)
    }
    //Edit Data
    const onEdit = (row) => {
        handleShow();
        console.log("--------------", JSON.parse(row.designer_head_description_status.slice(1, -1)))
        setEditWorkOrder({
            id: row.id,
            work_order: row.work_order,
            purchase_order: row.purchase_order,
            designer_head: row.designer_head,
            designer_head_description_status: JSON.parse(row.designer_head_description_status.slice(1, -1)),
            designer_head_file: row.designer_head_file,
            designer: row.designer,
            designer_description_status: JSON.parse(row.designer_description_status.slice(1, -1)),
            designer_file: row.designer_file,
            programmer: row.programmer,
            programmer_description_status: JSON.parse(row.programmer_description_status.slice(1, -1)),
            programmer_file: row.programmer_file,
            machine_operator: row.machine_operator,
            machine_operator_description_status: JSON.parse(row.machine_operator_description_status.slice(1, -1)),
            machine_operator_parameter: JSON.parse(row.machine_operator_parameter.slice(1, -1)),
            machine_operator_file: row.machine_operator_file,
            transporter: row.transporter,
            transporter_description_status: JSON.parse(row.transporter_description_status.slice(1, -1)),
            transporter_file: row.transporter_file

        })
        setEditFormValues(JSON.parse(row.designer_head_description_status.slice(1, -1)))
        setEditFormValues1(JSON.parse(row.designer_description_status.slice(1, -1)))
        setEditFormValues2(JSON.parse(row.programmer_description_status.slice(1, -1)))
        setEditFormValues3(JSON.parse(row.machine_operator_description_status.slice(1, -1)))
        setEditInspectionParametersFormValues(JSON.parse(row.machine_operator_parameter.slice(1, -1)))
        setEditFormValues4(JSON.parse(row.transporter_description_status.slice(1, -1)))
        console.log(editFormValues)
    }
    const onEditPurchaseOrderChange = (e) => {
        setEditWorkOrder({ ...editWorkOrder, purchase_order: e.target.value })
    }
    const onEditDesignerHeadChange = (e) => {
        setEditWorkOrder({ ...editWorkOrder, designer_head: e.target.value })
    }
    const onEditDesignerChange = (e) => {
        setEditWorkOrder({ ...editWorkOrder, designer: e.target.value })
    }
    const onEditDesignerFileChange=(e)=>{
        setEditWorkOrder({...editWorkOrder,designer_file:e.target.files[0]})
    }
    const onEditProgrammerChange = (e) => {
        setEditWorkOrder({ ...editWorkOrder, programmer: e.target.value })
    }
    const onEditMachineOperatorChange = (e) => {
        setEditWorkOrder({ ...editWorkOrder, machine_operator: e.target.value })
    }
    const onEditTransporterChange = (e) => {
        setEditWorkOrder({ ...editWorkOrder, transporter: e.target.value })
    }
    const onModalFormSubmit = (e) => {
        e.preventDefault();
        console.log(editWorkOrder.designer_description_status)
        const modalFormData = new FormData();
        modalFormData.append('id', editWorkOrder.id);
        modalFormData.append('purchase_order', editWorkOrder.purchase_order);
        modalFormData.append('designer_head', editWorkOrder.designer_head);
        modalFormData.append('designer_head_description_status', JSON.stringify(editWorkOrder.designer_head_description_status));
        modalFormData.append('designer_head_file', editWorkOrder.designer_head_file);
        modalFormData.append('designer', editWorkOrder.designer);
        modalFormData.append('designer_description_status', JSON.stringify(editWorkOrder.designer_description_status));
        modalFormData.append('designer_file', editWorkOrder.designer_file);
        modalFormData.append('programmer', editWorkOrder.programmer);
        modalFormData.append('programmer_description_status', JSON.stringify(editWorkOrder.programmer_description_status));
        modalFormData.append('programmer_file', editWorkOrder.programmer_file);
        modalFormData.append('machine_operator', editWorkOrder.machine_operator);
        modalFormData.append('machine_operator_description_status', JSON.stringify(editWorkOrder.machine_operator_description_status));
        modalFormData.append('machine_operator_parameter', JSON.stringify(editWorkOrder.machine_operator_parameter));
        modalFormData.append('machine_operator_file', editWorkOrder.machine_operator_file);
        modalFormData.append('transporter', editWorkOrder.transporter);
        modalFormData.append('transporter_description_status', JSON.stringify(editWorkOrder.transporter_description_status));
        modalFormData.append('transporter_file', editWorkOrder.transporter_file);
        const config = {
            headers: { 'content-type': 'application/json' }
        }
        axios.post(api_url + "update_work_order.php", modalFormData, config)
            .then(() => {
                axios.get(api_url + "read_work_order_by_crm.php")
                    .then((res) => {
                        console.log(res.data)
                        setReadWorkOrder(res.data)
                    })
            })
        handleClose();
    }
    //Read All Data
    useEffect(() => {
        axios.post(api_url + "read_work_order_by_designer.php", { designer: localStorage.getItem('employee_id') })
            .then((res) => {
                console.log(res.data)
                setReadWorkOrder(res.data)
            })
    }, [])
    const columns = [
        {
            field: "id",
            headerName: "ID"
        },
        {
            field: "work_order",
            headerName: "Work Order",
            width: 500
        },
        // {
        //     field: "designer_head_name",
        //     headerName: "Designer Head"
        // },
        // {
        //     field: "designer_name",
        //     headerName: "Designer"
        // },
        // {
        //     field: "programmer_name",
        //     headerName: "Programmer"
        // },
        // {
        //     field: "machine_operator_name",
        //     headerName: "Machine Operator"
        // },
        // {
        //     field: "transporter_name",
        //     headerName: "Transporter"
        // },
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="">
                        <button onClick={() => onRead(params.row)} data-toggle="tooltip" title="Read" type="button" className="btn btn-primary"  ><i class="far fa-eye"></i></button>
                        <button onClick={() => onEdit(params.row)} data-toggle="tooltip" title="Edit" style={{ marginLeft: '20%' }} type="button" className="btn btn-warning"  ><i class="far fa-edit"></i></button>
                    </div>
                );
            }
        },
    ]
    const rows = readWorkOrder === undefined ? [] : readWorkOrder
    return (
        <>
            <Header /><Menu />
            <div className='content-wrapper'>
                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header>
                        <Modal.Title>Update Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={onModalFormSubmit}>
                            <div className="card-body">
                                <div className="form-group">
                                    <label >PO-Id</label>
                                    <select onChange={onEditPurchaseOrderChange} defaultValue={editWorkOrder.purchase_order} className='form-control'>
                                        <option>Select</option>
                                        {purchaseOrder === undefined ? [] : purchaseOrder.data.map((purchaseorder) => (
                                            <option disabled={true} key={purchaseorder.id} value={purchaseorder.id}>{purchaseorder.purchase_order}</option>
                                        ))}
                                    </select>
                                </div>
                                <div class="card-body">
                                    <div class="card card-primary card-outline">
                                        <div class="card-header">
                                            <label >Designer Head</label>
                                            <select onChange={onEditDesignerHeadChange} defaultValue={editWorkOrder.designer_head} name="designer_head" className='form-control'>
                                                <option disabled={true}>Select</option>
                                                {designerHead === undefined ? [] : designerHead.data.map((designerhead) => (
                                                    <option disabled={true} key={designerhead.id} value={designerhead.id}>{designerhead.name}</option>
                                                ))}
                                            </select>
                                            
                                            <button className='btn btn-success'><a href={`http://localhost/girnar_backend/assets/images/${editWorkOrder.designer_head_file}`}>Download File</a></button>
                                            {editFormValues.map((element, index) => (
                                                <div className="form-group" key={index}>
                                                    <label>Description</label>
                                                    <input className="form-control" type="text" name="description" value={element.description || ""} onChange={e => editHandleChange(index, e)} readOnly />
                                                    <label>Status</label>
                                                    {/* <input className="form-control" type="text" name="status" value={element.status || ""} onChange={e => handleChange(index, e)} /> */}
                                                    <select className="form-control" type="text" name="status" value={element.status || ""} onChange={e => editHandleChange(index, e)} readOnly>
                                                        <option disabled={true}>Select</option>
                                                        <option disabled={true} value="assigned">Assigned</option>
                                                        <option disabled={true} value="completed">Completed</option>
                                                    </select>
                                                    {/* {
                                                        index ?
                                                            <button type="button" className="btn btn-danger" onClick={() => removeEditFormFields(index)}>Remove</button>
                                                            : null
                                                    } */}
                                                </div>
                                            ))}
                                            {/* <div className="button-section">
                                                <button className="btn btn-info" type="button" onClick={() => addEditFormFields()}>Add</button>

                                            </div> */}
                                            {/* <label >File Uploaded</label>
                                                    <img src="https://picsum.photos/200/35" alt="File" /> */}

                                        </div>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div class="card card-primary card-outline">
                                        <div class="card-header">
                                            <label >Designer</label>
                                            <select onChange={onEditDesignerChange} defaultValue={editWorkOrder.designer} className='form-control'>
                                                <option>Select</option>
                                                {designer === undefined ? [] : designer.data.map((designer) => (
                                                    <option key={designer.id} value={designer.id}>{designer.name}</option>
                                                ))}
                                            </select>
                                            <label>Designer File</label>
                                            <input onChange={onEditDesignerFileChange} type="file" className='form-control' name="designer_file" />
                                            <label>Download File</label><br />
                                            <button className='btn btn-success'><a href={`http://localhost/girnar_backend/assets/images/${editWorkOrder.designer_file}`}>Download File</a></button>
                                            {editFormValues1.map((element, index) => (
                                                <div className="form-group" key={index}>
                                                    <label>Description</label>
                                                    <input className="form-control" type="text" name="description1" value={element.description1 || ""} onChange={e => editHandleChange1(index, e)} />
                                                    <label>Status</label>
                                                    {/* <input className="form-control" type="text" name="status1" value={element.status1 || ""} onChange={e => handleChange1(index, e)} /> */}
                                                    <select className="form-control" type="text" name="status1" value={element.status1 || ""} onChange={e => editHandleChange1(index, e)} >
                                                        <option>Select</option>
                                                        <option value="assigned">Assigned</option>
                                                        <option value="completed">Completed</option>
                                                    </select>
                                                    {/* {
                                                        index ?
                                                            <button type="button" className="btn btn-danger" onClick={() => removeEditFormFields1(index)}>Remove</button>
                                                            : null
                                                    } */}
                                                </div>
                                            ))}
                                            {/* <div className="button-section">
                                                <button className="btn btn-info" type="button" onClick={() => addEditFormFields1()}>Add</button>

                                            </div> */}
                                            {/* <label >File Uploaded</label>
                                                    <img src="https://picsum.photos/200/35" alt="File" /> */}

                                        </div>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div class="card card-primary card-outline">
                                        <div class="card-header">
                                            <label >Programmer</label>
                                            <select disabled={true} onChange={onEditProgrammerChange} defaultValue={editWorkOrder.programmer} className='form-control' readOnly>
                                                <option>Select</option>
                                                {programmer === undefined ? [] : programmer.data.map((programmer) => (
                                                    <option disabled={true} key={programmer.id} value={programmer.id}>{programmer.name}</option>
                                                ))}
                                            </select>
                                            <label>Download File</label><br />
                                            <button className='btn btn-success'><a href={`http://localhost/girnar_backend/assets/images/${editWorkOrder.programmer_file}`}>Download File</a></button>
                                            {editFormValues2.map((element, index) => (
                                                <div className="form-group" key={index}>
                                                    <label>Description</label>
                                                    <input className="form-control" type="text" name="description2" value={element.description2 || ""} onChange={e => editHandleChange2(index, e)} readOnly />
                                                    <label>Status</label>
                                                    {/* <input className="form-control" type="text" name="status2" value={element.status2 || ""} onChange={e => handleChange2(index, e)} /> */}
                                                    <select className="form-control" type="text" name="status2" value={element.status2 || ""} onChange={e => editHandleChange2(index, e)} readOnly>
                                                        <option disabled={true}>Select</option>
                                                        <option disabled={true} value="assigned">Assigned</option>
                                                        <option disabled={true} value="completed">Completed</option>
                                                    </select>
                                                    {/* {
                                                        index ?
                                                            <button type="button" className="btn btn-danger" onClick={() => removeEditFormFields2(index)}>Remove</button>
                                                            : null
                                                    } */}
                                                </div>
                                            ))}
                                            {/* <div className="button-section">
                                                <button className="btn btn-info" type="button" onClick={() => addEditFormFields2()}>Add</button>

                                            </div> */}
                                            {/* <label >File Uploaded</label>
                                                    <img src="https://picsum.photos/200/35" alt="File" /> */}

                                        </div>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div class="card card-primary card-outline">
                                        <div class="card-header">
                                            <label >Machine Operator</label>
                                            <select onChange={onEditMachineOperatorChange} defaultValue={editWorkOrder.machine_operator} className='form-control' readOnly>
                                                <option disabled={true}>Select</option>
                                                {machineOperator === undefined ? [] : machineOperator.data.map((machineoperator) => (
                                                    <option disabled={true} key={machineoperator.id} value={machineoperator.id}>{machineoperator.name}</option>
                                                ))}
                                            </select>
                                            <label>Download File</label><br />
                                            <button className='btn btn-success'><a href={`http://localhost/girnar_backend/assets/images/${editWorkOrder.machine_operator_file}`}>Download File</a></button>
                                            {editFormValues3.map((element, index) => (
                                                <div className="form-group" key={index}>
                                                    <label>Description</label>
                                                    <input className="form-control" type="text" name="description3" value={element.description3 || ""} onChange={e => editHandleChange3(index, e)} />
                                                    <label>Status</label>
                                                    {/* <input className="form-control" type="text" name="status3" value={element.status3 || ""} onChange={e => handleChange3(index, e)} /> */}
                                                    <select className="form-control" type="text" name="status3" value={element.status3 || ""} onChange={e => editHandleChange3(index, e)} readOnly>
                                                        <option>Select</option>
                                                        <option disabled={true} value="assigned">Assigned</option>
                                                        <option value="completed">Completed</option>
                                                    </select>
                                                    {/* {
                                                        index ?
                                                            <button type="button" className="btn btn-danger" onClick={() => removeEditFormFields3(index)}>Remove</button>
                                                            : null
                                                    } */}
                                                </div>
                                            ))}
                                            {/* <div className="button-section">
                                                <button className="btn btn-info" type="button" onClick={() => addEditFormFields3()}>Add</button>

                                            </div> */}
                                            <hr />
                                            {editInspectionParametersFormValues.map((element, index) => (
                                                <div className="form-group" key={index}>
                                                    <label>Parameter</label>
                                                    <input className="form-control" type="number" name="parameter" value={element.parameter || ""} onChange={e => editHandleChangeInspectionParameters(index, e)} readOnly />
                                                    <label>Result</label>
                                                    {/* <input className="form-control" type="text" name="result" value={element.result || ""} onChange={e => handleChangeInspectionParameters(index, e)} /> */}
                                                    <select className="form-control" type="text" name="result" value={element.result || ""} onChange={e => editHandleChangeInspectionParameters(index, e)} readOnly>
                                                        <option disabled={true}>Select</option>
                                                        <option disabled={true}>Pass</option>
                                                        <option disabled={true}>Fail</option>
                                                    </select>
                                                    {/* {
                                                        index ?
                                                            <button type="button" className="btn btn-danger" onClick={() => removeEditFormFieldsInspectionParameters(index)}>Remove</button>
                                                            : null
                                                    } */}
                                                </div>
                                            ))}
                                            {/* <div className="button-section">
                                                <button className="btn btn-info" type="button" onClick={() => addEditFormFieldsInspectionParameters()}>Add</button>

                                            </div> */}
                                            {/* <label >File Uploaded</label>
                                                    <img src="https://picsum.photos/200/35" alt="File" /> */}

                                        </div>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div class="card card-primary card-outline">
                                        <div class="card-header">
                                            <label >Transporter</label>
                                            <select onChange={onEditTransporterChange} defaultValue={editWorkOrder.transporter} className='form-control' readOnly>
                                                <option disabled={true}>Select</option>
                                                {transporter === undefined ? [] : transporter.data.map((transporter) => (
                                                    <option disabled={true} key={transporter.id} value={transporter.id}>{transporter.name}</option>
                                                ))}
                                            </select>
                                            <label>Download File</label><br />
                                            <button className='btn btn-success'><a href={`http://localhost/girnar_backend/assets/images/${editWorkOrder.transporter_file}`}>Download File</a></button>
                                            {editFormValues4.map((element, index) => (
                                                <div className="form-group" key={index}>
                                                    <label>Description</label>
                                                    <input className="form-control" type="text" name="description4" value={element.description4 || ""} onChange={e => editHandleChange4(index, e)} readOnly />
                                                    <label>Status</label>
                                                    {/* <input className="form-control" type="text" name="status4" value={element.status4 || ""} onChange={e => handleChange4(index, e)} /> */}
                                                    <select className="form-control" type="text" name="status4" value={element.status4 || ""} onChange={e => editHandleChange4(index, e)} readOnly>
                                                        <option disabled={true}>Select</option>
                                                        <option disabled={true} value="assigned">Assigned</option>
                                                        <option disabled={true} value="completed">Completed</option>
                                                    </select>
                                                    {/* {
                                                        index ?
                                                            <button type="button" className="btn btn-danger" onClick={() => removeEditFormFields4(index)}>Remove</button>
                                                            : null
                                                    } */}
                                                </div>
                                            ))}
                                            {/* <div className="button-section">
                                                <button className="btn btn-info" type="button" onClick={() => addEditFormFields4()}>Add</button>

                                            </div> */}
                                            {/* <label >File Uploaded</label>
                                                    <img src="https://picsum.photos/200/35" alt="File" /> */}

                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* /.card-body */}
                            <div className="card-footer">
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={showModal1} onHide={handleClose1}>
                    <Modal.Header>
                        <Modal.Title>Details Read</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="card-body">
                                <div className="form-group">
                                    <label >PO-Id</label>
                                    <select defaultValue={singleWorkOrder.purchase_order} className='form-control'>
                                        <option>Select</option>
                                        {purchaseOrder === undefined ? [] : purchaseOrder.data.map((purchaseorder) => (
                                            <option disabled={true} key={purchaseorder.id} value={purchaseorder.id}>{purchaseorder.purchase_order}</option>
                                        ))}
                                    </select>
                                </div>
                                <div class="card-body">
                                    <div class="card card-primary card-outline">
                                        <div class="card-header">
                                            <label >Designer Head</label>
                                            <select defaultValue={singleWorkOrder.designer_head} name="designer_head" className='form-control'>
                                                <option>Select</option>
                                                {designerHead === undefined ? [] : designerHead.data.map((designerhead) => (
                                                    <option disabled={true} key={designerhead.id} value={designerhead.id}>{designerhead.name}</option>
                                                ))}
                                            </select>
                                            <label>Download File</label><br />
                                            <button className='btn btn-success'><a href={`http://localhost/girnar_backend/assets/images/${singleWorkOrder.designer_head_file}`}>Download File</a></button>
                                            {readFormValues.map((element, index) => (
                                                <div className="form-group" key={index}>
                                                    <label>Description</label>
                                                    <input className="form-control" type="text" name="description" value={element.description || ""} readOnly />
                                                    <label>Status</label>
                                                    {/* <input className="form-control" type="text" name="status" value={element.status || ""} onChange={e => handleChange(index, e)} /> */}
                                                    <select className="form-control" type="text" name="status" value={element.status || ""}  >
                                                        <option disabled={true}>Select</option>
                                                        <option disabled={true} value="assigned">Assigned</option>
                                                        <option disabled={true} value="completed">Completed</option>
                                                    </select>

                                                </div>
                                            ))}

                                            {/* <label >File Uploaded</label>
                                                    <img src="https://picsum.photos/200/35" alt="File" /> */}

                                        </div>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div class="card card-primary card-outline">
                                        <div class="card-header">
                                            <label >Designer</label>
                                            <select defaultValue={singleWorkOrder.designer} className='form-control'>
                                                <option>Select</option>
                                                {designer === undefined ? [] : designer.data.map((designer) => (
                                                    <option disabled={true} key={designer.id} value={designer.id}>{designer.name}</option>
                                                ))}
                                            </select>
                                            <label>Download File</label><br />
                                            <button className='btn btn-success'><a href={`http://localhost/girnar_backend/assets/images/${singleWorkOrder.designer_file}`}>Download File</a></button>
                                            {readFormValues1.map((element, index) => (
                                                <div className="form-group" key={index}>
                                                    <label>Description</label>
                                                    <input className="form-control" type="text" name="description1" value={element.description1 || ""} readOnly />
                                                    <label>Status</label>
                                                    {/* <input className="form-control" type="text" name="status1" value={element.status1 || ""} onChange={e => handleChange1(index, e)} /> */}
                                                    <select className="form-control" type="text" name="status1" value={element.status1 || ""}  >
                                                        <option disabled={true}>Select</option>
                                                        <option disabled={true} value="assigned">Assigned</option>
                                                        <option disabled={true} value="completed">Completed</option>
                                                    </select>

                                                </div>
                                            ))}

                                            {/* <label >File Uploaded</label>
                                                    <img src="https://picsum.photos/200/35" alt="File" /> */}

                                        </div>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div class="card card-primary card-outline">
                                        <div class="card-header">
                                            <label >Programmer</label>
                                            <select defaultValue={singleWorkOrder.programmer} className='form-control'>
                                                <option>Select</option>
                                                {programmer === undefined ? [] : programmer.data.map((programmer) => (
                                                    <option disabled={true} key={programmer.id} value={programmer.id}>{programmer.name}</option>
                                                ))}
                                            </select>
                                            <label>Download File</label><br />
                                            <button className='btn btn-success'><a href={`http://localhost/girnar_backend/assets/images/${singleWorkOrder.programmer_file}`}>Download File</a></button>
                                            {readFormValues2.map((element, index) => (
                                                <div className="form-group" key={index}>
                                                    <label>Description</label>
                                                    <input className="form-control" type="text" name="description2" value={element.description2 || ""} readOnly />
                                                    <label>Status</label>
                                                    {/* <input className="form-control" type="text" name="status2" value={element.status2 || ""} onChange={e => handleChange2(index, e)} /> */}
                                                    <select className="form-control" type="text" name="status2" value={element.status2 || ""} >
                                                        <option disabled={true}>Select</option>
                                                        <option disabled={true} value="assigned">Assigned</option>
                                                        <option disabled={true} value="completed">Completed</option>
                                                    </select>

                                                </div>
                                            ))}

                                            {/* <label >File Uploaded</label>
                                                    <img src="https://picsum.photos/200/35" alt="File" /> */}

                                        </div>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div class="card card-primary card-outline">
                                        <div class="card-header">
                                            <label >Machine Operator</label>
                                            <select defaultValue={singleWorkOrder.machine_operator} className='form-control'>
                                                <option>Select</option>
                                                {machineOperator === undefined ? [] : machineOperator.data.map((machineoperator) => (
                                                    <option disabled={true} key={machineoperator.id} value={machineoperator.id}>{machineoperator.name}</option>
                                                ))}
                                            </select>
                                            <label>Download File</label><br />
                                            <button className='btn btn-success'><a href={`http://localhost/girnar_backend/assets/images/${singleWorkOrder.machine_operator_file}`}>Download File</a></button>
                                            {readFormValues3.map((element, index) => (
                                                <div className="form-group" key={index}>
                                                    <label>Description</label>
                                                    <input className="form-control" type="text" name="description3" value={element.description3 || ""} readOnly />
                                                    <label>Status</label>
                                                    {/* <input className="form-control" type="text" name="status3" value={element.status3 || ""} onChange={e => handleChange3(index, e)} /> */}
                                                    <select className="form-control" type="text" name="status3" value={element.status3 || ""} >
                                                        <option disabled={true}>Select</option>
                                                        <option disabled={true} value="assigned">Assigned</option>
                                                        <option disabled={true} value="completed">Completed</option>
                                                    </select>

                                                </div>
                                            ))}

                                            <hr />
                                            {readInspectionParametersFormValues.map((element, index) => (
                                                <div className="form-group" key={index}>
                                                    <label>Parameter</label>
                                                    <input className="form-control" type="number" name="parameter" value={element.parameter || ""} readOnly />
                                                    <label>Result</label>
                                                    {/* <input className="form-control" type="text" name="result" value={element.result || ""} onChange={e => handleChangeInspectionParameters(index, e)} /> */}
                                                    <select className="form-control" type="text" name="result" value={element.result || ""} >
                                                        <option disabled={true}>Select</option>
                                                        <option disabled={true}>Pass</option>
                                                        <option disabled={true}>Fail</option>
                                                    </select>

                                                </div>
                                            ))}

                                            {/* <label >File Uploaded</label>
                                                    <img src="https://picsum.photos/200/35" alt="File" /> */}

                                        </div>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div class="card card-primary card-outline">
                                        <div class="card-header">
                                            <label >Transporter</label>
                                            <select defaultValue={singleWorkOrder.transporter} className='form-control'>
                                                <option>Select</option>
                                                {transporter === undefined ? [] : transporter.data.map((transporter) => (
                                                    <option disabled={true} key={transporter.id} value={transporter.id}>{transporter.name}</option>
                                                ))}
                                            </select>
                                            <label>Download File</label><br />
                                            <button className='btn btn-success'><a href={`http://localhost/girnar_backend/assets/images/${singleWorkOrder.transporter_file}`}>Download File</a></button>
                                            {readFormValues4.map((element, index) => (
                                                <div className="form-group" key={index}>
                                                    <label>Description</label>
                                                    <input className="form-control" type="text" name="description4" value={element.description4 || ""} readOnly />
                                                    <label>Status</label>
                                                    {/* <input className="form-control" type="text" name="status4" value={element.status4 || ""} onChange={e => handleChange4(index, e)} /> */}
                                                    <select className="form-control" type="text" name="status4" value={element.status4 || ""}>
                                                        <option disabled={true}>Select</option>
                                                        <option disabled={true} value="assigned">Assigned</option>
                                                        <option disabled={true} value="completed">Completed</option>
                                                    </select>

                                                </div>
                                            ))}

                                            {/* <label >File Uploaded</label>
                                                    <img src="https://picsum.photos/200/35" alt="File" /> */}

                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* /.card-body */}

                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose1}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                <section class="content">
                    <div className="container-fluid">
                        <div className="row">
                            {/* left column */}
                            <div className="col-md-12">
                                <div class="card">
                                    <div class="card-header">
                                        <h3 class="card-title">Task Data</h3>
                                    </div>
                                    <div class="card-body">
                                        <div style={{ height: 300, width: '100%' }}>
                                            <DataGrid rows={rows === undefined ? [] : rows} columns={columns} components={{
                                                Toolbar: GridToolbar,
                                            }} />
                                        </div>
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

export default DesignerProduction
