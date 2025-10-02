import { Link, NavLink } from "react-router";
import { use } from "react";
import { toast } from "react-toastify";
import AuthContext from '../../Context/AuthContext';
import {
  FaHome,
  FaSeedling,
  FaUserFriends,
  FaPlus,
  FaUser,
} from "react-icons/fa";

const Navbar = () => {
  const { logoutUser, user } = use(AuthContext);
  const handleLogOut = () => {
    logoutUser()
      .then((res) => {
        toast.success("Logout Successful");
      })
      .catch((err) => toast.error("Logout Failed " + err.message));
  };
  const links = (
    <>
      <li>
        {" "}
        <NavLink
          className={({ isActive }) =>
            isActive ? "font-bold text-primary underline" : "text-gray-500"
          }
          to={"/"}
        >
          Home
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            {" "}
            <NavLink
              className={({ isActive }) =>
                isActive ? "font-bold text-primary underline" : "text-gray-500"
              }
              to={"/shareTips"}
            >
              Share Tips
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  const dropdownLinks = (
    <>
      <li>
        <Link className="text-gray-500" to="/">
          Home
        </Link>
      </li>
    </>
  );

  return (
    <>
      <nav className="navbar  justify-between  bg-base-100 max-w-7xl mx-auto sticky top-0 z-10 shadow-sm">
        <Link to="/" className="flex items-center">
          <div className="w-16 rounded-full">
            <img
              alt="green connect logo"
              className="bg-transparent"
            />
          </div>
          <p className="font-bold text-xl hidden md:block">Green Connect</p>
        </Link>
        <div className="">
          <ul className="hidden lg:flex gap-6">{links}</ul>
        </div>
        {user ? (
          <div className="dropdown dropdown-end mr-5">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar relative group"
            >
              <div className="w-10 rounded-full">
                <img alt="user" src={user?.photoURL} />
              </div>
              <p className="absolute left-1/2 -translate-x-1/2 -bottom-10  bg-gray-800 text-white text-xs rounded px-3 py-1 opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-50">
                {user?.fullName}
              </p>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-64 p-2 shadow space-y-4"
            >
              {dropdownLinks}
              {user && (
                <li>
                  <button onClick={handleLogOut} className="btn">
                    Log Out
                  </button>
                </li>
              )}
            </ul>
          </div>
        ) : (
          <div className="">
            <Link
              className="bg-primary px-4 py-2 rounded-xl text-white font-bold"
              to="/login"
            >
              Log In
            </Link>
          </div>
        )}
      </nav>
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-base-100 border-t border-gray-200 shadow lg:hidden">
        <ul className="flex justify-around items-center py-2">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "flex flex-col items-center text-primary"
                  : "flex flex-col items-center text-gray-500"
              }
            >
              <FaHome size={22} />
              <span className="text-xs">Home</span>
            </NavLink>
          </li>
          {user ? (
            <>
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive
                      ? "flex flex-col items-center text-primary"
                      : "flex flex-col items-center text-gray-500"
                  }
                >
                  <FaPlus size={22} />
                  <span className="text-xs">Dashboard</span>
                </NavLink>
              </li>
            </>
          ) : null}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
