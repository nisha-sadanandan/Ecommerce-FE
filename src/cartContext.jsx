
import { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (products) => {
    setCartItems(prevItems => {
      const itemInCart = prevItems.find(item => item.product._id === products._id);
      if (itemInCart) {
        return prevItems.map(item =>
          item.product._id === products._id ? { ...item, quantity: item.quantity + 1 } : item
        );


      } else {
        return [...prevItems, { products, quantity: 1 }];
      }
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
