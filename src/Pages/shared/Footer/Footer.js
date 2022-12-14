import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className=" bg-neutral">
   <div className='p-10 footer text-white max-w-7xl mx-auto'>
  <div>
  <Link to="/"className="text-2xl font-bold text-white uppercase ">car<span className='text-primary'>Dealer</span></Link>
    <p>ACME Industries Ltd.<br/>Providing reliable tech since 1992</p>
  </div> 
  <div>
    <span className="footer-title">Services</span> 
    <Link className="link link-hover">Branding</Link> 
    <Link className="link link-hover">Design</Link> 
    <Link className="link link-hover">Marketing</Link> 
    <Link className="link link-hover">Advertisement</Link>
  </div> 
  <div>
    <span className="footer-title">Company</span> 
    <Link className="link link-hover">About us</Link> 
    <Link className="link link-hover">Contact</Link> 
    <Link className="link link-hover">Jobs</Link> 
    <Link className="link link-hover">Press kit</Link>
  </div> 
  <div>
    <span className="footer-title">Legal</span> 
    <Link className="link link-hover">Terms of use</Link> 
    <Link className="link link-hover">Privacy policy</Link> 
    <Link className="link link-hover">Cookie policy</Link>
  </div>
  </div>
</footer>
    );
};

export default Footer;