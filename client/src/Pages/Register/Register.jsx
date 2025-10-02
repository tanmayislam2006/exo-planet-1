import React, { useContext, useState } from 'react';
import { Eye, EyeOff, User, Lock, Mail, Rocket } from 'lucide-react';
import AuthContext from '../../Context/AuthContext';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';

export default function RegisterForm() {
  const { createAccount, setFirebaseUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.username || !formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password should be at least 6 characters');
      return;
    }

    setIsLoading(true);
    
    createAccount(formData.email, formData.password)
      .then((userCredential) => {
        const user = userCredential.user;
        setFirebaseUser(user);
        
        toast.success('Account created successfully! 🚀', {
          position: "top-right",
          autoClose: 3000,
        });
        
        // Navigate to home page after successful registration
        setTimeout(() => {
          navigate('/');
        }, 1500);
      })
      .catch((error) => {
        console.error('Error creating account:', error);
        let errorMessage = 'Failed to create account. Please try again.';
        
        if (error.code === 'auth/email-already-in-use') {
          errorMessage = 'Email is already registered.';
        } else if (error.code === 'auth/invalid-email') {
          errorMessage = 'Invalid email address.';
        } else if (error.code === 'auth/weak-password') {
          errorMessage = 'Password is too weak.';
        }
        
        toast.error(errorMessage);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-8" style={{ 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)' 
    }}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-40 h-40 bg-white/5 rounded-full animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-32 h-32 bg-white/10 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-40 w-28 h-28 bg-white/5 rounded-full animate-bounce delay-500"></div>
        <div className="absolute bottom-40 right-20 w-44 h-44 bg-white/10 rounded-full animate-pulse delay-1500"></div>
      </div>

      {/* Register Card */}
      <div className="relative z-10 bg-white/20 backdrop-blur-lg rounded-3xl p-12 w-full max-w-md mx-4 shadow-2xl border border-white/30">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-14 h-14 bg-gradient-to-r from-purple-600 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Rocket className="w-8 h-8 text-white" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Exo Planet
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Join the Journey</h2>
          <p className="text-white/80 text-sm">Discover the universe with us</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Field */}
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 transition-transform duration-300 group-focus-within:scale-110">
              <User className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500" />
            </div>
            <input
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/90 rounded-2xl text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all duration-300 border border-transparent focus:border-blue-400 shadow-lg"
            />
          </div>

          {/* Email Field */}
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 transition-transform duration-300 group-focus-within:scale-110">
              <Mail className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500" />
            </div>
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/90 rounded-2xl text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all duration-300 border border-transparent focus:border-blue-400 shadow-lg"
            />
          </div>

          {/* Password Field */}
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 transition-transform duration-300 group-focus-within:scale-110">
              <Lock className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className="w-full pl-12 pr-12 py-4 bg-white/90 rounded-2xl text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all duration-300 border border-transparent focus:border-blue-400 shadow-lg"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors duration-300 p-1 rounded-lg hover:bg-white/50"
            >
              {showPassword ? 
                <EyeOff className="w-5 h-5" /> : 
                <Eye className="w-5 h-5" />
              }
            </button>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 px-8 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold rounded-2xl hover:from-purple-700 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 focus:scale-95 shadow-lg ${
              isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-xl'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Creating Account...
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <Rocket className="w-5 h-5" />
                Launch Your Journey
              </div>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-8">
          <div className="flex-1 h-px bg-white/30"></div>
          <span className="px-4 text-white/60 text-sm">Already exploring?</span>
          <div className="flex-1 h-px bg-white/30"></div>
        </div>

        {/* Sign in link */}
        <div className="text-center">
          <Link 
            to={'/login'} 
            className="inline-flex items-center gap-2 text-white/80 hover:text-white font-medium transition-colors duration-300 hover:underline"
          >
            Return to Command Center
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}