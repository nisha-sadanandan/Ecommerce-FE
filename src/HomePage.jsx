import Home from "./home"
import { Outlet } from "react-router-dom"
import Controller from "./Controller.jsx"
import Footer from "./Footer"

const HomePage = () => {
  return (
    <div>
        <Home/>
        <Outlet/>
        <Controller/>
        <Footer/>
      
    </div>
  )
}

export default HomePage
