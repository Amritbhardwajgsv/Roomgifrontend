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
import apifetch from "./apifetch";
export const adddetails = async (payload) => {
  return await fetch("https://roomgi-backend-0yz1.onrender.com/api/property/", {
    method: "POST",
    credentials: "include",           
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
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
