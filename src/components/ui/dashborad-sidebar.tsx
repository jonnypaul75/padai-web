import { useEffect, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import {  FaVideo } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { SiAudioboom } from "react-icons/si";
import { Link, useLocation } from "react-router-dom";

function DashboradSidebar() {
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

  return (
    <aside style={{ zIndex: 999 }}>
      <ul className="sidebar-menu">
        <li className={`${activePath === "/dashboard" ? "active" : ""} sidebar-menu-item`}>
          <Link to={"/dashboard"} className="sidebar-menu-link" title="Dashboard">
            <div className="sidebar-icon"><AiFillHome /></div>
          </Link>
          {/* <a
            href={"/dashboard"}
            className="sidebar-menu-link"
            title="Dashboard"
          > 
            <span className="sidebar-icon">
              <AiFillHome />
            </span>
          </a>*/}
        </li>
        {/* <li className={`${activePath === "/courses" ? "active" : ""} sidebar-menu-item`}>
          <a href="#" className="sidebar-menu-link" title="Courses">
            <div className="sidebar-icon">
              <FaBookReader />
            </div>
          </a>
        </li> */}
        <li className={`${activePath === "/media" ? "active" : ""} sidebar-menu-item`}>
          <Link to={"/media"} className="sidebar-menu-link" title="Media">
            <div className="sidebar-icon"><SiAudioboom /></div>
          </Link>
          {/* <a href={"/media"} className="sidebar-menu-link" title="Media">
            <span className="sidebar-icon">
              <SiAudioboom />
            </span>
          </a> */}
        </li>
        <li className={`${activePath === "/edu-reel" ? "active" : ""} sidebar-menu-item`}>
          <Link to={"/edu-reel"} className="sidebar-menu-link" title="Edu Reels">
            <div className="sidebar-icon"><FaVideo /></div>
          </Link>
          {/* <a href={"/edu-reel"} className="sidebar-menu-link" title="Videos">
            <span className="sidebar-icon">
              <FaVideo />
            </span>
          </a> */}
        </li>
        <li className={`${activePath === "/settings" ? "active" : ""} sidebar-menu-item`}>
          <a href="#" className="sidebar-menu-link" title="Settings">
            <div className="sidebar-icon">
              <IoSettingsSharp />
            </div>
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default DashboradSidebar;
