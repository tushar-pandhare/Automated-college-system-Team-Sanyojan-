import React, { useState } from "react";
import ApproveExpenses from "./ApproveExpenses";
import ViewAllBudgets from "./ViewBudget";
import UpdateBudget from "./UpdateBudget";
import BudgetApproval from "./BudgetApproval";

const BudgetNavbar = ({ role = "student" }) => {
  const [activeComponent, setActiveComponent] = useState("view-budgets");

  // Define navigation links based on the user's role
  const navLinks = [
    { id: "view-budgets", name: "View Budgets", component: <ViewAllBudgets />, roles: ["student", "admin"] },
    { id: "approve-expenses", name: "Approve Expenses", component: <ApproveExpenses />, roles: ["admin", "faculty"] },
    { id: "update-budget", name: "Update Budget", component: <UpdateBudget />, roles: ["admin"] },
    { id: "budget-approval", name: "Budget Approval", component: <BudgetApproval />, roles: ["admin", "authority"] },
  ];

  // Filter links based on the user's role
  const filteredLinks = navLinks.filter((link) => link.roles.includes(role));

  // Get the current active component
  const activeLink = navLinks.find((link) => link.id === activeComponent);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-blue-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-white text-xl font-bold">Budget Management</span>
            </div>
            <div className="flex items-center space-x-4">
              {filteredLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => setActiveComponent(link.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeComponent === link.id
                      ? "bg-blue-700 text-white"
                      : "text-white hover:bg-blue-500"
                  }`}
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            {activeLink ? activeLink.name : "Welcome to Budget Management"}
          </h1>
          <div className="bg-white rounded-lg shadow-md p-6">
            {activeLink ? (
              activeLink.component
            ) : (
              <div className="text-center text-gray-600">
                <p>Select an option from the navigation bar to get started.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetNavbar;