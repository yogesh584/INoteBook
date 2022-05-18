import React, { useState,useEffect } from "react";
import SignupImage from "../../images/signup.jpg";
import { Link, useNavigate } from "react-router-dom";

const Signup = (props) => {
  const navigate = useNavigate();
  const [crediantials, setCrediantials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const CreateUser = async (e) => {
    e.preventDefault();
    if (crediantials.password === crediantials.cpassword) {
      const response = await fetch("http://localhost:4000/api/auth/", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: crediantials.name,
          email: crediantials.email,
          password: crediantials.password,
        }),
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem("authToken", data.authToken);
        navigate("/");
        props.ShowAlert("Account Created Successfully", "Success", "green-500");
      } else {
        props.ShowAlert(data.error, "Error", "red-500");
      }
    }
    else{
      props.ShowAlert("Password and Confirm Password not matched !", "Error", "red-500");
    }
  };

  const onChange = (e) => {
    setCrediantials({ ...crediantials, [e.target.name]: e.target.value });
  };

  useEffect(()=>{
    if (localStorage.getItem("authToken")) {
      navigate("/");
    }
  })

  return (
    <div>
      <div className="flex items-center bg-gray-50">
        <div className="flex-1 h-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl my-2">
          <div className="flex flex-col md:flex-row">
            <div className="h-32 md:h-auto md:w-1/2">
              <img
                className="object-cover w-full h-full"
                src={SignupImage}
                alt="img"
              />
            </div>
            <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
              <div className="w-full">
                <div className="flex justify-center">
                  <h2 className="text-2xl font-bold text-center text-indigo-600">
                    INoteBook
                  </h2>
                </div>
                <h1 className="mb-4 text-xl text-center text-gray-700">
                  Sign up
                </h1>
                <form onSubmit={CreateUser}>
                  <div>
                    <label className="block text-sm">Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 text-sm border rounded-md focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-600"
                      placeholder="Name"
                      value={crediantials.name}
                      onChange={onChange}
                      name="name"
                      minLength={3}
                      required
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 text-sm border rounded-md focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-600"
                      placeholder="Email Address"
                      value={crediantials.email}
                      onChange={onChange}
                      autoComplete="username"
                      name="email"
                      minLength={5}
                      required
                    />
                  </div>
                  <div>
                    <label className="block mt-4 text-sm">Password</label>
                    <input
                      className="w-full px-4 py-2 text-sm border rounded-md focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-600"
                      placeholder="Password"
                      type="password"
                      value={crediantials.password}
                      onChange={onChange}
                      autoComplete="new-password"
                      name="password"
                      minLength={8}
                      required
                    />
                  </div>
                  <div>
                    <label className="block mt-4 text-sm">
                      Confirm Password
                    </label>
                    <input
                      className="w-full px-4 py-2 text-sm border rounded-md focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-600"
                      placeholder="Confirm Password"
                      type="password"
                      value={crediantials.cpassword}
                      onChange={onChange}
                      autoComplete="new-password"
                      name="cpassword"
                      minLength={8}
                      required
                    />
                  </div>
                  <button
                    className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-indigo-600 border border-transparent rounded-lg active:bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:shadow-outline-blue"
                    href="#"
                  >
                    Sign up
                  </button>
                </form>
                <div className="mt-4 text-center">
                  <p className="text-sm">
                    Already have an account yet?{" "}
                    <Link
                      to="/login"
                      className="text-indigo-600 hover:underline"
                    >
                      {" "}
                      Login
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
