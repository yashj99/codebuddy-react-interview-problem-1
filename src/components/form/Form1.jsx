import { Icon } from "@iconify/react";
import eyeOutline from "@iconify/icons-heroicons-outline/eye";
import eyeOffOutline from "@iconify/icons-heroicons-outline/eye-off";
import { useState } from "react";

const Form1 = ({ formData, formErrors, handleChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <div className="mb-4">
        <label className="block text-gray-700">Email ID:</label>
        <input
          type="email"
          name="emailId"
          placeholder="Enter your email address"
          value={formData.emailId}
          onChange={handleChange}
          className={`border ${
            formErrors.emailId ? "border-red-500" : "border-gray-300"
          } w-full rounded-md px-3 py-2 pr-10 focus:border-blue-500 focus:outline-none`}
        />
        {formErrors.emailId && <p className="mt-1 text-xs text-red-500">{formErrors.emailId}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="mb-2 block text-gray-700">
          Password
        </label>
        <span className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className={`border ${
              formErrors.password ? "border-red-500" : "border-gray-300"
            } w-full rounded-md px-3 py-2 pr-10 focus:border-blue-500 focus:outline-none`}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className={`absolute inset-y-0 right-0 ${
              showPassword ? "top-0" : "top-0"
            } flex items-center bg-transparent px-3 focus:outline-none`}
          >
            <Icon
              icon={showPassword ? eyeOffOutline : eyeOutline}
              className="h-6 w-6 text-gray-700"
            />
          </button>
        </span>

        {formErrors.password && <p className="mt-1 text-xs text-red-500">{formErrors.password}</p>}
      </div>
    </div>
  );
};

export default Form1;
