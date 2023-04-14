import React from "react";
import classes from "./NoteDetailPage.module.css";
import { useLocation, useNavigate } from "react-router-dom";

const NoteDetailPage = () => {
  const location = useLocation();
  const noteDetails = location.state.data;
  const navigate = useNavigate();

  const deleteNoteHandler = () => {
    const token = localStorage.getItem("TOKEN");
    fetch(
      `https://note-taker-42la.onrender.com/api/notes/delete/${noteDetails._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }
    )
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

  const updateNoteHandler = () => {
    navigate("edit", {
      state: {
        data: noteDetails,
      },
    });
  };

  return (
    <div className={classes.container}>
      <section className={classes.title}>
        <h2>{noteDetails.title}</h2>
      </section>
      <section className={classes.description}>
        <p>{noteDetails.description}</p>
      </section>
      <section className={classes.actions}>
        <button onClick={deleteNoteHandler}>Delete</button>
        <button onClick={updateNoteHandler}>Update</button>
      </section>
    </div>
  );
};

export default NoteDetailPage;
