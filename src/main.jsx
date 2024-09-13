import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './root.jsx';
import HomePage from './HomePage.jsx';
import Payment from "./payment.jsx"
import { CartProvider } from './cartContext.jsx';
import ProductDetails from './productDetails.jsx';
import ControllerDetail from "./controllerDetail.jsx"


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children:[
       
      {
        path: "/",
        element: <HomePage/>,
      },

      {
        path: "/checkout",
        element: <Payment/>,
      },
      
      {
        path: "/:productid",
        element: <ProductDetails/>,
      },

      {
        path: "/:controllersid",
        element: <ControllerDetail />,
      },

    ]
     
  },

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
  <RouterProvider router={router} />
  </CartProvider>
  </StrictMode>,
)
