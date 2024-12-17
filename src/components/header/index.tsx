import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FiLogOut } from "react-icons/fi";
import "./style.css";

interface HeaderProps {
  title: string;
  subtitle: string;
  image: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle, image }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/home");
  };

  const handleLogoutClick = () => {
    navigate("/login");
  };

  return (
    <header className="d-flex align-items-center justify-content-between p-3 border-bottom mb-4">
      <div className="d-flex align-items-center">
        <img
          src={image}
          alt="Header Image"
          className="img-fluid rounded-circle"
          width="50"
          onClick={handleLogoClick}
          style={{ cursor: "pointer" }}
        />
        <div className="ms-3">
          <h1 className="h4 mb-0">{title}</h1>
          <p className="text-muted mb-0">{subtitle}</p>
        </div>
      </div>
      <div>
        <Button
          variant="link"
          className="text-logout text-decoration-underline d-flex align-items-center p-0"
          onClick={handleLogoutClick}
        >
          <FiLogOut className="me-2" /> Sair
        </Button>
      </div>
    </header>
  );
};

export default Header;
