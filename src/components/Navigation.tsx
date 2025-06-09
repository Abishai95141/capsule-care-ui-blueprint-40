
import React, { useState } from 'react';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useApp } from '@/contexts/AppContext';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { cart } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const isProfilePage = location.pathname === '/profile';

  const navigationItems = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/shop' },
    { label: 'About Us', path: '/about-us' },
    { label: 'Contact', path: '/contact-us' }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => handleNavigation('/')}
              className="text-xl sm:text-2xl font-bold text-green-600 hover:text-green-700 truncate"
            >
              Capsule Care
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex space-x-6 lg:space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`text-gray-700 hover:text-green-600 px-2 lg:px-3 py-2 text-sm font-medium transition-colors ${
                  location.pathname === item.path ? 'text-green-600' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Cart */}
            <button
              onClick={() => handleNavigation('/cart')}
              className="relative p-2 text-gray-700 hover:text-green-600 transition-colors"
            >
              <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center text-[10px] sm:text-xs">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Desktop User menu */}
            {user ? (
              <div className="hidden sm:flex items-center space-x-2">
                <button
                  onClick={() => handleNavigation('/profile')}
                  className="p-2 text-gray-700 hover:text-green-600 transition-colors"
                >
                  <User className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
                {isProfilePage && (
                  <button
                    onClick={() => handleNavigation('/')}
                    className="p-2 text-gray-700 hover:text-red-600 transition-colors"
                  >
                    <X className="h-5 w-5 sm:h-6 sm:w-6" />
                  </button>
                )}
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  size="sm"
                  className="text-xs sm:text-sm"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => handleNavigation('/auth')}
                className="bg-green-600 hover:bg-green-700 text-xs sm:text-sm px-3 sm:px-4"
                size="sm"
              >
                Sign In
              </Button>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-green-600 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`block w-full text-left px-4 py-2 text-base font-medium rounded-md transition-colors ${
                  location.pathname === item.path
                    ? 'text-green-600 bg-green-50'
                    : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            {/* Mobile User Actions */}
            {user ? (
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <button
                  onClick={() => handleNavigation('/profile')}
                  className="flex items-center w-full px-4 py-2 text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded-md transition-colors"
                >
                  <User className="h-5 w-5 mr-3" />
                  Profile
                </button>
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-4 py-2 text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded-md transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="border-t border-gray-200 pt-4">
                <Button
                  onClick={() => handleNavigation('/auth')}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Sign In
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;
