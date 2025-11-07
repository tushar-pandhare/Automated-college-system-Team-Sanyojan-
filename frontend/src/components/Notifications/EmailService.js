import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_g4plcqf";   // Your EmailJS Service ID
const TEMPLATE_ID = "template_awocd29"; // Your EmailJS Template ID
const PUBLIC_KEY = "lccFlKdzz77DhynF5"; // Your EmailJS Public Key

// ✅ Send Email to Parents & Class Coordinator when a leave request is submitted
const sendEmailNotification = async (leaveData) => {
    const templateParams = {
        to_email: leaveData.parentEmail,   // ✅ Email sent dynamically
        student_email: leaveData.studentEmail,
        student_name: leaveData.studentName,
        start_date: leaveData.startDate,
        end_date: leaveData.endDate,
        reason: leaveData.reason,
    };

    try {
        const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
        console.log("✅ Email sent successfully:", response);
        return { success: true };
    } catch (error) {
        console.error("❌ Error sending email:", error);
        return { success: false, error };
    }
};

// ✅ Send Email Response to Student when leave is approved/rejected
const sendEmailResponse = async (studentEmail, status) => {
    const templateParams = {
        to_email: studentEmail, // ✅ Dynamically assigned
        subject: "Leave Request Update",
        message: `Your leave request has been ${status}.`,
    };

    try {
        const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
        console.log("✅ Email response sent successfully:", response);
        return { success: true };
    } catch (error) {
        console.error("❌ Error sending email response:", error);
        return { success: false, error };
    }
};

export { sendEmailNotification, sendEmailResponse };
