import apifetch from "./apifetch";
// get property by house id 
export const getpropertybyid=(id)=>{
    return apifetch(`/api/property/${id}`);
}
// export  property by username 
export const getpropertybyownername=(ownername)=>{
    return apifetch(`/api/property/getbyname?ownername=${ownername}`);
}
// delete by user id
export const deletebyid = (house_id) => {
  return apifetch(`/api/property/delete/${house_id}`, {
    method: "DELETE"
  });
};

// post request 
// src/api/propertyapi.js

const BASE_URL = "https://roomgi-backend-0yz1.onrender.com";

export const adddetails = async (payload) => {
  const token = localStorage.getItem("token"); // JWT token

  const res = await fetch(`${BASE_URL}/api/property/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data;
};




export const updatedetails = (body) => {
    return apifetch("/api/property/update", {
        method: "PATCH",
        body: JSON.stringify(body)
    });
};
export const getpropertybybrokername = () => {
  return apifetch("/api/property/getbybrokername");
};
