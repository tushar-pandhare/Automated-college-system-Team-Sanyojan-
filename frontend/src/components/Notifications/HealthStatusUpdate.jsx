// import React, { useState } from "react";
// import { updateHealthStatus } from "./firebase4";

// const UpdateHealthStatus = () => {
//     const [regNumber, setRegNumber] = useState("");
//     const [healthStatus, setHealthStatus] = useState("");
//     const [description, setDescription] = useState("");
//     const [bedRestDays, setBedRestDays] = useState("");
//     const [message, setMessage] = useState("");

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setMessage("");

//         if (!regNumber || !healthStatus || !description || !bedRestDays) {
//             setMessage("Please fill all fields.");
//             return;
//         }

//         const response = await updateHealthStatus(regNumber, healthStatus, description, parseInt(bedRestDays));
//         if (response.success) {
//             setMessage("Health status updated successfully!");
//             setRegNumber("");
//             setHealthStatus("");
//             setDescription("");
//             setBedRestDays("");
//         } else {
//             setMessage("Error updating health status.");
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
//             <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
//                 <h2 className="text-xl font-semibold mb-4">Update Health Status</h2>

//                 {message && <p className="text-center text-blue-500">{message}</p>}

//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <input
//                         type="text"
//                         placeholder="Registration Number"
//                         value={regNumber}
//                         onChange={(e) => setRegNumber(e.target.value)}
//                         required
//                         className="w-full p-3 border rounded-lg"
//                     />
//                     <input
//                         type="text"
//                         placeholder="Health Status (e.g., Sick, Recovering)"
//                         value={healthStatus}
//                         onChange={(e) => setHealthStatus(e.target.value)}
//                         required
//                         className="w-full p-3 border rounded-lg"
//                     />
//                     <textarea
//                         placeholder="Description"
//                         value={description}
//                         onChange={(e) => setDescription(e.target.value)}
//                         required
//                         className="w-full p-3 border rounded-lg h-32"
//                     />
//                     <input
//                         type="number"
//                         placeholder="Number of Days for Bed Rest"
//                         value={bedRestDays}
//                         onChange={(e) => setBedRestDays(e.target.value)}
//                         required
//                         className="w-full p-3 border rounded-lg"
//                     />
//                     <button type="submit" className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600">
//                         Update Health Status
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default UpdateHealthStatus;


import React, { useState } from "react";
import { updateHealthStatus } from "./firebase4";

const UpdateHealthStatus = () => {
    const [regNumber, setRegNumber] = useState("");
    const [healthStatus, setHealthStatus] = useState("");
    const [description, setDescription] = useState("");
    const [bedRestDays, setBedRestDays] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        if (!regNumber || !healthStatus || !description || !bedRestDays) {
            setMessage("Please fill all fields.");
            return;
        }

        const response = await updateHealthStatus(regNumber, healthStatus, description, parseInt(bedRestDays));
        if (response.success) {
            setMessage("Health status updated successfully!");
            setRegNumber("");
            setHealthStatus("");
            setDescription("");
            setBedRestDays("");
        } else {
            setMessage("Error updating health status.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Update Health Status</h2>

                {message && <p className="text-center text-blue-500">{message}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Registration Number"
                        value={regNumber}
                        onChange={(e) => setRegNumber(e.target.value)}
                        required
                        className="w-full p-3 border rounded-lg"
                    />
                    <input
                        type="text"
                        placeholder="Health Status (e.g., Sick, Recovering)"
                        value={healthStatus}
                        onChange={(e) => setHealthStatus(e.target.value)}
                        required
                        className="w-full p-3 border rounded-lg"
                    />
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="w-full p-3 border rounded-lg h-32"
                    />
                    <input
                        type="number"
                        placeholder="Number of Days for Bed Rest"
                        value={bedRestDays}
                        onChange={(e) => setBedRestDays(e.target.value)}
                        required
                        className="w-full p-3 border rounded-lg"
                    />
                    <button type="submit" className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600">
                        Update Health Status
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateHealthStatus;
