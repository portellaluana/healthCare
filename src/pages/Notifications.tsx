import React, { useState } from "react";
import "../App.css";
import useAppointments from "../hooks/useAppointments";
import useNotification from "../hooks/useNotification";

import Header from "../components/header";
import Sidebar from "../components/sidebar";
import { Row, Col, Alert, Spinner } from "react-bootstrap";
import Title from "../components/title";
import DayAppointment from "../components/dayAppointment";
import Notification from "../components/notification";
import ReactCalendar from "../components/calendar";
import CardDoctors from "../components/cardDoctors";
import useDoctors from "../hooks/useDoctors";

const Notifications: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const {
    appointments,
    loading: loadingAppointments,
    error: errorAppointments,
  } = useAppointments();

  const {
    doctors,
    loading: loadingDoctors,
    error: errorDoctors,
  } = useDoctors();

  const {
    notifications,
    loading: loadingNotification,
    error: errorNotification,
    deleteNotifications,
  } = useNotification();

  const handleDoctorClick = (doctorName: string) => {
    setSelectedDoctor(doctorName);
  };
  return (
    <Col className="container-fluid container">
      <Header
        title="Health Care"
        subtitle="Cuidando das pessoas"
        image="/logo.png"
      />
      <Row className="row mt-5 flex-nowrap">
        <Col className={`col-md-${isCollapsed ? 1 : 2}`}>
          <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        </Col>
        <Col
          className={`col-md-${
            isCollapsed ? 8 : 7
          } container-dashboard ms-2 me-3 `}
        >
          {loadingNotification ? (
            <div>Carregando notificações...</div>
          ) : errorNotification ? (
            <div>{errorNotification}</div>
          ) : (
            <Notification
              notifications={notifications}
              deleteNotification={deleteNotifications}
            />
          )}
        </Col>
        <Col className="col-md-3 container-calendar">
          <ReactCalendar className="disable" />{" "}
          {loadingAppointments ? (
            <Spinner animation="border" />
          ) : errorAppointments ? (
            <Alert variant="danger">{errorAppointments}</Alert>
          ) : (
            <Col>
              {loadingDoctors ? (
                <div>Carregando médicos...</div>
              ) : errorDoctors ? (
                <div>{errorDoctors}</div>
              ) : (
                <div>
                  <Title>Nossos médicos</Title>
                  <CardDoctors
                    style={{ pointerEvents: "none" }}
                    doctors={doctors}
                    onDoctorClick={handleDoctorClick}
                  />
                </div>
              )}
            </Col>
          )}
        </Col>
      </Row>
    </Col>
  );
};

export default Notifications;
