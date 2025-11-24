import React, { useEffect, useState } from 'react';
import './HeroInicio.css';
import heroVideo from '../assets/hero.mp4';
import type { CompanyInfo } from '../services/api';
import { fetchCompanyInfo } from '../services/api';

const HeroInicio: React.FC = () => {
  const [company, setCompany] = useState<CompanyInfo | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchCompanyInfo()
      .then(setCompany)
      .catch((err) => {
        console.error(err);
        setError('No se pudo cargar la información de la empresa.');
      });
  }, []);

  return (
    <section className="hero-section">
      {/* Video: reemplaza hero.mp4 en /assets por tu propio video */}
      <video
        className="hero-video"
        src={heroVideo}
        autoPlay
        muted
        loop
        playsInline
      />

      <div className="hero-overlay" />

      <div className="hero-content">
        <span className="hero-chip">Desarrollo de software · Robótica · IoT</span>

        <h1 className="hero-title">
          {company ? company.hero_title : 'Cargando título...'}
        </h1>

        <p className="hero-subtitle">
          {company ? company.hero_subtitle : 'Cargando descripción...'}
        </p>

        {error && <p className="hero-error">{error}</p>}

        <div className="hero-actions">
          <a href="#servicios" className="btn-primary">
            Ver servicios
          </a>
          <a href="#contacto" className="btn-secondary">
            Agenda una reunión
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroInicio;
