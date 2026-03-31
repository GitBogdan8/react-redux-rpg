import { moveIfPossible } from "../utils/utils";
import { GRID_SIZE } from "../constants/constants";
import { generateStructuredMap } from '../utils/utils';

import { combineReducers } from 'redux';
import playerReducer from './playerReducer';
import npcsReducer from './npcsReducer';

const rootReducer = combineReducers({
  player: playerReducer,
  npcs: npcsReducer
});

export default rootReducer;