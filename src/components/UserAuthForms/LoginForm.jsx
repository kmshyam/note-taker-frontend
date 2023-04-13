import React, { useRef, useState } from "react";
import classes from "./AuthForm.module.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const navigate = useNavigate();

  const showPasswordHandler = () => {
    return showPassword ? setShowPassword(false) : setShowPassword(true);
  };

  const submitLoginFormHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    fetch("http://localhost:8080/api/users/signin", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("TOKEN", data.token);
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className={classes.container}>
      <form className={classes.form} onSubmit={submitLoginFormHandler}>
        <h1 className={classes["form-heading"]}>Login</h1>
        <div className={`${classes["form-control"]} ${classes.email}`}>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            ref={emailInputRef}
            required
          />
        </div>
        <div className={`${classes["form-control"]} ${classes.password}`}>
          <input
            type={`${showPassword ? "text" : "password"}`}
            name="password"
            id="password"
            placeholder="Password"
            ref={passwordInputRef}
            required
          />
          <div className={classes.icon}>
            <FontAwesomeIcon
              icon={showPassword ? faEye : faEyeSlash}
              onClick={showPasswordHandler}
            />
          </div>
        </div>
        <div className={classes["form-action"]}>
          <button type="submit">Login</button>
        </div>
        <div className={classes["form-check"]}>
          <p>
            New User? <Link to="../auth/signup">Register</Link> here
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
