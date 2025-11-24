import React, { useEffect, useState } from 'react';
import './AcercaDe.css';
import type { CompanyInfo } from '../services/api';
import { fetchCompanyInfo } from '../services/api';

const AcercaDe: React.FC = () => {
  const [company, setCompany] = useState<CompanyInfo | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchCompanyInfo()
      .then(setCompany)
      .catch((err) => {
        console.error(err);
        setError('No se pudo cargar la sección Acerca de.');
      });
  }, []);

  return (
    <div className="section about-section">
      <div className="section-header">
        <h2>Acerca de nosotros</h2>
        <p>{company ? company.tagline : 'Cargando...'}</p>
      </div>

      {error && <p className="section-error">{error}</p>}

      <div className="about-grid">
        <div className="about-card">
          <h3>Quiénes somos</h3>
          <p>{company ? company.about_full : 'Cargando información de la empresa...'}</p>
        </div>

        <div className="about-side">
          <div className="about-card small">
            <h3>Misión</h3>
            <p>{company ? company.mission : 'Cargando misión...'}</p>
          </div>
          <div className="about-card small">
            <h3>Visión</h3>
            <p>{company ? company.vision : 'Cargando visión...'}</p>
          </div>
          <div className="about-card small">
            <h3>Valores</h3>
            <p>{company ? company.values : 'Cargando valores...'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcercaDe;
