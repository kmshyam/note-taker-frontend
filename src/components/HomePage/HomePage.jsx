import React, { useEffect, useState } from "react";
import classes from "./HomePage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import NotesItem from "./NotesItem";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchedNotes, setSearchedNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/notes`, {
          method: "GET",
          headers: {
            Authorization: token,
          },
        });
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setNotes(responseData);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  const clickNoteHandler = (id) => {
    const token = localStorage.getItem("TOKEN");
    fetch(`http://localhost:8080/api/notes/${id}`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        navigate(`note/${data.title}`, {
          state: {
            data: data,
          },
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const searchInputHandler = (event) => {
    setSearchValue(event.target.value);
  };

  const submitSearchHandler = (event) => {
    event.preventDefault();
    if (searchValue === "") {
      setSearchedNotes([]);
      return;
    }
    const token = localStorage.getItem("TOKEN");
    fetch(`http://localhost:8080/api/notes/search/${searchValue}`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setSearchedNotes(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className={classes.container}>
      <section className={classes["search-section"]}>
        <form className={classes.form} onSubmit={submitSearchHandler}>
          <div className={classes["form-control"]}>
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search !"
              onChange={searchInputHandler}
              value={searchValue}
            />
          </div>
          <div className={classes["form-action"]}>
            <button type="submit">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </form>
      </section>
      <section className={classes["notes-section"]}>
        <ul>
          {searchedNotes.length === 0 && notes.length === 0 && !searchValue && (
            <h1 className={classes.message}>
              No Notes found! Add some note <Link to="note/add">here</Link>
            </h1>
          )}

          {searchedNotes.length === 0 && searchValue && (
            <h1 className={classes.message}>
              No notes found with your search!
            </h1>
          )}

          {searchedNotes.length !== 0 &&
            searchValue &&
            searchedNotes.map((note) => (
              <NotesItem
                key={Math.random().toString()}
                note={note}
                onClick={clickNoteHandler}
              />
            ))}

          {searchedNotes.length === 0 &&
            !searchValue &&
            notes.map((note) => (
              <NotesItem
                key={Math.random().toString()}
                note={note}
                onClick={clickNoteHandler}
              />
            ))}
        </ul>
      </section>
    </div>
  );
};

export default HomePage;
