import React, { useState, use } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import AuthContext from "../../Context/AuthContext";

const Register = () => {
  const {
    errorMessage,
    setErrorMessage,
    googleLogin,
    createAccount,
    refresh,
    setRefresh,
  } = use(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        const user = result.user;
        const userProfile = {
          email: user?.email,
          fullName: user?.displayName,
          photoURL: user?.photoURL,
          creationTime: user?.metadata?.creationTime,
          lastSignInTime: user?.metadata?.lastSignInTime,
          uid: user?.uid,
        };
        fetch("https://green-connect-server.onrender.com/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userProfile),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId) {
              setRefresh(!refresh);
              setErrorMessage("");
            }
          });
        setErrorMessage("");
        navigate(location?.state || "/");
        toast.success("Registration Successful");
      })
      .catch((error) => {
        setErrorMessage(error.message);
        Swal.fire({
          icon: "error",
          title: "Failed...",
          text: error.message,
        });
      });
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const { email, password, ...data } = Object.fromEntries(formData.entries());
    if (passwordError) {
      toast.error("Invalid Password", passwordError, "error");
      return;
    }
    createAccount(email, password)
      .then((result) => {
        // save user in db
        const userProfile = {
          email,
          ...data,
          creationTime: result.user?.metadata?.creationTime,
          lastSignInTime: result.user?.metadata?.lastSignInTime,
          uid: result.user?.uid,
        };
        fetch("https://green-connect-server.onrender.com/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userProfile),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId) {
              setErrorMessage("");
              toast.success("Registration Successful");
              setRefresh(!refresh);
              navigate(location?.state || "/");
            }
          });
      })
      .catch((error) => {
        setErrorMessage(error.message);
        toast.error("Registration Failed");
      });
    setErrorMessage("");
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-no-repeat bg-cover bg-center">
        <div className="border border-gray-200 shadow-lg rounded-lg p-8 max-w-md w-full my-10">
          <h2 className="text-2xl font-bold text-center mb-6">
            Create an Account
          </h2>
          <form onSubmit={handleRegister}>
            {/* Full Name Field */}
            <div className="mb-4 ">
              <label
                htmlFor="fullName"
                className="block  font-medium mb-2"
              >
                Full Name <span className="text-red-700">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Enter your full name"
                className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none"
                required
              />
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block  font-medium mb-2"
              >
                Email <span className="text-red-700">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none"
                required
              />
            </div>

            {/* Photo URL Field */}
            <div className="mb-4">
              <label
                htmlFor="photoURL"
                className="block  font-medium mb-2"
              >
                Photo URL
              </label>
              <input
                type="url"
                id="photoURL"
                name="photoURL"
                placeholder="Enter your photo URL (optional)"
                className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none"
              />
            </div>

            {/* Password Field */}
            <div className="mb-4 relative ">
              <p
                onClick={() => setShowPass(!showPass)}
                className="absolute right-8 bottom-3 cursor-pointer"
              >
                {showPass ? (
                  <FaRegEyeSlash size={20} />
                ) : (
                  <FaRegEye size={20} />
                )}
              </p>
              <label
                htmlFor="password"
                className="block  font-medium mb-2"
              >
                Password <span className="text-red-700">*</span>
              </label>
              <input
                type={showPass ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none"
                onChange={handlePasswordChange}
                required
              />
            </div>

            {/* Error Message */}
            {passwordError && (
              <p className="text-red-600 dark:text-red-400 text-sm mt-1">
                {passwordError}
              </p>
            )}
            {errorMessage && (
              <p className="text-red-600 dark:text-red-400 text-sm mb-4">
                {errorMessage}
              </p>
            )}

            {/* Register Button */}
            <button
              type="submit"
              className="cursor-pointer w-full bg-primary text-white py-2 px-4 rounded-lg "
            >
              Register
            </button>
          </form>

          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-gray-500">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            className="w-full cursor-pointer flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-md   transition-colors mb-4"
          >
            <FcGoogle className="text-2xl" />
            <span>Continue with Google</span>
          </button>
          <p className="text-center mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
