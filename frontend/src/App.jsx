import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ElectionPage from './pages/ElectionPage';
import NotificationComponent from './components/NotificationComponent';
import BookingComponent from './components/BookingComponent';
import ApplicationComponent from './components/ApplicationComponent';
import ComplaintComponent from './components/ComplaintComponent';
import BudgetComponent from './components/BudgetComponent';
import "./index.css"
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route exact path="/HomePage" element={<HomePage />} />
                <Route path="/elections" element={<ElectionPage />} />
                <Route path="/notifications" element={<NotificationComponent />} />
                <Route path="/booking" element={<BookingComponent />} />
                <Route path="/applications" element={<ApplicationComponent />} />
                <Route path="/complaints" element={<ComplaintComponent />} />
                <Route path="/budget" element={<BudgetComponent />} />
            </Routes>
        </Router>
    );
};

export default App;
