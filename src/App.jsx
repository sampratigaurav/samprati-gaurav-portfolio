import React from 'react';
import AdminHoneypot from './components/AdminHoneypot';
import GrainOverlay from './components/portfolio/GrainOverlay';
import CursorRing from './components/portfolio/CursorRing';
import Nav from './components/portfolio/Nav';
import Hero from './components/portfolio/Hero';
import Marquee from './components/portfolio/Marquee';
import Profile from './components/portfolio/Profile';
import Arcs from './components/portfolio/Arcs';
import Work from './components/portfolio/Work';
import Arsenal from './components/portfolio/Arsenal';
import Dispatches from './components/portfolio/Dispatches';
import Credentials from './components/portfolio/Credentials';
import Contact from './components/portfolio/Contact';
import Footer from './components/portfolio/Footer';

export default function App() {
  if (
    window.location.pathname === '/admin' ||
    window.location.pathname === '/wp-admin'
  ) {
    return <AdminHoneypot />;
  }

  return (
    <div className="relative bg-paper text-ink font-sans min-h-screen overflow-x-hidden">
      <GrainOverlay />
      <CursorRing />
      <Nav />
      <Hero />
      <Marquee />
      <Profile />
      <Arcs />
      <Work />
      <Arsenal />
      <Dispatches />
      <Credentials />
      <Contact />
      <Footer />
    </div>
  );
}
