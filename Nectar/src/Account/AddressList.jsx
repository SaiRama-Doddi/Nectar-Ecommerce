import React from 'react';
import { useAddress } from '../Context/AddressContext';

const AddressList = () => {
  const { addresses, loading, error } = useAddress();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!addresses.length) return <p>No additional addresses found.</p>;

  return (
    <div>
      <h3>Secondary Addresses</h3>
      <ul>
        {addresses.map((addr) => (
          <li key={addr.id}>
            {addr.address}, {addr.landmark}, {addr.state} - {addr.pincode}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddressList;
