import { useState } from "react"
import "./ConnectForm.css"
import { CreateForm } from "../CreateForm/CreateForm";
import { JoinForm } from "../JoinForm/JoinForm";

const PORT = 8000;

interface ConnectFormProps {
    connectToVideo: (roomId: string, username: string) => void;
}

interface CreateRoomResponse {
    roomId: string;
    users: string[];
}

export async function createRoomRequest(): Promise<CreateRoomResponse> {
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
    const [roomId, setRoomId] = useState('');
    const [mode, setMode] = useState<'join' | 'name' | null>(null);
    const [nameInput, setNameInput] = useState('');

    const handleCreateRoom = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (nameInput.trim() == '') {
            alert('Please enter a valid username');
            return;
        }

        try {
            const result = await createRoomRequest();
            console.log('Room created:', result);
            connectToVideo(result.roomId, nameInput);  // Connect to the video channel
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleConnect = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const trimmedName = nameInput.trim();
        const trimmedId = roomId.trim();

        if (trimmedName === '' || (trimmedId === '' && mode === 'join')) {
            alert('Please fill all fields');
            return;
        }

        // Validate the roomId
        const response = await fetch(`http://localhost:${PORT}/validateRoom/${trimmedId}`);
        const result = await response.json();

        if (result.valid && result.userCount < 2) {
            connectToVideo(trimmedId, nameInput);  // Connect to the video channel
        } else if (result.valid && result.userCount >= 2) {
            alert('This room is currently full');
        } else {
            alert('Invalid Room ID');
        }
    };

    const handleBack = () => {
        setMode(null);  // Reset the mode to go back to the initial state
        setRoomId('');  // Clear the input field
    };

    const handleNameInput = (input: string) => {
        setNameInput(input);
    }

    const handleRoomId = (roomId: string) => {
        setRoomId(roomId);
    }

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
                <CreateForm handleCreateRoom={handleCreateRoom} 
                            handleBack={handleBack}
                            handleNameInput={handleNameInput}
                            nameInput={nameInput}>
                </CreateForm>
            )}
            {mode === 'join' && (
              <JoinForm handleConnect={handleConnect} 
                        handleBack={handleBack} 
                        handleNameInput={handleNameInput} 
                        handleRoomId={handleRoomId} 
                        roomId={roomId} 
                        nameInput={nameInput}>
              </JoinForm>
            )}
        </div>
    );
};