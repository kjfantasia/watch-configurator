// src/components/WatchCanvas.tsx
import type { WatchConfig } from '../lib/state';

// ── finish/bezel tokens → display colors ────────────────────────────────────

const FINISH_COLOR: Record<string, string> = {
  steel: '#a8b2bd',
  gold:  '#c9a84c',
  black: '#2a2a2a',
};

const BEZEL_COLOR: Record<string, string> = {
  plain:    '#c8d0d8',
  coinEdge: '#d4af37',
  dive:     '#1a1a1a',
};

// ── component ────────────────────────────────────────────────────────────────

interface Props {
  config: WatchConfig;
  size?: number;   // rendered width in px; height scales automatically
}

export default function WatchCanvas({ config, size = 280 }: Props) {
  const caseColor  = FINISH_COLOR[config.caseFinish];
  const bezelColor = BEZEL_COLOR[config.bezel];

  // fixed internal coordinate system — all math lives here
  const vbW  = 300;
  const vbH  = 380;
  const cx   = 150;   // horizontal center
  const cy   = 190;   // vertical center
  const cr   = 90;    // case radius / half-width

  return (
    <svg
      viewBox={`0 0 ${vbW} ${vbH}`}
      width={size}
      height={size * (vbH / vbW)}
      aria-label="Watch preview"
      style={{ display: 'block' }}
    >

      {/* ── 1. Strap (sits behind the case) ───────────────────────── */}
      <rect x={120} y={8}   width={60} height={92}  rx={8} fill={config.strapColor} />
      <rect x={120} y={280} width={60} height={92}  rx={8} fill={config.strapColor} />

      {/* ── 2. Case ───────────────────────────────────────────────── */}
      {config.caseShape === 'round' ? (
        <circle cx={cx} cy={cy} r={cr} fill={caseColor} />
      ) : (
        <rect x={60} y={100} width={180} height={180} rx={42} fill={caseColor} />
      )}

      {/* ── 3. Bezel ring ─────────────────────────────────────────── */}
      {config.caseShape === 'round' ? (
        <circle
          cx={cx} cy={cy} r={cr - 5}
          fill="none" stroke={bezelColor} strokeWidth={10}
        />
      ) : (
        <rect
          x={65} y={105} width={170} height={170} rx={38}
          fill="none" stroke={bezelColor} strokeWidth={10}
        />
      )}

      {/* ── 4. Dial ───────────────────────────────────────────────── */}
      {config.caseShape === 'round' ? (
        <circle cx={cx} cy={cy} r={cr - 16} fill={config.dialColor} />
      ) : (
        <rect x={76} y={116} width={148} height={148} rx={26} fill={config.dialColor} />
      )}

      {/* ── 5. Indices ────────────────────────────────────────────── */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 - 90) * (Math.PI / 180);
        const r     = cr - 24;
        const ix    = cx + r * Math.cos(angle);
        const iy    = cy + r * Math.sin(angle);
        return (
          <circle
            key={i}
            cx={ix} cy={iy} r={3}
            fill="#e7e9ee" opacity={0.85}
          />
        );
      })}

      {/* ── 6. Hands ──────────────────────────────────────────────── */}
      {/* hour */}
      <line
        x1={cx} y1={cy} x2={cx} y2={cy - 44}
        stroke="#e7e9ee" strokeWidth={4.5} strokeLinecap="round"
      />
      {/* minute */}
      <line
        x1={cx} y1={cy} x2={cx + 36} y2={cy}
        stroke="#e7e9ee" strokeWidth={3} strokeLinecap="round"
      />
      {/* seconds */}
      <line
        x1={cx} y1={cy} x2={cx} y2={cy + 54}
        stroke="#e05533" strokeWidth={1.5} strokeLinecap="round"
      />
      {/* center pip */}
      <circle cx={cx} cy={cy} r={3.5} fill="#e7e9ee" />

      {/* ── 7. Crown ──────────────────────────────────────────────── */}
      <rect x={241} y={184} width={13} height={13} rx={3} fill={caseColor} />

    </svg>
  );
}
