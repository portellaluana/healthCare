import React from "react";
import "./style.css";

interface TitleProps {
  children: React.ReactNode;
}

const Title: React.FC<TitleProps> = ({ children }) => {
  return <h1 className="custom-title">{children}</h1>;
};

export default Title;
