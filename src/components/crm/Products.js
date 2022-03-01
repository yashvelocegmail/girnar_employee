import React, { useState, useEffect } from 'react'
import Header from '../../Header';
import Menu from '../../Menu';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { toast } from 'react-toastify';
import { Modal, Button } from "react-bootstrap";
import DownloadLink from "react-download-link";
import { saveAs } from "file-saver";
import { Link } from 'react-router-dom';

function Products() {
    //Modal Settings
    const [showModal, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showModal1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    //States
    const [products, setProducts] = useState({
        product_name: '',
        available_stock: '',
        uom: '',
        price: '',
        file_upload: ''
    })
    const [readProducts, setReadProducts] = useState({
        id: '',
        product_name: '',
        available_stock: '',
        uom: '',
        price: '',
        file_upload: ''
    })
    const [modalProducts, setModalProducts] = useState({
        id: '',
        product_name: '',
        available_stock: '',
        uom: '',
        price: '',
        file_upload: ''
    })
    const [singleProducts, setSingleProducts] = useState({
        id: '',
        product_name: '',
        available_stock: '',
        uom: '',
        price: '',
        file_upload: ''
    })
    //Create
    const onInputChange = (e) => {
        if (e.target.name === "product_file") {
            setProducts({ ...products, product_file: e.target.files[0] })
        }
        else {
            setProducts({ ...products, [e.target.name]: e.target.value })
        }
    }
    const onFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('product_name', products.product_name);
        formData.append('available_stock', products.available_stock);
        formData.append('uom', products.uom);
        formData.append('price', products.price);
        formData.append('product_file', products.product_file);
        axios.post("http://localhost/girnar_backend/api/create_products.php", formData)
            .then(() => {
                console.log("Inserted")
                toast.configure();
                toast.success("Successfully Inserted");
                axios.get("http://localhost/girnar_backend/api/read_products.php")
                    .then((res) => {
                        setReadProducts(res.data);
                    })
            })
    }
    //Read
    useEffect(() => {
        axios.get("http://localhost/girnar_backend/api/read_products.php")
            .then((res) => {
                setReadProducts(res.data);
            })
    }, [])
    //Single
    const onRead = (row) => {
        handleShow1();
        setSingleProducts({
            id: row.id,
            product_name: row.product_name,
            available_stock: row.available_stock,
            uom: row.uom,
            price: row.price,
            product_file: row.product_file
        })
    }
    //Update
    const onEdit = (row) => {
        handleShow();
        setModalProducts({
            id: row.id,
            product_name: row.product_name,
            available_stock: row.available_stock,
            uom: row.uom,
            price: row.price,
            product_file: row.product_file
        })
    }
    const onModalInputChange = (e) => {
        if (e.target.name === "product_file") {
            setModalProducts({ ...modalProducts, product_file: e.target.files[0] })
        }
        else {
            setModalProducts({ ...modalProducts, [e.target.name]: e.target.value })
        }
    }
    const onModalFormSubmit = (e) => {
        e.preventDefault();
        const modalFormData = new FormData();
        modalFormData.append('id', modalProducts.id);
        modalFormData.append('product_name', modalProducts.product_name);
        modalFormData.append('available_stock', modalProducts.available_stock);
        modalFormData.append('uom', modalProducts.uom);
        modalFormData.append('price', modalProducts.price);
        modalFormData.append('product_file', modalProducts.product_file);
        axios.post("http://localhost/girnar_backend/api/update_products.php", modalFormData)
            .then(() => {
                console.log("Updated")
                toast.configure();
                toast.warning("Successfully Updated");
                axios.get("http://localhost/girnar_backend/api/read_products.php")
                    .then((res) => {
                        setReadProducts(res.data);
                    })
            })
        handleClose();
    }

    //Delete
    const onDelete = (rowid) => {
        axios.post("http://localhost/girnar_backend/api/delete_products.php", { id: rowid })
            .then(() => {
                console.log("Deletyefd")
                toast.configure();
                toast.error("Successfully Deleted");
                axios.get("http://localhost/girnar_backend/api/read_products.php")
                    .then((res) => {
                        setReadProducts(res.data);
                    })
            })
    }
    // const saveFile = () => {
    //     var file = new File(["Hello, world!"], "http://localhost/girnar_backend/assets/images/6215f8addbcca_Cities.txt", {type: "text/plain;charset=utf-8"});
    //     saveAs(file);
    //   };
    const saveFile = (imagename) => {
        // fetch('http://localhost/girnar_backend/assets/images/6215f8addbcca_Cities.txt', {
        //     method: 'POST',
        //     mode: "no-cors"
        // })
        console.log(imagename);
        axios({
            url:`http://localhost/girnar_backend/assets/images/${imagename}`,
            method:'GET',
            responseType:'blob',
            mode: "no-cors"
        })
        .then((res)=>{
            console.log(res)
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement("a")
            link.href=url;
            link.setAttribute("download","file.png")
            document.body.appendChild(link);
            link.click();
        })
    }
    //Data table
    const columns = [
        {
            field: 'id',
            headerName: 'Id'
        },
        {
            field: 'available_stock',
            headerName: 'Available Stock'
        },
        {
            field: 'uom',
            headerName: 'Unit Of Measurement'
        },
        {
            field: 'price',
            headerName: 'Price'
        },
        {
            field: 'product_file',
            headerName: 'Product File',
            width:150,
            renderCell: (params) => <div>
                <button className='btn btn-success' onClick={(()=>{
                    console.log(params.row.product_file.split('.').pop())
                    if(params.row.product_file.split('.').pop()==='png')
                    {
                        axios({
                            url:`http://localhost/girnar_backend/assets/images/${params.row.product_file}`,
                            method:'GET',
                            responseType:'blob',
                            mode: "no-cors"
                        })
                        .then((res)=>{
                            const url = window.URL.createObjectURL(new Blob([res.data]));
                            const link = document.createElement("a")
                            link.href=url;
                            link.setAttribute("download","file.png")
                            document.body.appendChild(link);
                            link.click();
                        })
                    }
                    else if(params.row.product_file.split('.').pop()==='txt')
                    {
                        axios({
                            url:`http://localhost/girnar_backend/assets/images/${params.row.product_file}`,
                            method:'GET',
                            responseType:'blob',
                            mode: "no-cors"
                        })
                        .then((res)=>{
                            const url = window.URL.createObjectURL(new Blob([res.data]));
                            const link = document.createElement("a")
                            link.classList.add("btn btn-success")
                            link.href=url;
                            link.setAttribute("download","file.txt")
                            document.body.appendChild(link);
                            link.click();
                        })
                    }
                    else if(params.row.product_file.split('.').pop()==='sql')
                    {
                        axios({
                            url:`http://localhost/girnar_backend/assets/images/${params.row.product_file}`,
                            method:'GET',
                            responseType:'blob',
                            mode: "no-cors"
                        })
                        .then((res)=>{
                            const url = window.URL.createObjectURL(new Blob([res.data]));
                            const link = document.createElement("a")
                            link.href=url;
                            link.setAttribute("download","file.sql")
                            document.body.appendChild(link);
                            link.click();
                        })
                    }
                    else if(params.row.product_file.split('.').pop()==='DWG')
                    {
                        axios({
                            url:`http://localhost/girnar_backend/assets/images/${params.row.product_file}`,
                            method:'GET',
                            responseType:'blob',
                            mode: "no-cors"
                        })
                        .then((res)=>{
                            const url = window.URL.createObjectURL(new Blob([res.data]));
                            var link = document.createElement("a");
                            link.classList.add("newclass");
                            link.href=url;
                            link.setAttribute("download","file.DWG")
                            document.body.appendChild(link);
                            link.click();
                        })
                    }
                })}>download</button>
            </div>
        },
        // {
        //     field: 'product_file',
        //     headerName: 'Product File',
        //     renderCell:(params)=><DownloadLink
        //     label="Download"
        //     filename={`http://localhost/girnar_backend/assets/images/${params.value}`}
        //     exportFile={() => console.log("Downloaded") }
        // />
        // },
        // {
        //     field: 'product_file',
        //         headerName: 'Product File',
        //         renderCell:(params)=><Link to={`http://localhost/girnar_backend/assets/images/${params.value}`}  target="_blank" download>Download</Link> 
        // },
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
    const rows = readProducts.data;
    return <>
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
                            <input defaultValue={singleProducts.id} name="id" type="text" className="form-control" readOnly />
                        </div>
                        <div className="form-group">
                            <label>Product Name</label>
                            <input defaultValue={singleProducts.product_name} name="product_name" type="text" className="form-control" readOnly pattern="^[a-zA-Z\s-]+$" title="Please enter Alphabets."/>
                        </div>
                        <div className="form-group">
                            <label>Available Stock</label>
                            <input defaultValue={singleProducts.available_stock} name="available_stock" type="text" className="form-control" readOnly />
                        </div>
                        <div className="form-group">
                            <label>Unit Of Measurement</label>
                            <input defaultValue={singleProducts.uom} name="uom" type="text" className="form-control" readOnly />
                        </div>
                        <div className="form-group">
                            <label>Price</label>
                            <input defaultValue={singleProducts.price} name="price" type="text" className="form-control" readOnly />
                        </div>
                        <div className="form-group">
                            <label>Product File</label>
                            <input defaultValue={singleProducts.product_file} name="product_file" type="text" className="form-control" readOnly />
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
                <Modal.Title>Details Read</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={onModalFormSubmit}>
                    <div className="card-body">
                        <div className="form-group">
                            <label>Id</label>
                            <input defaultValue={modalProducts.id} onChange={onModalInputChange} name="id" type="text" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Product Name</label>
                            <input defaultValue={modalProducts.product_name} onChange={onModalInputChange} name="product_name" type="text" className="form-control" pattern="^[a-zA-Z\s-]+$" title="Please enter Alphabets."/>
                        </div>
                        <div className="form-group">
                            <label>Available Stock</label>
                            <input defaultValue={modalProducts.available_stock} onChange={onModalInputChange} name="available_stock" type="text" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Unit Of Measurement</label>
                            <input defaultValue={modalProducts.uom} onChange={onModalInputChange} name="uom" type="text" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Price</label>
                            <input defaultValue={modalProducts.price} onChange={onModalInputChange} name="price" type="text" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Product File</label>
                            <input onChange={onModalInputChange} name="product_file" type="file" className="form-control" />
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
            <section class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        {/* <div class="col-sm-6">
                            <h1>Form</h1>
                        </div>
                        <div class="col-sm-6">
                            <ol class="breadcrumb float-sm-right">
                                <li class="breadcrumb-item"><a href="#">Home</a></li>
                                <li class="breadcrumb-item active">Form</li>
                            </ol>
                        </div> */}
                    </div>
                </div>
            </section>
            <section class="content">
                <div className="container-fluid">
                    <div className="row">
                        {/* left column */}
                        <div className="col-md-12">
                            {/* general form elements */}
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h3 className="card-title">Products</h3>
                                </div>
                                {/* /.card-header */}
                                {/* form start */}
                                <form onSubmit={onFormSubmit}>
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label>Product Name</label>
                                            <input onChange={onInputChange} name="product_name" className="form-control" pattern="^[a-zA-Z\s-]+$" title="Please enter Alphabets." required/>
                                        </div>
                                        <div className="form-group">
                                            <label>Available Stock</label>
                                            <input onChange={onInputChange} name="available_stock" className="form-control" required/>
                                        </div>
                                        <div className="form-group">
                                            <label>Unit of Measurement</label>
                                            <input onChange={onInputChange} name="uom" className="form-control" required/>
                                        </div>
                                        <div className="form-group">
                                            <label>Price</label>
                                            <input onChange={onInputChange} name="price" className="form-control" required/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputFile">File Upload</label>
                                            <div className="input-group">
                                                <div className="custom-file">
                                                    <input onChange={onInputChange} name="product_file" type="file" className="custom-file-input" id="exampleInputFile" />
                                                    <label className="custom-file-label" htmlFor="exampleInputFile">Choose file</label>
                                                </div>
                                                <div className="input-group-append">
                                                    <span className="input-group-text">Upload</span>
                                                </div>
                                            </div>
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
                                    <h3 class="card-title">Products</h3>
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
    </>;
}

export default Products;
