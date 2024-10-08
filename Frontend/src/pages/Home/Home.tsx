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
            {/* <RoomList/> */}
        </div>
        <div id='hero-container'>
            <Spline scene="https://prod.spline.design/U9O6K7fXziMEU7Wu/scene.splinecode" />
        </div>
      </div>
    )
}

function RoomList() {
    // Array of room names for testing
    const roomNames = [
        'Room 1', 'Room 2', 'Room 3', 'Room 4', 'Room 5'
    ];

    return (
        <div id="room-list">
            {roomNames.map((name) => (
            <RoomLink name={name} />
            ))}
        </div>
    );
}

function RoomLink({name} : {name : string}) {
    const navigate = useNavigate();

    return (
        <div className='room-link' onClick={() => navigate(`/room`)}>
            <h4 className='room-link-name'>{name}</h4>
        </div>
    )
}
  
export default Home