import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from 'react-router-dom';
import Analytics from './components/Analytics';
import AvailableStock from './components/AvailableStock';
import CompanyContact from './components/CompanyContact';
import Contacts from './components/Contacts';
import CustomerFeedback from './components/CustomerFeedback';
import HeightMaster from './components/HeightMaster';
import Leads from './components/Leads';
import LeadsDetails from './components/LeadsDetails';
import MaterialTypeMaster from './components/MaterialTypeMaster';
import Payment from './components/Payment';
import POMaster from './components/POMaster';
import Products from './components/Products';
import QuotationMaster from './components/QuotationMaster';
import RemoteInquiry from './components/RemoteInquiry';
import StockRequest from './components/StockRequest';
import Task from './components/Task';
import TaskAllocation from './components/TaskAllocation';
import ThirdPartyContacts from './components/ThirdPartyContacts';
import ThirdPartyTaskAllocation from './components/ThirdPartyTaskAllocation';
import Dashboard from './Dashboard';

function ProjectRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Dashboard />}></Route>
            <Route path='/quotation_master' element={<QuotationMaster />}></Route>
            <Route path='/po_master' element={<POMaster />}></Route>
            <Route path='/task_allocation' element={<TaskAllocation />}></Route>
            <Route path='/task' element={<Task />}></Route>
            <Route path='/material_type' element={<MaterialTypeMaster />}></Route>
            <Route path='/height' element={<HeightMaster />}></Route>
            <Route path='/stock_request' element={<StockRequest />}></Route>
            <Route path='/available_stock' element={<AvailableStock />}></Route>
            <Route path='/customer_feedback' element={<CustomerFeedback />}></Route>
            <Route path='/third_party_contacts' element={<ThirdPartyContacts />}></Route>
            <Route path='/third_party_task_allocation' element={<ThirdPartyTaskAllocation />}></Route>
            <Route path='/remote_inquiry' element={<RemoteInquiry />}></Route>
            <Route path='/payment' element={<Payment />}></Route>
            <Route path='/contacts' element={<Contacts />}></Route>
            <Route path='/products' element={<Products />}></Route>
            <Route path='/companycontact' element={<CompanyContact />}></Route>
            <Route path='/leads' element={<Leads />}></Route>
            <Route path='/leads_details' element={<LeadsDetails />}></Route>
            <Route path='/analytics' element={<Analytics />}></Route>


        </Routes>
    )
}

export default ProjectRoutes
