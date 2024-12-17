import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import useAppointments from "../hooks/useAppointments";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import { Row, Col, Button, Toast } from "react-bootstrap";
import CardAppointment from "../components/cardAppointment";
import ModalForm from "../components/modal";
import useDoctors from "../hooks/useDoctors";
import Title from "../components/title";
import CardDoctors from "../components/cardDoctors";
import ReactCalendar from "../components/calendar";

const Appointment: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const {
    appointments,
    loading,
    error,
    editAppointment,
    deleteAppointment,
    createAppointment,
  } = useAppointments();
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAppointment, setNewAppointment] = useState<any>({
    doctor: "",
    patient: "",
    date: "",
    hour: "",
    payment: "",
    status: "Agendado",
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();
  const {
    doctors,
    loading: loadingDoctors,
    error: errorDoctors,
  } = useDoctors();

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedDoctor(null);
  };
  const handleOpenModal = (appointment?: any) => {
    if (appointment) {
      setSelectedAppointment(appointment);
      setNewAppointment({
        id: appointment.id,
        doctor: appointment.doctor,
        patient: appointment.patient,
        date: appointment.date,
        hour: appointment.hour,
        payment: appointment.payment,
        status: appointment.status || "agendado",
      });
    } else {
      setSelectedAppointment(null);
      setNewAppointment({
        doctor: "",
        patient: "",
        date: "",
        hour: "",
        payment: "",
        status: "Agendado",
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
  };

  const handleSave = (updatedAppointment: any) => {
    if (selectedAppointment) {
      editAppointment(updatedAppointment.id, updatedAppointment);
    } else {
      const doctorName = doctors.find(
        (doctor) => doctor.id === updatedAppointment.doctor
      )?.name;

      const appointmentToSave = {
        ...updatedAppointment,
        doctor: doctorName || updatedAppointment.doctor,
      };

      createAppointment(appointmentToSave);

      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
    handleCloseModal();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAppointment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDoctorClick = (doctorName: string) => {
    setSelectedDoctor(doctorName);
    setSelectedDate(null);
  };

  const filteredAppointments = selectedDate
    ? appointments.filter((appointment) => {
        const appointmentDate = new Date(appointment.date);
        const selectedDateWithoutTime = new Date(selectedDate);
        selectedDateWithoutTime.setUTCHours(0, 0, 0, 0);

        appointmentDate.setUTCHours(0, 0, 0, 0);

        return (
          selectedDateWithoutTime.toISOString().slice(0, 10) ===
            appointmentDate.toISOString().slice(0, 10) &&
          (!selectedDoctor || appointment.doctor === selectedDoctor)
        );
      })
    : appointments.filter(
        (appointment) =>
          !selectedDoctor || appointment.doctor === selectedDoctor
      );

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
        <Col className="col-md-3 container-calendar">
          <ReactCalendar onDateSelect={handleDateSelect} />
          {loadingDoctors ? (
            <div>Carregando médicos...</div>
          ) : errorDoctors ? (
            <div>{errorDoctors}</div>
          ) : (
            <div>
              <Title>Nossos médicos</Title>
              <CardDoctors
                doctors={doctors}
                onDoctorClick={handleDoctorClick}
              />
            </div>
          )}
        </Col>
        <Col
          className={`col-md-${
            isCollapsed ? 8 : 7
          } container-dashboard ms-2 me-3 `}
        >
          <Button
            className="w-100 mb-5 btn-new-appointment"
            onClick={() => handleOpenModal()}
          >
            Novo agendamento
          </Button>
          <Title>Agendamentos</Title>
          {filteredAppointments.map((appointment) => (
            <CardAppointment
              key={appointment.id}
              id={appointment.id}
              doctor={appointment.doctor}
              patient={appointment.patient}
              date={appointment.date}
              hour={appointment.hour}
              payment={appointment.payment}
              status={appointment.status}
              onSave={handleSave}
              editAppointment={() => handleOpenModal(appointment)}
              deleteAppointment={deleteAppointment}
            />
          ))}
        </Col>
      </Row>

      {isModalOpen && (
        <ModalForm
          show={isModalOpen}
          onHide={handleCloseModal}
          title={
            selectedAppointment ? "Editar Agendamento" : "Novo Agendamento"
          }
          initialData={newAppointment}
          onSave={handleSave}
          onChange={handleChange}
          fields={[
            {
              name: "doctor",
              label: "Nome do Médico",
              type: "select",
              value: newAppointment.doctor,
            },
            {
              name: "patient",
              label: "Nome do Paciente",
              type: "text",
              value: newAppointment.patient,
            },
            {
              name: "date",
              label: "Data",
              type: "date",
              value: newAppointment.date,
            },
            {
              name: "hour",
              label: "Hora",
              type: "hour",
              value: newAppointment.hour,
            },
            {
              name: "Valor",
              label: "Valor",
              type: "number",
              value: newAppointment.payment,
            },
            {
              name: "status",
              label: "Status",
              type: "select",
              value: newAppointment.status,
            },
          ]}
          doctors={doctors}
        />
      )}

      {showToast && (
        <Toast
          style={{
            position: "absolute",
            top: 20,
            right: 20,
          }}
          onClose={() => setShowToast(false)}
        >
          <Toast.Header>
            <strong className="me-auto">Sucesso</strong>
          </Toast.Header>
          <Toast.Body>Agendamento criado.</Toast.Body>
        </Toast>
      )}
    </Col>
  );
};

export default Appointment;
