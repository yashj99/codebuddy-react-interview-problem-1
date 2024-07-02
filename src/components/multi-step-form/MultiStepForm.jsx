import React, { useState } from "react";
import Form1 from "../form/Form1";
import Form2 from "../form/Form2";
import Form3 from "../form/Form3";
import { useNavigate } from "react-router-dom";

const MultiStepForm = () => {
  const steps = ["Step 1", "Step 2", "Step 3"];
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    emailId: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
    countryCode: "",
    phoneNumber: "",
    acceptTermsAndCondition: false,
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSaved, setIsSaved] = useState(false);

  const handleNext = () => {
    if (validateForm()) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSave = () => {
    if (validateForm()) {
      setIsSaved(true);
      setTimeout(() => {
        setIsSaved(false);
      }, 3000);
      if (activeStep === steps.length - 1) {
        handleSubmit();
      }
    }
  };

  const validateForm = () => {
    let errors = {};

    // Step 1 validation
    if (activeStep === 0) {
      if (!formData.emailId) {
        errors.emailId = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.emailId)) {
        errors.emailId = "Email is invalid";
      }
      if (!formData.password) {
        errors.password = "Password is required";
      } else if (
        !/(?=.*[A-Z].*[A-Z])(?=.*[a-z].*[a-z])(?=.*[0-9].*[0-9])(?=.*[!@#$%^&*].*[!@#$%^&*]).{8,}/.test(
          formData.password,
        )
      ) {
        errors.password =
          "Password must contain 2 uppercase letters, 2 lowercase letters, 2 numbers, and 2 special characters";
      }
    }

    // Step 2 validation
    if (activeStep === 1) {
      if (!formData.firstName) {
        errors.firstName = "First name is required";
      } else if (!/^[A-Za-z]{2,50}$/.test(formData.firstName)) {
        errors.firstName =
          "First name must contain only alphabets and be between 2 and 50 characters";
      }
      if (formData.lastName && !/^[A-Za-z]*$/.test(formData.lastName)) {
        errors.lastName = "Last name must contain only alphabets";
      }
      if (!formData.address || formData.address.length < 10) {
        errors.address = "Address must be at least 10 characters long";
      }
    }

    // Step 3 validation
    if (activeStep === 2) {
      if (!formData.countryCode) {
        errors.countryCode = "Country code is required";
      } else if (!["+91", "+1"].includes(formData.countryCode)) {
        errors.countryCode = "Country code must be +91 (India) or +1 (America)";
      }
      if (!formData.phoneNumber || !/^\d{10}$/.test(formData.phoneNumber)) {
        errors.phoneNumber = "Phone number must be 10 digits";
      }
      if (!formData.acceptTermsAndCondition) {
        errors.acceptTermsAndCondition = "You must accept terms and conditions";
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      const { acceptTermsAndCondition, ...submitData } = formData;

      try {
        const response = await fetch("https://codebuddy.review/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submitData),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const { data } = await response.json();
        navigate("/posts");
      } catch (error) {
        console.log("There was a problem with your submission: " + error.message);
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="container mx-auto p-4" style={{ maxWidth: "600px" }}>
          <div className="mb-4 flex items-center justify-center">
            {steps.map((label, index) => (
              <React.Fragment key={`${label}-index`}>
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => setActiveStep(index)}
                      disabled={index > activeStep}
                      className={`flex h-10 w-10 items-center justify-center rounded-full font-semibold ${
                        index <= activeStep ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-700"
                      }`}
                    >
                      {index + 1}
                    </button>
                    <span
                      className={`mt-2 text-sm ${
                        index <= activeStep ? "text-blue-600" : "text-gray-500"
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="mx-4 flex-1 border-t-2 border-gray-300"></div>
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="rounded-md border p-4 shadow-md">
            {activeStep === 0 && (
              <Form1
                key={1}
                formData={formData}
                formErrors={formErrors}
                handleChange={handleChange}
              />
            )}
            {activeStep === 1 && (
              <Form2
                key={2}
                formData={formData}
                formErrors={formErrors}
                handleChange={handleChange}
              />
            )}
            {activeStep === 2 && (
              <Form3
                key={3}
                formData={formData}
                formErrors={formErrors}
                handleChange={handleChange}
              />
            )}
          </div>
          <div className="mt-4 flex justify-between space-x-4">
            <button
              onClick={handleBack}
              disabled={activeStep === 0}
              className="rounded-md bg-gray-400 px-4 py-2 text-white disabled:opacity-50"
            >
              Back
            </button>
            <button onClick={handleSave} className="rounded-md bg-blue-500 px-4 py-2 text-white">
              Save
            </button>
            <button
              disabled={activeStep === steps.length - 1}
              onClick={handleNext}
              className="rounded-md bg-blue-500 px-4 py-2 text-white disabled:opacity-50"
            >
              Save and Next
            </button>
          </div>
          {isSaved && (
            <div className="mt-4 flex items-center rounded-md bg-green-200 p-3 text-green-800">
              <span>Data Saved Successfully!</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MultiStepForm;
