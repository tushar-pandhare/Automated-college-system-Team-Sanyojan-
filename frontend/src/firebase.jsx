// import { initializeApp } from "firebase/app";
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// import { getFirestore, doc, setDoc } from "firebase/firestore"; 

// const firebaseConfig = {
//   apiKey: "AIzaSyAmwJfXd-3jKEKC5IZPqkwyiChJsnp9jOs",
//   authDomain: "automated-college-system.firebaseapp.com",
//   projectId: "automated-college-system",
//   storageBucket: "automated-college-system.appspot.com",
//   messagingSenderId: "1041511667290",
//   appId: "1:1041511667290:web:114e101b2430762680aa63",
// };
// export const sendEmailVerification = async (user) => {
//   await sendEmailVerification(user);
// };

// export const getAuthUser = () => {
//   return new Promise((resolve) => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       unsubscribe();
//       resolve(user);
//     });
//   });
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);

// // Function to sign up user
// const signUpUser = async (fullName, email, password) => {
//   try {
//     const emailRegex = /^(\d{4})([a-z]{3})(\d{3})@sggs\.sc\.in$/;
//     if (!emailRegex.test(email)) {
//       throw new Error("Invalid email format. Use YYYYbranchXXX@sggs.sc.in");
//     }

//     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//     const user = userCredential.user;

//     const match = email.match(emailRegex);
//     const year = match[1];
//     const branch = match[2];
//     const rollNumber = match[3];

//     // Save user details in Firestore
//     await setDoc(doc(db, "users", user.uid), {
//       fullName,
//       email,
//       year,
//       branch,
//       rollNumber
//     });

//     return user;
//   } catch (error) {
//     throw error;
//   }
// };

// // Function to log in user
// const loginUser = async (email, password) => {
//   try {
//     const userCredential = await signInWithEmailAndPassword(auth, email, password);
//     return userCredential.user;
//   } catch (error) {
//     throw error;
//   }
// };

// export { auth, signUpUser, loginUser };
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  sendEmailVerification as sendEmailVerificationFirebase
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAmwJfXd-3jKEKC5IZPqkwyiChJsnp9jOs",
  authDomain: "automated-college-system.firebaseapp.com",
  projectId: "automated-college-system",
  storageBucket: "automated-college-system.appspot.com",
  messagingSenderId: "1041511667290",
  appId: "1:1041511667290:web:114e101b2430762680aa63",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Email validation patterns for different roles
const EMAIL_PATTERNS = {
  student: /^(20\d{2})(bcs|bce|bec|mech)(\d{3})@sggs\.ac\.in$/i,
  mtech: /^(20\d{2})(mcs|mme|mec)(\d{3})@sggs\.ac\.in$/i,
  faculty: /^[a-z]+\.[a-z]+@sggs\.ac\.in$/i,
  admin: /^admin\.[a-z]+@sggs\.ac\.in$/i,
  doctor: /^dr\.[a-z]+@sggs\.ac\.in$/i
};

// Allowed roles and their metadata
const ROLES_CONFIG = {
  student: { branches: ['bcs', 'bce', 'bec', 'mech'] },
  mtech: { branches: ['mcs', 'mme', 'mec'] },
  faculty: { departments: ['CSE', 'ME', 'ECE'] },
  admin: { accessLevel: 3 },
  doctor: { medicalLicense: true }
};

const validateEmailForRole = (email, role) => {
  const pattern = EMAIL_PATTERNS[role];
  if (!pattern) throw new Error('Invalid role specified');
  return pattern.test(email);
};

export const sendEmailVerification = async (user) => {
  await sendEmailVerificationFirebase(user);
};

export const getAuthUser = () => {
  return new Promise((resolve) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    });
  });
};

const signUpUser = async (fullName, email, password, role) => {
  try {
    // Validate role
    if (!ROLES_CONFIG[role]) {
      throw new Error('Invalid user role');
    }

    // Validate email format
    if (!validateEmailForRole(email, role)) {
      throw new Error(`Invalid email format for ${role}. Example: ${getEmailExample(role)}`);
    }

    // Create user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Extract user details from email
    const userData = { fullName, email, role };
    const emailMatch = email.match(EMAIL_PATTERNS[role]);
    
    if (['student', 'mtech'].includes(role)) {
      userData.year = emailMatch[1];
      userData.branch = emailMatch[2].toUpperCase();
      userData.rollNumber = emailMatch[3];
    }

    // Save additional data to Firestore
    await setDoc(doc(db, "users", user.uid), userData);

    // Send verification email
    await sendEmailVerification(user);

    return user;
  } catch (error) {
    throw new Error(`Registration failed: ${error.message}`);
  }
};

const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Add role verification here if needed
    return user;
  } catch (error) {
    throw new Error(`Login failed: ${error.message}`);
  }
};

// Helper function for email examples
const getEmailExample = (role) => {
  const examples = {
    student: '2024bcs001@sggs.ac.in',
    mtech: '2024mcs001@sggs.ac.in',
    faculty: 'john.doe@sggs.ac.in',
    admin: 'admin.jane@sggs.ac.in',
    doctor: 'dr.smith@sggs.ac.in'
  };
  return examples[role];
};

export { auth, db, signUpUser, loginUser };