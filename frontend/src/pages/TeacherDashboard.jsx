import { useState, useEffect } from 'react';
import { PlusCircle, FileText } from 'lucide-react';

const TeacherDashboard = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem('userToken');
        // Because of our middleware, Teachers can fetch the users list too!
        const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/users`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          // Filter to only show Students
          setStudents(data.filter(u => u.role === 'Student'));
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('userToken');
      const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/courses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, description, price: Number(price) })
      });

      if (response.ok) {
        setMessage('Course published successfully!');
        setTitle(''); setDescription(''); setPrice('');
      } else {
        setMessage('Failed to publish course.');
      }
    } catch (err) {
      setMessage('Error connecting to server.');
    }
  };

  const handleCreateReport = (studentName) => {
    alert(`Report feature coming soon for ${studentName}!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Teacher Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage your courses and student reports here.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Create Course Section */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <div className="flex items-center mb-6">
            <PlusCircle className="text-blue-600 mr-2" />
            <h2 className="text-2xl font-bold text-gray-800">Publish New Course</h2>
          </div>
          
          {message && (
            <div className={`p-4 mb-6 rounded ${message.includes('success') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleCreateCourse} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Course Title</label>
              <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" placeholder="e.g. Advanced React Patterns" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
              <textarea required value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all h-24" placeholder="What will students learn?"></textarea>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Price ($)</label>
              <input type="number" required value={price} onChange={(e) => setPrice(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" placeholder="49.99" />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-sm">
              Publish Course
            </button>
          </form>
        </div>

        {/* Student Reports Section */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <div className="flex items-center mb-6">
            <FileText className="text-purple-600 mr-2" />
            <h2 className="text-2xl font-bold text-gray-800">Student Reports</h2>
          </div>
          
          {loading ? (
            <p className="text-gray-500">Loading students...</p>
          ) : students.length === 0 ? (
            <p className="text-gray-500 bg-gray-50 p-4 rounded text-center">No students registered yet.</p>
          ) : (
            <div className="space-y-3">
              {students.map(student => (
                <div key={student._id} className="flex justify-between items-center p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                  <div>
                    <p className="font-bold text-gray-900">{student.name}</p>
                    <p className="text-sm text-gray-500">{student.email}</p>
                  </div>
                  <button onClick={() => handleCreateReport(student.name)} className="bg-purple-100 text-purple-700 px-3 py-1.5 rounded font-medium hover:bg-purple-200 transition-colors text-sm">
                    Create Report
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default TeacherDashboard;
