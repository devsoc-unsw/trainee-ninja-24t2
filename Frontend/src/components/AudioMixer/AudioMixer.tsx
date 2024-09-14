import { useState } from 'react';
import Draggable from "react-draggable";
import { Howl } from 'howler';
import './AudioMixer.css';
import { Slider } from '@mui/material';

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

export const AudioMixer = () => {
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

  const handleVolumeChange = (index: number, event: Event, volume: number | number[]) => {
    console.log("TEST SLIDER", event, volume);
    const updatedSounds = [...sounds];
    updatedSounds[index].sound.volume(volume as number);
    updatedSounds[index].volume = volume as number;
    setSounds(updatedSounds);
  };

  return (
    <Draggable defaultPosition={{x: -200, y: 150}}>
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
            <Slider aria-label="Volume" 
                    sx={(t) => ({
                      color: 'rgba(255,255,255,0.87)',
                      height: 4,
                      '& .MuiSlider-thumb': {
                        width: 8,
                        height: 8,
                        transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                        '&::before': {
                          boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                        },
                        '&:hover, &.Mui-focusVisible': {
                          boxShadow: `0px 0px 0px 8px ${'rgb(0 0 0 / 16%)'}`,
                          ...t.applyStyles('dark', {
                            boxShadow: `0px 0px 0px 8px ${'rgb(255 255 255 / 16%)'}`,
                          }),
                        },
                        '&.Mui-active': {
                          width: 20,
                          height: 20,
                        },
                      },
                      '& .MuiSlider-rail': {
                        opacity: 0.28,
                      },
                      ...t.applyStyles('dark', {
                        color: '#fff',
                      }),
                    })}
                    min={0} 
                    max={1} 
                    step={0.01} 
                    value={sound.volume} 
                    onChange={(event: Event, newValue: number | number[]) => handleVolumeChange(index, event, newValue)}>
              </Slider>
            </div>
        ))}
        </div>
    </Draggable>
  );
}