// src/components/WatchCanvas.tsx
import type { WatchConfig } from '../lib/state';

// ── token maps ───────────────────────────────────────────────────────────────

const FINISH_COLOR: Record<string, string> = {
  steel: '#a8b2bd',
  gold:  '#c9a84c',
  black: '#2a2a2a',
};

const BEZEL_COLOR: Record<string, string> = {
  plain:    '#c8d0d8',
  coinEdge: '#d4af37',
  dive:     '#1c1c1c',
};

// ── geometry ─────────────────────────────────────────────────────────────────

const CX = 150;
const CY = 190;
const CR = 90;

function hourAngle(i: number): number {
  return (i * 30 - 90) * (Math.PI / 180);
}

// ── Indices ──────────────────────────────────────────────────────────────────

function IndicesLayer({ type }: { type: string }) {
  const COLOR = '#e7e9ee';
  const items = Array.from({ length: 12 }, (_, i) => i);

  if (type === 'arabic') {
    const labels = ['12','1','2','3','4','5','6','7','8','9','10','11'];
    return (
      <>
        {items.map((i) => {
          const a = hourAngle(i);
          const r = CR - 27;
          return (
            <text
              key={i}
              x={CX + r * Math.cos(a)}
              y={CY + r * Math.sin(a)}
              textAnchor="middle"
              dominantBaseline="central"
              fill={COLOR}
              fontSize={i === 0 ? 11 : 9}
              fontFamily="system-ui, sans-serif"
              opacity={0.9}
            >
              {labels[i]}
            </text>
          );
        })}
      </>
    );
  }

  if (type === 'dots') {
    return (
      <>
        {items.map((i) => {
          const a = hourAngle(i);
          const r = CR - 24;
          return (
            <circle
              key={i}
              cx={CX + r * Math.cos(a)}
              cy={CY + r * Math.sin(a)}
              r={i === 0 ? 4 : 3}
              fill={COLOR}
              opacity={0.85}
            />
          );
        })}
      </>
    );
  }

  // batons (default)
  return (
    <>
      {items.map((i) => {
        const a  = hourAngle(i);
        const r1 = CR - 28;
        const r2 = CR - 18;
        return (
          <line
            key={i}
            x1={CX + r1 * Math.cos(a)} y1={CY + r1 * Math.sin(a)}
            x2={CX + r2 * Math.cos(a)} y2={CY + r2 * Math.sin(a)}
            stroke={COLOR}
            strokeWidth={i === 0 ? 5 : 3}
            strokeLinecap="round"
            opacity={0.9}
          />
        );
      })}
    </>
  );
}

// ── Hands ────────────────────────────────────────────────────────────────────

interface HandProps {
  type:     string;
  isHour:   boolean;
  rotation: number;
  color?:   string;
}

function Hand({ type, isHour, rotation, color = '#e7e9ee' }: HandProps) {
  const len = isHour ? 42 : 56;
  const t   = `translate(${CX},${CY}) rotate(${rotation})`;

  if (type === 'syringe') {
    const tipR = isHour ? 4.5 : 3.5;
    return (
      <g transform={t}>
        <line
          x1={0} y1={6}
          x2={0} y2={-len + tipR}
          stroke={color} strokeWidth={2.5} strokeLinecap="round"
        />
        <circle cx={0} cy={-len} r={tipR} fill={color} />
      </g>
    );
  }

  if (type === 'sword') {
    const w = isHour ? 5 : 3.5;
    return (
      <g transform={t}>
        <path
          d={`M 0 6 L ${-w} ${-len * 0.28} L 0 ${-len} L ${w} ${-len * 0.28} Z`}
          fill={color}
        />
      </g>
    );
  }

  // dauphine (default)
  const w = isHour ? 4 : 3;
  return (
    <g transform={t}>
      <path
        d={`M 0 6 L ${-w} ${-len * 0.22} L 0 ${-len} L ${w} ${-len * 0.22} Z`}
        fill={color}
      />
    </g>
  );
}

