import { BookOpen, Mail, Phone, MapPin, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 border-b border-gray-800 pb-12">
          
          {/* Brand Col */}
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-xl">
                <BookOpen size={24} className="text-white" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">
                LMS<span className="text-blue-500">Academy</span>
              </span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Empowering learners worldwide through accessible, high-quality, and interactive online education.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Globe size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Globe size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Globe size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Globe size={20} /></a>
            </div>
          </div>

          {/* Links Col 1 */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Explore</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Course Catalog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Our Faculties</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Student Success</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Scholarships</a></li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Resources</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Career Guide</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Community</a></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start text-gray-400">
                <MapPin size={20} className="mr-3 text-blue-500 flex-shrink-0 mt-1" />
                <span>123 Innovation Drive,<br/>Tech Valley, CA 94043</span>
              </li>
              <li className="flex items-center text-gray-400">
                <Phone size={20} className="mr-3 text-blue-500 flex-shrink-0" />
                <span>+1 (800) 555-0199</span>
              </li>
              <li className="flex items-center text-gray-400">
                <Mail size={20} className="mr-3 text-blue-500 flex-shrink-0" />
                <span>support@lmsacademy.edu</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} LMS Academy. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
