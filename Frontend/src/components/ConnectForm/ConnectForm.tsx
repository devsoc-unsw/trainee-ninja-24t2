import { useState } from "react"
import { socket } from "../../socket"
import "./ConnectForm.css"

/* 
* Connect  to video callback function.
* Take in the channelName received from the form element and
* pass it back to the LiveChat component
*/ 
interface ConnectFormProps {
    connectToVideo: (channelName: string) => void
  }
  
  export const ConnectForm = ({ connectToVideo } : ConnectFormProps) => {
    const [channelName, setChannelName] = useState('');

    const handleConnect = (e: React.FormEvent<HTMLFormElement>) => {
        // remove whitespace
        const trimmed = channelName.trim();
        
        // invalid input, string empty
        if (trimmed === '') {
            // prevent reload
            e.preventDefault();
            setChannelName('');
            return;
        }
        
        // connect to backend's socket, join a room
        socket.connect();
        socket.emit("joinRoom", trimmed);

        // send channel name back to LiveChat component
        connectToVideo(trimmed);
    }
  
    return (
        <form id="join-form" onSubmit={handleConnect}>
            <div className="card">
                <h1 id="app-name">Kuma</h1>
                <input type="text" id="channel-input" placeholder='Channel Name' value={channelName}
                    onChange={(e) => {
                        setChannelName(e.target.value)
                    }}
                />
                <button id="connect-button">Connect</button>
            </div>
        </form>
    )
  }