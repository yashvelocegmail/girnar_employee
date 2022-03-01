import React, { useState } from 'react'
import { Modal, Button } from "react-bootstrap";
import Header from '../../Header';
import Menu from '../../Menu';

function ProgrammerProduction() {
    const [showModal, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const openModal = () => {
        handleShow();
    }
    return (
        <>
        <Header />
        <Menu />
        <div className='content-wrapper'>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Task Update</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="card-body">
                            <div className="form-group">
                                <label>Task Id</label>
                                <input type="text" className="form-control" value="Task-1" />
                            </div>
                            <div className="form-group">
                                <label>Task Date</label>
                                <input type="text" className="form-control" value="04-01-2022" />
                            </div>
                            <div className="form-group">
                                <label>Task Description</label>
                                <input type="text" className="form-control" value="Cut the metal sheet of 4mm thickeness into the dimesiona of 4x4" />
                            </div>
                            <div className="form-group">
                                <label>Expected Time Required(hrs)</label>
                                <input type="text" className="form-control" value="4" />
                            </div>
                            <div className="form-group">
                                <label>Actual Time Taken(hrs)</label>
                                <input type="text" className="form-control" value="5" />
                            </div>
                            <div className="form-group">
                                <label>Issues</label>
                                <select class="form-control">
                                    <option>Yes</option>
                                    <option>No</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputFile">File Upload</label>
                                <div className="input-group">
                                    <div className="custom-file">
                                        <input type="file" className="custom-file-input" id="exampleInputFile" />
                                        <label className="custom-file-label" htmlFor="exampleInputFile">Choose file</label>
                                    </div>
                                    <div className="input-group-append">
                                        <span className="input-group-text">Upload</span>
                                    </div>
                                </div>
                            </div>
                            <div className="form-check">
                                <label>Status</label>
                                <select class="form-control">
                                    <option>Completed</option>
                                    <option>In Process</option>
                                </select>
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
                            <div class="card">
                                <div class="card-header">
                                    <h3 class="card-title">Production</h3>
                                </div>
                                <div class="card-body">
                                    <table id="example1" class="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th>Task Id</th>
                                                <th>Task Date</th>
                                                <th>Task Description</th>
                                                <th>Expected Time Required(hrs)</th>
                                                <th>Actual Time Taken(hrs)</th>
                                                <th>Issues</th>
                                                <th>File Upload</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Task-1</td>
                                                <th>04-01-2022</th>
                                                <td>Cut the metal sheet of 4mm thickeness into the dimesiona of 4x4</td>
                                                <td>4</td>
                                                <td>5</td>
                                                <td>No</td>
                                                <td>file name</td>
                                                <td>Completed</td>
                                                <td><i onClick={openModal} className="fas fa-edit fa-fw" /></td>
                                            </tr>
                                        </tbody>

                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div></>

    )
}

export default ProgrammerProduction
