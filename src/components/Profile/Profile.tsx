import React, { useState } from 'react';
import './Profile.css'; // Import the CSS file
const Profile: React.FC = () => {
  // Retrieve user details from local storage
  const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
  const [user, setUser] = useState(storedUser);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
    setName(user.name); // Reset name to the original value
    setEmail(user.email); // Reset email to the original value
  };

  const handleSubmit = () => {
    //await updateUser({ ...user, name, email });
    // Update user details in local storage and exit edit mode
    localStorage.setItem('user', JSON.stringify({ ...user, name, email }));
    setUser({ ...user, name, email });
    setEditMode(false);
  };

  return (
    <div className="profile-container">
      <h2 className="profile-heading">Profile</h2>
      <div className="profile-details">
        {editMode ? (
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        ) : (
          <div>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            {user.imgUrl && <img src={user.imgUrl} alt="Profile Image" className="profile-image" />}
          </div>
        )}
      </div>
      {editMode ? (
        <div className="profile-actions">
          <button onClick={handleSubmit}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div className="profile-actions">
          <button onClick={handleEdit}>Edit</button>
        </div>
      )}
      <div className="back-link">
        <a href="/">Back</a>
      </div>
    </div>
  );
};

export default Profile;


