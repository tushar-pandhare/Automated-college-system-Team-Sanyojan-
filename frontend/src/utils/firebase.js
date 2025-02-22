import axios from 'axios';

export const submitApplication = async (formData) => {
  try {
    const response = await axios.post('http://localhost:3000/applications', formData); // Adjust port if needed
    return response.data;
  } catch (error) {
    console.error("Error submitting application:", error);
    return { success: false, message: error.response ? error.response.data.message : "Server Error" };
  }
};
