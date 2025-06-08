import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Component/Navbar'; // Import your Navbar component
import { FaPlus,FaMinus } from 'react-icons/fa';
import { useCart } from '../Context/CartContext'; // already imported
import Header from '../Component/Header';

const CategoryProducts = () => {
  const { category } = useParams(); // Get category from URL
  const [products, setProducts] = useState([]);
const { addToCart, increaseQuantity, decreaseQuantity, getQuantity } = useCart();
  useEffect(() => {
    fetch(`http://localhost:3000/products/categories/${category}`)
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((err) => console.error("Error fetching category products", err));
  }, [category]);

  return (
<div className="flex flex-col h-screen">
  {/* Header */}
  <Header />

  {/* Page Title */}
  <h2 className="text-2xl font-bold mb-2 capitalize font-Poppins text-green-800 text-center">
    {category}
  </h2>

  {/* Scrollable Product Grid */}
      <div className="flex-grow px-4 pt-6 pb-24">
        

        <div className="h-[calc(100vh-210px)] overflow-y-auto pr-1 scrollbar-hide">
           <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                    {products.map((product) => {
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
        </div>
      </div>

  {/* Fixed Bottom Navbar */}
  <div className="fixed bottom-0 left-0 w-full z-50 bg-white shadow-md">
    <Navbar />
  </div>
</div>

  );
};

export default CategoryProducts;
