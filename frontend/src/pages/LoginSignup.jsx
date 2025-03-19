import React, { useState } from "react";

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    console.log("Login executed successfully", formData);
    let responseData;
    await fetch("https://wishwhirl.onrender.com/api/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      // Store the token in localStorage
      localStorage.setItem("auth_token", responseData.token);
      window.location.replace("/"); // Redirect after successful login
    } else {
      alert(responseData.errors || "Login failed.");
    }
  };

  const signup = async () => {
    console.log("Signup executed successfully", formData);
    let responseData;
    await fetch("https://wishwhirl.onrender.com/api/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      // Store the token in localStorage
      localStorage.setItem("auth_token", responseData.token);
      window.location.replace("/login"); // Redirect to login page after successful signup
    } else {
      alert(responseData.errors || "Signup failed.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-pink-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center mb-4">{state}</h1>
        <div className="flex flex-col gap-4">
          {state === "Sign Up" && (
            <input
              name="name"
              value={formData.name}
              onChange={changeHandler}
              type="text"
              placeholder="Your Name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          )}
          <input
            name="email"
            value={formData.email}
            onChange={changeHandler}
            type="email"
            placeholder="Your Email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <input
            name="password"
            value={formData.password}
            onChange={changeHandler}
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>
        <button
          onClick={() => {
            state === "Login" ? login() : signup();
          }}
          className="w-full py-3 mt-4 text-lg font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600"
        >
          Continue
        </button>
        <p className="mt-4 text-center text-gray-600">
          {state === "Sign Up" ? (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setState("Login")}
                className="font-semibold text-red-500 cursor-pointer"
              >
                Log In
              </span>
            </>
          ) : (
            <>
              Create an account?{" "}
              <span
                onClick={() => setState("Sign Up")}
                className="font-semibold text-red-500 cursor-pointer"
              >
                Click here
              </span>
            </>
          )}
        </p>
        <div className="flex items-center mt-6">
          <input
            type="checkbox"
            className="w-5 h-5 text-red-500 border-gray-300 rounded focus:ring-2 focus:ring-red-400"
          />
          <p className="ml-3 text-gray-600 text-sm">
            By continuing, I agree with the Terms of Use and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;


