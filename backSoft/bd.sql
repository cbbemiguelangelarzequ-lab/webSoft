CREATE DATABASE IF NOT EXISTS softrobotics
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE softrobotics;

-- Información general de la empresa
CREATE TABLE company_info (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(150) NOT NULL,
  tagline VARCHAR(255) NOT NULL,
  hero_title VARCHAR(255) NOT NULL,
  hero_subtitle VARCHAR(255) NOT NULL,
  about_short TEXT NOT NULL,
  about_full TEXT NOT NULL,
  mission TEXT NOT NULL,
  vision TEXT NOT NULL,
  values TEXT NOT NULL
);

INSERT INTO company_info
(name, tagline, hero_title, hero_subtitle, about_short, about_full, mission, vision, values)
VALUES
(
  'Soft & Robotics Lab',
  'Innovación en software, robótica y automatización',
  'Construimos software y robots a tu medida',
  'Desarrollamos soluciones digitales y robóticas que conectan tu negocio con el futuro.',
  'Somos un equipo especializado en desarrollo de software, robótica educativa e industrial, integración de sensores y automatización de procesos.',
  'Soft & Robotics Lab diseña y desarrolla soluciones tecnológicas que combinan software a medida, plataformas web, apps móviles, visión por computador y robótica. Acompañamos a empresas, instituciones educativas y emprendimientos desde la idea hasta la puesta en producción.',
  'Impulsar la transformación digital mediante soluciones de software y robótica accesibles, escalables y centradas en las personas.',
  'Ser el aliado tecnológico de referencia en soluciones inteligentes de software y robótica en la región.',
  'Innovación continua; trabajo colaborativo; enfoque en resultados; ética y responsabilidad social; aprendizaje permanente.'
);

-- Servicios
CREATE TABLE services (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(150) NOT NULL,
  short_description VARCHAR(255) NOT NULL,
  long_description TEXT NOT NULL,
  category VARCHAR(100) NOT NULL
);

INSERT INTO services (name, short_description, long_description, category) VALUES
(
  'Desarrollo de software a medida',
  'Aplicaciones web y APIs escalables para tu negocio.',
  'Diseñamos y desarrollamos aplicaciones web modernas utilizando arquitecturas basadas en servicios, APIs REST y buenas prácticas de ingeniería de software. Integramos bases de datos, autenticación, pasarelas de pago y paneles de administración según las necesidades de cada proyecto.',
  'Software'
),
(
  'Plataformas de robótica educativa',
  'Kits y plataformas de robótica para colegios y universidades.',
  'Desarrollamos plataformas de robótica educativa basadas en microcontroladores, sensores y motores, acompañadas de contenidos didácticos y paneles web para la gestión de prácticas. Nuestro enfoque facilita que estudiantes aprendan programación, electrónica y control de manera práctica.',
  'Robótica'
),
(
  'Automatización y control de procesos',
  'Monitoreo, telemetría e IoT industrial.',
  'Integramos sensores, controladores y tableros de visualización para automatizar procesos productivos. Desarrollamos dashboards web para monitoreo en tiempo real, generación de alertas y registro histórico de datos.',
  'IoT'
),
(
  'Visión por computador y IA',
  'Detección, clasificación y análisis de imágenes y video.',
  'Creamos modelos de visión por computador para conteo de objetos, inspección de calidad, reconocimiento de patrones y analítica de video. Integramos estos modelos en aplicaciones web, móvil o sistemas embebidos.',
  'Inteligencia Artificial'
);

-- Información de contacto
CREATE TABLE contact_info (
  id INT PRIMARY KEY AUTO_INCREMENT,
  address VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  country VARCHAR(100) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  whatsapp VARCHAR(50),
  schedule VARCHAR(255),
  map_embed_url TEXT
);

INSERT INTO contact_info
(address, city, country, phone, email, whatsapp, schedule, map_embed_url)
VALUES
(
  'Av. Tecnológica 123, Edif. Innovación Piso 3',
  'Cochabamba',
  'Bolivia',
  '+591 777-00000',
  'contacto@softroboticslab.com',
  '+591 777-00000',
  'Lunes a viernes 09:00 - 18:00',
  'https://www.google.com/maps'
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(100) NOT NULL,
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índice para búsquedas rápidas por email
CREATE INDEX idx_email ON contact_messages(email);
CREATE INDEX idx_created_at ON contact_messages(created_at);
