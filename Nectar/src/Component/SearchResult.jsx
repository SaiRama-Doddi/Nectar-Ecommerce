import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import Navbar from '../Component/Navbar';
import Header from '../Component/Header';
import { useCart } from '../Context/CartContext';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const title = searchParams.get('title');
  const category = searchParams.get('category');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addToCart, getQuantity, increaseQuantity, decreaseQuantity } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = new URLSearchParams();
        if (title) params.append('title', title);
        if (category) params.append('category', category);
        const response = await fetch(`http://localhost:3000/products/product/search?${params.toString()}`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Failed to fetch');
        setProducts(data.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [title, category]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <div className="flex-grow px-4 pt-6 pb-24">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Search Results for "{title || category}"
        </h2>

        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && products.length === 0 && (
          <p className="text-center text-gray-500">No products found.</p>
        )}

        <div className="h-[calc(100vh-300px)] overflow-y-auto pr-1 scrollbar-hide">
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
                    <p className="text-[10px] text-gray-600">⭐ {product.rating || 'N/A'}</p>
                  </div>

                  <div className="mt-auto flex justify-end items-end">
                    {quantity === 0 ? (
                      <button
                        className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg text-[10px] cursor-pointer"
                        onClick={() => addToCart(product)}
                      >
                        <FaPlus className="text-[15px]" />
                      </button>
                    ) : (
                      <div className="flex items-center space-x-1">
                        <button
                          className="bg-red-500 text-white p-2 rounded-lg text-[10px] cursor-pointer"
                          onClick={() => decreaseQuantity(product.id)}
                        >
                          –
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
}
