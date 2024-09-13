import { useState,useEffect,useContext} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CartContext } from "./cartContext";


const ProductDetails = () => {
  const { addToCart } = useContext(CartContext);


    const [product,setProduct] = useState([])
    const {productid} = useParams();
 
  
    useEffect(() => {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/v1/product/get-productbyid/${productid}`); 
          setProduct(response.data);
        } catch (error) {
          console.error('Error fetching product:', error);
          
        }
      };
  
      fetchProduct();
    }, [productid]);

    const price = product.price


    const paymentHandler = async (event) => {
  
      const response = await axios.post(
        "http://localhost:3000/api/v1/payment/order",
        { amount: price},
      );
  
      const order = await response.data.data;
      console.log(order);
  
  
      const options = {
        key: import.meta.env.RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Nisha",
        description: "Test Transaction",
        image: "https://i.ibb.co/5Y3m33n/test.png",
        order_id: order.id,
         handler: async function (response) {
          const body = { ...response };
  
  
          const validateResponse = await axios.post(
            "http://localhost:3000/api/v1/payment/verify",
            body,
          );
  
          const jsonResponse = await validateResponse;
  
          console.log("jsonResponse", jsonResponse)
  
        },
  
        
        
        prefill: {
          name: "Nisha",
          email: "nishanaveen@example.com",
          contact: "00000000",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
  
     
      const rzp1 = new window.Razorpay(options);
  
      rzp1.on("payment.failed", function (response) {
        alert(response.error.code);
      });
  
    
      rzp1.open();
      event.preventDefault();  
    };
  

  return (
<div>
   
    <div className="row mt-3">
      <div className="col-4">
      <img src={product.image}  alt="product" />
      </div>
      <div className="col-6">
      <h2>{product.description}</h2>
      <hr/>
      <div>
      <button type="button" className="btn btn-danger" data-bs-toggle="button">Limited time deal</button>
      </div>
      <div>
        <span className="mt-3"style={{ color:"red",fontWeight:"lighter"}}>-70%</span>
        <span className="m-4 fs-3">Rs {product.price}</span>
        <div>
        <p>Inclusive of all taxes</p>
        <p><b>EMI</b> starts at ₹218. No Cost EMI available</p>
        </div>
      </div>
      <hr/>
      <div>
        <h6><b>Offers</b></h6>
        <div className="container">
  <div className="row gap-3">
    <div className="col shadow p-3 mb-5 bg-body rounded">
      <h6><b>No Coast EMI</b></h6>
      <p>Upto ₹202.60 EMI interest savings on Amazon Pay</p>
      <a className="primary text-decoration-none " href="#">1 Offer</a>
    </div>
    <div className="col order-5 shadow p-3 mb-5 bg-body rounded">
      <h6><b>Bank Offer</b></h6>
      <p>Upto ₹1,500.00 discount on select Credit Cards</p>
      <a className="primary text-decoration-none " href="#">1 Offer</a>
    </div>
    <div className="col order-1 shadow p-3 mb-5 bg-body rounded">
    <h6><b>Partner Offers</b></h6>
    <p>Get GST invoice and save up to 28% on purchases.</p>
    <a className="primary text-decoration-none " href="#">22 Offer</a>
    </div>
  </div>
</div>
<hr/>
<div>
  <h6><b>About this item</b></h6>
  <ul>
    <li>Easy to Fly: Designed for beginners, this drone offers simple controls, making it perfect for kids and first-time flyers</li>
    <li>Durable Build: Built with high-quality materials, the ToyMagic Drone is durable and resilient, able to withstand minor crashes and rough play.</li>
    <li>Aerial Tricks & Stunts: Capable of performing exciting flips and spins, the drone adds thrill to every flight session.</li>
    <li>Stable Flight Control: Equipped with advanced stabilization technology, the drone maintains smooth and steady flight, even in outdoor environments.</li>
  </ul>
</div>
<hr/>
      </div>
      <div>
      <div className="d-grid gap-2 col-6 mx-auto">
  <button className="btn btn-warning rounded" type="button" onClick={() => addToCart(product)}>Add to Cart</button>
  <button className="btn btn-warning" type="button" onClick={() =>  paymentHandler()}>Buy Now</button>
</div>
      </div>
      </div>
    </div>
    </div>
    
  )
}

export default ProductDetails
