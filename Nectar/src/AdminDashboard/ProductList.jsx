import React, { useEffect, useState, Suspense } from 'react';
import Header from '../Component/Header';
import Navbar from '../Component/Navbar';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product, handleEdit, openModal, }) => (
  <div className="bg-white rounded-lg shadow-md p-2 mb-2 flex space-x-2 items-center">
    <img
      src={product.thumbnail}
      alt={product.title}
      className="w-20 h-20 rounded object-cover flex-shrink-0"
    />
    <div className="flex-grow">
      <h2 className="font-semibold text-lg">{product.title}</h2>
      <p className="text-sm text-gray-600 capitalize">{product.category}</p>
      <p className="text-sm font-semibold mt-1">${product.price}</p>
      <div className="flex space-x-4 mt-1 text-sm text-gray-700">
        <span>Rating: {product.rating}</span>
        <span>Stock: {product.stock}</span>
      </div>
    </div>
    <div className="flex justify-end space-x-4 mt-2">
      <button
        onClick={() => handleEdit(product)}
        className="text-blue-600 hover:text-blue-800"
      >
        <PencilIcon className="h-5 w-5" />
      </button>
    <button
  onClick={() => {
    console.log("Clicked delete for", product.id);
    openModal(product.id);
  }}>
        <TrashIcon className="h-5 w-5" />
      </button>
    </div>
  </div>
);

const ProductTable = ({ products, handleEdit, openModal }) => (
  <div className="overflow-x-auto">
    <div className="overflow-y-auto rounded-lg border border-gray-300 shadow-md bg-white">
      <table className="min-w-full text-sm text-left hidden md:table">
        <thead className="bg-yellow-100 sticky top-0 z-10">
          <tr>
            <th className="py-3 px-4 border">Image</th>
            <th className="py-3 px-4 border">Title</th>
            <th className="py-3 px-4 border">Category</th>
            <th className="py-3 px-4 border">Price</th>
            <th className="py-3 px-4 border">Rating</th>
            <th className="py-3 px-4 border">Stock</th>
            <th className="py-3 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id} className="hover:bg-red-50 transition">
              <td className="py-2 px-2 border">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-12 h-12 object-cover rounded"
                />
              </td>
              <td className="py-2 px-4 border">{product.title}</td>
              <td className="py-2 px-4 border">{product.category}</td>
              <td className="py-2 px-4 border font-semibold">${product.price}</td>
              <td className="py-2 px-4 border">{product.rating}</td>
              <td className="py-2 px-4 border">{product.stock}</td>
              <td className="py-2 px-4 border space-x-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="text-blue-600 hover:text-blue-800 cursor-pointer"
                >
                  <PencilIcon className="h-5 w-5 inline" />
                </button>
                <button
                  onClick={() => openModal(product.id)}
                  className="text-red-600 hover:text-red-800 cursor-pointer"
                >
                  <TrashIcon className="h-5 w-5 inline" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile Cards */}
      <div className="md:hidden p-2 overflow-y-auto">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            handleEdit={handleEdit}
            openModal={openModal}
          
          />
        ))}
      </div>
    </div>
  </div>
);

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage] = useState(10); // You can change this number
const indexOfLastProduct = currentPage * itemsPerPage;
const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
const totalPages = Math.ceil(products.length / itemsPerPage);


  const handleEdit = (product) => {
    navigate(`/editproduct/${product.id}`);
  };

  const openModal = (id) => {
      console.log("Opening modal for product ID:", id); // Add this
    setSelectedProductId(id);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedProductId(null);
  };

  const handleDelete = () => {
    if (!selectedProductId) return;
    fetch(`http://localhost:5000/api/deleteproduct/${selectedProductId}`, {
      method: 'DELETE',
    })
      .then(res => {
        if (res.ok) {
          setProducts(prev => prev.filter(p => p.id !== selectedProductId));
          closeModal();
        } else {
          console.error('Failed to delete');
        }
      })
      .catch(err => {
        console.error('Error deleting:', err);
      });
  };

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/api/viewproducts')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  }, []);




const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center items-center space-x-4 py-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 text-sm bg-gray-700 rounded hover:bg-gray-800 disabled:opacity-50 text-white"
      >
        ◀ Prev
      </button>

      <span className="text-sm font-medium">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 text-sm bg-green-600 rounded hover:bg-green-400 disabled:opacity-50 text-white"
      >
        Next ▶
      </button>
    </div>
  );
};


  return (
  <div className="pt-20 pb-24 h-screen bg-white flex flex-col">

      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <Header />
      </div>
      <div className="flex-grow overflow-y-auto px-4 mt-20 md:px-8 lg:px-16">
      <h1 className="text-2xl md:text-3xl font-bold my-6 text-center">Product List</h1>

  <Suspense fallback={<p className="text-center text-gray-600">Loading products...</p>}>
    {loading ? (
      <p className="text-center text-gray-600">Loading...</p>
    ) : ( 
      <div>
      <ProductTable
        products={currentProducts}
        handleEdit={handleEdit}
        openModal={openModal}
  
      />
   
      </div>
    )}
  </Suspense>
{isOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded shadow-md">
      <p className="mb-4">Are you sure you want to delete this product?</p>
      <div className="flex justify-end space-x-4">
        <button onClick={closeModal} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
        <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded">Delete</button>
      </div>
    </div>
  </div>
)}


  
  
</div>
{/* Fixed pagination above navbar */}
<div className="fixed bottom-20 left-0 w-full z-50 bg-white shadow-md py-2">
<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={(page) => setCurrentPage(page)}
/>

</div>



       <div className="fixed bottom-0 left-0 w-full z-50 bg-white shadow-md">
        <Navbar />
      </div>
    </div>
  );
};

export default ProductList;
