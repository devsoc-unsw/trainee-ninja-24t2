import React, { useState } from 'react';
import { Howl } from 'howler';
import './Audiomixer.css';

const soundsData = [
  {
    name: 'Coffee Pot',
    src: '/audio/coffeepot.wav',
  },
  {
    name: 'Handwriting',
    src: '/audio/handwriting.wav',
  },
  {
    name: 'Rain',
    src: '/audio/raining.mp3',
  }
];

function AudioMixer() {
  const [sounds, setSounds] = useState(
    soundsData.map((sound) => ({
      name: sound.name,
      sound: new Howl({ src: [sound.src], loop: true, preload: true }),
      volume: 0.5,
      isPlaying: false,
    }))
  );

  const handlePlayPause = (index: number) => {
    const updatedSounds = [...sounds];
    if (updatedSounds[index].isPlaying) {
      updatedSounds[index].sound.pause();
    } else {
      updatedSounds[index].sound.play();
    }
    updatedSounds[index].isPlaying = !updatedSounds[index].isPlaying;
    setSounds(updatedSounds);
  };

  const handleVolumeChange = (index: number, volume: number) => {
    const updatedSounds = [...sounds];
    updatedSounds[index].sound.volume(volume);
    updatedSounds[index].volume = volume;
    setSounds(updatedSounds);
  };

  return (
    <div className="audio-mixer">
      {sounds.map((sound, index) => (
        <div key={index} className="mixer-track">
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <p>{sound.name}</p>
            <button 
              style={{position: 'absolute', right: '10px'}}
              className={sound.isPlaying ? 'paused' : ''}
              onClick={() => handlePlayPause(index)}
            ></button>
          </div>
          <input 
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={sound.volume}
            onChange={(e) => handleVolumeChange(index, parseFloat(e.target.value))}
          />
        </div>
      ))}
    </div>
  );
}

export default AudioMixer;
