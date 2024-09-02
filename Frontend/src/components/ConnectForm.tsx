import { useState } from "react";
import { socket } from "../socket";
import "./ConnectForm.css";

interface ConnectFormProps {
    connectToVideo: (channelName: string) => void;
}

const createRoom = () => {
    
}

export const ConnectForm = ({ connectToVideo }: ConnectFormProps) => {
    const [channelName, setChannelName] = useState('');
    const [mode, setMode] = useState<'join' | 'create' | null>(null);

    const handleConnect = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const trimmed = channelName.trim();

        if (trimmed === '' && mode === 'join') {
            alert('Please enter a valid room ID');
            return;
        }
        
        // connect to backend's socket, join a room
        socket.emit("joinRoom", trimmed);

        if (mode === 'join') {
            connectToVideo(trimmed);
        } else if (mode === 'create') {
            // createNewRoom();
        }
    };

    // goes back to homescreen
    const handleBack = () => {
        setMode(null); // Reset the mode to go back to the initial state
        setChannelName(''); // Clear the input field
    };

    return (
        <div className="card">
            <h1 id="app-name">Kuma</h1>
            {!mode && (
                <div className="button-group">
                    <button id="create-button" onClick={() => setMode('create')}>Create New Room</button>
                    <button id="join-button" onClick={() => setMode('join')}>Join Existing Room</button>
                </div>
            )}
            {mode === 'join' && (
                <form id="join-form" onSubmit={handleConnect}>
                    <input
                        type="text"
                        id="channel-input"
                        placeholder="Enter Room ID"
                        value={channelName}
                        onChange={(e) => {
                            const input = e.target.value;
                            // Remove any non-alphabetic characters and limit to 4 characters
                            const filteredInput = input.replace(/[^a-zA-Z]/g, '').slice(0, 4);
                            setChannelName(filteredInput);
                        }}
                    />
                    <div className="button-group">
                        <button>Join Room</button>
                        <button id="back-button" type="button" onClick={handleBack}>Back</button>
                    </div>
                </form>
            )}
            {mode === 'create' && (
                <div>
                    <button id="back-button" type="button" onClick={handleBack}>Back</button>
                </div>
            )}
        </div>
    );
};