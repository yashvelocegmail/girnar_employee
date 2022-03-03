import axios from 'axios'
import { api_url } from '../ApiUrl';
import React, { useEffect, useState } from 'react'
import Header from '../../Header'
import Menu from '../../Menu'
import { toast } from 'react-toastify';
import { DataGrid } from '@mui/x-data-grid';
import { Modal, Button, Form } from "react-bootstrap";

function AvailableStock() {
    const [stockAvailable, setStockAvailable] = useState({
        id: '',
        material_type: '',
        material_thickness: '',
        material_grade: '',
        no_of_sheets: ''
    });

    useEffect(() => {
        axios.get(api_url+"read_stock_available.php")
            .then((res) => {
                setStockAvailable(res.data)
            })
    })
    const columns = [
        {
            field: 'id',
            headerName: 'Id'
        },
        {
            field: 'material_type',
            headerName: 'Material Type',
            width:150
        },
        {
            field: 'material_thickness',
            headerName: 'Material Thickness',
            width:150
        },
        {
            field: 'material_grade',
            headerName: 'Material Grade',
            width:150
        },
        {
            field: 'no_of_sheets',
            headerName: 'No Of Sheets',
            width:150
        },
    ]
    const rows = stockAvailable.data;
    return (
        <>
            <Header />
            <Menu />
            <div className='content-wrapper'>
                <section class="content">
                    <div className="container-fluid">
                        <div className="row">
                            {/* left column */}
                            <div className="col-md-12">
                                <div class="card">
                                    <div class="card-header">
                                        <h3 class="card-title">Stock Available</h3>
                                    </div>
                                    <div class="card-body">
                                        <div style={{ height: 300, width: '100%' }}>
                                            <DataGrid rows={rows} columns={columns} />
                                        </div>
                                        {/* <table id="example1" class="table table-bordered table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Material Type</th>
                                                    <th>Height</th>
                                                    <th>No of sheets</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Aluminium</td>
                                                    <th>4mm</th>
                                                    <td><p><small class="badge badge-danger">0</small></p></td>
                                                </tr>
                                                <tr>
                                                    <td>Aluminium</td>
                                                    <th>6mm</th>
                                                    <td><p><small class="badge badge-success">10</small></p></td>
                                                </tr>
                                                <tr>
                                                    <td>Copper</td>
                                                    <th>6mm</th>
                                                    <td><p><small class="badge badge-info">12</small></p></td>
                                                </tr>
                                            </tbody>

                                        </table> */}
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

export default AvailableStock
