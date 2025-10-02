// components/JoinUs.tsx
import React, { useState } from 'react';
import SignUp from './SignUp';
import Login from './Login';

const JoinUs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'signup' | 'login'>('signup'); // Default to signup based on image

  return (
    <div className="relative w-96"> {/* Container for the overlapping forms */}
      {/* Background/Base Form (e.g., SignUp, as it appears lighter and behind) */}
      <div className={`${activeTab === 'signup' ? 'block' : 'hidden'}`}>
        <SignUp />
      </div>

      {/* Overlapping Login/Signup Card */}
      <div className={`absolute top-0 right-0 transform translate-x-1/4 translate-y-1/4 w-96 rounded-lg shadow-xl overflow-hidden
                    ${activeTab === 'login' ? 'block z-10' : 'hidden'}`}>
        <div className="flex bg-gray-800 text-white">
          <button
            className={`flex-1 py-3 text-center font-semibold ${
              activeTab === 'signup' ? 'bg-blue-600' : 'hover:bg-gray-700'
            }`}
            onClick={() => setActiveTab('signup')}
          >
            Sign Up
          </button>
          <button
            className={`flex-1 py-3 text-center font-semibold ${
              activeTab === 'login' ? 'bg-blue-600' : 'hover:bg-gray-700'
            }`}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
        </div>
        <Login />
      </div>
    </div>
  );
};

export default JoinUs;