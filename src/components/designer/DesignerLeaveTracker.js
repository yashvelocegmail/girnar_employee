import React, { useState, useEffect } from 'react'
import Header from '../../Header'
import Menu from '../../Menu'
import axios from 'axios'
import { api_url } from '../ApiUrl';
import { DataGrid } from '@mui/x-data-grid';
import { toast } from 'react-toastify';
import { Modal, Button } from "react-bootstrap";

function DesignerLeaveTracker() {
    const [showModalImage, setShowImage] = useState(false);
    const handleCloseImage = () => setShowImage(false);
    const [parameter, setParameter] = useState(false);
    const handleShowImage = () => setShowImage(true);
    const zoomImage = (parameter) => {
        setParameter(parameter);
        handleShowImage();
    }
    const [leaveTracker, setLeaveTracker] = useState({
        employee: localStorage.getItem("employee_id"),
        leave_from: "",
        leave_to: "",
        reason: "",
        //approval: "",
        //applied_on: "",
        attachment: ""
    });
    useEffect(() => {
        axios.post(api_url+"read_leave_tracker_employee.php", { employee: localStorage.getItem("employee_id") })
            .then((res) => {
                console.log(res);
                setLeaveTracker(res.data);
            })
    }, [])

    const onInputChange = (e) => {
        if (e.target.name === "attachment") {
            setLeaveTracker({ ...leaveTracker, attachment: e.target.files[0] })
        }
        else {
            setLeaveTracker({ ...leaveTracker, [e.target.name]: e.target.value })
        }
    }
    const onFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('employee', localStorage.getItem("employee_id"));
        formData.append('leave_from', leaveTracker.leave_from);
        formData.append('leave_to', leaveTracker.leave_to);
        formData.append('reason', leaveTracker.reason);
        // formData.append('approval', leaveTracker.approval);
        //formData.append('applied_on', leaveTracker.applied_on);
        formData.append('attachment', leaveTracker.attachment);
        axios.post(api_url+"create_leave_tracker.php", formData)
            .then(() => {
                toast.configure();
                toast.success('Successfully Inserted');
                axios.post(api_url+"read_leave_tracker_employee.php", { employee: localStorage.getItem("employee_id") })
                    .then((res) => {
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
            field: "employee",
            headerName: "Employee",
        },
        {
            field: "leave_from",
            headerName: "Leave From",
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
        }
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
            <div className='content-wrapper'>
                <section class="content">
                    <div className="container-fluid">
                        <div className="row">
                            {/* left column */}
                            <div className="col-md-12">
                                <div className="card card-primary">
                                    <div className="card-header">
                                        <h3 className="card-title">Leave Form</h3>
                                    </div>
                                    {/* /.card-header */}
                                    {/* form start */}
                                    <form onSubmit={onFormSubmit}>
                                        <div className="card-body">
                                            <div className='row'>
                                                <div className='col-md-12'>
                                                    <div className="form-group">
                                                        <label>Leave From</label>
                                                        <input type="date" className="form-control"
                                                            name="leave_from" onChange={onInputChange} required />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Leave To</label>
                                                        <input type="date" className="form-control" name="leave_to" onChange={onInputChange} required />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Reason</label>
                                                        <input type="text" className="form-control" name="reason" onChange={onInputChange} required />
                                                    </div>
                                                    {/* <div className="form-group">
                                                        <label>Approval</label>
                                                        <input type="text" className="form-control" name="approval" onChange={onInputChange} required />
                                                    </div> */}
                                                    {/* <div className="form-group">
                                                        <label>Applied On</label>
                                                        <input type="date" className="form-control" name="applied_on" onChange={onInputChange} required />
                                                    </div> */}
                                                    <div className="form-group">
                                                        <label>Attachment</label>
                                                        <input type="file" className="form-control" name="attachment" onChange={onInputChange} required />
                                                    </div>
                                                </div>
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
