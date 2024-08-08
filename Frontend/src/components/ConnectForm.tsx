import { useState } from "react"

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

        // send channel name back to LiveChat component
        connectToVideo(trimmed);
    }
  
    return (
        <form onSubmit={handleConnect}>
            <div className="card">
                <input type="text" id="channelName" placeholder='Channel Name' value={channelName}
                    onChange={(e) => {
                        setChannelName(e.target.value)
                    }}
                />
                <button>Connect</button>
            </div>
        </form>
    )
  }