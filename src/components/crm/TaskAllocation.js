import React from 'react'
import Header from '../../Header'
import Menu from '../../Menu'

function TaskAllocation() {
    return (
        <>
        <Header />
        <Menu />
        <div className='content-wrapper'>
            <section class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1>Form</h1>
                        </div>
                        <div class="col-sm-6">
                            <ol class="breadcrumb float-sm-right">
                                <li class="breadcrumb-item"><a href="#">Home</a></li>
                                <li class="breadcrumb-item active">Form</li>
                            </ol>
                        </div>
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
                                    <h3 className="card-title">Task Creation</h3>
                                </div>
                                {/* /.card-header */}
                                {/* form start */}
                                <form>
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label >PO-Id</label>
                                            <select className='form-control'>
                                                <option>Select</option>
                                                <option>WO-1</option>
                                                <option>WO-2</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label >Employee Name/Id</label>
                                            <select className='form-control'>
                                                <option>Select</option>
                                                <option>Yash</option>
                                                <option>Ganesh</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label >Operation</label>
                                            <select className='form-control'>
                                                <option>Select</option>
                                                <option>Laser Cutting</option>
                                                <option>Bending</option>
                                                <option>Powder Coating</option>
                                                <option>Machining</option>
                                                <option>Grinding</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label >Time Required</label>
                                            <input className="form-control" placeholder="Enter part material" />
                                        </div>
                                        <div className="form-group">
                                            <label >Process Status</label>
                                            <input className="form-control" placeholder="Enter part material" />
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
                                    <h3 class="card-title">Task Allocation</h3>
                                </div>
                                <div class="card-body">
                                    <table id="example1" class="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th>WO Id</th>
                                                <th>Emnployee Name</th>
                                                <th>Operation</th>
                                                <th>Time Required</th>
                                                <th>Process Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>WO-1</td>
                                                <td>Yash</td>
                                                <td>Designing</td>
                                                <td>4</td>
                                                <td><p><small class="badge badge-info"><i class="fas fa-clock"></i>Issued</small></p></td>
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

        </div></>
    )
}

export default TaskAllocation
