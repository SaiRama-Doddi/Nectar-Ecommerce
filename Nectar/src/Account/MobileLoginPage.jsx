import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MobileLoginPage = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const validateMobile = (number) => /^[6-9]\d{9}$/.test(number);

  const handleSendOtp = async () => {
    setError("");
    setSuccessMessage("");

    if (!validateMobile(mobileNumber)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/u/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: mobileNumber }),
      });

      const data = await response.json();
      console.log("Send OTP Response:", data);

      if (response.ok) {
        setOtpSent(true);
        setSuccessMessage("OTP sent successfully!");
      } else {
        setError(data.message || data.error || "Failed to send OTP.");
      }
    } catch (err) {
      console.error("Send OTP Error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  const handleVerifyOtp = async () => {
    setError("");
    setSuccessMessage("");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/u/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: mobileNumber, otp }),
      });

      const data = await response.json();
      console.log("Verify OTP Response:", data);

      if (response.ok) {
        setSuccessMessage("Login successful!");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        setError(data.message || data.error || "Invalid OTP.");
      }
    } catch (err) {
      console.error("Verify OTP Error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold text-center mb-4">Login with Mobile Number</h2>

        {!otpSent ? (
          <>
            <input
              type="text"
              placeholder="Enter Mobile Number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            <button
              className="w-full bg-[#53B175] text-white py-2 rounded-md hover:bg-green-600 transition duration-200"
              onClick={handleSendOtp}
            >
              Send OTP
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            <button
              className="w-full bg-[#53B175] text-white py-2 rounded-md hover:bg-green-600 transition duration-200"
              onClick={handleVerifyOtp}
            >
              Verify OTP
            </button>
          </>
        )}

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {successMessage && (
          <p className="text-green-600 text-sm mt-2">{successMessage}</p>
        )}
      </div>
    </div>
  );
};

export default MobileLoginPage;
