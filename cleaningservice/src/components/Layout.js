// Layout.js
import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {children} {/* This is where the specific page content will be rendered */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
