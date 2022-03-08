import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Modal, Button } from "react-bootstrap";
import Header from '../../Header';
import Menu from '../../Menu';
import { api_url } from '../ApiUrl';
import { DataGrid } from '@mui/x-data-grid';
import { jsPDF } from "jspdf";
import 'jspdf-autotable'

function QuotationMaster() {
    const [formValues, setFormValues] = useState([{ description: "", quantity: "", total_rate: "" }])
    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;

        setFormValues(newFormValues);
        console.log(formValues);
        // if(e.target.name==="total_rate")
        // {   
        //     //console.log(formValues[i-1].total_rate)
        //    // console.log(i)
        //     if(i-1===-1)
        //     {
        //         //formValues.total_rate=0;
        //         setTotal(parseInt(0 + parseInt(e.target.value)));
        //     }
        //     else
        //     {
        //         setTotal(parseInt(formValues[i-1].total_rate) + parseInt(e.target.value));
        //     }

        //    console.log(total)
        // }
        setQuotation({ ...quotation, des_quant_rate: formValues })
    }

    let addFormFields = () => {
        setFormValues([...formValues, { description: "", quantity: "", total_rate: "" }])
    }

    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }


    const [showModal, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const openModal = () => {
        handleShow();
    }

    //States
    const [customerOption, setCustomerOption] = useState();
    const [total, setTotal] = useState(0);
    const [quotation, setQuotation] = useState({
        customer_enquiry: "",
        des_quant_rate: [],
        total: 0
    });
    const [readQuotation, setReadQuotation] = useState({
        id: "",
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
    const [printId,setPrintId] = useState();
    const [printCustomerEnquiry,setPrintCustomerEnquiry] = useState();
    const [printTotal,setPrintTotal] = useState();
    const [printDesQuantRate,setPrintDesQuantRate] = useState([]);

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
                console.log("Created")
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

        const description = JSON.parse(row.des_quant_rate).map(a => a.description);
        //setPrintQuotation(description:description[0])

        const quantity = JSON.parse(row.des_quant_rate).map(a => a.quantity);
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
        var arr=[]
        for(var i=0;i<description.length;i++)
        {
            arr.push({description:description[i],
                quantity:quantity[i],
                total_rate:total_rate[i]})
        }
        setPrintDesQuantRate(arr)
        console.log(printDesQuantRate)
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape

        const marginLeft =85;
        const doc = new jsPDF();
        var image = "http://localhost/girnar_backend/assets/images/girnar_logo.jpg";

        var imageData="data:image/png;base64,'+Base64.encode('http://localhost/girnar_backend/assets/images/download.png')";
        

        doc.setFontSize(20);
        //doc.text("Girnar Laser",marginLeft,5);
        doc.addImage(image,'JPG',75,5,50,10)
        doc.text("Girnar Laser",marginLeft,25);
        doc.setFontSize(10);
        doc.text("Girnar Laser",15,30)
        doc.text("C-61 Shiroli MIDC,",15,35)
        doc.text("Kolhapur - 416122,",15,40)
        doc.text("Mobile No. 9423860561 , 7020598766,",15,45)
        doc.text("girnarlaser@gmail.com,",15,50)
        doc.text("www.girnarlaser.com,",15,55)
        doc.text("Mobile No. 9423860561 , 7020598766",15,60)
        doc.setFontSize(20);
        doc.text("Terms & Conditions: -",15,205);
        doc.setFontSize(10);
        doc.text("1)Above cost includes cost With Material Laser Cutting and Bending.",15,210)
        doc.text("2)Quotation Validity for Seven Days.",15,215)
        doc.text("3)Laser Cutting as per Auto Cad drawing provided by you.",15,220)
        doc.text("4)We Reserve the Right to Amend the Delivery as Per Our Production Plan ",15,225)
        doc.text("  And Same Will Be Informed To You Well In Advance.",15,230)
        doc.text("5)Job Inspection and Material Testing Should Be Done By You before Processing",15,235)
        doc.text("  , Or Else We Will Not Be Responsible For Defects.",15,240)
        doc.text("6)GST (18%), Packing, Transportation etc. not considered in above costing.",15,245)
        doc.text("7)Payment Terms: - 100% Advance.",15,250)
        doc.text("Signature",15,275);
        doc.autoTable({ html: document.getElementById('mytable') ,theme: 'grid',startY: 75})
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
    const columns = [
        {
            field: 'id',
            headerName: 'Id'
        },
        {
            field: 'customer_enquiry',
            headerName: 'Customer'
        },
        {
            field: 'des_quant_rate',
            headerName: 'Des_quant_rate'
        },
        {
            field: 'total',
            headerName: 'Total'
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="">
                        <button onClick={() => exportPDF(params.row)} data-toggle="tooltip" title="Read" type="button" className="btn btn-primary"  ><i class="far fa-eye"></i></button>
                    </div>
                );
            }
        },
    ]
    const rows = readQuotation.data;
    return (

        <>
        <div style={{display:'none'}}>
        <table className="tbl tbl-bordered" id="mytable">
            
            <tr>
                <th>Description</th>
                <th>Quantity</th>
                <th>Total Rate</th>
            </tr>
            {/* {printDesQuantRate===undefined?[]:printDesQuantRate.map((des)=>(
            <tr>
                <td>{des.description}</td>
                <td>{des.quantity}</td>
                <td>{des.total_rate}</td>
            </tr>
            ))} */}
            {printDesQuantRate===[]?[]:printDesQuantRate.map(des=>{
                return(
                    <tr>
                        <td>{des.description}</td>
                        <td>{des.quantity}</td>
                        <td>{des.total_rate}</td>
                    </tr>
                )
            })}
            <tr>
                <th>Total</th>
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
                                    <form onSubmit={onFormSubmit}>
                                        <div class="card-header">
                                            <h3 class="card-title">Quotation Form</h3>
                                        </div>
                                        <div class="card-body">

                                            <div className='form-group'>
                                                <label>Customer</label>
                                                <select onChange={onCustomerChange} className='form-control' name="customer_enquiry">
                                                    <option>Select</option>
                                                    {customerOption === undefined ? [] : customerOption.data.map((customer) => (
                                                        <option value={customer.id} key={customer.id}>{customer.id}</option>
                                                    ))}
                                                </select>
                                                {formValues.map((element, index) => (
                                                    <div className="form-inline" key={index}>
                                                        <label>Description</label>
                                                        <input name="description" className="form-control" type="text" value={element.description || ""} onChange={e => handleChange(index, e)} />
                                                        <label>Quantity</label>
                                                        <input name="quantity" className="form-control" type="number" value={element.quantity || ""} onChange={e => handleChange(index, e)} />
                                                        <label>Total Rate</label>
                                                        <input name="total_rate" className="form-control" type="number" value={element.total_rate || ""} onChange={e => handleChange(index, e)} />
                                                        {
                                                            index ?
                                                                <button type="button" className="btn btn-danger" onClick={() => removeFormFields(index)}>Remove</button>
                                                                : null
                                                        }
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

export default QuotationMaster
