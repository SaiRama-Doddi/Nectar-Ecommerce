import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./CartContext"; // or wherever your AuthContext lives

const AddressContext = createContext();

export const useAddress = () => useContext(AddressContext);

export const AddressProvider = ({ children }) => {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAddresses = async () => {
      if (!user || !user.id) {
        console.log("No user or user.id yet");
        setAddresses([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const res = await axios.get(`http://localhost:5000/address/${user.id}`);
        console.log("Fetched addresses:", res.data);
        setAddresses(res.data.addresses || []); // Adjust based on API response
      } catch (err) {
        console.error("Error fetching addresses:", err);
        setError("Failed to fetch addresses");
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, [user]);

  return (
    <AddressContext.Provider
      value={{ addresses, loading, error }}
    >
      {children}
    </AddressContext.Provider>
  );
};
