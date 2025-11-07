import React from 'react';
import BudgetNavbar from './budgetcomponents/BudgetNavbar';
import ApproveExpenses from './budgetcomponents/ApproveExpenses';

const BudgetComponent = () => {
    // Add budget tracking system logic here
    return (
        <div className="container mx-auto p-4">
            <BudgetNavbar />
            alert("Budget Component Loaded");
        </div>
    );
};

export default BudgetComponent;
