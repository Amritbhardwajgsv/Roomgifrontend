const base_url=process.env.API_URL;
async function apifetch(endpoints,options={}){
    //const token =localStorage.getItem("token");
    const response=await fetch(base_url+endpoints,{
        headers:{
            "Content-type":"application/json",
           // ...(token&&{Authorization:`Bearer ${token}`}),
            ...options.headers,
        },
        ...options,
    });
    const data=await response.json();
    if(!response.ok){
        throw new Error(data.message||"Api request failed");
    }
    return data ;
}
// this is for fetching it 
export default apifetch;