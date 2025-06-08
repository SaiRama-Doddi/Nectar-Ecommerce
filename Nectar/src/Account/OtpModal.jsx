import React, { useState } from 'react';

const OtpModal = ({ isOpen, onClose, onSubmit, email }) => {
  const [otp, setOtp] = useState('');

  const handleSubmit = () => {
    if (!otp || otp.length !== 6) {
      alert('Please enter a valid 6-digit OTP');
      return;
    }
    onSubmit(otp); // Trigger login
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-30 flex justify-center items-center bg-black/20 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold text-center mb-4">Enter OTP</h2>
        <p className="text-center text-sm mb-2 text-gray-500">OTP sent to: <strong>{email}</strong></p>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6}
          className="w-full p-2 border border-gray-300 rounded-md mb-4 text-center tracking-widest text-lg"
          placeholder="Enter 6-digit OTP"
        />
        <button
          className="w-full bg-[#53B175] text-white py-2 rounded-md transition duration-200 hover:bg-white hover:text-[#53B175] hover:border-[#53B175] border-2"
          onClick={handleSubmit}
        >
          Verify OTP
        </button>

        <button
          className="mt-4 text-[#53B175] font-medium w-full text-sm"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default OtpModal;
