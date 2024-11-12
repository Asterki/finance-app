// components/FooterComponent.tsx
import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const FooterComponent: React.FC = () => {
  return (
    <footer className='text-neutral-700 dark:text-white w-full flex flex-col items-center justify-between p-4 h-auto dark:bg-gray-700 bg-white shadow-md z-10'>
      <div className='w-full flex justify-between items-center mb-4'>
        <div className='text-lg font-bold'>
          &copy; {new Date().getFullYear()} DIMLIM
        </div>
        <div className='flex space-x-4'>
          <a href='https://facebook.com' target='_blank' rel='noopener noreferrer' className='text-blue-600 hover:text-blue-800'>
            <FaFacebook size={24} />
          </a>
          <a href='https://twitter.com' target='_blank' rel='noopener noreferrer' className='text-blue-400 hover:text-blue-600'>
            <FaTwitter size={24} />
          </a>
          <a href='https://instagram.com' target='_blank' rel='noopener noreferrer' className='text-pink-600 hover:text-pink-800'>
            <FaInstagram size={24} />
          </a>
          <a href='https://linkedin.com' target='_blank' rel='noopener noreferrer' className='text-blue-700 hover:text-blue-900'>
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>
      <div className='w-full flex justify-center items-center space-x-4'>
        <a href='/privacy' className='text-sm hover:underline'>
          Privacy Policy
        </a>
        <a href='/terms' className='text-sm hover:underline'>
          Terms of Service
        </a>
        <a href='/contact' className='text-sm hover:underline'>
          Contact Us
        </a>
      </div>
    </footer>
  );
};

export default FooterComponent;