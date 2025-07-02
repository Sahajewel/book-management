import { Outlet } from "react-router-dom"
import Navbar from "./customComponents/Navbar"
import { Toaster } from "sonner"


function App() {
  return (
    <>
     <Navbar></Navbar>
     <Outlet></Outlet>
    <Toaster richColors position="top-right"></Toaster>
    </>
  )
}

export default App
