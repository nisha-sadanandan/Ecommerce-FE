import {Outlet} from "react-router-dom"
import Navbar from './navbar.jsx';

const Root = () => {
  return (
    <>
    <div>
        <Navbar/>
        <Outlet/>   
    </div>
    </>
  )
}

export default Root
