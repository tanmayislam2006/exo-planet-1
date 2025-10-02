import React, { use, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import AuthContext from "../../Context/AuthContext";

const Login = () => {
  const {
    googleLogin,
    errorMessage,
    setErrorMessage,
    loginUser,
    refresh,
    setRefresh,
  } = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
    const [showPass, setShowPass] = useState(false);
  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        const user = result.user;
        // check user from database
        fetch(`https://green-connect-server.onrender.com/user/${user?.uid}`)
          .then((res) => res.json())
          .then((data) => {
            const availableUser = data?.user;
            // if user is not available
            if (!availableUser) {
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
            }
          });
        if (user) {
          // update log in information   in db
          fetch("https://green-connect-server.onrender.com/login", {
            method: "PATCH",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              email: user?.email,
              lastSignInTime: user?.metadata?.lastSignInTime,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.modifiedCount) {
                setRefresh(!refresh);
              }
            });
        }

        navigate(location?.state || "/");

        toast.success("Login successful!");
      })
      .catch((error) => {
        setErrorMessage(error.message);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: errorMessage,
        });
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    loginUser(email, password)
      .then((result) => {
        const user = result.user;
        if (user) {
          // update information in db
          fetch("https://green-connect-server.onrender.com/login", {
            method: "PATCH",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              email: user?.email,
              lastSignInTime: user?.metadata?.lastSignInTime,
            }),
          })
            .then((res) => res.json())
            .then((data) => {});
        }
        navigate(location?.state || "/");
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "Welcome back!",
        });
      })
      .catch((error) => {
        setErrorMessage(error.message);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: errorMessage,
        });
      });
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <div className="w-full border border-gray-200 max-w-md  rounded-lg shadow-md overflow-hidden">
        <div className="bg-accent p-6 text-center">
          <img
            alt="exo-planet-finder"
            className="h-16 mx-auto mb-2"
          />
          <h2 className="text-xl font-bold text-white">Welcome Back</h2>
          <p className="text-white">Connect with your gardening community</p>
        </div>

        <div className="p-6">
          <button
            onClick={handleGoogleLogin}
            className="w-full cursor-pointer flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-md   transition-colors mb-4"
          >
            <FcGoogle className="text-2xl" />
            <span>Continue with Google</span>
          </button>

          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* email Field */}
            <div className="mb-4">
              <label htmlFor="email" className="block  font-medium mb-2">
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
              <label htmlFor="password" className="block  font-medium mb-2">
                Password <span className="text-red-700">*</span>
              </label>
              <input
                type={showPass ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary cursor-pointer text-white py-2 px-4 rounded-md hover:bg-[#3e8e41] transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50"
            >
              Log In
            </button>
          </form>

          <div className="mt-4 text-center">
            <a href="#" className="text-primary hover:underline">
              Forgot password?
            </a>
            <p className="mt-2">
              Don't have an account?{" "}
              <Link
                state={location.state}
                to="/register"
                className="text-primary font-medium hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
