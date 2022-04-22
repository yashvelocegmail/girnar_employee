import axios from 'axios'
import { api_url } from '../ApiUrl';
import React, { useEffect, useState } from 'react'
import Header from '../../Header'
import Menu from '../../Menu'
import { toast } from 'react-toastify';
import { DataGrid } from '@mui/x-data-grid';
import { Modal, Button, Form } from "react-bootstrap";

function DesignerHeadInwardOutwardThirdParty() {
    //Modal Settings
    const [showModal, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showModal1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    //States
    const [workOrderOption, setWorkOrderOption] = useState();
    const [thirdPartyOption, setThirdPartyOption] = useState();

    const [inwardOutwardThirdParty, setInwardOutwardThirdParty] = useState({
        work_order: "",
        third_party_name: "",
        outward_date: "",
        outward_time: "",
        inward_date: "",
        inward_time: ""
    });
    const [readInwardOutwardThirdParty, setReadInwardOutwardThirdParty] = useState({
        id: "",
        work_order: "",
        third_party_name: "",
        outward_date: "",
        outward_time: "",
        inward_date: "",
        inward_time: ""
    });
    const [updateInwardOutwardThirdParty, setUpdateInwardOutwardThirdParty] = useState({
        id: "",
        work_order: "",
        third_party_name: "",
        outward_date: "",
        outward_time: "",
        inward_date: "",
        inward_time: ""
    });
    const [singleInwardOutwardThirdParty, setSingleInwardOutwardThirdParty] = useState({
        id: "",
        work_order: "",
        third_party_name: "",
        outward_date: "",
        outward_time: "",
        inward_date: "",
        inward_time: ""
    });
    useEffect(() => {
        axios.get(api_url + "read_work_order_by_crm.php")
            .then((res) => {
                console.log(res.data)
                setWorkOrderOption(res.data)
            })
        axios.get(api_url + "read_third_party.php")
            .then((res) => {
                setThirdPartyOption(res.data)
            })
    }, [])
    //Create
    const onInputChange = (e) => {
        setInwardOutwardThirdParty({ ...inwardOutwardThirdParty, [e.target.name]: e.target.value })
    }
    const onFormSubmit = (e) => {
        e.preventDefault();
        console.log(inwardOutwardThirdParty)
        axios.post(api_url + "create_inward_outward_third_party.php", inwardOutwardThirdParty)
            .then((res) => {
                console.log(res.data.messsage);
                toast.configure();
                toast.success(res.data.messsage)
                axios.get(api_url + "read_inward_outward_third_party.php")
                    .then((res) => {
                        setReadInwardOutwardThirdParty(res.data);
                    })
            })
    }
    //Read
    useEffect(() => {
        axios.get(api_url + "read_inward_outward_third_party.php")
            .then((res) => {
                setReadInwardOutwardThirdParty(res.data);
            })
    }, [])
    //Edit
    const onModalInputChange = (e) => {
        setUpdateInwardOutwardThirdParty({ ...updateInwardOutwardThirdParty, [e.target.name]: e.target.value })
    }
    const onEdit = (row) => {
        handleShow()
        setUpdateInwardOutwardThirdParty({
            id: row.id,
            work_order: row.work_order,
            third_party_name: row.third_party_name,
            outward_date: row.outward_date,
            outward_time: row.outward_time,
            inward_date: row.inward_date,
            inward_time: row.inward_time
        })
    }
    const onModalFormSubmit = (e) => {
        e.preventDefault();
        console.log(updateInwardOutwardThirdParty)
        axios.post(api_url + "update_all_inward_outward_third_party.php", updateInwardOutwardThirdParty)
            .then((res) => {
                toast.configure();
                toast.success(res.data.messsage)
                axios.get(api_url + "read_inward_outward_third_party.php")
                    .then((res) => {
                        setReadInwardOutwardThirdParty(res.data);
                    })
            })
        handleClose();
    }
    //Single Read
    const onRead = (row) => {
        handleShow1();
        setSingleInwardOutwardThirdParty({
            id: row.id,
            work_order: row.work_order,
            third_party_name: row.third_party_name,
            outward_date: row.outward_date,
            outward_time: row.outward_time,
            inward_date: row.inward_date,
            inward_time: row.inward_time
        })
    }
    //Delete
    const onDelete = (id) => {
        axios.post(api_url + "delete_inward_outward_third_party.php", { id: id })
            .then((res) => {
                toast.configure();
                toast.success(res.data.messsage)
                axios.get(api_url + "read_inward_outward_third_party.php")
                    .then((res) => {
                        setReadInwardOutwardThirdParty(res.data);
                    })
            })
    }
    //Inward
    const onInward = (row) => {
        var today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        axios.post(api_url + "update_inward_outward_third_party.php", { id: row.id, inward_date: date, inward_time: time })
            .then((res) => {
                toast.configure();
                toast.success(res.data.messsage)
                axios.get(api_url + "read_inward_outward_third_party.php")
                    .then((res) => {
                        setReadInwardOutwardThirdParty(res.data);
                    })
            })
    }
    const columns = [
        {
            field: "id",
            headerName: "Id"
        },
        {
            field: "work_order_name",
            headerName: "Work Order",
            width: 450
        },
        {
            field: "third_party_name_name",
            headerName: "Third Party Name",
            width: 250
        },
        // {
        //     field: "outward_date",
        //     headerName: "Outward Date",
        //     width: 150
        // },
        // {
        //     field: "outward_time",
        //     headerName: "Outward Time",
        //     width: 150
        // },
        // {
        //     field: "inward_date",
        //     headerName: "Inward Date",
        //     width: 150
        // },
        // {
        //     field: "inward_time",
        //     headerName: "Inward Time",
        //     width: 150
        // },
        {
            field: 'action',
            headerName: 'Action',
            width: 300,
            renderCell: (params) => {
                return (
                    <div>
                        <button onClick={() => onInward(params.row)} disabled={params.row.inward_date === "0000-00-00" ? false : true} data-toggle="tooltip" title="Inward" type="button" className="btn btn-success"  ><i class="fas fa-arrow-alt-circle-left"></i></button>
                        <button onClick={() => onRead(params.row)} data-toggle="tooltip" title="Read" style={{ marginLeft: '20%' }} type="button" className="btn btn-primary"  ><i class="far fa-eye"></i></button>
                        <button onClick={() => onEdit(params.row)} data-toggle="tooltip" title="Edit" style={{ marginLeft: '20%' }} type="button" className="btn btn-warning"  ><i class="far fa-edit"></i></button>
                        <button onClick={() => {
                            const confirmBox = window.confirm(
                                "Do you really want to delete?"
                            )
                            if (confirmBox === true) {
                                onDelete(params.row.id)
                            }
                        }} data-toggle="tooltip" title="Delete" style={{ marginLeft: '20%' }} className="btn btn-danger" ><i className="fas fa-trash"></i></button>
                    </div>
                );
            }
        },
    ]
    const rows = readInwardOutwardThirdParty.data;
    return (
        <>
            <Header />
            <Menu />
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Edit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={onModalFormSubmit}>
                        <div className="card-body">
                            <div className="form-group">
                                <label>Id</label>
                                <input onChange={onModalInputChange} defaultValue={updateInwardOutwardThirdParty.id} name="id" type="text" className="form-control" readOnly />
                            </div>
                            <div className="form-group">
                                <label >Work Order</label>
                                <select name="work_order" className="form-control" onChange={onModalInputChange} defaultValue={updateInwardOutwardThirdParty.work_order} required>
                                    <option value="">Select</option>
                                    {workOrderOption === undefined ? [] : workOrderOption.data.map((work_order) => (
                                        <option key={work_order.id} value={work_order.id}>{work_order.work_order}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label >Third Party</label>
                                <select name="third_party_name" onChange={onModalInputChange} className="form-control" defaultValue={updateInwardOutwardThirdParty.third_party_name} required>
                                    <option value="">Select</option>
                                    {thirdPartyOption === undefined ? [] : thirdPartyOption.data.map((third_party) => (
                                        <option key={third_party.id} value={third_party.id}>{third_party.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Outward Date</label>
                                <input onChange={onModalInputChange} defaultValue={updateInwardOutwardThirdParty.outward_date} name="outward_date" type="date" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Outward Time</label>
                                <input onChange={onModalInputChange} defaultValue={updateInwardOutwardThirdParty.outward_time} name="outward_time" type="time" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Inward Date</label>
                                <input onChange={onModalInputChange} defaultValue={updateInwardOutwardThirdParty.inward_date} name="inward_date" type="date" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Inward Time</label>
                                <input onChange={onModalInputChange} defaultValue={updateInwardOutwardThirdParty.inward_time} name="inward_time" type="time" className="form-control" />
                            </div>
                            <div class="form-group">
                                <button type="submit" class="btn btn-primary">Submit</button>
                            </div>
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
                                <label>Id</label>
                                <input defaultValue={singleInwardOutwardThirdParty.id} name="id" type="text" className="form-control" readOnly />
                            </div>
                            <div className="form-group">
                                <label >Work Order</label>
                                <select name="work_order" className="form-control" defaultValue={singleInwardOutwardThirdParty.work_order} required readOnly>
                                    <option disabled={true} value="">Select</option>
                                    {workOrderOption === undefined ? [] : workOrderOption.data.map((work_order) => (
                                        <option disabled={true} key={work_order.id} value={work_order.id}>{work_order.work_order}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label >Third Party</label>
                                <select name="third_party_name" className="form-control" defaultValue={singleInwardOutwardThirdParty.third_party_name} required readOnly>
                                    <option disabled={true} value="">Select</option>
                                    {thirdPartyOption === undefined ? [] : thirdPartyOption.data.map((third_party) => (
                                        <option disabled={true} key={third_party.id} value={third_party.id}>{third_party.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Outward Date</label>
                                <input defaultValue={singleInwardOutwardThirdParty.outward_date} name="outward_date" type="date" className="form-control" readOnly />
                            </div>
                            <div className="form-group">
                                <label>Outward Time</label>
                                <input defaultValue={singleInwardOutwardThirdParty.outward_time} name="outward_time" type="time" className="form-control" readOnly />
                            </div>
                            <div className="form-group">
                                <label>Inward Date</label>
                                <input defaultValue={singleInwardOutwardThirdParty.inward_date} name="inward_date" type="date" className="form-control" readOnly />
                            </div>
                            <div className="form-group">
                                <label>Inward Time</label>
                                <input defaultValue={singleInwardOutwardThirdParty.inward_time} name="inward_time" type="time" className="form-control" readOnly />
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose1}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className='content-wrapper'>
                <section class="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className='col-md-12'>
                                {/* left column */}
                                <div className="card card-primary">
                                    <div className="card-header">
                                        <h3 className="card-title">Inward Outward Third Party</h3>
                                    </div>
                                    {/* /.card-header */}
                                    {/* form start */}
                                    <form onSubmit={onFormSubmit}>
                                        <div className="card-body">
                                            <div className="form-group">
                                                <label >Work Order</label>
                                                <select name="work_order" className="form-control" onChange={onInputChange} required>
                                                    <option value="">Select</option>
                                                    {workOrderOption === undefined ? [] : workOrderOption.data.map((work_order) => (
                                                        <option key={work_order.id} value={work_order.id}>{work_order.work_order}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <label >Third Party</label>
                                            <select name="third_party_name" className="form-control" onChange={onInputChange} required>
                                                <option value="">Select</option>
                                                {thirdPartyOption === undefined ? [] : thirdPartyOption.data.map((third_party) => (
                                                    <option key={third_party.id} value={third_party.id}>{third_party.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        {/* /.card-body */}
                                        <div className="card-footer">
                                            <button type="submit" className="btn btn-primary">Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-12'>
                                <div class="card">
                                    <div class="card-header">
                                        <h3 class="card-title">Material Type</h3>
                                    </div>
                                    <div class="card-body">
                                        <div style={{ height: 300, width: '100%' }}>
                                            <DataGrid rows={rows === undefined ? [] : rows} columns={columns} />
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

export default DesignerHeadInwardOutwardThirdParty