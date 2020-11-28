const baseUrl = "https://randomuser.me/";

const defaultContactsFetcher = (page = 1) => {
  return fetch(`${baseUrl}/api/?page=${page}&results=10`).then((response) =>
    response.json()
  );
};

export default {
  defaultContactsFetcher,
};
