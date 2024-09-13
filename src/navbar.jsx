import { Link } from "react-router-dom";
import cart from "../src/assets/bag.svg";
import { CartContext } from "./cartContext";
import { useContext} from 'react';


const Navbar = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">
     Shopping
    </a>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">
          
          Home
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            
            Aboutus
          </a>
        </li>
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            whats new
          </a>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" href="#">
               
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                new product
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" href="#">
                new offer
              </a>
            </li>
          </ul>
        </li>
      </ul>
      <form className="d-flex" role="search">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
         <div >  
       <Link to = "/checkout"><img src={cart}alt='cart'/>
       <span>{cartItems.length}</span>
       </Link> 
        </div> 
      </form>
    </div>
  </div>
</nav>

      
    </div>
  )
}
export default Navbar;