import React, { useRef, useState } from "react";
import classes from "./AuthForm.module.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const navigate = useNavigate();

  const showPasswordHandler = () => {
    return showPassword ? setShowPassword(false) : setShowPassword(true);
  };

  const showConfirmPasswordHandler = () => {
    return showConfirmPassword
      ? setShowConfirmPassword(false)
      : setShowConfirmPassword(true);
  };

  const submitSignupFormHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    fetch("https://note-taker-42la.onrender.com/api/users/signup", {
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
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
    navigate("../auth/login");
  };
  return (
    <div className={classes.container}>
      <form className={classes.form} onSubmit={submitSignupFormHandler}>
        <h1 className={classes["form-heading"]}>SignUp</h1>
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
              icon={showConfirmPassword ? faEye : faEyeSlash}
              onClick={showPasswordHandler}
            />
          </div>
        </div>
        <div className={`${classes["form-control"]} ${classes.password}`}>
          <input
            type={`${showConfirmPassword ? "text" : "password"}`}
            name="confirmpassword"
            id="confirmpassword"
            placeholder="Confirm Password"
            required
          />
          <div className={classes.icon}>
            <FontAwesomeIcon
              icon={showConfirmPassword ? faEye : faEyeSlash}
              onClick={showConfirmPasswordHandler}
            />
          </div>
        </div>
        <div className={classes["form-tc"]}>
          <input type="checkbox" name="tc" id="tc" required />
          <p>
            I agree with <a href="http://">Terms & Conditions</a>
          </p>
        </div>

        <div className={classes["form-action"]}>
          <button type="submit">Signup</button>
        </div>

        <div className={classes["form-check"]}>
          <p>
            Already Registered? <Link to="../auth/login">Login</Link> here
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
