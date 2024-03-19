import { useState, useRef } from 'react';
import avatar from '../../assets/ava.png';
import './Register.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { uploadPhoto } from '../../services/file-service';
import { registerUser, GoogleSignin, IUser } from '../../services/user-service';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { Link, useHistory } from 'react-router-dom'; // Import useHistory hook

function Register() {
  const [ImgSrc, setImg] = useState<File>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const history = useHistory(); // Initialize useHistory hook

  const onImgSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    if (event.target.files && event.target.files.length > 0) {
      const newUrl = event.target.files[0];
      setImg(newUrl);
    }
  };

  const onRegister = async () => {
    const url = await uploadPhoto(ImgSrc!);
    console.log("upload returned: " + url);
    if (nameInputRef.current?.value && emailInputRef.current?.value &&
        passwordInputRef.current?.value) {
        const user: IUser = {
            name: nameInputRef.current?.value,
            email: emailInputRef.current?.value,
            password: passwordInputRef.current?.value,
            imgUrl: url
        };
        try {
            await registerUser(user)
                .then(res => {
                    if (res) {
                        const userId = res._id; 
                        const access = res.accessToken;
                        const refresh = res.refreshToken;
                        console.log("User registered with ID:", userId);
                        console.log("User registered with access:", access);
                        console.log("User registered with refresh:", refresh);

                        localStorage.setItem('userId', userId as string);
                        localStorage.setItem('access', access as string);
                        localStorage.setItem('refresh', refresh as string);

                        user._id = userId;
                    } else {
                        console.error("Error registering user: Response is undefined");
                    }
                })
                .catch(err => {
                    console.error("Error registering user:", err);
                });
            localStorage.setItem('user', JSON.stringify(user));
            history.push('/login');
        } catch (e) {
            console.log("Registration error", e);
        }
    }
};




  const selectImg = () => {
    console.log('Select Img');
    fileInputRef.current?.click();
  };
  const onGoogleLoginSuccess = async (credentialResponse: CredentialResponse) => {
    console.log(credentialResponse);
    try {
      const res = await GoogleSignin(credentialResponse);
      console.log(res);
      history.push('/');
    } catch (e) {
      console.log(e);
    }
  };
  const onGoogleLoginFailure = () => {
    console.log("Google login Failed");
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Register</h1>
      <div className="d-flex justify-content-center position-relative">
        <input ref={fileInputRef} id="avatar" type="file" className="avatar-input" onChange={onImgSelected} />
        {ImgSrc ? (<img src={URL.createObjectURL(ImgSrc)} alt="avatar" className="avatar-preview" />) : (
          <img src={avatar} alt="avatar" className="avatar-preview" />)}
        <button type="button" className="btn position-absolute bottom-0 end-0" onClick={selectImg}>
          <FontAwesomeIcon icon={faImage} className='fa-xl' />
        </button>
      </div>

      <input ref={nameInputRef} type="text" className="register-input" placeholder="Full Name" />
      <input ref={emailInputRef} type="email" className="register-input" placeholder="Email" />
      <input ref={passwordInputRef} type="password" className="register-input" placeholder="Password" />
      <button type="button" className="register-button" onClick={onRegister}>Register</button>

      <div className='google'>
        <GoogleLogin onSuccess={onGoogleLoginSuccess} onError={onGoogleLoginFailure} />
        
      </div>
      <Link to="/login" className='link'>Already have an account? Login here.</Link>

    </div>
  );
}

export default Register;
