import { useEffect, useRef, useState } from "react";
import DashboradHeader from "../../components/ui/dash-borad-header";
import DashboradSidebar from "../../components/ui/dashborad-sidebar";
import VideoPlayer from "../../components/content-viewer/video-player";
import type { ToggleSection } from "../../types/common";
import type Player from "video.js/dist/types/player";

interface VideoItem {
  id: number;
  title: string;
  url: string;
}

const videos: VideoItem[] = [
  {
    id: 1,
    title: "Short 1",
    url: "https://media.istockphoto.com/id/2089020832/video/young-female-university-student-reading-a-book-at-campus.mp4?s=mp4-640x640-is&k=20&c=0uEpKNZCuvj4s7y9fx-TXrBYoakN8RgTcARJlHuipH8=",
  },
  {
    id: 2,
    title: "Short 2",
    url: "https://media.istockphoto.com/id/2216008266/video/spinning-magnets-in-motion.mp4?s=mp4-640x640-is&k=20&c=ZI7tbcxBknUIAobzR0mFT2XbqDVdFW-WVOzJElmI5MM=",
  },
  {
    id: 3,
    title: "Short 3",
    url: "https://media.istockphoto.com/id/2173244346/video/vertical-video-a-patient-undergoes-an-mri-or-ct-scan-as-doctors-review-images-in-a-modern.mp4?s=mp4-640x640-is&k=20&c=Tp1EsiDjsJRpBygP9nx3mP5_JLnetm1jy9DWAd73Kd8=",
  },
];

const EduReel = () => {
  const playerRefs = useRef<(Player | null)[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isScrollingRef = useRef(false);
  const [showTitle, setShowTitle] = useState(true);
  const pendingIndexRef = useRef<number | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt((entry.target as HTMLElement).dataset.index || "0", 10);
          const videoEl = playerRefs.current[index];
          if (!videoEl) return;

          if (entry.isIntersecting && entry.intersectionRatio > 0.8) {
            setCurrentIndex((prev) => (index !== prev ? index : prev));
            if (pendingIndexRef.current === index) {
              pendingIndexRef.current = null;
            }
            videoEl.play()?.catch(() => {});
          } else {
            videoEl.pause();
          }
        });
      },
      { threshold: [0.8] }
    );

    document.querySelectorAll(".short-wrapper").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    const wrappers = document.querySelectorAll(".short-wrapper");
    if (wrappers.length > 0) {
      wrappers[0].scrollIntoView({ behavior: "auto" });
    }

    setShowTitle(true);
    const timeout = setTimeout(() => setShowTitle(false), 2000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const wrappers = document.querySelectorAll(".short-wrapper");

    const scrollToIndex = (index: number) => {
      if (index < 0 || index >= wrappers.length) return;
      pendingIndexRef.current = index;
      wrappers[index].scrollIntoView({ block: "start", inline: "nearest" });
    };

    let lastWheelTime = 0;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") scrollToIndex(currentIndex + 1);
      if (e.key === "ArrowUp") scrollToIndex(currentIndex - 1);
    };

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastWheelTime < 600 || isScrollingRef.current) return;

      isScrollingRef.current = true;
      setShowTitle(true);

      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

      const nextIndex = currentIndex + (e.deltaY > 0 ? 1 : -1);
      scrollToIndex(nextIndex);
      lastWheelTime = now;

      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
        setShowTitle(false);
      }, 2000);
    };

    window.addEventListener("keydown", handleKey);
    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("wheel", handleWheel);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [currentIndex]);

  const [toggle, setToggles] = useState<{ menu: boolean; chat: boolean; filter: boolean; width: boolean }>({
    menu: false,
    chat: false,
    filter: false,
    width: false,
  });

  const toggleFunction = (section: ToggleSection) => {
    setToggles((prev) => ({ ...prev, [section]: !prev[section] }));
    console.log(toggle);
  };

  return (
    <>
      <DashboradHeader toggleFunction={toggleFunction} />
      <div className="main-container">
        <DashboradSidebar />
        <div className="shorts-container content-card d-flex justify-content-center">
          <div style={{ width: "520px", textAlign: "center" }}>
            {videos.map((video, i) => (
              <div className="short-wrapper" data-index={i} key={video.id}>
                <VideoPlayer
                  ref={(el: Player | null) => {
                    playerRefs.current[i] = el;
                  }}
                  video={{
                    id: video.id.toString(),
                    title: video.title,
                    url: video.url,
                    thumbnail: "",
                    duration: "",
                    description: "",
                  }}
                  autoplay={true}
                />
              </div>
            ))}
            <div
              className={`fixed-title ${showTitle ? "" : "hidden"}`}
              style={{
                position: "fixed",
                bottom: "20px",
                left: "20px",
                color: "white",
                fontSize: "18px",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                padding: "6px 12px",
                borderRadius: "6px",
                zIndex: 20,
              }}
            >
              {/* {videos[currentIndex]?.title} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EduReel;
