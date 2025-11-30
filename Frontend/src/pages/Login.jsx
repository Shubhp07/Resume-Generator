import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowLeft,
  LogIn,
  AlertCircle,
  FileText,
} from "lucide-react";
import axios from "axios";
import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      // console.log("Login response full:", response.data);
      // console.log("Access Token:", response.data.accessToken);

      if (response.status === 200) {
        const {
          accessToken,
          refreshToken,
          userType,
          email,
          userId,
          fullName,
          profilePicture,
        } = response.data;

        localStorage.setItem("token", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem(
          "user",
          JSON.stringify({ fullName, email, userType, userId, profilePicture })
        );

        if (userType.toLowerCase() === "user") {
          navigate("/resume-builder");
        } else if (userType.toLowerCase() === "admin") {
          navigate("/adminDashboard");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Server error during login.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
          <div className="flex justify-center mb-6">
            <div className="flex items-center">
              <FileText className="h-10 w-10 text-blue-600 mr-3" />
              <span className="text-3xl font-bold text-gray-900">
                ResumePrep
              </span>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-600">Sign in to your account to continue</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <label
                  htmlFor="rememberMe"
                  className="ml-2 text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>
              <a
                href="#"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center"
            >
              <LogIn className="h-5 w-5 mr-2" />
              Sign In
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>
          </div>

          {/* Social Login Buttons Grid */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            {/* Google Login - styled to match Facebook */}
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  try {
                    const res = await axios.post(
                      "http://localhost:5000/api/auth/google",
                      {
                        credential: credentialResponse.credential,
                      }
                    );

                    const {
                      accessToken,
                      userType,
                      email,
                      userId,
                      fullName,
                      profilePicture,
                    } = res.data;

                    // Save auth data
                    localStorage.setItem("token", accessToken);
                    localStorage.setItem(
                      "user",
                      JSON.stringify({
                        fullName,
                        email,
                        userType,
                        userId,
                        profilePicture,
                      })
                    );

                    // Redirect user
                    if (userType === "user")
                      navigate("/resume-builder");
                    else if (userType === "admin")
                      navigate("/adminDashboard");
                    else
                      navigate("/");
                  } catch (error) {
                    console.error("Google Login Error:", error);
                    alert("Google Login Failed");
                  }
                }}
                onError={() => {
                  console.log("Google Login Failed");
                }}
                // Custom render
                renderButton={(props) => (
                  <button
                    onClick={props.onClick}
                    disabled={props.disabled}
                    className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
                  >
                    {/* Google SVG logo */}
                    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="#EA4335"
                        d="M12 10.2v3.6h5.1c-.2 1.2-.9 2.2-2 2.9l3 2.3c1.7-1.5 2.6-3.7 2.6-6.2 0-.5 0-1-.1-1.4H12z"
                      ></path>
                      <path
                        fill="#34A853"
                        d="M12 19c1.6 0 2.9-.5 3.8-1.3l-3-2.3c-.8.5-1.8.8-2.8.8-2.1 0-3.9-1.4-4.5-3.4l-3 2.3A7.994 7.994 0 0 0 12 19z"
                      ></path>
                      <path
                        fill="#FBBC05"
                        d="M7.5 13.3c-.3-.9-.3-1.8 0-2.7l-3-2.3A8.022 8.022 0 0 0 4 12c0 1.3.3 2.6 1.2 3.7l3-2.4z"
                      ></path>
                      <path
                        fill="#4285F4"
                        d="M12 6.3c.9 0 1.7.2 2.3.7l1.8-1.8C15.2 4.2 13.7 3.5 12 3.5A7.994 7.994 0 0 0 4.5 8.6l3 2.3C8.2 9.5 9.9 8.3 12 8.3z"
                      ></path>
                    </svg>
                    <span>Sign in with Google</span>
                  </button>
                )}
              />
            </div>

            {/* Facebook Login - styled identically */}
            <button
              type="button"
              className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
              disabled
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z" />
              </svg>
              <span className="ml-2">Facebook</span>
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signin"
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Create one here
              </Link>
            </p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Your account is secure</p>
              <p>
                We use industry-standard encryption to protect your personal
                information and job search data.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
