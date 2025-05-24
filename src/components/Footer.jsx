import React from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-orange-100 via-pink-100 to-lime-100 text-gray-800 mt-12">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & Description */}
        <div>
          <h2 className="text-3xl font-bold text-orange-500">
            🍽️ Recipe<span className="text-lime-600">Book</span>
          </h2>
          <p className="mt-3 text-sm text-gray-700 leading-relaxed">
            Discover and share your favorite recipes from around the world.
            Cook, create, and connect with food lovers everywhere.
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Contact Us</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>📧 contact@recipebook.com</li>
            <li>📞 +880 1234 567 890</li>
            <li>📍 Rajshahi, Bangladesh</li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Follow Us</h3>
          <div className="flex gap-4 mt-2 text-2xl">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-500 transition-colors"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition-colors"
            >
              <FaInstagram />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-500 transition-colors"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-300 text-center py-4 text-sm text-gray-600">
        © {currentYear} <span className="font-semibold text-orange-500">RecipeBook</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
