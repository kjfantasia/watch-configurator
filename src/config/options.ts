// src/config/options.ts

import type {
  CaseShape,
  CaseFinish,
  Bezel,
  Indices,
  Hands,
  StrapMaterial,
} from '../lib/state';

// ── labeled option helpers ───────────────────────────────────────────────────

export interface Option<T> {
  value: T;
  label: string;
}

export interface ColorOption {
  value: string;  // hex
  label: string;
}

// ── part options ─────────────────────────────────────────────────────────────

export const CASE_SHAPES: Option<CaseShape>[] = [
  { value: 'round',   label: 'Round'   },
  { value: 'cushion', label: 'Cushion' },
];

export const CASE_FINISHES: Option<CaseFinish>[] = [
  { value: 'steel', label: 'Brushed Steel' },
  { value: 'gold',  label: 'Gold'          },
  { value: 'black', label: 'Matte Black'   },
];

export const BEZELS: Option<Bezel>[] = [
  { value: 'plain',    label: 'Plain Polished' },
  { value: 'coinEdge', label: 'Coin Edge'      },
  { value: 'dive',     label: 'Dive'           },
];

export const INDICES: Option<Indices>[] = [
  { value: 'batons', label: 'Applied Batons' },
  { value: 'arabic', label: 'Arabic'         },
  { value: 'dots',   label: 'Dots'           },
];

export const HANDS: Option<Hands>[] = [
  { value: 'dauphine', label: 'Dauphine' },
  { value: 'syringe',  label: 'Syringe'  },
  { value: 'sword',    label: 'Sword'    },
];

export const STRAP_MATERIALS: Option<StrapMaterial>[] = [
  { value: 'leather',   label: 'Leather'   },
  { value: 'bracelet',  label: 'Bracelet'  },
  { value: 'nato',      label: 'NATO'      },
];

// ── curated color palettes ───────────────────────────────────────────────────

export const DIAL_COLORS: ColorOption[] = [
  { value: '#0a0a0a', label: 'Matte Black'    },
  { value: '#f5f5f0', label: 'Cream'          },
  { value: '#1b3a5c', label: 'Navy'           },
  { value: '#2d6a4f', label: 'Forest Green'   },
  { value: '#7c3d2e', label: 'Burgundy'       },
  { value: '#b0b8c1', label: 'Silver Grey'    },
];

export const STRAP_COLORS: ColorOption[] = [
  { value: '#1a1a1a', label: 'Black'          },
  { value: '#5c3d1e', label: 'Tan'            },
  { value: '#2c2c54', label: 'Navy'           },
  { value: '#556b2f', label: 'Olive'          },
  { value: '#7a4a2a', label: 'Cognac'         },
  { value: '#c0c0c0', label: 'Silver'         },
];
