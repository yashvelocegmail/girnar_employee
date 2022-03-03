import React, { useState } from 'react'
import { Link } from "react-router-dom";
function Menu() {
    //States for CRM Operator
    const [crmdrop1, setcrmDrop1] = useState(false);
    const [crmdrop2, setcrmDrop2] = useState(false);
    const [crmdrop3, setcrmDrop3] = useState(false);
    const [crmdrop4, setcrmDrop4] = useState(false);
    const [crmdrop5, setcrmDrop5] = useState(false);
    const [crmdrop6, setcrmDrop6] = useState(false);
    const [crmdrop7, setcrmDrop7] = useState(false);
    const [crmdrop8, setcrmDrop8] = useState(false);
    const [crmdrop9, setcrmDrop9] = useState(false);
    const [crmdrop10, setcrmDrop10] = useState(false);

    const [hrdrop1, sethrDrop1] = useState(false);

    const [designerdrop1, setdesignerDrop1] = useState(false);
    const [designerdrop2, setdesignerDrop2] = useState(false);

    const [programmerdrop1, setprogrammerDrop1] = useState(false);
    const [programmerdrop2, setprogrammerDrop2] = useState(false);

    const [machineoperatordrop1, setmachineoperatorDrop1] = useState(false);
    const [machineoperatordrop2, setmachineoperatorDrop2] = useState(false);

    const [transporterdrop1, settransporterDrop1] = useState(false);
    const [transporterdrop2, settransporterDrop2] = useState(false);

    const [stockmanagerdrop1, setstockmanagerDrop1] = useState(false);
    const [stockmanagerdrop2, setstockmanagerDrop2] = useState(false);

    const [superadmindrop1, setsuperadminDrop1] = useState(false);
    const [superadmindrop2, setsuperadminDrop2] = useState(false);

    if (localStorage.getItem("user_type") === "crm") {
        return (
            <div>
                <aside className="main-sidebar sidebar-dark-primary elevation-4">
                    {/* Brand Logo */}
                    <a href="index3.html" className="brand-link">
                        <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
                        <span className="brand-text font-weight-light">Girnar</span>
                    </a>
                    {/* Sidebar */}
                    <div className="sidebar">
                        {/* Sidebar user panel (optional) */}
                        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                            <div className="image">
                                <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
                            </div>
                            <div className="info">
                                <a href="#" className="d-block">CRM Operator</a>
                            </div>
                        </div>
                        {/* SidebarSearch Form */}
                        <div className="form-inline">
                            <div className="input-group" data-widget="sidebar-search">
                                <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                                <div className="input-group-append">
                                    <button className="btn btn-sidebar">
                                        <i className="fas fa-search fa-fw" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Sidebar Menu */}
                        <nav className='mt-2'>
                            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                                {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
                                <li class="nav-item menu-open">
                                    <ul class="nav nav-treeview">
                                        <li class="nav-item">
                                            <Link to="" className="nav-link">
                                                <i class="far fa-circle nav-icon"></i>
                                                <p>Dashboard</p>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li class="nav-header">General Master</li>
                                <li class="nav-item">
                                    <p className='navlinkcustom' id="dropdown1" onClick={() => { setcrmDrop1(!crmdrop1) }}>
                                        <i class="nav-icon far fa-envelope"></i>
                                        <p className='navitemcustom'>
                                            Masters
                                            {/* <i class="fas fa-angle-left right"></i> */}
                                        </p>
                                    </p>
                                    {crmdrop1 === true ? <ul class="nav nav-treeview" style={{
                                        display: 'block', listStyle: 'none',
                                        padding: '0'
                                    }}>
                                        <li class="nav-item">
                                            <Link to="material_type_master" className="nav-link">
                                                <i class="far fa-circle nav-icon"></i>
                                                <p>Material Type Master</p>
                                            </Link>
                                            <Link to="height_master" className="nav-link">
                                                <i class="far fa-circle nav-icon"></i>
                                                <p>Height Master</p>
                                            </Link>
                                            <Link to="material_grade_master" className="nav-link">
                                                <i class="far fa-circle nav-icon"></i>
                                                <p>Material Grade Master</p>
                                            </Link>
                                        </li>
                                    </ul> : null}
                                </li>
                                <li class="nav-header">Operations</li>
                                <li class="nav-item">
                                    <p className='navlinkcustom' onClick={() => { setcrmDrop2(!crmdrop2) }}>
                                        <i class="nav-icon far fa-envelope"></i>
                                        <p className='navitemcustom'>
                                            Deals
                                            {/* <i class="fas fa-angle-left right"></i> */}
                                        </p>
                                    </p>
                                    {crmdrop2 === true ? <ul class="nav nav-treeview" style={{
                                        display: 'block', listStyle: 'none',
                                        padding: '0'
                                    }}>
                                        <li class="nav-item">
                                            <Link to="quotation_master" className="nav-link">
                                                <i class="far fa-circle nav-icon"></i>
                                                <p>Quotation Master</p>
                                            </Link>
                                            <Link to="remote_inquiry" className="nav-link">
                                                <i class="far fa-circle nav-icon"></i>
                                                <p>Remote Enquiry</p>
                                            </Link>
                                            <Link to="po_master" className="nav-link">
                                                <i class="far fa-circle nav-icon"></i>
                                                <p>PO Master</p>
                                            </Link>
                                            <Link to="payment" className="nav-link">
                                                <i class="far fa-circle nav-icon"></i>
                                                <p>Payment</p>
                                            </Link>
                                        </li>
                                    </ul> : null}
                                </li>
                                <li class="nav-item">
                                    <p className='navlinkcustom' onClick={() => { setcrmDrop3(!crmdrop3) }}>
                                        <i class="nav-icon far fa-envelope"></i>
                                        <p className='navitemcustom'>
                                            Contacts
                                            {/* <i class="fas fa-angle-left right"></i> */}
                                        </p>
                                    </p>
                                    {crmdrop3 === true ? <ul class="nav nav-treeview" style={{
                                        display: 'block', listStyle: 'none',
                                        padding: '0'
                                    }}>
                                        <li class="nav-item">
                                            <Link to="individual_contact" className="nav-link">
                                                <i class="far fa-circle nav-icon"></i>
                                                <p>Individual Contact</p>
                                            </Link>
                                            <Link to="company_contact" className="nav-link">
                                                <i class="far fa-circle nav-icon"></i>
                                                <p>Company Contact</p>
                                            </Link>
                                        </li>
                                    </ul> : null}
                                </li>
                                <li class="nav-item">
                                    <p className='navlinkcustom' onClick={() => { setcrmDrop4(!crmdrop4) }}>
                                        <i class="nav-icon far fa-envelope"></i>
                                        <p className='navitemcustom'>
                                            Products
                                            {/* <i class="fas fa-angle-left right"></i> */}
                                        </p>
                                    </p>
                                    {crmdrop4 === true ? <ul class="nav nav-treeview" style={{
                                        display: 'block', listStyle: 'none',
                                        padding: '0'
                                    }}>
                                        <li class="nav-item">
                                            <Link to="products" className="nav-link">
                                                <i class="far fa-circle nav-icon"></i>
                                                <p>Products</p>
                                            </Link>
                                        </li>
                                    </ul> : null}
                                </li>
                                <li class="nav-item">
                                    <p className='navlinkcustom' onClick={() => { setcrmDrop5(!crmdrop5) }}>
                                        <i class="nav-icon far fa-envelope"></i>
                                        <p className='navitemcustom'>
                                            Leads
                                            {/* <i class="fas fa-angle-left right"></i> */}
                                        </p>
                                    </p>
                                    {crmdrop5 === true ? <ul class="nav nav-treeview" style={{
                                        display: 'block', listStyle: 'none',
                                        padding: '0'
                                    }}>
                                        <li class="nav-item">
                                            <Link to="leads" className="nav-link">
                                                <i class="far fa-circle nav-icon"></i>
                                                <p>Leads</p>
                                            </Link>
                                        </li>
                                    </ul> : null}
                                </li>
                                <li class="nav-item">
                                    <p className='navlinkcustom' onClick={() => { setcrmDrop6(!crmdrop6) }}>
                                        <i class="nav-icon far fa-envelope"></i>
                                        <p className='navitemcustom'>
                                            Analytics
                                            {/* <i class="fas fa-angle-left right"></i> */}
                                        </p>
                                    </p>
                                    {crmdrop6 === true ? <ul class="nav nav-treeview" style={{
                                        display: 'block', listStyle: 'none',
                                        padding: '0'
                                    }}>
                                        <li class="nav-item">
                                            <Link to="analytics" className="nav-link">
                                                <i class="far fa-circle nav-icon"></i>
                                                <p>Analytics</p>
                                            </Link>
                                        </li>
                                    </ul> : null}
                                </li>
                                <li class="nav-item">
                                    <p className='navlinkcustom' onClick={() => { setcrmDrop7(!crmdrop7) }}>
                                        <i class="nav-icon far fa-envelope"></i>
                                        <p className='navitemcustom'>
                                            Customer Feedback
                                            {/* <i class="fas fa-angle-left right"></i> */}
                                        </p>
                                    </p>
                                    {crmdrop7 === true ? <ul class="nav nav-treeview" style={{
                                        display: 'block', listStyle: 'none',
                                        padding: '0'
                                    }}>
                                        <li class="nav-item">
                                            <Link to="customer_feedback" className="nav-link">
                                                <i class="far fa-circle nav-icon"></i>
                                                <p>Customer Feedback</p>
                                            </Link>
                                        </li>
                                    </ul> : null}
                                </li>
                                <li class="nav-header">Task Master</li>
                                <li class="nav-item">
                                    <p className='navlinkcustom' onClick={() => { setcrmDrop8(!crmdrop8) }}>
                                        <i class="nav-icon far fa-envelope"></i>
                                        <p className='navitemcustom'>
                                            Task Allocation
                                            {/* <i class="fas fa-angle-left right"></i> */}
                                        </p>
                                    </p>
                                    {crmdrop8 === true ? <ul class="nav nav-treeview" style={{
                                        display: 'block', listStyle: 'none',
                                        padding: '0'
                                    }}>
                                        <li class="nav-item">
                                            <Link to="task_allocation" className="nav-link">
                                                <i class="far fa-circle nav-icon"></i>
                                                <p>Task Allocation</p>
                                            </Link>
                                        </li>
                                    </ul> : null}
                                </li>
                                <li class="nav-header">Stock</li>
                                <li class="nav-item">
                                    <p className='navlinkcustom' onClick={() => { setcrmDrop9(!crmdrop9) }}>
                                        <i class="nav-icon far fa-envelope"></i>
                                        <p className='navitemcustom'>
                                            Stock
                                            {/* <i class="fas fa-angle-left right"></i> */}
                                        </p>
                                    </p>
                                    {crmdrop9 === true ? <ul class="nav nav-treeview" style={{
                                        display: 'block', listStyle: 'none',
                                        padding: '0'
                                    }}>
                                        <li class="nav-item">
                                            <Link to="stock_request" className="nav-link">
                                                <i class="far fa-circle nav-icon"></i>
                                                <p>Stock Request</p>
                                            </Link>
                                            <Link to="available_stock" className="nav-link">
                                                <i class="far fa-circle nav-icon"></i>
                                                <p>Stock Available</p>
                                            </Link>
                                        </li>
                                    </ul> : null}
                                </li>
                                <li class="nav-header">Third Party</li>
                                <li class="nav-item">
                                    <p className='navlinkcustom' onClick={() => { setcrmDrop10(!crmdrop10) }}>
                                        <i class="nav-icon far fa-envelope"></i>
                                        <p className='navitemcustom'>
                                            Third Party
                                            {/* <i class="fas fa-angle-left right"></i> */}
                                        </p>
                                    </p>
                                    {crmdrop10 === true ? <ul class="nav nav-treeview" style={{
                                        display: 'block', listStyle: 'none',
                                        padding: '0'
                                    }}>
                                        <li class="nav-item">
                                            <Link to="third_party_contacts" className="nav-link">
                                                <i class="far fa-circle nav-icon"></i>
                                                <p>Third Party</p>
                                            </Link>
                                            <Link to="third_party_task_allocation" className="nav-link">
                                                <i class="far fa-circle nav-icon"></i>
                                                <p>Third Task Allocation</p>
                                            </Link>
                                        </li>
                                    </ul> : null}
                                </li>
                            </ul>
                        </nav>
                        {/* /.sidebar-menu */}
                    </div>
                    {/* /.sidebar */}
                </aside>
            </div>

        )
    }
    else if (localStorage.getItem("user_type") === "hr") {
        return (
            <div>
                <aside className="main-sidebar sidebar-dark-primary elevation-4">
                    {/* Brand Logo */}
                    <a href="index3.html" className="brand-link">
                        <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
                        <span className="brand-text font-weight-light">Girnar</span>
                    </a>
                    {/* Sidebar */}
                    <div className="sidebar">
                        {/* Sidebar user panel (optional) */}
                        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                            <div className="image">
                                <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
                            </div>
                            <div className="info">
                                <a href="#" className="d-block">HR Admin</a>
                            </div>
                        </div>
                        {/* SidebarSearch Form */}
                        <div className="form-inline">
                            <div className="input-group" data-widget="sidebar-search">
                                <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                                <div className="input-group-append">
                                    <button className="btn btn-sidebar">
                                        <i className="fas fa-search fa-fw" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Sidebar Menu */}
                        <nav className='mt-2'>
                            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                                {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
                                <li class="nav-item menu-open">
                                    <ul class="nav nav-treeview">
                                        <li class="nav-item">
                                            <Link to="" className="nav-link">
                                                <i class="far fa-circle nav-icon"></i>
                                                <p>Dashboard</p>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li class="nav-header">HRMS</li>
                                <li class="nav-item">
                                    <p className='navlinkcustom' id="dropdown1" onClick={() => { sethrDrop1(!hrdrop1) }}>
                                        <i class="nav-icon far fa-envelope"></i>
                                        <p className='navitemcustom'>
                                            HRMS
                                            {/* <i class="fas fa-angle-left right"></i> */}
                                        </p>
                                    </p>
                                    {hrdrop1 === true ? <ul class="nav nav-treeview" style={{
                                        display: 'block', listStyle: 'none',
                                        padding: '0'
                                    }}>
                                        <li class="nav-item">
                                            <Link to="hrms_attendance" className="nav-link">
                                                <i class="far fa-circle nav-icon"></i>
                                                <p>Attendance</p>
                                            </Link>
                                            <Link to="hrms_leave_tracker" className="nav-link">
                                                <i class="far fa-circle nav-icon"></i>
                                                <p>Leave Tracker</p>
                                            </Link>
                                            <Link to="hrms_attendance_report" className="nav-link">
                                                <i class="far fa-circle nav-icon"></i>
                                                <p>Attendance And Leave Report</p>
                                            </Link>
                                            <Link to="hrms_employee_master" className="nav-link">
                                                <i class="far fa-circle nav-icon"></i>
                                                <p>Employee Master</p>
                                            </Link>
                                            <Link to="hrms_vacancies" className="nav-link">
                                                <i class="far fa-circle nav-icon"></i>
                                                <p>Vacancies</p>
                                            </Link>
                                        </li>
                                    </ul> : null}
                                </li>
                            </ul>
                        </nav>
                        {/* /.sidebar-menu */}
                    </div>
                    {/* /.sidebar */}
                </aside>
            </div>

        )
    }
    else if (localStorage.getItem("user_type") === "designer") {
        return (
            <div>
                <aside className="main-sidebar sidebar-dark-primary elevation-4">
                    {/* Brand Logo */}
                    <a href="index3.html" className="brand-link">
                        <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
                        <span className="brand-text font-weight-light">Girnar</span>
                    </a>
                    {/* Sidebar */}
                    <div className="sidebar">
                        {/* Sidebar user panel (optional) */}
                        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                            <div className="image">
                                <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
                            </div>
                            <div className="info">
                                <a href="#" className="d-block">Designer</a>
                            </div>
                        </div>
                        {/* SidebarSearch Form */}
                        <div className="form-inline">
                            <div className="input-group" data-widget="sidebar-search">
                                <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                                <div className="input-group-append">
                                    <button className="btn btn-sidebar">
                                        <i className="fas fa-search fa-fw" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Sidebar Menu */}
                        <nav className='mt-2'>
                            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                                {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
                                <li class="nav-item menu-open">
                                    <ul class="nav nav-treeview">
                                        <li class="nav-item">
                                            <Link to="" className="nav-link">
                                                <i class="far fa-circle nav-icon"></i>
                                                <p>Dashboard</p>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li class="nav-header">Production</li>
                                <li class="nav-item">
                                    <p className='navlinkcustom' onClick={() => { setdesignerDrop1(!designerdrop1) }}>
                                        <i class="nav-icon far fa-envelope"></i>
                                        <p className='navitemcustom'>
                                            Production
                                            {/* <i class="fas fa-angle-left right"></i> */}
                                        </p>
                                    </p>
                                    {designerdrop1 === true ? <ul class="nav nav-treeview" style={{
                                        display: 'block', listStyle: 'none',
                                        padding: '0'
                                    }}>
                                        <li class="nav-item">
                                            <Link to="designer_production" className="nav-link">
                                                <i class="far fa-circle nav-icon"></i>
                                                <p>Production</p>
                                            </Link>
                                        </li>
                                    </ul> : null}
                                </li>
                                <li class="nav-header">HRMS</li>
                                <li class="nav-item">
                                    <p className='navlinkcustom' id="dropdown1" onClick={() => { setdesignerDrop2(!designerdrop2) }}>
                                        <i class="nav-icon far fa-envelope"></i>
                                        <p className='navitemcustom'>
                                            HRMS
                                            {/* <i class="fas fa-angle-left right"></i> */}
                                        </p>
                                    </p>
                                    {designerdrop2 === true ? <ul class="nav nav-treeview" style={{
                                        display: 'block', listStyle: 'none',
                                        padding: '0'
                                    }}>
                                        <li class="nav-item">
                                            <Link to="designer_attendance" className="nav-link">
                                                <i class="far fa-circle nav-icon"></i>
                                                <p>Attendance</p>
                                            </Link>
                                            <Link to="designer_leave_tracker" className="nav-link">
                                                <i class="far fa-circle nav-icon"></i>
                                                <p>Leave Tracker</p>
                                            </Link>
                                        </li>
                                    </ul> : null}
                                </li>
                            </ul>
                        </nav>
                        {/* /.sidebar-menu */}
                    </div>
                    {/* /.sidebar */}
                </aside>
            </div>

        )
    }
    else if (localStorage.getItem("user_type") === "programmer") {
        return (
            <div>
                <aside className="main-sidebar sidebar-dark-primary elevation-4">
                    {/* Brand Logo */}
                    <a href="index3.html" className="brand-link">
                        <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
                        <span className="brand-text font-weight-light">Girnar</span>
                    </a>
                    {/* Sidebar */}
                    <div className="sidebar">
                        {/* Sidebar user panel (optional) */}
                        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                            <div className="image">
                                <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
                            </div>
                            <div className="info">
                                <a href="#" className="d-block">Programmer</a>
                            </div>
                        </div>
                        {/* SidebarSearch Form */}
                        <div className="form-inline">
                            <div className="input-group" data-widget="sidebar-search">
                                <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                                <div className="input-group-append">
                                    <button className="btn btn-sidebar">
                                        <i className="fas fa-search fa-fw" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Sidebar Menu */}
                        <nav className='mt-2'>
                            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                                {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
                                <li class="nav-item menu-open">
                                    <ul class="nav nav-treeview">
                                        <li class="nav-item">
                                            <Link to="" className="nav-link">
                                                <i class="far fa-circle nav-icon"></i>
                                                <p>Dashboard</p>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li class="nav-header">Production</li>
                                <li class="nav-item">
                                    <p className='navlinkcustom' onClick={() => { setprogrammerDrop1(!programmerdrop1) }}>
                                        <i class="nav-icon far fa-envelope"></i>
                                        <p className='navitemcustom'>
                                            Production
                                            {/* <i class="fas fa-angle-left right"></i> */}
                                        </p>
                                    </p>
                                    {programmerdrop1 === true ? <ul class="nav nav-treeview" style={{
                                        display: 'block', listStyle: 'none',
                                        padding: '0'
                                    }}>
                                        <li class="nav-item">
                                            <Link to="programmer_production" className="nav-link">
                                                <i class="far fa-circle nav-icon"></i>
                                                <p>Production</p>
                                            </Link>
                                        </li>
                                    </ul> : null}
                                </li>
                                <li class="nav-header">HRMS</li>
                                <li class="nav-item">
                                    <p className='navlinkcustom' id="dropdown1" onClick={() => { setprogrammerDrop2(!programmerdrop2) }}>
                                        <i class="nav-icon far fa-envelope"></i>
                                        <p className='navitemcustom'>
                                            HRMS
                                            {/* <i class="fas fa-angle-left right"></i> */}
                                        </p>
                                    </p>
                                    {programmerdrop2 === true ? <ul class="nav nav-treeview" style={{
                                        display: 'block', listStyle: 'none',
                                        padding: '0'
                                    }}>
                                        <li class="nav-item">
                                            <Link to="programmer_attendance" className="nav-link">
                                                <i class="far fa-circle nav-icon"></i>
                                                <p>Attendance</p>
                                            </Link>
                                            <Link to="programmer_leave_tracker" className="nav-link">
                                                <i class="far fa-circle nav-icon"></i>
                                                <p>Leave Tracker</p>
                                            </Link>
                                        </li>
                                    </ul> : null}
                                </li>
                            </ul>
                        </nav>
                        {/* /.sidebar-menu */}
                    </div>
                    {/* /.sidebar */}
                </aside>
            </div>

        )
    }
    else if (localStorage.getItem("user_type") === "machine_operator") {
        return (
            <div>
                <aside className="main-sidebar sidebar-dark-primary elevation-4">
                    {/* Brand Logo */}
                    <a href="index3.html" className="brand-link">
                        <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
                        <span className="brand-text font-weight-light">Girnar</span>
                    </a>
                    {/* Sidebar */}
                    <div className="sidebar">
                        {/* Sidebar user panel (optional) */}
                        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                            <div className="image">
                                <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
                            </div>
                            <div className="info">
                                <a href="#" className="d-block">Machine Operator</a>
                            </div>
                        </div>
                        {/* SidebarSearch Form */}
                        <div className="form-inline">
                            <div className="input-group" data-widget="sidebar-search">
                                <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                                <div className="input-group-append">
                                    <button className="btn btn-sidebar">
                                        <i className="fas fa-search fa-fw" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Sidebar Menu */}
                        <nav className='mt-2'>
                            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                                {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
                                <li class="nav-item menu-open">
                                    <ul class="nav nav-treeview">
                                        <li class="nav-item">
                                            <Link to="" className="nav-link">
                                                <i class="far fa-circle nav-icon"></i>
                                                <p>Dashboard</p>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li class="nav-header">Production</li>
                                <li class="nav-item">
                                    <p className='navlinkcustom' onClick={() => { setmachineoperatorDrop1(!machineoperatordrop1) }}>
                                        <i class="nav-icon far fa-envelope"></i>
                                        <p className='navitemcustom'>
                                            Production
                                            {/* <i class="fas fa-angle-left right"></i> */}
                                        </p>
                                    </p>
                                    {machineoperatordrop1 === true ? <ul class="nav nav-treeview" style={{
                                        display: 'block', listStyle: 'none',
                                        padding: '0'
                                    }}>
                                        <li class="nav-item">
                                            <Link to="programmer_production" className="nav-link">
                                                <i class="far fa-circle nav-icon"></i>
                                                <p>Production</p>
                                            </Link>
                                        </li>
                                    </ul> : null}
                                </li>
                                <li class="nav-header">HRMS</li>
                                <li class="nav-item">
                                    <p className='navlinkcustom' id="dropdown1" onClick={() => { setmachineoperatorDrop2(!machineoperatordrop2) }}>
                                        <i class="nav-icon far fa-envelope"></i>
                                        <p className='navitemcustom'>
                                            HRMS
                                            {/* <i class="fas fa-angle-left right"></i> */}
                                        </p>
                                    </p>
                                    {machineoperatordrop2 === true ? <ul class="nav nav-treeview" style={{
                                        display: 'block', listStyle: 'none',
                                        padding: '0'
                                    }}>
                                        <li class="nav-item">
                                            <Link to="machine_operator_attendance" className="nav-link">
                                                <i class="far fa-circle nav-icon"></i>
                                                <p>Attendance</p>
                                            </Link>
                                            <Link to="machine_operator_leave_tracker" className="nav-link">
                                                <i class="far fa-circle nav-icon"></i>
                                                <p>Leave Tracker</p>
                                            </Link>
                                        </li>
                                    </ul> : null}
                                </li>
                            </ul>
                        </nav>
                        {/* /.sidebar-menu */}
                    </div>
                    {/* /.sidebar */}
                </aside>
            </div>

        )
    }

    else if (localStorage.getItem("user_type") === "transporter") {
        return (
            <div>
                <aside className="main-sidebar sidebar-dark-primary elevation-4">
                    {/* Brand Logo */}
                    <a href="index3.html" className="brand-link">
                        <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
                        <span className="brand-text font-weight-light">Girnar</span>
                    </a>
                    {/* Sidebar */}
                    <div className="sidebar">
                        {/* Sidebar user panel (optional) */}
                        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                            <div className="image">
                                <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
                            </div>
                            <div className="info">
                                <a href="#" className="d-block">Transporter</a>
                            </div>
                        </div>
                        {/* SidebarSearch Form */}
                        <div className="form-inline">
                            <div className="input-group" data-widget="sidebar-search">
                                <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                                <div className="input-group-append">
                                    <button className="btn btn-sidebar">
                                        <i className="fas fa-search fa-fw" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Sidebar Menu */}
                        <nav className='mt-2'>
                            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                                {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
                                <li class="nav-item menu-open">
                                    <ul class="nav nav-treeview">
                                        <li class="nav-item">
                                            <Link to="" className="nav-link">
                                                <i class="far fa-circle nav-icon"></i>
                                                <p>Dashboard</p>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li class="nav-header">Production</li>
                                <li class="nav-item">
                                    <p className='navlinkcustom' onClick={() => { settransporterDrop1(!transporterdrop1) }}>
                                        <i class="nav-icon far fa-envelope"></i>
                                        <p className='navitemcustom'>
                                            Production
                                            {/* <i class="fas fa-angle-left right"></i> */}
                                        </p>
                                    </p>
                                    {transporterdrop1 === true ? <ul class="nav nav-treeview" style={{
                                        display: 'block', listStyle: 'none',
                                        padding: '0'
                                    }}>
                                        <li class="nav-item">
                                            <Link to="programmer_production" className="nav-link">
                                                <i class="far fa-circle nav-icon"></i>
                                                <p>Production</p>
                                            </Link>
                                        </li>
                                    </ul> : null}
                                </li>
                                <li class="nav-header">HRMS</li>
                                <li class="nav-item">
                                    <p className='navlinkcustom' id="dropdown1" onClick={() => { settransporterDrop2(!transporterdrop2) }}>
                                        <i class="nav-icon far fa-envelope"></i>
                                        <p className='navitemcustom'>
                                            HRMS
                                            {/* <i class="fas fa-angle-left right"></i> */}
                                        </p>
                                    </p>
                                    {transporterdrop2 === true ? <ul class="nav nav-treeview" style={{
                                        display: 'block', listStyle: 'none',
                                        padding: '0'
                                    }}>
                                        <li class="nav-item">
                                            <Link to="machine_operator_attendance" className="nav-link">
                                                <i class="far fa-circle nav-icon"></i>
                                                <p>Attendance</p>
                                            </Link>
                                            <Link to="machine_operator_leave_tracker" className="nav-link">
                                                <i class="far fa-circle nav-icon"></i>
                                                <p>Leave Tracker</p>
                                            </Link>
                                        </li>
                                    </ul> : null}
                                </li>
                            </ul>
                        </nav>
                        {/* /.sidebar-menu */}
                    </div>
                    {/* /.sidebar */}
                </aside>
            </div>

        )
    }
    else if (localStorage.getItem("user_type") === "stock_manager") {
        return (
            <div>
                <aside className="main-sidebar sidebar-dark-primary elevation-4">
                    {/* Brand Logo */}
                    <a href="index3.html" className="brand-link">
                        <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
                        <span className="brand-text font-weight-light">Girnar</span>
                    </a>
                    {/* Sidebar */}
                    <div className="sidebar">
                        {/* Sidebar user panel (optional) */}
                        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                            <div className="image">
                                <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
                            </div>
                            <div className="info">
                                <a href="#" className="d-block">Stock Manager</a>
                            </div>
                        </div>
                        {/* SidebarSearch Form */}
                        <div className="form-inline">
                            <div className="input-group" data-widget="sidebar-search">
                                <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                                <div className="input-group-append">
                                    <button className="btn btn-sidebar">
                                        <i className="fas fa-search fa-fw" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Sidebar Menu */}
                        <nav className='mt-2'>
                            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                                {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
                                <li class="nav-item menu-open">
                                    <ul class="nav nav-treeview">
                                        <li class="nav-item">
                                            <Link to="" className="nav-link">
                                                <i class="far fa-circle nav-icon"></i>
                                                <p>Dashboard</p>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li class="nav-header">Vendor Master</li>
                                <li class="nav-item">
                                    <p className='navlinkcustom' onClick={() => { setstockmanagerDrop1(!stockmanagerdrop1) }}>
                                        <i class="nav-icon far fa-envelope"></i>
                                        <p className='navitemcustom'>
                                            Vendor Master
                                            {/* <i class="fas fa-angle-left right"></i> */}
                                        </p>
                                    </p>
                                    {stockmanagerdrop1 === true ? <ul class="nav nav-treeview" style={{
                                        display: 'block', listStyle: 'none',
                                        padding: '0'
                                    }}>
                                        <li class="nav-item">
                                            <Link to="stock_manager_vendor_master" className="nav-link">
                                                <i class="far fa-circle nav-icon"></i>
                                                <p>Vendor Master</p>
                                            </Link>
                                        </li>
                                    </ul> : null}
                                </li>
                                <li class="nav-header">Stock</li>
                                <li class="nav-item">
                                    <p className='navlinkcustom' id="dropdown1" onClick={() => { setstockmanagerDrop2(!stockmanagerdrop2) }}>
                                        <i class="nav-icon far fa-envelope"></i>
                                        <p className='navitemcustom'>
                                            Stock Management
                                            {/* <i class="fas fa-angle-left right"></i> */}
                                        </p>
                                    </p>
                                    {stockmanagerdrop2 === true ? <ul class="nav nav-treeview" style={{
                                        display: 'block', listStyle: 'none',
                                        padding: '0'
                                    }}>
                                        <li class="nav-item">
                                            <Link to="stock_manager_stock_requirement" className="nav-link">
                                                <i class="far fa-circle nav-icon"></i>
                                                <p>Stock Requirement</p>
                                            </Link>
                                            <Link to="stock_manager_available_stock" className="nav-link">
                                                <i class="far fa-circle nav-icon"></i>
                                                <p>Available Stock</p>
                                            </Link>
                                        </li>
                                    </ul> : null}
                                </li>
                            </ul>
                        </nav>
                        {/* /.sidebar-menu */}
                    </div>
                    {/* /.sidebar */}
                </aside>
            </div>

        )
    }
    else if (localStorage.getItem("user_type") === "super_admin") {
        return (
            <div>
                <aside className="main-sidebar sidebar-dark-primary elevation-4">
                    {/* Brand Logo */}
                    <a href="index3.html" className="brand-link">
                        <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
                        <span className="brand-text font-weight-light">Girnar</span>
                    </a>
                    {/* Sidebar */}
                    <div className="sidebar">
                        {/* Sidebar user panel (optional) */}
                        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                            <div className="image">
                                <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
                            </div>
                            <div className="info">
                                <a href="#" className="d-block">Super Admin</a>
                            </div>
                        </div>
                        {/* SidebarSearch Form */}
                        <div className="form-inline">
                            <div className="input-group" data-widget="sidebar-search">
                                <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                                <div className="input-group-append">
                                    <button className="btn btn-sidebar">
                                        <i className="fas fa-search fa-fw" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Sidebar Menu */}
                        <nav className='mt-2'>
                            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                                {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
                                <li class="nav-item menu-open">
                                    <ul class="nav nav-treeview">
                                        <li class="nav-item">
                                            <Link to="" className="nav-link">
                                                <i class="far fa-circle nav-icon"></i>
                                                <p>Dashboard</p>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li class="nav-header">Available Stock</li>
                                <li class="nav-item">
                                    <p className='navlinkcustom' onClick={() => { setsuperadminDrop1(!superadmindrop1) }}>
                                        <i class="nav-icon far fa-envelope"></i>
                                        <p className='navitemcustom'>
                                            Vendor Master
                                            {/* <i class="fas fa-angle-left right"></i> */}
                                        </p>
                                    </p>
                                    {superadmindrop1 === true ? <ul class="nav nav-treeview" style={{
                                        display: 'block', listStyle: 'none',
                                        padding: '0'
                                    }}>
                                        <li class="nav-item">
                                            <Link to="super_admin_work_order" className="nav-link">
                                                <i class="far fa-circle nav-icon"></i>
                                                <p>Work Order</p>
                                            </Link>
                                        </li>
                                    </ul> : null}
                                </li>
                                <li class="nav-header">Available Stock</li>
                                <li class="nav-item">
                                    <p className='navlinkcustom' id="dropdown1" onClick={() => { setsuperadminDrop2(!superadmindrop2) }}>
                                        <i class="nav-icon far fa-envelope"></i>
                                        <p className='navitemcustom'>
                                            HRMS
                                            {/* <i class="fas fa-angle-left right"></i> */}
                                        </p>
                                    </p>
                                    {superadmindrop2 === true ? <ul class="nav nav-treeview" style={{
                                        display: 'block', listStyle: 'none',
                                        padding: '0'
                                    }}>
                                        <li class="nav-item">
                                            <Link to="super_admin_available_stock" className="nav-link">
                                                <i class="far fa-circle nav-icon"></i>
                                                <p>Available Stock</p>
                                            </Link>
                                        </li>
                                    </ul> : null}
                                </li>
                            </ul>
                        </nav>
                        {/* /.sidebar-menu */}
                    </div>
                    {/* /.sidebar */}
                </aside>
            </div>

        )
    }
    return <div>Hello</div>
}

export default Menu
