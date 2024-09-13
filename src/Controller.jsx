import { useState,useEffect,useContext} from "react";
import axios from "axios";
import { CartContext } from "./cartContext";
import { useNavigate } from "react-router-dom";

const Controller = () => {
    const { addToCart } = useContext(CartContext);

    const [controller,setController] = useState([])
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchProduct = async () => {
        try {
          const response = await axios.get('http://localhost:3000/api/v1/receiver/get-receiver'); 
          setController(response.data);
        } catch (error) {
          console.error('Error fetching product:', error);
          
        }
      };
  
      fetchProduct();
    }, []);

    const handleProductClick = (controllersid)=>{
        navigate(`/${controllersid}`)
      }
    
    return (
        <div>
          <h3 className="m-3">Controller</h3>
        <div className="d-flex flex-row bd-highlight mb-3">
        {controller.map((controllers,index) =>(
       <div className="card m-3" style={{ width: "18rem", cursor:"pointer"}} key={index} onClick={()=>handleProductClick(controllers._id)} >
        <img src={controllers.image} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{controllers.name}</h5>
          <p>{controllers.price}</p>
          
          <button type="button" className="btn btn-dark" onClick={() => addToCart(controllers)}>
          Add to cart
      </button>
      </div>
      </div>
      
      ))} 
      </div>
      </div>
       
        )
      }    

export default Controller
