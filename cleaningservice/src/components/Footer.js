import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="footer bg-gray-200 p-6">
            <div className="container mx-auto flex justify-center items-center">
                <span className="copy-right text-gray-600">© {currentYear} Ezrest, Inc.</span>
            </div>
        </footer>
    );
};

export default Footer;
