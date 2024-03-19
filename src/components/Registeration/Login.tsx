import { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory
import './Login.css';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { Link } from 'react-router-dom';
import { loginUser } from '../../services/user-service'; // Import loginUser function

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const history = useHistory(); // Initialize useHistory hook

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const handleLogin = async () => {
    setEmailError("");
    setPasswordError("");
  
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
  
    if (password.length < 3) {
      setPasswordError("Password must be at least 3 characters long.");
      return;
    }
  
    try {
      await loginUser(email, password);
      // console.log("User data:", user);
      // console.log("name" , user.name)
      // if (user && user._id) {
      //   const userId = user._id;
      //   console.log("User registered with ID:", userId);
      //   localStorage.setItem('name', user.name);
      //   localStorage.setItem('user', JSON.stringify(user));
      // } else {
      //   console.error("Error Login user: User or user ID is undefined");
      // }
  
      history.push('/');
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Login error:", error);
      if (error.response && error.response.status === 401) {
        alert("Invalid email or password. Please try again.");
      } else {
        // Other errors
        alert("An error occurred. Please try again later.");
      }
    }
  };

  const validateEmail = (email: string) => {
    const emailPattern = /\S+@\S+\.\S+/;
    return emailPattern.test(email);
  };

  const onGoogleLoginSuccess = async (credentialResponse: CredentialResponse) => {
    console.log("Google login successful:", credentialResponse);
  };

  const onGoogleLoginFailure = () => {
    console.log("Google login failed");
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <input
        ref={emailInputRef}
        type="email"
        className="login-input"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {emailInputRef.current?.value && !emailInputRef.current.value.includes('@') && ( <p className="text-white">Invalid email</p>)}
      <input
        ref={passwordInputRef}
        type="password"
        className="login-input"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {passwordInputRef.current?.value && passwordInputRef.current.value.length < 3 && passwordInputRef.current.value.length > 20 && 
      (<p className="text-white">Password must be between 3 to 20 letters</p>)}
      {passwordError && <p className="error-message">{passwordError}</p>}
      <button type="button" className="login-button" onClick={handleLogin}>Login</button>
      <div className='google'>
        <GoogleLogin onSuccess={onGoogleLoginSuccess} onError={onGoogleLoginFailure} />
      </div>
      <Link to="/register" className="register-link">Don't have an account? Register here.</Link>
    </div>
  );
}

export default Login;
