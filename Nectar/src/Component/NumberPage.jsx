import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa"; // Import back arrow icon
import Image from "../assets/Mask Group.png";

const NumberPage = () => {
  const [mobile, setMobile] = useState('');
  const navigate = useNavigate();

  const handleSendOtp = () => {
    if (/^[6-9]\d{9}$/.test(mobile)) {
      localStorage.setItem("userMobile", mobile); // store temporarily
      navigate("/otp");
    } else {
      alert("Please enter a valid 10-digit mobile number.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100 px-4">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)} // Navigate back when clicked
        className="absolute top-4 left-4 p-2 bg-green-600 text-white rounded-full shadow-md hover:bg-green-700 transition"
      >
        <FaArrowLeft />
      </button>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row items-center justify-center rounded-xl overflow-hidden w-full max-w-4xl">
        <div className="w-full md:w-1/2">
          <img src={Image} alt="Banner" className="object-cover w-full h-64 md:h-full" />
        </div>
        <div className="w-full md:w-1/2 p-8">
          <p className="text-2xl font-semibold text-gray-800 mb-2 text-center">Get your Groceries with nectar</p>
          <input
            type="text"
            placeholder="Enter your mobile number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            maxLength={10}
            className="mt-8 w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handleSendOtp}
            className="w-full bg-[#53B175] hover:bg-green-600 text-white py-3 rounded-lg font-medium transition duration-200"
          >
            Send OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default NumberPage;
