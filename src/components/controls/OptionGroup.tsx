// src/components/controls/OptionGroup.tsx
import type { Option } from '../../config/options';

interface Props<T extends string> {
  label:    string;
  options:  Option<T>[];
  value:    T;
  onChange: (value: T) => void;
}

export default function OptionGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: Props<T>) {
  return (
    <div className="option-group">
      <span className="option-group__label">{label}</span>
      <div className="option-group__pills">
        {options.map((opt) => (
          <button
            key={opt.value}
            className={`pill ${value === opt.value ? 'pill--active' : ''}`}
            onClick={() => onChange(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
