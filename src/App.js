
import { BrowserRouter,Switch,Route } from 'react-router-dom';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import Analytics from './components/crm/Analytics';
import AvailableStock from './components/crm/AvailableStock';
import CompanyContact from './components/crm/CompanyContact';
import Contacts from './components/crm/Contacts';
import CustomerFeedback from './components/crm/CustomerFeedback';
import HeightMaster from './components/crm/HeightMaster';
import Leads from './components/crm/Leads';
import LeadsDetails from './components/crm/LeadsDetails';
import Login from './components/crm/Login';
import MaterialTypeMaster from './components/crm/MaterialTypeMaster';
import Payment from './components/crm/Payment';
import POMaster from './components/crm/POMaster';
import Products from './components/crm/Products';
import QuotationMaster from './components/crm/QuotationMaster';
import RemoteInquiry from './components/crm/RemoteInquiry';
import StockRequest from './components/crm/StockRequest';
import Task from './components/crm/Task';
import TaskAllocation from './components/crm/TaskAllocation';
import ThirdPartyContacts from './components/crm/ThirdPartyContacts';
import ThirdPartyTaskAllocation from './components/crm/ThirdPartyTaskAllocation';
import DesignerAttendance from './components/designer/DesignerAttendance';
import DesignerLeaveTracker from './components/designer/DesignerLeaveTracker';
import DesignerProduction from './components/designer/DesignerProduction';
import Attendance from './components/hr/Attendance';
import LeaveTracker from './components/hr/LeaveTracker';
import MachineOperatorAttendance from './components/machine_operator/MachineOperatorAttendance';
import MachineOperatorLeaveTracker from './components/machine_operator/MachineOperatorLeaveTracker';
import MachineOperatorProduction from './components/machine_operator/MachineOperatorProduction';
import ProgrammerAttendance from './components/programmer/ProgrammerAttendance';
import ProgrammerLeaveTracker from './components/programmer/ProgrammerLeaveTracker';
import ProgrammerProduction from './components/programmer/ProgrammerProduction';
import StockManagerAvailableStock from './components/stock_manager/StockManagerAvailableStock';
import SuperAdminAvailableStock from './components/super_admin/SuperAdminAvailableStock';
import SuperAdminWorkOrder from './components/super_admin/SuperAdminWorkOrder';
import StockManagerStockRequirement from './components/stock_manager/StockManagerStockRequirement';
import StockManagerVendorMaster from './components/stock_manager/StockManagerVendorMaster';
import TransporterAttendance from './components/transporter/TransporterAttendance';
import TransporterLeaveTracker from './components/transporter/TransporterLeaveTracker';
import TransporterProduction from './components/transporter/TransporterProduction';
import { ProtectedRoute } from './protected.route';
import CrmDashboard from './components/crm/CrmDashboard';
import DesignerDashboard from './components/designer/DesignerDashboard';
import HrDashboard from './components/hr/HrDashboard';
import MachineOperatorDashboard from './components/machine_operator/MachineOperatorDashboard';
import ProgrammerDashboard from './components/programmer/ProgrammerDashboard';
import StockManagerDashboard from './components/stock_manager/StockManagerDashboard';
import SuperAdminDashboard from './components/super_admin/SuperAdminDashboard';
import TransporterDashboard from './components/transporter/TransporterDashboard';
import HrmsEmployeeMaster from './components/hr/HrmsEmployeeMaster';
import CompanyContactCopy from './components/crm/CompanyContactCopy';
import MaterialGradeMaster from './components/crm/MaterialGradeMaster';
import AttendanceReport from './components/hr/AttendanceReport';
import HrmsVacancies from './components/hr/HrmsVacancies';
import HrmsEmployeeSalary from './components/hr/HrmsEmployeeSalary';
import DesignerHeadQuotationMaster from './components/designer_head/DesignerHeadQuotationMaster';
import DesignerHeadPOGeneration from './components/designer_head/DesignerHeadPOMaster';
import DesignerHeadTaskAllocation from './components/designer_head/DesignerHeadTaskAllocation';
import DesignerHeadThirdPartyTaskAllocation from './components/designer_head/DesignerHeadThirdPartyTaskAllocation';
import DesignerHeadTask from './components/designer_head/DesignerHeadTask';
import DesignerHeadMaterialTypeMaster from './components/designer_head/DesignerHeadMaterialTypeMaster';
import DesignerHeadMaterialGradeMaster from './components/designer_head/DesignerHeadMaterialGradeMaster';
import DesignerHeadHeightMaster from './components/designer_head/DesignerHeadHeightMaster';
import DesignerHeadStockRequest from './components/designer_head/DesignerHeadStockRequest';
import DesignerHeadAvailableStock from './components/designer_head/DesignerHeadAvailableStock';
import DesignerHeadCustomerFeedback from './components/designer_head/DesignerHeadCustomerFeedback';
import DesignerHeadThirdPartyContacts from './components/designer_head/DesignerHeadThirdPartyContacts';
import DesignerHeadRemoteInquiry from './components/designer_head/DesignerHeadRemoteInquiry';
import DesignerHeadPayment from './components/designer_head/DesignerHeadPayment';
import DesignerHeadContacts from './components/designer_head/DesignerHeadContacts';
import DesignerHeadProducts from './components/designer_head/DesignerHeadProducts';
import DesignerHeadCompanyContactCopy from './components/designer_head/DesignerHeadCompanyContactCopy';
import DesignerHeadCompanyContact from './components/designer_head/DesignerHeadCompanyContact';
import DesignerHeadLeadsDetails from './components/designer_head/DesignerHeadLeadsDetails';
import DesignerHeadLeads from './components/designer_head/DesignerHeadLeads';
import DesignerHeadAnalytics from './components/designer_head/DesignerHeadAnalytics';
import PurchaseManagerDashboard from './components/purchase/PurchaseManagerDashboard';
import PurchaseManagerVendorMaster from './components/purchase/PurchaseManagerVendorMaster';
import PurchaseManagerStockRequirement from './components/purchase/PurchaseManagerStockRequirement';
import PurchaseManagerAvailableStock from './components/purchase/PurchaseManagerAvailableStock';
import DesignerHeadShift from './components/designer_head/DesignerHeadShift';


