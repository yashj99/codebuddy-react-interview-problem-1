import React from "react";

const Form3 = ({ formData, formErrors, handleChange }) => {
  return (
    <div>
      <div className="mb-4">
        <label className="block text-gray-700">Country Code:</label>
        <select
          name="countryCode"
          value={formData.countryCode}
          onChange={handleChange}
          className={`border ${
            formErrors.countryCode ? "border-red-500" : "border-gray-300"
          } w-full rounded-md px-3 py-2 pr-10 focus:border-blue-500 focus:outline-none`}
        >
          <option value="">Select Country Code</option>
          <option value="+91">India (+91)</option>
          <option value="+1">America (+1)</option>
        </select>
        {formErrors.countryCode && (
          <p className="mt-1 text-xs text-red-500">{formErrors.countryCode}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Phone Number:</label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          className={`border ${
            formErrors.countryCode ? "border-red-500" : "border-gray-300"
          } w-full rounded-md px-3 py-2 pr-10 focus:border-blue-500 focus:outline-none`}
        />
        {formErrors.phoneNumber && (
          <p className="mt-1 text-xs text-red-500">{formErrors.phoneNumber}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">
          <input
            type="checkbox"
            name="acceptTermsAndCondition"
            checked={formData.acceptTermsAndCondition}
            onChange={handleChange}
            className="mr-2 leading-tight"
          />
          Accept Terms and Conditions
        </label>
        {formErrors.acceptTermsAndCondition && (
          <p className="mt-1 text-xs text-red-500">{formErrors.acceptTermsAndCondition}</p>
        )}
      </div>
    </div>
  );
};

export default Form3;
