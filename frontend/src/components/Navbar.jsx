import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, LogOut, Search, Menu, X } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const token = localStorage.getItem('userToken');
  const userInfo = JSON.parse(localStorage.getItem('userInfo')); 

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userInfo');
    setIsMobileMenuOpen(false);
    navigate('/login');
  };

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="glass sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* LOGO */}
          <Link to="/" onClick={closeMenu} className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-xl shadow-lg">
              <BookOpen size={24} className="text-white" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-gray-900">
              LMS<span className="text-blue-600">Academy</span>
            </span>
          </Link>

          {/* SEARCH BAR (UDEMY STYLE - HIDDEN ON MOBILE) */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8 relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400 group-hover:text-blue-500 transition-colors" />
            </div>
            <input 
              type="text" 
              placeholder="Search for anything..." 
              className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 sm:text-sm transition-all shadow-sm"
            />
          </div>

          {/* DESKTOP NAV LINKS */}
          <div className="hidden md:flex items-center space-x-6">
            {token ? (
              <>
                <span className="text-gray-600 font-medium">
                  Welcome, <span className="text-gray-900 font-bold">{userInfo?.name}</span>
                </span>
                
                {userInfo?.role === 'Admin' && (
                  <Link to="/admin" className="text-gray-600 hover:text-blue-600 font-semibold transition-colors">
                    Admin Panel
                  </Link>
                )}

                {userInfo?.role === 'Teacher' && (
                  <Link to="/teacher" className="text-gray-600 hover:text-blue-600 font-semibold transition-colors">
                    Teacher Dashboard
                  </Link>
                )}
                
                <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 font-semibold transition-colors">
                  My Learning
                </Link>
                
                <button onClick={handleLogout} className="flex items-center justify-center p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all" title="Logout">
                  <LogOut size={22} />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-blue-600 font-bold transition-colors">
                  Log in
                </Link>
                <Link to="/register" className="bg-gray-900 text-white px-6 py-2.5 rounded-full font-bold hover:bg-gray-800 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none p-2"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE MENU DROPDOWN (ONLY SHOWS ON PHONES) */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute w-full bg-white shadow-xl border-t border-gray-100">
          <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
            
            {/* Mobile Search */}
            <div className="relative mt-2 mb-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input 
                type="text" 
                placeholder="Search..." 
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {token ? (
              <>
                <div className="px-3 py-2 border-b border-gray-100 mb-2">
                  <span className="text-gray-500 text-sm">Signed in as</span>
                  <p className="font-bold text-gray-900">{userInfo?.name}</p>
                </div>
                
                {userInfo?.role === 'Admin' && (
                  <Link to="/admin" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-semibold text-gray-700 hover:text-blue-600 hover:bg-gray-50">
                    Admin Panel
                  </Link>
                )}

                {userInfo?.role === 'Teacher' && (
                  <Link to="/teacher" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-semibold text-gray-700 hover:text-blue-600 hover:bg-gray-50">
                    Teacher Dashboard
                  </Link>
                )}
                
                <Link to="/dashboard" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-semibold text-gray-700 hover:text-blue-600 hover:bg-gray-50">
                  My Learning
                </Link>
                
                <button onClick={handleLogout} className="w-full text-left flex items-center px-3 py-2 rounded-md text-base font-semibold text-red-600 hover:bg-red-50 mt-2">
                  <LogOut size={20} className="mr-2" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-bold text-gray-700 hover:text-blue-600 hover:bg-gray-50">
                  Log in
                </Link>
                <Link to="/register" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-bold text-white bg-blue-600 hover:bg-blue-700 mt-2 text-center shadow-sm">
                  Sign up for free
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
