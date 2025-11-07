// Firebase Configuration
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification as sendEmailVerificationFirebase,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  addDoc,
  updateDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Firebase configuration (replace with your own config)
const firebaseConfig = {
  apiKey: "AIzaSyAmwJfXd-3jKEKC5IZPqkwyiChJsnp9jOs",
  authDomain: "automated-college-system.firebaseapp.com",
  projectId: "automated-college-system",
  storageBucket: "automated-college-system.appspot.com",
  messagingSenderId: "1041511667290",
  appId: "1:1041511667290:web:114e101b2430762680aa63",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Email validation patterns for different roles
const EMAIL_PATTERNS = {
  student: /^(20\d{2})(bcs|bce|bec|mech)(\d{3})@sggs\.ac\.in$/i,
  mtech: /^(20\d{2})(mcs|mme|mec)(\d{3})@sggs\.ac\.in$/i,
  faculty: /^[a-z]+\.[a-z]+@sggs\.ac\.in$/i,
  admin: /^admin\.[a-z]+@sggs\.ac\.in$/i,
  doctor: /^dr\.[a-z]+@sggs\.ac\.in$/i,
};

// Allowed roles and their metadata
const ROLES_CONFIG = {
  student: { branches: ["bcs", "bce", "bec", "mech"] },
  mtech: { branches: ["mcs", "mme", "mec"] },
  faculty: { departments: ["CSE", "ME", "ECE"] },
  admin: { accessLevel: 3 },
  doctor: { medicalLicense: true },
};

// ================== Authentication Functions ==================

/**
 * Sign up a new user with email, password, and role.
 */
const signUpUser = async (fullName, email, password, role) => {
  try {
    if (!ROLES_CONFIG[role]) {
      throw new Error("Invalid user role");
    }

    if (!validateEmailForRole(email, role)) {
      throw new Error(`Invalid email format for ${role}. Example: ${getEmailExample(role)}`);
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userData = { fullName, email, role };
    const emailMatch = email.match(EMAIL_PATTERNS[role]);

    if (["student", "mtech"].includes(role)) {
      userData.year = emailMatch[1];
      userData.branch = emailMatch[2].toUpperCase();
      userData.rollNumber = emailMatch[3];
    }

    await setDoc(doc(db, "users", user.uid), userData);

    await sendEmailVerification(user);

    return user;
  } catch (error) {
    throw new Error(`Registration failed: ${error.message}`);
  }
};

/**
 * Log in a user with email and password.
 */
const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user;
  } catch (error) {
    throw new Error(`Login failed: ${error.message}`);
  }
};

/**
 * Log out the current user.
 */
const logout = async () => {
  try {
    await signOut(auth);
    console.log("User logged out successfully");
  } catch (error) {
    console.error("Error logging out:", error.message);
  }
};

/**
 * Send an email verification link to the user.
 */
export const sendEmailVerification = async (user) => {
  await sendEmailVerificationFirebase(user);
};

/**
 * Get the currently authenticated user.
 */
export const getAuthUser = () => {
  return new Promise((resolve) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    });
  });
};

// ================== Firestore Functions ==================

/**
 * Submit a new complaint to Firestore.
 */
const submitComplaint = async (complaintText, userId) => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error("User is not logged in. Please log in before submitting a complaint.");
    }

    userId = userId || currentUser.uid;

    console.log("Submitting complaint:", complaintText, userId);

    const newComplaintRef = await addDoc(collection(db, "complaints"), {
      complaintText,
      userId,
      timestamp: serverTimestamp(),
      status: "pending",
    });

    console.log("Complaint submitted! Document ID:", newComplaintRef.id);
    return { success: true, complaintId: newComplaintRef.id };
  } catch (error) {
    console.error("Error submitting complaint:", error.message);
    return { success: false, message: error.message };
  }
};

/**
 * Fetch complaints from Firestore based on status.
 */
const fetchComplaints = async (status) => {
  try {
    const complaintsRef = collection(db, "complaints");
    let q;
    if (status) {
      q = query(complaintsRef, where("status", "==", status));
    } else {
      q = complaintsRef;
    }
    const complaintsSnapshot = await getDocs(q);
    const complaints = complaintsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log(`Complaints Fetched for status "${status}":`, complaints);
    return { success: true, complaints };
  } catch (error) {
    console.error("Error fetching complaints:", error.message);
    return { success: false, message: error.message };
  }
};

/**
 * Approve a complaint by updating its status to "approved".
 */
const approveComplaint = async (complaintId) => {
  try {
    const complaintRef = doc(db, "complaints", complaintId);
    await updateDoc(complaintRef, { status: "approved" });

    console.log(`Complaint ${complaintId} approved`);
    return { success: true, message: "Complaint approved." };
  } catch (error) {
    console.error("Error approving complaint:", error.message);
    return { success: false, message: error.message };
  }
};

/**
 * Reject a complaint by updating its status to "rejected".
 */
const rejectComplaint = async (complaintId) => {
  try {
    const complaintRef = doc(db, "complaints", complaintId);
    await updateDoc(complaintRef, { status: "rejected" });

    console.log(`Complaint ${complaintId} rejected.`);
    return { success: true, message: "Complaint rejected." };
  } catch (error) {
    console.error("Error rejecting complaint:", error.message);
    return { success: false, message: error.message };
  }
};

// ================== Storage Functions ==================

/**
 * Upload a file to Firebase Storage and return its download URL.
 */
const uploadFile = async (file, path) => {
  try {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading file:", error.message);
    throw error;
  }
};

/**
 * Get the download URL of a file from Firebase Storage.
 */
const getFileURL = async (path) => {
  try {
    const fileRef = ref(storage, path);
    const downloadURL = await getDownloadURL(fileRef);
    return downloadURL;
  } catch (error) {
    console.error("Error fetching file URL:", error.message);
    throw error;
  }
};

// ================== Helper Functions ==================

/**
 * Validate an email address for a specific role.
 */
const validateEmailForRole = (email, role) => {
  const pattern = EMAIL_PATTERNS[role];
  if (!pattern) throw new Error("Invalid role specified");
  return pattern.test(email);
};

/**
 * Get an example email for a specific role.
 */
const getEmailExample = (role) => {
  const examples = {
    student: "2024bcs001@sggs.ac.in",
    mtech: "2024mcs001@sggs.ac.in",
    faculty: "john.doe@sggs.ac.in",
    admin: "admin.jane@sggs.ac.in",
    doctor: "dr.smith@sggs.ac.in",
  };
  return examples[role];
};

// Export all functions
export {
  auth,
  db,
  storage,
  signUpUser,
  collection,
  doc,
  getDocs,
  updateDoc,
  loginUser,
  logout,
  submitComplaint,
  fetchComplaints,
  approveComplaint,
  rejectComplaint,
  uploadFile,
  getFileURL,
};