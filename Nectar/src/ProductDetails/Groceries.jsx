import React, { useEffect, useState } from 'react';
import { FaPlus, FaChevronRight, FaChevronLeft,FaMinus } from 'react-icons/fa';
import Navbar from '../Component/Navbar';
import { useCart } from '../Context/CartContext';
import Header from '../Component/Header';

const filterKeywords = {
  fruits: ["fruit", "apple", "banana", "orange", "mango", "grape", "berry", "kiwi"],
  oils: ["oil", "olive", "sunflower", "mustard", "canola"],
  vegetables: ["vegetable", "tomato", "onion", "carrot", "potato", "broccoli", "lemon", "cucumber"],
  milk: ["milk", "dairy", "cream"],
  juice: ["juice", "mango juice", "orange juice", "apple juice"],
  drinks: ["drink", "soda", "cola", "energy drink"],
  water: ["water", "bottle", "mineral"],
  icecream: ["ice cream", "icecream", "gelato"]
};

const Groceries = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const { addToCart, increaseQuantity, decreaseQuantity, getQuantity } = useCart();

  useEffect(() => {
    fetch("http://localhost:3000/products/groceries")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFiltered(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    applyFilters();
  }, [selectedFilters]);

  const applyFilters = () => {
    if (selectedFilters.length === 0) {
      setFiltered(products);
      return;
    }

    const result = products.filter(product =>
      selectedFilters.some(filter =>
        filterKeywords[filter]?.some(keyword =>
          product.title.toLowerCase().includes(keyword) ||
          product.description.toLowerCase().includes(keyword)
        )
      )
    );

    setFiltered(result);
  };

  const handleCheckboxChange = (type) => {
    setSelectedFilters(prev =>
      prev.includes(type)
        ? prev.filter(f => f !== type)
        : [...prev, type]
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <div className="flex flex-grow relative">
        {/* Sidebar Toggle Button */}
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="absolute top-2 left-2 z-40 bg-green-600 text-white p-2 rounded-full md:hidden"
        >
          {showSidebar ? <FaChevronLeft /> : <FaChevronRight />}
        </button>

        {/* Sidebar */}
        <aside className={`bg-white p-4 border-r w-40 transform ${
          showSidebar ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out fixed md:relative md:translate-x-0 z-30 md:z-auto h-[calc(100vh-120px)] overflow-y-auto`}>
          <h2 className="text-lg font-bold mb-4">Filter by Category</h2>
          <div className="space-y-2">
            {Object.keys(filterKeywords).map((type) => (
              <label key={type} className="flex items-center space-x-2 capitalize text-sm">
                <input
                  type="checkbox"
                  checked={selectedFilters.includes(type)}
                  onChange={() => handleCheckboxChange(type)}
                  className="accent-green-600"
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-4 pt-6 pb-24 ml-0 ">
          <div className="h-[calc(100vh-300px)] overflow-y-auto pr-1 scrollbar-hide">
            {filtered.length === 0 ? (
              <p className="text-gray-600 text-center mt-4">
                No products found for selected filters.
              </p>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4">
                {filtered.map((product) => {
                              const quantity = getQuantity(product.id);
                
                              return (
                                <div
                                  key={product.id}
                                  className="bg-white rounded-lg shadow-md p-2 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
                                >
                                  <img
                                    src={product.thumbnail}
                                    alt={product.title}
                                    className="w-full h-24 object-cover rounded mb-2"
                                  />
                
                                  <div>
                                    <h3 className="text-xs font-semibold truncate mb-1">{product.title}</h3>
                                    <p className="text-xs text-green-700 font-bold mb-1">${product.price}</p>
                                      <p className="text-[10px] text-gray-600">⭐ {product.rating}</p>
                                  </div>
                
                                  <div className="mt-auto flex justify-end items-end">
                                  
                
                                    {quantity === 0 ? (
                                      <button
                                        className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg text-[10px] cursor-pointer "
                                        onClick={() => addToCart(product)}
                                      >
                                        <FaPlus className="text-[15px]" />
                                      </button>
                                    ) : (
                                      <div className="flex items-center space-x-1">
                                        <button
                                          className="bg-red-500  text-white p-2 rounded-lg text-[10px] cursor-pointer"
                                          onClick={() => decreaseQuantity(product.id)}
                                        >
                                          <FaMinus className="text-[10px]" />
                                        </button>
                
                                        <span className="text-xs font-bold w-4 text-center">{quantity}</span>
                
                                        <button
                                          className="bg-green-600 text-white p-2 rounded-lg text-[10px] cursor-pointer"
                                          onClick={() => increaseQuantity(product.id)}
                                          disabled={quantity >= 8}
                                        >
                                          <FaPlus className="text-[10px]" />
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Bottom Navbar */}
      <div className="fixed bottom-0 left-0 w-full z-50 bg-white shadow-md">
        <Navbar />
      </div>
    </div>
  );
};

export default Groceries;
