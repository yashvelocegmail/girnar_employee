import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Modal, Button, Form } from "react-bootstrap";
import Header from '../../Header';
import Menu from '../../Menu';
import { api_url } from '../ApiUrl';
import { toast } from 'react-toastify';
import { DataGrid } from '@mui/x-data-grid';
import { jsPDF } from "jspdf";
import 'jspdf-autotable'

function DesignerHeadQuotationMaster() {
    const [formValues, setFormValues] = useState([{ description: "", quantity: "", rate: "", total_rate: "" }])
    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
    
        // console.log("quantity",newFormValues[i].quantity)
        // console.log("rate",newFormValues[i].rate)
        var total=parseInt(newFormValues[i].rate)*parseInt(newFormValues[i].quantity)
        newFormValues[i].total_rate=total.toString();
        //console.log(total)
        setFormValues(newFormValues);
        console.log(formValues);
        setQuotation({ ...quotation, des_quant_rate: formValues })
    }

    let addFormFields = () => {
        setFormValues([...formValues, { description: "", quantity: "", rate: "", total_rate: "" }])
    }

    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }
    //Modal dynamic form
    const [formValues1, setFormValues1] = useState([{ description: "", quantity: "", rate: "", total_rate: "" }])
    let handleChange1 = (i, e) => {
        let newFormValues = [...formValues1];
        newFormValues[i][e.target.name] = e.target.value;
        // console.log("quantity",newFormValues[i].quantity)
        // console.log("rate",newFormValues[i].rate)
        var total=parseInt(newFormValues[i].rate)*parseInt(newFormValues[i].quantity)
        newFormValues[i].total_rate=total.toString();
        //console.log(total)
        setFormValues1(newFormValues);
        //console.log(formValues);
        setEditQuotation({ ...editQuotation, des_quant_rate: formValues1 })
    }

    let addFormFields1 = () => {
        setFormValues1([...formValues1, { description: "", quantity: "", rate: "", total_rate: "" }])
    }

    let removeFormFields1 = (i) => {
        let newFormValues = [...formValues1];
        newFormValues.splice(i, 1);
        setFormValues1(newFormValues)
        console.log(newFormValues)
        setEditQuotation({ ...editQuotation, des_quant_rate: newFormValues })
    }
    //Single Read
    const [formValues2, setFormValues2] = useState([{ description: "", quantity: "", rate: "", total_rate: "" }])
    let handleChange2 = (i, e) => {
        let newFormValues = [...formValues1];
        newFormValues[i][e.target.name] = e.target.value;
        // console.log("quantity",newFormValues[i].quantity)
        // console.log("rate",newFormValues[i].rate)
        var total=parseInt(newFormValues[i].rate)*parseInt(newFormValues[i].quantity)
        newFormValues[i].total_rate=total.toString();
        //console.log(total)
        setFormValues2(newFormValues);
        //console.log(formValues);
        setSingleQuotation({ ...editQuotation, des_quant_rate: formValues2 })
    }

    let addFormFields2 = () => {
        setFormValues2([...formValues2, { description: "", quantity: "", rate: "", total_rate: "" }])
    }

    let removeFormFields2 = (i) => {
        let newFormValues = [...formValues2];
        newFormValues.splice(i, 1);
        setFormValues1(newFormValues)
        console.log(newFormValues)
        setReadQuotation({ ...editQuotation, des_quant_rate: newFormValues })
    }


    const [showModal, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const openModal = () => {
        handleShow();
    }
    const [showModal1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    const openModal1 = () => {
        handleShow1();
    }

    //States
    const [customerOption, setCustomerOption] = useState();
    const [total, setTotal] = useState(0);
    const [total1, setTotal1] = useState(0);
    const [quotation, setQuotation] = useState({
        customer_enquiry: "",
        des_quant_rate: [],
        total: 0
    });
    const [readQuotation, setReadQuotation] = useState({
        id: "",
        quotation: "",
        customer_enquiry: "",
        des_quant_rate: [],
        total: 0
    });
    const [editQuotation, setEditQuotation] = useState({
        id: "",
        customer_enquiry: "",
        des_quant_rate: [],
        total: 0
    });
    const [singleQuotation, setSingleQuotation] = useState({
        id: "",
        quotation: "",
        customer_enquiry: "",
        des_quant_rate: [],
        total: 0
    });
    // const [printQuotation, setPrintQuotation] = useState({
    //     id: "",
    //     customer_enquiry: "",
    //     description:"",
    //     quantity:"",
    //     total_rate:"",
    //     total: 0
    // });
    const [printId, setPrintId] = useState();
    const [printCustomerEnquiry, setPrintCustomerEnquiry] = useState();
    const [printTotal, setPrintTotal] = useState();
    const [printCustomerName, setPrintCustomerName] = useState();
    const [printDesQuantRate, setPrintDesQuantRate] = useState([]);

    //Customer option
    useEffect(() => {
        axios.get(api_url + "read_all_enquiry.php")
            .then((res) => {
                setCustomerOption(res.data)
            })
    }, [])
    //Calculate Total
    const calculateTotal = (e) => {
        var totalvalue = 0
        for (var key in formValues) {
            console.log(parseInt(totalvalue))
            totalvalue = parseInt(totalvalue) + parseInt(formValues[key].total_rate)
            setTotal(totalvalue)
            //console.log(totalvalue)
        }
        setQuotation({ ...quotation, total: totalvalue })
    }
    //Event Handlers
    const onCustomerChange = (e) => {
        setQuotation({ ...quotation, [e.target.name]: e.target.value })
    }
    //Add Operation
    const onFormSubmit = (e) => {
        e.preventDefault();
        console.log(quotation);
        axios.post(api_url + "create_quotation.php", quotation)
            .then(() => {
                toast.configure()
                toast.success("Successfully Inserted")
                axios.post(api_url + "read_quotation.php")
                    .then((res) => {
                        setReadQuotation(res.data)
                    })
            })
    }
    //Read Operation
    useEffect(() => {
        axios.post(api_url + "read_quotation.php")
            .then((res) => {
                setReadQuotation(res.data)
            })
    }, [])
    //Print Option
    // const exportPDF = (row) => {
    //     console.log(row)
    //     var arr = [];

    //     for (var prop in row) {
    //         if (row.hasOwnProperty(prop)) {
    //             var innerObj = {};
    //             innerObj[prop] = row[prop];
    //             arr.push(innerObj)
    //         }
    //     }
    //     console.log(arr)
    //     const unit = "pt";
    //     const size = "A4"; // Use A1, A2, A3 or A4
    //     const orientation = "portrait"; // portrait or landscape

    //     const marginLeft = 40;
    //     const doc = new jsPDF(orientation, unit, size);

    //     doc.setFontSize(15);

    //     const title = "Commission Report";
    //     const headers = [["ID", "CUSTOMER", "DES_QUANT_RATE", "TOTAL"]];

    //    // const comm_data = arr.map(quotation, i => [quotation.id, quotation.customer, quotation.des_quant_rate, quotation.total]);
    //    const comm_data=JSON.parse(row.des_quant_rate);
    //     let content = {
    //         startY: 50,
    //         head: headers,
    //         body: comm_data
    //     };
    //     console.log(content)
    //     doc.text(title, marginLeft, 40);
    //     doc.autoTable(content);
    //     doc.save("report.pdf")


    // }
    const exportPDF = async (row) => {
        console.log(row.customer_name)
        const description = JSON.parse(row.des_quant_rate).map(a => a.description);
        //setPrintQuotation(description:description[0])

        const quantity = JSON.parse(row.des_quant_rate).map(a => a.quantity);
        //setPrintQuotation({...printQuotation,quantity:quantity[0]})

        const rate = JSON.parse(row.des_quant_rate).map(a => a.rate);
        //setPrintQuotation({...printQuotation,quantity:quantity[0]})

        const total_rate = JSON.parse(row.des_quant_rate).map(a => a.total_rate);
        //setPrintQuotation({...printQuotation,total_rate:total_rate[0]})

        // await setPrintQuotation({
        //     id:row.id,
        //     customer_enquiry:row.customer_enquiry,
        //     total:row.total,
        //     description:description[0],
        //     quantity:quantity[0],
        //     total_rate:total_rate[0]
        // })

        await setPrintId(row.id)
        await setPrintCustomerEnquiry(row.customer_enquiry)
        await setPrintTotal(row.total)
        await setPrintCustomerName(row.customer_name)
        var arr = []
        for (var i = 0; i < description.length; i++) {
            arr.push({
                description: description[i],
                quantity: quantity[i],
                rate: rate[i],
                total_rate: total_rate[i]
            })
        }
        setPrintDesQuantRate(arr)
        console.log(printDesQuantRate)
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape

        const marginLeft = 85;
        const doc = new jsPDF();
        var image = "http://localhost/girnar_backend/assets/images/girnar_logo.jpg";

        var imageData = "data:image/png;base64,'+Base64.encode('http://localhost/girnar_backend/assets/images/download.png')";

        const current = new Date();
        const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
        doc.setFontSize(10);
        //doc.text("Purchase Order",marginLeft,5);
        doc.addImage(image, 'JPG', 75, 5, 50, 10)
        doc.text("Date-" + date, 150, 25);
        doc.text("Customer-" + row.customer_name, 150, 30);
        var splitTitle = doc.splitTextToSize(row.quotation, 30);
        doc.text("Quotation No-", 150, 35)
        doc.text(150, 40, splitTitle);
        //doc.text("Quotation No-" + splitTitle, 150, 35);
        doc.setFontSize(10);
        doc.text("Girnar Laser", 15, 45)
        doc.text("C-61 Shiroli MIDC,", 15, 50)
        doc.text("Kolhapur - 416122,", 15, 55)
        doc.text("Mobile No. 9423860561 , 7020598766,", 15, 60)
        doc.text("girnarlaser@gmail.com,", 15, 65)
        doc.text("www.girnarlaser.com,", 15, 70)
        doc.text("Mobile No. 9423860561 , 7020598766", 15, 75)
        doc.setFontSize(20);
        doc.text("Terms & Conditions: -", 15, 205);
        doc.setFontSize(10);
        doc.text("1)Above cost includes cost With Material Laser Cutting and Bending.", 15, 210)
        doc.text("2)Quotation Validity for Seven Days.", 15, 215)
        doc.text("3)Laser Cutting as per Auto Cad drawing provided by you.", 15, 220)
        doc.text("4)We Reserve the Right to Amend the Delivery as Per Our Production Plan ", 15, 225)
        doc.text("  And Same Will Be Informed To You Well In Advance.", 15, 230)
        doc.text("5)Job Inspection and Material Testing Should Be Done By You before Processing", 15, 235)
        doc.text("  , Or Else We Will Not Be Responsible For Defects.", 15, 240)
        doc.text("6)GST (18%), Packing, Transportation etc. not considered in above costing.", 15, 245)
        doc.text("7)Payment Terms: - 100% Advance.", 15, 250)
        doc.text("Signature", 15, 275);
        doc.autoTable({ html: document.getElementById('mytable'), theme: 'grid', startY: 80 })
        doc.save('table.pdf')
    }
    // function exportPDF() {
    //     var pdfsize = 'a0';
    //     var pdf = new jsPDF('l', 'pt', pdfsize);
    //     <h1 id="table">Hello</h1>
    //     pdf.autoTable({
    //       html: document.getElementById('table'),
    //       startY: 60,
    //       styles: {
    //         fontSize: 50,
    //         cellWidth: 'wrap'
    //       },
    //       columnStyles: {
    //         1: {columnWidth: 'auto'}
    //       }
    //     });

    //     pdf.save(pdfsize + ".pdf");
    //   };
    //Edit option
    const onEdit = (row) => {
        handleShow();
        setEditQuotation({
            id: row.id,

            customer_enquiry: row.customer_enquiry,
            des_quant_rate: JSON.parse(row.des_quant_rate),
            total: row.total
        })
        setFormValues1(JSON.parse(row.des_quant_rate))
    }
    const calculateTotal1 = (e) => {
        var totalvalue = 0
        for (var key in formValues1) {
            console.log(parseInt(totalvalue))
            totalvalue = parseInt(totalvalue) + parseInt(formValues1[key].total_rate)
            setTotal1(totalvalue)
            setEditQuotation({ ...editQuotation, total: totalvalue })
            console.log(totalvalue)
        }
        //setQuotation({ ...quotation, total: totalvalue })
    }
    const onModalFormSubmit = (e) => {
        e.preventDefault()
        console.log(editQuotation)
        axios.post(api_url + "update_quotation.php", editQuotation)
            .then(() => {
                console.log("Edited")
                toast.configure()
                toast.warning("Successfully Updated")
                axios.post(api_url + "read_quotation.php")
                    .then((res) => {
                        setReadQuotation(res.data)
                    })
            })
        handleClose()
    }
    //Delete
    const onDelete = (id) => {
        axios.post(api_url + "delete_quotation.php", { id: id })
            .then(() => {
                console.log("deleted")
                toast.configure()
                toast.error("Successfully Deleted")
                axios.post(api_url + "read_quotation.php")
                    .then((res) => {
                        setReadQuotation(res.data)
                    })
            })
    }
    //Read
    const onRead = (row) => {
        handleShow1();
        setSingleQuotation({
            id: row.id,
            quotation: row.quotation,
            customer_enquiry: row.customer_enquiry,
            des_quant_rate: JSON.parse(row.des_quant_rate),
            total: row.total
        })
        setFormValues2(JSON.parse(row.des_quant_rate))
    }
    const columns = [
        {
            field: 'id',
            headerName: 'Id'
        },
        {
            field: 'quotation',
            headerName: 'Quotation Number',
            width: 200
        },
        {
            field: 'customer_name',
            headerName: 'Customer Name'
        },
        // {
        //     field: 'des_quant_rate',
        //     headerName: 'Des_quant_rate'
        // },
        {
            field: 'total',
            headerName: 'Total'
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 300,
            renderCell: (params) => {
                return (
                    <div className="">
                        <button onClick={() => onRead(params.row)} data-toggle="tooltip" title="Read" type="button" className="btn btn-success"  ><i class="fas fa-eye"></i></button>
                        <button onClick={() => exportPDF(params.row)} data-toggle="tooltip" title="Read" style={{ marginLeft: '20%' }} type="button" className="btn btn-primary"  ><i class="fas fa-download"></i></button>
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
    const rows = readQuotation.data;
    return (

        <>
            <div style={{ display: 'none' }}>
                <table className="tbl tbl-bordered" id="mytable">

                    <tr>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Rate</th>
                        <th>Total Rate</th>
                    </tr>
                    {/* {printDesQuantRate===undefined?[]:printDesQuantRate.map((des)=>(
            <tr>
                <td>{des.description}</td>
                <td>{des.quantity}</td>
                <td>{des.total_rate}</td>
            </tr>
            ))} */}
                    {printDesQuantRate === [] ? [] : printDesQuantRate.map(des => {
                        return (
                            <tr>
                                <td>{des.description}</td>
                                <td>{des.quantity}</td>
                                <td>{des.rate}</td>
                                <td>{des.total_rate}</td>
                            </tr>
                        )
                    })}
                    <tr>
                        <th>Total</th>
                        <td></td>
                        <td></td>
                        <th>{printTotal}</th>
                    </tr>
                </table>
            </div>

            <Header />
            <Menu />

            <div className='content-wrapper'>
                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header>
                        <Modal.Title>Details Read</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={onModalFormSubmit}>
                            <div className="card-body">
                                <div className="form-group">
                                    <label>Id</label>
                                    <input defaultValue={editQuotation.id} name="id" type="text" className="form-control" readOnly />
                                </div>
                                <select defaultValue={editQuotation.customer_enquiry} onChange={onCustomerChange} className='form-control' name="customer_enquiry" required>
                                    <option>Select</option>
                                    {customerOption === undefined ? [] : customerOption.data.map((customer) => (
                                        <option value={customer.id} key={customer.id}>{customer.inquiry}</option>
                                    ))}
                                </select>
                                <hr />
                                {formValues1.map((element, index) => (
                                    <div className="form-group" key={index}>
                                        <label>Description</label>
                                        <input name="description" className="form-control" type="text" value={element.description || ""} onChange={e => handleChange1(index, e)} required/>
                                        <label>Quantity</label>
                                        <input name="quantity" className="form-control" type="number" value={element.quantity || ""} onChange={e => handleChange1(index, e)} required/>
                                        <label>Rate</label>
                                        <input name="rate" className="form-control" type="number" value={element.rate || ""} onChange={e => handleChange1(index, e)} required/>
                                        <label>Total Rate</label>
                                        <input name="total_rate" className="form-control" type="number" value={element.total_rate || ""} onChange={e => handleChange1(index, e)} required/>
                                        {
                                            index ?
                                                <button type="button" className="btn btn-danger" onClick={() => removeFormFields1(index)}>Remove</button>
                                                : null
                                        }
                                    </div>
                                ))}
                                <div className="button-section">
                                    <button className="btn btn-info" type="button" onClick={() => addFormFields1()}>Add</button>

                                </div><br />
                                <div className="button-section">
                                    <button onClick={calculateTotal1} className="btn btn-success" type="button">Calculate Total</button>

                                </div>
                                <div className="form-group">
                                    <label>Total</label>
                                    <input value={editQuotation.total} type='number' name="total" className='form-control' required/>
                                </div>
                                <div className="card-footer">
                                    <button type="submit" className="btn btn-primary">Submit</button>
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
                <Modal show={showModal1} onHide={handleClose1}>
                    <Modal.Header>
                        <Modal.Title>Details Read</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form >
                            <div className="card-body">
                                <div className="form-group">
                                    <label>Id</label>
                                    <input defaultValue={singleQuotation.id} name="id" type="text" className="form-control" readOnly />
                                </div>
                                <div className="form-group">
                                    <label>Quotation</label>
                                    <input defaultValue={singleQuotation.quotation} name="quotation" type="text" className="form-control" readOnly />
                                </div>
                                <select defaultValue={singleQuotation.customer_enquiry} className='form-control' name="customer_enquiry">
                                    <option>Select</option>
                                    {customerOption === undefined ? [] : customerOption.data.map((customer) => (
                                        <option disabled={true} value={customer.id} key={customer.id}>{customer.inquiry}</option>
                                    ))}
                                </select>
                                <hr />
                                {formValues2.map((element, index) => (
                                    <div className="form-group" key={index}>
                                        <label>Description</label>
                                        <input name="description" className="form-control" type="text" value={element.description || ""} onChange={e => handleChange2(index, e)} readOnly />
                                        <label>Quantity</label>
                                        <input name="quantity" className="form-control" type="number" value={element.quantity || ""} onChange={e => handleChange2(index, e)} readOnly />
                                        <label>Rate</label>
                                        <input name="rate" className="form-control" type="number" value={element.rate || ""} onChange={e => handleChange2(index, e)} />
                                        <label>Total Rate</label>
                                        <input name="total_rate" className="form-control" type="number" value={element.total_rate || ""} onChange={e => handleChange2(index, e)} readOnly />

                                    </div>
                                ))}

                                <hr />
                                <div className="form-group">
                                    <label>Total</label>
                                    <input value={singleQuotation.total} type='number' name="total" className='form-control' readOnly />
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


                <section class="content">
                    <div className="container-fluid">
                        <div className="row">
                            {/* left column */}
                            <div className="col-md-12">
                                <div class="card">
                                    <form onSubmit={onFormSubmit}>
                                        <div class="card-header">
                                            <h3 class="card-title">Quotation Form</h3>
                                        </div>
                                        <div class="card-body">

                                            <div className='form-group'>
                                                <label>Customer</label>
                                                <select onChange={onCustomerChange} className='form-control' name="customer_enquiry" required>
                                                    <option>Select</option>
                                                    {customerOption === undefined ? [] : customerOption.data.map((customer) => (
                                                        <option value={customer.id} key={customer.id}>{customer.inquiry}</option>
                                                    ))}
                                                </select>
                                                {formValues.map((element, index) => (
                                                    <div className=''>
                                                        <hr />
                                                        <div className="row" key={index}>
                                                            <div className='col-md-4'>
                                                                <label>Description</label>
                                                                <input name="description" className="form-control" type="text" value={element.description || ""} onChange={e => handleChange(index, e)} required/>
                                                            </div>
                                                            <div className='col-md-4'>
                                                                <label>Quantity</label>
                                                                <input name="quantity" className="form-control" type="number" value={element.quantity || ""} onChange={e => handleChange(index, e)} required/>
                                                            </div>
                                                            <div className='col-md-4'>
                                                                <label>Rate</label>
                                                                <input name="rate" className="form-control" type="number" value={element.rate || ""} onChange={e => handleChange(index, e)} required/>
                                                            </div>
                                                            <div className='col-md-4'>
                                                                <label>Total Rate</label>
                                                                <input name="total_rate" className="form-control" type="number" value={element.total_rate || ""} onChange={e => handleChange(index, e)} required/>
                                                            </div>
                                                            

                                                            {
                                                                index ?
                                                                    <div className="row">
                                                                        <button type="button" style={{ marginLeft: '15px',height:'40px' }} className="form-group btn btn-danger" onClick={() => removeFormFields(index)}>Remove</button>

                                                                    </div>
                                                                    : null
                                                            }
                                                        </div>
                                                        <hr />
                                                    </div>

                                                ))}
                                                <div className="button-section">
                                                    <button className="btn btn-info" type="button" onClick={() => addFormFields()}>Add</button>

                                                </div><br />
                                                <div className="button-section">
                                                    <button onClick={calculateTotal} className="btn btn-success" type="button">Calculate Total</button>

                                                </div>
                                                <div className="form-group">
                                                    <label>Total</label>
                                                    <input value={total} type='number' name="total" className='form-control' required/>
                                                </div>
                                            </div>

                                        </div>
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
                                        <h3 class="card-title">Quotation</h3>
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
            </div></>
    )
}

export default DesignerHeadQuotationMaster
