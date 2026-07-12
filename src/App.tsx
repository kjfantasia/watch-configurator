// src/App.tsx
import { useState } from 'react';
import type { WatchConfig } from './lib/state';
import { DEFAULT_CONFIG } from './config/defaults';
import {
  CASE_SHAPES, CASE_FINISHES, BEZELS,
  INDICES, HANDS, STRAP_MATERIALS,
  DIAL_COLORS, STRAP_COLORS,
} from './config/options';
import WatchCanvas   from './components/WatchCanvas';
import OptionGroup   from './components/controls/OptionGroup';
import Swatch        from './components/controls/Swatch';
import './App.css';

export default function App() {
  const [config, setConfig] = useState<WatchConfig>(DEFAULT_CONFIG);

  // update a single field without touching the rest
  function update<K extends keyof WatchConfig>(key: K, value: WatchConfig[K]) {
    setConfig((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="app">
      <header className="app__header">
        <h1>Watch Configurator</h1>
        <span className="app__tag">v0 · step 3</span>
      </header>

      <main className="app__main">

        <section className="canvas" aria-label="Watch preview">
          <WatchCanvas config={config} size={280} />
        </section>

        <aside className="controls" aria-label="Options">
          <div className="controls__inner">

            <OptionGroup
              label="Case Shape"
              options={CASE_SHAPES}
              value={config.caseShape}
              onChange={(v) => update('caseShape', v)}
            />
            <OptionGroup
              label="Case Finish"
              options={CASE_FINISHES}
              value={config.caseFinish}
              onChange={(v) => update('caseFinish', v)}
            />
            <OptionGroup
              label="Bezel"
              options={BEZELS}
              value={config.bezel}
              onChange={(v) => update('bezel', v)}
            />
            <Swatch
              label="Dial Color"
              options={DIAL_COLORS}
              value={config.dialColor}
              onChange={(v) => update('dialColor', v)}
            />
            <OptionGroup
              label="Indices"
              options={INDICES}
              value={config.indices}
              onChange={(v) => update('indices', v)}
            />
            <OptionGroup
              label="Hands"
              options={HANDS}
              value={config.hands}
              onChange={(v) => update('hands', v)}
            />
            <OptionGroup
              label="Strap"
              options={STRAP_MATERIALS}
              value={config.strapMaterial}
              onChange={(v) => update('strapMaterial', v)}
            />
            <Swatch
              label="Strap Color"
              options={STRAP_COLORS}
              value={config.strapColor}
              onChange={(v) => update('strapColor', v)}
            />

          </div>
        </aside>

      </main>
    </div>
  );
}
