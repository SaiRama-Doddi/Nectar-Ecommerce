import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const OtpPage = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleVerifyOtp = () => {
    if (otp === "1234") { // mock OTP
      navigate("/dashboard");
    } else {
      alert("Invalid OTP. Try 1234 as the mock OTP.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <p className="text-2xl font-semibold mb-6">Enter your 4-digit code</p>
      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        maxLength={4}
        placeholder="Enter 4-digit OTP"
        className="w-full max-w-sm px-4 py-3 border border-gray-300 rounded-lg mb-4"
      />
      <button
        onClick={handleVerifyOtp}
        className="bg-[#53B175] text-white font-medium py-2 px-6 rounded-md"
      >
        Verify OTP
      </button>
    </div>
  );
};

export default OtpPage;
