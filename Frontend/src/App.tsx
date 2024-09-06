import './App.css'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Room from './pages/Room/Room';
import { LiveChat } from './components/LiveChat/LiveChat';
import Home from './pages/Home/Home';
import AgoraRTC, { AgoraRTCProvider, useRTCClient,
} from "agora-rtc-react";

function App() {

  // Intialize Agora Client
  const agoraClient = useRTCClient( AgoraRTC.createClient({ codec: "vp8", mode: "rtc" })); // Initialize Agora Client
  

  return (
    // <Router>
    	<Routes>
        <Route path="/" element={<Home/>}/>
        {/* <Route path='/' element={ <ConnectForm connectToVideo={ handleConnect } /> } /> */}
        <Route path="/room" element={<Room/>}/>
        <Route path='/via/:channelName' element={ 
          <AgoraRTCProvider client={agoraClient}>
            <LiveChat></LiveChat>
          </AgoraRTCProvider>
        } />
      </Routes>
    // </Router>
  );
}

export default App;