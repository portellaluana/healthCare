import React from "react";
import "./style.css";

interface CardProps {
  id?: string;
  doctor: string;
  patient?: string;
  date?: string;
  hour: string;
}

const DayAppointment: React.FC<CardProps> = ({ doctor, hour }) => (
  <div className="card mb-3">
    <div className="card-body align-items-center">
      <p className="mt-2 mb-1 card-title h5" style={{ fontSize: "14px" }}>
        {doctor}
      </p>
      <p className="card-text time-appointment card-title">{hour}</p>
    </div>
  </div>
);

export default DayAppointment;
