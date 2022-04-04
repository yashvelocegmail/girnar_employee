import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Header from '../../Header';
import Menu from '../../Menu';
import { api_url } from '../ApiUrl';
import { DataGrid } from '@mui/x-data-grid';
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from 'react-toastify';

function DesignerHeadPayment() {
    //Modal Settings
    const [showModal, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showModal1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    //States
    const [customerOption, setCustomerOption] = useState();
    const [purchaseOrderOption, setPurchaseOrderOption] = useState();
    const [editPurchaseOrderOption, setEditPurchaseOrderOption] = useState();
    const [payment, setPayment] = useState({
        customer: "",
        purchase_order: "",
        bill_amount: "",
        amount_received: "",
        amount_pending: ""
    })
    const [readPayment, setReadPayment] = useState({
        id: "",
        customer: "",
        purchase_order: "",
        bill_amount: "",
        amount_received: "",
        amount_pending: ""
    })
    const [editPayment, setEditPayment] = useState({
        id: "",
        customer: "",
        purchase_order: "",
        bill_amount: "",
        amount_received: "",
        amount_pending: ""
    })
    const [singlePayment, setSinglePayment] = useState({
        id: "",
        customer: "",
        purchase_order: "",
        bill_amount: "",
        amount_received: "",
        amount_pending: ""
    })
    //Read customer for option
    useEffect(() => {
        axios.get(api_url + "read_all_customers.php")
            .then((res) => {
                setCustomerOption(res.data);
            })
        axios.get(api_url + "read_purchase_order_crm.php")
            .then((res) => {
                setEditPurchaseOrderOption(res.data.data);
            })
    }, [])

    //Create Operation
    const onInputChange = (e) => {
        if (e.target.name === "customer") {
            axios.post(api_url + "read_purchase_order_customer.php", { customer: e.target.value })
                .then((res) => {
                    setPurchaseOrderOption(res.data.data);
                })
            setPayment({ ...payment, customer: e.target.value })
        }
        else {
            setPayment({ ...payment, [e.target.name]: e.target.value })
        }
    }
    const onFormSubmit = (e) => {
        e.preventDefault();
        console.log(payment);
        axios.post(api_url + "create_payment.php", payment)
            .then((res) => {
                toast.configure();
                toast.success("Created Successfully");
                console.log("created");
                axios.get(api_url + "read_payment.php")
                    .then((res) => {
                        setReadPayment(res.data);
                    })
            })
    }
    //Read
    useEffect(() => {
        axios.get(api_url + "read_payment.php")
            .then((res) => {
                setReadPayment(res.data);
            })
    }, [])
    //Single Read
    const onRead = (row) => {
        handleShow1();
        setSinglePayment({
            id: row.id,
            customer: row.customer,
            purchase_order: row.purchase_order,
            bill_amount: row.bill_amount,
            amount_received: row.amount_received,
            amount_pending: row.amount_pending
        })
    }
    const onEdit = (row) => {
        handleShow();
        setEditPayment({
            id: row.id,
            customer: row.customer,
            purchase_order: row.purchase_order,
            bill_amount: row.bill_amount,
            amount_received: row.amount_received,
            amount_pending: row.amount_pending
        })
    }
    const onModalInputChange = (e) => {
        if (e.target.name === "customer") {
            axios.post(api_url + "read_purchase_order_customer.php", { customer: e.target.value })
                .then((res) => {

                    setEditPurchaseOrderOption(res.data.data);
                })
            setEditPayment({ ...editPayment, customer: e.target.value })
        }
        else {
            setEditPayment({ ...editPayment, [e.target.name]: e.target.value })
        }
    }
    const onModalFormSubmit = (e) => {
        e.preventDefault();
        console.log(editPayment)
        axios.post(api_url + "update_payment.php", editPayment)
            .then((res) => {
                console.log("Updated");
                toast.configure();
                toast.warning("Updated Successfully");
                axios.get(api_url + "read_payment.php")
                    .then((res) => {
                        setReadPayment(res.data);
                    })
            })
            handleClose();
    }
    const onDelete = (rowid) => {
        axios.post(api_url+"delete_payment.php",{id:rowid})
        .then((res) => {
            toast.configure();
            toast.error("Deleted Successfully");
            axios.get(api_url+"read_payment.php")
                .then((res) => {
                    setReadPayment(res.data);
                })
        })
    }
    const columns = [
        {
            field: "id",
            headerName: "Id"
        },
        {
            field: "customer_name",
            headerName: "Customer",
            width: 150
        },
        {
            field: "purchase_order_name",
            headerName: "Purchase Order",
            width: 350
        },
        {
            field: "bill_amount",
            headerName: "Bill Amount"

        },
        {
            field: "amount_received",
            headerName: "Amount Received"
        },
        {
            field: "amount_pending",
            headerName: "Amount Pending"
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
    const rows = readPayment===undefined?[]:readPayment.data;
    return <>
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
                            <input defaultValue={singlePayment.id} name="id" type="text" className="form-control" readOnly  />
                        </div>
                        <div className="form-group">
                            <label>Customer</label>
                            <select className='form-control' name="customer" defaultValue={singlePayment.customer}>
                                <option>Select</option>
                                {customerOption === undefined ? [] : customerOption.data.map((customer) => (
                                    <option disabled={true} key={customer.id} value={customer.id}>{customer.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label >PO Id</label>
                            <select className='form-control' name="purchase_order" defaultValue={singlePayment.purchase_order} >
                                <option>Select</option>
                                {editPurchaseOrderOption === undefined ? [] : editPurchaseOrderOption.map((purchase_order) => (
                                    <option disabled={true} key={purchase_order.id} value={purchase_order.id}>{purchase_order.purchase_order}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label >Bill Amount</label>
                            <input type="number" name="bill_amount" className='form-control' defaultValue={singlePayment.bill_amount} readOnly />
                        </div>
                        <div className="form-group">
                            <label >Amount Received</label>
                            <input type="number" name="amount_received" className='form-control' defaultValue={singlePayment.amount_received} readOnly/>
                        </div>
                        <div className="form-group">
                            <label >Amount Pending</label>
                            <input type="number" name="amount_pending" className='form-control' defaultValue={singlePayment.amount_pending} readOnly/>
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
                            <input defaultValue={editPayment.id} name="id" type="text" className="form-control" readOnly onChange={onModalInputChange} required/>
                        </div>
                        <div className="form-group">
                            <label>Customer</label>
                            <select className='form-control' name="customer" defaultValue={editPayment.customer} onChange={onModalInputChange} required>
                                <option>Select</option>
                                {customerOption === undefined ? [] : customerOption.data.map((customer) => (
                                    <option key={customer.id} value={customer.id}>{customer.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label >PO Id</label>
                            <select className='form-control' name="purchase_order" defaultValue={editPayment.purchase_order} onChange={onModalInputChange} required>
                                <option>Select</option>
                                {editPurchaseOrderOption === undefined ? [] : editPurchaseOrderOption.map((purchase_order) => (
                                    <option key={purchase_order.id} value={purchase_order.id}>{purchase_order.purchase_order}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label >Bill Amount</label>
                            <input type="number" name="bill_amount" className='form-control' defaultValue={editPayment.bill_amount} onChange={onModalInputChange} required />
                        </div>
                        <div className="form-group">
                            <label >Amount Received</label>
                            <input type="number" name="amount_received" className='form-control' defaultValue={editPayment.amount_received} onChange={onModalInputChange} required />
                        </div>
                        <div className="form-group">
                            <label >Amount Pending</label>
                            <input type="number" name="amount_pending" className='form-control' defaultValue={editPayment.amount_pending} onChange={onModalInputChange} required />
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
                                    <h3 className="card-title">Payment</h3>
                                </div>
                                {/* /.card-header */}
                                {/* form start */}
                                <form onSubmit={onFormSubmit}>
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label >Customer</label>
                                            <select className='form-control' name="customer" onChange={onInputChange} required>
                                                <option>Select</option>
                                                {customerOption === undefined ? [] : customerOption.data.map((customer) => (
                                                    <option key={customer.id} value={customer.id}>{customer.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label >PO Id</label>
                                            <select className='form-control' name="purchase_order" onChange={onInputChange} required>
                                                <option>Select</option>
                                                {purchaseOrderOption === undefined ? [] : purchaseOrderOption.map((purchase_order) => (
                                                    <option key={purchase_order.id} value={purchase_order.id}>{purchase_order.purchase_order}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label >Bill Amount</label>
                                            <input type="number" name="bill_amount" className='form-control' onChange={onInputChange} required />
                                        </div>
                                        <div className="form-group">
                                            <label >Amount Received</label>
                                            <input type="number" name="amount_received" className='form-control' onChange={onInputChange} required />
                                        </div>
                                        <div className="form-group">
                                            <label >Amount Pending</label>
                                            <input type="number" name="amount_pending" className='form-control' onChange={onInputChange} required />
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
                                    <h3 class="card-title">Payment</h3>
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
        </div>
    </>
        ;
}

export default DesignerHeadPayment;
