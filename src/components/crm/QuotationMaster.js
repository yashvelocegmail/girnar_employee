import React, { useState } from 'react'
import { Modal, Button } from "react-bootstrap";
import Header from '../../Header';
import Menu from '../../Menu';

function QuotationMaster() {
    const [showModal, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const openModal = () => {
        handleShow();
    }
    return (
        
        <>
        <Header/>
        <Menu />
        <div className='content-wrapper'>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Quotation Update</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="card-body">
                            <div className="form-group">
                                <label>Customer Id</label>
                                <input type="text" className="form-control" value="Customer-1" />
                            </div>
                            <div className="form-group">
                                <label>Customer First Name</label>
                                <input type="text" className="form-control" value="Yash" />
                            </div>
                            <div className="form-group">
                                <label>Customer Last Name</label>
                                <input type="text" className="form-control" value="Shinde" />
                            </div>
                            <div className="form-group">
                                <label>Customer Email</label>
                                <input type="text" className="form-control" value="yash.s@velocetechinsights.com" />
                            </div>
                            <div className="form-group">
                                <label>Customer Address</label>
                                <input type="text" className="form-control" value="Rajarampuri 12 th lane" />
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
                                    <h3 class="card-title">Quotation</h3>
                                </div>
                                <div class="card-body">
                                    <table id="example1" class="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th>Customer Id</th>
                                                <th>Customer First Name</th>
                                                <th>Customer Last Name</th>
                                                <th>Customer Email</th>
                                                <th>Customer Address</th>
                                                <th>Quotation File</th>
                                                <th>Process</th>
                                                <th>Raw Material</th>
                                                <th>Description</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Customer-1</td>
                                                <th>Yash</th>
                                                <td>Shinde</td>
                                                <td>yash.s@velocetechinsights.com</td>
                                                <td>Rajarampuri 12 th lane</td>
                                                <td><img src="https://picsum.photos/200/200" /></td>
                                                <td>Laser Cutting</td>
                                                <td>Given</td>
                                                <td>Square sheet to be cut using laser</td>
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

export default QuotationMaster
