import { useState } from "react";
import './Register.css';
import { BrowserRouter, Link } from 'react-router-dom'; // Import Link from react-router-dom

function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');

  const handleSignUp = () => {
    // Here you can add your sign-up logic, like sending data to a server
    // For simplicity, let's just navigate to the login page after sign-up
    // You can replace this with your actual sign-up logic 

    // After successful sign-up, navigate to the login page
    //navigate('/login');

  };

  return (
    <BrowserRouter>
    <div className="registration-container">
      <h2>Sign Up</h2>
      <form className="registration-form" onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      
      {/* Add Link to navigate to the login page */}
      <div>
        
        Already have an account? <Link to="/login">Log in</Link>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default Register;
