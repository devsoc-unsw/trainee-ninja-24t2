// import AgoraRTC, { IAgoraRTCClient } from "agora-rtc-sdk-ng";
// import { AudioTracks } from "./interfaces";

// // TODO: HIDE WITH ENVIRONMENT VARIABLE
// const appId = "7176ccafd79b4363bf7dcea529c747ff";
// const token = null;

// // generate uid for users
// const rtcUid = Math.floor(Math.random() * 2032);

// let roomId = "main";
// let audioTracks: AudioTracks = {
//     localAudioTrack: null,
//     remoteAudioTracks: {}
// }

// let rtcClient: IAgoraRTCClient;


// // add user element (avatar) to dom
// // const createUserWrapper = (rtcUid: number) => {
// //   let userWrapper = `<div class="speaker user-${rtcUid}" id="${rtcUid}">
// //                       <p>${rtcUid}</p> 
// //                     </div>`
    
// //   document.getElementById("members").insertAdjacentHTML('beforeend', userWrapper);
// // }

// // create agora client
// const initRtc = async () => {
//     rtcClient = AgoraRTC.createClient({mode: 'rtc', codec:'vp8'});
//     rtcClient.on('user-joined', handleUserJoined);
//     rtcClient.on('user-published', handleUserPublished);
//     rtcClient.on('user-left', handleUserLeft);

//     // let client join a channel
//     await rtcClient.join(appId, roomId, token, rtcUid);

//     // request microphone access
//     audioTracks.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
//     rtcClient.publish(audioTracks.localAudioTrack);

//     // createUserWrapper(rtcUid);
// }

// // handle user joining a channel, adds user uid to dom
// const handleUserJoined = async (user: any) => {
//   console.log("new user joined", user);
//   // createUserWrapper(user.uid);
// }

// // handle user audio
// const handleUserPublished = async (user: any, mediaType: any) => {
//   await rtcClient.subscribe(user, mediaType)

//   if (mediaType === 'audio') {
//     audioTracks.remoteAudioTracks[user.uid] = [user.audioTrack];
//     user.audioTrack.play();
//   }
// }

// const handleUserLeft = async (user: any) => {
//   delete audioTracks.remoteAudioTracks[user.uid];
//   // document.getElementById(user.uid).remove();
// }

// // room join form element
// // let lobbyForm = document.getElementById("form");

// export const enterRoom = async (e) => {
//     e.preventDefault();

//     // let use join a room
//     initRtc();

//     // once form is submitted, remove its visibility
//     // lobbyForm.style.display = 'none';

//     // toggle mute/unmute buttons to be visible
//     // document.getElementById('room-header').style.display = "flex";
// }


// // Stop audio track and disconnect client from room
// export const leaveRoom = async () => {
//   if (audioTracks.localAudioTrack !== null) {
//     audioTracks.localAudioTrack.stop();
//     audioTracks.localAudioTrack.close();
//   }

//   rtcClient.unpublish();
//   rtcClient.leave();

//   // re-add join room form element
//   // document.getElementById('form').style.display = 'block'; 
//   // document.getElementById('room-header').style.display = 'none';
//   // document.getElementById('members').innerHTML = '';
// }

// // on form submit, join room
// // lobbyForm.addEventListener('submit', enterRoom);

// // on leave button click, disconnect from room
// // document.getElementById('leave-icon').addEventListener('click', leaveRoom);
