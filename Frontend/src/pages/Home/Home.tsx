import { ConnectForm } from '../../components/ConnectForm/ConnectForm';
import './Home.css'
import { useNavigate } from 'react-router-dom';
import Spline from '@splinetool/react-spline';
import { socket } from "../../socket"

function Home() {
    const navigate = useNavigate();

    const handleConnect = (roomId: string, username: string) => {
        socket.connect(); // Join the socket room
        socket.emit('joinRoom', roomId, username);  
        localStorage.setItem('roomId', roomId);
        // On form submit, navigate to new channel
        navigate(`/via/${roomId}`);
    }
   
    return (
      <div id="home">
        <div id='form-container'>
            <ConnectForm connectToVideo={ handleConnect } />
        </div>
        <div id='hero-container'>
            <Spline scene="https://prod.spline.design/FDTVAWYX6OmI84B6/scene.splinecode"/>
        </div>
      </div>
    )
}
  
export default Home