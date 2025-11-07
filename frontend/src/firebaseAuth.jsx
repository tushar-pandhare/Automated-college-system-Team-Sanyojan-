import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { app } from "./firebaseConfig"; 
// Email validation patterns
const EMAIL_PATTERNS = {
  student: /^(20\d{2})(bcs|bce|bec|mech)(\d{3})@sggs\.ac\.in$/i,
  mtech: /^(20\d{2})(mcs|mme|mec)(\d{3})@sggs\.ac\.in$/i,
  faculty: /^[a-z]+\.[a-z]+@sggs\.ac\.in$/i,
  admin: /^admin\.[a-z]+@sggs\.ac\.in$/i,
  doctor: /^dr\.[a-z]+@sggs\.ac\.in$/i,
};

// Validate email based on role
const validateEmailForRole = (email, role) => EMAIL_PATTERNS[role]?.test(email);

const signUpUser = async (fullName, email, password, role) => {
  try {
    if (!validateEmailForRole(email, role)) {
      throw new Error(`Invalid email format for ${role}. Example: ${getEmailExample(role)}`);
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Extract user details
    const userData = { fullName, email, role };
    const emailMatch = email.match(EMAIL_PATTERNS[role]);
    
    if (['student', 'mtech'].includes(role)) {
      userData.year = emailMatch[1];
      userData.branch = emailMatch[2].toUpperCase();
      userData.rollNumber = emailMatch[3];
    }

    // Save additional data in Firestore
    await setDoc(doc(db, "users", user.uid), userData);

    // Send email verification
    await sendEmailVerification(user);

    return user;
  } catch (error) {
    throw new Error(`Registration failed: ${error.message}`);
  }
};

const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw new Error(`Login failed: ${error.message}`);
  }
};

const logoutUser = async () => {
  await signOut(auth);
};

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

export { signUpUser, loginUser, logoutUser };
