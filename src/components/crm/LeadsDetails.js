import React, { useState }  from 'react';
import { Modal, Button } from "react-bootstrap";
import Header from '../../Header';
import Menu from '../../Menu';

function LeadsDetails() {
    const [showModal1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    const openModal1 = () => {
        handleShow1();
    }
    const [showModal2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const openModal2 = () => {
        handleShow2();
    }
    const [showModal3, setShow3] = useState(false);
    const handleClose3 = () => setShow3(false);
    const handleShow3 = () => setShow3(true);
    const openModal3 = () => {
        handleShow3();
    }
    return <div>
        <Header />
        <Menu />
        <Modal show={showModal1} onHide={handleClose1}>
                <Modal.Header>
                    <Modal.Title>Quotation Update</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="card-body">
                            <div className="form-group">
                                <label>Customer Name</label>
                                <input type="text" className="form-control" value="Yash" />
                            </div>
                            <div className="form-group">
                                <label>Material Type</label>
                                <input type="text" className="form-control" value="Aluminium" />
                            </div>
                            <div className="form-group">
                                <label>Material Thickness</label>
                                <input type="text" className="form-control" value="4mm" />
                            </div>
                            <div className="form-group">
                                <label>Material Grade</label>
                                <input type="text" className="form-control" value="A" />
                            </div>
                            <div className="form-group">
                                <label>Material Status</label>
                                <input type="text" className="form-control" value="With Material" />
                            </div>
                            <div className="form-group">
                                <label>No Of Sheets</label>
                                <input type="text" className="form-control" value="10" />
                            </div>
                            <div className="form-group">
                                <label>Type Of Process</label>
                                <input type="text" className="form-control" value="Machining" />
                            </div>
                            <div className="form-group">
                                <label>Expected Delivery</label>
                                <input type="text" className="form-control" value="10" />
                            </div>
                            <div className="form-group">
                                <label>Design Upload</label>
                                <input type="text" className="form-control" value="File" />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <input type="text" className="form-control" value="This is some description" />
                            </div>
                            {/* <div className="form-group">
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
                            </div> */}
                        </div>

                        <div class="card-footer">
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose1}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showModal2} onHide={handleClose2}>
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
                    <Button variant="secondary" onClick={handleClose2}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showModal3} onHide={handleClose3}>
                <Modal.Header>
                    <Modal.Title>PO Update</Modal.Title>
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
                    <Button variant="secondary" onClick={handleClose3}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        <div className="content-wrapper kanban">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-6">
                            <h1>Kanban Board</h1>
                        </div>
                        <div className="col-sm-6 d-none d-sm-block">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">Kanban Board</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>
            <section className="content pb-3">
                <div className="container-fluid h-100">
                    <div className="card card-row card-secondary">
                        <div className="card-header">
                            <h3 className="card-title">
                                Leads
                            </h3>
                        </div>
                        <div className="card-body">                           
                            <div className="card card-light card-outline">
                                <div className="card-header">
                                    <h5 className="card-title">Ganesh Patil</h5>
                                    <div className="card-tools">
                                        <a href="#" className="btn btn-tool">
                                            <i  onClick={openModal1} className="fas fa-eye" />
                                        </a>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <p><b>Mobile Number</b>-8999006194</p>
                                    <p><b>Email</b>-g@gmail.com</p>
                                    <p><b>Material Quantity</b>-10</p>
                                    <p><b>Material Grade</b>-A</p>
                                    <p><b>Material Status</b>-With Material</p>
                                    <p><b>Number Of Sheet</b>-10</p>
                                </div>
                            </div>
                            <div className="card card-light card-outline">
                                <div className="card-header">
                                    <h5 className="card-title">Ramesh Patil</h5>
                                    <div className="card-tools">
                                        <a href="#" className="btn btn-tool">
                                            <i onClick={openModal1} className="fas fa-eye" />
                                        </a>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <p><b>Mobile Number</b>-9423744724</p>
                                    <p><b>Email</b>-g@gmail.com</p>
                                    <p><b>Material Quantity</b>-10</p>
                                    <p><b>Material Grade</b>-A</p>
                                    <p><b>Material Status</b>-With Material</p>
                                    <p><b>Number Of Sheet</b>-10</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Quotation */}
                    <div className="card card-row card-primary">
                        <div className="card-header">
                            <h3 className="card-title">
                            Quotation
                            </h3>
                        </div>
                        <div className="card-body">
                        <div className="card card-light card-outline">
                                <div className="card-header">
                                    <h5 className="card-title">Customer-1</h5>
                                    <div className="card-tools">
                                        <a href="#" className="btn btn-tool">
                                            <i onClick={openModal2} className="fas fa-eye" />
                                        </a>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <p><b>Customer First Name</b>-Yash</p>
                                    <p><b>Customer Last Name</b>-Shinde</p>
                                    <p><b>Customer Email</b>-y@g.com</p>
                                    <p><b>Customer Address</b>-A</p>
                                    <p><b>Quotation File</b>-File</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card card-row card-info">
                        <div className="card-header bg-success">
                            <h3 className="card-title">
                                PO Generation
                            </h3>
                        </div>
                        <div className="card-body">
                        <div className="card card-light card-outline">
                                <div className="card-header">
                                    <h5 className="card-title">Customer-1</h5>
                                    <div className="card-tools">
                                        <a href="#" className="btn btn-tool">
                                            <i onClick={openModal3} className="fas fa-eye" />
                                        </a>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <p><b>Customer First Name</b>-Yash</p>
                                    <p><b>Customer Last Name</b>-Shinde</p>
                                    <p><b>Customer Email</b>-y@g.com</p>
                                    <p><b>Customer Address</b>-A</p>
                                    <p><b>Quotation File</b>-File</p>
                                    <p><b>PO File</b>-File</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>;
}

export default LeadsDetails;
