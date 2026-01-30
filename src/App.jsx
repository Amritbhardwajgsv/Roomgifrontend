import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup.jsx";
import Profile from "./pages/Profile";
import Header from "./components/Header"
import Layout from "./Dashboard/dashboardlayout.jsx"
import AddProperty from "./Dashboard/pages/addproperty.jsx";
import MyProperties from "./Dashboard/pages/myproperties.jsx";
import Dashboard from "./Dashboard/pages/dashboard.jsx";
import Myprofiles from "./Dashboard/pages/myprofile.jsx";
import ProtectedRoute from "./routes/brokerprotection.js";

export default function App() {



  return (
    <BrowserRouter>
    {/* <Header/> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />

<Route element={<ProtectedRoute/>}>
        <Route path="/broker" element={<Layout/>}>
        {/*we will nest from here*/}
        
          <Route index element={<Dashboard />} />
          
        <Route path="add-property" element={<AddProperty/>}></Route>
        <Route path="my-properties" element={<MyProperties/>}></Route>
        <Route path="my-profile" element={<Myprofiles/>}></Route>
     
        </Route>
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}
