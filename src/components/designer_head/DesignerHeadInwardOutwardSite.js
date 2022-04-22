import axios from 'axios'
import { api_url } from '../ApiUrl';
import React, { useEffect, useState } from 'react'
import Header from '../../Header'
import Menu from '../../Menu'
import { toast } from 'react-toastify';
import { DataGrid } from '@mui/x-data-grid';
import { Modal, Button, Form } from "react-bootstrap";

function DesignerHeadInwardOutwardSite() {
    //Modal Settings
    const [showModal, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showModal1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    //States
    const [siteOption, setSiteOption] = useState();
    const [workOrderOption, setWorkOrderOption] = useState();
    const [inwardOutwardSite, setInwardOutwardSite] = useState({
        inward_site: "",
        outward_site: "",
        work_order: "",
        inward_date: "",
        inward_time: "",
        outward_date: "",
        outward_time: ""
    });
    const [readInwardOutwardSite, setReadInwardOutwardSite] = useState({
        id: "",
        inward_site: "",
        outward_site: "",
        work_order: "",
        inward_date: "",
        inward_time: "",
        outward_date: "",
        outward_time: ""
    });
    const [editInwardOutwardSite, setEditInwardOutwardSite] = useState({
        id: "",
        inward_site: "",
        outward_site: "",
        work_order: "",
        inward_date: "",
        inward_time: "",
        outward_date: "",
        outward_time: ""
    });
    const [singleInwardOutwardSite, setSingleInwardOutwardSite] = useState({
        id: "",
        inward_site: "",
        outward_site: "",
        work_order: "",
        inward_date: "",
        inward_time: "",
        outward_date: "",
        outward_time: ""
    });
    //Option Setting
    useEffect(() => {
        axios.get(api_url + "read_branch.php")
            .then((res) => {
                setSiteOption(res.data)
            })
        axios.get(api_url + "read_work_order_by_crm.php")
            .then((res) => {
                setWorkOrderOption(res.data)
            })
    }, [])
    //Create
    const onInputChange = (e) => {
        setInwardOutwardSite({ ...inwardOutwardSite, [e.target.name]: e.target.value })
    }
    const onFormSubmit = (e) => {
        e.preventDefault();
        axios.post(api_url + "create_inward_outward_site.php", inwardOutwardSite)
            .then((res) => {
                toast.configure();
                toast.success(res.data.messsage);
                axios.get(api_url + "read_inward_outward_site.php")
                    .then((res) => {
                        setReadInwardOutwardSite(res.data);
                    })
            })
    }
    //Read
    useEffect(() => {
        axios.get(api_url + "read_inward_outward_site.php")
            .then((res) => {
                setReadInwardOutwardSite(res.data);
            })
    }, [])
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
    const rows = readInwardOutwardSite.data;
    //Single
    const onRead = (row) => {
        handleShow1();
        setSingleInwardOutwardSite({
            id: row.id,
            inward_site: row.inward_site,
            outward_site: row.outward_site,
            work_order: row.work_order,
            inward_date: row.inward_date,
            inward_time: row.inward_time,
            outward_date: row.outward_date,
            outward_time: row.outward_time
        })
    }
    //Edit
    const onEdit = (row) => {
        handleShow();
        setEditInwardOutwardSite({
            id: row.id,
            inward_site: row.inward_site,
            outward_site: row.outward_site,
            work_order: row.work_order,
            inward_date: row.inward_date,
            inward_time: row.inward_time,
            outward_date: row.outward_date,
            outward_time: row.outward_time
        })
    }
    const onModalInputChange = (e) => {
        setEditInwardOutwardSite({ ...editInwardOutwardSite, [e.target.name]: e.target.value })
    }
    const onModalFormSubmit=(e)=>{
        e.preventDefault();
        axios.post(api_url+"update_inward_outward_site.php",editInwardOutwardSite)
        .then((res)=>{
            console.log(res.data.message)
            toast.configure();
            toast.warning(res.data.message)
            axios.get(api_url + "read_inward_outward_site.php")
            .then((res) => {
                setReadInwardOutwardSite(res.data);
            })
        })
        handleClose()
    }
    //Delete
    const onDelete = (rowid) => {
        axios.post(api_url+"delete_inward_outward_site.php",{id:rowid})
        .then((res)=>{
           
            toast.configure();
            toast.error(res.data.message)
            axios.get(api_url + "read_inward_outward_site.php")
            .then((res) => {
                setReadInwardOutwardSite(res.data);
            })
        })
    }
    //Inward
    const onInward = (row) => {
        var today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        axios.post(api_url + "inward_inward_outward_site.php", { id: row.id, inward_date: date, inward_time: time })
            .then((res) => {
                console.log("Updated")
                axios.get(api_url + "read_inward_outward_site.php")
                    .then((res) => {
                        setReadInwardOutwardSite(res.data);
                    })
            })
    }
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
                                <label >Inward Site</label>
                                <input type="text" name="id" className="form-control" defaultValue={editInwardOutwardSite.id} readOnly />
                            </div>
                            <div className="form-group">
                                <label >Inward Site</label>
                                <select defaultValue={editInwardOutwardSite.inward_site} onChange={onModalInputChange} name="inward_site" className="form-control" required>
                                    <option value="">Select</option>
                                    {siteOption === undefined ? [] : siteOption.data.map((site) => (
                                        <option key={site.id} value={site.id}>{site.branch_name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label >Outward Site</label>
                                <select defaultValue={editInwardOutwardSite.outward_site} onChange={onModalInputChange} name="outward_site" className="form-control" required>
                                    <option value="">Select</option>
                                    {siteOption === undefined ? [] : siteOption.data.map((site) => (
                                        <option key={site.id} value={site.id}>{site.branch_name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label >Work Order</label>
                                <select defaultValue={editInwardOutwardSite.work_order} onChange={onModalInputChange} name="work_order" className="form-control" required>
                                    <option value="">Select</option>
                                    {workOrderOption === undefined ? [] : workOrderOption.data.map((work_order) => (
                                        <option key={work_order.id} value={work_order.id}>{work_order.work_order}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <div className="form-group">
                                        <label >Outward Date</label>
                                        <input defaultValue={editInwardOutwardSite.outward_date} onChange={onModalInputChange} type="date" name="outward_date" className='form-control'  />
                                    </div>

                                    <div className="form-group">
                                        <label >Outward Time</label>
                                        <input defaultValue={editInwardOutwardSite.outward_time} onChange={onModalInputChange} type="time" name="outward_time" className='form-control'  />
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className="form-group">
                                        <label >Inward Date</label>
                                        <input defaultValue={editInwardOutwardSite.inward_date} onChange={onModalInputChange} type="date" name="inward_date" className='form-control'  />
                                    </div>

                                    <div className="form-group">
                                        <label >Inward Time</label>
                                        <input defaultValue={editInwardOutwardSite.inward_time} onChange={onModalInputChange} type="time" name="inward_time" className='form-control'  />
                                    </div>
                                </div>
                            </div>
                        </div>
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
                                <label >Inward Site</label>
                                <input type="text" name="id" className="form-control" defaultValue={singleInwardOutwardSite.id} readOnly />
                            </div>
                            <div className="form-group">
                                <label >Inward Site</label>
                                <select defaultValue={singleInwardOutwardSite.inward_site} name="inward_site" className="form-control" required readOnly>
                                    <option value="">Select</option>
                                    {siteOption === undefined ? [] : siteOption.data.map((site) => (
                                        <option key={site.id} value={site.id}>{site.branch_name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label >Outward Site</label>
                                <select defaultValue={singleInwardOutwardSite.outward_site} name="outward_site" className="form-control" required readOnly>
                                    <option value="">Select</option>
                                    {siteOption === undefined ? [] : siteOption.data.map((site) => (
                                        <option key={site.id} value={site.id}>{site.branch_name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label >Work Order</label>
                                <select defaultValue={singleInwardOutwardSite.work_order} name="work_order" className="form-control" required readOnly>
                                    <option value="">Select</option>
                                    {workOrderOption === undefined ? [] : workOrderOption.data.map((work_order) => (
                                        <option key={work_order.id} value={work_order.id}>{work_order.work_order}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <div className="form-group">
                                        <label >Outward Date</label>
                                        <input defaultValue={singleInwardOutwardSite.outward_date} type="date" name="outward_date" className='form-control'   readOnly/>
                                    </div>

                                    <div className="form-group">
                                        <label >Outward Time</label>
                                        <input defaultValue={singleInwardOutwardSite.outward_time}  type="time" name="outward_time" className='form-control'  readOnly />
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className="form-group">
                                        <label >Inward Date</label>
                                        <input defaultValue={singleInwardOutwardSite.inward_date} type="date" name="inward_date" className='form-control'  readOnly />
                                    </div>

                                    <div className="form-group">
                                        <label >Inward Time</label>
                                        <input defaultValue={singleInwardOutwardSite.inward_time} type="time" name="inward_time" className='form-control'  readOnly />
                                    </div>
                                </div>
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
                                        <h3 className="card-title">Inward Outward Site</h3>
                                    </div>
                                    {/* /.card-header */}
                                    {/* form start */}
                                    <form onSubmit={onFormSubmit}>
                                        <div className="card-body">
                                            <div className="form-group">
                                                <label >Inward Site</label>
                                                <select onChange={onInputChange} name="inward_site" className="form-control" required>
                                                    <option value="">Select</option>
                                                    {siteOption === undefined ? [] : siteOption.data.map((site) => (
                                                        <option key={site.id} value={site.id}>{site.branch_name}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="form-group">
                                                <label >Outward Site</label>
                                                <select onChange={onInputChange} name="outward_site" className="form-control" required>
                                                    <option value="">Select</option>
                                                    {siteOption === undefined ? [] : siteOption.data.map((site) => (
                                                        <option key={site.id} value={site.id}>{site.branch_name}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="form-group">
                                                <label >Work Order</label>
                                                <select onChange={onInputChange} name="work_order" className="form-control" required>
                                                    <option value="">Select</option>
                                                    {workOrderOption === undefined ? [] : workOrderOption.data.map((work_order) => (
                                                        <option key={work_order.id} value={work_order.id}>{work_order.work_order}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            {/* <div className='row'>
                                                <div className='col-md-6'>
                                                    <div className="form-group">
                                                        <label >Inward Date</label>
                                                        <input onChange={onInputChange} type="date" name="inward_date" className='form-control' required />
                                                    </div>

                                                    <div className="form-group">
                                                        <label >Inward Time</label>
                                                        <input onChange={onInputChange} type="time" name="inward_time" className='form-control' required />
                                                    </div>
                                                </div>
                                                <div className='col-md-6'>
                                                    <div className="form-group">
                                                        <label >Outward Date</label>
                                                        <input onChange={onInputChange} type="date" name="outward_date" className='form-control' required />
                                                    </div>

                                                    <div className="form-group">
                                                        <label >Outward Time</label>
                                                        <input onChange={onInputChange} type="time" name="outward_time" className='form-control' required />
                                                    </div>
                                                </div>
                                            </div> */}
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
                                        <h3 class="card-title">Inward Outward Site</h3>
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

export default DesignerHeadInwardOutwardSite
