import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Modal, Button } from "react-bootstrap";
import Header from '../../Header';
import Menu from '../../Menu';
import { api_url } from '../ApiUrl';

function LeadsDetails() {
    const [showModal1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    const openModal1 = (row) => {
        handleShow1();
        setEditLeads({
            id: row.id,
            customer: row.customer,
            customer_name: row.customer_name,
            customer_mobile_number: row.customer_mobile_number,
            customer_email_id: row.customer_email_id,
            description: row.description,
            design_upload: row.design_upload,
            expected_delivery: row.expected_delivery,
            material_grade: row.material_grade,
            material_status: row.material_status,
            material_thickness: row.material_thickness,
            material_thickness_material_thickness: row.material_thickness_material_thickness,
            material_type: row.material_type,
            material_type_material_type: row.material_type_material_type,
            type_of_process: row.type_of_process,
            status: row.status
        });
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
    //States
    const [leads, setLeads] = useState({
        id: "",
        customer: "",
        customer_name: "",
        customer_mobile_number: "",
        customer_email_id: "",
        description: "",
        design_upload: "",
        expected_delivery: "",
        material_grade: "",
        material_status: "",
        material_thickness: "",
        material_thickness_material_thickness: "",
        material_type: "",
        material_type_material_type: "",
        type_of_process: "",
        status: ""
    })
    const [editeads, setEditLeads] = useState({
        id: "",
        customer: "",
        customer_name: "",
        customer_mobile_number: "",
        customer_email_id: "",
        customer: "",
        description: "",
        design_upload: "",
        expected_delivery: "",
        material_grade: "",
        material_status: "",
        material_thickness: "",
        material_thickness_material_thickness: "",
        material_type: "",
        material_type_material_type: "",
        type_of_process: "",
        status: ""
    })
    const [quotation, setQuotation] = useState({
        id: "",
        quotation: "",
        customer_name: "",
        customer_enquiry: "",
        des_quant_rate: "",
        total: ""
    });
    const [purchaseOrder, setPurchaseOrder] = useState({
        id: "",
        quotation: "",
        des_quant_rate_total: "",
        pan: "",
        tan: "",
        gst: "",
        cgst: "",
        sgst: "",
        discount: "",
        total: ""
    });
    const [formData, setFormData] = useState({
        id: "",
        status: ""
    });
    //Read
    useEffect(() => {
        axios.get(api_url + "read_all_enquiry.php")
            .then((res) => {
                //console.log(res.data);
                setLeads(res.data)
            })
    }, [])
    useEffect(() => {
        axios.get(api_url + "read_quotation.php")
            .then((res) => {
                //console.log(res.data);
                setQuotation(res.data)
            })
    }, [])
    useEffect(() => {
        axios.get(api_url + "read_purchase_order_crm.php")
            .then((res) => {
                setPurchaseOrder(res.data)
                console.log(res.data);
            })
    }, [])

    //Edit
    const onStatusChange = (id, status) => {
        setFormData({
            id: id,
            status: status
        })
    }
    const onModalFormSubmit = (e) => {
        e.preventDefault();
        axios.post(api_url + "update_customer_inquiry_status.php", formData)
    }
    return <div>
        <Header />
        <Menu />
        <Modal show={showModal1} onHide={handleClose1}>
            <Modal.Header>
                <Modal.Title>Quotation Update</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={onModalFormSubmit}>
                    <div className="card-body">
                        <div className="form-group">
                            <label>Customer Name</label>
                            <input value={editeads.customer_name} type="text" className="form-control" readOnly />
                        </div>
                        <div className="form-group">
                            <label>Material Type</label>
                            <input value={editeads.material_type_material_type} type="text" className="form-control" readOnly />
                        </div>
                        <div className="form-group">
                            <label>Material Thickness</label>
                            <input type="text" className="form-control" value={editeads.material_thickness_material_thickness} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Material Grade</label>
                            <input type="text" className="form-control" value={editeads.material_grade} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Material Status</label>
                            <input type="text" className="form-control" value={editeads.material_status} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Type Of Process</label>
                            <input type="text" className="form-control" value={editeads.type_of_process} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Expected Delivery</label>
                            <input type="text" className="form-control" value={editeads.expected_delivery} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Design Upload</label>
                            <input type="text" className="form-control" value={editeads.design_upload} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <input type="text" className="form-control" value={editeads.description} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Status</label>
                            <select value={editeads.status} className='form-control' name="status" onChange={e => onStatusChange(editeads.id, e.target.value)}>
                                <option>Select</option>
                                <option value="approved">Approved</option>
                                <option value="not_approved">Not Approved</option>
                            </select>
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
                        {leads.data === undefined ? "" : leads.data.map((lead) => (
                            <div className="card-body">
                                <div className="card card-light card-outline">
                                    <div className="card-header">
                                        <h5 className="card-title">{lead.customer_name}</h5>
                                        <div className="card-tools">
                                            <a href="#" className="btn btn-tool">
                                                <i onClick={e => openModal1(lead)} className="fas fa-eye" />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <p><b>Mobile Number-</b>{lead.customer_mobile_number}</p>
                                        <p><b>Email-</b>{lead.customer_email_id}</p>
                                        <p><b>Design-</b><a href={"http://localhost/girnar_backend/assets/images/" + lead.design_upload} download>Download File</a></p>
                                        <p><b>Material Status-</b>{lead.material_status}</p>
                                        <p><b>Material Grade-</b>{lead.material_grade}</p>
                                        <p><b>Material Type-</b>{lead.material_type_material_type}</p>
                                        <p><b>Material Type-</b>{lead.material_thickness_material_thickness}</p>
                                        <p><b>Type Of Process-</b>{(JSON.parse(lead.type_of_process))}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* <div className="card-body">                           
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
                    </div> */}
                    {/* Quotation */}
                    <div className="card card-row card-primary">
                        <div className="card-header">
                            <h3 className="card-title">
                                Quotation
                            </h3>
                        </div>
                        {quotation.data === undefined ? "" : quotation.data.map((quotation) => (
                            <div className="card-body">
                                <div className="card card-light card-outline">
                                    <div className="card-header">
                                        <h5 className="card-title">{quotation.quotation}</h5>
                                        <div className="card-tools">
                                            <a href="#" className="btn btn-tool">
                                                <i onClick={openModal2} className="fas fa-eye" />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <p><b>Customer Name</b>{quotation.customer_name}</p>
                                        <p><b>Customer Enquiry</b>{quotation.customer_enquiry}</p>
                                        {/* <p><b>Des Quant Rate</b>{quotation.des_quant_rate}</p> */}
                                        <table border="1" className='table-responsive table-bordered'>
                                            <tr>
                                                <th>Description</th>
                                                <th>Quantity</th>
                                                <th>Total Rate</th>
                                            </tr>
                                            {JSON.parse(quotation.des_quant_rate).map((des_quant_rate)=>(
                                                <tr>
                                                    <td>{des_quant_rate.description}</td>
                                                    <td>{des_quant_rate.quantity}</td>
                                                    <td>{des_quant_rate.total_rate}</td>
                                                </tr>
                                            ))}
                                            <tr>
                                                <td>Total</td>
                                                <td></td>
                                                <td>{quotation.total}</td>
                                            </tr>
                                        </table>
                                        {/* <p><b>Total</b>{quotation.total}</p> */}
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                    <div className="card card-row card-info">
                        <div className="card-header bg-success">
                            <h3 className="card-title">
                                PO Generation
                            </h3>
                        </div>

                        {purchaseOrder.data === undefined ? "" : purchaseOrder.data.map((purchaseorder) => (
                            <div className="card-body">
                                <div className="card card-light card-outline">
                                    <div className="card-header">
                                        <h5 className="card-title">{purchaseorder.purchase_order}</h5>
                                        <div className="card-tools">
                                            <a href="#" className="btn btn-tool">
                                                <i onClick={openModal3} className="fas fa-eye" />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <p><b>Quotation</b>{purchaseorder.quotation}</p>
                                        {/* <p><b>Des_quant_rate_total</b>{purchaseorder.des_quant_rate_total}</p> */}
                                        {/* {typeof purchaseorder.des_quant_rate_total} */}
                                        <table  className='table-responsive table-bordered'>
                                            <tr>
                                                <th>Description</th>
                                                <th>Quantity</th>
                                                <th>Rate</th>
                                                <th>Total Rate</th>
                                            </tr>
                                            {JSON.parse(purchaseorder.des_quant_rate_total).map((des_quant_rate_total) => (

                                                <tr>
                                                    <td>{des_quant_rate_total.description}</td>
                                                    <td>{des_quant_rate_total.quantity}</td>
                                                    <td>{des_quant_rate_total.rate}</td>
                                                    <td>{des_quant_rate_total.total_rate}</td>
                                                </tr>

                                            ))}
                                            <tr>
                                                <td>Total</td>
                                                <td></td>
                                                <td></td>
                                                <td>{purchaseorder.total}</td>
                                            </tr>
                                        </table>
                                        <p><b>PAN</b>{purchaseorder.pan}</p>
                                        <p><b>TAN</b>{purchaseorder.tan}</p>
                                        <p><b>GST</b>{purchaseorder.gst}</p>
                                        <p><b>CGST</b>{purchaseorder.cgst}</p>
                                        <p><b>SGST</b>{purchaseorder.sgst}</p>
                                        <p><b>Discount</b>{purchaseorder.discount}</p>
                                        
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    </div>;
}

export default LeadsDetails;
