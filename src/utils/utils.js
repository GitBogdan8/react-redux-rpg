import {SOLIDS_MATRIX,GRID_SIZE} from "../constants/constants";
export const GAME_MATRIX = generateStructuredMap();

export function moveIfPossible(x, y, dx, dy) {
    const newX = x + dx;
    const newY = y + dy;

    //boundaries
    if (newX < 0 || newX >= GRID_SIZE || newY < 0 || newY >= GRID_SIZE) {
        return [x, y]; // out of bounds
    }
    
    //checking solids
    if (GAME_MATRIX[newY][newX] === 1 || GAME_MATRIX[newY][newX] === 2 || GAME_MATRIX[newY][newX] === 3)   
        {
            return[x, y]; //blocked
        }
    
    return [newX, newY]; //allowing movement
}
export function calculateViewpoint (playerX, playerY, viewportSize, mapWidth, mapHeight)
{
    const half = Math.floor(viewportSize / 2);

    const viewportX = Math.min(
        Math.max(playerX - half, 0),
        GRID_SIZE - viewportSize
    );

    const viewportY = Math.min(
        Math.max(playerY - half, 0),
        GRID_SIZE - viewportSize
    );

    return { viewportX, viewportY };
}

export function generateStructuredMap({
  treeClusterCount = 200,
  treeRadius = 1,
  rockProbability = 0.01,
  waterProbability = 0.005
} = {}) {
  const size = 100;
  const matrix = Array.from({ length: size }, () => Array(size).fill(0));
  const inBounds = (x, y) => x >= 0 && y >= 0 && x < size && y < size;

  // Trees
  for (let i = 0; i < treeClusterCount; i++) {
    const cx = Math.floor(Math.random() * size);
    const cy = Math.floor(Math.random() * size);
    for (let dx = -treeRadius; dx <= treeRadius; dx++) {
      for (let dy = -treeRadius; dy <= treeRadius; dy++) {
        const x = cx + dx, y = cy + dy;
        if (inBounds(x, y) && Math.abs(dx) + Math.abs(dy) <= treeRadius)
          matrix[y][x] = 1;
      }
    }
  }

  // Rocks
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (matrix[y][x] !== 0) continue;
      const neighbors = [[x-1,y],[x+1,y],[x,y-1],[x,y+1]];
      const nearSolid = neighbors.some(([nx, ny]) => inBounds(nx, ny) && matrix[ny][nx] > 0);
      if (!nearSolid && Math.random() < rockProbability) matrix[y][x] = 2;
    }
  }

  // Water
  const blobs = 10, maxBlobSize = 20;
  for (let i = 0; i < blobs; i++) {
    const sx = Math.floor(Math.random() * size), sy = Math.floor(Math.random() * size);
    if (matrix[sy][sx] !== 0) continue;
    const blobTiles = [[sx, sy]];
    matrix[sy][sx] = 3;
    let added = 1;
    while (added < maxBlobSize && blobTiles.length > 0) {
      const [x, y] = blobTiles[Math.floor(Math.random() * blobTiles.length)];
      for (const [dx, dy] of [[1,0],[-1,0],[0,1],[0,-1]]) {
        const nx = x + dx, ny = y + dy;
        if (inBounds(nx, ny) && matrix[ny][nx] === 0 && Math.random() < 0.4) {
          matrix[ny][nx] = 3;
          blobTiles.push([nx, ny]);
          added++;
          if (added >= maxBlobSize) break;
        }
      }
    }
  }

  return matrix;
}

export function generateInitialNPCs({
  staticCount = 10,
  movingCount = 10,
  avoid = []
} = {}) {
  const npcs = [];
  const occupied = new Set(avoid.map(({x, y}) => `${x},${y}`));
  const size = GRID_SIZE;
  
  const placeNPC = (type) => {
    let x, y;
    let attempts = 0;
    do {
      x = Math.floor(Math.random() * size);
      y = Math.floor(Math.random() * size);
      attempts++;
      if (attempts > 1000) return null; // Prevent infinite loop
    } while (
      GAME_MATRIX[y][x] !== 0 || 
      occupied.has(`${x},${y}`)
    );
    
    occupied.add(`${x},${y}`);
    return {
      id: `${type}-${Date.now()}-${Math.random()}`,
      type,
      x,
      y,
      health: 100
    };
  };
  
  for (let i = 0; i < staticCount; i++) {
    const npc = placeNPC('static');
    if (npc) npcs.push(npc);
  }
  
  for (let i = 0; i < movingCount; i++) {
    const npc = placeNPC('moving');
    if (npc) npcs.push(npc);
  }
  
  return npcs;
}