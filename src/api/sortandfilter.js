import apifetch from "./apifetch";



// ================= SORTING =================
export const sortByPriceLowToHigh = () =>
  apifetch("/api/filter/sort-by-price");

export const sortBySize = (order = "asc") =>
  apifetch(`/api/filter/sortbysize?order=${order}`);

export const sortByLatest = () =>
  apifetch("/api/filter/sortbytime");

export const getNearestProperties = () =>
  apifetch("/api/filter/nearestproperties");
