import React from 'react'
import Header from '../../Header'
import Menu from '../../Menu'

function PurchaseManagerVendorMaster() {
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
                        <h3 className="card-title">Vendor Master</h3>
                    </div>
                    {/* /.card-header */}
                    {/* form start */}
                    <form>
                        <div className="card-body">
                            <div className="form-group">
                                <label >Vendor Name</label>
                                <input type="part_name" className="form-control" />
                            </div>

                            <div className="form-group">
                                <label >Vendor Email</label>
                                <input type="part_name" className="form-control" />
                            </div>

                            <div className="form-group">
                                <label >Vendor Mobile No</label>
                                <input type="part_name" className="form-control" />
                            </div>

                            <div className="form-group">
                                <label >Vendor Address</label>
                                <input type="part_name" className="form-control" />
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
                        <h3 class="card-title">Vendor</h3>
                    </div>
                    <div class="card-body">
                        <table id="example1" class="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Vendor Id</th>
                                    <th>Vendor Name</th>
                                    <th>Vendor Email</th>
                                    <th>Vendor Mobile No</th>
                                    <th>Vendor Mobile Address</th>
                                    <th>Vendor Rating</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Yash Shinde</td>
                                    <td>yash@gmail.com</td>
                                    <td>9423744724</td>
                                    <td>Rajarampuri 12 th lane</td>
                                    <td><span class="fa fa-star checked"></span>
                                        <span class="fa fa-star checked"></span>
                                        <span class="fa fa-star checked"></span>
                                        <span class="fa fa-star"></span>
                                        <span class="fa fa-star"></span></td>
                                    <td><i className="fas fa-edit fa-fw" />
                                        <i className="fas fa-trash fa-fw" /></td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Ganesh Shinde</td>
                                    <td>ganesh@gmail.com</td>
                                    <td>8999006194</td>
                                    <td>Rajarampuri 12 th lane</td>
                                    <td><span class="fas fa-star checked"></span>
                                        <span class="fa fa-star checked"></span>
                                        <span class="fa fa-star checked"></span>
                                        <span class="fa fa-star"></span>
                                        <span class="fa fa-star"></span></td>
                                    <td><i className="fas fa-edit fa-fw" />
                                        <i className="fas fa-trash fa-fw" /></td>
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

export default PurchaseManagerVendorMaster
