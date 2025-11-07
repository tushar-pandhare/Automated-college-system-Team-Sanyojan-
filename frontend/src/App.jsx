import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PrivateRoute from './routes/PrivateRoute';
import NotificationComponent from './components/NotificationComponent';
import BookingComponent from './components/BookingComponent';
import ComplaintPage from './pages/ComplaintPage';
import ApplicationComponent from './components/ApplicationComponent';
import ComplaintComponent from './components/ComplaintComponent';
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
import PrivateRoute from './routes/PrivateRoute';
import AdminComplaints from './components/Dashboard/AdminComplaints';
import ComplaintPage from './pages/ComplaintPage';
import AdminDashboard from './components/Dashboard/AdminDashboard';

const App = () => {
  // ✅ Define uploadedImageURL in state
  const [uploadedImageURL, setUploadedImageURL] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "sagar-project");
    data.append("cloud_name", "djilifntv");

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/djilifntv/image/upload", {
        method: "POST",
        body: data,
      });

      const uploadedImage = await res.json();
      setUploadedImageURL(uploadedImage.url); // ✅ Store image URL in state
      console.log("Uploaded Image URL:", uploadedImage.url);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <Router>
     
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/application" element={<ApplicationPage />} />
                <Route path='/logout' element={<LogoutButton />} />
                {/* <Route path="/verify-email" element={<VerifyEmailPage />} /> */}
                <Route exact path="/student-dashboard" element={<Studentdashboard />} />
                <Route exact path="/parent-portal" element={<ParentPortal />} />
                <Route path="/elections" element={<ElectionPage />} />
                <Route path="/notifications" element={<NotificationComponent />} />
                <Route path="/booking" element={<BookingComponent />} />
                <Route path="/applications" element={<ApplicationComponent />} />
                <Route path="/complaints" element={<ComplaintComponent />} />
                <Route path="/budget" element={<BudgetComponent />} />


                <Route path='/appnav' element={<ApplicationNavbar />} />
                <Route path='/appmanage' element={<ManageApplications />} />
                <Route path='/appsubmit' element={<SubmitApplication />} />
                <Route path='/appview' element={<ViewApplications />} />


                <Route path='/Budgetnav' element={<BudgetNavbar />} />
                <Route path='/BudgetApprove' element={<ApproveExpenses />} />
                <Route path='/BudgetUpdate' element={<UpdateBudget />} />
                <Route path='/budgetView' element={<ViewAllBudgets />} />

                <Route
                     path="/admin/complaints"
                     element={
                    // <PrivateRoute role="admin">
                        <AdminComplaints />
                    // </PrivateRoute>
                     }
                />
                <Route path="/complaints" element={<ComplaintPage />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />



                
                {/* <AdminDashboard /> */}
{/* //////////// */}


            </Routes>
        </Router>
    );
};

export default App;
