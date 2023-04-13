import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import MainNavigation from "./components/MainNavigation/MainNavigation";
import AddNoteInput from "./components/NoteInput/AddNoteInput";
import HomePage from "./components/HomePage/HomePage";
import SignUpForm from "./components/UserAuthForms/SignUpForm";
import LoginForm from "./components/UserAuthForms/LoginForm";
import NoteDetailPage from "./components/NoteDetailPage/NoteDetailPage";
import NoteEditPage from "./components/NoteEditPage/NoteEditPage";
import { CheckAuthLoader } from "./components/utils/CheckAuth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainNavigation />,
    loader: CheckAuthLoader,
    children: [
      { index: true, element: <HomePage /> },
      { path: "note/add", element: <AddNoteInput /> },
      { path: "note/:title", element: <NoteDetailPage /> },
      { path: "note/:title/edit", element: <NoteEditPage /> },
    ],
  },
  { path: "auth/signup", element: <SignUpForm /> },
  { path: "auth/login", element: <LoginForm /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
