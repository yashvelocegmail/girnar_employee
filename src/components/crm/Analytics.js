import React from 'react';
import Header from '../../Header';
import Menu from '../../Menu';
function Analytics() {
  return <>
  <Header />
  <Menu />
  <div className='content-wrapper'><section class="content">
  <div className="container-fluid">
      <div className="row">
          {/* left column */}
          <div className="col-md-12">
              <div class="card">
                  <div class="card-header">
                      <h3 class="card-title">Analytics</h3>
                  </div>
                  <div class="card-body">
                      <table id="example1" class="table table-bordered table-striped">
                          <thead>
                              <tr>
                                  <th>Employee Name</th>
                                  <th>Number of deals</th>
                                  <th>Deals lost</th>
                                  <th>Deals won</th>
                                  <th>Deals won amount</th>
                            
                                  <th>Action</th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr>
                                  <td>Sagar</td>
                                  <td><p><small class="badge badge-info">0</small></p></td>
                                  <td><p><small class="badge badge-danger">2</small></p></td>
                                  <td><p><small class="badge badge-success">1</small></p></td>
                                  <td><p><small class="badge badge-success">10000</small></p></td>
                                 
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
</section></div></>;
}

export default Analytics;
