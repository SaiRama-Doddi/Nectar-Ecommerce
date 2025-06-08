import image2 from '../assets/Vector.png';
import image1 from '../assets/Vector2.png';
import { FaSearch } from 'react-icons/fa';
import Slider from './Slider';
import GroceryProducts from '../Products/GroceryProducts';
import KitchenAccessories from '../Products/KitchenAccessories';
import CategoryPage from '../Products/CategoryPage';
import Navbar from './Navbar';
import MobileAccessories from '../Products/MobileAccessories';
import Header from './Header';

const DashboardPage = () => {
  return (
    <div className="h-screen flex flex-col relative bg-gray-100">
            <Header />
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pt-20 pb-24 scrollbar-hide" > {/* Ensure space for fixed navbar */}
   

 

        {/* Page Content */}
        <div className="flex flex-col space-y-6 px-4 ">
          <Slider />
          <GroceryProducts />
          <KitchenAccessories />
          <CategoryPage />
          <MobileAccessories />
        </div>
      </div>

      {/* Fixed Bottom Navbar */}
      <div className="fixed bottom-0 left-0 w-full z-50 bg-white shadow-md">
        <Navbar />
      </div>
    </div>
  );
};

export default DashboardPage;
