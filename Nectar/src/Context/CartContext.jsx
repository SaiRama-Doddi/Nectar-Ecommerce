// src/Context/CartContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id && i.quantity < 8 ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const increaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity < 8 ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const getQuantity = (id) => {
    const found = cartItems.find((item) => item.id === id);
    return found ? found.quantity : 0;
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCartItems([]);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
const totalDistinctItems = cartItems.length;


  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        totalItems,
         totalPrice,       // <-- add here
    totalDistinctItems,  // <-- add here
        getQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// AuthContext (inside CartContext.js)
const AuthContext = createContext();

// 2. Export the hook to use the context
export const useAuth = () => useContext(AuthContext);

// 3. Create the AuthProvider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Try to get user from localStorage on first load
    const savedUser = localStorage.getItem("user");
    return savedUser
      ? JSON.parse(savedUser)
      : {
        id:"",
          email: "",
          name: "",
          address: "",
          landmark: "",
          pincode: "",
          state:""
        };
  });

  // 4. Save user data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  // 5. Login method — sets user data
  const login = (userData) => {
    setUser({
      id: userData.id || "",
      email: userData.email || "",
      mobile: userData.mobile || "",
      name: userData.name || "",
      address: userData.address || "",
      landmark: userData.landmark || "",
      pincode: userData.pincode || "",
      state:userData.state || ""
    });
  };

  // 6. Logout method — clears user data
  const logout = () => {
    setUser({

      name: "",
      address: "",
      landmark: "",
      pincode: "",
    });
    localStorage.removeItem("user");
  };

  // 7. Check if user is logged in (basic check for name or all fields)
  const isLoggedIn =
    user &&
    (user.name || user.address || user.landmark || user.pincode);

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