function SecondsHand() {
  return (
    <g transform={`translate(${CX},${CY}) rotate(150)`}>
      <line
        x1={0} y1={16} x2={0} y2={6}
        stroke="#e05533" strokeWidth={3} strokeLinecap="round"
      />
      <line
        x1={0} y1={6} x2={0} y2={-58}
        stroke="#e05533" strokeWidth={1.5} strokeLinecap="round"
      />
      <circle cx={0} cy={0} r={3} fill="#e05533" />
    </g>
  );
}

// ── Strap ────────────────────────────────────────────────────────────────────

function StrapLayer({ material, color }: { material: string; color: string }) {
  if (material === 'bracelet') {
    const topLinks    = [8, 26, 40, 58, 74, 90];
    const bottomLinks = [280, 296, 312, 328, 344, 360];
    return (
      <>
        {topLinks.map((y, i) => (
          <rect
            key={`t${i}`}
            x={i % 2 === 0 ? 112 : 120}
            y={y}
            width={i % 2 === 0 ? 76 : 60}
            height={i % 2 === 0 ? 16 : 12}
            rx={2}
            fill={i % 2 === 0 ? color : '#8b93a3'}
          />
        ))}
        {bottomLinks.map((y, i) => (
          <rect
            key={`b${i}`}
            x={i % 2 === 0 ? 112 : 120}
            y={y}
            width={i % 2 === 0 ? 76 : 60}
            height={i % 2 === 0 ? 14 : 12}
            rx={2}
            fill={i % 2 === 0 ? color : '#8b93a3'}
          />
        ))}
      </>
    );
  }

  if (material === 'nato') {
    return (
      <>
        <rect x={118} y={8}   width={64} height={92} rx={6} fill={color} />
        <rect x={118} y={280} width={64} height={92} rx={6} fill={color} />
        <rect x={128} y={8}   width={18} height={92} rx={3} fill={color} opacity={0.55} />
        <line x1={125} y1={14} x2={125} y2={94}
          stroke="#e7e9ee" strokeWidth={0.75} strokeDasharray="3 3" opacity={0.35} />
        <line x1={175} y1={14} x2={175} y2={94}
          stroke="#e7e9ee" strokeWidth={0.75} strokeDasharray="3 3" opacity={0.35} />
        <line x1={125} y1={286} x2={125} y2={366}
          stroke="#e7e9ee" strokeWidth={0.75} strokeDasharray="3 3" opacity={0.35} />
        <line x1={175} y1={286} x2={175} y2={366}
          stroke="#e7e9ee" strokeWidth={0.75} strokeDasharray="3 3" opacity={0.35} />
      </>
    );
  }

  // leather (default)
  return (
    <>
      <rect x={120} y={8}   width={60} height={92} rx={8} fill={color} />
      <rect x={120} y={280} width={60} height={92} rx={8} fill={color} />
      <line x1={126} y1={14} x2={126} y2={94}
        stroke="#e7e9ee" strokeWidth={0.75} strokeDasharray="3 4" opacity={0.25} />
      <line x1={174} y1={14} x2={174} y2={94}
        stroke="#e7e9ee" strokeWidth={0.75} strokeDasharray="3 4" opacity={0.25} />
      <line x1={126} y1={286} x2={126} y2={366}
        stroke="#e7e9ee" strokeWidth={0.75} strokeDasharray="3 4" opacity={0.25} />
      <line x1={174} y1={286} x2={174} y2={366}
        stroke="#e7e9ee" strokeWidth={0.75} strokeDasharray="3 4" opacity={0.25} />
    </>
  );
}

// ── Bezel detail ──────────────────────────────────────────────────────────────

