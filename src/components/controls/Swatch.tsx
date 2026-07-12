// src/components/controls/Swatch.tsx
import type { ColorOption } from '../../config/options';

interface Props {
  label:    string;
  options:  ColorOption[];
  value:    string;
  onChange: (value: string) => void;
}

export default function Swatch({ label, options, value, onChange }: Props) {
  return (
    <div className="option-group">
      <span className="option-group__label">{label}</span>
      <div className="option-group__swatches">
        {options.map((opt) => (
          <button
            key={opt.value}
            className={`swatch ${value === opt.value ? 'swatch--active' : ''}`}
            style={{ background: opt.value }}
            title={opt.label}
            aria-label={opt.label}
            onClick={() => onChange(opt.value)}
          />
        ))}
      </div>
    </div>
  );
}
