import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Header from '../../Header';
import Menu from '../../Menu';
import { api_url } from '../ApiUrl';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Modal, Button } from "react-bootstrap";

function DesignerHeadTask() {
    //Modal Settings
    const [showModal, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showModal1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);

    //Form Values for create
    const [formValues, setFormValues] = useState([{ description: "", status: "" }])
    const [formValues1, setFormValues1] = useState([{ description1: "", status1: "" }])
    const [formValues2, setFormValues2] = useState([{ description2: "", status2: "" }])
    const [formValues3, setFormValues3] = useState([{ description3: "", status3: "" }])
    const [formValues4, setFormValues4] = useState([{ description4: "", status4: "" }])
    const [inspectionParametersFormValues, setInspectionParametersFormValues] = useState([{ parameter: 0, result: "initial", reason: "" }])
    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
        setWorkOrder({ ...workOrder, designer_head_description_status: newFormValues })
    }

    let handleChange1 = (i, e) => {
        let newFormValues1 = [...formValues1];
        newFormValues1[i][e.target.name] = e.target.value;
        setFormValues1(newFormValues1);
        setWorkOrder({ ...workOrder, designer_description_status: newFormValues1 })
    }
    let handleChange2 = (i, e) => {
        let newFormValues2 = [...formValues2];
        newFormValues2[i][e.target.name] = e.target.value;
        setFormValues2(newFormValues2);
        setWorkOrder({ ...workOrder, programmer_description_status: newFormValues2 })
    }
    let handleChange3 = (i, e) => {
        let newFormValues3 = [...formValues3];
        newFormValues3[i][e.target.name] = e.target.value;
        setFormValues3(newFormValues3);
        setWorkOrder({ ...workOrder, machine_operator_description_status: newFormValues3 })
    }
    let handleChange4 = (i, e) => {
        let newFormValues4 = [...formValues4];
        newFormValues4[i][e.target.name] = e.target.value;
        setFormValues4(newFormValues4);
        setWorkOrder({ ...workOrder, transporter_description_status: newFormValues4 })
    }
    let handleChangeInspectionParameters = (i, e) => {
        let newFormValues5 = [...inspectionParametersFormValues];
        newFormValues5[i][e.target.name] = e.target.value;
        setInspectionParametersFormValues(newFormValues5);
        setWorkOrder({ ...workOrder, machine_operator_parameter: newFormValues5 })
    }
    let addFormFields = () => {
        setFormValues([...formValues, { description: "", status: "" }])
    }
    let addFormFields1 = () => {
        setFormValues1([...formValues1, { description1: "", status1: "" }])
    }
    let addFormFields2 = () => {
        setFormValues2([...formValues2, { description2: "", status2: "" }])
    }
    let addFormFields3 = () => {
        setFormValues3([...formValues3, { description3: "", status3: "" }])
    }
    let addFormFields4 = () => {
        setFormValues4([...formValues4, { description4: "", status4: "" }])
    }
    let addFormFieldsInspectionParameters = () => {
        setInspectionParametersFormValues([...inspectionParametersFormValues, { parameter: 0, result: "initial" }])
    }
    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }
    let removeFormFields1 = (i) => {
        let newFormValues1 = [...formValues1];
        newFormValues1.splice(i, 1);
        setFormValues1(newFormValues1)
    }
    let removeFormFields2 = (i) => {
        let newFormValues2 = [...formValues2];
        newFormValues2.splice(i, 1);
        setFormValues2(newFormValues2)
    }
    let removeFormFields3 = (i) => {
        let newFormValues3 = [...formValues3];
        newFormValues3.splice(i, 1);
        setFormValues3(newFormValues3)
    }
    let removeFormFields4 = (i) => {
        let newFormValues4 = [...formValues4];
        newFormValues4.splice(i, 1);
        setFormValues4(newFormValues4)
    }
    let removeFormFieldsInspectionParameters = (i) => {
        let newFormValues5 = [...inspectionParametersFormValues];
        newFormValues5.splice(i, 1);
        setInspectionParametersFormValues(newFormValues5)
    }
    //===========Form Values for edit state
    const [editFormValues, setEditFormValues] = useState([{ description: "", status: "" }])
    const [editFormValues1, setEditFormValues1] = useState([{ description1: "", status1: "" }])
    const [editFormValues2, setEditFormValues2] = useState([{ description2: "", status2: "" }])
    const [editFormValues3, setEditFormValues3] = useState([{ description3: "", status3: "" }])
    const [editFormValues4, setEditFormValues4] = useState([{ description4: "", status4: "" }])
    const [editInspectionParametersFormValues, setEditInspectionParametersFormValues] = useState([{ parameter: "", result: "", reason: "" }])
    let editHandleChange = (i, e) => {
        let newFormValues = [...editFormValues];
        newFormValues[i][e.target.name] = e.target.value;
        setEditFormValues(newFormValues);
        setEditWorkOrder({ ...editWorkOrder, designer_head_description_status: newFormValues })
    }

    let editHandleChange1 = (i, e) => {
        let newFormValues1 = [...editFormValues1];
        newFormValues1[i][e.target.name] = e.target.value;
        setEditFormValues1(newFormValues1);
        setEditWorkOrder({ ...editWorkOrder, designer_description_status: newFormValues1 })
    }
    let editHandleChange2 = (i, e) => {
        let newFormValues2 = [...editFormValues2];
        newFormValues2[i][e.target.name] = e.target.value;
        setEditFormValues2(newFormValues2);
        setEditWorkOrder({ ...editWorkOrder, programmer_description_status: newFormValues2 })
    }
    let editHandleChange3 = (i, e) => {
        let newFormValues3 = [...editFormValues3];
        newFormValues3[i][e.target.name] = e.target.value;
        setEditFormValues3(newFormValues3);
        setEditWorkOrder({ ...editWorkOrder, machine_operator_description_status: newFormValues3 })
    }
    let editHandleChange4 = (i, e) => {
        let newFormValues4 = [...editFormValues4];
        newFormValues4[i][e.target.name] = e.target.value;
        setEditFormValues4(newFormValues4);
        setEditWorkOrder({ ...editWorkOrder, transporter_description_status: newFormValues4 })
    }
    let editHandleChangeInspectionParameters = (i, e) => {
        let newFormValues5 = [...editInspectionParametersFormValues];
        newFormValues5[i][e.target.name] = e.target.value;
        setEditInspectionParametersFormValues(newFormValues5);
        setEditWorkOrder({ ...editWorkOrder, machine_operator_parameter: newFormValues5 })
    }
    let addEditFormFields = () => {
        setEditFormValues([...editFormValues, { description: "", status: "" }])
    }
    let addEditFormFields1 = () => {
        setEditFormValues1([...editFormValues1, { description1: "", status1: "" }])
    }
    let addEditFormFields2 = () => {
        setEditFormValues2([...editFormValues2, { description2: "", status2: "" }])
    }
    let addEditFormFields3 = () => {
        setEditFormValues3([...editFormValues3, { description3: "", status3: "" }])
    }
    let addEditFormFields4 = () => {
        setEditFormValues4([...editFormValues4, { description4: "", status4: "" }])
    }
    let addEditFormFieldsInspectionParameters = () => {
        setEditInspectionParametersFormValues([...editInspectionParametersFormValues, { parameter: "", result: "" }])
    }
    let removeEditFormFields = (i) => {
        let newFormValues = [...editFormValues];
        newFormValues.splice(i, 1);
        setEditFormValues(newFormValues)
        setEditWorkOrder({ ...editWorkOrder, designer_head_description_status: newFormValues })
    }
    let removeEditFormFields1 = (i) => {
        let newFormValues1 = [...editFormValues1];
        newFormValues1.splice(i, 1);
        setEditFormValues1(newFormValues1)
        setEditWorkOrder({ ...editWorkOrder, designer_description_status: newFormValues1 })
    }
    let removeEditFormFields2 = (i) => {
        let newFormValues2 = [...editFormValues2];
        newFormValues2.splice(i, 1);
        setEditFormValues2(newFormValues2)
        setEditWorkOrder({ ...editWorkOrder, programmer_description_status: newFormValues2 })
    }
    let removeEditFormFields3 = (i) => {
        let newFormValues3 = [...editFormValues3];
        newFormValues3.splice(i, 1);
        setEditFormValues3(newFormValues3)
        setEditWorkOrder({ ...editWorkOrder, machine_operator_description_status: newFormValues3 })
    }
    let removeEditFormFields4 = (i) => {
        let newFormValues4 = [...editFormValues4];
        newFormValues4.splice(i, 1);
        setEditFormValues4(newFormValues4)
        setEditWorkOrder({ ...editWorkOrder, transporter_description_status: newFormValues4 })
    }
    let removeEditFormFieldsInspectionParameters = (i) => {
        let newFormValues5 = [...editInspectionParametersFormValues];
        newFormValues5.splice(i, 1);
        setEditInspectionParametersFormValues(newFormValues5)
        setEditWorkOrder({ ...editWorkOrder, machine_operator_parameter: newFormValues5 })
    }
    //===========Form Values for read state
    const [readFormValues, setReadFormValues] = useState([{ description: "", status: "" }])
    const [readFormValues1, setReadFormValues1] = useState([{ description1: "", status1: "" }])
    const [readFormValues2, setReadFormValues2] = useState([{ description2: "", status2: "" }])
    const [readFormValues3, setReadFormValues3] = useState([{ description3: "", status3: "" }])
    const [readFormValues4, setReadFormValues4] = useState([{ description4: "", status4: "" }])
    const [readInspectionParametersFormValues, setReadInspectionParametersFormValues] = useState([{ parameter: "", result: "", reason: "" }])

    //Get data for options table
    const [purchaseOrder, setPurchaseOrder] = useState();
    const [designerHead, setDesignerHead] = useState();
    const [designer, setDesigner] = useState();
    const [programmer, setProgrammer] = useState();
    const [machineOperator, setMachineOPerator] = useState();
    const [transporter, setTransporter] = useState();
    useEffect(() => {
        axios.get(api_url + "read_purchase_order_crm.php")
            .then((res) => {
                setPurchaseOrder(res.data)
            })
        axios.post(api_url + "read_employee_by_position.php", { position: "designer_head" })
            .then((res) => {
                setDesignerHead(res.data);
            })
        axios.post(api_url + "read_employee_by_position.php", { position: "designer" })
            .then((res) => {
                setDesigner(res.data);
            })
        axios.post(api_url + "read_employee_by_position.php", { position: "programmer" })
            .then((res) => {
                setProgrammer(res.data);
            })
        axios.post(api_url + "read_employee_by_position.php", { position: "machine_operator" })
            .then((res) => {
                setMachineOPerator(res.data);
            })
        axios.post(api_url + "read_employee_by_position.php", { position: "transporter" })
            .then((res) => {
                setTransporter(res.data);
            })
    }, [])

    //Create Task
    const [workOrder, setWorkOrder] = useState({
        purchase_order: "",
        designer_head: 0,
        designer_head_description_status: [],
        designer_head_approval_by_crm_operator: "",
        designer_head_approval_by_super_admin: "",
        designer_head_file: "",
        designer: "",
        designer_description_status: [],
        designer_approval_by_designer_head: "",
        designer_file: "",
        programmer: "",
        programmer_description_status: [],
        programmer_approval_by_designer: "",
        programmer_approval_by_designer_head: "",
        programmer_file: "",
        machine_operator: "",
        machine_operator_description_status: "",
        machine_operator_approval_by_designer: "",
        machine_operator_file: "",
        machine_operator_parameter: "",
        transporter: "",
        transporter_description_status: "",
        transporter_approval_by_crm_operator: "",
        transporter_file: "",
    })
    const [readWorkOrder, setReadWorkOrder] = useState({
        id: "",
        work_order: "",
        purchase_order: "",
        designer_head: "",
        designer_head_name: "",
        designer_head_description_status: [],
        designer_head_approval_by_crm_operator: "",
        designer_head_approval_by_super_admin: "",
        designer_head_file: "",
        designer: "",
        designer_name: "",
        designer_description_status: [],
        designer_approval_by_designer_head: "",
        designer_file: "",
        programmer: "",
        rogrammer_name: "",
        programmer_description_status: [],
        programmer_approval_by_designer: "",
        programmer_approval_by_designer_head: "",
        programmer_file: "",
        machine_operator: "",
        machine_operator_name: "",
        machine_operator_description_status: "",
        machine_operator_approval_by_designer: "",
        machine_operator_file: "",
        machine_operator_parameter: "",
        transporter: "",
        transporter_name: "",
        transporter_description_status: "",
        transporter_approval_by_crm_operator: "",
        transporter_file: "",
    })
    const [editWorkOrder, setEditWorkOrder] = useState({
        id: "",
        work_order: "",
        purchase_order: "",
        designer_head: "",
        designer_head_name: "",
        designer_head_description_status: [],
        designer_head_approval_by_crm_operator: "",
        designer_head_approval_by_super_admin: "",
        designer_head_file: "",
        designer: "",
        designer_name: "",
        designer_description_status: [],
        designer_approval_by_designer_head: "",
        designer_file: "",
        programmer: "",
        rogrammer_name: "",
        programmer_description_status: [],
        programmer_approval_by_designer: "",
        programmer_approval_by_designer_head: "",
        programmer_file: "",
        machine_operator: "",
        machine_operator_name: "",
        machine_operator_description_status: "",
        machine_operator_approval_by_designer: "",
        machine_operator_file: "",
        machine_operator_parameter: "",
        transporter: "",
        transporter_name: "",
        transporter_description_status: "",
        transporter_approval_by_crm_operator: "",
        transporter_file: "",
    })
    const [singleWorkOrder, setSingleWorkOrder] = useState({
        id: "",
        work_order: "",
        purchase_order: "",
        designer_head: "",
        designer_head_name: "",
        designer_head_description_status: [],
        designer_head_approval_by_crm_operator: "",
        designer_head_approval_by_super_admin: "",
        designer_head_file: "",
        designer: "",
        designer_name: "",
        designer_description_status: [],
        designer_approval_by_designer_head: "",
        designer_file: "",
        programmer: "",
        rogrammer_name: "",
        programmer_description_status: [],
        programmer_approval_by_designer: "",
        programmer_approval_by_designer_head: "",
        programmer_file: "",
        machine_operator: "",
        machine_operator_name: "",
        machine_operator_description_status: "",
        machine_operator_approval_by_designer: "",
        machine_operator_file: "",
        machine_operator_parameter: "",
        transporter: "",
        transporter_name: "",
        transporter_description_status: "",
        transporter_approval_by_crm_operator: "",
        transporter_file: "",
    })
    const onPurchaseOrderChange = (e) => {
        setWorkOrder({ ...workOrder, purchase_order: e.target.value })
    }
    const onDesignerHeadChange = (e) => {
        setWorkOrder({ ...workOrder, designer_head: e.target.value })
    }
    const onDesignerHeadFileChange = (e) => {
        setWorkOrder({ ...workOrder, designer_head_file: e.target.files[0] })
    }
    const onDesignerChange = (e) => {
        setWorkOrder({ ...workOrder, designer: e.target.value })
    }
    const onDesignerFileChange = (e) => {
        setWorkOrder({ ...workOrder, designer_file: e.target.files[0] })
    }
    const onProgrammerChange = (e) => {
        setWorkOrder({ ...workOrder, programmer: e.target.value })
    }
    const onProgrammerFileChange = (e) => {
        setWorkOrder({ ...workOrder, programmer_file: e.target.files[0] })
    }
    const onMachineOperatorChange = (e) => {
        setWorkOrder({ ...workOrder, machine_operator: e.target.value })
    }
    const onMachineOperatorFileChange = (e) => {
        setWorkOrder({ ...workOrder, machine_operator_file: e.target.files[0] })
    }
    const onTransporterChange = (e) => {
        setWorkOrder({ ...workOrder, transporter: e.target.value })
    }
    const onTransporterFileChange = (e) => {
        setWorkOrder({ ...workOrder, transporter_file: e.target.files[0] })
    }
    const onFormSubmit = (e) => {
        e.preventDefault()
        console.log(workOrder.designer_head_description_status)

        const formData = new FormData();
        formData.append('id', workOrder.id);
        formData.append('purchase_order', workOrder.purchase_order);
        formData.append('designer_head', workOrder.designer_head);
        formData.append('designer_head_description_status', JSON.stringify(workOrder.designer_head_description_status));
        formData.append('designer_head_file', workOrder.designer_head_file);
        formData.append('designer', workOrder.designer);
        formData.append('designer_description_status', JSON.stringify(workOrder.designer_description_status));
        formData.append('designer_file', workOrder.designer_file);
        formData.append('programmer', workOrder.programmer);
        formData.append('programmer_description_status', JSON.stringify(workOrder.programmer_description_status));
        formData.append('programmer_file', workOrder.programmer_file);
        formData.append('machine_operator', workOrder.machine_operator);
        formData.append('machine_operator_description_status', JSON.stringify(workOrder.machine_operator_description_status));
        formData.append('machine_operator_parameter', JSON.stringify(workOrder.machine_operator_parameter));
        formData.append('machine_operator_file', workOrder.machine_operator_file);
        formData.append('transporter', workOrder.transporter);
        formData.append('transporter_description_status', JSON.stringify(workOrder.transporter_description_status));
        formData.append('transporter_file', workOrder.transporter_file);
        const config = {
            headers: { 'content-type': 'application/json' }
        }
        console.log("------------------------------------------", formData)
        axios.post(api_url + "create_work_order.php", formData, config)
            .then(() => {
                axios.get(api_url + "read_work_order_by_crm.php")
                    .then((res) => {
                        //console.log(res.data)
                        setReadWorkOrder(res.data)
                    })
            })
    }

    //Edit
    const onEdit = (row) => {
        handleShow();
        console.log("--------------", JSON.parse(row.designer_head_description_status.slice(1, -1)))
        console.log("--+++++++++++++", row.designer_head_description_status)
        setEditWorkOrder({
            id: row.id,
            work_order: row.work_order,
            purchase_order: row.purchase_order,
            designer_head: row.designer_head,
            designer_head_description_status: JSON.parse(row.designer_head_description_status.slice(1, -1)),
            designer_head_file: row.designer_head_file,
            designer: row.designer,
            designer_description_status: JSON.parse(row.designer_description_status.slice(1, -1)),
            designer_file: row.designer_file,
            programmer: row.programmer,
            programmer_description_status: JSON.parse(row.programmer_description_status.slice(1, -1)),
            programmer_file: row.programmer_file,
            machine_operator: row.machine_operator,
            machine_operator_description_status: JSON.parse(row.machine_operator_description_status.slice(1, -1)),
            machine_operator_parameter: JSON.parse(row.machine_operator_parameter.slice(1, -1)),
            machine_operator_file: row.machine_operator_file,
            transporter: row.transporter,
            transporter_description_status: JSON.parse(row.transporter_description_status.slice(1, -1)),
            transporter_file: row.transporter_file
        })
        setEditFormValues(JSON.parse(row.designer_head_description_status.slice(1, -1)))
        setEditFormValues1(JSON.parse(row.designer_description_status.slice(1, -1)))
        setEditFormValues2(JSON.parse(row.programmer_description_status.slice(1, -1)))
        setEditFormValues3(JSON.parse(row.machine_operator_description_status.slice(1, -1)))
        setEditInspectionParametersFormValues(JSON.parse(row.machine_operator_parameter.slice(1, -1)))
        setEditFormValues4(JSON.parse(row.transporter_description_status.slice(1, -1)))
        //console.log(editWorkOrder)
    }
    const onEditPurchaseOrderChange = (e) => {
        setEditWorkOrder({ ...editWorkOrder, purchase_order: e.target.value })
    }
    const onEditDesignerHeadChange = (e) => {
        setEditWorkOrder({ ...editWorkOrder, designer_head: e.target.value })
    }
    const onEditDesignerChange = (e) => {
        setEditWorkOrder({ ...editWorkOrder, designer: e.target.value })
    }
    const onEditProgrammerChange = (e) => {
        setEditWorkOrder({ ...editWorkOrder, programmer: e.target.value })
    }
    const onEditMachineOperatorChange = (e) => {
        setEditWorkOrder({ ...editWorkOrder, machine_operator: e.target.value })
    }
    const onEditTransporterChange = (e) => {
        setEditWorkOrder({ ...editWorkOrder, transporter: e.target.value })
    }
    const onModalFormSubmit = (e) => {
        e.preventDefault();
        console.log(editWorkOrder.designer_description_status)
        const modalFormData = new FormData();
        modalFormData.append('id', editWorkOrder.id);
        modalFormData.append('purchase_order', editWorkOrder.purchase_order);
        modalFormData.append('designer_head', editWorkOrder.designer_head);
        modalFormData.append('designer_head_description_status', JSON.stringify(editWorkOrder.designer_head_description_status));
        modalFormData.append('designer_head_file', editWorkOrder.designer_head_file);
        modalFormData.append('designer', editWorkOrder.designer);
        modalFormData.append('designer_description_status', JSON.stringify(editWorkOrder.designer_description_status));
        modalFormData.append('designer_file', editWorkOrder.designer_file);
        modalFormData.append('programmer', editWorkOrder.programmer);
        modalFormData.append('programmer_description_status', JSON.stringify(editWorkOrder.programmer_description_status));
        modalFormData.append('programmer_file', editWorkOrder.programmer_file);
        modalFormData.append('machine_operator', editWorkOrder.machine_operator);
        modalFormData.append('machine_operator_description_status', JSON.stringify(editWorkOrder.machine_operator_description_status));
        modalFormData.append('machine_operator_parameter', JSON.stringify(editWorkOrder.machine_operator_parameter));
        modalFormData.append('machine_operator_file', editWorkOrder.machine_operator_file);
        modalFormData.append('transporter', editWorkOrder.transporter);
        modalFormData.append('transporter_description_status', JSON.stringify(editWorkOrder.transporter_description_status));
        modalFormData.append('transporter_file', editWorkOrder.transporter_file);
        const config = {
            headers: { 'content-type': 'application/json' }
        }
        axios.post(api_url + "update_work_order.php", modalFormData, config)
            .then(() => {
                axios.get(api_url + "read_work_order_by_crm.php")
                    .then((res) => {
                        console.log(res.data)
                        setReadWorkOrder(res.data)
                    })
            })
        handleClose();
    }
    //Read
    const onRead = (row) => {
        handleShow1();
        setSingleWorkOrder({
            id: row.id,
            work_order: row.work_order,
            purchase_order: row.purchase_order,
            designer_head: row.designer_head,
            designer_head_description_status: JSON.parse(row.designer_head_description_status.slice(1, -1)),
            designer_head_file: row.designer_head_file,
            designer: row.designer,
            designer_description_status: JSON.parse(row.designer_description_status.slice(1, -1)),
            designer_file: row.designer_file,
            programmer: row.programmer,
            programmer_description_status: JSON.parse(row.programmer_description_status.slice(1, -1)),
            programmer_file: row.programmer_file,
            machine_operator: row.machine_operator,
            machine_operator_description_status: JSON.parse(row.machine_operator_description_status.slice(1, -1)),
            machine_operator_parameter: JSON.parse(row.machine_operator_parameter.slice(1, -1)),
            machine_operator_file: row.machine_operator_file,
            transporter: row.transporter,
            transporter_description_status: JSON.parse(row.transporter_description_status.slice(1, -1)),
            transporter_file: row.transporter_file

        })
        setReadFormValues(JSON.parse(row.designer_head_description_status.slice(1, -1)))
        setReadFormValues1(JSON.parse(row.designer_description_status.slice(1, -1)))
        setReadFormValues2(JSON.parse(row.programmer_description_status.slice(1, -1)))
        setReadFormValues3(JSON.parse(row.machine_operator_description_status.slice(1, -1)))
        setReadInspectionParametersFormValues(JSON.parse(row.machine_operator_parameter.slice(1, -1)))
        setReadFormValues4(JSON.parse(row.transporter_description_status.slice(1, -1)))
    }

    //Delete
    const onDelete = (id) => {
        axios.post(api_url + "delete_work_order.php", { id: id })
            .then(() => {
                axios.get(api_url + "read_work_order_by_crm.php")
                    .then((res) => {
                        console.log(res.data)
                        setReadWorkOrder(res.data)
                    })
            })
    }
    //Read All Data
    useEffect(() => {
        axios.get(api_url + "read_work_order_by_crm.php")
            .then((res) => {
                console.log(res.data)
                setReadWorkOrder(res.data)
            })
    }, [])
    const columns = [
        {
            field: "id",
            headerName: "ID"
        },
        {
            field: "work_order",
            headerName: "Work Order",
            width: 500
        },
        // {
        //     field: "designer_head_name",
        //     headerName: "Designer Head"
        // },
        // {
        //     field: "designer_name",
        //     headerName: "Designer"
        // },
        // {
        //     field: "programmer_name",
        //     headerName: "Programmer"
        // },
        // {
        //     field: "machine_operator_name",
        //     headerName: "Machine Operator"
        // },
        // {
        //     field: "transporter_name",
        //     headerName: "Transporter"
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
    const rows = readWorkOrder === undefined ? [] : readWorkOrder.data
    return (
        <>
            <Header />
            <Menu />
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Edit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={onModalFormSubmit}>
                        <div className="card-body">
                            <div className="form-group">
                                <label >PO-Id</label>
                                <select onChange={onEditPurchaseOrderChange} defaultValue={editWorkOrder.purchase_order} className='form-control'>
                                    <option>Select</option>
                                    {purchaseOrder === undefined ? [] : purchaseOrder.data.map((purchaseorder) => (
                                        <option key={purchaseorder.id} value={purchaseorder.id}>{purchaseorder.purchase_order}</option>
                                    ))}
                                </select>
                            </div>
                            <div class="card-body">
                                <div class="card card-primary card-outline">
                                    <div class="card-header">
                                        <label >Designer Head</label>
                                        <select onChange={onEditDesignerHeadChange} defaultValue={editWorkOrder.designer_head} name="designer_head" className='form-control'>
                                            <option>Select</option>
                                            {designerHead === undefined ? [] : designerHead.data.map((designerhead) => (
                                                <option key={designerhead.id} value={designerhead.id}>{designerhead.name}</option>
                                            ))}
                                        </select>
                                        <label>Download File</label><br />
                                        <button className='btn btn-success'><a href={`http://localhost/girnar_backend/assets/images/${editWorkOrder.designer_head_file}`}>Download File</a></button>
                                        {editFormValues.map((element, index) => (
                                            <div className="form-group" key={index}>
                                                <label>Description</label>
                                                <input className="form-control" type="text" name="description" value={element.description || ""} onChange={e => editHandleChange(index, e)} />
                                                <label>Status</label>
                                                {/* <input className="form-control" type="text" name="status" value={element.status || ""} onChange={e => handleChange(index, e)} /> */}
                                                <select className="form-control" type="text" name="status" value={element.status || ""} onChange={e => editHandleChange(index, e)} >
                                                    <option>Select</option>
                                                    <option value="assigned">Assigned</option>
                                                    <option value="completed">Completed</option>
                                                </select>
                                                {
                                                    index ?
                                                        <button type="button" className="btn btn-danger" onClick={() => removeEditFormFields(index)}>Remove</button>
                                                        : null
                                                }
                                            </div>
                                        ))}
                                        <div className="button-section">
                                            <button className="btn btn-info" type="button" onClick={() => addEditFormFields()}>Add</button>

                                        </div>
                                        {/* <label >File Uploaded</label>
                                                    <img src="https://picsum.photos/200/35" alt="File" /> */}

                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="card card-primary card-outline">
                                    <div class="card-header">
                                        <label >Designer</label>
                                        <select onChange={onEditDesignerChange} defaultValue={editWorkOrder.designer} className='form-control'>
                                            <option>Select</option>
                                            {designer === undefined ? [] : designer.data.map((designer) => (
                                                <option key={designer.id} value={designer.id}>{designer.name}</option>
                                            ))}
                                        </select>
                                        <label>Download File</label><br />
                                        <button className='btn btn-success'><a href={`http://localhost/girnar_backend/assets/images/${editWorkOrder.designer_file}`}>Download File</a></button>
                                        {editFormValues1.map((element, index) => (
                                            <div className="form-group" key={index}>
                                                <label>Description</label>
                                                <input className="form-control" type="text" name="description1" value={element.description1 || ""} onChange={e => editHandleChange1(index, e)} />
                                                <label>Status</label>
                                                {/* <input className="form-control" type="text" name="status1" value={element.status1 || ""} onChange={e => handleChange1(index, e)} /> */}
                                                <select className="form-control" type="text" name="status1" value={element.status1 || ""} onChange={e => editHandleChange1(index, e)} >
                                                    <option>Select</option>
                                                    <option value="assigned">Assigned</option>
                                                    <option value="completed">Completed</option>
                                                </select>
                                                {
                                                    index ?
                                                        <button type="button" className="btn btn-danger" onClick={() => removeEditFormFields1(index)}>Remove</button>
                                                        : null
                                                }
                                            </div>
                                        ))}
                                        <div className="button-section">
                                            <button className="btn btn-info" type="button" onClick={() => addEditFormFields1()}>Add</button>

                                        </div>
                                        {/* <label >File Uploaded</label>
                                                    <img src="https://picsum.photos/200/35" alt="File" /> */}

                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="card card-primary card-outline">
                                    <div class="card-header">
                                        <label >Programmer</label>
                                        <select onChange={onEditProgrammerChange} defaultValue={editWorkOrder.programmer} className='form-control'>
                                            <option>Select</option>
                                            {programmer === undefined ? [] : programmer.data.map((programmer) => (
                                                <option key={programmer.id} value={programmer.id}>{programmer.name}</option>
                                            ))}
                                        </select>
                                        <label>Download File</label><br />
                                        <button className='btn btn-success'><a href={`http://localhost/girnar_backend/assets/images/${editWorkOrder.programmer_file}`}>Download File</a></button>
                                        {editFormValues2.map((element, index) => (
                                            <div className="form-group" key={index}>
                                                <label>Description</label>
                                                <input className="form-control" type="text" name="description2" value={element.description2 || ""} onChange={e => editHandleChange2(index, e)} />
                                                <label>Status</label>
                                                {/* <input className="form-control" type="text" name="status2" value={element.status2 || ""} onChange={e => handleChange2(index, e)} /> */}
                                                <select className="form-control" type="text" name="status2" value={element.status2 || ""} onChange={e => editHandleChange2(index, e)}>
                                                    <option>Select</option>
                                                    <option value="assigned">Assigned</option>
                                                    <option value="completed">Completed</option>
                                                </select>
                                                {
                                                    index ?
                                                        <button type="button" className="btn btn-danger" onClick={() => removeEditFormFields2(index)}>Remove</button>
                                                        : null
                                                }
                                            </div>
                                        ))}
                                        <div className="button-section">
                                            <button className="btn btn-info" type="button" onClick={() => addEditFormFields2()}>Add</button>

                                        </div>
                                        {/* <label >File Uploaded</label>
                                                    <img src="https://picsum.photos/200/35" alt="File" /> */}

                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="card card-primary card-outline">
                                    <div class="card-header">
                                        <label >Machine Operator</label>
                                        <select onChange={onEditMachineOperatorChange} defaultValue={editWorkOrder.machine_operator} className='form-control'>
                                            <option>Select</option>
                                            {machineOperator === undefined ? [] : machineOperator.data.map((machineoperator) => (
                                                <option key={machineoperator.id} value={machineoperator.id}>{machineoperator.name}</option>
                                            ))}
                                        </select>
                                        <label>Download File</label><br />
                                        <button className='btn btn-success'><a href={`http://localhost/girnar_backend/assets/images/${editWorkOrder.machine_operator_file}`}>Download File</a></button>
                                        {editFormValues3.map((element, index) => (
                                            <div className="form-group" key={index}>
                                                <label>Description</label>
                                                <input className="form-control" type="text" name="description3" value={element.description3 || ""} onChange={e => editHandleChange3(index, e)} />
                                                <label>Status</label>
                                                {/* <input className="form-control" type="text" name="status3" value={element.status3 || ""} onChange={e => handleChange3(index, e)} /> */}
                                                <select className="form-control" type="text" name="status3" value={element.status3 || ""} onChange={e => editHandleChange3(index, e)}>
                                                    <option>Select</option>
                                                    <option value="assigned">Assigned</option>
                                                    <option value="completed">Completed</option>
                                                </select>
                                                {
                                                    index ?
                                                        <button type="button" className="btn btn-danger" onClick={() => removeEditFormFields3(index)}>Remove</button>
                                                        : null
                                                }
                                            </div>
                                        ))}
                                        <div className="button-section">
                                            <button className="btn btn-info" type="button" onClick={() => addEditFormFields3()}>Add</button>

                                        </div>
                                        <hr />
                                        {editInspectionParametersFormValues.map((element, index) => (
                                            <div className="form-group" key={index}>
                                                <label>Parameter</label>
                                                <input className="form-control" type="number" name="parameter" value={element.parameter || ""} onChange={e => editHandleChangeInspectionParameters(index, e)} />
                                                <label>Result</label>
                                                {/* <input className="form-control" type="text" name="result" value={element.result || ""} onChange={e => handleChangeInspectionParameters(index, e)} /> */}
                                                {/* <select className="form-control" type="text" name="result" value={element.result || ""} onChange={e => editHandleChangeInspectionParameters(index, e)}>
                                                    <option>Select</option>
                                                    <option>Pass</option>
                                                    <option>Fail</option>
                                                </select> */}
                                                <input list="parameter_options" id="result" value={element.result || ""} onChange={e => editHandleChangeInspectionParameters(index, e)} className="form-control" type="text" name="result" />

                                                <datalist id="parameter_options">
                                                    <option>not_ok</option>
                                                    <option>ok</option>
                                                </datalist>
                                                {element.result === "ok" ? "" :
                                                        element.result === "initial" ? "" :
                                                            <><label>Reason</label>
                                                                <input list="reason" id="reason" value={element.reason || ""} onChange={e => editHandleChangeInspectionParameters(index, e)} className="form-control" type="text" name="reason" /></>}
                                                {
                                                    index ?
                                                        <button type="button" className="btn btn-danger" onClick={() => removeEditFormFieldsInspectionParameters(index)}>Remove</button>
                                                        : null
                                                }
                                            </div>
                                        ))}
                                        <div className="button-section">
                                            <button className="btn btn-info" type="button" onClick={() => addEditFormFieldsInspectionParameters()}>Add</button>

                                        </div>
                                        {/* <label >File Uploaded</label>
                                                    <img src="https://picsum.photos/200/35" alt="File" /> */}

                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="card card-primary card-outline">
                                    <div class="card-header">
                                        <label >Transporter</label>
                                        <select onChange={onEditTransporterChange} defaultValue={editWorkOrder.transporter} className='form-control'>
                                            <option>Select</option>
                                            {transporter === undefined ? [] : transporter.data.map((transporter) => (
                                                <option key={transporter.id} value={transporter.id}>{transporter.name}</option>
                                            ))}
                                        </select>
                                        <label>Download File</label><br />
                                        <button className='btn btn-success'><a href={`http://localhost/girnar_backend/assets/images/${editWorkOrder.transporter_file}`}>Download File</a></button>
                                        {editFormValues4.map((element, index) => (
                                            <div className="form-group" key={index}>
                                                <label>Description</label>
                                                <input className="form-control" type="text" name="description4" value={element.description4 || ""} onChange={e => editHandleChange4(index, e)} />
                                                <label>Status</label>
                                                {/* <input className="form-control" type="text" name="status4" value={element.status4 || ""} onChange={e => handleChange4(index, e)} /> */}
                                                <select className="form-control" type="text" name="status4" value={element.status4 || ""} onChange={e => editHandleChange4(index, e)}>
                                                    <option>Select</option>
                                                    <option value="assigned">Assigned</option>
                                                    <option value="completed">Completed</option>
                                                </select>
                                                {
                                                    index ?
                                                        <button type="button" className="btn btn-danger" onClick={() => removeEditFormFields4(index)}>Remove</button>
                                                        : null
                                                }
                                            </div>
                                        ))}
                                        <div className="button-section">
                                            <button className="btn btn-info" type="button" onClick={() => addEditFormFields4()}>Add</button>

                                        </div>
                                        {/* <label >File Uploaded</label>
                                                    <img src="https://picsum.photos/200/35" alt="File" /> */}

                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* /.card-body */}
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Submit</button>
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
                    <Modal.Title>Details Read</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="card-body">
                            <div className="form-group">
                                <label >PO-Id</label>
                                <select defaultValue={singleWorkOrder.purchase_order} className='form-control' readOnly>
                                    <option>Select</option>
                                    {purchaseOrder === undefined ? [] : purchaseOrder.data.map((purchaseorder) => (
                                        <option disabled={true} key={purchaseorder.id} value={purchaseorder.id}>{purchaseorder.purchase_order}</option>
                                    ))}
                                </select>
                            </div>
                            <div class="card-body">
                                <div class="card card-primary card-outline">
                                    <div class="card-header">
                                        <label >Designer Head</label>
                                        <select defaultValue={singleWorkOrder.designer_head} name="designer_head" className='form-control' readOnly>
                                            <option>Select</option>
                                            {designerHead === undefined ? [] : designerHead.data.map((designerhead) => (
                                                <option disabled={true} key={designerhead.id} value={designerhead.id}>{designerhead.name}</option>
                                            ))}
                                        </select>
                                        <label>Download File</label><br />
                                        <button className='btn btn-success'><a href={`http://localhost/girnar_backend/assets/images/${singleWorkOrder.designer_head_file}`}>Download File</a></button>
                                        {readFormValues.map((element, index) => (
                                            <div className="form-group" key={index}>
                                                <label>Description</label>
                                                <input className="form-control" type="text" name="description" value={element.description || ""} readOnly />
                                                <label>Status</label>
                                                {/* <input className="form-control" type="text" name="status" value={element.status || ""} onChange={e => handleChange(index, e)} /> */}
                                                <select className="form-control" type="text" name="status" value={element.status || ""} readOnly >
                                                    <option disabled={true}>Select</option>
                                                    <option disabled={true} value="assigned">Assigned</option>
                                                    <option disabled={true} value="completed">Completed</option>
                                                </select>

                                            </div>
                                        ))}

                                        {/* <label >File Uploaded</label>
                                                    <img src="https://picsum.photos/200/35" alt="File" /> */}

                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="card card-primary card-outline">
                                    <div class="card-header">
                                        <label >Designer</label>
                                        <select defaultValue={singleWorkOrder.designer} className='form-control' readOnly>
                                            <option>Select</option>
                                            {designer === undefined ? [] : designer.data.map((designer) => (
                                                <option disabled={true} key={designer.id} value={designer.id}>{designer.name}</option>
                                            ))}
                                        </select>
                                        <label>Download File</label><br />
                                        <button className='btn btn-success'><a href={`http://localhost/girnar_backend/assets/images/${singleWorkOrder.designer_file}`}>Download File</a></button>
                                        {readFormValues1.map((element, index) => (
                                            <div className="form-group" key={index}>
                                                <label>Description</label>
                                                <input className="form-control" type="text" name="description1" value={element.description1 || ""} readOnly />
                                                <label>Status</label>
                                                {/* <input className="form-control" type="text" name="status1" value={element.status1 || ""} onChange={e => handleChange1(index, e)} /> */}
                                                <select className="form-control" type="text" name="status1" value={element.status1 || ""} readOnly >
                                                    <option disabled={true}>Select</option>
                                                    <option disabled={true} value="assigned">Assigned</option>
                                                    <option disabled={true} value="completed">Completed</option>
                                                </select>

                                            </div>
                                        ))}

                                        {/* <label >File Uploaded</label>
                                                    <img src="https://picsum.photos/200/35" alt="File" /> */}

                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="card card-primary card-outline">
                                    <div class="card-header">
                                        <label >Programmer</label>
                                        <select defaultValue={singleWorkOrder.programmer} className='form-control' readOnly>
                                            <option>Select</option>
                                            {programmer === undefined ? [] : programmer.data.map((programmer) => (
                                                <option disabled={true} key={programmer.id} value={programmer.id}>{programmer.name}</option>
                                            ))}
                                        </select>
                                        <label>Download File</label><br />
                                        <button className='btn btn-success'><a href={`http://localhost/girnar_backend/assets/images/${singleWorkOrder.programmer_file}`}>Download File</a></button>
                                        {readFormValues2.map((element, index) => (
                                            <div className="form-group" key={index}>
                                                <label>Description</label>
                                                <input className="form-control" type="text" name="description2" value={element.description2 || ""} readOnly />
                                                <label>Status</label>
                                                {/* <input className="form-control" type="text" name="status2" value={element.status2 || ""} onChange={e => handleChange2(index, e)} /> */}
                                                <select className="form-control" type="text" name="status2" value={element.status2 || ""} readOnly >
                                                    <option disabled={true}>Select</option>
                                                    <option disabled={true} value="assigned">Assigned</option>
                                                    <option disabled={true} value="completed">Completed</option>
                                                </select>

                                            </div>
                                        ))}

                                        {/* <label >File Uploaded</label>
                                                    <img src="https://picsum.photos/200/35" alt="File" /> */}

                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="card card-primary card-outline">
                                    <div class="card-header">
                                        <label >Machine Operator</label>
                                        <select defaultValue={singleWorkOrder.machine_operator} className='form-control' readOnly>
                                            <option>Select</option>
                                            {machineOperator === undefined ? [] : machineOperator.data.map((machineoperator) => (
                                                <option disabled={true} key={machineoperator.id} value={machineoperator.id}>{machineoperator.name}</option>
                                            ))}
                                        </select>
                                        <label>Download File</label><br />
                                        <button className='btn btn-success'><a href={`http://localhost/girnar_backend/assets/images/${singleWorkOrder.machine_operator_file}`}>Download File</a></button>
                                        {readFormValues3.map((element, index) => (
                                            <div className="form-group" key={index}>
                                                <label>Description</label>
                                                <input className="form-control" type="text" name="description3" value={element.description3 || ""} readOnly />
                                                <label>Status</label>
                                                {/* <input className="form-control" type="text" name="status3" value={element.status3 || ""} onChange={e => handleChange3(index, e)} /> */}
                                                <select className="form-control" type="text" name="status3" value={element.status3 || ""} readOnly >
                                                    <option disabled={true}>Select</option>
                                                    <option disabled={true} value="assigned">Assigned</option>
                                                    <option disabled={true} value="completed">Completed</option>
                                                </select>

                                            </div>
                                        ))}

                                        <hr />
                                        {readInspectionParametersFormValues.map((element, index) => (
                                            <div className="form-group" key={index}>
                                                <label>Parameter</label>
                                                <input className="form-control" type="number" name="parameter" value={element.parameter || ""} readOnly />
                                                <label>Result</label>
                                                {/* <input className="form-control" type="text" name="result" value={element.result || ""} readOnly /> */}
                                                {/* <select className="form-control" type="text" name="result" value={element.result || ""} >
                                                    <option disabled={true}>Select</option>
                                                    <option disabled={true}>Pass</option>
                                                    <option disabled={true}>Fail</option>
                                                </select> */}
                                                <input list="parameter_options" id="result" value={element.result || ""} className="form-control" type="text" name="result" readOnly />
                                                <datalist id="parameter_options">
                                                    <option>not_ok</option>
                                                    <option>ok</option>
                                                </datalist>
                                                {element.result === "ok" ? "" :
                                                    element.result === "initial" ? "" :
                                                        <><label>Reason</label>
                                                            <input list="reason" id="reason" value={element.reason || ""} className="form-control" type="text" name="reason" readOnly /></>}
                                            </div>
                                        ))}

                                        {/* <label >File Uploaded</label>
                                                    <img src="https://picsum.photos/200/35" alt="File" /> */}

                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="card card-primary card-outline">
                                    <div class="card-header">
                                        <label >Transporter</label>
                                        <select defaultValue={singleWorkOrder.transporter} className='form-control' readOnly>
                                            <option>Select</option>
                                            {transporter === undefined ? [] : transporter.data.map((transporter) => (
                                                <option disabled={true} key={transporter.id} value={transporter.id}>{transporter.name}</option>
                                            ))}
                                        </select>
                                        <label>Download File</label><br />
                                        <button className='btn btn-success'><a href={`http://localhost/girnar_backend/assets/images/${singleWorkOrder.transporter_file}`}>Download File</a></button>
                                        {readFormValues4.map((element, index) => (
                                            <div className="form-group" key={index}>
                                                <label>Description</label>
                                                <input className="form-control" type="text" name="description4" value={element.description4 || ""} readOnly />
                                                <label>Status</label>
                                                {/* <input className="form-control" type="text" name="status4" value={element.status4 || ""} onChange={e => handleChange4(index, e)} /> */}
                                                <select className="form-control" type="text" name="status4" value={element.status4 || ""} readOnly>
                                                    <option disabled={true}>Select</option>
                                                    <option disabled={true} value="assigned">Assigned</option>
                                                    <option disabled={true} value="completed">Completed</option>
                                                </select>

                                            </div>
                                        ))}

                                        {/* <label >File Uploaded</label>
                                                    <img src="https://picsum.photos/200/35" alt="File" /> */}

                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* /.card-body */}

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
                            {/* left column */}
                            <div className="col-md-12">
                                {/* general form elements */}
                                <div className="card card-primary">
                                    <div className="card-header">
                                        <h3 className="card-title">Task Creation</h3>
                                    </div>
                                    {/* /.card-header */}
                                    {/* form start */}
                                    <form onSubmit={onFormSubmit}>
                                        <div className="card-body">
                                            <div className="form-group">
                                                <label >PO-Id</label>
                                                <select onChange={onPurchaseOrderChange} className='form-control'>
                                                    <option>Select</option>
                                                    {purchaseOrder === undefined ? [] : purchaseOrder.data.map((purchaseorder) => (
                                                        <option key={purchaseorder.id} value={purchaseorder.id}>{purchaseorder.purchase_order}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div class="card-body">
                                                <div class="card card-primary card-outline">
                                                    <div class="card-header">
                                                        <label >Designer Head</label>
                                                        <select name="designer_head" onChange={onDesignerHeadChange} className='form-control'>
                                                            <option>Select</option>
                                                            {designerHead === undefined ? [] : designerHead.data.map((designerhead) => (
                                                                <option key={designerhead.id} value={designerhead.id}>{designerhead.name}</option>
                                                            ))}
                                                        </select>
                                                        <label>Designer Head File</label>
                                                        <input onChange={onDesignerHeadFileChange} type="file" className='form-control' name="designer_head_file" />
                                                        {formValues.map((element, index) => (
                                                            <div className="form-group" key={index}>
                                                                <label>Description</label>
                                                                <input className="form-control" type="text" name="description" value={element.description || ""} onChange={e => handleChange(index, e)} />
                                                                <label>Status</label>
                                                                {/* <input className="form-control" type="text" name="status" value={element.status || ""} onChange={e => handleChange(index, e)} /> */}
                                                                <select className="form-control" type="text" name="status" value={element.status || ""} onChange={e => handleChange(index, e)} >
                                                                    <option>Select</option>
                                                                    <option value="assigned">Assigned</option>
                                                                    <option value="completed">Completed</option>
                                                                </select>
                                                                {
                                                                    index ?
                                                                        <button type="button" className="btn btn-danger" onClick={() => removeFormFields(index)}>Remove</button>
                                                                        : null
                                                                }
                                                            </div>
                                                        ))}
                                                        <div className="button-section">
                                                            <button className="btn btn-info" type="button" onClick={() => addFormFields()}>Add</button>

                                                        </div>
                                                        {/* <label >File Uploaded</label>
                                                    <img src="https://picsum.photos/200/35" alt="File" /> */}

                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card-body">
                                                <div class="card card-primary card-outline">
                                                    <div class="card-header">
                                                        <label >Designer</label>
                                                        <select onChange={onDesignerChange} className='form-control'>
                                                            <option>Select</option>
                                                            {designer === undefined ? [] : designer.data.map((designer) => (
                                                                <option key={designer.id} value={designer.id}>{designer.name}</option>
                                                            ))}
                                                        </select>
                                                        <label>Designer File</label>
                                                        <input onChange={onDesignerFileChange} type="file" className='form-control' name="designer_file" />
                                                        {formValues1.map((element, index) => (
                                                            <div className="form-group" key={index}>
                                                                <label>Description</label>
                                                                <input className="form-control" type="text" name="description1" value={element.description1 || ""} onChange={e => handleChange1(index, e)} />
                                                                <label>Status</label>
                                                                {/* <input className="form-control" type="text" name="status1" value={element.status1 || ""} onChange={e => handleChange1(index, e)} /> */}
                                                                <select className="form-control" type="text" name="status1" value={element.status1 || ""} onChange={e => handleChange1(index, e)} >
                                                                    <option>Select</option>
                                                                    <option value="assigned">Assigned</option>
                                                                    <option value="completed">Completed</option>
                                                                </select>
                                                                {
                                                                    index ?
                                                                        <button type="button" className="btn btn-danger" onClick={() => removeFormFields1(index)}>Remove</button>
                                                                        : null
                                                                }
                                                            </div>
                                                        ))}
                                                        <div className="button-section">
                                                            <button className="btn btn-info" type="button" onClick={() => addFormFields1()}>Add</button>

                                                        </div>
                                                        {/* <label >File Uploaded</label>
                                                    <img src="https://picsum.photos/200/35" alt="File" /> */}

                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card-body">
                                                <div class="card card-primary card-outline">
                                                    <div class="card-header">
                                                        <label >Programmer</label>
                                                        <select onChange={onProgrammerChange} className='form-control'>
                                                            <option>Select</option>
                                                            {programmer === undefined ? [] : programmer.data.map((programmer) => (
                                                                <option key={programmer.id} value={programmer.id}>{programmer.name}</option>
                                                            ))}
                                                        </select>
                                                        <label>Programmer File</label>
                                                        <input onChange={onProgrammerFileChange} type="file" className='form-control' name="programmer_file" />
                                                        {formValues2.map((element, index) => (
                                                            <div className="form-group" key={index}>
                                                                <label>Description</label>
                                                                <input className="form-control" type="text" name="description2" value={element.description2 || ""} onChange={e => handleChange2(index, e)} />
                                                                <label>Status</label>
                                                                {/* <input className="form-control" type="text" name="status2" value={element.status2 || ""} onChange={e => handleChange2(index, e)} /> */}
                                                                <select className="form-control" type="text" name="status2" value={element.status2 || ""} onChange={e => handleChange2(index, e)}>
                                                                    <option>Select</option>
                                                                    <option value="assigned">Assigned</option>
                                                                    <option value="completed">Completed</option>
                                                                </select>
                                                                {
                                                                    index ?
                                                                        <button type="button" className="btn btn-danger" onClick={() => removeFormFields2(index)}>Remove</button>
                                                                        : null
                                                                }
                                                            </div>
                                                        ))}
                                                        <div className="button-section">
                                                            <button className="btn btn-info" type="button" onClick={() => addFormFields2()}>Add</button>

                                                        </div>
                                                        {/* <label >File Uploaded</label>
                                                    <img src="https://picsum.photos/200/35" alt="File" /> */}

                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card-body">
                                                <div class="card card-primary card-outline">
                                                    <div class="card-header">
                                                        <label >Machine Operator</label>
                                                        <select onChange={onMachineOperatorChange} className='form-control'>
                                                            <option>Select</option>
                                                            {machineOperator === undefined ? [] : machineOperator.data.map((machineoperator) => (
                                                                <option key={machineoperator.id} value={machineoperator.id}>{machineoperator.name}</option>
                                                            ))}
                                                        </select>
                                                        <label>Machine Operator File</label>
                                                        <input onChange={onMachineOperatorFileChange} type="file" className='form-control' name="machine_operator_file" />
                                                        {formValues3.map((element, index) => (
                                                            <div className="form-group" key={index}>
                                                                <label>Description</label>
                                                                <input className="form-control" type="text" name="description3" value={element.description3 || ""} onChange={e => handleChange3(index, e)} />
                                                                <label>Status</label>
                                                                {/* <input className="form-control" type="text" name="status3" value={element.status3 || ""} onChange={e => handleChange3(index, e)} /> */}
                                                                <select className="form-control" type="text" name="status3" value={element.status3 || ""} onChange={e => handleChange3(index, e)}>
                                                                    <option>Select</option>
                                                                    <option value="assigned">Assigned</option>
                                                                    <option value="completed">Completed</option>
                                                                </select>
                                                                {
                                                                    index ?
                                                                        <button type="button" className="btn btn-danger" onClick={() => removeFormFields3(index)}>Remove</button>
                                                                        : null
                                                                }
                                                            </div>
                                                        ))}
                                                        <div className="button-section">
                                                            <button className="btn btn-info" type="button" onClick={() => addFormFields3()}>Add</button>

                                                        </div>
                                                        <hr />
                                                        {inspectionParametersFormValues.map((element, index) => (
                                                            <div className="form-group" key={index}>
                                                                <label>Parameter</label>
                                                                <input className="form-control" type="number" name="parameter" value={element.parameter || ""} onChange={e => handleChangeInspectionParameters(index, e)} />
                                                                {/* <label>Result</label> */}
                                                                {/* <input className="form-control" type="text" name="result" value={element.result || ""} onChange={e => handleChangeInspectionParameters(index, e)} /> */}
                                                                {/* <input list="parameter_options" id="result" value={element.result || ""} onChange={e => handleChangeInspectionParameters(index, e)} className="form-control" type="text" name="result" />

                                                                <datalist id="parameter_options">
                                                                    <option>Select</option>
                                                                    <option>Fail</option>
                                                                    <option>Pass</option>
                                                                </datalist>
                                                                {
                                                                    index ?
                                                                        <button type="button" className="btn btn-danger" onClick={() => removeFormFieldsInspectionParameters(index)}>Remove</button>
                                                                        : null
                                                                } */}
                                                            </div>
                                                        ))}
                                                        <div className="button-section">
                                                            <button className="btn btn-info" type="button" onClick={() => addFormFieldsInspectionParameters()}>Add</button>

                                                        </div>
                                                        {/* <label >File Uploaded</label>
                                                    <img src="https://picsum.photos/200/35" alt="File" /> */}

                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card-body">
                                                <div class="card card-primary card-outline">
                                                    <div class="card-header">
                                                        <label >Transporter</label>
                                                        <select onChange={onTransporterChange} className='form-control'>
                                                            <option>Select</option>
                                                            {transporter === undefined ? [] : transporter.data.map((transporter) => (
                                                                <option key={transporter.id} value={transporter.id}>{transporter.name}</option>
                                                            ))}
                                                        </select>

                                                        <label>Transporter File</label>
                                                        <input onChange={onTransporterFileChange} type="file" className='form-control' name="transporter_file" />
                                                        {formValues4.map((element, index) => (
                                                            <div className="form-group" key={index}>
                                                                <label>Description</label>
                                                                <input className="form-control" type="text" name="description4" value={element.description4 || ""} onChange={e => handleChange4(index, e)} />
                                                                <label>Status</label>
                                                                {/* <input className="form-control" type="text" name="status4" value={element.status4 || ""} onChange={e => handleChange4(index, e)} /> */}
                                                                <select className="form-control" type="text" name="status4" value={element.status4 || ""} onChange={e => handleChange4(index, e)}>
                                                                    <option>Select</option>
                                                                    <option value="assigned">Assigned</option>
                                                                    <option value="completed">Completed</option>
                                                                </select>
                                                                {
                                                                    index ?
                                                                        <button type="button" className="btn btn-danger" onClick={() => removeFormFields4(index)}>Remove</button>
                                                                        : null
                                                                }
                                                            </div>
                                                        ))}
                                                        <div className="button-section">
                                                            <button className="btn btn-info" type="button" onClick={() => addFormFields4()}>Add</button>

                                                        </div>
                                                        {/* <label >File Uploaded</label>
                                                    <img src="https://picsum.photos/200/35" alt="File" /> */}

                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div className="form-group">
                                            <label >Operation</label>
                                            <select className='form-control'>
                                                <option>Select</option>
                                                <option>Laser Cutting</option>
                                                <option>Bending</option>
                                                <option>Powder Coating</option>
                                                <option>Machining</option>
                                                <option>Grinding</option>
                                            </select>
                                        </div> */}
                                            {/* <div className="form-group">
                                            <label >Time Required</label>
                                            <input className="form-control" placeholder="Enter part material" />
                                        </div>
                                        <div className="form-group">
                                            <label >Process Status</label>
                                            <input className="form-control" placeholder="Enter part material" />
                                        </div> */}
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
                                        <h3 class="card-title">Task Data</h3>
                                    </div>
                                    <div class="card-body">
                                        <div style={{ height: 300, width: '100%' }}>
                                            <DataGrid rows={rows === undefined ? [] : rows} columns={columns} components={{
                                                Toolbar: GridToolbar,
                                            }} />
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

export default DesignerHeadTask;

