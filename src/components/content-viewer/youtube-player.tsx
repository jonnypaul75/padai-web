import { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import type Player from "video.js/dist/types/player";
import "video.js/dist/video-js.css";
import "videojs-youtube"; // 🔥 This is important!
import type { Video } from "../../types/media";
import Loader from "../ui/loader";

interface YouTubePlayerProps {
  video: Video;
}

const YouTubePlayer = ({ video }: YouTubePlayerProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<Player | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (videoRef.current && !playerRef.current) {
      playerRef.current = videojs(videoRef.current, {
        techOrder: ["youtube"],
        controls: true,
        fluid: true,
        preload: "auto",
        sources: [
          {
            src: video.url,
            type: "video/youtube",
          },
        ],
        youtube: {
          modestbranding: 1,
          rel: 0,
        },
      });

      playerRef.current.ready(() => {
        console.log("YouTube player is ready");
      });
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [video.url]);

  return (
    <>
      {loading && <Loader visible={true} />}
      <div className="h-50 w-75 mx-auto border">
        <div data-vjs-player className="h-100">
          <video
            controls
            ref={videoRef}
            className="video-js vjs-default-skin"
            playsInline
          />
        </div>
      </div>
    </>
  );
};

export default YouTubePlayer;
