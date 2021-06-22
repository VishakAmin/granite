import axios from "axios";

axios.defaults.baseURL = "/";

export const setAuthHeaders = (setLoading = () => null) => {
  axios.defaults.headers = {
    Accept: "applicaion/json",
    "Content-Type": "application/json",
    "X-CSRF-TOKEN": document
      .querySelector('[name="csrf-token"]')
      .getAttribute("content"),
  };
  const token = JSON.parse(localStorage.getItem("authToken"));
  const email = JSON.parse(localStorage.getItem("authEmail"));
  if (token && email) {
    axios.defaults.headers["X-Auth-Email"] = email;
    axios.defaults.headers["X-Auth-Token"] = token;
  }
  setLoading(false);
};
