import React, { useState } from "react";
import classes from "./AddNoteInput.module.css";
import { useNavigate } from "react-router-dom";

const AddNoteInput = () => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const navigate = useNavigate();

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const descriptionChangeHandler = (event) => {
    setEnteredDescription(event.target.value);
  };

  const submitNoteHandler = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("TOKEN");
    fetch("http://localhost:8080/api/notes/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        title: enteredTitle,
        description: enteredDescription,
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
    navigate("/");
  };

  return (
    <div className={classes.container}>
      <form className={classes.form} onSubmit={submitNoteHandler}>
        <div className={classes["form-control"]}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            onChange={titleChangeHandler}
          />
        </div>
        <div className={classes["form-control"]}>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            rows="9"
            placeholder="What's on your mind?"
            onChange={descriptionChangeHandler}
          ></textarea>
        </div>
        <div className={classes["form-action"]}>
          <button type="submit">Add Note</button>
        </div>
      </form>
    </div>
  );
};

export default AddNoteInput;
