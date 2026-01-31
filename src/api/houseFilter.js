import apifetch from "./apifetch";

export const filterHouses = (filters) => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== "") {
      params.append(key, value);
    }
  });

  return apifetch(`/api/houses/filter?${params.toString()}`);
};
