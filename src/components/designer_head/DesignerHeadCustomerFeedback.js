import React from 'react'
import Header from '../../Header'
import Menu from '../../Menu'

function DesignerHeadCustomerFeedback() {
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
                                    <h3 class="card-title">Cusomer Feedback</h3>
                                </div>
                                <div class="card-body">
                                    <table id="example1" class="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th>Customer Id</th>
                                                <th>Rating</th>
                                                <th>Comment</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Customer-1</td>
                                                <th><span class="fa fa-star checked"></span>
                                                    <span class="fa fa-star checked"></span>
                                                    <span class="fa fa-star checked"></span>
                                                    <span class="fa fa-star"></span>
                                                    <span class="fa fa-star"></span></th>
                                                <td>Excellent Service</td>
                                            </tr>
                                            <tr>
                                                <td>Customer-2</td>
                                                <th><span class="fa fa-star checked"></span>
                                                    <span class="fa fa-star checked"></span>
                                                    <span class="fa fa-star checked"></span>
                                                    <span class="fa fa-star"></span>
                                                    <span class="fa fa-star"></span></th>
                                                <td>Good Quality Work</td>
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

        </>    )
}

export default DesignerHeadCustomerFeedback
