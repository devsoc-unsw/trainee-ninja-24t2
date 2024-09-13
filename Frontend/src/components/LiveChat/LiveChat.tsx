import { useJoin, useLocalMicrophoneTrack, usePublish, useRemoteAudioTracks, useRemoteUsers } from "agora-rtc-react";
import { useEffect, useState } from "react";
import Spline from '@splinetool/react-spline';
import { useNavigate, useParams } from "react-router-dom";
import { VoiceControlBar } from "../VoiceControlBar/VoiceControlBar";
import { Application } from '@splinetool/runtime';
import { socket } from "../../socket";

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
    const [numUserConnected, setNumUserConnected] = useState(1);
    const [activeConnection, setActiveConnection] = useState(true);
    const [micOn, setMic] = useState(true);

    // Spline 3D scene states/constants
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
        setMic(!micOn);
    }

   
    // Hook provided by Agora, utilize the user's microphone
    const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
    localMicrophoneTrack?.setMuted(micOn);

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
    }

    // Handle spline scene on click
    function onSplineMouseDown(e: any) {
        console.log("SPLINE CLICK", e);
      }

    // Spawn new user's avatar in the 3D scene
    function spawnAvatar() {
        if (typeof spline != "undefined") {
            const avatarObj = spline.findObjectById(objectAvatarId);
            if (typeof avatarObj != "undefined") {
                avatarObj.position.y = -80;
            }
        }
    }

    // Destroy new user's avatar in the 3D scene
    function destroyAvatar() {
        if (typeof spline != "undefined") {
            const avatarObj = spline.findObjectById(objectAvatarId);
            if (typeof avatarObj != "undefined") {
                avatarObj.position.y = -500;
            }
        }
    }
    // Handle socket connection when another user joins the room
    function onUserJoin(userNum: number) {
        setNumUserConnected(userNum);
        if (userNum > 1) {
            spawnAvatar();
        }
    }

    // Handle socket connection when another user leaves the room
    function onUserLeave(userNum: number) {
        setNumUserConnected(userNum);
        console.log('user disconnect', userNum);
        if (userNum <= 1) {
            destroyAvatar();
        }
    }

    // Update spline element when mounting
    useEffect(() => {
        if (numUserConnected > 1) {
            spawnAvatar();
        }
    }, [spline]);
    

    socket.on('userJoin', onUserJoin);
    socket.on('userLeave', onUserLeave);

    return (
        <>
            <div id="scene-container">
                <Spline scene="https://prod.spline.design/ibs1fvgsottbt1db/scene.splinecode" onLoad={onLoad} onSplineMouseDown={onSplineMouseDown}/>
                <div id="voice-container">
                    <VoiceControlBar micOn={micOn} handleDisconnect={handleDisconnect} handleMute={handleMute}></VoiceControlBar>
                </div>
            </div>
        </>
    )
}