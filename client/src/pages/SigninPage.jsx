import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import Swal from "sweetalert2";
import 'ldrs/ring';
import { GlobalContext } from "../Context/context";
import sign from '../assets/Signin.gif';


const Login = () => {
  const { dispatch } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    password: "",
    email: "",
  };

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3000/api/user/login', values);
      dispatch({
        type: 'USER_LOGIN',
        token: response.data.token,
      });
      setLoading(false);

      // SweetAlert for success
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: response.data.message,
        confirmButtonText: 'OK',
      });

      navigate('/products');
    } catch (error) {
      setLoading(false);

      // SweetAlert for error
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Login failed. Please check your credentials.',
        confirmButtonText: 'OK',
      });

      console.error("Login failed:", error);
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <l-ring size="60" color="blue"></l-ring>
        </div>
      )}

      <div className="max-w-md w-full p-4 ">
        {/* <div className="flex justify-center mb-6">
          <img src={sign} alt="signin image" className="w-32 h-38" />
        </div> */}

        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-4">Sign in to your account</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              className={`mt-1 p-3 w-full border ${formik.errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring focus:border-indigo-500`}
            />
            {formik.errors.email && <p className="mt-2 text-red-500 text-sm">{formik.errors.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              onChange={formik.handleChange}
              value={formik.values.password}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-indigo-500"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-slate-900 text-white py-3 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring focus:border-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
        
      </div>
      <div className="flex justify-center mb-6">
          <img src={sign} alt="signin image" className="w-42 h-42" />
        </div>
    </div>
  );
};

export default Login;
