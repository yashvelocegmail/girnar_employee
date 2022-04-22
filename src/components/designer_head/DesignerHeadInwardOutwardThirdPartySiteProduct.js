import axios from 'axios'
import { api_url } from '../ApiUrl';
import React, { useEffect, useState } from 'react'
import Header from '../../Header'
import Menu from '../../Menu'
import { toast } from 'react-toastify';
import { DataGrid } from '@mui/x-data-grid';
import { Modal, Button, Form } from "react-bootstrap";

function DesignerHeadInwardOutwardThirdPartySiteProduct() {
    //States
    const [inwardOutwardType, setInwardOutwardType] = useState();
    const [workOrderOption, setWorkOrderOption] = useState();
    const [thirdPartyOption,setThirdPartyOption] = useState();
    //Option Setting
    const onTypeChange = (e) => {
        setInwardOutwardType({ ...inwardOutwardType, [e.target.name]: e.target.value })
    }
    useEffect(() => {
        axios.get(api_url + "read_work_order_by_crm.php")
            .then((res) => {
                setWorkOrderOption(res.data)
            })
        axios.get(api_url + "read_third_party.php")
            .then((res) => {
                setThirdPartyOption(res.data)
            })
    })
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
                                        <h3 className="card-title">Inward Outward Third Party Site Product</h3>
                                    </div>
                                    {/* /.card-header */}
                                    {/* form start */}
                                    <form>
                                        <div className="card-body">
                                            <div className="form-group">
                                                <label >Type</label>
                                                <select name="work_order" className="form-control" onChange={onTypeChange} required>
                                                    <option value="">Select</option>
                                                    <option value="third_party">Third Party</option>
                                                    <option value="site">Site</option>
                                                    <option value="product">Product</option>
                                                </select>
                                            </div>
                                            <div className='form-group'>
                                                <label>Work Order</label>
                                                <select className="form-control" name="work_order">
                                                    <option value="">Select</option>
                                                    {
                                                        workOrderOption === undefined ? [] : workOrderOption.data.map((work_order) => (
                                                            <option key={work_order.id} value={work_order.id}>{work_order.work_order}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                            <div className='form-group'>
                                                <label>Third Party</label>
                                                <select className="form-control" name="work_order">
                                                    <option value="">Select</option>
                                                    {
                                                        thirdPartyOption === undefined ? [] : thirdPartyOption.data.map((third_party) => (
                                                            <option key={third_party.id} value={third_party.id}>{third_party.name}</option>
                                                        ))
                                                    }
                                                </select>
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
                        {/* <div className='row'>
                            <div className='col-md-12'>
                                <div class="card">
                                    <div class="card-header">
                                        <h3 class="card-title">Material Type</h3>
                                    </div>
                                    <div class="card-body">
                                        <div style={{ height: 300, width: '100%' }}>
                                            <DataGrid rows={rows === undefined ? [] : rows} columns={columns} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </section >
            </div >
        </>
    )
}

export default DesignerHeadInwardOutwardThirdPartySiteProduct