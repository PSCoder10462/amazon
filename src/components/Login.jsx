import React, { useState } from "react";
import "../assets/css/Login.css";
import amazon_black from "../assets/images/amazon_black.png";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState(""),
    [pass, setPass] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(pass);
  };

  const register = (e) => {
    e.preventDefault();
    // firebase
    //   .auth()
    //   .createUserWithEmailAndPassword(email, pass)
    //   .then(() => {
    //     // window.location.pathname = "/";
    //     alert("success");
    //   })
    //   .catch((error) => {
    //     // let errorCode = error.code;
    //     let errorMessage = error.message;
    //     console.log(errorMessage);
    //   });
  };

  return (
    <div className="login">
      <Link to="/">
        <img src={amazon_black} className="login__logo" alt="amazon" />
      </Link>

      <div className="login__container">
        <h1>Sign-In</h1>
        <form>
          <h5>E-mail</h5>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
            required
          />
          <h5>Password</h5>
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            autoComplete="current-password"
            required
          />
          <button
            className="login__signInButton"
            type="submit"
            onClick={signIn}
          >
            Sign In
          </button>
        </form>
        <p>
          By signing-in you agree to Amazon's FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads
        </p>
        <button className="login__registerButton" onClick={register}>
          Create your Amazon account
        </button>
      </div>
    </div>
  );
}

export default Login;
