import { useState } from 'react';
import avatar from '../assets/avatar.jpg';
import './Register.css';
function Register() {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const onImgSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          setAvatarUrl(e.target.result as string);
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Register</h1>
      <p>Fill in the form below to create an account</p>
      <label className="avatar-label" htmlFor="avatar">
        <input
          id="avatar"
          type="file"
          className="avatar-input"
          onChange={onImgSelected}
        />
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="avatar"
            className="avatar-preview"
          />
        ) : (
          <img
            src={avatar}
            alt="avatar"
            className="avatar-preview"
          />
        )}
      </label>
      <input type="file" className="register-input" />
      <input type="text" className="register-input" placeholder="Username" />
      <input type="password" className="register-input" placeholder="Password" />
      <button type="button" className="register-button">Register</button>
    </div>
  );
}

export default Register;
