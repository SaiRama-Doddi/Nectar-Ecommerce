import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"; // ADD this at top
import { FaPlus ,FaMinus} from "react-icons/fa"; // ✅ Add this import
import { useCart } from '../Context/CartContext'; // already imported


const MobileAccessories = () => {
 const [products, setProducts] = useState([]);
    const navigate = useNavigate(); // ADD this
const { addToCart, increaseQuantity, decreaseQuantity, getQuantity } = useCart();
  
    useEffect(() => {
      fetch(`${import.meta.env.VITE_API_BASE_URL}/products/mob`)
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }, []);
  
    return (
   <div className="w-full px-4 py-6">
  <h2 className="text-2xl font-bold mb-4 font-Poppins">Mobile-accessories</h2>

  <div className="mt-4 text-right mb-4">
    <button
      onClick={() => navigate("/dashboard/mobiles")}
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-all duration-200 cursor-pointer"
    >
      See All
    </button>
  </div>

 <div className="flex overflow-x-auto space-x-4 scrollbar-hide lg:grid lg:grid-cols-10 lg:gap-4 lg:space-x-0">
    {products.map((product) => {
        const quantity = getQuantity(product.id);
        return (
      <div
        key={product.id}
        className="w-[45%] sm:w-[48%] md:w-[200px] flex-shrink-0 lg:w-auto bg-white border-gray-400 rounded-lg shadow p-3"
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-32 object-cover rounded mb-2"
        />
        <div>
        <h3 className="text-sm font-semibold truncate">{product.title}</h3>
        <p className="text-xs text-green-700 font-bold">${product.price}</p>
        <div className="flex justify-between items-center">
          <p className="text-[10px] text-gray-600">⭐ {product.rating}</p>
          </div>
        
                          <div className="mt-auto flex justify-end items-end mt-2">
                          
        
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
      </div>
    );
    })}
  </div>
</div>

    );
}

export default MobileAccessories