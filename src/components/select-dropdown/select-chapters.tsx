import { useState } from "react";
import type {
  Chapter,
  ChapterContent,
  ChapterDataResponse,
} from "../../types/chapter-contents";
import { apiProxyRequest } from "../../lib/api-client-proxy";
import { IoChevronBackCircle, IoChevronDown } from "react-icons/io5";
import { FaDownload, FaPlay, FaYoutube } from "react-icons/fa";
import { BsFiletypeHtml } from "react-icons/bs";
import { MdOutlineMenuBook, MdQuiz } from "react-icons/md";
import type { ToggleSection } from "../../types/common";

interface Props {
  onSelectResource: (resourceId: string | null) => void;
  chapters: Chapter[];
  toggleFunction: (section: ToggleSection) => void;
  onBackToSubject: () => void; // <-- new
}

const SelectChapter = ({
  onSelectResource,
  chapters,
  toggleFunction,
  onBackToSubject,
}: Props) => {
  const [content, setContent] = useState<ChapterContent | null>(null);
  const [isChapterSelected, setIsChapterSelected] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const activeDropdown = (event: React.MouseEvent<HTMLSpanElement>) => {
    const target = event.target as HTMLElement;
    const parent = target.closest(".lesson-tabbar-content");
    if (parent) {
      parent.classList.toggle("show");
    }
  };

  const handleChapterClick = async (item: Chapter) => {
    setSelectedChapter(item);
    setChapterSelection(true);

    try {
      const result = await apiProxyRequest<
        ChapterDataResponse,
        { chapter_id: string }
      >("POST", "Content/getChapters", { chapter_id: item.id });
      setContent(result?.chapters[1]?.content || null);
    } catch (err) {
      console.error("Failed to fetch chapter content", err);
      setContent(null);
    }
  };

  const openChatperContent = (id: string | null) => {
    onSelectResource(id || null);
    setChapterSelection(true);
  };
  const setChapterSelection = (isSelected: boolean) => {
    setIsChapterSelected(isSelected);
  };

  if (!chapters.length) return <p>No chapters loaded yet.</p>;
  return (
    <div className="d-flex justify-content-between">
      <div
        className={`${isChapterSelected ? "animation" : "animation-back"
          } chapter`}
      >
        <div className="d-flex mb-2 border-bottom pb-2">
          <span onClick={onBackToSubject}>
            <IoChevronBackCircle className="back-btn-chapter" />
          </span>
          <h2 className="select-chapter border-0 mb-0 pb-0 d-flex align-items-center">Select a Chapter</h2>
        </div>
        <ul className="mt-3 ms-0">
          {chapters.map((item) => (
            <li
              key={item.id}
              className="mb-2 chapter-list"
              onClick={() => {
                handleChapterClick(item);
                setChapterSelection(true);
              }}
            >
              <div className="d-flex">
                <div className="me-2">
                  {
                    item.image ? (
                      <img src={item.image} alt="" />
                    ) : (
                      <img src="/ongoing-2.webp" alt="" />
                    )
                  }

                </div>
                <div>
                  <span className="d-block title">{item.title}</span>
                  <span className="info">{item.info}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div
        className={`${isChapterSelected ? "animation-back" : "animation"
          } chapter-content`}
      >
        <div>
          <div className="sticky">
            <div className="d-flex mb-2 border-bottom pb-2">
              <span onClick={() => setChapterSelection(false)}>
                <IoChevronBackCircle className="back-btn-chapter" />{" "}
              </span>
              <h2 className="select-chapter m-0 p-0 border-0 d-flex align-items-center">
                Chapter Details
              </h2>
            </div>
            {selectedChapter && (
              <div className="selected-chapter">
                <div>
                  {selectedChapter.image ? (
                    <img src={selectedChapter.image} alt="" />
                  ) : (
                    <img src="/ongoing-2.webp" alt="" />
                  )
                  }
                </div>
                <div>
                  <h4 className="chapter-title">{selectedChapter.title}</h4>
                  <p className="chapter-info m-0">{selectedChapter.info}</p>
                </div>
              </div>
            )}
          </div>
          {content &&
            Object.entries(content.resources).map(([type, items], index) => {
              return (
                <div className="lesson-tabbar-content py-0" key={type}>
                  <div style={{ padding: "14px 0" }}
                    className="lesson-tabbar-title"
                    onClick={($event) => activeDropdown($event)}
                  >
                    <span className="tab-lesson1">
                      {index + 1} - {type}
                    </span>
                    <span className="tab-lesson2">
                      <IoChevronDown />
                    </span>
                  </div>
                  {items &&
                    items.length > 0 &&
                    items.map((item, index) => {
                      return (
                        <div
                          className="tabbar-bottom"
                          key={index}
                          onClick={() => {
                            openChatperContent(item.id);
                            toggleFunction("width");
                          }}
                        >
                          <div className="play-btn-txt">{item.name}</div>
                          {item.contentType === "youtube-video" && (
                            <div className="play-btn-icon">
                              <FaYoutube
                                style={{ color: "#f03", fontSize: "20px" }}
                              />
                            </div>
                          )}
                          {item.contentType === "html" && (
                            <div className="play-btn-icon">
                              <BsFiletypeHtml
                                style={{ color: "#f97007", fontSize: "20px" }}
                              />
                            </div>
                          )}
                          {item.contentType === "web-link" && (
                            <div className="play-btn-icon">
                              <FaDownload
                                style={{ color: "#f97007", fontSize: "16px" }}
                              />
                            </div>
                          )}
                          {item.contentType === "video" && (
                            <div className="play-btn-icon">
                              <FaPlay
                                style={{ color: "#f97007", fontSize: "16px" }}
                              />
                            </div>
                          )}
                          {item.contentType === "interactive" &&
                            (item.name === "AI Quiz" ||
                              item.name === "AI Quiz - Hindi") && (
                              <div className="play-btn-icon">
                                <MdQuiz
                                  style={{ color: "#f97007", fontSize: "16px" }}
                                />
                              </div>
                            )}
                          {item.contentType === "interactive" &&
                            (item.name === "Flash Cards" ||
                              item.name === "Flash Cards - Hindi") && (
                              <div className="play-btn-icon">
                                <MdOutlineMenuBook
                                  style={{ color: "#f97007", fontSize: "16px" }}
                                />
                              </div>
                            )}
                        </div>
                      );
                    })}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default SelectChapter;
