'use client';

import {Facebook, Twitter, Instagram, Linkedin} from 'lucide-react';
import {Button} from '@/shared/components/ui/button';

export default function Footer() {
  return (
    <footer className='bg-[#414279] text-white py-12 mt-10'>
      <div className='max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-8'>
        {/* Company */}
        <div>
          <h3 className='font-semibold mb-4'>Company</h3>
          <ul className='space-y-2 text-sm'>
            <li>
              <a href='#'>About Us</a>
            </li>
            <li>
              <a href='#'>Blog</a>
            </li>
            <li>
              <a href='#'>Services</a>
            </li>
            <li>
              <a href='#'>FAQs</a>
            </li>
            <li>
              <a href='#'>Terms</a>
            </li>
            <li>
              <a href='#'>Contact Us</a>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className='font-semibold mb-4'>Quick Links</h3>
          <ul className='space-y-2 text-sm'>
            <li>
              <a href='#'>Get in Touch</a>
            </li>
            <li>
              <a href='#'>Help center</a>
            </li>
            <li>
              <a href='#'>Live chat</a>
            </li>
            <li>
              <a href='#'>How it works</a>
            </li>
          </ul>
        </div>

        {/* Our Brands */}
        <div>
          <h3 className='font-semibold mb-4'>Our Brands</h3>
          <ul className='space-y-2 text-sm'>
            <li>Toyota</li>
            <li>Porsche</li>
            <li>Audi</li>
            <li>BMW</li>
            <li>Ford</li>
            <li>Nissan</li>
            <li>Peugeot</li>
            <li>Volkswagen</li>
          </ul>
        </div>

        {/* Vehicle Types */}
        <div>
          <h3 className='font-semibold mb-4'>Vehicles Type</h3>
          <ul className='space-y-2 text-sm'>
            <li>Sedan</li>
            <li>Hatchback</li>
            <li>SUV</li>
            <li>Hybrid</li>
            <li>Electric</li>
            <li>Coupe</li>
            <li>Truck</li>
            <li>Convertible</li>
          </ul>
        </div>

        {/* App + Social */}
        <div>
          <h3 className='font-semibold mb-4'>Our Mobile App</h3>
          <div className='flex flex-col space-y-3'>
            <Button className='bg-white text-black hover:bg-gray-200 justify-start'>
              <span className='mr-2'></span> Apple Store
            </Button>
            <Button className='bg-white text-black hover:bg-gray-200 justify-start'>
              <span className='mr-2'>▶</span> Google Play
            </Button>
          </div>

          <h3 className='font-semibold mt-6 mb-3'>Connect With Us</h3>
          <div className='flex space-x-4'>
            <a href='#'>
              <Facebook size={18} />
            </a>
            <a href='#'>
              <Twitter size={18} />
            </a>
            <a href='#'>
              <Instagram size={18} />
            </a>
            <a href='#'>
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className='border-t border-white/20 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between text-sm px-6'>
        <p>© 2025 cartradez.com. All rights reserved.</p>
        <div className='flex space-x-4 mt-4 md:mt-0'>
          <a href='#'>Terms & Conditions</a>
          <a href='#'>Privacy Notice</a>
        </div>
      </div>
    </footer>
  );
}
