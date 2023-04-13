import { redirect } from "react-router-dom";

export const CheckAuthLoader = () => {
  const token = localStorage.getItem("TOKEN");
  if (!token) {
    return redirect("auth/login");
  }
  return null;
};
