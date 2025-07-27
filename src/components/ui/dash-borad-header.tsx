import { MdMenuOpen } from "react-icons/md";
import type { ToggleSection } from "../../types/common";
import { useToggleStore } from "../../stores/toggleStore";
import { useLocation } from "react-router-dom"; // ✅ Use this
import { useEffect } from "react";

interface Props {
  toggleFunction: (section: ToggleSection) => void;
}

function DashboradHeader({ toggleFunction }: Props) {
  const { toggle, toggleSection, resetToggles} = useToggleStore();
  const location = useLocation(); // ✅ Get current route path

  const isDashboard = location.pathname.includes("/dashboard"); // ✅ Check for dashboard
  const isEduReel = location.pathname.includes("/edu-reel");
  useEffect(() => {
    // Reset toggles when the component mounts
    resetToggles();
  }, []);

  return (
    <header className="top-nav">
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <a href="/">
              <div className="logo">
                <button
                  className="hamburger-btn d-md-none"
                  id="hamburgerToggle"
                >
                  <i className="fas fa-bars"></i>
                </button>
                <img src="/padai.svg" className="img-fluid" />
              </div>
            </a>
            {/* <div className="separator"></div> */}
            {!isEduReel && (
              <div className="page-title">
                <div
                  className={`${
                    toggle.width ? "card-active" : "card-inactive"
                  } content-card chapter-card`}
                  onClick={() => toggleSection("width")}
                >
                  <div>
                    <MdMenuOpen
                      style={{ cursor: "pointer", fontSize: "18px" }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {isDashboard && (
            <div className="d-flex align-items-center">
              <button
                id="filterToggleBtn"
                className="icon-btn me-3"
                onClick={() => toggleFunction("filter")}
              >
                <img src="/filter.svg" />
                <span className="filter-dot" id="filterDot"></span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default DashboradHeader;
