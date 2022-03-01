import React from 'react';
import Header from '../../Header';
import Menu from '../../Menu';

function Payment() {
    return <>
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
                                <h3 className="card-title">Stock Request</h3>
                            </div>
                            {/* /.card-header */}
                            {/* form start */}
                            <form>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label >Customer</label>
                                        <select className='form-control'>
                                            <option>Select</option>
                                            <option>Yash</option>
                                            <option>Ramesh</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label >PO Id</label>
                                        <select className='form-control'>
                                            <option>Select</option>
                                            <option>PO-1</option>
                                            <option>PO-2</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label >Bill Amount</label>
                                        <input type="text" name="bill_amount" className='form-control'/>
                                    </div>
                                    <div className="form-group">
                                        <label >Amount Received</label>
                                        <input type="text" name="amount_received" className='form-control'/>
                                    </div>
                                    <div className="form-group">
                                        <label >Amount Pending</label>
                                        <input type="text" name="amount_pending" className='form-control'/>
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
                                <h3 class="card-title">Payment</h3>
                            </div>
                            <div class="card-body">
                                <table id="example1" class="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>Customer</th>
                                            <th>PO Id</th>
                                            <th>Bill Amount</th>
                                            <th>Amount Recieved</th>
                                            <th>Amount Pending</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Ramesh</td>
                                            <td>PO-1</td>
                                            <td><p><small class="badge badge-info">4000</small></p></td>
                                            <td><p><small class="badge badge-success">2000</small></p></td>
                                            <td><p><small class="badge badge-danger">2000</small></p></td>
                                            <td><i className="fas fa-edit fa-fw" />
                                                <i className="fas fa-trash fa-fw" /></td>
                                        </tr>
                                        <tr>
                                            <td>Ganesh</td>
                                            <td>PO-2</td>
                                            <td><p><small class="badge badge-info">8000</small></p></td>
                                            <td><p><small class="badge badge-success">4000</small></p></td>
                                            <td><p><small class="badge badge-danger">4000</small></p></td>
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
        ;
}

export default Payment;