function BezelDetail({ type, caseShape }: { type: string; caseShape: string }) {
  // bezel detail markers only make visual sense on round cases
  if (caseShape === 'cushion') return null;

  if (type === 'coinEdge') {
    return (
      <>
        {Array.from({ length: 60 }, (_, i) => {
          const a  = (i * 6 - 90) * (Math.PI / 180);
          const r1 = CR - 1;
          const r2 = CR - 9;
          return (
            <line
              key={i}
              x1={CX + r1 * Math.cos(a)} y1={CY + r1 * Math.sin(a)}
              x2={CX + r2 * Math.cos(a)} y2={CY + r2 * Math.sin(a)}
              stroke="#000000"
              strokeWidth={i % 5 === 0 ? 2 : 1}
              opacity={0.35}
            />
          );
        })}
      </>
    );
  }

  if (type === 'dive') {
    return (
      <>
        {Array.from({ length: 12 }, (_, i) => {
          const a = hourAngle(i);
          const r = CR - 5;
          const x = CX + r * Math.cos(a);
          const y = CY + r * Math.sin(a);
          if (i === 0) {
            // triangle pip at 12
            const angle = i * 30;
            return (
              <polygon
                key={i}
                transform={`rotate(${angle}, ${x}, ${y})`}
                points={`${x},${y - 8} ${x - 4.5},${y + 3} ${x + 4.5},${y + 3}`}
                fill="#ffffff"
                opacity={0.9}
              />
            );
          }
          return (
            <circle
              key={i}
              cx={x} cy={y} r={2.5}
              fill="#ffffff"
              opacity={0.7}
            />
          );
        })}
      </>
    );
  }

  return null;
}

// ── Case & dial shapes ────────────────────────────────────────────────────────

function CaseShape({ shape, color }: { shape: string; color: string }) {
  if (shape === 'cushion') {
    return <rect x={60} y={100} width={180} height={180} rx={42} fill={color} />;
  }
  return <circle cx={CX} cy={CY} r={CR} fill={color} />;
}

function BezelRing({
  shape, color,
}: { shape: string; color: string }) {
  if (shape === 'cushion') {
    return (
      <rect
        x={65} y={105} width={170} height={170} rx={38}
        fill="none" stroke={color} strokeWidth={10}
      />
    );
  }
  return (
    <circle
      cx={CX} cy={CY} r={CR - 5}
      fill="none" stroke={color} strokeWidth={10}
    />
  );
}

function DialShape({ shape, color }: { shape: string; color: string }) {
  if (shape === 'cushion') {
    return <rect x={76} y={116} width={148} height={148} rx={26} fill={color} />;
  }
  return <circle cx={CX} cy={CY} r={CR - 16} fill={color} />;
}

// ── Main component ────────────────────────────────────────────────────────────

interface Props {
  config: WatchConfig;
  size?:  number;
}

export default function WatchCanvas({ config, size = 280 }: Props) {
  const caseColor  = FINISH_COLOR[config.caseFinish];
  const bezelColor = BEZEL_COLOR[config.bezel];

  return (
    <svg
      viewBox="0 0 300 380"
      width={size}
      height={size * (380 / 300)}
      aria-label="Watch preview"
      style={{ display: 'block' }}
    >
      {/* 1 — strap */}
      <StrapLayer material={config.strapMaterial} color={config.strapColor} />

      {/* 2 — case */}
      <CaseShape shape={config.caseShape} color={caseColor} />

      {/* 3 — bezel ring */}
      <BezelRing shape={config.caseShape} color={bezelColor} />

      {/* 4 — bezel detail */}
      <BezelDetail type={config.bezel} caseShape={config.caseShape} />

      {/* 5 — dial */}
      <DialShape shape={config.caseShape} color={config.dialColor} />

      {/* 6 — indices */}
      <IndicesLayer type={config.indices} />

      {/* 7 — hands */}
      <Hand type={config.hands} isHour   rotation={300} />
      <Hand type={config.hands} isHour={false} rotation={60}  />
      <SecondsHand />

      {/* 8 — center pip */}
      <circle cx={CX} cy={CY} r={3.5} fill="#e7e9ee" />

      {/* 9 — crown */}
      <rect x={241} y={184} width={13} height={13} rx={3} fill={caseColor} />
    </svg>
  );
}
