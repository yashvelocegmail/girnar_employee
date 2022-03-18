import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Header from '../../Header'
import Menu from '../../Menu'
import { api_url } from '../ApiUrl';
import { DataGrid } from '@mui/x-data-grid';
import { Modal, Button, Form } from "react-bootstrap";

function HrmsEmployeeSalary() {
    const [showModal1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);

    const [showModal, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //States for option
    const [salary, setSalary] = useState({
        id: "",
        employee: "",
        salary: "",
        no_of_leaves: "",
        salary_deduction: "",
        gross_salary: "",
        month: ""
    });
    const [editSalary, setEditSalary] = useState({
        id: "",
        employee: "",
        salary: "",
        no_of_leaves: "",
        salary_deduction: "",
        gross_salary: "",
        month: ""
    });
    const [singleSalary, setSingleSalary] = useState({
        id: "",
        employee: "",
        salary: "",
        no_of_leaves: "",
        salary_deduction: "",
        gross_salary: "",
        month: ""
    });
    const [monthOption, setMonthOption] = useState();
    const [employeeOption, setEmployeeOption] = useState();
    //States
    const [employee, setEmployee] = useState({
        id: "",
        account_no: "",
        address: "",
        adhaar_no: "",
        bank_name: "",
        branch: "",
        email: "",
        ifsc: "",
        mobile: "",
        name: "",
        pan_no: "",
        photo: "",
        position: "",
        salary: "",
        users: ""
    });
    const [noOfLeaves, setNoOfLeaves] = useState({
        no_of_leaves: ""
    });
    const [monthlyLeaves, setMonthlyLeaves] = useState({
        salary_deduction: "",
        gross_salary: ""
    });
    useEffect(() => {
        axios.post(api_url + "read_employee_user.php")
            .then((res) => {
                setEmployeeOption(res.data);
            })
        // axios.post(api_url + "read_monthly_leaves_by_month.php")
        //     .then((res) => {

        //     })
    }, [])



    const onEmployeeChange = (e) => {
        setMonthlyLeaves({})
        setEmployee(e.target.value);
        axios.post(api_url + "read_single_employee_by_id.php", { id: e.target.value })
            .then((res) => {
                setEmployee(res.data.data[0])
                axios.post(api_url + "read_monthly_leaves_by_month.php", { employee: e.target.value, month: monthOption })
                    .then((res) => {
                        //console.log(res.data.itemcount)
                        if (res.data.itemcount === 0) {
                            setNoOfLeaves({ no_of_leaves: 0 })
                        }
                        else {
                            setNoOfLeaves({ no_of_leaves: res.data.data[0].no_of_leaves })
                        }

                    })
            })

        //console.log(monthlyLeaves.data[0].no_of_leaves)
    }
    const onCalculateSalary = (e) => {

        e.preventDefault();
        const salary_deduction = (parseInt(employee.salary)) / 30 * noOfLeaves.no_of_leaves;
        const gross_salary = parseInt(employee.salary) - salary_deduction
        console.log("no_of_leaves", noOfLeaves.no_of_leaves)
        console.log("salary", employee.salary)
        console.log("salary_deduction", salary_deduction)
        console.log("gross_salary", gross_salary)
        setMonthlyLeaves({
            salary_deduction: salary_deduction,
            gross_salary: gross_salary
        })
    }
    const onFormSubmit = (e) => {
        e.preventDefault();
        setMonthlyLeaves({})
        setNoOfLeaves({})
        setEmployee({})
        setMonthOption("0")
        console.log(monthlyLeaves)
        axios.post(api_url + "create_employee_salary.php", { employee: employee.id, no_of_leaves: noOfLeaves.no_of_leaves, month: monthOption, salary: employee.salary, salary_deduction: monthlyLeaves.salary_deduction, gross_salary: monthlyLeaves.gross_salary })
            .then(() => {
                console.log("Inserted")
                axios.post(api_url + "read_employee_salary.php")
                    .then((res) => {
                        setSalary(res.data)
                    })
            })

            document.getElementById("empsalary").reset();            
    }

    const onGrossSalaryChange = (e) => {
        setMonthlyLeaves({ ...monthlyLeaves, gross_salary: e.target.value })
    }
    const onMonthChange = (e) => {
        setMonthOption("")
        setMonthlyLeaves({})
        setNoOfLeaves({})
        setEmployee([])
        setMonthOption(e.target.value)
    }
    //Read Function
    useEffect(() => {
        setTimeout(() => {
            axios.get(api_url + "read_employee_salary.php")
                .then((res) => {
                    setSalary(res.data)
                })
        }, 1000)

    }, [])
    //Single Read 
    const onRead = (row) => {
        handleShow1();
        setSingleSalary({
            id: row.id,
            employee: row.employee,
            salary: row.salary,
            no_of_leaves: row.no_of_leaves,
            salary_deduction: row.salary_deduction,
            gross_salary: row.gross_salary,
            month: row.month
        })
    }
    //Edit
    const onEdit = (row) => {
        handleShow();
        setEditSalary({
            id: row.id,
            employee: row.employee,
            month: row.month,
            no_of_leaves: row.no_of_leaves,
            salary: row.salary,
            salary_deduction: row.salary_deduction,
            gross_salary: row.gross_salary,
        })
    }
    const onModalInputChange = (e) => {
        setEditSalary({ ...editSalary, [e.target.name]: e.target.value })
    }
    const onModalFormSubmit = (e) => {
        e.preventDefault()
        axios.post(api_url + "update_employee_salary.php", editSalary)
            .then(() => {
                console.log("Edited")
                axios.post(api_url + "read_employee_salary.php")
                    .then((res) => {
                        setSalary(res.data)
                    })
            })
        handleClose();
    }
    //Delete
    const onDelete = (rowid) => {
        axios.post(api_url + "delete_employee_salary.php", {id:rowid})
        .then(() => {
            console.log("Deleted")
            axios.post(api_url + "read_employee_salary.php")
                .then((res) => {
                    setSalary(res.data)
                })
        })
    }
    const columns = [
        {
            field: "id",
            headerName: "Id"
        },
        {
            field: "name",
            headerName: "Employee",
            width: 150
        },
        {
            field: "no_of_leaves",
            headerName: "No Of Leaves",
            width: 150
        },
        // {
        //     field: "month",
        //     headerName: "Month",
        //     width: 150
        // },
        // {
        //     field: "salary",
        //     headerName: "Salary",
        //     width: 150
        // },
        {
            field: "salary_deduction",
            headerName: "Salary Deduction",
            width: 150
        },
        {
            field: "gross_salary",
            headerName: "Gross Salary",
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
    const rows = salary===[]?[]:salary.data
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
                                <input defaultValue={singleSalary.id} name="id" type="text" className="form-control" readOnly />
                            </div>
                            <div className="form-group">
                                <label>Month</label>
                                {/* <input defaultValue={editSalary.month} name="material_type" type="text" className="form-control" required readOnly/> */}
                                <select defaultValue={singleSalary.month} className='form-control' name="month" readOnly>
                                    <option disabled={true}>Select</option>
                                    <option disabled={true} value="1">January</option>
                                    <option disabled={true} value="2">February</option>
                                    <option disabled={true} value="3">March</option>
                                    <option disabled={true} value="4">April</option>
                                    <option disabled={true} value="5">May</option>
                                    <option disabled={true} value="6">June</option>
                                    <option disabled={true} value="7">July</option>
                                    <option disabled={true} value="8">August</option>
                                    <option disabled={true} value="9">September</option>
                                    <option disabled={true} value="10">October</option>
                                    <option disabled={true} value="11">November</option>
                                    <option disabled={true} value="12">December</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Employee</label>
                                {/* <input onChange={onModalInputChange} defaultValue={editSalary.employee} name="employee" type="text" className="form-control" required readOnly /> */}
                                <select defaultValue={singleSalary.employee} className="form-control" name="employee"  readOnly>
                                    <option disabled={true}>Select</option>
                                    {employeeOption === undefined ? [] : employeeOption.data.map((employee) => (
                                        <option disabled={true} key={employee.id} value={employee.id}>{employee.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>No Of Leaves</label>
                                <input defaultValue={singleSalary.no_of_leaves} name="no_of_leaves" type="text" className="form-control" required readOnly />
                            </div>
                            <div className="form-group">
                                <label>Salary</label>
                                <input defaultValue={singleSalary.salary} name="salary" type="text" className="form-control" required readOnly />
                            </div>
                            <div className="form-group">
                                <label>Salary Deduction</label>
                                <input defaultValue={singleSalary.salary_deduction} name="salary_deduction" type="text" className="form-control" required readOnly />
                            </div>
                            <div className="form-group">
                                <label>Gross Salary</label>
                                <input defaultValue={singleSalary.gross_salary} name="gross_salary" type="text" className="form-control" required readOnly/>
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
                    <Form onSubmit={onModalFormSubmit}>
                        <div className="card-body">
                            <div className="form-group">
                                <label>Id</label>
                                <input onChange={onModalInputChange} defaultValue={editSalary.id} name="id" type="text" className="form-control" readOnly />
                            </div>
                            <div className="form-group">
                                <label>Month</label>
                                {/* <input defaultValue={editSalary.month} name="material_type" type="text" className="form-control" required readOnly/> */}
                                <select onChange={onModalInputChange} value={editSalary.month} className='form-control' name="month" readOnly>
                                    <option disabled={true} value="0">Select</option>
                                    <option disabled={true} value="1">January</option>
                                    <option disabled={true} value="2">February</option>
                                    <option disabled={true} value="3">March</option>
                                    <option disabled={true} value="4">April</option>
                                    <option disabled={true} value="5">May</option>
                                    <option disabled={true} value="6">June</option>
                                    <option disabled={true} value="7">July</option>
                                    <option disabled={true} value="8">August</option>
                                    <option disabled={true} value="9">September</option>
                                    <option disabled={true} value="10">October</option>
                                    <option disabled={true} value="11">November</option>
                                    <option disabled={true} value="12">December</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Employee</label>
                                {/* <input onChange={onModalInputChange} defaultValue={editSalary.employee} name="employee" type="text" className="form-control" required readOnly /> */}
                                <select value={editSalary.employee} className="form-control" name="employee" onChange={onModalInputChange} readOnly>
                                    <option disabled={true}>Select</option>
                                    {employeeOption === undefined ? [] : employeeOption.data.map((employee) => (
                                        <option disabled={true} key={employee.id} value={employee.id}>{employee.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>No Of Leaves</label>
                                <input onChange={onModalInputChange} defaultValue={editSalary.no_of_leaves} name="no_of_leaves" type="text" className="form-control" required readOnly />
                            </div>
                            <div className="form-group">
                                <label>Salary</label>
                                <input onChange={onModalInputChange} defaultValue={editSalary.salary} name="salary" type="text" className="form-control" required readOnly />
                            </div>
                            <div className="form-group">
                                <label>Salary Deduction</label>
                                <input onChange={onModalInputChange} defaultValue={editSalary.salary_deduction} name="salary_deduction" type="text" className="form-control" required readOnly />
                            </div>
                            <div className="form-group">
                                <label>Gross Salary</label>
                                <input onChange={onModalInputChange} defaultValue={editSalary.gross_salary} name="gross_salary" type="text" className="form-control" required />
                            </div>
                            <div class="form-group">
                                <button type="submit" class="btn btn-primary">Submit</button>
                            </div>
                        </div>
                    </Form>
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
                                        <h3 className="card-title">Employee Salary</h3>
                                    </div>
                                    {/* /.card-header */}
                                    {/* form start */}
                                    <form onSubmit={onFormSubmit} id="empsalary">
                                        <div className="card-body">
                                            <div className="form-group">
                                                <label>Month</label>
                                                <select onChange={onMonthChange} className="form-control" name="month">
                                                    <option value="o">Select</option>
                                                    <option value="1">January</option>
                                                    <option value="2">February</option>
                                                    <option value="3">March</option>
                                                    <option value="4">April</option>
                                                    <option value="5">May</option>
                                                    <option value="6">June</option>
                                                    <option value="7">July</option>
                                                    <option value="8">August</option>
                                                    <option value="9">September</option>
                                                    <option value="10">October</option>
                                                    <option value="11">November</option>
                                                    <option value="12">December</option>
                                                </select>
                                                <label >Employee</label>
                                                <select className="form-control" name="employee" onChange={onEmployeeChange}>
                                                    <option>Select</option>
                                                    {employeeOption === undefined ? [] : employeeOption.data.map((employee) => (
                                                        <option key={employee.id} value={employee.id}>{employee.name}</option>
                                                    ))}
                                                </select>
                                                <label >Bank Name</label>
                                                <input defaultValue={employee === undefined ? "" : employee.bank_name} type="text" className='form-control' name="bank_name" readOnly />
                                                <label >Branch Name</label>
                                                <input defaultValue={employee === undefined ? "" : employee.branch} type="text" className='form-control' name="branch_name" readOnly />
                                                <label >IFSC</label>
                                                <input defaultValue={employee === undefined ? "" : employee.ifsc} type="text" className='form-control' name="ifsc" readOnly />
                                                <label >Account Number</label>
                                                <input defaultValue={employee === undefined ? "" : employee.account_no} type="text" className='form-control' name="account_number" readOnly />
                                                <label >Salary</label>
                                                <input defaultValue={employee === undefined ? "" : employee.salary} type="text" className='form-control' name="salary" readOnly />
                                                <label >No Of Leaves</label>
                                                <input defaultValue={noOfLeaves === undefined ? "" : noOfLeaves.no_of_leaves} type="text" className='form-control' name="no_of_leaves" readOnly />
                                                <button onClick={onCalculateSalary} className="btn btn-success">Calcualte Salary</button><br />
                                                <label >Salary Deduction</label>
                                                <input defaultValue={monthlyLeaves === undefined ? "" : monthlyLeaves.salary_deduction} type="text" className='form-control' name="salary_deduction" readOnly />
                                                <label >Gross Salary</label>
                                                <input onChange={onGrossSalaryChange} value={monthlyLeaves === [] ? "" : monthlyLeaves.gross_salary} type="text" className='form-control' name="gross_salary" />

                                            </div>
                                        </div>
                                        {/* /.card-body */}
                                        <div className="card-footer">
                                            <button type="submit" className="btn btn-primary">Submit</button>
                                            {/* <button type="reset" onClick={onReset} type="submit" className="btn btn-primary">Reset</button> */}
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-12'>
                                <div class="card">
                                    <div class="card-header">
                                        <h3 class="card-title">Employee Salary</h3>
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

export default HrmsEmployeeSalary