import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut 
} from "firebase/auth";
import { 
  getFirestore, collection, addDoc, updateDoc, doc, getDocs, query, where, serverTimestamp 
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

// 🔹 Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmwJfXd-3jKEKC5IZPqkwyiChJsnp9jOs",
  authDomain: "automated-college-system.firebaseapp.com",
  projectId: "automated-college-system",
  storageBucket: "automated-college-system.appspot.com",
  messagingSenderId: "1041511667290",
  appId: "1:1041511667290:web:114e101b2430762680aa63",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

/**
 * ✅ Submit Leave Request
 * @param {Object} leaveData - Leave request data
 * @returns {Object} - Success or error message
 */
const submitLeaveRequest = async (leaveData) => {
  try {
    const leaveRef = await addDoc(collection(db, "leaveRequests"), {
      ...leaveData,
      createdAt: serverTimestamp(),
      status: "pending",  // Default status
    });

    console.log("✅ Leave request submitted successfully!", leaveRef.id);
    return { success: true, id: leaveRef.id };
  } catch (error) {
    console.error("❌ Error submitting leave request:", error.message);
    return { success: false, error: error.message };
  }
};

/**
 * ✅ Fetch Student Leave History
 * @param {string} studentEmail - Student's email
 * @returns {Array} - List of leave records
 */
const getStudentLeaveHistory = async (studentEmail) => {
  try {
    if (!studentEmail) {
      throw new Error("No student email provided!");
    }

    console.log("📢 Fetching leave history for:", studentEmail);
    
    const q = query(collection(db, "leaveRequests"), where("email", "==", studentEmail));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("⚠ No leave history found for:", studentEmail);
      return [];
    }

    const leaveHistory = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("✅ Fetched Leave Data:", leaveHistory);
    return leaveHistory;
  } catch (error) {
    console.error("❌ Error fetching leave history:", error.message);
    return [];
  }
};

/**
 * ✅ Approve or Reject Leave Requests (Admin)
 * @param {string} leaveId - Document ID of leave request
 * @param {string} status - New status ("Approved" or "Rejected")
 * @returns {Object} - Success or error message
 */
const updateLeaveStatus = async (leaveId, status) => {
  try {
    const leaveRef = doc(db, "leaveRequests", leaveId);
    await updateDoc(leaveRef, { status });
    console.log(`✅ Leave request ${leaveId} updated to: ${status}`);
    return { success: true };
  } catch (error) {
    console.error("❌ Error updating leave request:", error.message);
    return { success: false, error: error.message };
  }
};

export { auth, db, storage, submitLeaveRequest, getStudentLeaveHistory, updateLeaveStatus };
