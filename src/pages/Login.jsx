import { Link } from "react-router";

export default function Login() {



  
// add the code for storing tokens here 
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Login</h1>
      <form className="flex  flex-col gap-3">
        <input
          placeholder="Email"
          className="border p-3 rounded-lg"
          required
          id="username"
        ></input>
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          required
          id="Email"
        ></input>
        <button className="bg-slate-600 text-white p-3 rounded-lg uppercase hover:opacity-95">
          Login
        </button>
      </form>
      <div className=" mt-4">
        <p>
          {" "}
          Have not account?
          <Link to={"/signup"}>
            <span className="text-blue-700"> SignUp</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
