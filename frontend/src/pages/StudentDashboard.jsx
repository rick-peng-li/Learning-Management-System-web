import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users } from 'lucide-react';

const StudentDashboard = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('userToken');
        
        // Fetch Enrollments
        // const resEnroll = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/enrollments/my-courses', {
        //   headers: { 'Authorization': `Bearer ${token}` }
        // });
        const resEnroll = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/enrollments/my-courses`, {
              headers: { 'Authorization': `Bearer ${token}` }
        });
        if (resEnroll.ok) {
          const enrollData = await resEnroll.json();
          setEnrollments(enrollData);
        }

        // Fetch Faculties (Teachers)
        const resFaculties = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/users/teachers`, {
  headers: { 'Authorization': `Bearer ${token}` }
});

if (resFaculties.ok) {
  const facultyData = await resFaculties.json();
  setFaculties(facultyData);
}

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 min-h-[calc(100vh-5rem)]">
      <div className="mb-10 border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
        <p className="text-gray-600 mt-2">View your enrolled courses and academy faculties.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Column - Enrolled Courses (Takes up 2/3 width on desktop) */}
        <div className="lg:col-span-2">
          <div className="flex items-center mb-6">
            <BookOpen className="text-blue-600 mr-2" />
            <h2 className="text-2xl font-bold text-gray-800">My Learning Path</h2>
          </div>

          {loading ? (
            <p className="text-gray-500">Loading your courses...</p>
          ) : enrollments.length === 0 ? (
            <div className="text-center p-10 bg-gray-50 rounded-xl border border-dashed border-gray-300">
              <p className="text-lg text-gray-500 mb-4">You haven't enrolled in any courses yet!</p>
              <Link to="/" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-md">Browse Catalog</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {enrollments.map((enrollment, index) => (
                <div key={enrollment._id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden">
                  <div className="h-32 bg-gray-200 relative">
                     <img 
                        src={`https://images.unsplash.com/photo-${1555066931 + index * 1000}-4365d14bab8c?w=500&auto=format&fit=crop&q=60`} 
                        alt="Course" 
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format&fit=crop&q=60' }}
                      />
                  </div>
                  <div className="p-5">
                    <div className="text-xs font-bold text-green-600 uppercase tracking-wide mb-1">Enrolled</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{enrollment.course.title}</h3>
                    <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                    <button className="w-full mt-1 bg-gray-900 text-white py-2 rounded-lg font-bold hover:bg-blue-600 transition-colors">
                      Continue Learning
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column - Faculty List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center mb-6 border-b border-gray-100 pb-4">
              <Users className="text-purple-600 mr-2" />
              <h2 className="text-xl font-bold text-gray-800">Our Faculties</h2>
            </div>
            
            {loading ? (
              <p className="text-gray-500 text-sm">Loading faculties...</p>
            ) : faculties.length === 0 ? (
              <p className="text-gray-500 text-sm">No faculties registered.</p>
            ) : (
              <div className="space-y-4">
                {faculties.map((faculty) => (
                  <div key={faculty._id} className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg mr-3 shadow-sm">
                      {faculty.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{faculty.name}</p>
                      <p className="text-xs text-gray-500">{faculty.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentDashboard;
