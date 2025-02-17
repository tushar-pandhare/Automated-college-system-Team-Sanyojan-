import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="min-h-screen bg-cover bg-center flex flex-col justify-between" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0)' }}>
            <nav className="bg-gray-900 bg-opacity-75 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-white text-2xl font-bold">College System</h1>
                    <ul className="flex space-x-6">
                        <li>
                            <Link to="/elections" className="text-white hover:underline">Elections</Link>
                        </li>
                        <li>
                            <Link to="/notifications" className="text-white hover:underline">Notifications</Link>
                        </li>
                        <li>
                            <Link to="/booking" className="text-white hover:underline">Booking</Link>
                        </li>
                        <li>
                            <Link to="/applications" className="text-white hover:underline">Applications</Link>
                        </li>
                        <li>
                            <Link to="/complaints" className="text-white hover:underline">Complaints</Link>
                        </li>
                        <li>
                            <Link to="/budget" className="text-white hover:underline">Budget Tracking</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="container mx-auto p-8 bg-white bg-opacity-80 rounded-lg shadow-lg mt-10">
                <h1 className="text-4xl font-bold mb-6 text-center">Welcome to the College System</h1>
                <p className="text-gray-700 mb-6 text-center">
                    Our automated, paperless, and transparent college system ensures efficiency, fairness, and accessibility for all students and faculty members. Explore our features and functionalities designed to make your college experience better.
                </p>
                <div className="flex flex-wrap justify-center items-start space-x-8 space-y-8">
                    <div className="w-full md:w-1/3 bg-blue-100 p-4 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-2">Elections</h2>
                        <p className="text-gray-600">Participate in online elections with secure voting and live result tracking.</p>
                    </div>
                    <div className="w-full md:w-1/3 bg-green-100 p-4 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-2">Notifications</h2>
                        <p className="text-gray-600">Receive automated health and leave notifications for better safety and communication.</p>
                    </div>
                    <div className="w-full md:w-1/3 bg-yellow-100 p-4 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-2">Booking</h2>
                        <p className="text-gray-600">Easily book campus facilities with prior approval and availability status.</p>
                    </div>
                    <div className="w-full md:w-1/3 bg-red-100 p-4 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-2">Applications</h2>
                        <p className="text-gray-600">Submit and track applications for events, budgets, and sponsorships with transparent approval workflows.</p>
                    </div>
                    <div className="w-full md:w-1/3 bg-purple-100 p-4 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-2">Complaints</h2>
                        <p className="text-gray-600">Submit anonymous complaints and track their status with our transparent complaint management system.</p>
                    </div>
                    <div className="w-full md:w-1/3 bg-pink-100 p-4 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-2">Budget Tracking</h2>
                        <p className="text-gray-600">Access transparent records of college budgets and sponsorships, ensuring accountability.</p>
                    </div>
                </div>
            </div>
            <footer className="bg-gray-900 bg-opacity-75 p-4 text-center text-white">
                © 2025 <b> Team Sanyog</b>
                <br />
                All rights reserved.
            </footer>
        </div>
    );
};

export default HomePage;
