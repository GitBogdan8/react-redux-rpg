import { moveIfPossible } from "../utils/utils";
import { GRID_SIZE } from "../constants/constants";
import { generateStructuredMap } from '../utils/utils';

const initialState = {
  x: 0,
  y: 0,
  playerDir: 'UP',
  attack: null, // in loc de boolean
  directionX: 0,
  directionY: 0,
};
  
  const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREASE_X": {
      const [newX, newY] = moveIfPossible(state.x, state.y, 1, 0);
      console.log([newX,newY])
      return { ...state, x: newX, y: newY, playerDir: 'RIGHT', attack: null, directionX: -1, directionY: 0 };   
    }
    case "DECREASE_X": {
      const [newX, newY] = moveIfPossible(state.x, state.y, -1, 0);
      console.log([newX,newY])
      return { ...state, x: newX, y: newY, playerDir: 'LEFT', attack: null, directionX: 1, directionY: 0 };
    }
    case "INCREASE_Y": {
      const [newX, newY] = moveIfPossible(state.x, state.y, 0, 1);
      console.log([newX,newY])
      return { ...state, x: newX, y: newY, playerDir: 'DOWN', attack: null, directionX: 0, directionY: -1 };
    }
    case "DECREASE_Y": {
      const [newX, newY] = moveIfPossible(state.x, state.y, 0, -1);
      console.log([newX,newY])
      return { ...state, x: newX, y: newY, playerDir: 'UP', attack: null, directionX: 0, directionY: 1 };
    }
    
    case "ATTACK_START": {
      return {
        ...state,
        attack: {
          x: state.x,
          y: state.y,
          dir: state.playerDir,
        }
      }
    }

    case "ATTACK_END": {
      return {...state, attack: null };
    }

    default:
      return state;
  }
};

export default playerReducer;