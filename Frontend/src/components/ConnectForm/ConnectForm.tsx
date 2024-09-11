import { useState } from "react"
import "./ConnectForm.css"
import { JoinForm } from "../JoinForm/JoinForm";
import { Popover } from "@mui/material";

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
    // Anchor element for the popup to appear from
    const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);

    const handleCreateRoom = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log("DEBUG TEST");
        
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

    // Open popup to join an existing room when button is clicked
    let popupOpen = Boolean(anchor);
    const handlePopup = (event: React.MouseEvent<HTMLButtonElement>) => {
        // Make sure user has entered a user name before allowing to enter a room id
        // if (nameInput !== '') {
            setAnchor(event.currentTarget);
        // }
    };

    // Handle closing the popup
    const handleClose = () => {
        setAnchor(null);
    };


    return (
        <div className="card">
            <h1 id="app-name">Kuma</h1>
            <h2>studying made fun</h2>
            {!mode && (
                <div className="form-group">
                    <form id="join-form" onSubmit={handleCreateRoom}>
                        <input
                            type="text"
                            id="username-input"
                            placeholder="Enter Username"
                            value={nameInput}
                            onChange={(e) => {
                                const input = e.target.value;
                                handleNameInput(input);
                            }}
                        />
                        <button className="home-button" id="create-button" type="submit">Create New Room</button>
                        <button className="home-button" id="join-button" type="button" onClick={handlePopup}>Join Existing Room</button>
                    </form>
                    <Popover id="join-popup" open={popupOpen} anchorEl={anchor} onClose={handleClose}>
                        <div id="popup-body">
                            <form id="popup-form" onSubmit={handleConnect}>
                                <input
                                    type="text"
                                    id="popup-input"
                                    placeholder="Enter RoomId"
                                    value={roomId}
                                    onChange={(e) => {
                                        const input = e.target.value;
                                        handleRoomId(input);
                                    }}
                                />
                                <button id="popup-button" type="submit" form="popup-form">Join</button>
                            </form>
                        </div>
                    </Popover>
                </div>
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