import React, { useState } from 'react'
import { Modal, Button } from "react-bootstrap";
import Header from '../../Header';
import Menu from '../../Menu';

function SuperAdminDashboard() {
  const [showModal, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const openModal = () => {
        handleShow();
    }
    return (
<div>
  <Header />
  <Menu />
  <div className="content-wrapper">
    {/* Content Header (Page header) */}
    <Modal show={showModal} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Work Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Timelime example  */}
                    <div className="row">
                        <div className="col-md-12">
                            {/* The time line */}
                            <div className="timeline">
                                {/* timeline time label */}
                                <div className="time-label">
                                    <span className="bg-red">10 Feb. 2022</span>
                                </div>
                                {/* /.timeline-label */}
                                {/* timeline item */}
                                <div>
                                    <i className="fas fa-envelope bg-blue" />
                                    <div className="timeline-item">
                                        <span className="time"><i className="fas fa-clock" /> 12:05</span>
                                        <h3 className="timeline-header"><a href="#">Work Order Completed</a>4 days</h3>
                                        <div className="timeline-body">
                                            Etsy doostang zoodles disqus groupon greplin oooj voxy zoodles,
                                            weebly ning heekya handango imeem plugg dopplr jibjab, movity
                                            jajah plickers sifteo edmodo ifttt zimbra. Babblely odeo kaboodle
                                            quora plaxo ideeli hulu weebly balihoo...
                                        </div>
                                    </div>
                                </div>
                                {/* END timeline item */}
                                {/* timeline item */}
                                <div>
                                    <i className="fas fa-user bg-green" />
                                    <div className="timeline-item">
                                        <span className="time"><i className="fas fa-clock" /> 5 mins ago</span>
                                        <h3 className="timeline-header no-border"><a href="#">Ramesh Shinde</a>Machine Operation</h3>
                                    </div>
                                </div>
                                {/* END timeline item */}
                                {/* timeline item */}
                                <div>
                                    <i className="fas fa-comments bg-yellow" />
                                    <div className="timeline-item">
                                        <span className="time"><i className="fas fa-clock" /> 27 mins ago</span>
                                        <h3 className="timeline-header"><a href="#">Ganesh Shinde</a>Programming of the job</h3>
                                        <div className="timeline-body">
                                            Take me to your leader!
                                            Switzerland is small and neutral!
                                            We are more like Germany, ambitious and misunderstood!
                                        </div>
                                    </div>
                                </div>
                                {/* END timeline item */}
                                {/* timeline time label */}
                                <div className="time-label">
                                    <span className="bg-green">3 Jan. 2014</span>
                                </div>
                                {/* /.timeline-label */}
                                {/* timeline item */}
                                <div>
                                    <i className="fa fa-camera bg-purple" />
                                    <div className="timeline-item">
                                        <span className="time"><i className="fas fa-clock" /> 2 days ago</span>
                                        <h3 className="timeline-header"><a href="#">Yash Shinde</a> Designing job for laser cutting</h3>
                                    </div>
                                </div>
                                {/* END timeline item */}
                                {/* timeline item */}
                                <div>
                                    <i className="fas fa-video bg-maroon" />
                                    <div className="timeline-item">
                                        <span className="time"><i className="fas fa-clock" /> 5 days ago</span>
                                        <h3 className="timeline-header"><a href="#">Ramesh Patil</a>Quotation generated and PO Accepted</h3>


                                    </div>
                                </div>
                                {/* END timeline item */}
                                <div>
                                    <i className="fas fa-clock bg-gray" />
                                </div>
                            </div>
                        </div>
                        {/* /.col */}
                    </div>
                    {/* /.timeline */}


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
    <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1 className="m-0">Dashboard</h1>
          </div>{/* /.col */}
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item"><a href="#">Home</a></li>
              <li className="breadcrumb-item active">Dashboard v1</li>
            </ol>
          </div>{/* /.col */}
        </div>{/* /.row */}
      </div>{/* /.container-fluid */}
    </div>
    {/* /.content-header */}
    {/* Main content */}
    <section className="content">
      <div className="container-fluid">
        {/* Small boxes (Stat box) */}
        <div className="row">
          <div className="col-lg-3 col-6">
            {/* small box */}
            <div className="small-box bg-info">
              <div className="inner">
                <h3>150</h3>
                <p>No of Enquiries</p>
              </div>
              <div className="icon">
                <i className="ion ion-bag" />
              </div>
              <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
            </div>
          </div>
          {/* ./col */}
          <div className="col-lg-3 col-6">
            {/* small box */}
            <div className="small-box bg-success">
              <div className="inner">
                <h3>53</h3>
                <p>Deals Completed</p>
              </div>
              <div className="icon">
                <i className="ion ion-stats-bars" />
              </div>
              <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
            </div>
          </div>
          {/* ./col */}
          <div className="col-lg-3 col-6">
            {/* small box */}
            <div className="small-box bg-warning">
              <div className="inner">
                <h3>44</h3>
                <p>Deals In Process</p>
              </div>
              <div className="icon">
                <i className="ion ion-person-add" />
              </div>
              <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
            </div>
          </div>
          {/* ./col */}
          <div className="col-lg-3 col-6">
            {/* small box */}
            <div className="small-box bg-danger">
              <div className="inner">
                <h3>65</h3>
                <p>Deals Lost</p>
              </div>
              <div className="icon">
                <i className="ion ion-pie-graph" />
              </div>
              <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
            </div>
          </div>
          {/* ./col */}
        </div>
        {/* /.row */}
        {/* Main row */}
        
        {/* /.row (main row) */}
      </div>{/* /.container-fluid */}
    </section>
    <section class="content">
                <div className="container-fluid">
                    <div className="row">
                        {/* left column */}
                        <div className="col-md-4">
                            <div class="card-body">
                                <div id="accordion">
                                    <div class="card card-primary">
                                        <div class="card-header">
                                            <h4 class="card-title w-100">
                                                <a class="d-block w-100" data-toggle="collapse" href="#collapseOne">
                                                    WO-1
                                                </a>
                                            </h4>
                                        </div>
                                        <div id="collapseOne" class="collapse show" data-parent="#accordion">
                                            <div class="card-body">
                                                <p><b>Work Order</b>-WO-1</p>
                                                <p><b>Customer Name</b>-Yash Shinde</p>
                                                <p><b>Employee Name</b>-Ramesh Patil</p>
                                                <p><b>Process</b>-Designing</p>
                                                <p><b>Status</b>-<small onClick={openModal} class="badge badge-info"><i class="fas fa-clock"></i>In Process</small></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <div className="col-md-4">
                            <div class="card-body">
                                <div id="accordion">
                                    <div class="card card-success">
                                        <div class="card-header">
                                            <h4 class="card-title w-100">
                                                <a class="d-block w-100" data-toggle="collapse" href="#collapseOne">
                                                    WO-2
                                                </a>
                                            </h4>
                                        </div>
                                        <div id="collapseOne" class="collapse show" data-parent="#accordion">
                                            <div class="card-body">
                                                <p><b>Work Order</b>-WO-2</p>
                                                <p><b>Customer Name</b>-Ganesh Shinde</p>
                                                <p><b>Employee Name</b>-Ramesh Patil</p>
                                                <p><b>Process</b>-Completed</p>
                                                <p><b>Status</b>-<small onClick={openModal} class="badge badge-success"><i class="fas fa-clock"></i>Completed</small></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </section>

    {/* /.content */}
  </div>
</div>

    )
}

export default SuperAdminDashboard
