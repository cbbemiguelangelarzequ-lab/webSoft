import React from 'react';
import './Header.css';
import logo from '../assets/logo.jpg';

const Header: React.FC = () => {
  return (
    <header className="main-header">
      <div className="header-left">
        <img src={logo} alt="Soft & Robotics Lab" className="logo" />
        <div className="brand">
          <span className="brand-title">Soft & Robotics Lab</span>
          <span className="brand-subtitle">Software · Robótica · IoT</span>
        </div>
      </div>

      <nav className="header-nav">
        <a href="#inicio">Inicio</a>
        <a href="#acerca">Acerca de</a>
        <a href="#servicios">Servicios</a>
        <a href="#contacto">Contacto</a>
      </nav>
    </header>
  );
};

export default Header;
