import React, { useState, useEffect } from 'react'
import Header from '../../Header'
import Menu from '../../Menu'
import axios from 'axios'
import { api_url } from '../ApiUrl';
import { DataGrid } from '@mui/x-data-grid';
import { toast } from 'react-toastify';
import { Modal, Button } from "react-bootstrap";

function DesignerLeaveTracker() {
    const [showModal, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showModalImage, setShowImage] = useState(false);
    const handleCloseImage = () => setShowImage(false);
    const [parameter, setParameter] = useState(false);
    const handleShowImage = () => setShowImage(true);
    const zoomImage = (parameter) => {
        setParameter(parameter);
        handleShowImage();
    }
    const [leaveTracker, setLeaveTracker] = useState({
        employee:"",
        leave_from: "",
        leave_to: "",
        reason: "",
        approval: "",
        applied_on: "",
        attachment: ""
    });
    const [modalLeaveTracker, setModalLeaveTracker] = useState({
        id:"",
        employee:"",
        leave_from: "",
        leave_to: "",
        reason: "",
        approval: "",
        applied_on: "",
        attachment: ""
    });
    useEffect(() => {
        axios.post(api_url+"read_leave_tracker_hr.php")
            .then((res) => {
                console.log(res);
                setLeaveTracker(res.data);
            })
    },[])

    const onEdit=(row)=>{
        console.log(row);
        handleShow();
        setModalLeaveTracker({
            id:row.id,
            employee:row.employee,
            leave_from:row.leave_from,
            leave_to:row.leave_to,
            reason:row.reason,
            approval:row.approval,
            applied_on:row.applied_on,
            attachment:row.attachment
        })
    }
    const onModalInputChange=(e)=>{
        if(e.target.name==="attachment")
        {
            setModalLeaveTracker({...modalLeaveTracker,attachment:e.target.files[0]})
        }
        else
        {
            setModalLeaveTracker({...modalLeaveTracker,[e.target.name]:e.target.value})
        }
        
    }
    const onModalFormSubmit=(e)=>
    {
        e.preventDefault();
        const formData = new FormData();
        formData.append('id', modalLeaveTracker.id);
        formData.append('employee', modalLeaveTracker.employee);
        formData.append('leave_from', modalLeaveTracker.leave_from);
        formData.append('leave_to', modalLeaveTracker.leave_to);
        formData.append('reason', modalLeaveTracker.reason);
        formData.append('approval', modalLeaveTracker.approval);
        formData.append('applied_on', modalLeaveTracker.applied_on);
        formData.append('attachment', modalLeaveTracker.attachment);
        axios.post(api_url+"update_leave_tracker_hr.php",formData)
        .then(()=>{
            axios.post(api_url+"create_monthly_leaves.php",{employee:modalLeaveTracker.employee,leave_from:modalLeaveTracker.leave_from,leave_to:modalLeaveTracker.leave_to})
            axios.post(api_url+"read_leave_tracker_hr.php")
            .then((res) => {
                toast.configure();
                toast.warning("Record Updated");
                console.log(res);
                setLeaveTracker(res.data);
            })
        })
        handleClose();
    }
    const onDelete=(rowid)=>{
        axios.post('http://localhost/girnar_backend/api/delete_leave_tracker_hr.php',{id:rowid})
        .then(()=>{
            axios.post(api_url+"read_leave_tracker_hr.php")
            .then((res) => {
                toast.configure();
                toast.error("Record Deleted");
                console.log(res);
                setLeaveTracker(res.data);
            })
        })
    }

        const columns = [
        {
            field: "id",
            headerName: "ID",
        },
        {
            field: "emp_name",
            headerName: "Employee",
        },
        {
            field: "leave_from",
            headerName: "Leave From",
            width:200,
        },
        {
            field: "leave_to",
            headerName: "Leave To",
        },
        {
            field: "reason",
            headerName: "Reason",
        },
        // {
        //     field: "approval",
        //     headerName: "Approval",
        // },
        {
            field: "approval",
            width: 200,
            headerName: "Approval",
            renderCell: (params) => {
                if(params.row.approval==="requested")
                {
                    return (
                        <>
                            <p><small class="badge badge-warning">{params.row.approval}</small></p>
                        </>
                    )
                }
                else
                {
                    return (
                        <>
                            <p><small class="badge badge-success">{params.row.approval}</small></p>
                        </>
                    )
                }
            }
        },
        {
            field: "applied_on",
            headerName: "Applied On",
        },
        {
            field: "attachment",
            width: 200,
            headerName: "Attachment",
            renderCell: (params) => {
                return (
                    <>
                        <img onClick={() => zoomImage(params.row.attachment)} height={30} width={30} src={`http://localhost:80/girnar_backend/assets/images/${params.row.attachment}`} />
                    </>
                )
            }
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="">
                        <button onClick={() => onEdit(params.row)} data-toggle="tooltip" title="Edit" type="button" className="btn btn-warning"  ><i class="far fa-edit"></i></button>
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
    const rows = leaveTracker.data;
    return (
        <>
            <Header />
            <Menu />
            <Modal show={showModalImage} onHide={handleCloseImage}>
                <Modal.Header>
                    <Modal.Title>Image</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img width="450" height="450" src={`http://localhost:80/girnar_backend/assets/images/${parameter}`} />
                </Modal.Body>
            </Modal>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Edit Customer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={onModalFormSubmit}>
                        <div className='form-group'>
                            <label>Id</label>
                            <input onChange={onModalInputChange} defaultValue={modalLeaveTracker.id} className='form-control' type="text" name="id" readOnly/>
                        </div>
                        <div className='form-group'>
                            <label>Employee</label>
                            <input onChange={onModalInputChange} defaultValue={modalLeaveTracker.employee} className='form-control' type="text" name="employee" readOnly/>
                        </div>
                        <div className='form-group'>
                            <label>Leave From</label>
                            <input onChange={onModalInputChange} defaultValue={modalLeaveTracker.leave_from} className='form-control' type="date" name="leave_from" />
                        </div>
                        <div className='form-group'>
                            <label>Leave To</label>
                            <input onChange={onModalInputChange} defaultValue={modalLeaveTracker.leave_to} className='form-control' type="date" name="leave_to" />
                        </div>
                        <div className='form-group'>
                            <label>Reason</label>
                            <input onChange={onModalInputChange} defaultValue={modalLeaveTracker.reason} className='form-control' type="text" name="reason" />
                        </div>
                        <div className='form-group'>
                            <label>Approval</label>
                            {/* <input onChange={onModalInputChange} defaultValue={modalLeaveTracker.approval} className='form-control' type="text" name="approval" /> */}
                            <select onChange={onModalInputChange} defaultValue={modalLeaveTracker.approval} className='form-control' name="approval">
                                <option>Select</option>
                                <option>requested</option>
                                <option>approved</option>
                            </select>
                        </div>
                        <div className='form-group'>
                            <label>Applied On</label>
                            <input onChange={onModalInputChange} defaultValue={modalLeaveTracker.applied_on} className='form-control' type="date" name="applied_on" />
                        </div>
                        <div className='form-group'>
                            <label>Attachment</label>
                            <input onChange={onModalInputChange} className='form-control' type="file" name="attachment" />
                        </div>
                        <div className='form-group'>
                            <input className='btn btn-primary' type="submit" value="Update" />
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
            <div className='content-wrapper'>
                <section class="content">
                    <div className="container-fluid">
                        <div className="row">
                            {/* left column */}
                            <div className="col-md-12">
                                <div class="card">
                                    <div class="card-header">
                                        <h3 class="card-title">Leave Tracker</h3>
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

export default DesignerLeaveTracker
