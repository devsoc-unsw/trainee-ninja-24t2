import './App.css'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Room from './pages/Room'
import { LiveChat } from './components/LiveChat';
import Home from './pages/Home';
import AgoraRTC, { AgoraRTCProvider, useRTCClient,
} from "agora-rtc-react";

function App() {
  const navigate = useNavigate();

  // Intialize Agora Client
  const agoraClient = useRTCClient( AgoraRTC.createClient({ codec: "vp8", mode: "rtc" })); // Initialize Agora Client

  // const handleConnect = (channelName: string) => {
  //   // On form submit, navigate to new channel
  //   navigate(`/via/${channelName}`) 
  // }

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