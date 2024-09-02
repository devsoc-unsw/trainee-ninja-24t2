import { useState } from "react";
import { socket } from "../socket";
import "./ConnectForm.css";

const PORT = 8000;

interface ConnectFormProps {
    connectToVideo: (channelName: string) => void;
}

interface CreateRoomResponse {
    roomId: string;
    users: string[];
}

export async function createRoom(): Promise<CreateRoomResponse> {
    const response = await fetch(`http://localhost:${PORT}/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (!response.ok) {
        throw new Error('Failed to create room');
    }

    const data: CreateRoomResponse = await response.json();
    return data;
}

export const ConnectForm = ({ connectToVideo }: ConnectFormProps) => {
    const [channelName, setChannelName] = useState('');
    const [mode, setMode] = useState<'join' | 'create' | null>(null);

    const handleCreateRoom = async () => {
        try {
            const result = await createRoom();
            console.log('Room created:', result);

        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleConnect = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const trimmed = channelName.trim();

        if (trimmed === '' && mode === 'join') {
            alert('Please enter a valid room ID');
            return;
        }
        
        // connect to backend's socket, join a room
        socket.emit("joinRoom", trimmed);
        connectToVideo(trimmed);
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
                    <button id="create-button" onClick={() => {
                        setMode('create');
                        handleCreateRoom();
                    }}>Create New Room</button>
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