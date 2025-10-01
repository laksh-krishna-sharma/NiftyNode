// components/sideBar.tsx
import React from 'react';
import Link from 'next/link';

interface NavLinkProps {
  href: string;
  icon: React.ReactNode;
  text: string;
  isActive?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ href, icon, text, isActive }) => (
  <Link href={href}>
    <a
      className={`flex items-center p-3 my-2 mx-3 rounded-lg text-white ${
        isActive ? 'bg-blue-600' : 'hover:bg-gray-700'
      }`}
    >
      <div className="mr-3">{icon}</div>
      <span>{text}</span>
    </a>
  </Link>
);

const SideBar: React.FC = () => {
  return (
    <aside className="w-64 h-screen bg-gray-900 text-white flex flex-col shadow-lg">
      {/* WealthWise Logo */}
      <div className="p-5 flex items-center border-b border-gray-700">
        {/* Placeholder for actual logo image */}
        <span role="img" aria-label="WealthWise Logo" className="text-2xl mr-2">💰</span>
        <h1 className="text-xl font-bold">WealthWise</h1>
      </div>

      {/* User Profile */}
      <div className="p-5 flex items-center border-b border-gray-700">
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-lg font-semibold mr-3">
          S
        </div>
        <div>
          <p className="font-semibold">Sarah</p>
          <p className="text-sm text-gray-400">View Profile</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 mt-4">
        <ul>
          <li>
            <NavLink
              href="/dashboard"
              icon={<DashboardIcon />}
              text="Dashboard"
              isActive={true} // Assuming Dashboard is the active page
            />
          </li>
          <li>
            <NavLink href="/home" icon={<HomeIcon />} text="Home" />
          </li>
          <li>
            <NavLink href="/about" icon={<AboutIcon />} text="About" />
          </li>
        </ul>
      </nav>

      {/* Help Link at the bottom */}
      <div className="mt-auto pb-4">
        <NavLink href="/help" icon={<HelpIcon />} text="Help" />
      </div>
    </aside>
  );
};

// Placeholder Icons (replace with actual SVG or icon library components)
const DashboardIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>;
const HomeIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>;
const AboutIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>;
const HelpIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9.247a1 1 0 01.791-.044l4.908 1.83a1 1 0 010 1.908l-4.908 1.83a1 1 0 01-.791-.044C6.59 13.568 5 17 5 17h14c0-3.568-1.59-6.432-3.228-7.753z"></path></svg>;

export default SideBar;