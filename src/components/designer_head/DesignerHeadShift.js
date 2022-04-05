import axios from 'axios'
import { api_url } from '../ApiUrl';
import React, { useEffect, useState } from 'react'
import Header from '../../Header'
import Menu from '../../Menu'
import { toast } from 'react-toastify';
import { DataGrid } from '@mui/x-data-grid';
import { Modal, Button, Form } from "react-bootstrap";

function DesignerHeadShift() {
    //Modal Settings
    const [showModal, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showModal1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    //States
    const [shift, setShift] = useState({
        shift_name: "",
        shift_from:"",
        shift_to:""
    })
    const [readShift, setReadShift] = useState({
        id: "",
        shift_name: "",
        shift_from:"",
        shift_to:""
    })
    const [editShift, setEditShift] = useState({
        id: "",
        shift_name: "",
        shift_from:"",
        shift_to:""
    })
    const [singleShift, setSingleShift] = useState({
        id: "",
        shift_name: "",
        shift_from:"",
        shift_to:""
    })
    //Create
    const onInputChange = (e) => {
        setShift({ ...shift, [e.target.name]: e.target.value })
    }
    const onFormSubmit = (e) => {
        e.preventDefault();
        axios.post(api_url+"create_shift.php", shift)
            .then(() => {
                axios.get(api_url+"read_shift.php")
                .then((res) => {
                    setReadShift(res.data)
                })
                toast.configure();
                toast.success("Successfully Inserted");
            })
    }
    //Read
    useEffect(() => {
        axios.get(api_url+"read_shift.php")
            .then((res) => {
                setReadShift(res.data)
            })
    }, [])
    const columns = [
        {
            field: "id",
            headerName: "Id"
        },
        {
            field: "shift_name",
            headerName: "Shift",
            width: 150
        },
        {
            field: "shift_from",
            headerName: "Shift From",
            width: 150
        },
        {
            field: "shift_to",
            headerName: "Shift To",
            width: 150
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="">
                        <button onClick={() => onRead(params.row)} data-toggle="tooltip" title="Read" type="button" className="btn btn-primary"  ><i class="far fa-eye"></i></button>
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
    const rows = readShift.data;
    const onRead = (row) => {
        handleShow1()
        setSingleShift({
            id: row.id,
            shift_name: row.shift_name,
            shift_from: row.shift_from,
            shift_to: row.shift_to
        })
    }
    //Update
    const onEdit = (row) => {
        handleShow()
        setEditShift({
            id: row.id,
            shift_name: row.shift_name,
            shift_from: row.shift_from,
            shift_to: row.shift_to
        })
    }
    const onModalInputChange = (e) => {
        setEditShift({ ...editShift, [e.target.name]: e.target.value })
    }
    const onModalFormSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost/girnar_backend/api/update_shift.php", editShift)
            .then(() => {
                axios.get("http://localhost/girnar_backend/api/read_shift.php")
                    .then((res) => {
                        setReadShift(res.data)
                    })
                toast.configure();
                toast.warning("Successfully Updated");
            })
        handleClose();
    }
    const onDelete = (id) => {
        axios.post("http://localhost/girnar_backend/api/delete_shift.php", { id: id })
            .then(() => {
                axios.get("http://localhost/girnar_backend/api/read_shift.php")
                    .then((res) => {
                        setReadShift(res.data)
                    })
                toast.configure();
                toast.error("Successfully Deleted");
            })
    }
    return (
        <>
            <Header />
            <Menu />
            <Modal show={showModal1} onHide={handleClose1}>
                <Modal.Header>
                    <Modal.Title>Details Read</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="card-body">
                            <div className="form-group">
                                <label>Id</label>
                                <input defaultValue={singleShift.id} name="id" type="text" className="form-control" readOnly />
                            </div>
                            <div className="form-group">
                                <label>Shift Name</label>
                                <input defaultValue={singleShift.shift_name} name="shift_name" required type="text" className="form-control"readOnly />
                            </div>
                            <div className="form-group">
                                <label>Shift From</label>
                                <input defaultValue={singleShift.shift_from} name="shift_from" required type="text" className="form-control"readOnly />
                            </div>
                            <div className="form-group">
                                <label>Shift To</label>
                                <input defaultValue={singleShift.shift_to} name="shift_to" required type="text" className="form-control"readOnly />
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
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Edit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={onModalFormSubmit}>
                        <div className="card-body">
                            <div className="form-group">
                                <label>Id</label>
                                <input defaultValue={editShift.id} onChange={onModalInputChange} name="id" type="text" className="form-control" readOnly required/>
                            </div>
                            <div className="form-group">
                                <label>Shift Name</label>
                                <input defaultValue={editShift.shift_name} onChange={onModalInputChange} name="shift_name"  type="text" className="form-control" required/>
                            </div>
                            <div className="form-group">
                                <label>Shift From</label>
                                <input defaultValue={editShift.shift_from} onChange={onModalInputChange} name="shift_from"  type="time" className="form-control" required />
                            </div>
                            <div className="form-group">
                                <label>Shift To</label>
                                <input defaultValue={editShift.shift_to} onChange={onModalInputChange} name="shift_to"  type="time" className="form-control" required />
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
            <div className='content-wrapper'>
                <section class="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className='col-md-12'>
                                {/* left column */}
                                <div className="card card-primary">
                                    <div className="card-header">
                                        <h3 className="card-title">Shift</h3>
                                    </div>
                                    {/* /.card-header */}
                                    {/* form start */}
                                    <form onSubmit={onFormSubmit}>
                                        <div className="card-body">
                                            <div className="form-group">
                                                <label >Shift</label>
                                                <input name="shift_name" onChange={onInputChange} type="text" className="form-control" required />
                                            </div>
                                            <div className="form-group">
                                                <label >From Time</label>
                                                <input name="shift_from" onChange={onInputChange} type="time" className="form-control" required />
                                            </div>
                                            <div className="form-group">
                                                <label >To Time</label>
                                                <input name="shift_to" onChange={onInputChange} type="time" className="form-control" required />
                                            </div>
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
                                            <DataGrid rows={rows===undefined?[]:rows} columns={columns} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div></>
    )
}

export default DesignerHeadShift
