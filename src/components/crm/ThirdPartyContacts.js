import React, { useState, useEffect } from 'react'
import { Modal, Button } from "react-bootstrap";
import Header from '../../Header';
import Menu from '../../Menu';
import { DataGrid } from '@mui/x-data-grid';
import axios from "axios";
import { toast } from 'react-toastify';
import { api_url } from '../ApiUrl';

function ThirdPartyContacts() {
    const [showModal, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showModal1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    //States
    const [thirdParty, setThirdParty] = useState({
        name: "",
        email: "",
        mobile_number: "",
        type_of_operation: ""
    });
    const [readThirdParty, setReadThirdParty] = useState({
        id: "",
        name: "",
        email: "",
        mobile_number: "",
        type_of_operation: ""
    });
    const [modalThirdParty, setModalThirdParty] = useState({
        id: "",
        name: "",
        email: "",
        mobile_number: "",
        type_of_operation: ""
    });
    const [singleReadThirdParty, setSingleReadThirdParty] = useState({
        id: "",
        name: "",
        email: "",
        mobile_number: "",
        type_of_operation: ""
    });
    const onInputChange = (e) => {
        setThirdParty({ ...thirdParty, [e.target.name]: e.target.value });
    }
    //Create Operation
    const onFormSubmit = (e) => {
        e.preventDefault();
        axios.post(api_url+"create_third_party.php", thirdParty)
            .then(() => {
                toast.configure();
                toast.success("Inserted Successfully");
                axios.get(api_url+"read_third_party.php")
                    .then((res) => {
                        console.log(res.data);
                        setReadThirdParty(res.data)
                    })
            })
    }
    //Read Operation
    useEffect(() => {
        axios.get(api_url+"read_third_party.php")
            .then((res) => {
                console.log(res.data);
                setReadThirdParty(res.data)
            })
    }, [])
    //Read Operation
    const onRead = (row) => {
        handleShow1();
        setSingleReadThirdParty({
            id:row.id,
            name:row.name,
            email:row.email,
            mobile_number:row.mobile_number,
            type_of_operation:row.type_of_operation
        });
    }
    //Edit Operation
    const onEdit = (row) => {
        handleShow();
        setModalThirdParty({
            id: row.id,
            name: row.name,
            email: row.email,
            mobile_number: row.mobile_number,
            type_of_operation: row.type_of_operation
        });
    }
    //Handle Edit
    const onModalInputChange = (e) => {
        setModalThirdParty({ ...modalThirdParty, [e.target.name]: e.target.value });
    }
    //Update Operation
    const onModalFormSubmit = (e) => {
        e.preventDefault();
        axios.post(api_url+"update_third_party.php", modalThirdParty)
            .then(() => {
                toast.configure();
                toast.warning("Updated Successfully")
                handleClose();
                axios.get(api_url+"read_third_party.php")
                    .then((res) => {
                        console.log(res.data);
                        setReadThirdParty(res.data)
                    })
            })
    }
    //Delete Operation
    const onDelete = (rowid) => {
        axios.post(api_url+"delete_third_party.php",{id:rowid})
        .then(()=>{
            toast.configure();
            toast.error("Deleted Successfully")
            axios.get(api_url+"read_third_party.php")
                    .then((res) => {
                        console.log(res.data);
                        setReadThirdParty(res.data)
                    })
        })
    }
    //Material Table Setting
    const columns = [
        {
            field: "id",
            headerName: "ID",
        },
        {
            field: "name",
            headerName: "Name",
        },
        {
            field: "email",
            headerName: "Email",
        },
        {
            field: "mobile_number",
            headerName: "Mobile Number",
        },
        {
            field: "type_of_operation",
            headerName: "Type Of Operation",
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
    const rows = readThirdParty.data;
    console.log(rows);
    return (
        <>
            <Header />
            <Menu />
            <div className='content-wrapper'>
            <Modal show={showModal1} onHide={handleClose1}>
                    <Modal.Header>
                        <Modal.Title>Details Read</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="card-body">
                                <div className="form-group">
                                    <label>Id</label>
                                    <input defaultValue={singleReadThirdParty.id} name="id" type="text" className="form-control" readOnly />
                                </div>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input defaultValue={singleReadThirdParty.name} name="name" type="text" className="form-control" readOnly />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input defaultValue={singleReadThirdParty.email} name="email" type="text" className="form-control" readOnly/>
                                </div>
                                <div className="form-group">
                                    <label>Mobile Number</label>
                                    <input defaultValue={singleReadThirdParty.mobile_number} name="mobile_number" type="text" className="form-control" readOnly/>
                                </div>
                                <div className='form-group'>
                                    <label>Type Of operation</label>
                                    <input defaultValue={singleReadThirdParty.type_of_operation} name="type_of_operation" type="text" className="form-control" readOnly/>
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
                        <Modal.Title>Details Update</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={onModalFormSubmit}>
                            <div className="card-body">
                                <div className="form-group">
                                    <label>Id</label>
                                    <input onChange={onModalInputChange} defaultValue={modalThirdParty.id} name="id" type="text" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input onChange={onModalInputChange} defaultValue={modalThirdParty.name} name="name" type="text" className="form-control" pattern="^[a-zA-Z\s-]+$" title="Please enter Alphabets." />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input onChange={onModalInputChange} defaultValue={modalThirdParty.email} name="email" type="text" className="form-control" pattern="^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$" title="Please enter valid email address"  />
                                </div>
                                <div className="form-group">
                                    <label>Mobile Number</label>
                                    <input onChange={onModalInputChange} defaultValue={modalThirdParty.mobile_number} name="mobile_number" type="text" className="form-control" pattern="[789][0-9]{9}" title="Please enter valid mobile no" />
                                </div>
                                <div className='form-group'>
                                    <label>Type Of operation</label>
                                    <select onChange={onModalInputChange} defaultValue={modalThirdParty.type_of_operation} name="type_of_operation" className='form-control'>
                                        <option>Select</option>
                                        <option>Machining</option>
                                        <option>Grinding</option>
                                    </select>
                                </div>
                            </div>

                            <div class="card-footer">
                                <button type="submit" class="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                <section class="content">
                    <div className="container-fluid">
                        <div className="row">
                            {/* left column */}
                            <div className="col-md-12">
                                <div className="card card-primary">
                                    <div className="card-header">
                                        <h3 className="card-title">Third Party</h3>
                                    </div>
                                    {/* /.card-header */}
                                    {/* form start */}
                                    <form onSubmit={onFormSubmit}>
                                        <div className="card-body">
                                            <div className="form-group">
                                                <label >Name</label>
                                                <input onChange={onInputChange} name="name" type="text" className="form-control" placeholder="Enter part name" pattern="^[a-zA-Z\s-]+$" title="Please enter Alphabets." required/>
                                            </div>
                                            <div className="form-group">
                                                <label >Email</label>
                                                <input onChange={onInputChange} name="email" type="text" className="form-control" placeholder="Enter part quantity"  pattern="^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$" title="Please enter valid email address" required />
                                            </div>
                                            <div className="form-group">
                                                <label >Mobile Number</label>
                                                <input onChange={onInputChange} name="mobile_number" type="text" className="form-control" placeholder="Enter part dimension" pattern="[789][0-9]{9}" title="Please enter valid mobile no" required />
                                            </div>
                                            <div className="form-group">
                                                <label >Type Of Operation</label>
                                                <select onChange={onInputChange} name="type_of_operation" className='form-control' required>
                                                    <option>Select</option>
                                                    <option>Machining</option>
                                                    <option>Grinding</option>
                                                </select>
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
                    </div>
                </section>
                <section class="content">
                    <div className="container-fluid">
                        <div className="row">
                            {/* left column */}
                            <div className="col-md-12">
                                <div class="card">
                                    <div class="card-header">
                                        <h3 class="card-title">Third Party</h3>
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
            </div>
        </>
    )
}

export default ThirdPartyContacts
