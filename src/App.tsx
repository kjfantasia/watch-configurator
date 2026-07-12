// src/App.tsx
import './App.css';

export default function App() {
  return (
    <div className="app">
      <header className="app__header">
        <h1>Watch Configurator</h1>
        <span className="app__tag">v0 · skeleton</span>
      </header>

      <main className="app__main">
        <section className="canvas" aria-label="Watch preview">
          <div className="canvas__placeholder">watch renders here</div>
        </section>

        <aside className="controls" aria-label="Options">
          <p className="controls__hint">option pickers go here</p>
        </aside>
      </main>
    </div>
  );
}
