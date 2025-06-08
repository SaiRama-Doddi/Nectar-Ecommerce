import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Component/Header";
import Navbar from "../Component/Navbar";
import { useAuth } from "../Context/CartContext"; // Adjust path if needed

export default function AccountPage() {
  const [selectedSection, setSelectedSection] = useState("details");
  const navigate = useNavigate();
  const { logout } = useAuth(); // Destructure logout from your AuthContext

  const menuItems = [
    { key: "details", label: "Account Details" },
    { key: "address", label: "Manage Address" },
    { key: "logout", label: "Logout" },
  ];

  // Removed useEffect for logout

  const renderContent = () => {
    switch (selectedSection) {
      case "details":
        return <div className="text-gray-700">Update your account details here.</div>;
      case "address":
        return <div className="text-gray-700">Manage your saved addresses here.</div>;
      case "logout":
        return <div className="text-red-600 font-medium">Logging out...</div>;
      default:
        return <div>Select a section.</div>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col ">
      <Header />

      <div className="flex-1 px-4 py-2 overflow-hidden">
        <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md h-full max-h-[calc(100vh-160px)] overflow-hidden">
          {/* Sidebar */}
          <aside className="w-full md:w-1/4 border-b md:border-b-0 md:border-r bg-gray-50 p-4">
            <h2 className="text-xl font-bold mb-4">My Account</h2>
            <nav className="space-y-2">
              {menuItems.map((item) => {
                if (item.key === "logout") {
                  // Logout button triggers logout and navigation immediately
                  return (
                    <button
                      key={item.key}
                      className="w-full text-left px-4 py-2 rounded-md bg-white text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        logout();
                        navigate("/home");
                      }}
                    >
                      {item.label}
                    </button>
                  );
                }

                return (
                  <button
                    key={item.key}
                    className={`w-full text-left px-4 py-2 rounded-md transition ${
                      selectedSection === item.key
                        ? "bg-[#53B175] text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setSelectedSection(item.key)}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Content */}
          <main className="w-full md:w-3/4 p-6 overflow-y-auto scrollbar-hide">
            <h3 className="text-2xl font-semibold mb-4 capitalize text-[#53B175]">
              {menuItems.find((item) => item.key === selectedSection)?.label}
            </h3>
            <div className="bg-white p-4 rounded shadow-inner min-h-[200px]">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>

      <div className="sticky bottom-0 left-0 w-full z-50 bg-white shadow-inner">
        <Navbar />
      </div>
    </div>
  );
}
