import { useState, useRef } from "react";
import "video.js/dist/video-js.css";
import DashboradSidebar from "../../components/ui/dashborad-sidebar";
import DashboradHeader from "../../components/ui/dash-borad-header";
import { MdMenuOpen } from "react-icons/md";
import VideoPlayer from "../../components/content-viewer/video-player";
import HtmlViewer from "../../components/content-viewer/html-viewer";
import ChatPanel from "../../components/chat-panel";
import { useChatPanelStore } from "../../stores/chatPanelStore";
import { useToggleStore } from "../../stores/toggleStore";

type VideoItem = {
  id: number;
  title: string;
  url: string;
  thumbnail: string;
  duration: string;
  descriptionFile: string;
  review: string;
  about: string;
  contentType: "video" | "audio";
};

const videos: VideoItem[] = [
  {
    id: 1,
    title: "The Three Little Pigs",
    url: "https://d3d5quqi9gvuwy.cloudfront.net/Children+Classics/The+Three+Little+Pigs/Marathi/Three+Little+Pigs+-+Marathi_Playlist.m3u8",
    thumbnail:
      "https://d3d5quqi9gvuwy.cloudfront.net/Children+Classics/The+Three+Little+Pigs/English/The+Three+Little+Pigs+Landscape.webp",
    duration: "07:12",
    descriptionFile:
      "https://d1rb72t9cnnyis.cloudfront.net/CBSE/X/Science/CH12/Chapter-Summary.html",
    review: "Review for video 1.",
    about: "Uploaded by Trainer 1.",
    contentType: "audio",
  },
  {
    id: 2,
    title: "Magnetic Effects Of Electric Current English",
    url: "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.mp4/.m3u8",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    duration: "11:05",
    descriptionFile:
      "https://d1rb72t9cnnyis.cloudfront.net/CBSE/X/Science/CH12/Chapter-Summary.html",
    review: "Review for video 2.",
    about: "Uploaded by Trainer 2.",
    contentType: "video",
  },
];

export default function Media() {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  // const [descriptionHtml, setDescriptionHtml] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [activeTab, setActiveTab] = useState<
    "description" | "review" | "about"
  >("description");
  const { open, isOpen } = useChatPanelStore();


  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const scrollPositionRef = useRef<number>(0);

  const filteredVideos = videos.filter((v) =>
    v.title.toLowerCase().includes(search.toLowerCase())
  );
  const { toggle, toggleSection, setToggleState } = useToggleStore();
  const handleVideoClick = (video: VideoItem) => {
    scrollPositionRef.current = scrollContainerRef.current?.scrollTop || 0;
    setSelectedVideo(video);
    setActiveTab("description");
    setToggleState("width", true); // ✅ correctly sets `width` toggle to true
    console.log(activeTab)
  };

  // const handleBack = () => {
  //     setSelectedVideo(null);
  //     setTimeout(() => {
  //         if (scrollContainerRef.current) {
  //             scrollContainerRef.current.scrollTop = scrollPositionRef.current;
  //         }
  //     }, 0);
  // };



  return (
    <>
      <button id="chatToggleBtn" className="icon-btn me-3" onClick={() => {
        open();
      }}>
        <img src="/ai-tutor-1.png" className="img-fuild w-100" />
      </button>
      <DashboradHeader toggleFunction={toggleSection} />
      <div className="main-container">
        {/* Header */}

        <DashboradSidebar />
        <div
          className={`${toggle.width ? "chapter-card-inactive" : "chapter-card-active"
            } chapter-card-active`}
        >
          <div>
            <div className="menu-icon d-flex">
              <MdMenuOpen
                style={{ cursor: "pointer", fontSize: "24px" }}
                onClick={() => toggleSection("width")}
              />
            </div>
            <h2 className="select-chapter">Video List</h2>
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                padding: 8,
                marginTop: 8,
                fontSize: "1rem",
                border: "1px solid #ccc",
                borderRadius: 6,
                marginBottom: 12,
              }}
            />
          </div>
          {/* List View */}
          <div
            ref={scrollContainerRef}
            style={{
              flexGrow: 1,
              overflowY: "auto",
            }}
          >
            {filteredVideos.map((video) => (
              <div
                className="chapter-list"
                key={video.id}
                onClick={() => handleVideoClick(video)}
              >
                <div className="d-flex">
                  <img
                    className="me-2"
                    src={video.thumbnail}
                    alt={video.title}
                    style={{
                      width: 100,
                      height: 60,
                      minWidth: 100,
                      objectFit: "cover",
                      borderRadius: 4,
                    }}
                  />
                  <div>
                    <span className="d-block title">{video.title}</span>
                    <span className="info">⏱ {video.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Video View */}
<div
  className={`${isOpen ? "w-75" : "w-100 flex-grow-1"} content-area position-relative`}
  id="contentArea"
  style={{ backgroundColor: "#f5f5f5" }}
>
  <div className="content-card p-0">
    {selectedVideo && (
      <div style={{ display: "flex", flexDirection: "row", gap: "12px", padding: "12px" }}>
        {/* Left Panel - Video */}
        <div
          style={{
            flex: "1 1 50%",
            maxWidth: "50%",
            background: "#fcfcfc",
            paddingRight: "6px",
          }}
        >
          <div
            style={{
              position: "sticky",
              top: 0,
              zIndex: 10,
              background: "#fcfcfc",
              paddingBottom: "12px",
            }}
          >
            <VideoPlayer
              video={{
                id: selectedVideo.id.toString(),
                title:
                  selectedVideo.title.length > 10
                    ? selectedVideo.title.slice(0, 10) + "..."
                    : selectedVideo.title,
                url: selectedVideo.url || "",
                thumbnail: selectedVideo.thumbnail || "",
                duration: selectedVideo.duration || "",
                description: selectedVideo.descriptionFile || "",
              }}
            />
          </div>
        </div>

        {/* Right Panel - HTML Viewer */}
        <div
          style={{
            flex: "1 1 50%",
            maxWidth: "50%",
            minHeight:'80vh',
            overflowY: "auto",
            background: "#fcfcfc",
            paddingLeft: "6px",
          }}
        >
          <div className="html-wrapper">
            <HtmlViewer url={selectedVideo.descriptionFile || ""} />
          </div>
        </div>
      </div>
    )}
  </div>
</div>

       

      </div>
      <ChatPanel />
    </>
  );
}
