import Sidebar from"./components/sidebar";
import { Outlet } from "react-router";
import Header from "./components/header";// ye dashboard ka header hai 
export default function Layout(){
    return(
    <>
    <div className="flex h-screen w-full bg-slate-300">
    <div className="w-64 bg-slate-600 text-shadow-white">
    <Sidebar/>
    </div>
    <div className="flex flex-col flex-1 overflow-hidden">
        <div className="h-16 bg-blue-50  border-b flex items-center px-6 shadow-sm">
        <Header/>
        </div> 
  <div className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </div>
    </div>
    </div>
        </>
    )
}