function App() {
  return (
    <div className='wrapper'>
      
      <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login} />
            <ProtectedRoute exact path="/crm_dashboard" component={CrmDashboard}  />
            <ProtectedRoute exact path="/designer_dashboard" component={DesignerDashboard}  />
            <ProtectedRoute exact path="/hr_dashboard" component={HrDashboard}  />
            <ProtectedRoute exact path="/machine_operator_dashboard" component={MachineOperatorDashboard}  />
            <ProtectedRoute exact path="/programmer_dashboard" component={ProgrammerDashboard}  />
            <ProtectedRoute exact path="/stock_manager_dashboard" component={StockManagerDashboard}  />
            <ProtectedRoute exact path="/purchase_manager_dashboard" component={PurchaseManagerDashboard}  />
            <ProtectedRoute exact path="/super_admin_dashboard" component={SuperAdminDashboard}  />
            <ProtectedRoute exact path="/transporter_dashboard" component={TransporterDashboard}  />

            <ProtectedRoute path='/quotation_master' component={QuotationMaster } />
            <ProtectedRoute path='/po_master' component={POMaster}></ProtectedRoute>
            <ProtectedRoute path='/task_allocation' component={TaskAllocation }></ProtectedRoute>
            <ProtectedRoute path='/task' component={Task }></ProtectedRoute>
            <ProtectedRoute path='/material_type_master' component={MaterialTypeMaster }></ProtectedRoute>
            <ProtectedRoute path='/material_grade_master' component={MaterialGradeMaster }></ProtectedRoute>
            <ProtectedRoute path='/height_master' component={HeightMaster }></ProtectedRoute>
            <ProtectedRoute path='/stock_request' component={StockRequest }></ProtectedRoute>
            <ProtectedRoute path='/available_stock' component={AvailableStock }></ProtectedRoute>
            <ProtectedRoute path='/customer_feedback' component={CustomerFeedback }></ProtectedRoute>
            <ProtectedRoute path='/third_party_contacts' component={ThirdPartyContacts }></ProtectedRoute>
            <ProtectedRoute path='/third_party_task_allocation' component={ThirdPartyTaskAllocation }></ProtectedRoute>
            <ProtectedRoute path='/remote_inquiry' component={RemoteInquiry}></ProtectedRoute>
            <ProtectedRoute path='/payment' component={Payment }></ProtectedRoute>
            <ProtectedRoute path='/individual_contact' component={Contacts }></ProtectedRoute>
            <ProtectedRoute path='/products' component={Products }></ProtectedRoute>
            <ProtectedRoute path='/company_contact' component={CompanyContact }></ProtectedRoute>
            <ProtectedRoute path='/company_contact_copy' component={CompanyContactCopy }></ProtectedRoute>
            <ProtectedRoute path='/leads_details' component={Leads }></ProtectedRoute>
            <ProtectedRoute path='/leads' component={LeadsDetails}></ProtectedRoute>
            <ProtectedRoute path='/analytics' component={Analytics }></ProtectedRoute>

            <ProtectedRoute exact path="/designer_head_dashboard" component={DesignerDashboard}  />
            <ProtectedRoute path='/designer_head_quotation_master' component={DesignerHeadQuotationMaster } />
            <ProtectedRoute path='/designer_head_po_master' component={DesignerHeadPOGeneration}></ProtectedRoute>
            <ProtectedRoute path='/designer_head_task_allocation' component={DesignerHeadTaskAllocation }></ProtectedRoute>
            <ProtectedRoute path='/designer_head_task' component={DesignerHeadTask }></ProtectedRoute>
            <ProtectedRoute path='/designer_head_task_allocation' component={DesignerHeadTaskAllocation }></ProtectedRoute>
            <ProtectedRoute path='/designer_head_material_type_master' component={DesignerHeadMaterialTypeMaster }></ProtectedRoute>
            <ProtectedRoute path='/designer_head_material_grade_master' component={DesignerHeadMaterialGradeMaster }></ProtectedRoute>
            <ProtectedRoute path='/designer_head_height_master' component={DesignerHeadHeightMaster }></ProtectedRoute>
            <ProtectedRoute path='/designer_head_stock_request' component={DesignerHeadStockRequest }></ProtectedRoute>
            <ProtectedRoute path='/designer_head_available_stock' component={DesignerHeadAvailableStock }></ProtectedRoute>
            <ProtectedRoute path='/designer_head_customer_feedback' component={DesignerHeadCustomerFeedback }></ProtectedRoute>
            <ProtectedRoute path='/designer_head_third_party_contacts' component={DesignerHeadThirdPartyContacts }></ProtectedRoute>
            <ProtectedRoute path='/designer_head_third_party_task_allocation' component={DesignerHeadThirdPartyTaskAllocation }></ProtectedRoute>
            <ProtectedRoute path='/designer_head_remote_inquiry' component={DesignerHeadRemoteInquiry}></ProtectedRoute>
            <ProtectedRoute path='/designer_head_payment' component={DesignerHeadPayment }></ProtectedRoute>
            <ProtectedRoute path='/designer_head_individual_contact' component={DesignerHeadContacts }></ProtectedRoute>
            <ProtectedRoute path='/designer_head_products' component={DesignerHeadProducts }></ProtectedRoute>
            <ProtectedRoute path='/designer_head_company_contact' component={DesignerHeadCompanyContact }></ProtectedRoute>
            <ProtectedRoute path='/designer_head_company_contact_copy' component={DesignerHeadCompanyContactCopy }></ProtectedRoute>
            <ProtectedRoute path='/designer_head_leads_details' component={DesignerHeadLeads }></ProtectedRoute>
            <ProtectedRoute path='/designer_head_leads' component={DesignerHeadLeadsDetails}></ProtectedRoute>
            <ProtectedRoute path='/designer_head_analytics' component={DesignerHeadAnalytics }></ProtectedRoute>
            <ProtectedRoute path='/designer_head_shift' component={DesignerHeadShift }></ProtectedRoute>


            <ProtectedRoute path='/hrms_attendance' component={Attendance }></ProtectedRoute>
            <ProtectedRoute path='/hrms_leave_tracker' component={LeaveTracker }></ProtectedRoute>
            <ProtectedRoute path='/hrms_employee_master' component={HrmsEmployeeMaster }></ProtectedRoute>
            <ProtectedRoute path='/hrms_attendance_report' component={AttendanceReport }></ProtectedRoute>
            <ProtectedRoute path='/hrms_vacancies' component={HrmsVacancies }></ProtectedRoute>
            <ProtectedRoute path='/hrms_employee_salary' component={HrmsEmployeeSalary }></ProtectedRoute>

            <ProtectedRoute path='/designer_production' component={DesignerProduction }></ProtectedRoute>
            <ProtectedRoute path='/designer_attendance' component={DesignerAttendance }></ProtectedRoute>
            <ProtectedRoute path='/designer_leave_tracker' component={DesignerLeaveTracker }></ProtectedRoute>

            <ProtectedRoute path='/programmer_production' component={ProgrammerProduction }></ProtectedRoute>
            <ProtectedRoute path='/programmer_attendance' component={ProgrammerAttendance }></ProtectedRoute>
            <ProtectedRoute path='/programmer_leave_tracker' component={ProgrammerLeaveTracker }></ProtectedRoute>

            <ProtectedRoute path='/machine_operator_production' component={MachineOperatorProduction }></ProtectedRoute>
            <ProtectedRoute path='/machine_operator_attendance' component={MachineOperatorAttendance }></ProtectedRoute>
            <ProtectedRoute path='/machine_operator_leave_tracker' component={MachineOperatorLeaveTracker }></ProtectedRoute>

            <ProtectedRoute path='/transporter_production' component={TransporterProduction }></ProtectedRoute>
            <ProtectedRoute path='/transporter_attendance' component={TransporterAttendance }></ProtectedRoute>
            <ProtectedRoute path='/transporter_leave_tracker' component={TransporterLeaveTracker }></ProtectedRoute>

            <ProtectedRoute path='/stock_manager_vendor_master' component={StockManagerVendorMaster }></ProtectedRoute>
            <ProtectedRoute path='/stock_manager_stock_requirement' component={StockManagerStockRequirement }></ProtectedRoute>
            <ProtectedRoute path='/stock_manager_available_stock' component={StockManagerAvailableStock }></ProtectedRoute>
            
            <ProtectedRoute path='/purchase_manager_vendor_master' component={PurchaseManagerVendorMaster }></ProtectedRoute>
            <ProtectedRoute path='/purchase_manager_stock_requirement' component={PurchaseManagerStockRequirement }></ProtectedRoute>
            <ProtectedRoute path='/purchase_manager_available_stock' component={PurchaseManagerAvailableStock }></ProtectedRoute>

            <ProtectedRoute path='/super_admin_work_order' component={SuperAdminWorkOrder }></ProtectedRoute>
            <ProtectedRoute path='/super_admin_available_stock' component={SuperAdminAvailableStock }></ProtectedRoute>
        </Switch>
      </BrowserRouter>
    </div>
           
     
  );
}

export default App;
