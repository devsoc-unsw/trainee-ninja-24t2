interface CreateFormProps {
    handleCreateRoom: (e: React.FormEvent<HTMLFormElement>) => void,
    handleBack: () => void,
    handleNameInput: (input: string) => void,
    nameInput: string,
}

export const CreateForm = ({handleCreateRoom, handleBack, handleNameInput, nameInput}: CreateFormProps) => {
    return (
        <form id="join-form" autoComplete="off" onSubmit={handleCreateRoom}>
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
            <div className="button-group">
                <button type="submit">Create Room</button>
                <button id="back-button" type="button" onClick={handleBack}>Back</button>
            </div>
        </form>
    )
}