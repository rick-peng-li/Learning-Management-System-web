import { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/auth/forgotpassword`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      
      if (response.ok) {
        setMessage(data.message);
        setToken(data.resetToken); // Displaying it directly for the demo
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Something went wrong. Is the backend running?');
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Forgot Password?</h2>
          <p className="text-gray-600">Enter your email and we'll send you a reset link.</p>
        </div>

        {error && <div className="bg-red-50 text-red-700 p-4 mb-6 rounded-lg font-medium">{error}</div>}
        
        {message ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <h3 className="text-green-800 font-bold mb-2">Success!</h3>
            <p className="text-green-700 mb-4">{message}</p>
            <div className="bg-white p-3 rounded border border-gray-200 mb-4 font-mono text-sm break-all">
              {token}
            </div>
            <Link 
              to={`/reset-password/${token}`} 
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors"
            >
              Click here to Reset Password
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
              <input 
                type="email" required onChange={(e) => setEmail(e.target.value)} 
                className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                placeholder="you@example.com"
              />
            </div>
            <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-gray-900 hover:bg-blue-600 transition-colors">
              Send Reset Link
            </button>
          </form>
        )}
        
        <div className="mt-6 text-center">
          <Link to="/login" className="font-bold text-blue-600 hover:text-blue-500">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
