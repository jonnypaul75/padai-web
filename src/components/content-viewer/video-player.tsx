import { useEffect, useRef, useMemo, forwardRef, useImperativeHandle } from 'react';
import videojs from 'video.js';
import type Player from 'video.js/dist/types/player';
import 'video.js/dist/video-js.min.css';
import type { VideoPlayerProps } from '../../types/media';
import { getVideoMimeType } from '../../types/media-types';

const VideoPlayer = forwardRef<Player | null, VideoPlayerProps>(({ video, autoplay = false }, ref) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<Player | null>(null);

  const isAudio = useMemo(() => {
    if (video.contentType === 'audio') {
      return true;
    }
    return false;
  }, [video.contentType]);

  const options = useMemo(() => ({
    controls: true,
    autoplay,
    muted: autoplay, // <-- Muted when autoplaying to bypass restriction
    preload: 'auto',
    poster: isAudio ? video.thumbnail : undefined,
  }), [autoplay, isAudio, video.thumbnail]);

  useEffect(() => {
    if (videoRef.current && !playerRef.current) {
      playerRef.current = videojs(videoRef.current, options);
    }

    // Cleanup on unmount

  }, [options]);

  useEffect(() => {
    if (playerRef.current && video) {
      const type = getVideoMimeType(video.url);
      playerRef.current.src({
        src: video.url,
        type: type,
      });
    }
  }, [video.url]);

  useImperativeHandle(ref, () => playerRef.current!);

  return (
    <div className={`mx-auto border ${!isAudio ? 'its-video' : ''}`} style={{height:'90%',width:'100%'}}>
      <div data-vjs-player className="h-100">
        <div className="w-full mx-auto h-100">
          <video
            ref={videoRef}
            className="video-js vjs-default-skin"
            playsInline
            poster={video.thumbnail} // fallback poster

          />
        </div>
      </div>
    </div>
  );
});
export default VideoPlayer;
