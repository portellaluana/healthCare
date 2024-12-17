import React from "react";
import "./style.css";
import { Card, Row } from "react-bootstrap/";

interface Doctor {
  id?: string;
  name: string;
  licenseNumber?: string;
  specialty?: string;
  phone?: string;
  photo: string;
  payment: number;
}

interface CardDoctorsProps {
  doctors: Doctor[];
  onDoctorClick: (doctorName: string) => void;
  className?: string;
}

const CardDoctors: React.FC<CardDoctorsProps> = ({
  doctors,
  onDoctorClick,
  className,
}) => (
  <Row className="doctors-container">
    {doctors.map((doctor) => (
      <Card
        key={doctor.id}
        className="card-doctor"
        style={{ width: "7rem", marginTop: "10px", marginBottom: "10px" }}
        onClick={() => onDoctorClick(doctor.name)}
      >
        <Card.Img className="mt-2" src={doctor.photo} alt={doctor.name} />
        <Card.Body className="d-inline p-0">
          <Card.Title className="mt-2 mb-1" style={{ fontSize: "12px" }}>
            {doctor.name}
          </Card.Title>
          <Card.Text
            style={{ color: "#979797", fontSize: "10px" }}
            className="mb-1"
          >
            {doctor.specialty}
          </Card.Text>
          <Card.Title className="doctor-payment" style={{ fontSize: "16px" }}>
            <span style={{ fontSize: "12px" }}>R$</span> {doctor.payment}
          </Card.Title>
        </Card.Body>
      </Card>
    ))}
  </Row>
);

export default CardDoctors;
