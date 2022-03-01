import React, { useEffect, useState } from 'react'
import Header from '../../Header'
import Menu from '../../Menu'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Modal, Button } from "react-bootstrap";
import { toast } from 'react-toastify';


function HrmsEmployeeMaster() {
    const [showModal, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [showModalImage, setShowImage] = useState(false);
    const handleCloseImage = () => setShowImage(false);
    const [parameter,setParameter] = useState(false);
    const handleShowImage = () => setShowImage(true);
    const zoomImage = (parameter)=>
    {
        setParameter(parameter);
        handleShowImage();
    }
    const [readEmployee, setReadEmployee] = useState({
        id:"",
        name: "",
        email: "",
        mobile: "",
        address: "",
        position: "",
        username: "",
        password: "",
        user_type: "",
        adhaar_no: "",
        pan_no: "",
        bank_name: "",
        branch: "",
        ifsc: "",
        account_no: "",
        photo: "",
        salary: "",
    });
    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        mobile: "",
        address: "",
        position: "",
        username: "",
        password: "",
        user_type: "",
        adhaar_no: "",
        pan_no: "",
        bank_name: "",
        branch: "",
        ifsc: "",
        account_no: "",
        photo: "",
        salary: "",
    });
    const [modalEmployee, setModalEmployee] = useState({
        id: "",
        name: "",
        email: "",
        mobile: "",
        address: "",
        position: "",
        username: "",
        password: "",
        user_type: "",
        adhaar_no: "",
        pan_no: "",
        bank_name: "",
        branch: "",
        ifsc: "",
        account_no: "",
        photo: "",
        salary: "",
    });
    useEffect(() => {
        axios.get("http://localhost/girnar_backend/api/read_employee_user.php")
            .then((res) => {
                console.log(res.data);
                setReadEmployee(res.data)
            })
    }, [])
    const onHandleChange = (e) => {
        if(e.target.name==="photo")
        {
            setEmployee({...employee,photo:e.target.files[0]});
        }
        else
        {
            setEmployee({ ...employee, [e.target.name]: e.target.value })
        }
        console.log(employee);
    }
    const onFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', employee.name);
        formData.append('email', employee.email);
        formData.append('mobile', employee.mobile);
        formData.append('address', employee.address);
        formData.append('position', employee.position);
        formData.append('user_type', employee.user_type);
        formData.append('username', employee.username);
        formData.append('password', employee.password);
        formData.append('adhaar_no', employee.adhaar_no);
        formData.append('pan_no', employee.pan_no);
        formData.append('bank_name', employee.bank_name);
        formData.append('branch', employee.branch);
        formData.append('ifsc', employee.ifsc);
        formData.append('account_no', employee.account_no);
        formData.append('photo', employee.photo);
        formData.append('salary', employee.salary);
        
        axios.post('http://localhost/girnar_backend/api/create_employee_user.php', formData)
            .then(() => {
                toast.configure();
                toast.success('Successfully Inserted');
                axios.get("http://localhost/girnar_backend/api/read_employee_user.php")
                    .then((res) => {
                        console.log(res.data);
                        setReadEmployee(res.data)
                    })
            })
    }
    const onEdit = (row) => {
        handleShow();
        setModalEmployee({
            id: row.id,
            name: row.name,
            email: row.email,
            mobile: row.mobile,
            address: row.address,
            position: row.position,
            username: row.username,
            password: row.password,
            user_type: row.user_type,
            adhaar_no: row.adhaar_no,
            pan_no: row.pan_no,
            bank_name: row.bank_name,
            branch: row.branch,
            ifsc: row.ifsc,
            account_no: row.account_no,
            photo: row.photo,
            salary: row.salary,
        })
    }
    const onModalInputChange = (e) => {
        if(e.target.name==="photo")
        {
            setModalEmployee({...modalEmployee,photo:e.target.files[0]});
        }
        else
        {
            setModalEmployee({ ...modalEmployee, [e.target.name]: e.target.value });
        }
        console.log(modalEmployee)
        //setModalEmployee({ ...modalEmployee, [e.target.name]: e.target.value });
    }
    const onModalFormSubmit = (e) => {
        e.preventDefault();
        const modalFormData = new FormData();
        modalFormData.append('id', modalEmployee.id);
        modalFormData.append('name', modalEmployee.name);
        modalFormData.append('email', modalEmployee.email);
        modalFormData.append('mobile', modalEmployee.mobile);
        modalFormData.append('address', modalEmployee.address);
        modalFormData.append('position', modalEmployee.position);
        modalFormData.append('user_type', modalEmployee.user_type);
        modalFormData.append('username', modalEmployee.username);
        modalFormData.append('password', modalEmployee.password);
        modalFormData.append('adhaar_no', modalEmployee.adhaar_no);
        modalFormData.append('pan_no', modalEmployee.pan_no);
        modalFormData.append('bank_name', modalEmployee.bank_name);
        modalFormData.append('branch', modalEmployee.branch);
        modalFormData.append('ifsc', modalEmployee.ifsc);
        modalFormData.append('account_no', modalEmployee.account_no);
        modalFormData.append('photo', modalEmployee.photo);
        modalFormData.append('salary', modalEmployee.salary);
        axios.post('http://localhost/girnar_backend/api/update_employee_user.php', modalFormData)
            .then(() => {
                axios.get("http://localhost/girnar_backend/api/read_employee_user.php")
                    .then((res) => {
                        toast.warning('Successfully Updated');
                        console.log(res.data);
                        setReadEmployee(res.data)
                    })
            })
        handleClose();
    }
    const onDelete = (row) => {
        axios.post('http://localhost/girnar_backend/api/delete_employee_user.php', { id: row })
            .then(() => {
                axios.get("http://localhost/girnar_backend/api/read_employee_user.php")
                    .then((res) => {
                        toast.error('Successfully Deleted');
                        console.log(res.data);
                        setReadEmployee(res.data)
                    })
            })
    }
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
            field: "mobile",
            headerName: "Mobile",
        },
        {
            field: "address",
            headerName: "Address",
        },
        {
            field: "position",
            headerName: "Position",
        },
        {
            field: "username",
            headerName: "Username",
        },
        {
            field: "password",
            headerName: "Password",
        },
        {
            field: "user_type",
            headerName: "User Type",
        },
        {
            field: "adhaar_no",
            headerName: "Adhaar No",
        },
        {
            field: "pan_no",
            headerName: "PAN No",
        },
        {
            field: "bank_name",
            headerName: "Bank Name",
        },
        {
            field: "branch",
            headerName: "Branch",
        },
        {
            field: "ifsc",
            headerName: "IFSC Code",
        },
        {
            field: "account_no",
            headerName: "Account No",
        },
        {
            field: "photo",
            headerName: "Photo",
            renderCell:(params)=>{
                return(
                    <>
                    <img onClick={()=>zoomImage(params.row.photo)} height={30} width={30} src={`http://localhost:80/girnar_backend/assets/images/${params.row.photo}`} /> 
                    </>
                )
            }
        },
        {
            field: "salary",
            headerName: "Salary",
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
    const rows = readEmployee.data;
    return (
        <div>
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

                    <form onSubmit={onModalFormSubmit} className="form-group">
                        <div className="row">
                            <div className="field col-md-12">
                                <label className="required">ID</label>
                                <input defaultValue={modalEmployee.id} onChange={onModalInputChange} className="form-control mt-1" name="id" type="text" required />
                            </div>
                            <div className="field col-md-12">
                                <label className="required">Name</label>
                                <input defaultValue={modalEmployee.name} onChange={onModalInputChange} className="form-control mt-1" name="name" type="text" required />
                            </div>
                            <div className="field col-md-12">
                                <label className="required">Email</label>
                                <input defaultValue={modalEmployee.email} onChange={onModalInputChange} className="form-control mt-1" name="email" type="text" required />
                            </div>
                            <div className="field col-md-12">
                                <label className="required">Mobile</label>
                                <input defaultValue={modalEmployee.mobile} onChange={onModalInputChange} className="form-control mt-1" name="mobile" type="text" required />
                            </div>
                            <div className="field col-md-12">
                                <label className="required">Address</label>
                                <input defaultValue={modalEmployee.address} onChange={onModalInputChange} className="form-control mt-1" name="address" type="text" required />
                            </div>
                            <div className="field col-md-12">
                                <label className="required">Position</label>
                                {/* <input defaultValue={modalEmployee.position} onChange={onModalInputChange} className="form-control mt-1" name="position" type="text" required /> */}
                                <select defaultValue={modalEmployee.position} onChange={onModalInputChange} className="form-control mt-1" name="position">
                                    <option>Select</option>
                                    <option value="senior">Senior</option>
                                    <option value="junior">Junior</option>
                                </select>
                            </div>
                            <div className="field col-md-12">
                                <label className="required">Username</label>
                                <input defaultValue={modalEmployee.username} onChange={onModalInputChange} className="form-control mt-1" name="username" type="text" required />
                            </div>
                            <div className="field col-md-12">
                                <label className="required">Password</label>
                                <input defaultValue={modalEmployee.password} onChange={onModalInputChange} className="form-control mt-1" name="password" type="text" required />
                            </div>
                            <div className="field col-md-12">
                                <label className="required">User Type</label>
                                {/* <input defaultValue={modalEmployee.user_type} onChange={onModalInputChange} className="form-control mt-1" name="user_type" type="text" required /> */}
                                <select defaultValue={modalEmployee.user_type} onChange={onModalInputChange} className="form-control mt-1" name="user_type">
                                    <option>Select</option>
                                    <option value="designer">Designer</option>
                                    <option value="programmer">Programmer</option>
                                    <option value="machine_operator">Machine Operator</option>
                                    <option value="transporter">Transporter</option>
                                    <option value="stock_manager">Stock Manager</option>
                                </select>
                            </div>
                            <div className='field col-md-12'>
                                <label>Adhaar No</label>
                                <input defaultValue={modalEmployee.adhaar_no} type="text" name="adhaar_no" className='form-control' onChange={onModalInputChange} />
                            </div>
                            <div className='field col-md-12'>
                                <label>Pan No</label>
                                <input defaultValue={modalEmployee.pan_no} type="text" name="pan_no" className='form-control' onChange={onModalInputChange} />
                            </div>
                            <div className='field col-md-12'>
                                <label>Bank Name</label>
                                <input defaultValue={modalEmployee.bank_name} type="text" name="bank_name" className='form-control' onChange={onModalInputChange} />
                            </div>
                            <div className='field col-md-12'>
                                <label>Branch</label>
                                <input defaultValue={modalEmployee.branch} type="text" name="branch" className='form-control' onChange={onModalInputChange} />
                            </div>
                            <div className='field col-md-12'>
                                <label>IFSC Code</label>
                                <input defaultValue={modalEmployee.ifsc} type="text" name="ifsc" className='form-control' onChange={onModalInputChange} />
                            </div>
                            <div className='field col-md-12'>
                                <label>Account No</label>
                                <input defaultValue={modalEmployee.account_no} type="text" name="account_no" className='form-control' onChange={onModalInputChange} />
                            </div>
                            <div className='field col-md-12'>
                                <label>Photo</label>
                                <input type="file" name="photo" className='form-control' onChange={onModalInputChange} />
                            </div>
                            <div className='field col-md-12'>
                                <label>Salary</label>
                                <input defaultValue={modalEmployee.salary} type="text" name="salary" className='form-control' onChange={onModalInputChange} />
                            </div>
                            <div className="field col-md-12">
                                <button className="btn btn-primary mt-1">Save</button>
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
            <div className="content-wrapper">
                <div className="container-fluid">
                    <div className="row">
                        {/* left column */}
                        <div className="col-md-12">
                            {/* general form elements */}
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h3 className="card-title">Employee Creation</h3>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={onFormSubmit}>
                                        <div className='form-group'>
                                            <label>Employee Name</label>
                                            <input type="text" name="name" className='form-control' onChange={onHandleChange} />
                                        </div>
                                        <div className='form-group'>
                                            <label>Employee Mobile</label>
                                            <input type="text" name="mobile" className='form-control' onChange={onHandleChange} />
                                        </div>
                                        <div className='form-group'>
                                            <label>Employee Email</label>
                                            <input type="text" name="email" className='form-control' onChange={onHandleChange} />
                                        </div>
                                        <div className='form-group'>
                                            <label>Employee Address</label>
                                            <input type="text" name="address" className='form-control' onChange={onHandleChange} />
                                        </div>
                                        <div className='form-group'>
                                            <label>Employee Position</label>
                                            {/* <input type="text" name="position" className='form-control' onChange={onHandleChange} /> */}
                                            <select onChange={onHandleChange} className="form-control mt-1" name="position">
                                                <option>Select</option>
                                                <option value="senior">Senior</option>
                                                <option value="junior">Junior</option>
                                            </select>
                                        </div>
                                        <div className='form-group'>
                                            <label>Username</label>
                                            <input type="text" name="username" className='form-control' onChange={onHandleChange} />
                                        </div>
                                        <div className='form-group'>
                                            <label>Password</label>
                                            <input type="text" name="password" className='form-control' onChange={onHandleChange} />
                                        </div>
                                        <div className='form-group'>
                                            <label>User Type</label>
                                            {/* <input type="text" name="user_type" className='form-control' onChange={onHandleChange} /> */}
                                            <select onChange={onHandleChange} className="form-control mt-1" name="user_type">
                                                <option>Select</option>
                                                <option value="designer">Designer</option>
                                                <option value="programmer">Programmer</option>
                                                <option value="machine_operator">Machine Operator</option>
                                                <option value="transporter">Transporter</option>
                                                <option value="stock_manager">Stock Manager</option>
                                            </select>
                                        </div>
                                        <div className='form-group'>
                                            <label>Adhaar No</label>
                                            <input type="text" name="adhaar_no" className='form-control' onChange={onHandleChange} />
                                        </div>
                                        <div className='form-group'>
                                            <label>Pan No</label>
                                            <input type="text" name="pan_no" className='form-control' onChange={onHandleChange} />
                                        </div>
                                        <div className='form-group'>
                                            <label>Bank Name</label>
                                            <input type="text" name="bank_name" className='form-control' onChange={onHandleChange} />
                                        </div>
                                        <div className='form-group'>
                                            <label>Branch</label>
                                            <input type="text" name="branch" className='form-control' onChange={onHandleChange} />
                                        </div>
                                        <div className='form-group'>
                                            <label>IFSC Code</label>
                                            <input type="text" name="ifsc" className='form-control' onChange={onHandleChange} />
                                        </div>
                                        <div className='form-group'>
                                            <label>Account No</label>
                                            <input type="text" name="account_no" className='form-control' onChange={onHandleChange} />
                                        </div>
                                        <div className='form-group'>
                                            <label>Photo</label>
                                            <input type="file" name="photo" className='form-control' onChange={onHandleChange} />
                                        </div>
                                        <div className='form-group'>
                                            <label>Salary</label>
                                            <input type="text" name="salary" className='form-control' onChange={onHandleChange} />
                                        </div>
                                        <div className='form-group'>
                                            <input type="submit" name="submit" className='btn btn-primary' />
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="card">
                                <div style={{ height: 300, width: '100%' }}>
                                    <DataGrid rows={rows} columns={columns} />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HrmsEmployeeMaster