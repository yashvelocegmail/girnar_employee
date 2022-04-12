import axios from 'axios'
import { api_url } from '../ApiUrl';
import React, { useEffect, useState } from 'react'
import Header from '../../Header'
import Menu from '../../Menu'
import { toast } from 'react-toastify';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Modal, Button, Form } from "react-bootstrap";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';  


function DesignerHeadInspectionReport() {
    //States
    const [workOrderOption, setWorkOrderOption] = useState();
    const [workOrder, setWorkorder] = useState();
    const [inspectionReport, setInspectionReport] = useState();
    //Option feilds
    useEffect(() => {
        axios.get(api_url + "read_work_order_by_crm.php")
            .then((res) => {
                setWorkOrderOption(res.data)
            })
    }, [])
    //WorkOrder  Change
    const onWorkOrderChange = (e) => {
        axios.post(api_url + "read_work_order_by_id.php", { id: e.target.value })
            .then((res) => {
                console.log(res.data.data[0].work_order);
                setWorkorder(res.data.data[0].work_order)
            })
        axios.post(api_url + "read_work_order_by_id.php", { id: e.target.value })
            .then((res) => {
                //console.log(JSON.parse(res.data.data[0].machine_operator_parameter.slice(1, -1)))
                setInspectionReport(JSON.parse(res.data.data[0].machine_operator_parameter.slice(1, -1)))
                console.log(inspectionReport)
            })
    }

    const columns = [
        {
            field: "parameter",
            headerName: "Parameter",
            width: 500
        },
        {
            field: "result",
            headerName: "Result",
            width: 500
        }
    ]
    const rows = inspectionReport;
    return (
        <>
            <Header />
            <Menu />
            <div className='content-wrapper'>
                <section class="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className='col-md-12'>
                                {/* left column */}
                                <div className="card card-primary">
                                    <div className="card-header">
                                        <h3 className="card-title">Inspection Report</h3>
                                    </div>
                                    {/* /.card-header */}
                                    {/* form start */}
                                    <form>
                                        <div className="card-body">
                                            <div className="form-group">
                                                <label >Work Order</label>
                                                <select className='form-control' name="work_order" onChange={onWorkOrderChange}>
                                                    <option value="">Select</option>
                                                    {workOrderOption === undefined ? [] : workOrderOption.data.map((work_order) => (
                                                        <option key={work_order.id} value={work_order.id}>{work_order.work_order}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        {/* <div className='row'>
                            <div className='col-md-12'>
                                <div class="card">
                                    <div class="card-header">
                                        <h3 class="card-title">Inspection Report</h3>
                                    </div>
                                    <div class="card-body">
                                        <div style={{ height: 300, width: '100%' }}>
                                            <DataGrid getRowId={(row) => row.parameter} rows={rows===undefined?[]:rows} columns={columns} components={{
                                                Toolbar: GridToolbar,
                                            }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        <div className='row'>
                            <div className='col-md-12'>
                                <div class="card">
                                    <div class="card-header">
                                        <h3 class="card-title">Inspection Report</h3>
                                    </div>
                                    <div class="card-body">
                                        <div>
                                            <ReactHTMLTableToExcel
                                                className="btn btn-info"
                                                table="emp"
                                                filename="ReportExcel"
                                                sheet="Sheet"
                                                buttonText="Export excel" />
                                        </div>
                                        <table id="emp" className="table table-bordered">
                                            <tr>
                                                <th className='text-center' colSpan={2}>{workOrder}</th>
                                            </tr>
                                            <tr>
                                                <th className='text-center'>Parameter</th>
                                                <th className='text-center'>Result</th>
                                            </tr>
                                            {
                                                inspectionReport === undefined ? "" : inspectionReport.map((inspection) => (
                                                    <tr>
                                                        <td className='text-center'>{inspection.parameter}</td>
                                                        <td className='text-center'>{inspection.result}</td>
                                                    </tr>
                                                ))
                                            }

                                        </table>
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

export default DesignerHeadInspectionReport