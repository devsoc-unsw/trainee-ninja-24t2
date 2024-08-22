import micIcon from '../assets/mic-on.svg'
import muteIcon from '../assets/mic-off.svg'
import leaveIcon from '../assets/leave.svg'
import './VoiceControlBar.css'

interface VoiceControlBarProps {
    micOn: boolean
    handleDisconnect: () => void,
    handleMute: () => void
}

export const VoiceControlBar = ({micOn, handleDisconnect, handleMute}: VoiceControlBarProps) => {
    return (
        <div id="controls-container">
            {
                micOn === true ? (<img src={micIcon} id="mute-button" onClick={handleMute}/>) : (<img src={micIcon} id="mute-button" onClick={handleMute}/>)
            }
           <img src={leaveIcon} id="leave-button" onClick={handleDisconnect}/>
        </div>
    )
}