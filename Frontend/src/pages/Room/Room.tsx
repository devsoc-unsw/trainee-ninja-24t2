import './Room.css'
import AgoraRTC, { AgoraRTCProvider, useRTCClient } from "agora-rtc-react";
import { LiveChat } from './../../components/LiveChat/LiveChat';
import { AudioMixer } from '../../components/AudioMixer/AudioMixer';
import { useState } from 'react';
import { CountdownTimer } from '../../components/CountdownTimer/CountdownTImer';
import { WhiteBoard } from '../../components/WhiteBoard/WhiteBoard';

function Room() {
  // Widget states
  const [showAudioMixer, setShowAudioMixer] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  

  // Toggle widgets depending on object clicked
  function handleObjectClick(objName: string) {
    if (objName === "radio") {
      setShowAudioMixer(a => !a);
    }
    else if (objName === "computer-2") {
      setShowTimer(a => !a);
    }
    else if (objName === "book-small") {

    }
  }

  const agoraClient = useRTCClient(AgoraRTC.createClient({ codec: "vp8", mode: "rtc" })); // Initialize Agora Client

  return (
    <AgoraRTCProvider client={agoraClient}>
      <div id="overlay">
        <h3>Room ID: {localStorage.getItem('roomId')}</h3>
        {showAudioMixer &&
          <div style={{position: 'absolute', zIndex: 1, right: '25px', top: '15px'}}>
            <AudioMixer></AudioMixer>
         </div>
        }

        {showTimer &&
          <div style={{position: 'absolute', zIndex: 1, right: '25px', top: '15px'}}>
            <CountdownTimer></CountdownTimer>
         </div>
        }
      </div>
      <LiveChat handleObjectClick={handleObjectClick}></LiveChat>
    </AgoraRTCProvider>
  );
}
  
export default Room