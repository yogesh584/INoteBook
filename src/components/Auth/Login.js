import React, { useEffect, useState } from "react";
import { Link, useNavigate} from "react-router-dom";

const Login = (props) => {
    const [crediantials,setCrediantials] = useState({email: "",password: ""})
    let navigate = useNavigate();
    const LoginUser = async (e)=>{
        e.preventDefault();
        const response = await fetch ("http://localhost:4000/api/auth/login",{
            method: "POST",
            headers:{
                "Content-type" : "application/json"
            },
            body: JSON.stringify({email: crediantials.email,password: crediantials.password})
        });
        const data = await response.json();
        if(data.success){
            localStorage.setItem("authToken",data.authToken);
            navigate("/");
            props.ShowAlert("Logged In Successfully", "Success", "green-500");
        }
        else{
            console.log(data.error);
            if(data.error == undefined || data.error == null){
              props.ShowAlert("Invalid Crediantials","Error","red-500");  
            }
            else{
              props.ShowAlert(data.error,"Error","red-500");
            }
        }
    }

    const onChange = (e)=>{
        setCrediantials({...crediantials,[e.target.name] : e.target.value});
    }

    useEffect(()=>{
      if (localStorage.getItem("authToken")) {
        navigate("/");
      }
    })

  return (
    <div>
      <div className="bg-white dark:bg-gray-900">   
        <div className="flex justify-center h-[88.3vh]">
          <div
            className="hidden bg-cover lg:block lg:w-2/3"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)",
            }}
          >
            <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
              <div>
                <h2 className="text-4xl font-bold text-white">INoteBook</h2>

                <p className="max-w-xl mt-3 text-gray-300">
                  The most beautiful note taking app. Remember everything and
                  tackle any project with your notes, tasks, and schedule all in
                  one place.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
            <div className="flex-1">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-center text-gray-700 dark:text-white">
                  INoteBook
                </h2>

                <p className="mt-3 text-gray-500 dark:text-gray-300">
                  Sign in to access your account
                </p>
              </div>

              <div className="mt-8">
                <form onSubmit={LoginUser}>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="example@example.com"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      value={crediantials.email}
                      onChange = {onChange}
                      autoComplete = "username"
                    />
                  </div>

                  <div className="mt-6">
                    <div className="flex justify-between mb-2">
                      <label
                        htmlFor="password"
                        className="text-sm text-gray-600 dark:text-gray-200"
                      >
                        Password
                      </label>
                      <a
                        href="#"
                        className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline"
                      >
                        Forgot password?
                      </a>
                    </div>

                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Your Password"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      value={crediantials.password}
                      onChange = {onChange}
                      autoComplete="current-password"
                    />
                  </div>

                  <div className="mt-6">
                    <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                      Sign in
                    </button>
                  </div>
                </form>

                <p className="mt-6 text-sm text-center text-gray-400">
                  Don&#x27;t have an account yet?{" "}
                  <Link
                    to="/signup"
                    className="text-blue-500 focus:outline-none focus:underline hover:underline"
                  >
                    Sign up
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
