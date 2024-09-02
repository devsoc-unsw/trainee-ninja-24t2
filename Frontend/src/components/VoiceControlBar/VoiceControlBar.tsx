import micIcon from '../../assets/microphone.svg'
import muteIcon from '../../assets/microphone-slash.svg';
import leaveIcon from '../../assets/phone-slash.svg'
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
                micOn === true ? (<img src={micIcon} id="mute-button" onClick={handleMute}/>) : (<img src={muteIcon} id="mute-button" onClick={handleMute}/>)
            }
           <img src={leaveIcon} id="leave-button" onClick={handleDisconnect}/>
        </div>
    )
}