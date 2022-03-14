import axios from 'axios'
import React, { useState,useEffect } from 'react'
import Header from '../../Header'
import Menu from '../../Menu'
import { DataGrid } from '@mui/x-data-grid';
import { Modal, Button } from "react-bootstrap";
import { api_url } from '../ApiUrl';

function AttendanceReport() {
    //Modal Settings
    const [showModal, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showModal1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    //States
    const [employeeData,setEmployeeData] = useState();
    const [position,setPosition] = useState();
    const [employee,setEmployee] = useState();
    const [fromDate,setFromDate] = useState();
    const [toDate,setToDate] = useState();
    const [attendance, setAttendance] = useState({
        id:'',
        date: '',
        check_in: '',
        check_out: '',
        completed_hrs: '',
        late_hrs: '',
        employee: '',
        check_in_approval: '',
        check_out_approval: ''
    })
    const [singleAttendance, setSingleAttendance] = useState({
        id:'',
        date: '',
        check_in: '',
        check_out: '',
        completed_hrs: '',
        late_hrs: '',
        employee: '',
        check_in_approval: '',
        check_out_approval: ''
    })
    const [leaveTracker, setLeaveTracker] = useState({
        id:"",
        employee:"",
        leave_from: "",
        leave_to: "",
        reason: "",
        approval: "",
        applied_on: "",
        attachment: ""
    });
    const [singleLeaveTracker, setSingleLeaveTracker] = useState({
        id:"",
        employee:"",
        leave_from: "",
        leave_to: "",
        reason: "",
        approval: "",
        applied_on: "",
        attachment: ""
    });
    //Employee data
    // useEffect(()=>{
    //     axios.get(api_url+"read_employee_user.php")
    //     .then((res)=>{
    //         setEmployeeData(res.data);
    //     })
    // },[])
    //Search Functionality
    const onPositionChange=(e)=>
    {
        setPosition(e.target.value)
        axios.post(api_url+"read_employee_by_position.php",{position:e.target.value})
        .then((res)=>{
            setEmployeeData(res.data);
        })
    }
    const onEmployeeChange=(e)=>
    {
        setEmployee(e.target.value)
    }
    const onFromDateChange=(e)=>
    {
        setFromDate(e.target.value)
    }
    const onToDateChange=(e)=>
    {
        setToDate(e.target.value)
    }
    
    const onFormSubmit=(e)=>{
        e.preventDefault();
        console.log(employee,fromDate,toDate)
        axios.post(api_url+"search_employee_attendance.php",{position:position,employee:employee,fromDate:fromDate,toDate:toDate})
        .then((res)=>{
            setAttendance(res.data)
        })
        axios.post(api_url+"search_leave_tracker.php",{position:position,employee:employee,fromDate:fromDate,toDate:toDate})
        .then((res)=>{
            setLeaveTracker(res.data)
        })
    }
    //Read
    const onRead = (row) => {
        handleShow();
        setSingleAttendance({
            id: row.id,
            date: row.date,
            check_in: row.check_in,
            check_out: row.check_out,
            completed_hrs: row.completed_hrs,
            late_hrs: row.late_hrs,
            employee:row.employee,
            check_in_approval:row.check_in_approval,
            check_out_approval:row.check_out_approval
        })
    }
    const onRead1 = (row) => {
        console.log(row)
        handleShow1();
        setSingleLeaveTracker({
            id:row.id,
            employee:row.emp_name,
            leave_from: row.leave_from,
            leave_to: row.leave_to,
            reason: row.reason,
            approval: row.approval,
            applied_on: row.applied_on,
            attachment: row.attachment
        })
    }
    const columns = [
        {
            field: 'id',
            headerName: 'Id'
        },
        {
            field: 'date',
            headerName: 'Date'
        },
        {
            field: 'check_in',
            headerName: 'Check In',
            width:150
        },
        {
            field: 'check_out',
            headerName: 'Check Out',
            width:150
        },
        {
            field: 'completed_hrs',
            headerName: 'Completed Hours',
            width:150
        },
        {
            field: 'late_hrs',
            headerName: 'Late Hours',
            width:100
        },
        {
            field: 'employee_name',
            headerName: 'Employee',
            width:150
        },
        // {
        //     field: 'check_in_approval',
        //     headerName: 'Check In Approval',
        //     width:150
        // },
        // {
        //     field: 'check_out_approval',
        //     headerName: 'Check Out Approval',
        //     width:170
        // },
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="">
                        <button onClick={() => onRead(params.row)} data-toggle="tooltip" title="Read" type="button" className="btn btn-primary"  ><i class="far fa-eye"></i></button>
                    </div>
                );
            }
        },
    ]
    const rows = attendance.data;
    const columns1 = [
        {
            field: 'id',
            headerName: 'Id'
        },
        {
            field: 'emp_name',
            headerName: 'Employee'
        },
        {
            field: 'leave_from',
            headerName: 'Leave From',
            width:150
        },
        {
            field: 'leave_to',
            headerName: 'Leave To',
            width:150
        },
        // {
        //     field: 'reason',
        //     headerName: 'Reason',
        //     width:150
        // },
        {
            field: 'approval',
            headerName: 'Approval',
            width:150
        },
        {
            field: 'applied_on',
            headerName: 'Applied On',
            width:150
        },
        // {
        //     field: 'attachment',
        //     headerName: 'Attachment',
        //     width:150
        // },
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="">
                        <button onClick={() => onRead1(params.row)} data-toggle="tooltip" title="Read" type="button" className="btn btn-primary"  ><i class="far fa-eye"></i></button>
                    </div>
                );
            }
        },
    ]
    const rows1 = leaveTracker.data;
    return (
        <>
            <Header />
            <Menu />
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className='form-group'>
                            <label>Id</label>
                            <input defaultValue={singleAttendance.id} className='form-control' type="text" name="id" readOnly/>
                        </div>
                        <div className='form-group'>
                            <label>Date</label>
                            <input defaultValue={singleAttendance.date} className='form-control' type="date" name="date" readOnly/>
                        </div>
                        <div className='form-group'>
                            <label>Check In</label>
                            <input defaultValue={singleAttendance.check_in} className='form-control' type="text" name="check_in" readOnly/>
                        </div>
                        <div className='form-group'>
                            <label>Check Out</label>
                            <input defaultValue={singleAttendance.check_out} className='form-control' type="text" name="check_out" readOnly/>
                        </div>
                        <div className='form-group'>
                            <label>Completed Hrs</label>
                            <input defaultValue={singleAttendance.completed_hrs} className='form-control' type="text" name="completed_hrs" readOnly/>
                        </div>
                        
                        <div className='form-group'>
                            <label>Late Hrs</label>
                            <input defaultValue={singleAttendance.late_hrs} className='form-control' type="text" name="late_hrs" readOnly/>
                        </div>
                        <div className='form-group'>
                            <label>Check In Approval</label>
                            <input defaultValue={singleAttendance.check_in_approval} className='form-control' type="text" name="check_in_approval" readOnly/>
                        </div>
                        <div className='form-group'>
                            <label>Check Out Approval</label>
                            <input defaultValue={singleAttendance.check_out_approval} className='form-control' type="text" name="check_out_approval" readOnly/>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
            <Modal show={showModal1} onHide={handleClose1}>
                <Modal.Header>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className='form-group'>
                            <label>Id</label>
                            <input defaultValue={singleLeaveTracker.id} className='form-control' type="text" name="id" readOnly/>
                        </div>
                        <div className='form-group'>
                            <label>Employee</label>
                            <input defaultValue={singleLeaveTracker.employee} className='form-control' type="text" name="date" readOnly/>
                        </div>
                        <div className='form-group'>
                            <label>Leave From</label>
                            <input defaultValue={singleLeaveTracker.leave_from} className='form-control' type="date" name="check_in" readOnly/>
                        </div>
                        <div className='form-group'>
                            <label>Leave To</label>
                            <input defaultValue={singleLeaveTracker.leave_to} className='form-control' type="date" name="check_out" readOnly/>
                        </div>
                        <div className='form-group'>
                            <label>Reason</label>
                            <input defaultValue={singleLeaveTracker.reason} className='form-control' type="text" name="completed_hrs" readOnly/>
                        </div>
                        
                        <div className='form-group'>
                            <label>Approval</label>
                            <input defaultValue={singleLeaveTracker.approval} className='form-control' type="date" name="late_hrs" readOnly/>
                        </div>
                        <div className='form-group'>
                            <label>Applied On</label>
                            <input defaultValue={singleLeaveTracker.applied_on} className='form-control' type="text" name="check_in_approval" readOnly/>
                        </div>
                        <div className='form-group'>
                            {/* <input defaultValue={singleLeaveTracker.attachment} className='form-control' type="text" name="check_out_approval" readOnly/> */}
                            <img width="470" height="500" src={`http://localhost/girnar_backend/assets/images/${singleLeaveTracker.attachment}`}/>
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
                                <div className="card">
                                    <div className="card-header">
                                        <h3 class="card-title">Attendance And Leave Report</h3>
                                    </div>
                                    <div className='card-body'>
                                        <form onSubmit={onFormSubmit}>
                                            <div className='form-group'>
                                                <div className='row'>
                                                    <div className='col-md-3'>
                                                        <label>Position</label>
                                                        <select onChange={onPositionChange} name="position" className='form-control'>
                                                            <option>Select</option>
                                                            <option value="designer">Designer</option>
                                                            <option value="programmer">Programmer</option>
                                                            <option value="machine_operator">Machine Operator</option>
                                                            <option value="transporter">Transporter</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-md-3">

                                                        <label>Employee</label>
                                                        <select onChange={onEmployeeChange} name="employee" className='form-control'>
                                                            <option>Select</option>
                                                            {
                                                                employeeData===undefined?[]:employeeData.data.map((employee)=>(
                                                                    <option key={employee.id} value={employee.id}>{employee.name}</option>
                                                                ))
                                                            }
                                                        </select>

                                                    </div>
                                                    <div className="col-md-3">
                                                        <label>From Date</label>
                                                        <input name="fromDate" onChange={onFromDateChange} type="date" className='form-control' />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <label>To Date</label>
                                                        <input name="toDate"  onChange={onToDateChange} type="date" className='form-control' />
                                                    </div>
                                                </div><br />
                                                <div className='row'>
                                                    <div className='col-md-6'>
                                                        <button className='btn btn-primary'>Search</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div class="card-body">
                                        <h4>Attendance Report</h4>
                                        <div style={{ height: 300, width: '100%' }}>
                                            <DataGrid rows={rows} columns={columns} />
                                        </div>
                                        <h4>Leave Report</h4>
                                        <div style={{ height: 300, width: '100%' }}>
                                            <DataGrid rows={rows1} columns={columns1} />
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

export default AttendanceReport