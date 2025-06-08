import {  useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './index.css';
import './App.css';
import SplashScreen from './Component/SplashScreen.jsx';
import HomePage from './Component/HomePage';
import NumberPage from './Component/NumberPage';

import DashboardPage from './Component/DashboardPage';
import Slider from './Component/Slider';
import GroceryProducts from './Products/GroceryProducts';
import KitchenAccessories from './Products/KitchenAccessories';
import CategoryPage from './Products/CategoryPage';
import Navbar from './Component/Navbar';
import MobileAccessories from './Products/MobileAccessories';
import Groceries from './ProductDetails/Groceries';
import Kitchenary from './ProductDetails/Kitchenary'
import Mobiles from './ProductDetails/Mobiles';
import CategoryProducts from './ProductDetails/CategoryProducts';
import CartPage from './Cart/CartPage';
import Header from './Component/Header';
import AccountDetails from './Account/AccountDetails';
import OrderPage from './Order/OrderPage';
import UserDetails from './Account/UserDetails';
import MobileLoginPage from './Account/MobileLoginPage';
import SearchResults from './Component/SearchResult.jsx';
import ExamplePage from './Account/ExamplePage.jsx';
import ProductList from './AdminDashboard/ProductList.jsx';
import EditProduct from './AdminDashboard/EditProduct.jsx';


function SplashWrapper() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return <SplashScreen />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashWrapper />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/number" element={<NumberPage />} />

        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path='/slider' element={<Slider />} />
        <Route path='/grocery' element={<GroceryProducts />}  />
        <Route path='/kitchen' element={<KitchenAccessories />} />
        <Route path='/category' element={<CategoryPage />} />
        <Route path='/mobile' element={<MobileAccessories/>} />
        <Route path='/navbar' element={<Navbar />} />
        <Route path='/dashboard/groceries' element={<Groceries />} />
        <Route path='/dashboard/kitchenary' element={<Kitchenary />} />
        <Route path='/dashboard/mobiles' element={<Mobiles />} />
        <Route path="/category/:category" element={<CategoryProducts />} />
        <Route path='/cart'  element={<CartPage />} />
        <Route path='/header' element={<Header />} />
        <Route path='/account' element={<AccountDetails />} />
        <Route path='/order' element={<OrderPage />} />
        <Route path='/user' element={<UserDetails />} />
        <Route path='/login' element={<MobileLoginPage />} />
        <Route path='/search-results' element={<SearchResults />} />
        <Route path='/add' element={<UserDetails />} />
        <Route path='/exa' element={<ExamplePage />} />
        <Route path='/viewproducts' element={<ProductList />} />
        <Route path='/editproduct/:id' element={<EditProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
