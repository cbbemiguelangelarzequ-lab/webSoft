import React, { useEffect, useState } from 'react';
import './Contacto.css';
import type { ContactInfo } from '../services/api';
import { fetchContactInfo, sendContactMessage } from '../services/api';

const Contacto: React.FC = () => {
  const [contact, setContact] = useState<ContactInfo | null>(null);
  const [error, setError] = useState<string>('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    fetchContactInfo()
      .then(setContact)
      .catch((err) => {
        console.error(err);
        setError('No se pudo cargar la información de contacto.');
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFormSuccess(false);
    setFormError('');

    try {
      await sendContactMessage(formData.name, formData.email, formData.message);
      setFormSuccess(true);
      setFormData({ name: '', email: '', message: '' }); // Clear form
    } catch (err) {
      console.error('Form submission error:', err);
      setFormError(err instanceof Error ? err.message : 'No se pudo enviar el mensaje. Inténtalo de nuevo más tarde.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="section contact-section">
      <div className="section-header">
        <h2>Contacto</h2>
        <p>Conversemos sobre tu próximo proyecto de software o robótica.</p>
      </div>

      {error && <p className="section-error">{error}</p>}

      <div className="contact-grid">
        <div className="contact-card">
          <h3>Datos de contacto</h3>

          <ul>
            <li>
              <strong>Dirección:</strong>{' '}
              {contact ? `${contact.address}, ${contact.city} - ${contact.country}` : 'Cargando...'}
            </li>
            <li>
              <strong>Teléfono:</strong> {contact ? contact.phone : 'Cargando...'}
            </li>
            <li>
              <strong>WhatsApp:</strong> {contact ? contact.whatsapp : 'Cargando...'}
            </li>
            <li>
              <strong>Correo:</strong> {contact ? contact.email : 'Cargando...'}
            </li>
            <li>
              <strong>Horario:</strong> {contact ? contact.schedule : 'Cargando...'}
            </li>
          </ul>
        </div>

        <div className="contact-card">
          <h3>Envíanos un mensaje</h3>
          {formSuccess && (
            <p className="form-success">Mensaje enviado correctamente. Te contactaremos pronto.</p>
          )}
          {formError && <p className="form-error"> {formError}</p>}

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="field">
              <label>Nombre</label>
              <input
                type="text"
                placeholder="Tu nombre"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="field">
              <label>Correo</label>
              <input
                type="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="field">
              <label>Mensaje</label>
              <textarea
                placeholder="Cuéntanos sobre tu proyecto"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={5}
              />
            </div>
            <button type="submit" disabled={submitting}>
              {submitting ? 'Enviando...' : 'Enviar mensaje'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contacto;
