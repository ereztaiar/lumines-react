import React from 'react';
import GameView from '@lumines/game-components/src/components/Game/GameView';
import GameContext from './GameContext';

const GameProvider = ({ mode, muted, skinSounds, speed, scoring, children }) => {
  return (
    <GameView mode={mode} muted={muted} skinSounds={skinSounds} speed={speed} scoring={scoring}>
      {(gameState) => (
        <GameContext.Provider value={gameState}>
          {children}
        </GameContext.Provider>
      )}
    </GameView>
  );
};

export default GameProvider;
