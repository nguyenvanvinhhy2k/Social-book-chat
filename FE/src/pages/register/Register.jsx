import "./register.css";
import { Link, useHistory  } from "react-router-dom"
import {useRef} from "react"
import axios from "axios"

export default function Register() {
  const username = useRef()
  const email = useRef()
  const password = useRef()
  const passwordAgain = useRef()
  const history = useHistory()

  const handleRegister = async (e) => {
     e.preventDefault()
     try {
      if(passwordAgain.current.value === password.current.value){
         await axios.post('/auth/register',{
          username: username.current.value,
          email: email.current.value,
          password: password.current.value,
         })
         history.push("/login");
       }else{
         passwordAgain.current.setCustomValidity("Passwords don't match!")
       }
     } catch (error) {
      console.log(error)
     }
  }
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Socialbook</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Socialbook.
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <input placeholder="Username" className="loginInput" ref={username} />
            <input placeholder="Email" className="loginInput" ref={email} />
            <input placeholder="Password" type="password" className="loginInput" ref={password}/>
            <input placeholder="Password Again" type="password" className="loginInput" ref={passwordAgain} />
            <button onClick={handleRegister} className="loginButton">Sign Up</button>
            <Link to="/login" className="loginRegisterButton">
              Log into Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
