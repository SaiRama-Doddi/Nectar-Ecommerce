import React from "react";
import Header from "../Component/Header";
import Navbar from "../Component/Navbar";

export default function OrdersPage() {
  const orders = [
    {
      id: 1001,
      status: "Delivered",
      date: "2025-05-10",
      total: 999,
      items: [
        { name: "Wireless Mouse", qty: 1, price: 499 },
        { name: "Laptop Sleeve", qty: 1, price: 500 },
      ],
    },
    {
      id: 1002,
      status: "Shipped",
      date: "2025-05-08",
      total: 799,
      items: [
        { name: "Bluetooth Speaker", qty: 1, price: 799 },
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 px-4 py-2 overflow-hidden">
        <div className="bg-white rounded-lg shadow-md h-full max-h-[calc(100vh-160px)] overflow-y-auto scrollbar-hide p-6">
          <h2 className="text-2xl font-semibold mb-6 text-[#53B175]">My Orders</h2>

          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border-l-4 border-[#53B175] pl-6 relative bg-gray-50 p-4 rounded-md shadow-sm"
              >
                <div className="absolute top-4 left-[-9px] w-4 h-4 bg-[#53B175] rounded-full border-2 border-white shadow"></div>

                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">
                    Order #{order.id} • {order.date}
                  </span>
                  <span className={`text-sm font-semibold ${order.status === "Delivered" ? "text-green-600" : "text-yellow-600"}`}>
                    {order.status}
                  </span>
                </div>

                <div className="text-gray-800 font-semibold mb-2">
                  Total: ₹{order.total.toFixed(2)}
                </div>

                <div className="text-sm text-gray-700 mb-1 font-medium">Items:</div>
                <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                  {order.items.map((item, index) => (
                    <li key={index}>
                      {item.name} (Qty: {item.qty}) - ₹{item.price}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 left-0 w-full z-50 bg-white shadow-inner">
        <Navbar />
      </div>
    </div>
  );
}
