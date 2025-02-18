import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
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

// Function to sign up user
const signUpUser = async (fullName, email, password) => {
  try {
    const emailRegex = /^(\d{4})([a-z]{3})(\d{3})@sggs\.sc\.in$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email format. Use YYYYbranchXXX@sggs.sc.in");
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const match = email.match(emailRegex);
    const year = match[1];
    const branch = match[2];
    const rollNumber = match[3];

    // Save user details in Firestore
    await setDoc(doc(db, "users", user.uid), {
      fullName,
      email,
      year,
      branch,
      rollNumber
    });

    return user;
  } catch (error) {
    throw error;
  }
};

// Function to log in user
const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export { auth, signUpUser, loginUser };
