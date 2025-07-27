import { useCallback, useEffect, useState } from "react";
import { FaCircleInfo } from "react-icons/fa6";
import SelectBoard from "../../components/select-dropdown/board-select";
import SelectClass from "../../components/select-dropdown/select-class";
import type { ChapterDataResponse } from "../../types/chapter-contents";
import { apiProxyRequest } from "../../lib/api-client-proxy";
import { MdMenuOpen } from "react-icons/md";
import DashboradHeader from "../../components/ui/dash-borad-header";
import DashboradSidebar from "../../components/ui/dashborad-sidebar";
import ContentViewClient from "../../components/content-viewer/content-view-client";
import ChatPanel from "../../components/chat-panel";
import { useChatPanelStore } from "../../stores/chatPanelStore";
import { useDashboardStore } from "../../stores/dashboardStore";
import SelectLanguage from "../../components/select-dropdown/language-select";
import type {
  SubjectApiResponse,
  SubjectResponseData,
} from "../../types/class-section";
import ChapterSelector from "../../components/select-dropdown/ChapterSelector";
import { useToggleStore } from "../../stores/toggleStore";
import { Alert } from "../../components/ui/altert";
export default function Dashboard() {


  const [SubjectOptions, setSubjectOptions] = useState<SubjectResponseData[]>();
  const [isContentAvailable, setIsContentAvailable] = useState<boolean>(false);
  const {
    selectedBoard,
    selectedClass,
    selectedLanguage,
    subjectId,
    resourceId,
    setBoard,
    setClass,
    setSubject,
    setSelectedLanguage,
    setChapters,
    setResourceId,
  } = useDashboardStore();


  const { toggle, toggleSection, setToggleState, resetToggles } = useToggleStore();


  const handleClassChange = (id: string | null) => {
    setClass(id);
    setSubject(null);
    setIsContentAvailable(false);
  };

  const handleReset = () => {
    setBoard(null);
    setClass(null);
    setSubject(null);
    setIsContentAvailable(false);
    setResourceId(null);
    resetToggles();
    console.log("Filters reset");

  };
  const [visible, setVisible] = useState(false);

  const getClassesList = async () => {
    if (!selectedLanguage) {
      setVisible(true);
      return
    }
    const payload = { school_id: "23", class_id: selectedClass };
    const result = await apiProxyRequest<SubjectApiResponse, typeof payload>(
      "POST",
      "Content/getSubjects",
      payload
    );
    if (result) {
      setSubjectOptions(result.data);
    }
    setIsContentAvailable(true);
  };

  // Chapter api call

  const getChapterContents = useCallback(async () => {
    setIsContentAvailable(true);
    const payload = {};
    const result = await apiProxyRequest<ChapterDataResponse, typeof payload>(
      "POST",
      "Content/getChapters",
      payload
    );
    if (result) {
      setChapters(result.chapters);
      // setToggleState("width", true);
    }
  }, [setChapters, toggle]);

  useEffect(() => {
    if (selectedBoard && selectedClass && resourceId && subjectId) {
      getChapterContents();
      setIsContentAvailable(true);
    }
  }, [selectedBoard, selectedClass, resourceId, subjectId, getChapterContents]);

  const { open, isOpen } = useChatPanelStore();

  return (
    <>
      <button
        id="chatToggleBtn"
        className="icon-btn me-3"
        onClick={() => {
          open();
        }}
      >
        <img src="/ai-tutor-1.png" className="img-fuild w-100" />
      </button>
      <DashboradHeader toggleFunction={toggleSection} />
      {visible && (
        <Alert
          message="Please Select Language"
          type="danger"
          onClose={() => setVisible(false)}
        />
      )}
      <div className="main-container" id="mainContainer">
        <DashboradSidebar />

        <main
          className={`${isOpen ? "w-75" : "w-100 flex-grow-1"
            } content-area position-relative`}
          id="contentArea"
          style={{ backgroundColor: "#f5f5f5" }}
        >
          <div
            className="filter-container"
            style={toggle.filter ? { marginTop: "0px" } : {}}
            id="filterContainer"
          >
            <div className="container-fluid">
              <form className="filter-form" id="filterForm">
                <div className="filter-item">
                  <SelectBoard value={selectedBoard} onSelectBoard={setBoard} />
                </div>

                <div className="filter-item">
                  <SelectClass
                    value={selectedClass}
                    onSelectClass={handleClassChange}
                  />
                </div>
                {selectedClass && (
                  <div className="col-span-12">
                    <SelectLanguage
                      onSelectLanguage={setSelectedLanguage}
                      selectedLanguage={selectedLanguage}
                    />
                  </div>
                )}
                {selectedClass && (
                  <div className="col-span-12">
                    <button
                      className="demo-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        getClassesList();
                        toggleSection("filter");
                        setIsContentAvailable(false);
                        setResourceId(null);
                        setToggleState("width", false); // ✅ explicitly set 'filter' to true
                      }}
                    >
                      View
                    </button>
                  </div>
                )}
                <div className="ms-auto d-flex">
                  <button
                    type="button"
                    className="reset-btn"
                    id="resetFilterBtn"
                    onClick={handleReset}
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="d-flex gap-3">
            {isContentAvailable && SubjectOptions?.length && (
              <>
                <div
                  className={`${toggle.width
                    ? "chapter-card-inactive"
                    : "chapter-card-active"
                    } chapter-card-active`}
                >
                  <div className="menu-icon d-flex">
                    <MdMenuOpen
                      style={{ cursor: "pointer", fontSize: "24px" }}
                      onClick={() => toggleSection("width")}
                    />
                  </div>
                  <ChapterSelector
                    classId={selectedClass}
                    toggleFunction={toggleSection}
                    onSelectResource={(id) => setResourceId(id)}
                  />
                </div>
              </>
            )}

            <div
              className={`${toggle.filter ? "content-card-filtered-height" : ""
                } content-card text-center flex-grow-1 d-flex  justify-content-center`}
            >
              {!isContentAvailable && !toggle.filter && (
                <div>
                  <img
                    src="/book-1.png"
                    alt="book icons"
                    style={{
                      width: "150px",
                      paddingTop: "150px",
                      marginBottom: "20px",
                    }}
                  />
                  <h2 style={{ fontWeight: 600, fontSize: "24px" }}>
                    Select Your Learning Path
                  </h2>
                  <p>
                    Choose your board, class, subject, and book to start
                    learning with our AI tutor.
                  </p>
                  <div
                    style={{
                      backgroundColor: "#D0F0F9",
                      border: "1px solid #b3e5fc",
                      borderRadius: "8px",
                      padding: "10px",
                      display: "inline-block",
                      marginTop: "10px",
                      marginBottom: "15px",
                    }}
                  >
                    <FaCircleInfo
                      style={{ color: "#01579b", marginRight: "8px" }}
                    />
                    For demonstration, try selecting{" "}
                    <strong>
                      CBSE &gt; Class X &gt; Science &gt; Language
                    </strong>
                  </div>
                  <div className="mt-2">
                    <button
                      className="demo-btn"
                      onClick={() => toggleSection("filter")}
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              )}

              {(isContentAvailable || toggle.filter) && (
                <div className="select-resource dashboard">
                  {resourceId ? (
                    <ContentViewClient resourceId={resourceId} />
                  ) : (
                    <>Select a resource from a chapter to view it here.</>
                  )}
                </div>
              )}
            </div>
          </div>
        </main>
        <ChatPanel />
      </div>
    </>
  );
}
