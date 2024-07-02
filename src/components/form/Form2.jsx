import React from "react";

const Form2 = ({ formData, formErrors, handleChange }) => {
  return (
    <div>
      <div className="mb-4">
        <label className="block text-gray-700">First Name:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className={`border ${
            formErrors.firstName ? "border-red-500" : "border-gray-300"
          } w-full rounded-md px-3 py-2 pr-10 focus:border-blue-500 focus:outline-none`}
        />
        {formErrors.firstName && (
          <p className="mt-1 text-xs text-red-500">{formErrors.firstName}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className={`border ${
            formErrors.lastName ? "border-red-500" : "border-gray-300"
          } w-full rounded-md px-3 py-2 pr-10 focus:border-blue-500 focus:outline-none`}
        />
        {formErrors.lastName && <p className="mt-1 text-xs text-red-500">{formErrors.lastName}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Address:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className={`border ${
            formErrors.address ? "border-red-500" : "border-gray-300"
          } w-full rounded-md px-3 py-2 pr-10 focus:border-blue-500 focus:outline-none`}
        />
        {formErrors.address && <p className="mt-1 text-xs text-red-500">{formErrors.address}</p>}
      </div>
    </div>
  );
};

export default Form2;
