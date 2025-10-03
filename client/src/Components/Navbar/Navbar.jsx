import { Link, NavLink } from "react-router";
import { use } from "react";
import { toast } from "react-toastify";
import AuthContext from "../../Context/AuthContext";
import { 
  Rocket, 
  Home, 
  Users, 
  User, 
  LogOut, 
  Telescope,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const { logoutUser, firebaseUser } = use(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const handleLogOut = () => {
    logoutUser()
      .then((res) => {
        toast.success("Logout Successful");
      })
      .catch((err) => toast.error("Logout Failed " + err.message));
  };

  const navLinks = [
    { to: "/", label: "Home", icon: Home },
    { to: "/dashboard", label: "Explore Now", icon: Telescope },
  ];

  const NavLinkItem = ({ to, label, icon: Icon, isMobile = false }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-2 px-4 py-3 rounded-xl transition duration-300 ${
          isActive 
            ? "bg-white/20 text-white backdrop-blur-md border border-white/30 shadow-lg" 
            : "text-white/70 hover:text-white hover:bg-white/10"
        } ${isMobile ? "w-full text-base" : "text-sm"}`
      }
      onClick={() => setIsMobileMenuOpen(false)}
    >
      <Icon className="w-4 h-4" />
      {label}
    </NavLink>
  );

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-xl border-b border-purple-500/30 shadow-2xl shadow-purple-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group flex-shrink-0"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition duration-300">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <p className="font-bold text-lg bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Exo Planet Explorer
              </p>
              <p className="text-white/60 text-xs">Discover New Worlds</p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <NavLinkItem key={link.to} {...link} />
            ))}
          </div>

          {/* User Section */}
          <div className="flex items-center gap-4">
            {firebaseUser ? (
              <>
                {/* Desktop User Menu */}
                <div className="hidden lg:block dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition duration-300 cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center border border-white/30">
                      {firebaseUser?.photoURL ? (
                        <img 
                          alt="user" 
                          src={firebaseUser.photoURL} 
                          className="w-6 h-6 rounded-md object-cover"
                        />
                      ) : (
                        <User className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <span className="text-white text-sm font-medium max-w-32 truncate">
                      {firebaseUser?.displayName || firebaseUser?.email?.split('@')[0]}
                    </span>
                  </div>
                  
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu p-4 shadow-2xl bg-slate-800/95 backdrop-blur-xl rounded-2xl border border-purple-500/30 w-64 mt-2 space-y-2"
                  >
                    {/* User Info */}
                    <li className="px-3 py-2 border-b border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center border border-white/30">
                          {firebaseUser?.photoURL ? (
                            <img 
                              alt="user" 
                              src={firebaseUser.photoURL} 
                              className="w-8 h-8 rounded-md object-cover"
                            />
                          ) : (
                            <User className="w-5 h-5 text-white" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-semibold text-sm truncate">
                            {firebaseUser?.displayName || "Space Explorer"}
                          </p>
                          <p className="text-white/60 text-xs truncate">
                            {firebaseUser?.email}
                          </p>
                        </div>
                      </div>
                    </li>

                    {/* Navigation Links */}
                    {navLinks.map((link) => (
                      <li key={link.to}>
                        <Link 
                          to={link.to}
                          className="flex items-center gap-2 px-3 py-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition duration-300"
                        >
                          <link.icon className="w-4 h-4" />
                          {link.label}
                        </Link>
                      </li>
                    ))}
                    
                    {/* Logout Button */}
                    <li className="pt-2 border-t border-white/10">
                      <button 
                        onClick={handleLogOut} 
                        className="flex items-center gap-2 w-full px-3 py-2 bg-red-500/20 text-red-300 rounded-lg border border-red-500/30 hover:bg-red-500/30 hover:text-red-200 transition duration-300 text-sm"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="lg:hidden p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition duration-300"
                >
                  {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </>
            ) : (
              /* Login/Signup Buttons */
              <div className="flex items-center gap-3">
                <Link
                  className="hidden sm:block px-4 py-2 text-white/70 hover:text-white transition duration-300 font-medium text-sm"
                  to="/login"
                >
                  Sign In
                </Link>
                <Link
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-xl hover:from-purple-700 hover:to-blue-600 transition duration-300 shadow-lg font-semibold text-sm"
                  to="/register"
                >
                  Join Mission
                </Link>
                
                {/* Mobile Menu Button for non-logged in users */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="lg:hidden p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition duration-300"
                >
                  {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden pb-4">
            <div className="bg-slate-800/95 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-4 space-y-2">
              {/* Navigation Links */}
              {navLinks.map((link) => (
                <NavLinkItem key={link.to} {...link} isMobile={true} />
              ))}
              
              {/* User Info for Mobile when logged in */}
              {firebaseUser && (
                <>
                  <div className="px-4 py-3 border-t border-white/10 mt-2 pt-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center border border-white/30">
                        {firebaseUser?.photoURL ? (
                          <img 
                            alt="user" 
                            src={firebaseUser.photoURL} 
                            className="w-8 h-8 rounded-md object-cover"
                          />
                        ) : (
                          <User className="w-5 h-5 text-white" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold text-sm truncate">
                          {firebaseUser?.displayName || "Space Explorer"}
                        </p>
                        <p className="text-white/60 text-xs truncate">
                          {firebaseUser?.email}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Logout Button for Mobile */}
                  <button 
                    onClick={() => {
                      handleLogOut();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-2 w-full px-4 py-3 bg-red-500/20 text-red-300 rounded-xl border border-red-500/30 hover:bg-red-500/30 hover:text-red-200 transition duration-300 mt-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </>
              )}
              
              {/* Login/Signup for Mobile when not logged in */}
              {!firebaseUser && (
                <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full text-center px-4 py-3 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition duration-300"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full text-center px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-xl hover:from-purple-700 hover:to-blue-600 transition duration-300 font-semibold"
                  >
                    Join Mission
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;