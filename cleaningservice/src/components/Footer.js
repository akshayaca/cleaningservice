import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="bg-gray-200 p-6 w-full">
            <div className="container mx-auto flex justify-center items-center">
                <span className="text-gray-600">© {currentYear} Ezrest, Inc.</span>
            </div>
        </footer>
    );
};

export default Footer;
