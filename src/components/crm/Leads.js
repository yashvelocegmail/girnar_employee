import React from 'react';
import Header from '../../Header';
import Menu from '../../Menu';

function Leads() {
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
                      <h3 class="card-title">Leads</h3>
                  </div>
                  <div class="card-body">
                      <table id="example1" class="table table-bordered table-striped">
                          <thead>
                              <tr>
                                  <th>Customer Name</th>
                                  <th>Material quantity</th>
                                  <th>Material thickness</th>
                                  <th>Material type</th>
                                  <th>Material grade </th>
                                  <th>with or without material</th>
                                  <th>Number of sheet</th>
                                  <th>Size</th>
                                  <th>Type of process</th>
                                  <th>Expected delivery</th>
                                  <th>Design upload</th>
                                  <th>Description</th>
                                  <th>Action</th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr>
                                  <td>Sagar</td>
                                  <td>10</td>
                                  <td>2</td>
                                  <td>Steel</td>
                                  <td>Grade B</td>
                                  <td>With</td>
                                  <td>20</td>
                                  <td>30</td>
                                  <td>Machining</td>
                                  <td>27/02/2022</td>
                                  <td>Uploaded</td>
                                  <td>abc</td>
                                  





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
</section></div>
  </>;
}

export default Leads;
