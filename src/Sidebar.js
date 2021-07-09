import React from "react";
import { useGlobalContext } from "./utils/context";

const Sidebar = () => {
  const { isSidebarOpen, closeSidebar } = useGlobalContext();

  return (
    <div className={`${isSidebarOpen ? "sidebar show-sidebar" : "sidebar"}`}>
      <div className="sidebar-header">
        <a href="#close" className="sidebar-logo">
          close
        </a>
        <button className="ham-btn" onClick={closeSidebar}></button>
      </div>
      <ul className="sidebar-menu">
        <li>
          <a href="menu">Test</a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
