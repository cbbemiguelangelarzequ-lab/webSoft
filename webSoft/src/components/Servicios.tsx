import React, { useEffect, useState } from 'react';
import './Servicios.css';
import type { Service } from '../services/api';
import { fetchServices } from '../services/api';

const Servicios: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchServices()
      .then(setServices)
      .catch((err) => {
        console.error(err);
        setError('No se pudieron cargar los servicios.');
      });
  }, []);

  return (
    <div className="section services-section">
      <div className="section-header">
        <h2>Servicios de desarrollo y robótica</h2>
        <p>
          Todos nuestros servicios están diseñados para integrar software, hardware y
          datos en soluciones reales.
        </p>
      </div>

      {error && <p className="section-error">{error}</p>}

      <div className="services-grid">
        {services.map((service) => (
          <article className="service-card" key={service.id}>
            <div className="service-chip">{service.category}</div>
            <h3>{service.name}</h3>
            <p className="service-short">{service.short_description}</p>
            <p className="service-long">{service.long_description}</p>
          </article>
        ))}

        {services.length === 0 && !error && (
          <p className="section-placeholder">
            Aún no hay servicios registrados en la base de datos.
          </p>
        )}
      </div>
    </div>
  );
};

export default Servicios;
