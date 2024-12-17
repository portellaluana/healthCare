import { React } from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaCalendarAlt,
  FaBell,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";
import { Nav } from "react-bootstrap";
import "./style.css";

const Menu: React.FC = ({ isCollapsed, setIsCollapsed }: any) => {
  const menuItems = [
    { icon: <FaHome />, title: "Home", path: "/home" },
    { icon: <FaCalendarAlt />, title: "Agenda", path: "/agendamentos" },
    { icon: <FaBell />, title: "Avisos", path: "/avisos" },
  ];

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Nav
      className={`menu ${
        isCollapsed ? "col-md-1" : "col-md-3"
      } flex-column h-100`}
      as="nav"
    >
      <div className="toggle-btn d-flex justify-content-center my-3">
        <button className="btn btn-toggle" onClick={toggleCollapse}>
          {isCollapsed ? <FaAngleRight /> : <FaAngleLeft />}
        </button>
      </div>

      {menuItems.map((item, index) => (
        <Nav.Item key={index} className="li-item">
          <Link
            to={item.path}
            className="menu-item-btn nav-link d-flex align-items-center"
          >
            <span className="icon">{item.icon}</span>
            {!isCollapsed && <span className="ms-2 item">{item.title}</span>}
          </Link>
        </Nav.Item>
      ))}
    </Nav>
  );
};

export default Menu;
