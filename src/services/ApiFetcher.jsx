import axios from "axios";
let results = 10;

axios.defaults.baseURL = "https://randomuser.me/";

const defaultContactsFetcher = async (page = 1) => {
  const requestLink = `/api/?page=${page}&results=${results}`;
  const response = await axios.get(requestLink);
  return response.data.results;
};

export default {
  defaultContactsFetcher,
};
