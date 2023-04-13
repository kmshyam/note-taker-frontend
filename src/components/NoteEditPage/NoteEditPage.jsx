import React, { useEffect, useState } from "react";
import classes from "./NoteEditPage.module.css";
import { useLocation, useNavigate } from "react-router-dom";

const NoteEditPage = () => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const noteDetails = location.state.data;

  useEffect(() => {
    setEnteredTitle(noteDetails.title);
    setEnteredDescription(noteDetails.description);
  }, [noteDetails.title, noteDetails.description]);

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const descriptionChangeHandler = (event) => {
    setEnteredDescription(event.target.value);
  };

  const submitUpdatedNoteHandler = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("TOKEN");
    fetch(`http://localhost:8080/api/notes/edit/${noteDetails._id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
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
    navigate(`..`);
  };

  return (
    <div className={classes.container}>
      <form className={classes.form} onSubmit={submitUpdatedNoteHandler}>
        <div className={classes["form-control"]}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            onChange={titleChangeHandler}
            value={enteredTitle}
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
            value={enteredDescription}
          ></textarea>
        </div>
        <div className={classes["form-action"]}>
          <button type="submit">Update Note</button>
        </div>
      </form>
    </div>
  );
};

export default NoteEditPage;
