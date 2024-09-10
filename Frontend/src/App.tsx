import './App.css'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Room from './pages/Room/Room';
import Home from './pages/Home/Home';
import AgoraRTC, { AgoraRTCProvider, useRTCClient,
} from "agora-rtc-react";

function App() {

  // Intialize Agora Client
  

  return (
    // <Router>
    	<Routes>
        <Route path="/" element={<Home/>}/>
        {/* <Route path='/' element={ <ConnectForm connectToVideo={ handleConnect } /> } /> */}
        <Route path='/via/:channelName' element={<Room/>} />
      </Routes>
    // </Router>
  );
}

export default App;