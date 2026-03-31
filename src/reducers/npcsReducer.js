import { moveIfPossible } from "../utils/utils";
import { generateInitialNPCs } from "../utils/utils";

const initialState = generateInitialNPCs({ avoid: [{ x: 0, y: 0 }] });

const npcsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TICK': {
      const { attack } = action.payload;
      console.log('TICK in npcsReducer:', { attack, npcsCount: state.length });
      
      const newState = state.map(npc => {
        let updated = { ...npc };
        
        // Damage in attack zone (inainte de miscare)
        if (attack) {
          let attackX = attack.x;
          let attackY = attack.y;
          
          // Pozitia atacului
          switch (attack.dir) {
            case 'UP': attackY -= 1; break;
            case 'DOWN': attackY += 1; break;
            case 'LEFT': attackX -= 1; break;
            case 'RIGHT': attackX += 1; break;
            default: break;
          }
          
          // Check if NPC is at attack position to deal damage
          if (updated.x === attackX && updated.y === attackY) {
            updated.health = Math.max(0, updated.health - 10);
          }
        }
        
        // Miscare
        if (npc.type === 'moving' && updated.health > 0) {
          const directions = ['UP', 'DOWN', 'LEFT', 'RIGHT'];
          const direction = directions[Math.floor(Math.random() * 4)];
          
          let dx = 0, dy = 0;
          switch (direction) {
            case 'UP': dy = -1; break;
            case 'DOWN': dy = 1; break;
            case 'LEFT': dx = -1; break;
            case 'RIGHT': dx = 1; break;
            default: break;
          }
          
          const [newX, newY] = moveIfPossible(npc.x, npc.y, dx, dy);
          updated.x = newX;
          updated.y = newY;
        }
        
        return updated;
      }).filter(npc => npc.health > 0); // Remove dead NPCs
      
      return newState;
    }
    
    case 'INIT_NPCS': {
      return action.payload;
    }

    default:
      return state;
  }
};

export default npcsReducer;