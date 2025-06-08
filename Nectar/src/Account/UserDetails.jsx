import React, { useState } from "react";
import axios from "axios";
import Header from "../Component/Header";
import Navbar from "../Component/Navbar";

const UserForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    landmark: "",
    state: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name" && (value.length > 15 || !/^[A-Za-z\s]*$/.test(value))) return;
    if (name === "email" && value.length > 50) return;
    if (name === "mobile" && (!/^\d*$/.test(value) || value.length > 10)) return;
    if (name === "pincode" && (!/^\d*$/.test(value) || value.length > 6)) return;
    if (name === "state" && !/^[A-Za-z\s]*$/.test(value)) return;

    setForm({ ...form, [name]: value });
  };


  const validate = () => {
    const newErrors = {};

    if (!/^[A-Za-z ]{5,15}$/.test(form.name)) {
      newErrors.name = "Name must be 5-15 letters only.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email.";
    }

    if (!/^\d{10}$/.test(form.mobile)) {
      newErrors.mobile = "Mobile must be exactly 10 digits.";
    }

    if (form.address.trim() === "") {
      newErrors.address = "Address is required.";
    }

    if (form.landmark.trim() === "") {
      newErrors.landmark = "Landmark is required.";
    }

    if (form.state.trim() === "") {
      newErrors.state = "State is required.";
    }

    if (!/^\d{6}$/.test(form.pincode)) {
      newErrors.pincode = "Pincode must be 6 digits.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await axios.post("http://localhost:3000/u/createUser", form);
      alert("User info submitted successfully!");
      setForm({
        name: "",
        email: "",
        mobile: "",
        address: "",
        landmark: "",
        state: "",
        pincode: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <div className="flex items-center justify-center px-2 py-4">
        <div className="w-full max-w-xl rounded-lg p-4 sm:p-6 overflow-y-auto max-h-[calc(100vh-300px)] scrollbar-hide text-sm">
          <h2 className="text-2xl font-semibold text-gray-800 mb-1 text-center">
            Shipping Info
          </h2>
          <p className="text-gray-600 mb-4 text-center">
            Enter your shipping details to continue.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-3 border-b pb-1">
                Contact Info
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {["name", "email", "mobile"].map((field) => (
                  <div key={field}>
                    <label className="block text-xs font-medium text-gray-600 capitalize mb-1">
                      {field}
                    </label>
                    <input
                      type={field === "email" ? "email" : "text"}
                      name={field}
                      value={form[field]}
                      onChange={handleChange}
                      required
                      minLength={field === "name" ? 5 : undefined}
                      maxLength={
                        field === "name" ? 15 :
                          field === "email" ? 50 :
                            field === "mobile" ? 10 : undefined
                      }
                      pattern={
                        field === "name" ? "^[A-Za-z\\s]{5,15}$" :
                          field === "email" ? "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$" :
                            field === "mobile" ? "\\d{10}" : undefined
                      }
                      className="w-full border border-gray-300 rounded-md px-3 py-1.5 shadow-sm focus:ring-green-500 focus:border-green-500 transition text-sm"
                    />
                  </div>
                ))}

              </div>
            </div>

            {/* Address Info */}
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-3 border-b pb-1">
                Address Info
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {["address", "landmark", "state", "pincode"].map((field) => (
                  <div key={field}>
                    <label className="block text-xs font-medium text-gray-600 capitalize mb-1">
                      {field}
                    </label>
                    <input
                      type="text"
                      name={field}
                      value={form[field]}
                      onChange={handleChange}
                      required
                      maxLength={
                        field === "pincode" ? 6 :
                          field === "state" ? 30 : 50
                      }
                      pattern={
                        field === "pincode" ? "\\d{6}" :
                          field === "state" ? "^[A-Za-z\\s]+$" : undefined
                      }
                      className="w-full border border-gray-300 rounded-md px-3 py-1.5 shadow-sm focus:ring-green-500 focus:border-green-500 transition text-sm"
                    />

                    {errors[field] && (
                      <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white hover:bg-green-700 font-medium py-2 rounded-md transition duration-300 text-sm"
              >
                Continue to Login
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Fixed Bottom Navbar */}
      <div className="fixed bottom-0 left-0 w-full z-50 bg-white shadow-md">
        <Navbar />
      </div>
    </div>
  );
};

export default UserForm;
