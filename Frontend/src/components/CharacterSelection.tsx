import React, { useState } from 'react';
import './CharacterSelection.css';

const characters = [
  { id: 1, name: 'Character 1' },
  { id: 2, name: 'Character 2' },
  { id: 3, name: 'Character 3' },
  // Add more characters as needed
];

const CharacterSelector = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstCharacter = currentIndex === 0;
    const newIndex = isFirstCharacter ? characters.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastCharacter = currentIndex === characters.length - 1;
    const newIndex = isLastCharacter ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="game-container">
      <h1 className="game-title">Choose your character!</h1>
      <div className="character-selector">
        <button onClick={goToPrevious} className="arrow left-arrow">
          &lt;
        </button>
        <div className="character-container">
          <div className="character-image">
            <div className="placeholder-image">Image Placeholder</div>
          </div>
          <h2 className="character-name">{characters[currentIndex].name}</h2>
        </div>
        <button onClick={goToNext} className="arrow right-arrow">
          &gt;
        </button>
      </div>
      <button className="start-button">Start</button>
    </div>
  );
};

export default CharacterSelector;
