import React from 'react';
import Header from './components/Header';
import HeroInicio from './components/HeroInicio';
import AcercaDe from './components/AcercaDe';
import Servicios from './components/Servicios';
import Contacto from './components/Contacto';
import Chatbot from './components/Chatbot';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="app-root">
      <Header />
      <main>
        <section id="inicio">
          <HeroInicio />
        </section>

        <section id="acerca">
          <AcercaDe />
        </section>

        <section id="servicios">
          <Servicios />
        </section>

        <section id="contacto">
          <Contacto />
        </section>
      </main>

      <Chatbot />
      <Footer />
    </div>
  );
};

export default App;
