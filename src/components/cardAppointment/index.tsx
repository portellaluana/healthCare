import React, { useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import "./style.css";
import { Button, Toast } from "react-bootstrap";

interface CardProps {
  id: string;
  doctor: string;
  patient: string;
  date: string;
  hour: string;
  status: string;
  editAppointment: (id: string) => void;
  deleteAppointment: (id: string) => void;
}

const CardAppointment: React.FC<CardProps> = ({
  id,
  doctor,
  patient,
  date,
  hour,
  editAppointment,
  deleteAppointment,
}) => {
  const [showToast, setShowToast] = useState(false);

  const handleDeleteClick = (id: string) => {
    setShowToast(true);
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div>
          <h5
            className="card-title"
            style={{
              width: "14rem",
              color: "#212529",
              fontSize: "16px",
            }}
          >
            {doctor}
          </h5>
          <h6
            className="card-subtitle mb-1 fw-normal"
            style={{
              width: "14rem",
              color: "#979797",
              fontSize: "16px",
            }}
          >
            {patient}
          </h6>
        </div>
        <div>
          <p className="card-text-appointment">{date}</p>
          <p className="card-text-appointment">{hour}</p>
        </div>
        <div className="card-actions">
          <button
            onClick={() => editAppointment(id)}
            className="btn btn-primary btn-edit-appointment"
            style={{ color: "#1f49a0" }}
          >
            <MdEdit />
          </button>
          <button
            onClick={() => handleDeleteClick(id)}
            className="btn btn-danger btn-delete-appointment"
          >
            <MdDelete />
          </button>
        </div>
      </div>
      {showToast && (
        <Toast className="toast-delete" onClose={() => setShowToast(false)}>
          <Toast.Header closeButton={false} className="toast-header-delete">
            <strong className="title-delete">Excluir agendamento?</strong>
          </Toast.Header>
          <div
            style={{
              margin: "0 auto",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button onClick={() => deleteAppointment(id)}>Sim</Button>
            <Button onClick={() => setShowToast(false)}>Não</Button>
          </div>
        </Toast>
      )}
    </div>
  );
};

export default CardAppointment;
