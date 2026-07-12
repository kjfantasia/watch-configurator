// src/App.tsx
import { useState } from 'react';
import type { WatchConfig } from './lib/state';
import { DEFAULT_CONFIG } from './config/defaults';
import WatchCanvas from './components/WatchCanvas';
import './App.css';

export default function App() {
  const [config, setConfig] = useState<WatchConfig>(DEFAULT_CONFIG);

  return (
    <div className="app">
      <header className="app__header">
        <h1>Watch Configurator</h1>
        <span className="app__tag">v0 · step 2</span>
      </header>

      <main className="app__main">

        <section className="canvas" aria-label="Watch preview">
          <WatchCanvas config={config} size={280} />
        </section>

        <aside className="controls" aria-label="Options">
          <p className="controls__hint">option pickers go here</p>
        </aside>

      </main>
    </div>
  );
}
