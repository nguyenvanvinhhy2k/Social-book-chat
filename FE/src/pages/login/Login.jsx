import "./login.css";
import { useRef, useContext } from "react"
import { loginCall } from "../../apiCall"
import { AuthContext } from "../../context/AuthContext";
import { Link  } from "react-router-dom"

export default function Login() {
   const email = useRef()
   const password = useRef()
   const { dispatch } = useContext(AuthContext);

  const handleSubmit = (e) => {
      e.preventDefault()
      loginCall({email:email.current.value, 
      password:password.current.value},dispatch)
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
          <form className="loginBox" onSubmit={handleSubmit}>
            <input placeholder="Email" className="loginInput" ref= {email} />
            <input placeholder="Password" type="password" min="6" className="loginInput" ref= {password} />
            <button className="loginButton">Log In</button>
            <span className="loginForgot">Forgot Password?</span>
            <Link to="/register" className="loginRegisterButton">
              Create a New Account
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
