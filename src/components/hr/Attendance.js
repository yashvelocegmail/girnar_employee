import axios from 'axios'
import { api_url } from '../ApiUrl';
import React, { useEffect, useState } from 'react'
import Header from '../../Header'
import Menu from '../../Menu'
import { toast } from 'react-toastify';
import { DataGrid } from '@mui/x-data-grid';
import { Modal, Button, Form } from "react-bootstrap";

function Attendance() {
    const [showModal, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const openModal = () => {
        handleShow();
    }
    //States
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
    const [checkOutAttendance, setCheckOutAttendance] = useState({
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
    //Read
    useEffect(() => {
        const interval = setInterval(() => {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        axios.post(api_url+"read_check_in_approval.php",{date:date})
            .then((res) => {
                console.log(res.data)
                setAttendance(res.data);
            })
        axios.post(api_url+"read_check_out_approval.php",{date:date})
            .then((res) => {
                console.log(res.data)
                setCheckOutAttendance(res.data);
            })
        }, 1000);
        
        return () => clearInterval(interval);
    }, [attendance,checkOutAttendance])
    //Check In Approval
    const onCheckInApproval=(id)=>{
        axios.post(api_url+"check_in_approval.php",{id:id})
        .then(()=>{
            console.log("Checked In");
        })
    }
    const onCheckOutApproval=(id)=>{
        axios.post(api_url+"check_out_approval.php",{id:id})
        .then(()=>{
            console.log("Checked Out");
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
        // {
        //     field: 'check_out',
        //     headerName: 'Check Out',
        //     width:150
        // },
        // {
        //     field: 'completed_hrs',
        //     headerName: 'Completed Hours',
        //     width:150
        // },
        {
            field: 'late_hrs',
            headerName: 'Late Hours',
            width:150
        },
        {
            field: 'employee_name',
            headerName: 'Employee',
            width:150
        },
        {
            field: 'check_in_approval',
            headerName: 'Check In Approval',
            width:150
        },
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
                        <button onClick={() => onCheckInApproval(params.row.id)} data-toggle="tooltip" title="Read" type="button" className="btn btn-primary"  ><i class="fas fa-check"></i></button>
                        
                    </div>
                );
            }
        },
    ]
    const columns1 = [
        {
            field: 'id',
            headerName: 'Id'
        },
        {
            field: 'date',
            headerName: 'Date'
        },
        // {
        //     field: 'check_in',
        //     headerName: 'Check In',
        //     width:150
        // },
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
        // {
        //     field: 'late_hrs',
        //     headerName: 'Late Hours',
        //     width:150
        // },
        {
            field: 'employee',
            headerName: 'Employee',
            width:150
        },
        // {
        //     field: 'check_in_approval',
        //     headerName: 'Check In Approval',
        //     width:150
        // },
        {
            field: 'check_out_approval',
            headerName: 'Check Out Approval',
            width:170
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="">
                        <button onClick={() => onCheckOutApproval(params.row.id)} data-toggle="tooltip" title="Read" type="button" className="btn btn-primary"  ><i class="fas fa-check"></i></button>
                        
                    </div>
                );
            }
        },
    ]
    const rows = attendance.data;
    const rows1 = checkOutAttendance.data;
    return (
        <>
            <Header />
            <Menu />
            <div className='content-wrapper'>
                <section class="content">
                    <div className="container-fluid">
                        <div className="row">
                            {/* left column */}
                            <div className="col-md-12">
                                <div class="card">
                                    <div class="card-header">
                                        <h3 class="card-title">Attendance</h3>
                                    </div>
                                    <div class="card-body">
                                        <div style={{ height: 300, width: '100%' }}>
                                            <DataGrid rows={rows} columns={columns} />
                                        </div>
                                    </div>
                                    <div class="card-body">
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
        </>)
}

export default Attendance
