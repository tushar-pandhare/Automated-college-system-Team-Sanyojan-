// import { initializeApp } from "firebase/app";
// import { getFirestore, doc, setDoc, updateDoc, getDoc } from "firebase/firestore";

// // 🔹 Firebase Configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAmwJfXd-3jKEKC5IZPqkwyiChJsnp9jOs",
//   authDomain: "automated-college-system.firebaseapp.com",
//   projectId: "automated-college-system",
//   storageBucket: "automated-college-system.appspot.com",
//   messagingSenderId: "1041511667290",
//   appId: "1:1041511667290:web:114e101b2430762680aa63",
// };

// // 🔹 Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// /**
//  * ✅ Create or Update Health Status based on Registration Number
//  * @param {string} regNumber - Student's registration number
//  * @param {string} healthStatus - Health condition
//  * @param {string} description - Additional health details
//  * @param {number} bedRestDays - Days for bed rest
//  */
// const updateHealthStatus = async (regNumber, healthStatus, description, bedRestDays) => {
//   try {
//     const docRef = doc(db, "healthRecords", regNumber);
//     const docSnap = await getDoc(docRef);

//     if (docSnap.exists()) {
//       // Update existing record
//       await updateDoc(docRef, {
//         healthStatus,
//         description,
//         bedRestDays,
//         updatedAt: new Date()
//       });
//       console.log("✅ Health status updated successfully.");
//     } else {
//       // Create a new record
//       await setDoc(docRef, {
//         regNumber,
//         healthStatus,
//         description,
//         bedRestDays,
//         createdAt: new Date()
//       });
//       console.log("✅ New health record created successfully.");
//     }
//     return { success: true };
//   } catch (error) {
//     console.error("❌ Error updating health status:", error);
//     return { success: false, error: error.message };
//   }
// };

// /**
//  * ✅ Fetch Health Status based on Registration Number
//  * @param {string} regNumber - Student's registration number
//  * @returns {object} - Health record details or error
//  */
// const getHealthStatus = async (regNumber) => {
//   try {
//     const docRef = doc(db, "healthRecords", regNumber);
//     const docSnap = await getDoc(docRef);

//     if (docSnap.exists()) {
//       console.log("✅ Health record found:", docSnap.data());
//       return { success: true, data: docSnap.data() };
//     } else {
//       console.log("❌ No health record found for this registration number.");
//       return { success: false, message: "No record found." };
//     }
//   } catch (error) {
//     console.error("❌ Error fetching health status:", error);
//     return { success: false, error: error.message };
//   }
// };

// export { db, updateHealthStatus, getHealthStatus };


// import { initializeApp } from "firebase/app";
// import { getFirestore, doc, setDoc, updateDoc, getDoc } from "firebase/firestore";

// // 🔹 Firebase Configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAmwJfXd-3jKEKC5IZPqkwyiChJsnp9jOs",
//   authDomain: "automated-college-system.firebaseapp.com",
//   projectId: "automated-college-system",
//   storageBucket: "automated-college-system.appspot.com",
//   messagingSenderId: "1041511667290",
//   appId: "1:1041511667290:web:114e101b2430762680aa63",
// };

// // 🔹 Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// /**
//  * ✅ Create or Update Health Status based on Registration Number
//  * @param {string} regNumber - Student's registration number
//  * @param {string} healthStatus - Health condition
//  * @param {string} description - Additional health details
//  * @param {number} bedRestDays - Days for bed rest
//  */
// const updateHealthStatus = async (regNumber, healthStatus, description, bedRestDays) => {
//   try {
//     const docRef = doc(db, "healthRecords", regNumber);
//     const docSnap = await getDoc(docRef);

//     if (docSnap.exists()) {
//       // Update existing record
//       await updateDoc(docRef, {
//         healthStatus,
//         description,
//         bedRestDays,
//         updatedAt: new Date()
//       });
//       console.log("✅ Health status updated successfully.");
//     } else {
//       // Create a new record
//       await setDoc(docRef, {
//         regNumber,
//         healthStatus,
//         description,
//         bedRestDays,
//         createdAt: new Date()
//       });
//       console.log("✅ New health record created successfully.");
//     }
//     return { success: true };
//   } catch (error) {
//     console.error("❌ Error updating health status:", error);
//     return { success: false, error: error.message };
//   }
// };

// /**
//  * ✅ Fetch Health Status based on Registration Number
//  * @param {string} regNumber - Student's registration number
//  * @returns {object} - Health record details or error
//  */
// const getHealthStatus = async (regNumber) => {
//   try {
//     const docRef = doc(db, "healthRecords", regNumber);
//     const docSnap = await getDoc(docRef);

//     if (docSnap.exists()) {
//       console.log("✅ Health record found:", docSnap.data());
//       return { success: true, data: docSnap.data() };
//     } else {
//       console.log("❌ No health record found for this registration number.");
//       return { success: false, message: "No record found." };
//     }
//   } catch (error) {
//     console.error("❌ Error fetching health status:", error);
//     return { success: false, error: error.message };
//   }
// };

// export { db, updateHealthStatus, getHealthStatus };

// import { getFirestore, collection, doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
// import { app } from "../../firebase";

// const db = getFirestore(app);

// /**
//  * ✅ Fetch all health status records
//  */
// export const fetchHealthStatuses = async () => {
//   try {
//     const querySnapshot = await getDocs(collection(db, "healthRecords"));
//     const data = querySnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));
//     return { success: true, data };
//   } catch (error) {
//     console.error("Error fetching health statuses:", error);
//     return { success: false, error };
//   }
// };

// /**
//  * ✅ Create or Update Health Status based on Registration Number
//  */
// export const updateHealthStatus = async (regNumber, healthStatus, description, bedRestDays) => {
//   try {
//     const docRef = doc(db, "healthRecords", regNumber);
//     const docSnap = await getDoc(docRef);

//     if (docSnap.exists()) {
//       // Update existing record
//       await updateDoc(docRef, {
//         healthStatus,
//         description,
//         bedRestDays,
//         updatedAt: new Date(),
//       });
//       console.log("✅ Health status updated successfully.");
//     } else {
//       // Create new record
//       await setDoc(docRef, {
//         regNumber,
//         healthStatus,
//         description,
//         bedRestDays,
//         createdAt: new Date(),
//       });
//       console.log("✅ New health record created successfully.");
//     }
//     return { success: true };
//   } catch (error) {
//     console.error("❌ Error updating health status:", error);
//     return { success: false, error: error.message };
//   }
// };

import { collection, doc, getDocs, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase"; // import your central firebase

// Fetch all health status records
export const fetchHealthStatuses = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "healthRecords"));
    const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return { success: true, data };
  } catch (error) {
    console.error("Error fetching health statuses:", error);
    return { success: false, error };
  }
};

// Create or update health status by registration number
export const updateHealthStatus = async (regNumber, healthStatus, description, bedRestDays) => {
  try {
    const docRef = doc(db, "healthRecords", regNumber);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await updateDoc(docRef, { healthStatus, description, bedRestDays, updatedAt: new Date() });
    } else {
      await setDoc(docRef, { regNumber, healthStatus, description, bedRestDays, createdAt: new Date() });
    }

    return { success: true };
  } catch (error) {
    console.error("Error updating health status:", error);
    return { success: false, error: error.message };
  }
};
