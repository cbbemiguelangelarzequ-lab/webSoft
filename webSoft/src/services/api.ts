const API_URL = 'http://localhost:3000/api';

export interface CompanyInfo {
  id: number;
  name: string;
  tagline: string;
  hero_title: string;
  hero_subtitle: string;
  about_short: string;
  about_full: string;
  mission: string;
  vision: string;
  values: string;
}

export interface Service {
  id: number;
  name: string;
  short_description: string;
  long_description: string;
  category: string;
}

export interface ContactInfo {
  id: number;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  whatsapp?: string;
  schedule?: string;
  map_embed_url?: string;
}

export async function fetchCompanyInfo(): Promise<CompanyInfo> {
  const res = await fetch(`${API_URL}/company`);
  if (!res.ok) throw new Error('Error al cargar datos de la empresa');
  return res.json();
}

export async function fetchServices(): Promise<Service[]> {
  const res = await fetch(`${API_URL}/services`);
  if (!res.ok) throw new Error('Error al cargar servicios');
  return res.json();
}

export async function fetchContactInfo(): Promise<ContactInfo> {
  const res = await fetch(`${API_URL}/contact`);
  if (!res.ok) throw new Error('Error al cargar contacto');
  return res.json();
}

export async function sendChatMessage(message: string): Promise<string> {
  const res = await fetch(`${API_URL}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message })
  });

  if (!res.ok) {
    throw new Error('Error al consultar la IA');
  }

  const data = await res.json();
  return data.response ?? '';
}

export async function sendContactMessage(name: string, email: string, message: string): Promise<void> {
  const res = await fetch(`${API_URL}/contact-messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, message })
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Error al enviar el mensaje');
  }
}
