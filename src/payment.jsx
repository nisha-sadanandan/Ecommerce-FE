import axios from "axios"
import { useState,useEffect} from "react"
// import { CartContext } from "./cartContext";
// import  { useContext } from 'react';


   const Payment = () => {

    // const { cartItems } = useContext(CartContext);

    const [cart,setCart] = useState([])

    useEffect(() => {
      const fetchCart = async () => {
        try {
          const response = await axios.get('http://localhost:3000/api/v1/cart/get-cart'); 
          setCart(response.data);
        } catch (error) {
          console.error('Error fetching product:', error);
          
        }
      };
  
      fetchCart();
    }, []);

   

    const paymentHandler = async (event) => {
  
        const response = await axios.post(
          "http://localhost:3000/api/v1/payment/order",
          { amount: 5000},
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

<div className="card mb-3" style={{ maxWidth: 540 }}  >
  <div className="row g-0">
    <div className="col-md-4">
      <img src="" className="img-fluid rounded-start" alt="..." />
    </div>
    <div className="col-md-8">
      <div className="card-body">
        <h5 className="card-title"></h5>
        <p className="card-text">
          <small className="text-muted"></small>
        </p>
      </div>
    </div>
  </div>
</div>


 <div className="d-flex justify-content-center">
<button type="button" className="btn btn-warning" onClick={() =>  paymentHandler()}>
  Proceed to Pay
</button>   
</div>

</div>

   
  )
}

export default Payment
