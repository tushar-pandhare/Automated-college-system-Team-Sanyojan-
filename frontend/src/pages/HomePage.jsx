import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HomePage = () => {
    const modules = [
        { id: 1, title: "Elections", description: "Secure voting & live tracking", icon: "🗳️", link: "/elections" },
        { id: 2, title: "Notifications", description: "Health & leave alerts", icon: "📢", link: "/notifications" },
        { id: 3, title: "Booking", description: "Reserve campus facilities", icon: "🏢", link: "/booking" },
        { id: 4, title: "Applications", description: "Submit & track approvals", icon: "📄", link: "/applications" },
        { id: 5, title: "Complaints", description: "Anonymous complaint system", icon: "💬", link: "/complaints" },
        { id: 6, title: "Budget Tracking", description: "Transparent finance records", icon: "💰", link: "/budget" },
    ];

    return (
        <div className="flex flex-col h-screen">
            {/* Navbar */}
            <nav className="bg-gradient-to-r from-blue-800 to-blue-900 p-4 text-white shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Team Sanyojan</h1>
                    <ul className="flex space-x-6">
                        {modules.map((module) => (
                            <li key={module.id}>
                                <Link to={module.link} className="hover:underline">{module.title}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>

            {/* Main Content */}
            <div className="flex flex-1">
                {/* Sidebar */}
                <aside className="w-64 bg-gradient-to-b from-blue-700 to-blue-900 text-white p-6 flex flex-col">
                    <h2 className="text-xl font-semibold mb-6 text-center">Dashboard</h2>
                    <nav>
                        <ul className="space-y-3">
                            {modules.map((module) => (
                                <li key={module.id}>
                                    <Link to={module.link} className="flex items-center px-4 py-2 rounded-md hover:bg-blue-600 transition">
                                        <span className="mr-3 text-xl">{module.icon}</span> {module.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <Link to="/logout" className="mt-auto text-center text-red-400 hover:text-red-600 font-semibold transition">
                        Logout
                    </Link>
                </aside>

                {/* Dashboard Section */}
                <main className="flex-1 bg-gray-100 p-10">
                    <h1 className="text-3xl font-bold text-gray-800">Welcome to the Automated College System</h1>
                    <p className="text-gray-600 mb-6">Ensuring efficiency, fairness, and transparency in college administration.</p>

                    {/* Modules Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {modules.map((module, index) => (
                            <motion.div
                                key={module.id}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.3 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition"
                            >
                                <div className="text-4xl">{module.icon}</div>
                                <h2 className="text-xl font-semibold mt-3">{module.title}</h2>
                                <p className="text-gray-600 mt-2">{module.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </main>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-white p-4 text-center">
                &copy; 2025 <b>Team Sanyojan</b>. All rights reserved.
            </footer>
        </div>
    );
};

export default HomePage;
