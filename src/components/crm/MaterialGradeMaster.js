import axios from 'axios'
import { api_url } from '../ApiUrl';
import React, { useEffect, useState } from 'react'
import Header from '../../Header'
import Menu from '../../Menu'
import { toast } from 'react-toastify';
import { DataGrid } from '@mui/x-data-grid';
import { Modal, Button, Form } from "react-bootstrap";

function MaterialGradeMaster() {
    //Modal Settings
    const [showModal, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showModal1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    //States
    const [materialGrade, setMaterialGrade] = useState({
        material_type: ""
    });
    const [readMaterialGrade, setReadMaterialGrade] = useState({
        id: "",
        material_type: ""
    });
    const [modalMaterialGrade, setModalMaterialGrade] = useState({
        id: "",
        material_type: ""
    });
    const [singleMaterialGrade, setSingleMaterialGrade] = useState({
        id: "",
        material_type: ""
    });
    //Create
    const onInputChange = (e) => {
        setMaterialGrade({ ...materialGrade, [e.target.name]: e.target.value })
    }
    const onFormSubmit = (e) => {
        e.preventDefault();
        axios.post(api_url+"create_material_grade.php", materialGrade)
            .then(() => {
                axios.get(api_url+"read_material_grade.php")
                    .then((res) => {
                        toast.configure();
                        toast.success("Inserted Successfully");
                        setReadMaterialGrade(res.data);
                    })
            })
    }
    //Read
    useEffect(() => {
        axios.get(api_url+"read_material_grade.php")
            .then((res) => {
                setReadMaterialGrade(res.data);
            })
    }, [])
    //Single Read
    const onRead = (row) => {
        handleShow1();
        setSingleMaterialGrade({
            id:row.id,
            material_grade:row.material_grade
        })
    }
    //Edit and Update
    const onEdit = (row) => {
        handleShow();
        setModalMaterialGrade({
            id:row.id,
            material_grade:row.material_grade
        })
    }
    const onModalInputChange=(e)=>
    {
        setModalMaterialGrade({ ...modalMaterialGrade, [e.target.name]: e.target.value })
    }
    const onModalFormSubmit=(e)=>
    {
        e.preventDefault();
        axios.post(api_url+"update_material_grade.php",modalMaterialGrade)
        .then((res) => {
            toast.configure();
            toast.warning("Updated Successfully");
            axios.get(api_url+"read_material_grade.php")
                .then((res) => {
                    setReadMaterialGrade(res.data);
                })
        })
        handleClose();
    }
    //Delete
    const onDelete = (rowid) => {
        axios.post(api_url+"delete_material_grade.php",{id:rowid})
        .then((res) => {
            toast.configure();
            toast.error("Deleted Successfully");
            axios.get(api_url+"read_material_grade.php")
                .then((res) => {
                    setReadMaterialGrade(res.data);
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
            field: "material_grade",
            headerName: "Material Grade",
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
    const rows = readMaterialGrade.data;
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
                                <input defaultValue={singleMaterialGrade.id} name="id" type="text" className="form-control" readOnly/>
                            </div>
                            <div className="form-group">
                                <label>Material Grade</label>
                                <input defaultValue={singleMaterialGrade.material_grade} name="material_type" type="text" className="form-control" pattern="[a-zA-Z]*" readOnly/>
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
                                <input onChange={onModalInputChange} defaultValue={modalMaterialGrade.id} name="id" type="text" className="form-control" readOnly/>
                            </div>
                            <div className="form-group">
                                <label>Material Grade</label>
                                <input onChange={onModalInputChange} defaultValue={modalMaterialGrade.material_grade} name="material_grade" type="text" className="form-control" required pattern="^[a-zA-Z\s-]+$" title="Please enter Alphabets." />
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
                                        <h3 className="card-title">Material Grade Master</h3>
                                    </div>
                                    {/* /.card-header */}
                                    {/* form start */}
                                    <form onSubmit={onFormSubmit}>
                                        <div className="card-body">
                                            <div className="form-group">
                                                <label >Material Grade</label>
                                                <input onChange={onInputChange} name="material_grade" type="text" className="form-control"  title="Please enter Alphabets." required pattern="^[a-zA-Z\s-]+$" title="Please enter Alphabets."/>
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
                                        <h3 class="card-title">Material Grade</h3>
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

export default MaterialGradeMaster
