import { ConnectForm } from '../components/ConnectForm';
import './Home.css'
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    const handleConnect = (channelName: string) => {
        // On form submit, navigate to new channel
        navigate(`/via/${channelName}`) 
    }
   
    return (
      <div id="home">
        <h1 id="app-name">Kuma</h1>
        <ConnectForm connectToVideo={ handleConnect } />
        <RoomList/>
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