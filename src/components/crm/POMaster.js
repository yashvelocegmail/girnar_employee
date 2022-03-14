import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Modal, Button, Form } from "react-bootstrap";
import Header from '../../Header';
import Menu from '../../Menu';
import { api_url } from '../ApiUrl';
import { DataGrid } from '@mui/x-data-grid';
import { jsPDF } from "jspdf";
import 'jspdf-autotable'

function POGeneration() {
  const [formValues, setFormValues] = useState([{ description: "", quantity: "", rate: "", total_rate: "" }])
  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;

    setFormValues(newFormValues);
    console.log(formValues);
    setPurchaseOrder({ ...purchaseOrder, des_quant_rate_total: formValues })
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

    setFormValues1(newFormValues);
    //console.log(formValues);
    setEditPurchaseOrder({ ...editPurchaseOrder, des_quant_rate_total: newFormValues })
  }

  let addFormFields1 = () => {
    setFormValues1([...formValues1, { description: "", quantity: "", rate: "", total_rate: "" }])
  }

  let removeFormFields1 = (i) => {
    let newFormValues = [...formValues1];
    newFormValues.splice(i, 1);
    setFormValues1(newFormValues)
    console.log(newFormValues)
    setEditPurchaseOrder({ ...editPurchaseOrder, des_quant_rate_total: newFormValues })
  }
  //Single Read
  const [formValues2, setFormValues2] = useState([{ description: "", quantity: "", rate: "", total_rate: "" }])
  let handleChange2 = (i, e) => {
    let newFormValues = [...formValues1];
    newFormValues[i][e.target.name] = e.target.value;

    setFormValues2(newFormValues);
    //console.log(formValues);
    //setSingleQuotation({ ...editQuotation, des_quant_rate: formValues2 })
  }

  let addFormFields2 = () => {
    setFormValues2([...formValues2, { description: "", quantity: "", rate: "", total_rate: "" }])
  }

  let removeFormFields2 = (i) => {
    let newFormValues = [...formValues2];
    newFormValues.splice(i, 1);
    setFormValues1(newFormValues)
    console.log(newFormValues)
    //setReadQuotation({ ...editQuotation, des_quant_rate: newFormValues })
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
  const [customer_option, set_customer_option] = useState();
  const [quotationOption, setQuotationOption] = useState();
  const [total, setTotal] = useState(0);
  const [total1, setTotal1] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [purchaseOrder, setPurchaseOrder] = useState({
    quotation: "",
    customer: localStorage.getItem("customer_id"),
    des_quant_rate_total: [],
    cgst: 9,
    sgst: 9,
    discount: "",
    total: 0
  });
  const [readPurchaseOrder, setReadPurchaseOrder] = useState({
    id: "",
    purchase_order:"" ,
    quotation: "",
    customer: localStorage.getItem("customer_id"),
    des_quant_rate_total: [],
    cgst: 9,
    sgst: 9,
    discount: "",
    total: 0
  });
  const [editPurchaseOrder, setEditPurchaseOrder] = useState({
    id: "",
    purchase_order: "",
    quotation: "",
    customer: localStorage.getItem("customer_id"),
    des_quant_rate_total: [],
    cgst: 9,
    sgst: 9,
    discount: "",
    total: 0
  });
  const [singlePurchaseOrder, setSinglePurchaseOrder] = useState({
    id: "",
    purchase_order: "",
    quotation: "",
    customer: "",
    des_quant_rate_total: [],
    cgst: 9,
    sgst: 9,
    discount: "",
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
  const [printPurchaseOrder, setPrintPurchaseOrder] = useState();
  const [printCGST, setPrintCGST] = useState();
  const [printSGST, setPrintSGST] = useState();
  const [printDiscount, setPrintDiscount] = useState();
  const [printTotal, setPrintTotal] = useState();
  const [printDesQuantRateTotal, setPrintDesQuantRateTotal] = useState([]);

  //Customer option
  
  useEffect(() => {
    axios.post(api_url + "read_quotation.php")
      .then((res) => {
        setQuotationOption(res.data)
      })
  }, [])
  //Calculate Total
  const calculateTotal = (e) => {
    var totalvalue = 0
    for (var key in formValues) {
      console.log(parseInt(formValues[key].total_rate))
      totalvalue = parseInt(totalvalue) + parseInt(formValues[key].total_rate)

    }
    var totalgst = (totalvalue * 18) / 100
    var totaldiscount = (totalvalue * parseInt(purchaseOrder.discount)) / 100

    var grossTotal = totalvalue - totaldiscount + totalgst;
    setTotal(grossTotal)
    setPurchaseOrder({ ...purchaseOrder, total: grossTotal })
  }
  //Event Handlers
  const onQuotationChange = (e) => {
    setPurchaseOrder({ ...purchaseOrder, [e.target.name]: e.target.value })
  }
  //Add Operation
  const onFormSubmit = (e) => {
    e.preventDefault();
    console.log(purchaseOrder);
    axios.post(api_url + "create_purchase_order.php", purchaseOrder)
      .then(() => {
        console.log("Created")
        axios.post(api_url + "read_purchase_order_crm.php")
          .then((res) => {
            setReadPurchaseOrder(res.data)
          })
      })
  }
  //Read Operation
  useEffect(() => {
    axios.post(api_url + "read_purchase_order_crm.php")
      .then((res) => {
        setReadPurchaseOrder(res.data)
      })
  }, [])

  const exportPDF = async (row) => {
    console.log(row)
    const description = JSON.parse(row.des_quant_rate_total).map(a => a.description);


    const quantity = JSON.parse(row.des_quant_rate_total).map(a => a.quantity);

    const rate = JSON.parse(row.des_quant_rate_total).map(a => a.rate);

    const total_rate = JSON.parse(row.des_quant_rate_total).map(a => a.total_rate);


    await setPrintId(row.id)
    await setPrintPurchaseOrder(row.purchaseOrder)
    await setPrintTotal(row.total)
    var arr = []
    for (var i = 0; i < description.length; i++) {
      arr.push({
        description: description[i],
        quantity: quantity[i],
        rate: rate[i],
        total_rate: total_rate[i],
      })
    }
    setPrintCGST(row.cgst)
    setPrintSGST(row.sgst)
    setPrintDiscount(row.discount)
    setPrintDesQuantRateTotal(arr)
    console.log(printDesQuantRateTotal)
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 50;
    const doc = new jsPDF();
    var image = "http://localhost/girnar_backend/assets/images/girnar_logo.jpg";

    var imageData = "data:image/png;base64,'+Base64.encode('http://localhost/girnar_backend/assets/images/download.png')";

    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
    doc.setFontSize(20);
    doc.text(row.purchase_order,marginLeft,5);
    //doc.addImage(image, 'JPG', 75, 5, 50, 10)
    doc.setFontSize(10);
    doc.text("Date-" + date, 150, 25);
    doc.setFontSize(10);
    doc.text("Name-"+row.name, 15, 30)
    doc.text("Address-"+row.address1, 15, 35)
    doc.text(row.address2, 15, 40)
    doc.text(row.address3, 15, 45)
    doc.text("Email Id-"+row.email_id, 15, 50)
    doc.text("Mobile No.-"+row.mobile_number, 15, 55)

    doc.text("Girnar Laser", 130, 65)
    doc.text("C-61 Shiroli MIDC,", 130, 70)
    doc.text("Kolhapur - 416122,", 130, 75)
    doc.text("Mobile No. 9423860561 , 7020598766,", 130, 80)
    doc.text("girnarlaser@gmail.com,", 130, 85)
    doc.text("www.girnarlaser.com,", 130, 90)


    doc.text("Signature", 15, 275);
    doc.autoTable({ html: document.getElementById('mytable'), theme: 'grid', startY: 95 })
    doc.save('table.pdf')
  }

  //Edit option
  const onEdit = (row) => {
    handleShow();
    setEditPurchaseOrder({
      id: row.id,
      purchase_order: row.purchase_order,
      quotation: row.quotation_id,
      customer: row.customer,
      des_quant_rate_total: JSON.parse(row.des_quant_rate_total),
      cgst: row.cgst,
      sgst: row.sgst,
      discount: row.discount,
      total: row.total
    })
    setFormValues1(JSON.parse(row.des_quant_rate_total))
    console.log(row.quotation)
  }
  const calculateTotal1 = (e) => {
    var totalvalue = 0
    for (var key in formValues1) {
      console.log(parseInt(totalvalue))
      totalvalue = parseInt(totalvalue) + parseInt(formValues1[key].total_rate)

    }
    var totalgst = (totalvalue * 18) / 100
    var totaldiscount = (totalvalue * parseInt(editPurchaseOrder.discount)) / 100

    var grossTotal = totalvalue - totaldiscount + totalgst;
    setTotal1(grossTotal)
    console.log(grossTotal)
    setEditPurchaseOrder({ ...editPurchaseOrder, total: grossTotal })
    //setQuotation({ ...quotation, total: totalvalue })
  }
  //Edit

  const onModalFormSubmit = (e) => {
    e.preventDefault()
    console.log(editPurchaseOrder);
    axios.post(api_url + "update_purchase_order.php", editPurchaseOrder)
      .then(() => {
        console.log("Edited")
        axios.post(api_url + "read_purchase_order_crm.php")
          .then((res) => {
            setReadPurchaseOrder(res.data)
          })
      })
    handleClose()
  }
  //Delete
  const onDelete = (id) => {
    axios.post(api_url + "delete_purchase_order.php", { id: id })
      .then(() => {
        console.log("deleted")
        axios.post(api_url + "read_purchase_order_crm.php")
          .then((res) => {
            setReadPurchaseOrder(res.data)
          })
      })
  }
  //Read
  const onRead = (row) => {
    handleShow1();
    setSinglePurchaseOrder({
      id: row.id,
      purchase_order: row.purchase_order,
      quotation: row.quotation_id,
      customer: row.customer,
      des_quant_rate_total: row.des_quant_rate_total,
      cgst: row.gst,
      sgst: row.sgst,
      discount: row.discount,
      total: row.total
    })
    setFormValues2(JSON.parse(row.des_quant_rate_total))
  }
  const onDiscountChange = (e) => {
    setPurchaseOrder({ ...purchaseOrder, discount: e.target.value })
  }
  const onModalDiscountChange = (e) => {
    setEditPurchaseOrder({ ...editPurchaseOrder, discount: e.target.value })
  }
  const columns = [
    {
      field: 'id',
      headerName: 'Id'
    },
    {
      field: 'purchase_order',
      headerName: 'Purchase Order Number',
      width: 200
    },
    {
      field: 'quotation',
      headerName: 'Quotation'
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
  const rows = readPurchaseOrder.data;
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

          {printDesQuantRateTotal === [] ? [] : printDesQuantRateTotal.map(des => {
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
            <th>CGST</th>
            <td></td>
            <td></td>
            <th>{printCGST}</th>
          </tr>
          <tr>
            <th>SGST</th>
            <td></td>
            <td></td>
            <th>{printSGST}</th>
          </tr>
          <tr>
            <th>Discount</th>
            <td></td>
            <td></td>
            <th>{printDiscount}</th>
          </tr>
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
            <Modal.Title>Edit</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={onModalFormSubmit}>
              <div className="card-body">
                <div className="form-group">
                  <label>Id</label>
                  <input defaultValue={editPurchaseOrder.id} name="id" type="text" className="form-control" readOnly />
                </div>
                <select defaultValue={editPurchaseOrder.quotation} className='form-control' name="quotation">
                  <option>Select</option>
                  {quotationOption === undefined ? [] : quotationOption.data.map((quotation) => (
                    <option disabled={true} value={quotation.id} key={quotation.id}>{quotation.quotation}</option>
                  ))}
                </select>
                
                <hr />
                {formValues1.map((element, index) => (
                  <div className="form-group" key={index}>
                    <label>Description</label>
                    <input name="description" className="form-control" type="text" value={element.description || ""} onChange={e => handleChange1(index, e)} />
                    <label>Quantity</label>
                    <input name="quantity" className="form-control" type="number" value={element.quantity || ""} onChange={e => handleChange1(index, e)} />
                    <label>Rate</label>
                    <input name="rate" className="form-control" type="number" value={element.rate || ""} onChange={e => handleChange1(index, e)} />
                    <label>Total Rate</label>
                    <input name="total_rate" className="form-control" type="number" value={element.total_rate || ""} onChange={e => handleChange1(index, e)} />
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
                <div className="form-group">
                  <label>CGST</label>
                  <input value={9} type='number' name="total" className='form-control' />
                </div>
                <div className="form-group">
                  <label>SGST</label>
                  <input value={9} type='number' name="total" className='form-control' />
                </div>
                <div className="form-group">
                  <label>Discount</label>
                  <input value={editPurchaseOrder.discount} onChange={onModalDiscountChange} type='number' name="total" className='form-control' />
                </div>
                <div className="button-section">
                  <button onClick={calculateTotal1} className="btn btn-success" type="button">Calculate Total</button>

                </div>
                <div className="form-group">
                  <label>Total</label>
                  <input value={editPurchaseOrder.total} type='number' name="total" className='form-control' />
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
            <Form>
              <div className="card-body">
                <div className="form-group">
                  <label>Id</label>
                  <input defaultValue={singlePurchaseOrder.id} name="id" type="text" className="form-control" readOnly />
                </div>
                <div className="form-group">
                  <label>Purchase Order</label>
                  <input defaultValue={singlePurchaseOrder.purchase_order} name="purchase_order" type="text" className="form-control" readOnly />
                </div>
                <select defaultValue={singlePurchaseOrder.quotation} className='form-control' name="quotation" readOnly>
                  <option>Select</option>
                  {quotationOption === undefined ? [] : quotationOption.data.map((quotation) => (
                    <option disabled={true} value={quotation.id} key={quotation.id}>{quotation.quotation}</option>
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
                    <input name="rate" className="form-control" type="number" value={element.rate || ""} onChange={e => handleChange2(index, e)} readOnly />
                    <label>Total Rate</label>
                    <input name="total_rate" className="form-control" type="number" value={element.total_rate || ""} onChange={e => handleChange2(index, e)} readOnly />

                  </div>
                ))}

                <hr />
                <div className="form-group">
                  <label>CGST</label>
                  <input value={9} type='number' name="total" className='form-control' readOnly />
                </div>
                <div className="form-group">
                  <label>SGST</label>
                  <input value={9} type='number' name="total" className='form-control' readOnly />
                </div>
                <div className="form-group">
                  <label>Discount</label>
                  <input value={singlePurchaseOrder.discount} onChange={onModalDiscountChange} type='number' name="total" className='form-control' readOnly />
                </div>

                <div className="form-group">
                  <label>Total</label>
                  <input value={singlePurchaseOrder.total} type='number' name="total" className='form-control' readOnly />
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
                      <h3 class="card-title">Purchase Order Form</h3>
                    </div>
                    <div class="card-body">

                      <div className='form-group'>
                        <label>Quotation</label>
                        <select onChange={onQuotationChange} className='form-control' name="quotation">
                          <option>Select</option>
                          {quotationOption === undefined ? [] : quotationOption.data.map((quotation) => (
                            <option value={quotation.id} key={quotation.id}>{quotation.quotation}</option>
                          ))}
                        </select>

                        <hr />
                        {formValues.map((element, index) => (
                          <div className=''>
                            <hr />
                            <div className="row" key={index}>
                              <div className='col-md-4'>
                                <label>Description</label>
                                <input name="description" className="form-control" type="text" value={element.description || ""} onChange={e => handleChange(index, e)} />
                              </div>
                              <div className='col-md-4'>
                                <label>Quantity</label>
                                <input name="quantity" className="form-control" type="number" value={element.quantity || ""} onChange={e => handleChange(index, e)} />
                              </div>
                              <div className='col-md-4'>
                                <label>Rate</label>
                                <input name="rate" className="form-control" type="number" value={element.rate || ""} onChange={e => handleChange(index, e)} />
                              </div>
                              <div className='col-md-4'>
                                <label>Total Rate</label>
                                <input name="total_rate" className="form-control" type="number" value={element.total_rate || ""} onChange={e => handleChange(index, e)} />
                              </div>



                              {
                                index ?
                                  <div className="row">
                                    <button type="button" style={{ marginLeft: '15px' }} className="form-group btn btn-danger" onClick={() => removeFormFields(index)}>Remove</button>

                                  </div>
                                  : null
                              }
                            </div>
                            <hr />
                          </div>

                        ))}

                        <hr />
                        <div className="button-section">
                          <button className="btn btn-info" type="button" onClick={() => addFormFields()}>Add</button>

                        </div><br />
                        <div className="form-group">
                          <label>CGST</label>
                          <input value={9} type='number' name="total" className='form-control' />
                        </div>
                        <div className="form-group">
                          <label>SGST</label>
                          <input value={9} type='number' name="total" className='form-control' />
                        </div>
                        <div className="form-group">
                          <label>Discount</label>
                          <input onChange={onDiscountChange} type='number' name="total" className='form-control' />
                        </div>
                        <div className="button-section">
                          <button onClick={calculateTotal} className="btn btn-success" type="button">Calculate Total</button>

                        </div>
                        <div className="form-group">
                          <label>Total</label>
                          <input value={total} type='number' name="total" className='form-control' />
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
                    <h3 class="card-title">Purchase Order</h3>
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

export default POGeneration
