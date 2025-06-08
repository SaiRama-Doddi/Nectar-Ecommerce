import React, { useState, useEffect } from "react";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import Navbar from "../Component/Navbar";
import Header from "../Component/Header";
import { useCart } from '../Context/CartContext';
import { useAuth } from '../Context/CartContext';
import axios from "axios";

const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalItems,
    totalPrice,
    totalDistinctItems,
  } = useCart();

  const { user, isLoggedIn } = useAuth();

  const [workAddresses, setWorkAddresses] = useState([]);
  const [selectedAddressType, setSelectedAddressType] = useState("home");

  const [form, setForm] = useState({
    address: "",
    landmark: "",
    state: "",
    pincode: "",
  });

  // Fetch work addresses from backend for the logged in user
  const fetchWorkAddresses = async () => {
    try {
      if (user?.id) {
        const res = await axios.get(`http://localhost:5000/address/${user.id}`);
        setWorkAddresses(res.data.addresses || []);
      }
    } catch (err) {
      console.error("Error fetching addresses:", err);
    }
  };

  useEffect(() => {
    fetchWorkAddresses();
  }, [user]);

  // Handle form input changes
  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit new work address to backend
  const handleAddressSubmit = async () => {
    try {
      if (!form.address || !user?.id) return;
      const res = await axios.post(`http://localhost:5000/address/${user.id}`, form);
      alert("Work address added!");
      setForm({ address: "", landmark: "", state: "", pincode: "" });
      setSelectedAddressType(`work-${res.data.id}`); // Select newly added work address
      fetchWorkAddresses();
    } catch (err) {
      console.error("Failed to save address:", err);
    }
  };

  // Get currently selected delivery address details
  const getSelectedAddress = () => {
    if (selectedAddressType === "home") {
      return {
        label: "Home Address",
        full: `${user.address}, ${user.landmark}, ${user.state} - ${user.pincode}`,
      };
    } else if (selectedAddressType.startsWith("work-")) {
      const id = parseInt(selectedAddressType.split("-")[1]);
      const work = workAddresses.find(addr => addr.id === id);
      if (work) {
        return {
          label: "Work Address",
          full: `${work.address}, ${work.landmark}, ${work.state} - ${work.pincode}`,
        };
      }
    }
    return null;
  };

  const selected = getSelectedAddress();

  return (
    <div className="h-screen flex flex-col relative bg-white">
      <Header />

      <div className="flex flex-col px-4 lg:px-0 mt-10 max-w-5xl mx-auto w-full space-y-8 overflow-y-auto scrollbar-hide h-[calc(100vh - 100px)]">
        {/* Cart Summary */}
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">
        Cart Summary
        </h2>

        {/* Cart Items List */}
        <div className="divide-y divide-gray-200">
          {cartItems.length === 0 && (
            <p className="text-center text-gray-500 py-8">Your cart is empty.</p>
          )}

          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row sm:items-center py-3 space-y-3 sm:space-y-0"
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-16 h-16 object-cover rounded mr-0 sm:mr-4"
              />

              <div className="flex-grow">
                <p className="text-gray-900 font-semibold truncate">{item.title}</p>
                <p className="text-sm text-gray-600">
                  Quantity: <span className="font-bold">{item.quantity}</span> &nbsp;|&nbsp; Price:{" "}
                  <span className="font-bold">${item.price}</span>
                </p>
              </div>

              {/* Quantity Controls & Remove Button */}
              <div className="flex  items-center space-x-2">
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  disabled={item.quantity <= 1}
                  className="p-1 bg-red-400 hover:bg-red-500 text-white rounded disabled:opacity-50"
                  aria-label="Decrease quantity"
                >
                  <FaMinus size={12} />
                </button>

                <span className="w-6 text-center font-semibold">{item.quantity}</span>

                <button
                  onClick={() => increaseQuantity(item.id)}
                  disabled={item.quantity >= 8}
                  className="p-1 bg-green-600 hover:bg-green-700 text-white rounded disabled:opacity-50"
                  aria-label="Increase quantity"
                >
                  <FaPlus size={12} />
                </button>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-1 text-red-600 hover:text-red-700"
                  aria-label="Remove item"
                >
                  <FaTrash size={14} />
                </button>
              </div>

              {/* Total price per item */}
              <p className="sm:ml-4 text-gray-900 font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}


               <div className="space-y-2 text-center">
          <p className="text-gray-700 font-medium">
            Total distinct items:{" "}
            <span className="font-bold text-indigo-600">{totalDistinctItems}</span>
          </p>
          <p className="text-gray-700 font-medium">
            Total quantity:{" "}
            <span className="font-bold text-indigo-600">{totalItems}</span>
          </p>
          <p className="text-gray-700 font-medium">
            Total price:{" "}
            <span className="font-bold text-indigo-600">${totalPrice.toFixed(2)}</span>
          </p>
        </div>
        </div>

        {/* Delivery Address Selection & Form */}
        {isLoggedIn && user && (
          <div className="mb-30 p-4 text-gray-800  rounded ">
            <h3 className="text-lg font-semibold text-[#53B175] mb-4">Delivery Address</h3>

            <div className="mb-4 space-y-3">
              {/* Home Address Radio */}
              {user.address && (
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="addressType"
                    value="home"
                    checked={selectedAddressType === "home"}
                    onChange={(e) => setSelectedAddressType(e.target.value)}
                      className="accent-green-600"
                  />
                  
                  <span>
                    Home: {user.address}, {user.landmark}, {user.state} - {user.pincode}
                  </span>
                </label>
              )}

              {/* Work Addresses Radio */}
              {workAddresses.map((addr) => (
                <label key={addr.id} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="addressType"
                    value={`work-${addr.id}`}
                    checked={selectedAddressType === `work-${addr.id}`}
                    onChange={(e) => setSelectedAddressType(e.target.value)} 
                      className="accent-green-600"
                  />
                  <span>
                    Work: {addr.address}, {addr.landmark}, {addr.state} - {addr.pincode}
                  </span>
                </label>
              ))}
            </div>

            {/* Add New Work Address Form */}
            <div className="mt-6 space-y-3">
              <p className="text-sm text-gray-600 font-medium">Add New Work Address</p>

              {/* Address & Landmark */}
              <div className="flex gap-4">
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={form.address}
                  onChange={handleInputChange}
                  className="w-1/2 p-2 border rounded"
                
                />
                <input
                  type="text"
                  name="landmark"
                  placeholder="Landmark"
                  value={form.landmark}
                  onChange={handleInputChange}
                  className="w-1/2 p-2 border rounded"
                />
              </div>

              {/* State & Pincode */}
              <div className="flex gap-4">
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={form.state}
                  onChange={handleInputChange}
                  className="w-1/2 p-2 border rounded"
                />
                <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode"
                  value={form.pincode}
                  onChange={handleInputChange}
                  className="w-1/2 p-2 border rounded"
                />
              </div>

              <button
                onClick={handleAddressSubmit}
                className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              >
                Save Work Address
              </button>
            </div>

            {/* Selected Delivery Address Display */}
            {selected && (
              <div className="mt-6 text-sm text-gray-700">
                <p className="font-semibold">Deliver to: {selected.label}</p>
                <p>{selected.full}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Fixed Bottom Navbar */}
      <div className="fixed bottom-0 left-0 w-full z-50 bg-white shadow-md">
        <Navbar />
      </div>
    </div>
  );
};

export default CartPage;
