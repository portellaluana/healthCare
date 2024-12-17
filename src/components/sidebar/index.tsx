import React from "react";
import Menu from "../menu";
import { Nav } from "react-bootstrap";

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, setIsCollapsed }) => {
  return (
    <Nav
      className={`menu ${isCollapsed ? "col-md-1" : "col-md-3"} flex-column`}
      as="nav"
    >
      <div className={`sidebar ${isCollapsed ? "collapsed" : "expanded"}`}>
        <Menu isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </div>
    </Nav>
  );
};

export default Sidebar;
