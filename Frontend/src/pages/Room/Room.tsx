import './Room.css'
import Chat from '../../components/Chat/Chat'
import WidgetsContainer from '../../components/WidgetsContainer/WidgetsContainer'
import AgoraRTC, { AgoraRTCProvider, useRTCClient } from "agora-rtc-react";
import { LiveChat } from './../../components/LiveChat/LiveChat';
import { useState } from 'react';
import AudioMixer from './Audiomixer';

function Room() {
  const agoraClient = useRTCClient(AgoraRTC.createClient({ codec: "vp8", mode: "rtc" })); // Initialize Agora Client
  const [showMenu, setShowMenu] = useState(false);

  const handleMenu = () => setShowMenu(!showMenu);

  return (
    <AgoraRTCProvider client={agoraClient}>
      <div id="overlay">
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
      </div>
      <LiveChat></LiveChat>
    </AgoraRTCProvider>
  );
}
  
export default Room