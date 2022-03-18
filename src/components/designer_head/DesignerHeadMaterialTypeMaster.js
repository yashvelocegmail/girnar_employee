import axios from 'axios'
import { api_url } from '../ApiUrl';
import React, { useEffect, useState } from 'react'
import Header from '../../Header'
import Menu from '../../Menu'
import { toast } from 'react-toastify';
import { DataGrid } from '@mui/x-data-grid';
import { Modal, Button, Form } from "react-bootstrap";

function DesignerHeadMaterialTypeMaster() {
    //Modal Settings
    const [showModal, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showModal1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    //States
    const [materialType, setMaterialType] = useState({
        material_type: ""
    });
    const [readMaterialType, setReadMaterialType] = useState({
        id: "",
        material_type: ""
    });
    const [modalMaterialType, setModalMaterialType] = useState({
        id: "",
        material_type: ""
    });
    const [singleMaterialType, setSingleMaterialType] = useState({
        id: "",
        material_type: ""
    });
    //Create
    const onInputChange = (e) => {
        setMaterialType({ ...materialType, [e.target.name]: e.target.value })
    }
    const onFormSubmit = (e) => {
        e.preventDefault();
        axios.post(api_url+"create_material_type.php", materialType)
            .then(() => {
                axios.get(api_url+"read_material_type.php")
                    .then((res) => {
                        toast.configure();
                        toast.success("Inserted Successfully");
                        setReadMaterialType(res.data);
                    })
            })
    }
    //Read
    useEffect(() => {
        axios.get(api_url+"read_material_type.php")
            .then((res) => {
                setReadMaterialType(res.data);
            })
    }, [])
    //Single Read
    const onRead = (row) => {
        handleShow1();
        setSingleMaterialType({
            id:row.id,
            material_type:row.material_type
        })
    }
    //Edit and Update
    const onEdit = (row) => {
        handleShow();
        setModalMaterialType({
            id:row.id,
            material_type:row.material_type
        })
    }
    const onModalInputChange=(e)=>
    {
        setModalMaterialType({ ...modalMaterialType, [e.target.name]: e.target.value })
    }
    const onModalFormSubmit=(e)=>
    {
        e.preventDefault();
        axios.post(api_url+"update_material_type.php",modalMaterialType)
        .then((res) => {
            toast.configure();
            toast.warning("Updated Successfully");
            axios.get(api_url+"read_material_type.php")
                .then((res) => {
                    setReadMaterialType(res.data);
                })
        })
        handleClose();
    }
    //Delete
    const onDelete = (rowid) => {
        axios.post(api_url+"delete_material_type.php",{id:rowid})
        .then((res) => {
            toast.configure();
            toast.error("Deleted Successfully");
            axios.get(api_url+"read_material_type.php")
                .then((res) => {
                    setReadMaterialType(res.data);
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
            field: "material_type",
            headerName: "Material Type",
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
    const rows = readMaterialType.data;
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
                                <input defaultValue={singleMaterialType.id} name="id" type="text" className="form-control" readOnly/>
                            </div>
                            <div className="form-group">
                                <label>Material Type</label>
                                <input defaultValue={singleMaterialType.material_type} name="material_type" type="text" className="form-control" required pattern="^[a-zA-Z\s-]+$" title="Please enter Alphabets." readOnly/>
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
                                <input onChange={onModalInputChange} defaultValue={modalMaterialType.id} name="id" type="text" className="form-control" readOnly/>
                            </div>
                            <div className="form-group">
                                <label>Material Type</label>
                                <input onChange={onModalInputChange} defaultValue={modalMaterialType.material_type} name="material_type" required pattern="^[a-zA-Z\s-]+$" title="Please enter Alphabets." type="text" className="form-control" />
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
                                        <h3 className="card-title">Material Type Master</h3>
                                    </div>
                                    {/* /.card-header */}
                                    {/* form start */}
                                    <form onSubmit={onFormSubmit}>
                                        <div className="card-body">
                                            <div className="form-group">
                                                <label >Material Type</label>
                                                <input onChange={onInputChange} name="material_type" type="text" className="form-control"  required pattern="^[a-zA-Z\s-]+$" title="Please enter Alphabets."/>
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

export default DesignerHeadMaterialTypeMaster
