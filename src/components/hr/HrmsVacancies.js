import axios from 'axios'
import { api_url } from '../ApiUrl';
import React, { useEffect, useState } from 'react'
import Header from '../../Header'
import Menu from '../../Menu'
import { toast } from 'react-toastify';
import { DataGrid } from '@mui/x-data-grid';
import { Modal, Button, Form } from "react-bootstrap";

function HrmsVacancies() {
    //Modal Settings
    const [showModal, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showModal1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    //States
    const [vacancies, setVacancies] = useState({
        position: "",
        no_of_vacancies:0,
        skills:""
    });
    const [readVacancies, setReadVacancies] = useState({
        id: "",
        position: "",
        no_of_vacancies:0,
        skills:""
    });
    const [modalVacancies, setModalVacancies] = useState({
        id: "",
        position: "",
        no_of_vacancies:0,
        skills:""
    });
    const [singleVacancies, setSingleVacancies] = useState({
        id: "",
        position: "",
        no_of_vacancies:0,
        skills:""
    });
    //Create
    const onInputChange = (e) => {
        setVacancies({ ...vacancies, [e.target.name]: e.target.value })
    }
    const onFormSubmit = (e) => {
        e.preventDefault();
        axios.post(api_url+"create_vacancies.php", vacancies)
            .then(() => {
                axios.get(api_url+"read_vacancies.php")
                    .then((res) => {
                        toast.configure();
                        toast.success("Inserted Successfully");
                        setReadVacancies(res.data);
                    })
            })
    }
    //Read
    useEffect(() => {
        axios.get(api_url+"read_vacancies.php")
            .then((res) => {
                setReadVacancies(res.data);
            })
    }, [])
    //Single Read
    const onRead = (row) => {
        handleShow1();
        setSingleVacancies({
            id:row.id,
            position:row.position,
            no_of_vacancies:row.no_of_vacancies,
            skills:row.skills
        })
    }
    //Edit and Update
    const onEdit = (row) => {
        handleShow();
        setModalVacancies({
            id:row.id,
            position:row.position,
            no_of_vacancies:row.no_of_vacancies,
            skills:row.skills
        })
    }
    const onModalInputChange=(e)=>
    {
        setModalVacancies({ ...modalVacancies, [e.target.name]: e.target.value })
    }
    const onModalFormSubmit=(e)=>
    {
        e.preventDefault();
        axios.post(api_url+"update_vacancies.php",modalVacancies)
        .then((res) => {
            toast.configure();
            toast.warning("Updated Successfully");
            axios.get(api_url+"read_vacancies.php")
                .then((res) => {
                    setReadVacancies(res.data);
                })
        })
        handleClose();
    }
    //Delete
    const onDelete = (rowid) => {
        axios.post(api_url+"delete_vacancies.php",{id:rowid})
        .then((res) => {
            toast.configure();
            toast.error("Deleted Successfully");
            axios.get(api_url+"read_vacancies.php")
                .then((res) => {
                    setReadVacancies(res.data);
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
            field: "position",
            headerName: "Position",
            width:150
        },
        {
            field: "no_of_vacancies",
            headerName: "No Of Vacancies",
            width:150
        },
        {
            field: "skills",
            headerName: "Skills",
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
    const rows = readVacancies.data;
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
                                <input defaultValue={singleVacancies.id} name="id" type="text" className="form-control" readOnly/>
                            </div>
                            <div className="form-group">
                                <label>Position</label>
                                <input defaultValue={singleVacancies.position} name="position" type="text" className="form-control" required pattern="^[a-zA-Z\s-]+$" title="Please enter Alphabets." readOnly/>
                                <label>No Of Vacancies</label>
                                <input defaultValue={singleVacancies.no_of_vacancies} name="no_of_vacancies" type="number" className="form-control" required title="Please enter Alphabets." readOnly/>
                                <label>Skills</label>
                                <input defaultValue={singleVacancies.skills} name="skills" type="text" className="form-control" required  title="Please enter Alphabets." readOnly/>
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
                                <input onChange={onModalInputChange} defaultValue={modalVacancies.id} name="id" type="text" className="form-control" readOnly/>
                            </div>
                            <div className="form-group">
                                <label>Position</label>
                                <input onChange={onModalInputChange} defaultValue={modalVacancies.position} name="position" required pattern="^[a-zA-Z\s-]+$" title="Please enter Alphabets." type="text" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>No Of Vacancies</label>
                                <input onChange={onModalInputChange} defaultValue={modalVacancies.no_of_vacancies} name="no_of_vacancies" required title="Please enter Alphabets." type="number" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Skills</label>
                                <input onChange={onModalInputChange} defaultValue={modalVacancies.skills} name="skills" required title="Please enter Alphabets." type="text" className="form-control" />
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
                                                <label >Position</label>
                                                <input onChange={onInputChange} name="position" type="text" className="form-control"  required pattern="^[a-zA-Z\s-]+$" title="Please enter Alphabets."/>
                                            </div>
                                            <div className="form-group">
                                                <label >No Of Vacancies</label>
                                                <input onChange={onInputChange} name="no_of_vacancies" type="number" className="form-control" required title="Please enter Alphabets."/>
                                            </div>
                                            <div className="form-group">
                                                <label >Skills</label>
                                                <input onChange={onInputChange} name="skills" type="text" className="form-control"  required title="Please enter Alphabets."/>
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
                                        <h3 class="card-title">Vacancies</h3>
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

export default HrmsVacancies
