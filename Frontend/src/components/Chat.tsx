import { useState } from 'react';
import './Chat.css'

function Chat() {
    const [message, setMessage] = useState('');

    const sendMessage = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        setMessage('');
        // TODO: Send message to server to be displayed over the player avatar
        console.log("Sent message: " + message);
        }
    }

    return (
        <form>
        <textarea id="chat-box" 
                    name="message" 
                    placeholder='Write something...'
                    value={message} 
                    onChange={(event) => setMessage(event.target.value)}
                    onKeyDown={sendMessage}>
        </textarea>
        </form>
    );
}

export default Chat