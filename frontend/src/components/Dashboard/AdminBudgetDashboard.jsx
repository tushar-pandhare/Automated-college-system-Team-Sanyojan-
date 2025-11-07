import React, { useState } from 'react';
import ApproveExpenses from '../budgetcomponents/ApproveExpenses';
import ManageBudgets from '../budgetcomponents/BudgetApproval';
import UpdateBudget from '../budgetcomponents/UpdateBudget';
import ViewBudgets from '../budgetcomponents/ViewBudget';

const AdminBudgetDashboard = () => {
  const [activeComponent, setActiveComponent] = useState('ViewBudgets'); // Default component

  const renderComponent = () => {
    switch (activeComponent) {
      case 'ApproveExpenses':
        return <ApproveExpenses />;
      case 'ManageBudgets':
        return <ManageBudgets />;
      case 'UpdateBudget':
        return <UpdateBudget />;
      case 'ViewBudgets':
      default:
        return <ViewBudgets />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg rounded-lg p-4 mb-8">
        <ul className="flex space-x-6 justify-center">
          <li>
            <button
              onClick={() => setActiveComponent('ViewBudgets')}
              className={`text-lg font-semibold ${
                activeComponent === 'ViewBudgets'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              View Budgets
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveComponent('ManageBudgets')}
              className={`text-lg font-semibold ${
                activeComponent === 'ManageBudgets'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Manage Budgets
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveComponent('UpdateBudget')}
              className={`text-lg font-semibold ${
                activeComponent === 'UpdateBudget'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Update Budget
            </button>
          </li>
        </ul>
      </nav>

      {/* Active Component */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        {renderComponent()}
      </div>
    </div>
  );
};

export default AdminBudgetDashboard;