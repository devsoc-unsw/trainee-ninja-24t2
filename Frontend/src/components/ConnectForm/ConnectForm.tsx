import { useState } from "react"
import "./ConnectForm.css"

const PORT = 8000;

interface ConnectFormProps {
    connectToVideo: (roomId: string, username: string) => void;
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
    const [mode, setMode] = useState<'join' | 'name' | null>(null);
    const [nameInput, setNameInput] = useState('');

    const handleCreateRoom = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const result = await createRoom();
            console.log('Room created:', result);
            connectToVideo(result.roomId, nameInput);  // Connect to the video channel
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleConnect = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const trimmed = channelName.trim();

        if (trimmed === '' && mode === 'join') {
            alert('Please enter a valid room ID');
            return;
        }

        // Validate the roomId
        const response = await fetch(`http://localhost:${PORT}/validateRoom/${trimmed}`);
        const result = await response.json();

        if (result.valid && result.userCount < 2) {
            connectToVideo(trimmed, nameInput);  // Connect to the video channel
        } else if (result.valid && result.userCount >= 2) {
            alert('This room is currently full');
        } else {
            alert('Invalid Room ID');
        }
    };

    const handleBack = () => {
        setMode(null);  // Reset the mode to go back to the initial state
        setChannelName('');  // Clear the input field
    };

    return (
        <div className="card">
            <h1 id="app-name">Kuma</h1>
            {!mode && (
                <div className="button-group">
                    <button id="create-button" onClick={() => setMode('name')}>Create New Room</button>
                    <button id="join-button" onClick={() => setMode('join')}>Join Existing Room</button>
                </div>
            )}
            {mode === 'name' && (
                <form id="join-form" onSubmit={handleCreateRoom}>
                    <input
                        type="text"
                        id="username-input"
                        placeholder="Enter Username"
                        value={nameInput}
                        onChange={(e) => {
                            const input = e.target.value;
                            setNameInput(input);
                        }}
                    />
                    <div className="button-group">
                        <button type="submit">Create Room</button>
                        <button id="back-button" type="button" onClick={handleBack}>Back</button>
                    </div>
                </form>
            )}
            {mode === 'join' && (
                <form id="join-form" onSubmit={handleConnect}>
                    <input
                        type="text"
                        id="channel-input-create"
                        placeholder="Enter Room ID"
                        value={channelName}
                        onChange={(e) => {
                            const input = e.target.value;
                            // Remove any non-alphabetic characters and limit to 4 characters
                            const filteredInput = input.replace(/[^a-zA-Z]/g, '').slice(0, 4);
                            setChannelName(filteredInput);
                        }}
                    />
                    <input
                        type="text"
                        id="username-input-join"
                        placeholder="Enter Username"
                        value={nameInput}
                        onChange={(e) => {
                            const input = e.target.value;
                            setNameInput(input);
                        }}
                    />
                    <div className="button-group">
                        <button type="submit">Join Room</button>
                        <button id="back-button" type="button" onClick={handleBack}>Back</button>
                    </div>
                </form>
            )}
        </div>
    );
};