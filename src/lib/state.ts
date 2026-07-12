// src/lib/state.ts

export type CaseShape   = 'round' | 'cushion';
export type CaseFinish  = 'steel' | 'gold' | 'black';
export type Bezel       = 'plain' | 'coinEdge' | 'dive';
export type Indices     = 'batons' | 'arabic' | 'dots';
export type Hands       = 'dauphine' | 'syringe' | 'sword';
export type StrapMaterial = 'leather' | 'bracelet' | 'nato';

export interface WatchConfig {
  caseShape:     CaseShape;
  caseFinish:    CaseFinish;
  bezel:         Bezel;
  dialColor:     string;   // hex value from the curated palette
  indices:       Indices;
  hands:         Hands;
  strapMaterial: StrapMaterial;
  strapColor:    string;   // hex value from the curated palette
}
