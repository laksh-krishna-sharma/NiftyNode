// components/login.tsx
import React, { useState } from 'react';
import Link from 'next/link';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false); // Assuming this checkbox also applies to login from the image

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
        alert("You must agree to the Terms and Privacy Policy.");
        return;
    }
    // Handle login logic here (e.g., API call, authentication)
    console.log({ email, password, agreeTerms });
    alert('Login Attempted!');
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-gray-900 text-white rounded-lg shadow-xl">
      <h2 className="sr-only">Login to Your Account</h2> {/* Visually hidden title */}
      <div className="mb-4">
        <label htmlFor="loginEmail" className="sr-only">Email Address</label>
        <input
          type="email"
          id="loginEmail"
          placeholder="Email Address"
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-2">
        <label htmlFor="loginPassword" className="sr-only">Password</label>
        <input
          type="password"
          id="loginPassword"
          placeholder="Password"
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="mb-4 text-right">
        <Link href="/forgot-password">
          <a className="text-blue-400 text-sm hover:underline">Forgot Password?</a>
        </Link>
      </div>
      <div className="mb-6 flex items-center">
        <input
          type="checkbox"
          id="loginAgreeTerms"
          className="form-checkbox h-4 w-4 text-blue-600 rounded bg-gray-800 border-gray-700"
          checked={agreeTerms}
          onChange={(e) => setAgreeTerms(e.target.checked)}
          required
        />
        <label htmlFor="loginAgreeTerms" className="ml-2 text-sm text-gray-400">
          I agree to Terms of Service and Privacy Policy
        </label>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
      >
        Secure Login
      </button>
      <p className="mt-4 text-center text-sm text-gray-400">
        Already have an account? {' '}
        <Link href="/login">
          <a className="text-blue-400 hover:underline">Login</a>
        </Link>
      </p>
    </form>
  );
};

export default Login;