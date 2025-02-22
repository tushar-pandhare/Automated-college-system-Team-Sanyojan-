const mongoose = require('mongoose');

// Define schema for the Applications collection
const applicationSchema = new mongoose.Schema({
    studentId: { type: String, required: true },
    studentName: { type: String, required: true },
    applicationType: { type: String, required: true },  // e.g., Event, Leave, Budget Approval
    description: { type: String, required: true },
    status: { type: String, default: 'Pending' },  // Status like Pending, Approved, Rejected
    createdAt: { type: Date, default: Date.now }
});

// Create and export the model for the schema
const Application = mongoose.model('Application', applicationSchema);
module.exports = Application;
