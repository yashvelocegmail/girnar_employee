import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Header from '../../Header'
import Menu from '../../Menu'
import { toast } from 'react-toastify';
import { DataGrid } from '@mui/x-data-grid';
import { Modal, Button, Form } from "react-bootstrap";
import { api_url } from '../ApiUrl';

function DesignerHeadEmployeeShift() {

    const [shiftOption, setShiftOption] = useState();
    const [employeeOption, setEmployeeOption] = useState();
    const [modalEmployeeOption, setModalEmployeeOption] = useState();

    //Modal Settings
    const [showModal, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showModal1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);

    //States
    const [empshift, setEmpShift] = useState({
        shift: "",
        employee: "",
        position: ""
    })
    const [readEmpShift, setReadEmpShift] = useState({
        id: "",
        shift: "",
        employee: "",
        position: ""
    })
    const [editEmpShift, setEditEmpShift] = useState({
        id: "",
        shift: "",
        employee: "",
        position: ""
    })
    const [singleEmpShift, setSingleEmpShift] = useState({
        id: "",
        shift: "",
        employee: "",
    })


    useEffect(() => {
        axios.get(api_url + "read_shift_name.php")
            .then((res) => {
                setShiftOption(res.data)
            })
    }, [])

    //Create
    const onInputChange = (e) => {
        if (e.target.name === "position") {
            axios.post(api_url + "read_employee_by_position.php", { position: e.target.value })
                .then((res) => {
                    setEmployeeOption(res.data)
                })
        }
        setEmpShift({ ...empshift, [e.target.name]: e.target.value })
    }
    const onModalInputChange = (e) => {
        if (e.target.name === "position") {
            axios.post(api_url + "read_employee_by_position.php", { position: e.target.value })
                .then((res) => {
                    setModalEmployeeOption(res.data)
                })
        }
        setEditEmpShift({ ...editEmpShift, [e.target.name]: e.target.value })
    }


    const onFormSubmit = (e) => {
        e.preventDefault();
        console.log(empshift);
        axios.post(api_url + "create_employee_shift.php", empshift)
            .then((result) => {
                axios.get(api_url + "read_employee_shift.php")
                    .then((res) => {
                        setReadEmpShift(res.data)
                    })
                toast.configure();
                toast.success(result.data.messsage);
            })
    }
    //Read
    useEffect(() => {
        axios.get(api_url + "read_employee_shift.php")
            .then((res) => {
                setReadEmpShift(res.data)
            })
    }, [])
    const columns = [
        {
            field: "id",
            headerName: "ID",
            align: 'center'
        },
        {
            field: "shift_name",
            headerName: "Shift Time",
            width: 150
        },
        {
            field: "name",
            headerName: "Employee Name",
            width: 150
        },
        {
            field: "position",
            headerName: "Employee Position",
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
    const rows = readEmpShift.data;
    const onRead = (row) => {
        handleShow1()
        setSingleEmpShift({
            id: row.id,
            shift_name: row.shift_name,
            name: row.name
        })
    }
    //Update
    const onEdit = (row) => {
        console.log(row)
        handleShow()
        setEditEmpShift({
            id: row.id,
            shift: row.shift,
            employee: row.employee,
            position: row.position
        })
        axios.post(api_url + "read_employee_by_position.php", { position: row.position })
            .then((res) => {
                setModalEmployeeOption(res.data)
            })
    }

    const onModalFormSubmit = (e) => {
        e.preventDefault();
        axios.post(api_url+"update_employee_shift.php", editEmpShift)
            .then(() => {
                axios.get(api_url + "read_employee_shift.php")
                    .then((res) => {
                        setReadEmpShift(res.data)
                    })
                toast.configure();
                toast.warning("Successfully Updated");
            })
        handleClose();
    }
    const onDelete = (id) => {
        axios.post(api_url+"delete_employee_shift.php", { id: id })
            .then(() => {
                axios.get(api_url + "read_employee_shift.php")
                    .then((res) => {
                        setReadEmpShift(res.data)
                    })
                toast.configure();
                toast.error("Successfully Deleted");
            })
    }

    return (
        <>
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
                                <label>ID</label>
                                <input defaultValue={singleEmpShift.id} name="id" type="text" className="form-control" readOnly />
                            </div>
                            <div className="form-group">
                                <label>Shift Timing</label>
                                <input defaultValue={singleEmpShift.shift_name} name="shift" type="text" className="form-control" readOnly />
                            </div>
                            <div className="form-group">
                                <label>Employee Name</label>
                                <input defaultValue={singleEmpShift.name} name="employee" required type="text" className="form-control" readOnly />
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
                                <input defaultValue={editEmpShift.id} onChange={onModalInputChange} name="id" type="text" className="form-control" readOnly required/>
                            </div>
                            <label>Shift</label>
                            <select defaultValue={editEmpShift.shift} className='form-control' name="shift" required onChange={onModalInputChange}>
                                <option>Select</option>
                                {shiftOption === undefined ? [] : shiftOption.data.map((shift) => (
                                    <option value={shift.id} key={shift.id}>{shift.shift_name}</option>
                                ))}
                            </select>
                            <label className='mt-3'>Position</label>
                            <select defaultValue={editEmpShift.position} className='form-control' name='position' required onChange={onModalInputChange}>
                                <option>Select</option>
                                <option>designer</option>
                                <option>hr</option>
                                <option>programmer</option>
                                <option>machine_operator</option>
                                <option>stock_manager</option>
                                <option>designer_head</option>
                            </select>
                            <label className='mt-3'>Employee Name</label>
                            <select value={editEmpShift.employee} className='form-control' name="employee" required onChange={onModalInputChange}>
                                <option>Select</option>
                                {modalEmployeeOption === undefined ? [] : modalEmployeeOption.data.map((employee) => (
                                    <option value={employee.id} key={employee.id}>{employee.name}</option>
                                ))}
                            </select>
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
                                        <h3 className="card-title">Shift</h3>
                                    </div>
                                    {/* /.card-header */}
                                    {/* form start */}
                                    <form onSubmit={onFormSubmit}>
                                        <div className="card-body">
                                            <div className="form-group">


                                                <label>Shift</label>
                                                <select className='form-control' name="shift" required onChange={onInputChange}>
                                                    <option>Select</option>
                                                    {shiftOption === undefined ? [] : shiftOption.data.map((shift) => (
                                                        <option value={shift.id} key={shift.id}>{shift.shift_name}</option>
                                                    ))}
                                                </select>

                                                <label className='mt-3'>Position</label>
                                                <select className='form-control' name='position' required onChange={onInputChange}>
                                                    <option>Select</option>
                                                    <option>designer</option>
                                                    <option>programmer</option>
                                                    <option>machine_operator</option>
                                                    <option>stock_manager</option>
                                                    <option>designer_head</option>
                                                </select>

                                                <label className='mt-3'>Employee Name</label>
                                                <select className='form-control' name="employee" required onChange={onInputChange}>
                                                    <option>Select</option>
                                                    {employeeOption === undefined ? [] : employeeOption.data.map((employee) => (
                                                        <option value={employee.id} key={employee.id}>{employee.name}</option>
                                                    ))}
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
                        <div className='row'>
                            <div className='col-md-12'>
                                <div class="card">
                                    <div class="card-header">
                                        <h3 class="card-title"><b>Employee Shift</b></h3>
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
            </div>
        </>
    )
}

export default DesignerHeadEmployeeShift
