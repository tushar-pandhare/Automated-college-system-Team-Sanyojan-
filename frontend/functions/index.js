const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
require("dotenv").config();

admin.initializeApp();
const db = admin.firestore();

const gmailEmail = "2024bcs507@sggs.sc.in"; // Use an official email
const gmailPassword = "123456"; // Use an App Password

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

exports.sendLeaveRequestEmail = functions.firestore
  .document("leaveRequests/{docId}")
  .onCreate(async (snap, context) => {
    const leaveData = snap.data();
    const { name, reason, status, studentId } = leaveData;

    if (!studentId) {
      console.error("Student ID missing in Firestore document.");
      return;
    }

    try {
      // Fetch student's email from Firestore
      const studentDoc = await db.collection("students").doc(studentId).get();
      if (!studentDoc.exists) {
        console.error("Student record not found.");
        return;
      }

      const studentEmail = studentDoc.data().email;
      if (!studentEmail) {
        console.error("Student email not found in Firestore.");
        return;
      }

      const recipients = [studentEmail, "tusharpandharetp@gmail.com", "sdhawalapure@gmail.com"];

      const mailOptions = {
        from: `"College System" <${gmailEmail}>`,
        to: recipients,
        subject: `New Leave Request from ${name}`,
        html: `
          <p><strong>Student Name:</strong> ${name}</p>
          <p><strong>Reason:</strong> ${reason}</p>
          <p><strong>Status:</strong> ${status}</p>
          <p><em>This is an automated notification.</em></p>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log(`Email sent successfully to ${recipients.join(", ")}`);
    } catch (error) {
      console.error("Error fetching student email or sending email:", error);
    }
  });
