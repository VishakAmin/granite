import axios from "axios";

const signup = payload => axios.post("/users", payload);

const authApi = {
  signup,
};

export default authApi;
