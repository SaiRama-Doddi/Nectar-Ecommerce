import React, { useState } from 'react';
import { FaSearch, FaSignInAlt ,FaUser} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/CartContext';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();
 const { user, login, isLoggedIn } = useAuth();



  const [query, setQuery] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search-results?title=${encodeURIComponent(query.trim())}`);
  };

  const openModal = () => {
    setIsModalOpen(true);
    setShowOtpModal(false);
    setEmail('');
    setOtp('');
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setShowOtpModal(false);
    setEmail('');
    setOtp('');
  };

  const handleSignIn = () => {
    navigate('/user');
  };

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleEmailSubmit = async () => {
    if (!validateEmail(email)) {
      alert('Please enter a valid email.');
      return;
    }

    const res = await fetch('http://localhost:3000/u/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      setUserEmail(email);
      setShowOtpModal(true);
    } else {
      alert('Failed to send OTP');
    }
  };

const handleOtpSubmit = async () => {
  const res = await fetch('http://localhost:3000/u/verify-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: userEmail, code: otp }),
  });

  if (res.ok) {
    const data = await res.json(); // 👈 Parse JSON response from server
const userData = data.user;
    // Optional: fallback name if backend doesn't send it
    const fallbackName = userEmail.split('@')[0].replace(/[0-9]/g, '');

    // Store user in AuthContext
    login({
      id: userData.id || '',
      email: userData.email || userEmail,
  name: userData.name || fallbackName,
  address: userData.address,
  landmark: userData.landmark,
  pincode: userData.pincode,
  state: userData.state,
  mobile: userData.mobile,
  user_type: userData.user_type || 'user',
    });

    // ✅ Log all user details to console
    console.log("User logged in:", userData.address, userData.landmark, userData.pincode, userData.state, userData.mobile,userData.email, userData.id);

    alert('Login successful!');
    closeModal();
    if(userData.user_type === 'admin') {
      navigate('/viewproducts');
    } else if(userData.user_type === 'user') {
    navigate('/dashboard');
    }
  } else {
    alert('Invalid OTP');
  }
};


  return (
    <header className="bg-[#53B175] text-green-900 py-4 shadow-md">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
        <div className="text-center sm:text-left w-full sm:w-auto">
          <h1 className="text-2xl font-bold text-white font-Poppins">Nectar</h1>
        </div>
        <div className="flex justify-center sm:justify-end w-full sm:w-auto">
            {isLoggedIn ? (
    <div className="flex items-center space-x-2 bg-white text-[#53B175] font-medium px-4 py-2 rounded-full shadow">
      <FaUser />
   <span>{user?.name}</span>

    </div>
  ) : (
    <button
      className="flex items-center space-x-2 bg-white text-[#53B175] font-medium px-4 py-2 rounded-full shadow hover:bg-green-50 transition duration-200 cursor-pointer"
      onClick={openModal}
    >
      <FaSignInAlt />
      <span>Login</span>
    </button>
  )}
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center items-center px-4 mt-4">
        <form onSubmit={handleSubmit} className="flex justify-center items-center px-4 mt-4">
      <div className="flex items-center bg-white rounded-full px-4 py-2 w-full max-w-xl shadow">
        <FaSearch className="text-gray-400 mr-2" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Store"
          className="bg-transparent outline-none w-full text-gray-800 placeholder-gray-400"
        />
      </div>
    </form>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-20 flex justify-center items-center bg-black/10 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded-t-2xl lg:rounded-lg shadow-md w-full sm:w-full md:w-[80%] lg:w-96 transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            {!showOtpModal ? (
              <>
                <h2 className="text-lg font-semibold text-center mb-4">
                  Login with Email
                </h2>
                <input
                  type="text"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md mb-4"
                />
                <button
                  onClick={handleEmailSubmit}
                  className="w-full bg-[#53B175] text-white py-2 rounded-md border-2 border-transparent transition duration-200 hover:bg-white hover:text-[#53B175] hover:border-[#53B175]"
                >
                  Send OTP
                </button>

                <button
                  className="w-full bg-blue-500 text-white py-2 rounded-md mt-2 border-2 border-transparent transition duration-200 hover:bg-white hover:text-blue-500 hover:border-blue-500"
                  onClick={handleSignIn}
                >
                  Signup
                </button>

                <button
                  className="mt-4 text-[#53B175] font-medium w-full cursor-pointer"
                  onClick={closeModal}
                >
                  Close
                </button>
              </>
            ) : (
              <>
                <h2 className="text-lg font-semibold text-center mb-4">
                  Enter OTP sent to {userEmail}
                </h2>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md mb-4"
                />
                <button
                  onClick={handleOtpSubmit}
                  className="w-full bg-[#53B175] text-white py-2 rounded-md border-2 border-transparent transition duration-200 hover:bg-white hover:text-[#53B175] hover:border-[#53B175]"
                >
                  Verify OTP
                </button>

                <button
                  className="mt-4 text-[#53B175] font-medium w-full cursor-pointer"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
