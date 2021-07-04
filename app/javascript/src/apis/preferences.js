import axios from "axios";

const create = payload => axios.post("/preferences/", payload);

const show = userId => axios.get(`/preferences/${userId}`);

const update = ({ id, payload }) => axios.put(`/preferences/${id}`, payload);

const preferencesApi = {
  create,
  show,
  update,
};

export default preferencesApi;
