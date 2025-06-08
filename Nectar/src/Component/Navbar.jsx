// Navbar.jsx
import React from 'react';
import { FaShoppingBag, FaShoppingCart, FaClipboardList, FaUser } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../Context/CartContext'; // ✅ Import useCart

const navItems = [
  {
    id: 'shop',
    label: 'Shop',
    icon: <FaShoppingBag />,
    paths: ['/dashboard', '/dashboard/groceries', '/dashboard/kitchenary', '/dashboard/mobiles','/category/beauty','/category/fragrances','/category/furniture','/category/groceries','/category/home-decoration','/category/kitchen-accessories','/category/laptops','/category/mens-shirts','/category/mens-shoes','/category/mens-watches','/category/mobile-accessories','/user','/search-results'],
  },
  { id: 'cart', label: 'Cart', icon: <FaShoppingCart />, path: '/cart' },
  { id: 'order', label: 'Orders', icon: <FaClipboardList />, path: '/order' },
  { id: 'account', label: 'Account', icon: <FaUser />, path: '/account' },
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
const { totalItems } = useCart();
const isActive = (item) => {
  if (item.paths) {
    return item.paths.some(p => location.pathname.startsWith(p));
  }
  return location.pathname === item.path;
};


  return (
    <nav className="w-full px-4 py-2 bg-gray-100 shadow-md fixed bottom-0 left-0 z-50">
      <div className="flex flex-row sm:justify-between md:justify-center md:space-x-10 items-center">
        {navItems.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(item.paths ? item.paths[0] : item.path)}
            className={`relative flex flex-col items-center justify-center px-4 py-2 rounded-md transition-all duration-200 cursor-pointer w-full sm:w-auto ${
              isActive(item)
                ? 'bg-[#53B175] bg-green-100 text-green-600'
                : 'text-gray-600 hover:text-green-500 hover:bg-gray-100'
            }`}
          >
            <div className="text-xl mb-1 relative">
              {item.id === 'cart' && totalItems > 0 && (
  <sup className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
    {totalItems}
  </sup>
)}
              {item.icon}
            </div>
            <span className="text-sm font-medium">{item.label}</span>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
