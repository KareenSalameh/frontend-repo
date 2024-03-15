import React from 'react';
import './Profile.css'; // Import the CSS file

const Profile: React.FC = () => {
  // Retrieve user details from local storage
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  console.log("data ", user);
  return (
    <div className="profile-container">
      <h2 className="profile-heading">Profile</h2>
      <div className="profile-details">
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        {user.imgUrl && <img src={user.imgUrl} alt="Profile Image" className="profile-image" />}
      </div>
      <div className="back-link">
        <a href="/">Back</a>
      </div>
    </div>
  );
};

export default Profile;



// import React, { useState, useEffect } from "react";
// import { getUserData, updateUser } from "../../services/user-service";
// import "./Profile.css"; // Import the CSS file
// import { Link } from "react-router-dom";

// const Profile: React.FC = () => {
//   const [user, setUser] = useState({
//     name: "",
//     email: "",
//     password: "",
//     imgUrl: "",
//   });

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const [error, setError] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true); // Track loading state

//   useEffect(() => {
//     // Fetch user data when the component mounts
//     const fetchUserData = async () => {
//       try {
//         const userData = await getUserData();
//         setUser(userData);
//         setName(userData.name);
//         setEmail(userData.email);
//         setLoading(false); // Set loading to false after data is fetched
//       } catch (error) {
//         setError("Unable to fetch user data");
//       }
//     };

//     fetchUserData();
//   }, []);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     if (name === "name") setName(value);
//     if (name === "email") setEmail(value);
//     if (name === "password") setPassword(value);
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const updatedUserData = { name, email, password, imgUrl: user.imgUrl };
//     try {
//       // Send updated user data to the backend
//       await updateUser(updatedUserData);
//       setSuccessMessage("User data updated successfully");
//     } catch (error) {
//       setError("Failed to update user data");
//     }
//   };

//   return (
//     <div className="profile-container">
//     <h2 className="profile-heading">Profile</h2>
//     {error && <p>{error}</p>}
//     {successMessage && <p>{successMessage}</p>}
//     {loading ? (
//         <p>Loading...</p>
//     ) : (
//         <form className="profile-form" onSubmit={handleSubmit}>
//         <div>
//             <label>Name:</label>
//             <input
//             type="text"
//             name="name"
//             value={name}
//             onChange={handleChange}
//             />
//         </div>
//         <div>
//             <label>Email:</label>
//             <input
//             type="email"
//             name="email"
//             value={email}
//             onChange={handleChange}
//             />
//         </div>
//         <div>
//             <label>Password:</label>
//             <input
//             type="password"
//             name="password"
//             value={password}
//             onChange={handleChange}
//             />
//         </div>
//         <button type="submit">Update Profile</button>
//         </form>
//      )}
//      <div>
//      <div>
//     <Link to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`}>
//       Back
//     </Link>
//   </div>
//      </div>
// </div>
//   );
// };

// export default Profile;
