import { app } from "./firebaseConfig"; 
import { doc, setDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

// Function to add user data
const addUserData = async (userId, data) => {
  try {
    await setDoc(doc(db, "users", userId), data);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

// Function to get user data
const getUserData = async (userId) => {
  const docSnap = await getDoc(doc(db, "users", userId));
  return docSnap.exists() ? docSnap.data() : null;
};

// Function to update user data
const updateUserData = async (userId, newData) => {
  try {
    await updateDoc(doc(db, "users", userId), newData);
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};

// Function to delete user data
const deleteUserData = async (userId) => {
  try {
    await deleteDoc(doc(db, "users", userId));
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};

export { addUserData, getUserData, updateUserData, deleteUserData };
 