import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ElectionPage from './pages/ElectionPage';
import NotificationComponent from './components/NotificationComponent';
import BookingComponent from './components/BookingComponent';
import ApplicationComponent from './components/ApplicationComponent';
import "./index.css"
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ParentPortal from './pages/ParentPortal';
import BudgetComponent from './components/BudgetComponent';
import Studentdashboard from './pages/student-dashboard';
import SubmitApplication from './components/ApplicationFolder/submitApplication';
import ApplicationPage from './components/ApplicationComponent';
import ManageApplications from './components/ApplicationFolder/ManageApplications';
import ApplicationNavbar from './components/ApplicationFolder/ApplicationNavbar';
import ViewApplications from './components/ApplicationFolder/ViewApplications';
import BudgetNavbar from './components/budgetcomponents/BudgetNavbar';
import ApproveExpenses from './components/budgetcomponents/ApproveExpenses';
import UpdateBudget from './components/budgetcomponents/UpdateBudget';
import ViewAllBudgets from './components/budgetcomponents/ViewBudget';
import LogoutButton from './components/LogoutButton';
import LandingPage from './pages/LandingPage';
import AdminBudgetDashboard from './components/Dashboard/AdminBudgetDashboard';
import AdminAppNavbar from './components/AdminApplication/AdminAppNavbar';
import NotifyBar from './components/AdminNotify/notifyBar';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import ComplaintPage from './pages/ComplaintPage';
import Adminbooking from './components/AdminBooking/adminbooking';
// import adminbooking from './components/AdminBooking/adminbooking';

const App = () => {
    return (
     
        <Router>
            <Routes>
                {/* <Complaints */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/application" element={<ApplicationPage />} />
                <Route path='/logout' element={<LogoutButton />} />
                {/* <Route path="/verify-email" element={<VerifyEmailPage />} /> */}
                <Route path="/complaints" element={<ComplaintPage />} />
                <Route exact path="/student-dashboard" element={<Studentdashboard />} />
                <Route exact path="/parent-portal" element={<ParentPortal />} />
                <Route path="/elections" element={<ElectionPage />} />
                <Route path="/notifications" element={<NotificationComponent />} />
                <Route path="/booking" element={<BookingComponent />} />
                <Route path="/applications" element={<ApplicationComponent />} />
               
                <Route path="/budget" element={<BudgetComponent />} />
                <Route path='/admin/budgets' element={<AdminBudgetDashboard />} />
                <Route path='/admin/booking' element={<Adminbooking />} />
                <Route path='/appnav' element={<ApplicationNavbar />} />
                <Route path='/appmanage' element={<ManageApplications />} />
                <Route path='/appsubmit' element={<SubmitApplication />} />
                <Route path='/appview' element={<ViewApplications />} />


                <Route path='/Budgetnav' element={<BudgetNavbar />} />
                <Route path='/BudgetApprove' element={<ApproveExpenses />} />
                <Route path="/update-budget/:id" element={<UpdateBudget />} />
                <Route path='/budgetView' element={<ViewAllBudgets />} />



                <Route path='/admin/applications' element={<AdminAppNavbar />} />
                <Route path='admin/notifications' element={<NotifyBar />} />



                
                {/* <AdminDashboard /> */}
                <Route path="/admin-dashboard" element={<AdminDashboard />} /> 
                {/* <AdminDashboard /> */}
{/* //////////// */}


            </Routes>
        </Router>
    );
};

export default App;
