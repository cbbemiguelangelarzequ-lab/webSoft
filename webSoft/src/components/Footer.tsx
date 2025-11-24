import React from 'react';
import './Footer.css';

const Footer: React.FC = () => (
  <footer className="main-footer">
    <div className="footer-left">
      <span>© {new Date().getFullYear()} Soft & Robotics Lab.</span>
      <span>Desarrollo de software, robótica e IoT.</span>
    </div>
    <div className="footer-right">
      <span>Hecho con React + NodeJS + Ollama.</span>
    </div>
  </footer>
);

export default Footer;
