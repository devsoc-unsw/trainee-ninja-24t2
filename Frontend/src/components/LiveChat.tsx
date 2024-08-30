import { useJoin, useLocalMicrophoneTrack, usePublish, useRemoteAudioTracks, useRemoteUsers } from "agora-rtc-react";
import { useState } from "react";
import Spline from '@splinetool/react-spline';
import { useNavigate, useParams } from "react-router-dom";
import { VoiceControlBar } from "./VoiceControlBar";
import { Application } from '@splinetool/runtime';
import { socket } from "../socket";

import './LiveChat.css'

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
    const [userConnected, setUserConnected] = useState(false);
    const [activeConnection, setActiveConnection] = useState(true);
    const [micOn, setMic] = useState(true);

    // Spline 3D scene constants
    const [spline, setSpline] = useState<Application>();
    const objectAvatarId = "92E09126-2A37-482C-B188-3F73E1B9DFAE";


    // Function handlers to be passed as props to child component
    const handleDisconnect = () => {
        // Disconnect from Agora and backend socket
        socket.disconnect();
        setActiveConnection(false);
        navigate('/');
    }

    const handleMute = () => {
        setMic((a => !a))
    }

   
    // Hook provided by Agora, utilize the user's microphone
    const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);

    /**
     * Publish user's microphone stream to room
     * Second element is null since we are not streaming video
    */
    usePublish([localMicrophoneTrack, null])
   

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

   
    // Get all remote users's audio tracks and play them
    const remoteUsers = useRemoteUsers();
    const { audioTracks } = useRemoteAudioTracks(remoteUsers);

    audioTracks.forEach((audioTrack) => {
        audioTrack.play();
    })

    // Load spline scene from Spline component
    function onLoad(spline: Application) {
        setSpline(spline);
        // const avatarObj = spline.findObjectById(objectAvatarId);
        // if (typeof avatarObj != "undefined") {
        //     avatarObj.position.x += 10;
        // }
    }

    function splineOnClick() {
        console.log("SPLINE DEBUG CLICKED");
        if (typeof spline != "undefined") {
            const avatarObj = spline.findObjectByName("computer-2");

            if (typeof avatarObj != "undefined") {
                console.log("SPLINE DEBUG MOVED", spline.getAllObjects());
                avatarObj.position.y += 100;
            }
        }
    }

    function onUserJoin() {
        setUserConnected((a => !a));
        splineOnClick();
        console.log("New User Joined the room", userConnected);
    }

    socket.on('userJoin', onUserJoin);

    return (
        <>
            <div id="scene-container">
                <Spline scene="https://prod.spline.design/QtFOx3krmOa1IFbv/scene.splinecode" onLoad={onLoad}/>
                <div id="voice-container">
                    <VoiceControlBar micOn={micOn} handleDisconnect={handleDisconnect} handleMute={handleMute}></VoiceControlBar>
                </div>
                <button type="button" onClick={splineOnClick}>TEST MOVE</button>
            </div>
        </>
    )
}