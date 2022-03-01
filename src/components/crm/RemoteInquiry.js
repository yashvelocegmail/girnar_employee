import React from 'react';
import Header from '../../Header';
import Menu from '../../Menu';

function RemoteInquiry() {
  return <>
  <Header />
  <Menu />
  <div className="content-wrapper" style={{ marginTop: "10px" }}>
    <section class="content">
      <div className="container-fluid">
        <div className="row">
          {/* left column */}
          <div className="col-md-12">
            {/* general form elements */}
            <div className="card card-primary">
              <div className="card-header">
                <h3  style={{color: "#01497c" , fontWeight:'bold'}} className="card-title">Enquiry</h3>
              </div>
              {/* /.card-header */}
              {/* form start */}
              <form>
                <div className="card-body">
                  <div class="row" style={{ marginBottom: "10px" }}>
                    <div class="row col-md-6">
                      {/* <div className="form-group"> */}
                      <label class="label col-md-3" style={{ marginTop: "10px" }}>
                        Customer First Name
                      </label>
                      <div class="col-md-9">
                        <input
                          type="part_name"
                          className="form-control"
                          placeholder="Enter first name"
                        />
                      </div>
                    </div>

                    <div class="row col-md-6">
                      {/* <div className="form-group"> */}
                      <label class="label col-md-3" style={{ marginTop: "10px" }}>Customer Last Name</label>
                      <div class="col-md-9">
                        <input
                          type="part_name"
                          className="form-control"
                          placeholder="Enter last name"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row" style={{ marginBottom: "10px" }}>
                    <div class="row col-md-6">
                      {/* <div className="form-group"> */}
                      <label class="label col-md-3" style={{ marginTop: "15px" }}>Customer Email</label>
                      <div class="col-md-9">
                        <input
                          type="part_name"
                          className="form-control"
                          placeholder="Enter email"
                          style={{ marginTop: "10px" }}/>
                      </div>
                    </div>
                    <div class="row col-md-6">
                      {/* <div className="form-group"> */}
                      <label class="label col-md-3" style={{ marginTop: "15px" }}>Customer Address</label>
                      <div class="col-md-9">
                        <input style={{ marginTop: "10px" }}
                          type="part_name"
                          className="form-control"
                          placeholder="Enter address"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row" style={{ marginBottom: "10px" }}>
                    <div class="row col-md-6">
                      <label class="label col-md-3" style={{ marginTop: "18px" }}>Customer Address</label>
                      <div class="col-md-9" style={{ marginTop: "10px" }}>
                        <div class="input-group">
                          <div class="input-group-prepend">
                            <span
                              class="input-group-text"
                              id="inputGroupFileAddon01"
                            >
                              Upload
                            </span>
                          </div>
                          <div class="custom-file">
                            <input
                              type="file"
                              class="custom-file-input"
                              id="inputGroupFile01"
                              aria-describedby="inputGroupFileAddon01"
                            />
                            <label
                              class="custom-file-label"
                              for="inputGroupFile01">Choose file</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row col-md-6">
                      {/* <div className="form-group"> */}
                      <label class="label col-md-3" style={{ marginTop: "15px" }} >Select the process</label>
                      <div class="col-md-9">
                        <select class="form-control" style={{ marginTop: "10px" }}>
                        <option value="0">Select</option>
                          <option value="1">Laser cutting</option>
                          <option value="2">Bending</option>
                          <option value="3">Powder coating</option>
                          <option value="3">Machining</option>
                          <option value="3">Machining</option>
                          <option value="4">Grinding</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div class="row" style={{ marginBottom: "10px" }}>
                    <div class="row col-md-12">
                      {/* <div className="form-group"> */}
                      <div class="row col-md-6">
                      {/* <div className="form-group"> */}
                      <label class="label col-md-3" style={{ marginTop: "15px" }} >Material Status</label>
                      <div class="col-md-9">
                        <select class="form-control" style={{ marginTop: "10px" }}>
                        <option value="0">Select</option>
                          <option value="1">Given</option>
                          <option value="2">Not Given</option>
                        </select>
                      </div>
                      
                    </div>
                        
                     </div> 
                  </div>
                </div>
                {/* /.card-body */}
                <div className="card-footer">
                  <button type="submit" style={{ color: "#01497c", fontWeight: 'bold'}} className="btn btn-success">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>

  </>
;
}

export default RemoteInquiry;
