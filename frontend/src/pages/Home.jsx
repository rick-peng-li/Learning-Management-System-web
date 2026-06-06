import { useState, useEffect } from 'react';
import { Star, Clock, Video } from 'lucide-react';

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/courses`);
        const data = await response.json();
        setCourses(data); 
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch courses");
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleEnroll = async (courseId) => {
    const token = localStorage.getItem('userToken');
    if (!token) {
      alert("Please login first to enroll in courses!");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/enrollments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ courseId })
      });
      const data = await response.json();
      
      if (response.ok) {
        alert("Successfully Enrolled! Go to your Dashboard to view it.");
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (err) {
      alert("Failed to enroll.");
    }
  };

  return (
    <div className="bg-white min-h-screen">
      
      {/* HERO SECTION */}
      <div className="relative bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            className="w-full h-full object-cover opacity-30" 
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop" 
            alt="Programming background" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
              Unlock your potential with <span className="text-blue-400">expert-led</span> courses.
            </h1>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
              Master full-stack web development, data science, and design. Build a complete Learning Management System and start your career today.
            </p>
            <div className="flex gap-4">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-500/30">
                Explore Courses
              </button>
              <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/20 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* COURSE CATALOG SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold mb-2 text-gray-900">A broad selection of courses</h2>
        <p className="text-gray-600 mb-10 text-lg">Choose from over 100,000 online video courses with new additions published every month</p>
        
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center p-16 bg-gray-50 rounded-2xl border border-gray-200 border-dashed">
            <p className="text-xl text-gray-500 font-medium">No courses published yet. Ask an Admin to create one!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {courses.map((course, index) => (
              <div key={course._id} className="group course-card-hover bg-white rounded-xl overflow-hidden border border-gray-100 flex flex-col h-full cursor-pointer">
                
                {/* Course Image Header */}
                <div className="relative h-48 overflow-hidden bg-gray-200">
                  {/* Using a placeholder image based on the index to make them look different */}
                  <img 
                    src={`https://images.unsplash.com/photo-${1555066931 + index * 1000}-4365d14bab8c?w=500&auto=format&fit=crop&q=60`} 
                    alt="Course Thumbnail" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format&fit=crop&q=60' }}
                  />
                  {index === 0 && (
                    <div className="absolute top-3 left-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded shadow-sm">
                      Bestseller
                    </div>
                  )}
                </div>

                {/* Course Content */}
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2 font-medium">
                    {course.instructor?.name || 'LMS Expert'}
                  </p>
                  
                  {/* Rating Fake Data */}
                  <div className="flex items-center mb-2 space-x-1">
                    <span className="text-yellow-500 font-bold text-sm">4.8</span>
                    <div className="flex text-yellow-400">
                      <Star size={14} fill="currentColor" />
                      <Star size={14} fill="currentColor" />
                      <Star size={14} fill="currentColor" />
                      <Star size={14} fill="currentColor" />
                      <Star size={14} fill="currentColor" className="text-gray-300" />
                    </div>
                    <span className="text-xs text-gray-400">(3,421)</span>
                  </div>

                  <div className="flex items-center text-xs text-gray-500 mb-4 space-x-3">
                    <span className="flex items-center"><Clock size={12} className="mr-1"/> 12.5 total hours</span>
                    <span className="flex items-center"><Video size={12} className="mr-1"/> 142 lectures</span>
                  </div>

                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-100">
                    <span className="text-2xl font-black text-gray-900">${course.price}</span>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleEnroll(course._id); }} 
                      className="bg-gray-900 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-600 transition-colors shadow-sm"
                    >
                      Enroll
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
