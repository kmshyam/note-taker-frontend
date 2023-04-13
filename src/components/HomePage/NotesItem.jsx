import React from "react";
import classes from "./NotesItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faFile } from "@fortawesome/free-solid-svg-icons";

const NotesItem = (props) => {
  const { createdAt, description, title, _id } = props.note;
  const dateStr = new Date(`${createdAt}`);
  const optionsDate = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  const optionsTime = {
    hour12: true,
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const date = dateStr.toLocaleString("en-US", optionsDate);
  const time = dateStr.toLocaleString("en-US", optionsTime);

  const noteDescription = (description) => {
    let descript;
    if (description.length > 160) {
      descript = description.slice(0, 160) + "...";
    } else {
      descript = description;
    }
    return descript;
  };

  const clickNoteHandler = () => {
    props.onClick(_id);
  };

  return (
    <li className={classes.list} onClick={clickNoteHandler}>
      <section className={classes["date-section"]}>
        <div>
          <FontAwesomeIcon icon={faClock} />
        </div>
        <p>{date}</p>
        <p>{time}</p>
      </section>
      <section className={classes["notes-detail-section"]}>
        <div className={classes.title}>
          <div>
            <FontAwesomeIcon icon={faFile} />
          </div>
          <h3>{title}</h3>
        </div>
        <div className={classes.description}>
          <p>{noteDescription(description)}</p>
        </div>
      </section>
    </li>
  );
};

export default NotesItem;
