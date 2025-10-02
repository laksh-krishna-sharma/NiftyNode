// pages/about.tsx (or components/About.tsx if it's a section within a larger page)
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="flex-1 p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">About WealthWise</h1>
      <p className="text-lg text-gray-700 leading-relaxed mb-4">
        WealthWise is dedicated to empowering individuals to take control of their financial future. Our platform provides intuitive tools and insights to help you manage your investments, track your progress, and discover new opportunities.
      </p>
      <p className="text-lg text-gray-700 leading-relaxed mb-4">
        We believe that smart investing shouldn't be complicated. With WealthWise, you get a simple, powerful, and secure way to achieve financial peace of mind, no matter your experience level.
      </p>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">Our Mission</h2>
      <p className="text-lg text-gray-700 leading-relaxed">
        To make sophisticated financial management accessible to everyone, fostering a community of informed and successful investors.
      </p>
      {/* You could add more sections here like Team, Vision, etc. */}
    </div>
  );
};

export default About;