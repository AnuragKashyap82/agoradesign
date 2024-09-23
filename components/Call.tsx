"use client";
import AgoraRTC, {
  AgoraRTCProvider,
  LocalVideoTrack,
  RemoteUser,
  useJoin,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  usePublish,
  useRTCClient,
  useRemoteAudioTracks,
  useRemoteUsers,
} from "agora-rtc-react";
import { useState, useEffect } from "react";

function Call({ channelN, tokennn }: any) {
  console.log("channelName in call:", channelN);
  console.log("token in call:", tokennn);

  if (!tokennn) {
    console.error("Token is null or undefined");
    return (
      <div className="flex flex-col items-center pt-40">
        Token is missing. Cannot join the call.
      </div>
    );
  }

  const client = useRTCClient(
    AgoraRTC.createClient({ codec: "vp8", mode: "rtc" })
  );

  return (
    <AgoraRTCProvider client={client}>
      <Videos channelNameee={channelN} tokennnn={tokennn} />
    </AgoraRTCProvider>
  );
}

function Videos({ channelNameee, tokennnn }: any) {
  const { isLoading: isLoadingMic, localMicrophoneTrack, error: micError } = useLocalMicrophoneTrack();
  const { isLoading: isLoadingCam, localCameraTrack, error: camError } = useLocalCameraTrack();
  const remoteUsers = useRemoteUsers();
  const { audioTracks } = useRemoteAudioTracks(remoteUsers);
  const appId = "2b0bdd0de9f14d84bcff8fb037e452c3";

  const [micEnabled, setMicEnabled] = useState(true);
  const [camEnabled, setCamEnabled] = useState(true);

  useEffect(() => {
    if (localCameraTrack && !isLoadingCam) {
      console.log("Playing local camera track...");
      localCameraTrack.play("local-video");
    } else if (isLoadingCam) {
      console.log("Camera track is still loading...");
    } else {
      console.log("Local camera track is not available.");
    }
  }, [localCameraTrack, isLoadingCam]);

  useEffect(() => {
    if (camError) {
      console.error("Error loading camera track:", camError);
    }
    if (micError) {
      console.error("Error loading microphone track:", micError);
    }
  }, [camError, micError]);

  if (!tokennnn || !appId || !channelNameee) {
    return (
      <div className="flex flex-col items-center pt-40">
        Token is missing. Cannot join the call.
      </div>
    );
  }

  const decodedToken = decodeURIComponent(tokennnn);
  const { error: joinError } = useJoin({
    appid: appId,
    channel: channelNameee,
    token: decodedToken,
  });

  usePublish([localMicrophoneTrack, localCameraTrack]);

  if (joinError) {
    return (
      <div className="flex flex-col items-center pt-40">
        Failed to join the channel: {joinError.message}
      </div>
    );
  }

  if (isLoadingMic || isLoadingCam) {
    return (
      <div className="flex flex-col items-center pt-40">
        Loading devices....
      </div>
    );
  }

  audioTracks.forEach((track) => track.play());

  // Function to toggle mic
  const toggleMic = () => {
    if (localMicrophoneTrack) {
      if (micEnabled) {
        localMicrophoneTrack.setEnabled(false);
        setMicEnabled(false);
      } else {
        localMicrophoneTrack.setEnabled(true);
        setMicEnabled(true);
      }
    }
  };

  // Function to toggle camera
  const toggleCamera = () => {
    if (localCameraTrack) {
      if (camEnabled) {
        localCameraTrack.setEnabled(false);
        setCamEnabled(false);
      } else {
        localCameraTrack.setEnabled(true);
        setCamEnabled(true);
      }
    }
  };

  const unit = "minmax(0, 1fr) ";

  return (
    <div className="flex flex-col justify-between w-full h-screen">
      <div
        className=" gap-1 flex-1"
        style={{
          gridTemplateColumns:
            remoteUsers.length > 9
              ? unit.repeat(4)
              : remoteUsers.length > 4
              ? unit.repeat(3)
              : remoteUsers.length > 1
              ? unit.repeat(2)
              : unit.repeat(2),
        }}
      >
        {/* Local video */}
        <div id="local-video" className="w-full h-full bg-black"></div>
        {/* Remote users' video */}
        {remoteUsers.map((user) => (
          <RemoteUser className="on-mob-50" user={user} key={user.uid} />
        ))}
      </div>

      {/* Control Buttons */}
      <div className="fixed z-10 bottom-0 left-0 right-0 flex justify-center space-x-4 pb-4">
        {/* End Call Button */}
        <a
          className="end-call-btn px-5 py-3 text-base font-medium text-center text-white bg-red-400 rounded-lg hover:bg-red-500 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 w-40"
          href="/"
        >
          
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="25" height="25" fill="red"><path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/></svg>
        </a>

        {/* Toggle Audio Button */}
        <button className="mute-unmute-btn"  onClick={toggleMic} >
        {micEnabled ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 384 512" fill="#000">
<path d="M96 96l0 160c0 53 43 96 96 96s96-43 96-96l-80 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l80 0 0-32-80 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l80 0 0-32-80 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l80 0c0-53-43-96-96-96S96 43 96 96zM320 240l0 16c0 70.7-57.3 128-128 128s-128-57.3-128-128l0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40c0 89.1 66.2 162.7 152 174.4l0 33.6-48 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l72 0 72 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-48 0 0-33.6c85.8-11.7 152-85.3 152-174.4l0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 24z"/>
</svg> : 
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"  width="25" height="25" fill="red" ><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L472.1 344.7c15.2-26 23.9-56.3 23.9-88.7l0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 24 0 16c0 21.2-5.1 41.1-14.2 58.7L416 300.8l0-44.8-57.1 0-34.5-27c2.9-3.1 7-5 11.6-5l80 0 0-32-80 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l80 0 0-32-80 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l80 0c0-53-43-96-96-96s-96 43-96 96l0 54.3L38.8 5.1zm362.5 407l-43.1-33.9C346.1 382 333.3 384 320 384c-70.7 0-128-57.3-128-128l0-8.7L144.7 210c-.5 1.9-.7 3.9-.7 6l0 40c0 89.1 66.2 162.7 152 174.4l0 33.6-48 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l72 0 72 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-48 0 0-33.6c20.4-2.8 39.7-9.1 57.3-18.2z"/></svg>}

        </button>

        {/* Toggle Video Button */}

        <button className="video-unmute-btn"   onClick={toggleCamera} >
        {camEnabled ? 
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"  width="25" height="25" fill="#ooo"  ><path d="M0 128C0 92.7 28.7 64 64 64l256 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64L64 448c-35.3 0-64-28.7-64-64L0 128zM559.1 99.8c10.4 5.6 16.9 16.4 16.9 28.2l0 256c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64L416 337.1l0-17.1 0-128 0-17.1 14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z"/></svg> : 

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"  width="27" height="27" fill="red"  ><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7l-86.4-67.7 13.8 9.2c9.8 6.5 22.4 7.2 32.9 1.6s16.9-16.4 16.9-28.2l0-256c0-11.8-6.5-22.6-16.9-28.2s-23-5-32.9 1.6l-96 64L448 174.9l0 17.1 0 128 0 5.8-32-25.1L416 128c0-35.3-28.7-64-64-64L113.9 64 38.8 5.1zM407 416.7L32.3 121.5c-.2 2.1-.3 4.3-.3 6.5l0 256c0 35.3 28.7 64 64 64l256 0c23.4 0 43.9-12.6 55-31.3z"/></svg>}

        </button>

      </div>
    </div>
  );
}

export default Call;
