import React from 'react'
import Header from '../../Header'
import Menu from '../../Menu'

function SuperAdminAvailableStock() {
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
                                    <table id="example1" class="table table-bordered table-striped">
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
                                                <td>10</td>
                                            </tr>
                                            <tr>
                                                <td>Aluminium</td>
                                                <th>6mm</th>
                                                <td>0</td>
                                            </tr>
                                            <tr>
                                                <td>Copper</td>
                                                <th>6mm</th>
                                                <td>12</td>
                                            </tr>
                                        </tbody>

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

export default SuperAdminAvailableStock
