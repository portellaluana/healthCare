import React, { useState } from "react";
import "../App.css";
import useAppointments from "../hooks/useAppointments";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import Dashboard from "../components/dashboard";
import { Row, Col, Spinner, Alert, Toast } from "react-bootstrap";
import Title from "../components/title";
import ReactCalendar from "../components/calendar";
import useDoctors from "../hooks/useDoctors";
import CardDoctors from "../components/cardDoctors";
import CardAppointment from "../components/cardAppointment";
import ModalForm from "../components/modal";

const Home: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    appointments,
    loading: loadingAppointments,
    error: errorAppointments,
    editAppointment,
    deleteAppointment,
    createAppointment,
  } = useAppointments();

  const {
    doctors,
    loading: loadingDoctors,
    error: errorDoctors,
  } = useDoctors();

  const [newAppointment, setNewAppointment] = useState<any>({
    doctor: "",
    patient: "",
    date: "",
    hour: "",
    payment: "",
    status: "Agendado",
  });
  const calculateDailyPayment = (date: Date) => {
    const dateString = date.toISOString().split("T")[0];
    return appointments
      .filter((appointment) => appointment.date === dateString)
      .reduce((acc, appointment) => acc + appointment.payment, 0);
  };

  const calculateDailyAppointments = (date: Date) => {
    const dateString = date.toISOString().split("T")[0];
    return appointments.filter((appointment) => appointment.date === dateString)
      .length;
  };

  const calculateMonthlyPayment = () => {
    return appointments.reduce((acc, appointment) => {
      const payment = Number(appointment.payment);
      return isNaN(payment) ? acc : acc + payment;
    }, 0);
  };

  const handleDoctorClick = (doctorName: string) => {
    setSelectedDoctor(doctorName);
    setSelectedDate(null);
  };

  const calculateMonthlyAppointments = () => {
    return appointments.length;
  };

  const calculateDailyCompletedAppointments = () => {
    if (!selectedDate) return 0;

    const currentDate = new Date();
    const selectedDateString = selectedDate.toISOString().split("T")[0];
    const completedAppointments = appointments.filter((appointment) => {
      const appointmentDate = new Date(
        `${appointment.date}T${appointment.hour}:00`
      );
      const appointmentDay = appointmentDate.toISOString().split("T")[0];
      if (appointmentDay === selectedDateString) {
        const hasPassedOneHour =
          currentDate - appointmentDate >= 60 * 60 * 1000;
        return hasPassedOneHour;
      }

      return false;
    });
    return completedAppointments.length;
  };

  const calculateMonthCompletedAppointments = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const isDateSelected = selectedDate !== null;
    const selectedDateString = isDateSelected
      ? selectedDate.toISOString().split("T")[0]
      : null;

    const completedAppointments = appointments.filter((appointment) => {
      const appointmentDate = new Date(
        `${appointment.date}T${appointment.hour}:00`
      );

      const appointmentMonth = appointmentDate.getMonth();
      const appointmentYear = appointmentDate.getFullYear();

      const isInCurrentMonthAndYear =
        appointmentMonth === currentMonth && appointmentYear === currentYear;

      if (isDateSelected) {
        const appointmentDay = appointmentDate.toISOString().split("T")[0];
        const isBeforeSelectedDate = appointmentDay === selectedDateString;
        return (
          isInCurrentMonthAndYear &&
          isBeforeSelectedDate &&
          appointmentDate.getHours() < 19
        );
      }

      return (
        isInCurrentMonthAndYear &&
        appointmentDate <= currentDate &&
        appointmentDate.getHours() < 19
      );
    });

    return completedAppointments.length;
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
        status: appointment.status || "Agendado",
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
  const handleSave = (updatedAppointment: any) => {
    if (selectedAppointment) {
      editAppointment(updatedAppointment.id, updatedAppointment);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } else {
      const doctorName = doctors.find((doctor) => {
        return doctor.id === updatedAppointment.doctor;
      })?.name;

      const appointmentToSave = {
        ...updatedAppointment,
        doctor: doctorName || updatedAppointment.doctor,
      };

      createAppointment(appointmentToSave);
    }
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAppointment((prev) => ({
      ...prev,
      [name]: value,
    }));
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
      <Row className="row mt-5 flex-nowrap home-content">
        <Col className={`col-md-${isCollapsed ? 1 : 2}`}>
          <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        </Col>
        <Col
          className={`col-md-${
            isCollapsed ? 8 : 7
          } container-dashboard ms-2 me-3`}
        >
          <Dashboard
            appointmentsData={appointments}
            selectedDate={selectedDate}
            calculateDailyPayment={calculateDailyPayment}
            calculateDailyAppointments={calculateDailyAppointments}
            calculateMonthlyPayment={calculateMonthlyPayment}
            calculateMonthlyAppointments={calculateMonthlyAppointments}
            calculateDailyCompletedAppointments={
              calculateDailyCompletedAppointments
            }
            calculateMonthCompletedAppointments={
              calculateMonthCompletedAppointments
            }
          />

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

        <Col className="col-md-3 container-calendar">
          <ReactCalendar onDateSelect={setSelectedDate} />{" "}
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
                    doctors={doctors}
                    onDoctorClick={handleDoctorClick}
                  />
                </div>
              )}
            </Col>
          )}
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
          <Toast.Body>Agendamento editado.</Toast.Body>
        </Toast>
      )}
    </Col>
  );
};

export default Home;
