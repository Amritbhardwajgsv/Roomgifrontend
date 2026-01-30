import apifetch from "./apifetch";

export const loginUser = (formData) => {
  return apifetch("/api/user/login", {
    method: "POST",
    body: JSON.stringify(formData),
  });
};
