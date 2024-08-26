import AgoraRTC, { IMicrophoneAudioTrack } from "agora-rtc-sdk-ng";

export interface AudioTracks {
    localAudioTrack: IMicrophoneAudioTrack | null,
    remoteAudioTracks: {
        [key: number]: any
    }
}