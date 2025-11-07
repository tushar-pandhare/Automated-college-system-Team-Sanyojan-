import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LogoutButton = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const logoutUser = async () => {
            try {
                await signOut(auth); // Sign out from Firebase
                navigate("/", { replace: true }); // Redirect to login immediately
            } catch (error) {
                console.error("Logout failed:", error);
            }
        };

        logoutUser(); // Call logout function as soon as component mounts
    }, [navigate]);

    return null; // No need for a button, since it auto-executes
};

export default LogoutButton;