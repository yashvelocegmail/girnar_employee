import axios from 'axios'
import { api_url } from '../ApiUrl';
import React, { useEffect, useState } from 'react'
import Header from '../../Header'
import Menu from '../../Menu'
import { toast } from 'react-toastify';
import { DataGrid } from '@mui/x-data-grid';
import { Modal, Button, Form } from "react-bootstrap";

function DesignerHeadStockRequest() {
    const [showModal, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showModal1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    //States
    const [materialTypeOption, setMaterialTypeOption] = useState();
    const [materialThicknessOption, setMaterialThicknessOption] = useState();
    const [materialGradeOption, setMaterialGradeOption] = useState();

    const [stockRequest, setStockRequest] = useState({
        po: '',
        material_type: '',
        material_thickness: '',
        material_grade: '',
        no_of_sheets: ''
    });
    const [readStockRequest, setReadStockRequest] = useState({
        id: '',
        po: '',
        material_type: '',
        material_thickness: '',
        material_grade: '',
        no_of_sheets: ''
    });
    const [modalStockRequest, setModalStockRequest] = useState({
        id: '',
        po: '',
        material_type: '',
        material_thickness: '',
        material_grade: '',
        no_of_sheets: ''
    });
    const [singleStockRequest, setSingleStockRequest] = useState({
        id: '',
        po: '',
        material_type: '',
        material_thickness: '',
        material_grade: '',
        no_of_sheets: ''
    });
    //Create
    const onInputChange = (e) => {
        setStockRequest({ ...stockRequest, [e.target.name]: e.target.value })
    }
    const onFormSubmit = (e) => {
        e.preventDefault();
        axios.post(api_url+"create_stock_request.php", stockRequest)
            .then((res) => {
                console.log(res);
                toast.configure();
                toast.success("Successfully Inserted");
                axios.post(api_url+"read_stock_request.php", readStockRequest)
                    .then((res) => {
                        setReadStockRequest(res.data);
                    })
            })
    }
    //Read
    useEffect(() => {
        axios.post(api_url+"read_stock_request.php", readStockRequest)
            .then((res) => {
                setReadStockRequest(res.data);
            })
    }, [])
    //Single
    const onRead = (row) => {
        console.log(row);
        handleShow1();
        setSingleStockRequest({
            id:row.id,
            po:row.po,
            material_type:row.material_type,
            material_thickness:row.material_thickness,
            material_grade:row.material_grade,
            no_of_sheets:row.no_of_sheets
        })
    }
    //Update
    const onEdit = (row) => {
        console.log(row);
        handleShow();
        setModalStockRequest({
            id:row.id,
            po:row.po,
            material_type:row.material_type_id,
            material_thickness:row.material_thickness_id,
            material_grade:row.material_grade_id,
            no_of_sheets:row.no_of_sheets
        })
    }
    const onModalInputChange=(e)=>{
        setModalStockRequest({...modalStockRequest,[e.target.name]:e.target.value});
    }
    const onModalFormSubmit=(e)=>{
        console.log(modalStockRequest);
        e.preventDefault();
        axios.post(api_url+"update_stock_request.php",modalStockRequest)
        .then(()=>{
            toast.configure();
            toast.warning("Successfully Updated");
            axios.post(api_url+"read_stock_request.php", readStockRequest)
                    .then((res) => {
                        setReadStockRequest(res.data);
                    })
        })
        handleClose();
    }
    //Delete
    const onDelete = (rowid) => {
        axios.post(api_url+"delete_stock_request.php",{id:rowid})
        .then(()=>{
            toast.configure();
            toast.error("Successfully Deleted");
            axios.post(api_url+"read_stock_request.php", readStockRequest)
                    .then((res) => {
                        setReadStockRequest(res.data);
                    })
        })
    }
    //Option Fields
    useEffect(() => {
        axios.get(api_url+"read_material_type.php")
            .then((res) => {
                setMaterialTypeOption(res.data);
            })
        axios.get(api_url+"read_material_thickness.php")
            .then((res) => {
                setMaterialThicknessOption(res.data);
            })
        axios.get(api_url+"read_material_grade.php")
            .then((res) => {
                setMaterialGradeOption(res.data);
            })
    }, [])

    //Material Table
    const columns = [
        {
            field: "id",
            headerName: "Id"
        },
        {
            field: "po",
            headerName: "PO"
        },
        {
            field: "material_type",
            headerName: "Material Type",
            width: 150
        },
        {
            field: "material_thickness",
            headerName: "Material Thickness",
            width: 150
        },
        {
            field: "material_grade",
            headerName: "Material Grade",
            width: 150
        },
        {
            field: "no_of_sheets",
            headerName: "No Of Sheets",
            width: 150
        },
        // {
        //     field: "status",
        //     headerName: "Status",
        //     width: 100
        // },
        {
            field: "status",
            width: 100,
            headerName: "Status",
            renderCell: (params) => {
                if(params.row.status==="requested")
                {
                    return (
                        <>
                            <p><small class="badge badge-warning">{params.row.status}</small></p>
                        </>
                    )
                }
                else
                {
                    return (
                        <>
                            <p><small class="badge badge-success">{params.row.status}</small></p>
                        </>
                    )
                }
            }
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
    const rows = readStockRequest.data;
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
                                <label>Id</label>
                                <input defaultValue={singleStockRequest.id} name="id" type="text" className="form-control" readOnly />
                            </div>
                            <div className="form-group">
                                <label>PO</label>
                                <input defaultValue={singleStockRequest.po} name="po" type="text" className="form-control" readOnly />
                            </div>
                            <div className="form-group">
                                <label>Material Type</label>
                                <input defaultValue={singleStockRequest.material_type} name="material_type" type="text" className="form-control" readOnly />
                            </div>
                            <div className="form-group">
                                <label>Material Thickness</label>
                                <input defaultValue={singleStockRequest.material_thickness} name="material_thickness" type="text" className="form-control" readOnly />
                            </div>
                            <div className="form-group">
                                <label>Material Grade</label>
                                <input defaultValue={singleStockRequest.material_grade} name="material_grade" type="text" className="form-control" readOnly />
                            </div>
                            <div className="form-group">
                                <label >No Of Sheets</label>
                                <input defaultValue={singleStockRequest.no_of_sheets} type="number" name="no_of_sheets" className="form-control" readOnly/>
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
                                <input onChange={onModalInputChange} defaultValue={modalStockRequest.id} name="id" type="text" className="form-control" readOnly />
                            </div>
                            <div className="form-group">
                                <label>Material Type</label>
                                <select onChange={onModalInputChange} defaultValue={modalStockRequest.material_type} className='form-control' name="material_type">
                                    <option>Select</option>
                                    {materialTypeOption === undefined ? [] : materialTypeOption.data.map((type) => (
                                        <option key={type.id} value={type.id}>{type.material_type}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label >Material Thickness</label>
                                <select onChange={onModalInputChange} defaultValue={modalStockRequest.material_thickness} className='form-control' name="material_thickness">
                                    <option>Select</option>
                                    {materialThicknessOption === undefined ? [] : materialThicknessOption.data.map((thickness) => (
                                        <option key={thickness.id} value={thickness.id}>{thickness.material_thickness}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label >Material Grade</label>
                                <select onChange={onModalInputChange} defaultValue={modalStockRequest.material_grade} className='form-control' name="material_grade">
                                    <option>Select</option>
                                    {materialGradeOption === undefined ? [] : materialGradeOption.data.map((grade) => (
                                        <option key={grade.id} value={grade.id}>{grade.material_grade}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label >No Of Sheets</label>
                                <input onChange={onModalInputChange} defaultValue={modalStockRequest.no_of_sheets} type="number" name="no_of_sheets" className="form-control" />
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
                                                <label >PO Id</label>
                                                <select onChange={onInputChange} name="po" className='form-control'>
                                                    <option>Select</option>
                                                    <option>PO-1</option>
                                                    <option>PO-2</option>
                                                    <option>PO-3</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label >Material Type</label>
                                                <select onChange={onInputChange} className='form-control' name="material_type">
                                                    <option>Select</option>
                                                    {materialTypeOption === undefined ? [] : materialTypeOption.data.map((type) => (
                                                        <option key={type.id} value={type.id}>{type.material_type}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label >Material Thickness</label>
                                                <select onChange={onInputChange} className='form-control' name="material_thickness">
                                                    <option>Select</option>
                                                    {materialThicknessOption === undefined ? [] : materialThicknessOption.data.map((thickness) => (
                                                        <option key={thickness.id} value={thickness.id}>{thickness.material_thickness}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label >Material Grade</label>
                                                <select onChange={onInputChange} className='form-control' name="material_grade">
                                                    <option>Select</option>
                                                    {materialGradeOption === undefined ? [] : materialGradeOption.data.map((grade) => (
                                                        <option key={grade.id} value={grade.id}>{grade.material_grade}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label >No Of Sheets</label>
                                                <input onChange={onInputChange} type="number" name="no_of_sheets" className="form-control" />
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
                                        <h3 class="card-title">Stock Request</h3>
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
            </div></>
    )
}

export default DesignerHeadStockRequest
