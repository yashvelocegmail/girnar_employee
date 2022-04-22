import axios from 'axios'
import { api_url } from '../ApiUrl';
import React, { useEffect, useState } from 'react'
import Header from '../../Header'
import Menu from '../../Menu'
import { toast } from 'react-toastify';
import { DataGrid } from '@mui/x-data-grid';
import { Modal, Button, Form } from "react-bootstrap";

function DesignerHeadSiteMaster() {
    //Modal Settings
    const [showModal, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showModal1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    //States
    const [branch, setBranch] = useState({
        branch_name: "",
        address:""
    });
    const [readBranch, setReadBranch] = useState({
        id: "",
        branch_name: "",
        address:""
    });
    const [modalBranch, setModalBranch] = useState({
        id: "",
        branch_name: "",
        address:""
    });
    const [singleBranch, setSingleBranch] = useState({
        id: "",
        branch_name: "",
        address:""
    });
    //Create
    const onInputChange = (e) => {
        setBranch({ ...branch, [e.target.name]: e.target.value })
    }
    const onFormSubmit = (e) => {
        e.preventDefault();
        axios.post(api_url+"create_branch.php", branch)
            .then(() => {
                axios.get(api_url+"read_branch.php")
                    .then((res) => {
                        toast.configure();
                        toast.success("Inserted Successfully");
                        setReadBranch(res.data);
                    })
            })
        document.getElementById("branchForm").reset();
    }
    //Read
    useEffect(() => {
        axios.get(api_url+"read_branch.php")
            .then((res) => {
                setReadBranch(res.data);
            })
    }, [])
    //Single Read
    const onRead = (row) => {
        handleShow1();
        setSingleBranch({
            id:row.id,
            branch_name:row.branch_name,
            address:row.address
        })
    }
    //Edit and Update
    const onEdit = (row) => {
        handleShow();
        setModalBranch({
            id:row.id,
            branch_name:row.branch_name,
            address:row.address
        })
    }
    const onModalInputChange=(e)=>
    {
        setModalBranch({ ...modalBranch, [e.target.name]: e.target.value })
    }
    const onModalFormSubmit=(e)=>
    {
        e.preventDefault();
        axios.post(api_url+"update_branch.php",modalBranch)
        .then((res) => {
            toast.configure();
            toast.warning("Updated Successfully");
            axios.get(api_url+"read_branch.php")
                .then((res) => {
                    setReadBranch(res.data);
                })
        })
        handleClose();
    }
    //Delete
    const onDelete = (rowid) => {
        axios.post(api_url+"delete_branch.php",{id:rowid})
        .then((res) => {
            toast.configure();
            toast.error("Deleted Successfully");
            axios.get(api_url+"read_branch.php")
                .then((res) => {
                    setReadBranch(res.data);
                })
        })
    }
    //Material Type
    const columns = [
        {
            field: "id",
            headerName: "Id"
        },
        {
            field: "branch_name",
            headerName: "Site Name",
            width:150
        },
        {
            field: "address",
            headerName: "Address",
            width:150
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
    const rows = readBranch.data;
    return (
        <>
            <Header />
            <Menu />
            <Modal show={showModal1} onHide={handleClose1}>
                <Modal.Header>
                    <Modal.Title>Details Read</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <div className="card-body">
                            <div className="form-group">
                                <label>Id</label>
                                <input defaultValue={singleBranch.id} name="id" type="text" className="form-control" readOnly/>
                            </div>
                            <div className="form-group">
                                <label>Site Name</label>
                                <input defaultValue={singleBranch.branch_name} name="branch_name" type="text" className="form-control" required readOnly/>
                            </div>
                            <div className="form-group">
                                <label>Address</label>
                                <input defaultValue={singleBranch.address} name="address" type="text" className="form-control" required readOnly/>
                            </div>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose1}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Details Read</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={onModalFormSubmit}>
                        <div className="card-body">
                            <div className="form-group">
                                <label>Id</label>
                                <input onChange={onModalInputChange} defaultValue={modalBranch.id} name="id" type="text" className="form-control" readOnly/>
                            </div>
                            <div className="form-group">
                                <label>Site Name</label>
                                <input onChange={onModalInputChange} defaultValue={modalBranch.branch_name} name="branch_name" required type="text" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Address</label>
                                <input onChange={onModalInputChange} defaultValue={modalBranch.address} name="address" required type="text" className="form-control" />
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
                                        <h3 className="card-title">Site Master</h3>
                                    </div>
                                    {/* /.card-header */}
                                    {/* form start */}
                                    <form id="branchForm" onSubmit={onFormSubmit}>
                                        <div className="card-body">
                                            <div className="form-group">
                                                <label >Site Name</label>
                                                <input onChange={onInputChange} name="branch_name" type="text" className="form-control" required/>
                                            </div>
                                        
                                            <div className="form-group">
                                                <label >Address</label>
                                                <input onChange={onInputChange} name="address" type="text" className="form-control" required/>
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
                                        <h3 class="card-title">Site Master</h3>
                                    </div>
                                    <div class="card-body">
                                        <div style={{ height: 300, width: '100%' }}>
                                            <DataGrid rows={rows} columns={columns} />
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

export default DesignerHeadSiteMaster
