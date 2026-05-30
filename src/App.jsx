import { useState, useEffect } from 'react';
import DotGrid from './components/DotGrid';
import IntroAnimation from './components/IntroAnimation';
import Cursor from './components/Cursor';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Essays from './components/Essays';
import Research from './components/Research';
import Contact from './components/Contact';
import './App.css';

export default function App() {
  const [theme, setTheme] = useState('light');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <>
      <Cursor />
      <IntroAnimation onDone={() => setReady(true)} />
      <DotGrid theme={theme} />
      <Nav theme={theme} onToggleTheme={() => setTheme(t => t === 'light' ? 'dark' : 'light')} ready={ready} />
      <main>
        <Hero ready={ready} />
        <Essays />
        <Research />
        <Contact />
      </main>
    </>
  );
}
