import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendEmailVerification as sendEmailVerificationFirebase, 
  signOut 
} from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  addDoc, 
  getDoc, 
  updateDoc, 
  serverTimestamp, 
  getDocs 
} from "firebase/firestore";
import { 
  getStorage, 
  ref, 
  uploadBytesResumable, 
  getDownloadURL 
} from "firebase/storage";

// 🔥 Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmwJfXd-3jKEKC5IZPqkwyiChJsnp9jOs",
  authDomain: "automated-college-system.firebaseapp.com",
  projectId: "automated-college-system",
  storageBucket: "automated-college-system.appspot.com",
  messagingSenderId: "1041511667290",
  appId: "1:1041511667290:web:114e101b2430762680aa63",
};

// 🚀 Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

/* =========================
   🔐 AUTHENTICATION FUNCTIONS
   ========================= */
// ✅ Sign up new user
export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(userCredential.user);
    return { success: true, message: "Sign up successful! Please verify your email." };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// ✅ Sign in existing user
export const signIn = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return { success: true, message: "Sign in successful!" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// ✅ Send email verification
export const sendEmailVerification = async (user) => {
  try {
    await sendEmailVerificationFirebase(user);
    return { success: true, message: "Verification email sent!" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// ✅ Logout
export const logout = async () => {
  try {
    await signOut(auth);
    return { success: true, message: "Successfully logged out!" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

/* =========================
   💰 BUDGET MANAGEMENT FUNCTIONS
   ========================= */
// ✅ Add budget request
export const addBudgetToFirestore = async (budgetData) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User is not authenticated!");

    const { budgetName, amount, category, description, proofUrls, status } = budgetData;
    let attachmentURLs = [];

    if (proofUrls && proofUrls.length > 0) {
      const uploadPromises = proofUrls.map((file) => uploadFile(file));
      attachmentURLs = await Promise.all(uploadPromises);
    }

    const docRef = await addDoc(collection(db, "budgets"), {
      budgetName,
      amount,
      category,
      description,
      status: status || "Pending",
      proofUrls: attachmentURLs,
      userId: user.uid,
      timestamp: serverTimestamp(),
    });

    return { success: true, message: "Budget added successfully!", budgetId: docRef.id };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// ✅ Get a specific budget by ID
export const getBudgetFromFirestore = async (budgetId) => {
  try {
    const docRef = doc(db, "budgets", budgetId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { success: true, data: docSnap.data() };
    } else {
      return { success: false, message: "Budget not found!" };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// ✅ Fetch all budget requests
export const getAllBudgets = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "budgets"));
    const budgets = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return { success: true, data: budgets };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// ✅ Update a budget request
export const updateBudgetInFirestore = async (budgetId, updatedData) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    let newAttachmentURLs = [];
    if (updatedData.newFiles && updatedData.newFiles.length > 0) {
      const uploadPromises = updatedData.newFiles.map((file) => uploadFile(file));
      newAttachmentURLs = await Promise.all(uploadPromises);
    }

    const finalData = {
      ...updatedData,
      proofUrls: [...(updatedData.existingFiles || []), ...newAttachmentURLs],
      timestamp: serverTimestamp(),
    };

    delete finalData.newFiles;
    delete finalData.existingFiles;

    const docRef = doc(db, "budgets", budgetId);
    await updateDoc(docRef, finalData);

    return { success: true, message: "Budget updated successfully!" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

/* =========================
   ✅ APPROVAL/REJECTION SYSTEM
   ========================= */
// Approve or Reject a budget request
export const updateBudgetStatus = async (budgetId, status) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    if (!["Approved", "Rejected"].includes(status)) {
      throw new Error("Invalid status! Must be 'Approved' or 'Rejected'.");
    }

    const docRef = doc(db, "budgets", budgetId);

    await updateDoc(docRef, {
      status: status,
      reviewedBy: user.uid,
      reviewedAt: new Date(),
    });

    return { success: true, message: `Budget ${status.toLowerCase()} successfully!` };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

/* =========================
   📂 FILE UPLOAD FUNCTION
   ========================= */
const uploadFile = async (file) => {
  const storageRef = ref(storage, `attachments/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      null,
      (error) => reject(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(resolve);
      }
    );
  });
};
 const getCandidateImageURL = async (candidateId) => {
  try {
    const filePath = `candidates/${candidateId}`;
    const fileRef = ref(storage, filePath);
    return await getDownloadURL(fileRef);
  } catch (error) {
    console.error("Error fetching file:", error);
    return null;
  }
};

export { auth,app, db,provider,signInWithPopup, collection, signUpUser, loginUser, submitComplaint,
  fetchComplaints, approveComplaint, rejectComplaint, logout, storage,
  addDoc, doc, updateDoc, getDocs, setDoc, ref, uploadBytes,
  getDownloadURL, fetchApprovedComplaints, fetchComplaintCount, submitCandidate,
  query, where, serverTimestamp,getCandidateImageURL };

// Export Firebase instances
export { auth, db, storage };
