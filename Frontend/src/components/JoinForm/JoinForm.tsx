
interface JoinFormProps {
    handleConnect: (e: React.FormEvent<HTMLFormElement>) => void,
    handleBack: () => void,
    handleRoomId: (filteredInput: string) => void,
    handleNameInput: (input: string) => void,
    nameInput: string,
    roomId: string,
}

export const JoinForm = ({handleConnect, handleBack, handleRoomId, handleNameInput, nameInput, roomId}: JoinFormProps) => {
    return (
        <form id="join-form" onSubmit={handleConnect}>
        <input
            type="text"
            id="channel-input-create"
            placeholder="Enter Room ID"
            value={roomId}
            onChange={(e) => {
                const input = e.target.value;
                // Remove any non-alphabetic characters and limit to 4 characters
                const filteredInput = input.replace(/[^a-zA-Z]/g, '').slice(0, 4);
                handleRoomId(filteredInput);
            }}
        />
        <input
            type="text"
            id="username-input-join"
            placeholder="Enter Username"
            value={nameInput}
            onChange={(e) => {
                const input = e.target.value;
                handleNameInput(input);
            }}
        />
        <div className="button-group">
            <button type="submit">Join Room</button>
            <button id="back-button" type="button" onClick={handleBack}>Back</button>
        </div>
    </form>
    )
}