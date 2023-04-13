import React from "react";
import classes from "./MainNavigation.module.css";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faFileExport,
  faHome,
  faPlus,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";

const MainNavigation = () => {
  const navigate = useNavigate();
  const deleteAllNotesHandler = () => {
    const token = localStorage.getItem("TOKEN");
    fetch(`http://localhost:8080/api/notes/delete/notes/all`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
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
  };

  const exportPdfHandler = () => {
    const token = localStorage.getItem("TOKEN");
    fetch(`http://localhost:8080/api/notes/export/pdf`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "Notes.pdf";
        document.body.appendChild(a);
        a.click();
        a.remove();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const logoutHandler = () => {
    localStorage.removeItem("TOKEN");
    navigate("../auth/login");
  };

  return (
    <>
      <section className={classes.navbar}>
        <ul className={classes["navbar-lists"]}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? classes.active : "")}
            >
              <div>
                <FontAwesomeIcon icon={faHome} />
              </div>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="note/add"
              className={({ isActive }) => (isActive ? classes.active : "")}
            >
              <div>
                <FontAwesomeIcon icon={faPlus} />
              </div>
              Add Note
            </NavLink>
          </li>
          <li>
            <div
              className={classes["list-item"]}
              onClick={deleteAllNotesHandler}
            >
              <div>
                <FontAwesomeIcon icon={faClose} />
              </div>
              <p>Delete All</p>
            </div>
          </li>
          <li>
            <div className={classes["list-item"]} onClick={exportPdfHandler}>
              <div>
                <FontAwesomeIcon icon={faFileExport} />
              </div>
              <p>Export</p>
            </div>
          </li>

          <li className={classes.logout}>
            <div className={classes["list-item"]} onClick={logoutHandler}>
              <div>
                <FontAwesomeIcon icon={faPowerOff} />
              </div>
              <p>Logout</p>
            </div>
          </li>
        </ul>
      </section>
      <section className={classes["main-section"]}>
        <Outlet />
      </section>
    </>
  );
};

export default MainNavigation;
