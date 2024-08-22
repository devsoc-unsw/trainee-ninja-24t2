import muteIcon from '../assets/mic-off.svg'
import leaveIcon from '../assets/leave.svg'

interface VoiceControlBarProps {
    handleDisconnect: () => void,
    handleMute: () => void
}

export const VoiceControlBar = ({handleDisconnect, handleMute}: VoiceControlBarProps) => {
    return (
        <div id="controls-container">
           <img src={muteIcon} id="mute-button" onClick={handleMute}/>
           <img src={leaveIcon} id="leave-button" onClick={handleDisconnect}/>
        </div>
    )
}