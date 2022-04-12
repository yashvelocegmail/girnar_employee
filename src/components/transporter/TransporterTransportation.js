
import axios from 'axios'
import { api_url } from '../ApiUrl';
import React, { useEffect, useState } from 'react'
import Header from '../../Header'
import Menu from '../../Menu'
import { toast } from 'react-toastify';
import { DataGrid } from '@mui/x-data-grid';
import { Modal, Button, Form } from "react-bootstrap";

function TransporterTransportation() {
    //Modal Settings
    const [showModal, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showModal1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);

    //States
    const [workOrderOption, setWorkOrderOption] = useState();
    const [readTransportation, setReadTransportation] = useState({
        id: "",
        work_order: "",
        address: "",
        date: "",
        status: ""
    });
    const [modalTransportation, setModalTransportation] = useState({
        id: "",
        work_order: "",
        address: "",
        date: "",
        status: ""
    });
    const [singleTransportation, setSingleTransportation] = useState({
        id: "",
        work_order: "",
        address: "",
        date: "",
        status: ""
    });
    //Options
    useEffect(() => {
        axios.get(api_url + "read_work_order_by_crm.php")
            .then((res) => {
                setWorkOrderOption(res.data)
            })
    }, [])
    //Read
    useEffect(() => {
        axios.get(api_url + "read_transportation.php")
            .then((res) => {
                setReadTransportation(res.data);
            })
    }, [])
    //Single Read
    const onRead = (row) => {
        handleShow1();
        setSingleTransportation({
            id: row.id,
            work_order: row.work_order,
            address: row.address,
            date: row.date,
            status: row.status
        })
    }
    //Edit and Update
    const onEdit = (row) => {
        handleShow();
        setModalTransportation({
            id: row.id,
            work_order: row.work_order,
            address: row.address,
            date: row.date,
            status: row.status
        })
    }
    const onModalInputChange = (e) => {
        setModalTransportation({ ...modalTransportation, [e.target.name]: e.target.value })
    }
    const onModalFormSubmit = (e) => {
        e.preventDefault();
        axios.post(api_url + "update_transportation.php", modalTransportation)
            .then((res) => {
                toast.configure();
                toast.warning("Updated Successfully");
                axios.get(api_url + "read_transportation.php")
                    .then((res) => {
                        setReadTransportation(res.data);
                    })
            })
        handleClose();
    }

    //Material Type
    const columns = [
        {
            field: "id",
            headerName: "Id"
        },
        {
            field: "work_order_name",
            headerName: "Work Order",
            width: 350
        },
        {
            field: "address",
            headerName: "Address",
            width: 150
        },
        {
            field: "date",
            headerName: "Date",
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
                    </div>
                );
            }
        },
    ]
    const rows = readTransportation.data;
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
                                <input defaultValue={singleTransportation.id} name="id" type="text" className="form-control" readOnly />
                            </div>
                            <div className="form-group">
                                <label>Work Order</label>
                                <select defaultValue={singleTransportation.work_order} name="work_order" className="form-control" required readOnly>
                                    <option>Select</option>
                                    {workOrderOption === undefined ? [] : workOrderOption.data.map((work_order) => (
                                        <option key={work_order.id} value={work_order.id}>{work_order.work_order}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Address</label>
                                <input defaultValue={singleTransportation.address} name="address" type="text" className="form-control" required readOnly />
                            </div>
                            <div className="form-group">
                                <label>Status</label>
                                {/* <input defaultValue={singleTransportation.status} name="status" type="text" className="form-control" required readOnly /> */}
                                <select defaultValue={singleTransportation.status} name="status" className="form-control" required readOnly>
                                    <option>Select</option>
                                    <option value="assigned">Assigned</option>
                                    <option value="on_the_way">On The Way</option>
                                    <option value="delivered">Delivered</option>
                                </select>
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
                    <Modal.Title>Edit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={onModalFormSubmit}>
                        <div className="card-body">
                            <div className="form-group">
                                <label>Id</label>
                                <input onChange={onModalInputChange} defaultValue={modalTransportation.id} name="id" type="text" className="form-control" readOnly />
                            </div>
                            <div className="form-group">
                                <label>Work Order</label>
                                <select onChange={onModalInputChange} defaultValue={modalTransportation.work_order} name="work_order" className="form-control" required readOnly>
                                    <option value="">Select</option>
                                    {workOrderOption === undefined ? [] : workOrderOption.data.map((work_order) => (
                                        <option disabled={true} key={work_order.id} value={work_order.id}>{work_order.work_order}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Address</label>
                                <input onChange={onModalInputChange} defaultValue={modalTransportation.address} name="address" required type="text" className="form-control" readOnly/>
                            </div>
                            {/* <div className="form-group">
                                <label>Status</label>
                                <input onChange={onModalInputChange} defaultValue={modalTransportation.status} name="status" required type="text" className="form-control" />
                            </div> */}
                            <div className="form-group">
                                <label>Status</label>
                                <select onChange={onModalInputChange} defaultValue={modalTransportation.status} name="status" className="form-control" required>
                                    <option>Select</option>
                                    <option disabled={true} value="assigned">Assigned</option>
                                    <option value="on_the_way">On The Way</option>
                                    <option value="delivered">Delivered</option>
                                </select>
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
                        <div className='row'>
                            <div className='col-md-12'>
                                <div class="card">
                                    <div class="card-header">
                                        <h3 class="card-title">Transportation</h3>
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
            </div></>
    )
}

export default TransporterTransportation
