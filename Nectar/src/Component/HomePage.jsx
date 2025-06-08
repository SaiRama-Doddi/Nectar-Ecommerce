import React from 'react';
import { useNavigate } from 'react-router-dom';
import image from '../assets/8140 1.png';
import logo from '../assets/Group.png';

const HomePage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/dashboard');
  };

  return (
    <div
      className="h-screen w-screen bg-cover bg-center flex flex-col items-center justify-center px-4 text-center overflow-hidden"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className='mt-50'></div>
      <img src={logo} alt="logo" className="h-[60px] w-[60px] mb-4" />
      <p className="text-5xl font-medium text-white">welcome</p>
      <p className="text-5xl font-medium text-white">to our store</p>
      <p className="text-md font-light tracking-wide text-white mt-4">
        Get your groceries faster
      </p>
      <button
        onClick={handleStart}
        className="bg-[#53B175] text-white text-md font-medium rounded-md w-[300px] h-[65px] mt-5 cursor-pointer"
      >
        Get Started
      </button>
    </div>
  );
};

export default HomePage;
