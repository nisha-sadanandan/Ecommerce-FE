import { useState,useEffect,useContext} from "react";
import axios from "axios";
import { CartContext } from "./cartContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { addToCart } = useContext(CartContext);

  const [product,setProduct] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/product/get-product'); 
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
        
      }
    };

    fetchProduct();
  }, []);

  const handleProductClick = (productid)=>{
    navigate(`/${productid}`)
  }

  return (
  <div>
    <h3 className="m-3">Drone</h3>
  <div className="d-flex flex-row bd-highlight mb-3">
  {product.map((products,index) =>(
 <div className="card m-3" style={{ width: "18rem", cursor:"pointer"}} key={index} onClick={()=>handleProductClick(products._id)} >
  <img src={products.image} className="card-img-top" alt="..." />
  <div className="card-body">
    <h5 className="card-title">{products.name}</h5>
    <p>{products.price}</p> 
    <button type="button" className="btn btn-dark" onClick={() => addToCart(products)}>
    Add to cart
</button>
</div>
</div>
))} 
</div>
</div>
 
  )
}

export default Home
