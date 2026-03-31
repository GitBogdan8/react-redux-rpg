export const GRID_SIZE = 100;
export const SOLIDS_MATRIX = Array.from({ length: GRID_SIZE }, (_, row) =>
  Array.from({ length: GRID_SIZE }, (_, col) =>
    (row === 0 && col === 0)
    ? 0
    : (Math.random() < 0.15 ? 1 : 0))   //generare random, 15% din tile-uri o sa fie obstacole / copaci, dar asfel incat sa nu poata aparea copaci peste player
);

