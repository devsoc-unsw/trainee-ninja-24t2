import './Room.css'
import AgoraRTC, { AgoraRTCProvider, useRTCClient } from "agora-rtc-react";
import { LiveChat } from './../../components/LiveChat/LiveChat';
import { AudioMixer } from '../../components/AudioMixer/AudioMixer';
import { useState } from 'react';

function Room() {
  const [showAudioMixer, setShowAudioMixer] = useState(false);

  // Toggle widgets depending on object clicked
  function handleObjectClick(objName: string) {
    console.log("SPLINNNE", objName);
    if (objName === "radio") {
      setShowAudioMixer(!showAudioMixer);
    }
    else if (objName === "computer-2") {

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
      </div>
      {/* <div id="overlay">
        <h3>Room ID: {localStorage.getItem('roomId')}</h3>
        <div style={{position: 'absolute', zIndex: 1, right: '25px', top: '15px'}}>
          <AudioMixer></AudioMixer>
        </div>
        {!showMenu && <div id="widget-button" onClick={handleMenu}>&#8964;</div>}
        {showMenu && <div>
          <div id="widget-menu" onClick={handleMenu}>
            <div id="widget-close-button">^</div>
            <div className="widget-item">+ Pomodoro timer</div>
            <div className="widget-item">+ Pomodoro timer</div>
          </div>
        </div>}
      </div> */}
      <LiveChat handleObjectClick={handleObjectClick}></LiveChat>
    </AgoraRTCProvider>
  );
}
  
export default Room