import React from "react";

const Header = () => {
  return (
    <header className="bg-background text-white py-4 px-6 flex justify-between items-center">
      <h1 className="text-primary text-2xl font-bold">Course-Chain</h1>
      <nav>
        <ul className="flex space-x-4">
          <li><a href="/" className="hover:text-primary">Home</a></li>
          <li><a href="/profile" className="hover:text-primary">Profile</a></li>
          <li><a href="/access" className="hover:text-primary">Access</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
