import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { Modal, Button } from "react-bootstrap";
import Header from '../../Header';
import Menu from '../../Menu';
import { api_url } from '../ApiUrl';

function SuperAdminWorkOrder() {
    //Modal Settings
    const [showModal, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const openModal = (row) => {
        console.log(row)
        setShowWorkOrder({
        id:row.id,
        work_order:row.work_order,
        purchase_order:row.purchase_order,
        customer_name:row.customer_name,
        designer_head:row.designer_head,
        designer_head_name:row.designer_head_name,
        designer_head_description_status:JSON.parse(row.designer_head_description_status.slice(1,-1)),
        designer_head_approval_by_crm_operator:row.designer_head_approval_by_crm_operator,
        designer_head_approval_by_auper_admin:row.designer_head_approval_by_auper_admin,
        designer_head_file:row.designer_head_file,
        designer:row.designer,
        designer_name:row.designer_name,
        designer_description_status:JSON.parse(row.designer_description_status.slice(1,-1)),
        designer_approval_by_designer_head:row.designer_approval_by_designer_head,
        designer_file:row.designer_file,
        programmer:row.programmer,
        programmer_name:row.programmer_name,
        programmer_description_status:JSON.parse(row.programmer_description_status.slice(1,-1)),
        programmer_approval_by_designer:row.programmer_approval_by_designer,
        programmer_approval_by_designer_head:row.programmer_approval_by_designer_head,
        programmer_file:row.programmer_file,
        machine_operator:row.machine_operator,
        machine_operator_name:row.machine_operator_name,
        machine_operator_description_status:JSON.parse(row.machine_operator_description_status.slice(1,-1)),
        machine_operator_approval_by_designer:row.machine_operator_approval_by_designer,
        machine_operator_file:row.machine_operator_file,
        machine_operator_parameter:row.machine_operator_parameter,
        transporter:row.transporter,
        transporter_name:row.transporter_name,
        transporter_description_status:JSON.parse(row.transporter_description_status.slice(1,-1)),
        transporter_approval_by_crm_operator:row.transporter_approval_by_crm_operator,
        transporter_file:row.transporter_file
        })
        handleShow();
    }
    const [workOrder,setWorkOrder] = useState({
        id:"",
        work_order:"",
        purchase_order:"",
        customer_name:"",
        designer_head:"",
        designer_head_description_status:"",
        designer_head_approval_by_crm_operator:"",
        designer_head_approval_by_auper_admin:"",
        designer_head_file:"",
        designer:"",
        designer_description_status:"",
        designer_approval_by_designer_head:"",
        designer_file:"",
        programmer:"",
        programmer_description_status:"",
        programmer_approval_by_designer:"",
        programmer_approval_by_designer_head:"",
        programmer_file:"",
        machine_operator:"",
        machine_operator_description_status:"",
        machine_operator_approval_by_designer:"",
        machine_operator_file:"",
        machine_operator_parameter:"",
        transporter:"",
        transporter_description_status:"",
        transporter_approval_by_crm_operator:"",
        transporter_file:""
    });
    const [showWorkOrder,setShowWorkOrder] = useState({
        id:"",
        work_order:"",
        purchase_order:"",
        customer_name:"",
        designer_head:"",
        designer_head_name:"",
        designer_head_description_status:[],
        designer_head_approval_by_crm_operator:"",
        designer_head_approval_by_auper_admin:"",
        designer_head_file:"",
        designer:"",
        designer_name:"",
        designer_description_status:[],
        designer_approval_by_designer_head:"",
        designer_file:"",
        programmer:"",
        programmer_name:"",
        programmer_description_status:[],
        programmer_approval_by_designer:"",
        programmer_approval_by_designer_head:"",
        programmer_file:"",
        machine_operator:"",
        machine_operator_name:"",
        machine_operator_description_status:[],
        machine_operator_approval_by_designer:"",
        machine_operator_file:"",
        machine_operator_parameter:"",
        transporter:"",
        transporter_name:"",
        transporter_description_status:[],
        transporter_approval_by_crm_operator:"",
        transporter_file:""
    });
    useEffect(() => {
        axios.get(api_url+"read_work_order_by_super_admin.php")
        .then((res)=>{
            setWorkOrder(res.data)
        })
    }, [])
    
    return (
        <>
        <Header />
        <Menu />
        <div className='content-wrapper'>
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
                                    <span className="bg-red">{showWorkOrder.work_order}</span>
                                </div>
                                {/* /.timeline-label */}
                                {/* timeline item */}
                                {/* <div>
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
                                </div> */}
                                {/* END timeline item */}
                                {/* timeline item */}
                                <div>
                                    <i className="fas fa-user bg-blue" />
                                    <div className="timeline-item">
                                        {/* <span className="time"><i className="fas fa-clock" /> 5 mins ago</span> */}
                                        <h3 className="timeline-header no-border">Transportation-<a href="#">{showWorkOrder.transporter_name}</a></h3>
                                        <div className="timeline-body">
                                            <h4>Task Status</h4>{showWorkOrder.transporter_description_status.map((transporter_task)=>(
                                                <>
                                                    <p>Desicription-{transporter_task.description4}</p>
                                                    <p>Status-{transporter_task.status4}</p>
                                                </>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <i className="fas fa-user bg-green" />
                                    <div className="timeline-item">
                                        {/* <span className="time"><i className="fas fa-clock" /> 5 mins ago</span> */}
                                        <h3 className="timeline-header no-border">Machine Operation-<a href="#">{showWorkOrder.machine_operator_name}</a></h3>
                                        <div className="timeline-body">
                                            <h4>Task Status</h4>{showWorkOrder.machine_operator_description_status.map((machine_operator_task)=>(
                                                <>
                                                    <p>Desicription-{machine_operator_task.description3}</p>
                                                    <p>Status-{machine_operator_task.status3}</p>
                                                </>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                {/* END timeline item */}
                                {/* timeline item */}
                                <div>
                                    <i className="fas fa-user bg-yellow" />
                                    <div className="timeline-item">
                                        {/* <span className="time"><i className="fas fa-clock" /> 27 mins ago</span> */}
                                        <h3 className="timeline-header">Programming of the job-<a href="#">{showWorkOrder.programmer_name}</a></h3>
                                        <div className="timeline-body">
                                            <h4>Task Status</h4>{showWorkOrder.programmer_description_status.map((programmer_task,index)=>(
                                                programmer_task.status2==="completed"?<>
                                                <p>{index+1})<del>{programmer_task.description2}</del></p>
                                            </>:
                                            <>
                                            <p>{programmer_task.description2}</p>
                                        </>      
                                            )
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {/* END timeline item */}
                                {/* timeline time label */}
                                {/* <div className="time-label">
                                    <span className="bg-green">3 Jan. 2014</span>
                                </div> */}
                                {/* /.timeline-label */}
                                {/* timeline item */}
                                <div>
                                    <i className="fas fa-user bg-purple" />
                                    <div className="timeline-item">
                                        {/* <span className="time"><i className="fas fa-clock" /> 2 days ago</span> */}
                                        <h3 className="timeline-header"> Designing of job-<a href="#">{showWorkOrder.designer_name}</a></h3>
                                        <div className="timeline-body">
                                            <h4>Task Status</h4>{showWorkOrder.designer_description_status.map((designer_task,index)=>(
                                                <>
                                                    <p><b>{index+1})</b>Desicription-{designer_task.description1}</p>
                                                    <p>&nbsp;&nbsp;&nbsp;Status-{designer_task.status1}</p>
                                                </>
                                            ))}
                                        </div>
                                        
                                    </div>
                                </div>
                                {/* END timeline item */}
                                {/* timeline item */}
                                <div>
                                    <i className="fas fa-user bg-maroon" />
                                    <div className="timeline-item">
                                        {/* <span className="time"><i className="fas fa-clock" /> 5 days ago</span> */}
                                        <h3 className="timeline-header"><a href="#">{showWorkOrder.customer_name}-</a>Quotation generated and PO Accepted</h3>


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
            <section class="content">
                <div className="container-fluid">
                    <div className="row">
                        {workOrder.data===undefined?[]:workOrder.data.map((wo)=>(
                            <div className="col-md-4">
                            <div class="card-body">
                                <div id="accordion">
                                    <div class="card card-primary">
                                        <div class="card-header">
                                            <h4 class="card-title w-100">
                                                <a class="d-block w-100" data-toggle="collapse" href="#collapseOne">
                                                   {wo.work_order}
                                                </a>
                                            </h4>
                                        </div>
                                        <div id="collapseOne" class="collapse show" data-parent="#accordion">
                                            <div class="card-body">
                                                <p><b>Work Order</b>-{wo.work_order}</p>
                                                <p><b>Customer Name</b>-{wo.customer_name}</p>
                                                {/* <p><b>Status</b>-<small onClick={()=>{openModal(wo)}} class="badge badge-info"><i class="fas fa-clock"></i>In Process</small></p> */}
                                                <button className='btn btn-info' onClick={()=>{openModal(wo)}}>Check Status</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>

        </>
        )
}

export default SuperAdminWorkOrder
