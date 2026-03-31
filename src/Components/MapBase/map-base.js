import React from 'react';
import { connect } from 'react-redux';
import './map-base.css';
import { SOLIDS_MATRIX, VIEWPORT_SIZE } from '../../constants/constants';
import { calculateViewpoint } from '../../utils/utils';
import { motion } from "framer-motion";
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { GAME_MATRIX } from '../../utils/utils';

const MapBase = ({ x, y, attack, playerDir, directionX, directionY, npcs}) => {
    const VIEWPORT_SIZE = 10;

    const { viewportX, viewportY } = calculateViewpoint(x, y, VIEWPORT_SIZE);

    const tilePercent = 100 / VIEWPORT_SIZE;
    const mapTranslateX = -viewportX * tilePercent / 10;
    const mapTranslateY = -viewportY * tilePercent / 10;
    const playerTranslateX = (x - viewportX) * tilePercent * 10;
    const playerTranslateY = (y - viewportY) * tilePercent * 10;

    const dispatch = useDispatch();
    
    useEffect(() => {
      if (attack) {
        const timeout = setTimeout(() => {
          dispatch({ type: 'ATTACK_END' });
        }, 1000);
        
        return () => clearTimeout(timeout);
      }
    }, [attack, dispatch]);

    useEffect(() => {
      const interval = setInterval(() => {
        dispatch({ 
          type: 'TICK', 
          payload: { 
            attack: attack,
            playerPos: { x, y },
            playerDir: playerDir
          } 
        });
      }, 500);
      
      return () => clearInterval(interval);
    }, [dispatch, attack, x, y, playerDir]);

     return (
        <div className="page-container">
            <div className="viewport-container" style={{ '--tile-size': `${tilePercent}%` }}>
                <div className="map-content" >
                    <table className="map-table">
                        <tbody>
                            {Array.from({ length: VIEWPORT_SIZE }).map((_, rowIndex) => {
                                const mapRowIndex = viewportY + rowIndex; 
                                return (
                                    <tr key={rowIndex}>
                                        {Array.from({ length: VIEWPORT_SIZE }).map((_, colIndex) => {
                                            const mapColIndex = viewportX + colIndex;
                                            const isPlayer = (mapRowIndex === y && mapColIndex === x);            
                                            const cellValue = GAME_MATRIX?.[mapRowIndex]?.[mapColIndex];
                                            
                                            return (
                                                <td key={colIndex} className={`map-cell ${ cellValue === 1 ? 'obstacle-cell' : cellValue === 2 ? 'rock-cell' : cellValue === 3 ? 'water-cell' : ''}`}>
                                                    {isPlayer && (
                                                        <motion.div
                                                            className="player-cell"
                                                            style={{ backgroundImage: `url(${require(`./Sprites/walk_${playerDir.toLowerCase()}.png`)})`,backgroundSize: 'contain'}}
                                                            initial={{ x: directionX * 32, y: directionY * 32 }}
                                                            animate={{ x: 0, y: 0 }}
                                                            transition={{ type: "tween", ease: "linear", duration: 0.1 }}
                                                        />
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {attack && (
                    <motion.div
                        className="attack-line"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ 
                            x: [0, playerDir === 'LEFT' ? -32 : playerDir === 'RIGHT' ? 32 : 0], 
                            y: [0, playerDir === 'UP' ? -32 : playerDir === 'DOWN' ? 32 : 0],
                            opacity: [1, 0],
                            scale: [1, 1.5]
                        }}
                        transition={{ duration: 0.3 }}
                        style={{
                            left: `${(attack.x + (playerDir === 'LEFT' ? -1 : playerDir === 'RIGHT' ? 1 : 0) - viewportX) * tilePercent}%`,
                            top: `${(attack.y + (playerDir === 'UP' ? -1 : playerDir === 'DOWN' ? 1 : 0) - viewportY) * tilePercent}%`,
                            width: `${tilePercent}%`,
                            height: `${tilePercent}%`
                        }}
                    />
                )}

                {npcs.map(npc => {
                  const npcLeft = (npc.x - viewportX) * tilePercent;
                  const npcTop = (npc.y - viewportY) * tilePercent;
                  
                  return (
                    <div
                      key={npc.id}
                      className={`npc ${npc.type}`}
                      style={{
                        left: `${npcLeft}%`,
                        top: `${npcTop}%`,
                        width: `${tilePercent}%`,
                        height: `${tilePercent}%`,
                        backgroundImage: `url(${require(`./Sprites/${npc.type === 'static' ? 'npc_static' : 'npc_moving'}.png`)})`,
                      }}
                    >
                      <div className="npc-health-bar">
                        <div 
                          className="health-fill" 
                          style={{ 
                            width: `${npc.health}%`,
                            background: npc.health > 60 ? '#00ff00' : npc.health > 30 ? '#ffff00' : '#ff0000',
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    x: state.player.x,
    y: state.player.y,
    playerDir: state.player.playerDir,
    attack: state.player.attack,
    directionX: state.player.directionX, 
    directionY: state.player.directionY,
    npcs: state.npcs,
});

export default connect(mapStateToProps)(MapBase);