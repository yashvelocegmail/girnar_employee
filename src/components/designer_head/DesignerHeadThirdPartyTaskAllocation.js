import React, { useEffect, useState } from 'react'
import { Modal, Button } from "react-bootstrap";
import Header from '../../Header';
import Menu from '../../Menu';
import axios from 'axios'
import { api_url } from '../ApiUrl';
import { DataGrid } from '@mui/x-data-grid';
import { toast } from 'react-toastify';

function DesignerHeadThirdPartyTaskAllocation() {
    const [showModal, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showModal1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    //States
    const [thirdPartyTask, setThirdPartyTask] = useState({
        third_party: "",
        task_details: "",
        file_upload: "",
        time_required: "",
        remarks: ""
    });
    const [readThirdPartyTask, setReadThirdPartyTask] = useState({
        id: "",
        third_party: "",
        task_details: "",
        file_upload: "",
        time_required: "",
        remarks: ""
    });
    const [singleReadThirdPartyTask, setSingleReadThirdPartyTask] = useState({
        id: "",
        third_party: "",
        task_details: "",
        file_upload: "",
        time_required: "",
        remarks: ""
    });
    const [modalThirdPartyTask, setModalThirdPartyTask] = useState({
        id: "",
        third_party: "",
        task_details: "",
        file_upload: "",
        time_required: "",
        remarks: ""
    });
    const [thirdParty, setThirdParty] = useState();
    //Event Handlers
    //Create 
    const onInputChange = (e) => {
        if (e.target.name === "file_upload") {
            setThirdPartyTask({ ...thirdPartyTask, file_upload: e.target.files[0] });
        }
        else {
            setThirdPartyTask({ ...thirdPartyTask, [e.target.name]: e.target.value });
        }
    }
    const onFormSubmit = (e) => {
        e.preventDefault();
        console.log(thirdPartyTask);
        const formData = new FormData();
        formData.append('third_party', thirdPartyTask.third_party);
        formData.append('task_details', thirdPartyTask.task_details);
        formData.append('file_upload', thirdPartyTask.file_upload);
        formData.append('time_required', thirdPartyTask.time_required);
        formData.append('remarks', thirdPartyTask.remarks);
        axios.post(api_url+"create_third_party_task.php", formData)
            .then(() => {
                toast.configure();
                toast.success('Successfully Inserted');
                axios.get(api_url+"read_third_party_task.php")
                    .then((res) => {
                        setReadThirdPartyTask(res.data)
                    })
            })
    }
    //Read All
    useEffect(() => {
        axios.get(api_url+"read_third_party_task.php")
            .then((res) => {
                setReadThirdPartyTask(res.data);
                console.log(readThirdPartyTask);
            })
    }, [])
    //Read Single
    const onRead = (row) => {
        handleShow1();
        setSingleReadThirdPartyTask({
            id: row.id,
            third_party: row.name,
            task_details: row.task_details,
            file_upload: row.file_upload,
            time_required: row.time_required,
            remarks: row.remarks
        })
    }
    //Edit
    const onEdit = (row) => {
        handleShow();
        setModalThirdPartyTask({
            id: row.id,
            third_party: row.third_party,
            task_details: row.task_details,
            file_upload: row.file_upload,
            time_required: row.time_required,
            remarks: row.remarks
        })
    }
    const onModalInputChange = (e) => {
        if (e.target.name === "file_upload") {
            setModalThirdPartyTask({ ...modalThirdPartyTask, file_upload: e.target.files[0] });
        }
        else {
            setModalThirdPartyTask({ ...modalThirdPartyTask, [e.target.name]: e.target.value });
        }
    }
    //Update
    const onModalFormSubmit = (e) => {
        e.preventDefault();
        console.log(modalThirdPartyTask);
        const formData = new FormData();
        formData.append('id', modalThirdPartyTask.id);
        formData.append('third_party', modalThirdPartyTask.third_party);
        formData.append('task_details', modalThirdPartyTask.task_details);
        formData.append('file_upload', modalThirdPartyTask.file_upload);
        formData.append('time_required', modalThirdPartyTask.time_required);
        formData.append('remarks', modalThirdPartyTask.remarks);
        axios.post(api_url+"update_third_party_task.php", formData)
            .then(() => {
                toast.configure();
                toast.warning('Successfully Updated');
                axios.get(api_url+"read_third_party_task.php")
                    .then((res) => {
                        setReadThirdPartyTask(res.data)
                    })
            })
        handleClose();
    }
    //Delete
    const onDelete = (rowid) => {
        axios.post(api_url+"delete_third_party_task.php", { id: rowid })
            .then(() => {
                toast.configure();
                toast.error('Successfully deleted');
                axios.get(api_url+"read_third_party_task.php")
                    .then((res) => {
                        setReadThirdPartyTask(res.data)
                    })
            })
        handleClose();
    }
    //Read third party
    useEffect(() => {
        axios.get(api_url+"read_third_party.php")
            .then((res) => {
                console.log(res.data);
                setThirdParty(res.data)
            })
    }, [])
    //Material Table
    const columns = [
        {
            field: "id",
            headerName: "ID",
        },

        {
            field: "name",
            headerName: "Third Party",
        },
        {
            field: "task_details",
            headerName: "Task Details",
        },
        {
            field: "file_upload",
            headerName: "File Upload",
        },
        {
            field: "time_required",
            headerName: "Time Required",
        },
        {
            field: "remarks",
            headerName: "Remarks",
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
    const rows = readThirdPartyTask.data;
    return (
        <>
            <Header />
            <Menu />
            <div className='content-wrapper'>
                <Modal show={showModal1} onHide={handleClose1}>
                    <Modal.Header>
                        <Modal.Title>Details Update</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={onModalFormSubmit}>
                            <div className="card-body">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input name="third_party" type="text" className="form-control" defaultValue={singleReadThirdPartyTask.third_party} readOnly />
                                </div>
                                <div className="form-group">
                                    <label>Task Details</label>
                                    <input name="task_details" type="text" className="form-control" defaultValue={singleReadThirdPartyTask.task_details} readOnly />
                                </div>
                                <div className="form-group">
                                    <label>File Upload</label>
                                    <input name="file_upload" type="text" defaultValue={singleReadThirdPartyTask.file_upload} className="form-control" readOnly />
                                </div>
                                <div className="form-group">
                                    <label>Time Required</label>
                                    <input name="time_required" type="text" className="form-control" defaultValue={singleReadThirdPartyTask.time_required} readOnly />
                                </div>
                                <div>
                                    <label>Remarks</label>
                                    <input name="remarks" type="text" className="form-control" defaultValue={singleReadThirdPartyTask.remarks} readOnly />
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
                        <Modal.Title>Details Update</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={onModalFormSubmit}>
                            <div className="card-body">
                                <div className="form-group">
                                    <label>Name</label>
                                    {/* <input name="third_party" onChange={onModalInputChange} type="text" className="form-control" defaultValue={modalThirdPartyTask.third_party}/> */}
                                    <select defaultValue={modalThirdPartyTask.third_party} onChange={onModalInputChange} name="third_party" type="text" className="form-control">
                                        <option>Select</option>
                                        {thirdParty === undefined ? [] : thirdParty.data.map((data) => (
                                            <option key={data.id} value={data.id}>{data.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Task Details</label>
                                    <input name="task_details" onChange={onModalInputChange} type="text" className="form-control" defaultValue={modalThirdPartyTask.task_details} />
                                </div>
                                <div className="form-group">
                                    <label>File Upload</label>
                                    <input name="file_upload" onChange={onModalInputChange} type="file" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>Time Required</label>
                                    <input name="time_required" onChange={onModalInputChange} type="text" className="form-control" defaultValue={modalThirdPartyTask.time_required} />
                                </div>
                                <div>
                                    <label>Remarks</label>
                                    <input name="remarks" onChange={onModalInputChange} type="text" className="form-control" defaultValue={modalThirdPartyTask.remarks} />
                                </div>
                            </div>

                            <div class="card-footer">
                                <button type="submit" class="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                <section class="content">
                    <div className="container-fluid">
                        <div className="row">
                            {/* left column */}
                            <div className="col-md-12">
                                <div className="card card-primary">
                                    <div className="card-header">
                                        <h3 className="card-title">Parts</h3>
                                    </div>
                                    {/* /.card-header */}
                                    {/* form start */}
                                    <form onSubmit={onFormSubmit}>
                                        <div className="card-body">
                                            <div className="form-group">
                                                <label >Third Party</label>
                                                <select onChange={onInputChange} name="third_party" type="text" className="form-control"required>
                                                    <option>Select</option>
                                                    {thirdParty === undefined ? [] : thirdParty.data.map((data) => (
                                                        <option key={data.id} value={data.id}>{data.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>Task Details</label>
                                                <input onChange={onInputChange} name="task_details" type="text" className="form-control"required />
                                            </div>
                                            <div className="form-group">
                                                <label>File Upload</label>
                                                <input onChange={onInputChange} name="file_upload" type="file" className="form-control"required />
                                            </div>
                                            <div className="form-group">
                                                <label>Time Required</label>
                                                <input onChange={onInputChange} name="time_required" type="text" className="form-control" required/>
                                            </div>
                                            <div className="form-group">
                                                <label>Remarks</label>
                                                <input onChange={onInputChange} name="remarks" type="text" className="form-control"required />
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
                                        <h3 class="card-title">Third Party Task Allocation</h3>
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

export default DesignerHeadThirdPartyTaskAllocation
