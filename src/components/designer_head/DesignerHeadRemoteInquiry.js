import axios from 'axios'
import { api_url } from '../ApiUrl';
import React, { useEffect, useState } from 'react'
import Header from '../../Header'
import Menu from '../../Menu'
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import { toast } from 'react-toastify';
import { DataGrid } from '@mui/x-data-grid';
import { Modal, Button, Form } from "react-bootstrap";

function DesignerHeadRemoteInquiry() {
  const optionsArray = [
    { key: "laser_cutting", label: "Laser Cutting" },
    { key: "machining", label: "Machining" },
    { key: "bending", label: "Bending" },
    { key: "grinding", label: "Grinding" },
  ];
  const [showModal, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showModal1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  //States
  const [inquiry, setInquiry] = useState();

  const [customer, setCustomer] = useState();
  const [designUpload, setDesignUpload] = useState();
  const [materialStatus, setMaterialStatus] = useState();
  const [typeOfProcess, setTypeOfProcess] = useState([]);
  const [materialType, setMaterialType] = useState();
  const [materialThickness, setMaterialThickness] = useState();
  const [materialGrade, setMaterialGrade] = useState();
  const [expectedDelivery, setExpectedDelivery] = useState();
  const [description, setDescription] = useState();

  const [customer_option, set_customer_option] = useState();
  const [material_type_option, set_material_type_option] = useState();
  const [material_thickness_option, set_material_thickness_option] = useState();
  const [material_grade_option, set_material_grade_option] = useState();

  const [modal_id, set_modal_id] = useState();
  const [modal_customer, set_modal_customer] = useState();
  const [modal_material_type, set_modal_material_type] = useState();
  const [modal_material_thickness, set_modal_material_thickness] = useState();
  const [modal_material_grade, set_modal_material_grade] = useState();
  const [modal_material_status, set_modal_material_status] = useState();
  const [modal_type_of_process, set_modal_type_of_process] = useState();
  const [modal_expected_delivery, set_modal_expected_delivery] = useState();
  const [modal_design_upload, set_modal_design_upload] = useState();
  const [modal_description, set_modal_description] = useState();

  const [single_id, set_single_id] = useState();
  const [single_customer, set_single_customer] = useState();
  const [single_material_type, set_single_material_type] = useState();
  const [single_material_thickness, set_single_material_thickness] = useState();
  const [single_material_grade, set_single_material_grade] = useState();
  const [single_material_status, set_single_material_status] = useState();
  const [single_type_of_process, set_single_type_of_process] = useState();
  const [single_expected_delivery, set_single_expected_delivery] = useState();
  const [single_design_upload, set_single_design_upload] = useState();
  const [single_description, set_single_description] = useState();
  //Option Values
  useEffect(() => {
    axios(api_url + "read_material_type.php")
      .then((res) => {
        set_material_type_option(res.data);
        console.log(material_type_option);
      })
  }, []);
  useEffect(() => {
    axios(api_url + "read_material_thickness.php")
      .then((res) => {
        set_material_thickness_option(res.data);
        //console.log(material_thickness_option);
      })
  }, []);
  useEffect(() => {
    axios(api_url + "read_material_grade.php")
      .then((res) => {
        set_material_grade_option(res.data);
        //console.log(material_thickness_option);
      })
  }, []);
  useEffect(() => {
    axios(api_url + "read_all_customers.php")
      .then((res) => {
        set_customer_option(res.data);
        //console.log(material_thickness_option);
      })
  }, []);

  //Create
  const onCustomerChange = (e) => {
    setCustomer(e.target.value);
  }
  const onDesignUploadChange = (e) => {
    setDesignUpload(e.target.files[0]);
  }
  const onMaterialStatusChange = (e) => {
    setMaterialStatus(e.target.value);
  }
  const onTypeOfProcessChange = (option) => {
    setTypeOfProcess(option);
  }
  const onMaterialTypeChange = (e) => {
    setMaterialType(e.target.value);
  }
  const onMaterialThicknessChange = (e) => {
    setMaterialThickness(e.target.value);
  }
  const onMaterialGradeChange = (e) => {
    setMaterialGrade(e.target.value);
  }
  const onExpectedDeliveryChange = (e) => {
    setExpectedDelivery(e.target.value);
  }
  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
  }
  const onFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('customer', customer);
    formData.append('material_type', materialType);
    formData.append('material_thickness', materialThickness);
    formData.append('material_grade', materialGrade);
    formData.append('material_status', materialStatus);
    formData.append('type_of_process', JSON.stringify(typeOfProcess));
    formData.append('expected_delivery', expectedDelivery);
    formData.append('design_upload', designUpload);
    formData.append('description', description);
    const config = {
      headers: { 'content-type': 'multipart/form-data' }
    }
    axios.post(api_url + 'create_customer_inquiry.php', formData, config)
      .then(response => {
        document.getElementById("remoteinquiry").reset();
        toast.configure();
        toast.success("Inserted Successfully");
        axios.post(api_url + "read_all_enquiry.php")
          .then((res) => {
            setInquiry(res.data);
            //console.log(inquiry);
          })
      })
      .catch(error => {
        console.log(error);
      });
  }
  //Read
  useEffect(() => {
    axios.post(api_url + "read_all_enquiry.php")
      .then((res) => {
        setInquiry(res.data);
        //console.log("-------", inquiry);
      })
  }, []);

  //Edit
  const onEdit = (row) => {
    handleShow();
    //console.log(row.type_of_process);
    set_modal_id(row.id);
    set_modal_material_type(row.material_type);
    set_modal_customer(row.customer);
    set_modal_material_thickness(row.material_thickness);
    //set_modal_no_of_sheets(row.no_of_sheets);
    set_modal_material_grade(row.material_grade);
    set_modal_material_status(row.material_status);
    set_modal_type_of_process(JSON.parse(row.type_of_process.split(',')));
    set_modal_expected_delivery(row.expected_delivery);
    set_modal_design_upload(row.design_upload);
    set_modal_description(row.description);
  }
  const onModalIdChange = (e) => {
    set_modal_id(e.target.value);
  }
  const onModalCustomerChange = (e) => {
    set_modal_customer(e.target.value);
  }
  const onModalMaterialTypeChange = (e) => {
    set_modal_material_type(e.target.value);
  }
  const onModalMaterialThicknessChange = (e) => {
    set_modal_material_thickness(e.target.value);
  }
  const onModalMaterialGradeChange = (e) => {
    set_modal_material_grade(e.target.value);
  }
  const onModalMaterialStatusChange = (e) => {
    set_modal_material_status(e.target.value);
  }
  const onModalTypeOfProcessChange = (option) => {
    set_modal_type_of_process(option);
  }
  const onModalExpectedDeliveryChange = (e) => {
    set_modal_expected_delivery(e.target.value);
  }
  const onModalDesignUploadChange = (e) => {
    set_modal_design_upload(e.target.files[0]);
    //console.log(design_upload);
  }
  const onModalDescriptionChange = (e) => {
    set_modal_description(e.target.value);
  }
  const onModalFormSubmit = (e) => {
    e.preventDefault();
    const modalFormData = new FormData();
    modalFormData.append('id', modal_id);
    modalFormData.append('customer', modal_customer);
    modalFormData.append('material_type', modal_material_type);
    modalFormData.append('material_thickness', modal_material_thickness);
    modalFormData.append('material_grade', modal_material_grade);
    modalFormData.append('material_status', modal_material_status);
    modalFormData.append('type_of_process', JSON.stringify(modal_type_of_process));
    modalFormData.append('expected_delivery', modal_expected_delivery);
    modalFormData.append('design_upload', modal_design_upload);
    modalFormData.append('description', modal_description);

    const config = {
      headers: { 'content-type': 'multipart/form-data' }
    }
    axios.post(api_url + 'update_customer_inquiry.php', modalFormData, config)
      .then(response => {
        document.getElementById("modalremoteenquiry");
        toast.configure();
        toast.warning("Updated Successfully");
        axios.post(api_url + "read_all_enquiry.php")
          .then((res) => {
            setInquiry(res.data);
            //console.log(inquiry);
          })
      })
      .catch(error => {
        console.log(error);
      });
    handleClose();
  }
  //Delete
  const onDelete = (row) => {
    console.log(row);
    axios.post(api_url + 'delete_customer_inquiry.php', { id: row })
      .then(response => {
        axios.post(api_url + "read_all_enquiry.php")
          .then((res) => {
            toast.configure();
            toast.error("Deleted Successfully");
            setInquiry(res.data);
            console.log(inquiry);
          })
      })
      .catch(error => {
        console.log(error);
      });
  }
  //Single Read
  const onRead = (row) => {
    handleShow1();
    //console.log(row.type_of_process);
    set_single_id(row.id);
    set_single_material_type(row.material_type);
    set_single_customer(row.customer);
    set_single_material_thickness(row.material_thickness);
    //set_modal_no_of_sheets(row.no_of_sheets);
    set_single_material_grade(row.material_grade);
    set_single_material_status(row.material_status);
    set_single_type_of_process(JSON.parse(row.type_of_process.split(',')));
    set_single_expected_delivery(row.expected_delivery);
    set_single_design_upload(row.design_upload);
    set_single_description(row.description);
  }
  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 150
    },
    {
      field: 'customer_name',
      headerName: 'Customer',
      width: 150
    },
    {
      field: 'material_type_material_type',
      headerName: 'Material Type',
      width: 150
    },
    {
      field: 'material_thickness_material_thickness',
      headerName: 'Material Thickness',
      width: 150
    },
    // {
    //     field: 'material_thickness',
    //     headerName: 'Material Thickness',
    //     width: 160,
    //     valueGetter: (params) => {
    //         return params.row.material_thickness;
    //     }
    // },
    // {
    //     field: 'no_of_sheets',
    //     headerName: 'No Of Sheets',
    //     width: 150
    // },
    // {
    //     field: 'material_grade',
    //     headerName: 'Material Grade',
    //     width: 150
    // },
    // {
    //     field: 'material_status',
    //     headerName: 'Material Status',
    //     width: 150
    // },
    // {
    //     field: 'type_of_process',
    //     headerName: 'Type Of Process',
    //     width: 150
    // },
    // {
    //     field: 'expected_delivery',
    //     headerName: 'Expected Delivery',
    //     width: 150
    // },
    {
      field: 'design_upload',
      headerName: 'Design Upload',
      width: 230,
      renderCell: (params) => {
        return (
          <>
            <a href={`http://localhost:80/girnar_backend/assets/images/${params.row.design_upload}`}>Download File</a>
          </>
        )
      }
    },
    // {
    //     field: 'description',
    //     headerName: 'Description',
    //     width: 150
    // },
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params) => {
        return (
          <div className="">
            <button onClick={() => onRead(params.row)} data-toggle="tooltip" title="Read" type="button" className="btn btn-primary"  ><i class="far fa-eye"></i></button>
            <button onClick={() => onEdit(params.row)} data-toggle="tooltip" title="Edit" type="button" style={{ marginLeft: '20%' }} className="btn btn-warning"  ><i class="far fa-edit"></i></button>
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
  ];
  const rows = inquiry === undefined ? [] : inquiry.data;
  return <>
    <Header />
    <Menu />
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Edit Customer</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <form onSubmit={onModalFormSubmit} className="form-group">
          <div className="row">
            <div className="field col-md-12">
              <label className="required">ID</label>
              <input defaultValue={modal_id} onChange={onModalIdChange} className="form-control mt-1" name="id" type="text" required />
            </div>
            <div className="field col-md-12">
              <label className="required">Customer</label>
              {/* <input defaultValue={modal_customer} onChange={onModalCustomerChange} className="form-control mt-1" name="customer" type="text" required readOnly /> */}
              <select defaultValue={modal_customer} onChange={onModalCustomerChange} className='form-control' name='customer'>
                <option>Select</option>
                {customer_option === undefined ? "" : customer_option.data.map((customer) => (
                  <option key={customer.id} value={customer.id}>{customer.name}</option>
                ))}
              </select>
            </div>

            <div className="field col-md-12">
              <label className="required">Material Type</label>
              {/* <input defaultValue={modal_material_type} onChange={onModalMaterialTypeChange} className="form-control mt-1" name="material_type" type="text" required /> */}
              <select defaultValue={modal_material_type} onChange={onModalMaterialTypeChange} name="material_type" className="form-control">
                <option>Select</option>
                {material_type_option === undefined ? [] : material_type_option.data.map((materialtype) => (
                  <option key={materialtype.id} value={materialtype.id}>{materialtype.material_type}</option>
                ))}
              </select>
            </div>
            <div className="field col-md-12">
              <label className="required">Material Thickness</label>
              {/* <input defaultValue={modal_material_thickness} onChange={onModalMaterialThicknessChange} className="form-control mt-1" name="material_thickness" type="text" required /> */}
              <select defaultValue={modal_material_thickness} onChange={onModalMaterialThicknessChange} name="material_type" className="form-control">
                <option>Select</option>
                {material_thickness_option === undefined ? [] : material_thickness_option.data.map((materialthickness) => (
                  <option key={materialthickness.id} value={materialthickness.id}>{materialthickness.material_thickness}</option>
                ))}
              </select>
            </div>
            <div className="field col-md-12">
              <label className="required">Material Grade</label>
              {/* <input defaultValue={modal_material_grade} onChange={onModalMaterialGradeChange} className="form-control mt-1" name="material_grade" type="text" required /> */}
              <select onChange={onModalMaterialGradeChange} defaultValue={modal_material_grade} name="material_grade" className="form-control">
                <option>Select</option>
                {material_grade_option === undefined ? [] : material_grade_option.data.map((materialgrade) => (
                  <option key={materialgrade.id} value={materialgrade.id}>{materialgrade.material_grade}</option>
                ))}
              </select>
            </div>

            <div className="field col-md-12">
              <label className="required">Material Status</label>
              <input defaultValue={modal_material_status} onChange={onModalMaterialStatusChange} className="form-control mt-1" name="material_status" type="text" required />
            </div>
            <div className="field col-md-12">
              <label className="required">Type Of Process</label>
              {/* <input defaultValue={modal_type_of_process} onChange={onModalTypeOfProcessChange} className="form-control mt-1" name="type_of_process" type="text" required /> */}
              {/* <input type="text" defaultValue={typeof modal_type_of_process} /> */}
              <DropdownMultiselect selected={modal_type_of_process} handleOnChange={onModalTypeOfProcessChange} options={optionsArray} name="type_of_process" />
            </div>

            <div className="field col-md-12">
              <label className="required">Expected Delivery</label>
              <input defaultValue={modal_expected_delivery} onChange={onModalExpectedDeliveryChange} className="form-control mt-1" name="expected_delivery" type="text" required />
            </div>
            <div className="field col-md-12">
              <label className="required">Design Upload</label>
              <input onChange={onModalDesignUploadChange} className="form-control mt-1" name="design_upload" type="file" />
            </div>

            <div className="field col-md-12">
              <label className="required">Description</label>
              <input defaultValue={modal_description} onChange={onModalDescriptionChange} name="description" className="form-control" placeholder="Enter Description" />
            </div>
            <div className="field col-md-12">
              <button className="btn btn-primary">Save</button>
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
    <Modal show={showModal1} onHide={handleClose1}>
      <Modal.Header>
        <Modal.Title>Edit Customer</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <form className="form-group" id="modalremoteenquiry">
          <div className="row">
            <div className="field col-md-12">
              <label className="required">ID</label>
              <input defaultValue={single_id} className="form-control mt-1" name="id" type="text" readOnly />
            </div>
            <div className="field col-md-12">
              <label className="required">Customer</label>
              {/* <input defaultValue={modal_customer} onChange={onModalCustomerChange} className="form-control mt-1" name="customer" type="text" required readOnly /> */}
              <select defaultValue={single_customer} className='form-control' name='customer'>
                <option>Select</option>
                {customer_option === undefined ? "" : customer_option.data.map((customer) => (
                  <option disabled={true} key={customer.id} value={customer.id}>{customer.name}</option>
                ))}
              </select>
            </div>

            <div className="field col-md-12">
              <label className="required">Material Type</label>
              {/* <input defaultValue={modal_material_type} onChange={onModalMaterialTypeChange} className="form-control mt-1" name="material_type" type="text" required /> */}
              <select defaultValue={single_material_type} name="material_type" className="form-control">
                <option>Select</option>
                {material_type_option === undefined ? [] : material_type_option.data.map((materialtype) => (
                  <option disabled={true} key={materialtype.id} value={materialtype.id}>{materialtype.material_type}</option>
                ))}
              </select>
            </div>
            <div className="field col-md-12">
              <label className="required">Material Thickness</label>
              {/* <input defaultValue={modal_material_thickness} onChange={onModalMaterialThicknessChange} className="form-control mt-1" name="material_thickness" type="text" required /> */}
              <select defaultValue={single_material_thickness} name="material_type" className="form-control">
                <option>Select</option>
                {material_thickness_option === undefined ? [] : material_thickness_option.data.map((materialthickness) => (
                  <option disabled={true} key={materialthickness.id} value={materialthickness.id}>{materialthickness.material_thickness}</option>
                ))}
              </select>
            </div>
            <div className="field col-md-12">
              <label className="required">Material Grade</label>
              {/* <input defaultValue={single_material_grade}  className="form-control mt-1" name="material_grade" type="text" readOnly /> */}
              <select defaultValue={single_material_grade} name="material_grade" className="form-control">
                <option>Select</option>
                {material_grade_option === undefined ? [] : material_grade_option.data.map((materialgrade) => (
                  <option disabled={true} key={materialgrade.id} value={materialgrade.id}>{materialgrade.material_grade}</option>
                ))}
              </select>
            </div>

            <div className="field col-md-12">
              <label className="required">Material Status</label>
              <input defaultValue={single_material_status} className="form-control mt-1" name="material_status" type="text" readOnly />
            </div>
            <div className="field col-md-12">
              <label className="required">Type Of Process</label>
              {/* <input defaultValue={modal_type_of_process} onChange={onModalTypeOfProcessChange} className="form-control mt-1" name="type_of_process" type="text" required /> */}
              {/* <input type="text" defaultValue={typeof modal_type_of_process} /> */}
              <DropdownMultiselect selected={single_type_of_process} options={optionsArray} name="type_of_process" />
            </div>

            <div className="field col-md-12">
              <label className="required">Expected Delivery</label>
              <input defaultValue={single_expected_delivery} className="form-control mt-1" name="expected_delivery" type="text" readOnly />
            </div>
            <div className="field col-md-12">
              <label className="required">Design Upload</label>
              <input defaultValue={single_design_upload} className="form-control mt-1" name="design_upload" type="text" readOnly />
            </div>

            <div className="field col-md-12">
              <label className="required">Description</label>
              <input defaultValue={single_description} name="description" className="form-control" placeholder="Enter Description" readOnly />
            </div>
            {/* <div className="field col-md-12">
              <button className="btn btn-primary">Save</button>
            </div> */}
          </div>
        </form>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose1}>
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
                  <h3 className="card-title">Remote Inquiry</h3>
                </div>
                {/* /.card-header */}
                {/* form start */}
                <form onSubmit={onFormSubmit} id="remoteinquiry">
                  <div className="card-body">
                    <div className="form-group">
                      <label >Customer</label>
                      <select onChange={onCustomerChange} className='form-control' name='customer'>
                        <option>Select</option>
                        {customer_option === undefined ? "" : customer_option.data.map((customer) => (
                          <option key={customer.id} value={customer.id}>{customer.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label >Design Upload</label>
                      <input onChange={onDesignUploadChange} name="design_upload" type="file" className="form-control" required />
                    </div>
                    <div class="form-group">
                      <label>Material Status</label>
                      <select onChange={onMaterialStatusChange} name="material_status" className='custom-select'>
                        <option>Select</option>
                        <option>With Material</option>
                        <option>Without Material</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label >Type Of Process</label>
                      <DropdownMultiselect options={optionsArray} handleOnChange={onTypeOfProcessChange} name="type_of_process" />
                    </div>
                    <div className="form-group">
                      <label >Material Type</label>
                      <select onChange={onMaterialTypeChange} className='form-control' name='material_type'>
                        <option>Select</option>
                        {material_type_option === undefined ? "" : material_type_option.data.map((material_type) => (
                          <option key={material_type.id} value={material_type.id}>{material_type.material_type}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label >Material Thickness</label>
                      <select onChange={onMaterialThicknessChange} className='form-control' name='material_thickness'>
                        <option>Select</option>
                        {material_thickness_option === undefined ? "" : material_thickness_option.data.map((material_thickness) => (
                          <option key={material_thickness.id} value={material_thickness.id}>{material_thickness.material_thickness}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Material Grade</label>
                      {/* <input onChange={onMaterialGradeChange} type="text" name="material_grade" className='form-control' /> */}
                      <select onChange={onMaterialGradeChange} name="material_grade" className="form-control">
                        <option>Select</option>
                        {material_grade_option === undefined ? [] : material_grade_option.data.map((materialgrade) => (
                          <option key={materialgrade.id} value={materialgrade.id}>{materialgrade.material_grade}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Expected Delivery</label>
                      <input onChange={onExpectedDeliveryChange} type="text" name="expected_delivery" className='form-control' />
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <input onChange={onDescriptionChange} type="text" name="description" className='form-control' />
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
                  <h3 class="card-title">Remote Enquiry</h3>
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
    ;
}

export default DesignerHeadRemoteInquiry;
