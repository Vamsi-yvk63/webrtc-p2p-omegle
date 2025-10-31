import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Room } from "./Room";

export const Landing = () => {
  const [name, setName] = useState("");
  const [localAudioTrack, setLocalAudioTrack] =
    useState<MediaStreamTrack | null>(null);
  const [localVideoTrack, setlocalVideoTrack] =
    useState<MediaStreamTrack | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [joined, setJoined] = useState(false);

  const getCam = async () => {
    const stream = await window.navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    // MediaStream
    const audioTrack = stream.getAudioTracks()[0];
    const videoTrack = stream.getVideoTracks()[0];
    setLocalAudioTrack(audioTrack);
    setlocalVideoTrack(videoTrack);
    if (!videoRef.current) {
      return;
    }
    videoRef.current.srcObject = new MediaStream([videoTrack]);
    videoRef.current.play();
    // MediaStream
  };

  useEffect(() => {
    if (videoRef && videoRef.current) {
      getCam();
    }
  }, [videoRef]);

  if (!joined) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6">
        <div className="bg-gray-800/60 backdrop-blur-md rounded-3xl shadow-2xl p-8 w-full max-w-md flex flex-col items-center space-y-6 border border-gray-700/40">
          <h1 className="text-3xl font-semibold tracking-tight text-indigo-400">
            🎥 Join the Room
          </h1>

          {/* Video Preview */}
          <div className="relative rounded-2xl overflow-hidden border border-gray-600/40 shadow-lg">
            <video
              autoPlay
              ref={videoRef}
              className="rounded-2xl w-[360px] h-[270px] object-cover"
              playsInline
            />
            <div className="absolute bottom-0 w-full bg-black/50 text-sm text-center py-1 text-gray-300">
              Preview
            </div>
          </div>

          {/* Name Input */}
          <input
            type="text"
            placeholder="Enter your name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-gray-900/60 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-500 text-center"
          />

          {/* Join Button */}
          <button
            onClick={() => setJoined(true)}
            disabled={!name.trim()}
            className={`w-full py-3 rounded-xl font-semibold text-lg transition-all duration-300 ${name.trim()
              ? "bg-indigo-600 hover:bg-indigo-500 shadow-lg hover:shadow-indigo-500/40"
              : "bg-gray-700 cursor-not-allowed text-gray-400"
              }`}
          >
            Join Room 🚀
          </button>
        </div>

        <p className="text-gray-400 mt-6 text-sm tracking-wide">
          Secure peer-to-peer connection powered by <span className="text-indigo-400 font-medium">WebRTC</span>
        </p>
      </div>
    );
  }

  return (
    <Room
      name={name}
      localAudioTrack={localAudioTrack}
      localVideoTrack={localVideoTrack}
    />
  )
}