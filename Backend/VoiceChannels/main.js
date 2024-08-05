import AgoraRTC from "agora-rtc-sdk-ng";

// TODO: HIDE WITH ENVIRONMENT VARIABLE
const appId = "7176ccafd79b4363bf7dcea529c747ff";
const token = null;

// generate uid for users
const rtcUid = Math.floor(Math.random() * 2032);

let roomId = "main";
let audioTracks = {
    localAudioTrack: null,
    remoteAudioTracks: {}
}

let rtcClient;

// greate agora client
let initRtc = async () => {
    rtcClient = AgoraRTC.createClient({mode: 'rtc', codec:'vp8'});

    // let client join a channel
    await rtcClient.join(appId, roomId, token, rtcUid);

    // ask for microphone access
    audioTracks.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    rtcClient.publish(audioTracks.localAudioTrack);

    let userWrapper = `<div class="speaker user-${rtcUid}" id="${rtcUid}">
                        <p>${rtcUid}</p> 
                      </div>`
    
    document.getElementById("members").insertAdjacentHTML('beforeend', userWrapper);
}

// room join form element
let lobbyForm = document.getElementById("form");

const enterRoom = async (e) => {
    e.preventDefault();

    // let use join a room
    initRtc();

    // once form is submitted, remove its visibility
    lobbyForm.style.display = 'none';

    // toggle mute/unmute buttons to be visible
    document.getElementById('room-header').style.display = "flex";
}

// on form submit, join room
lobbyForm.addEventListener('submit', enterRoom)

