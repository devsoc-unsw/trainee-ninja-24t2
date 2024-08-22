import { useJoin, useLocalMicrophoneTrack, usePublish, useRemoteAudioTracks, useRemoteUsers } from "agora-rtc-react";
import { useState } from "react";
import Spline from '@splinetool/react-spline';
import { useNavigate, useParams } from "react-router-dom";
import { VoiceControlBar } from "./VoiceControlBar";

/**
 * This component allows for voice chat via Agora's RTC React SDK.
 * Refer to documentations: 
 * https://api-ref.agora.io/en/video-sdk/reactjs/2.x/functions/usePublish.html
 * https://www.agora.io/en/blog/building-a-video-chat-app-using-react-hooks-and-agora/
 */

export const LiveChat = () => {
    // TODO: HIDE WITH ENVIRONMENT VARIABLE
    // Agora appId and token
    const appId = "7176ccafd79b4363bf7dcea529c747ff";

    // Get parameters from react-routes
    const {channelName} = useParams();
    const navigate = useNavigate();

    // Voice chat/connection states
    const [activeConnection, setActiveConnection] = useState(true);
    const [micOn, setMic] = useState(true);

    // Function handlers to be passed as props to child component
    const handleDisconnect = () => {
        setActiveConnection(false);
        navigate('/');
    }

    const handleMute = () => {
        setMic((a => !a))
    }

    // Hook provided by Agora, utilize the user's microphone
    const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);

    /**
     * Let user join the specified room.
     * channelName will never be null (hopefully)
     */
    useJoin({
        appid: appId,
        channel: channelName!,
        token: null,
        },
        activeConnection,
    );

    /**
     * Publish user's microphone stream to room
     * Second element is null since we are not streaming video
    */
    usePublish([localMicrophoneTrack, null])

    // Get all remote users's audio tracks and play them
    const remoteUsers = useRemoteUsers();
    const { audioTracks } = useRemoteAudioTracks(remoteUsers);

    audioTracks.forEach((audioTrack) => {
        audioTrack.play();
    })

    // TODO: CREATE AN ELEMENT FOR EXIT AND MUTE BUTTONS, PASS IN PROPS
    return (
        <>
            <Spline scene="https://prod.spline.design/QtFOx3krmOa1IFbv/scene.splinecode" />
            <VoiceControlBar handleDisconnect={handleDisconnect} handleMute={handleMute}></VoiceControlBar>
            {/* <div id="controlsToolbar">
                <div id="mediaControls"> 
                    <button className="btn" onClick={() => setMic(a => !a)}>Mic</button>
                </div>
            </div>
            <button id="endConnection" className='' onClick={() => {
                setActiveConnection(false)
                navigate('/')
            }}> Disconnect 
            </button> */}
        </>
    )
}