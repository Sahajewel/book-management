import { Outlet } from "react-router-dom"
import Navbar from "./customComponents/Navbar"





function App() {


  return (
    <>
     <Navbar></Navbar>
     <Outlet></Outlet>
    </>
  )
}

export default App
