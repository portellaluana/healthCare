import React from "react";
import { Row } from "react-bootstrap";
import CardDashboard from "../cardDashboard";

interface DashboardProps {
  appointmentsData: any[];
  selectedDate: Date | null;
  calculateDailyPayment: (date: Date) => number;
  calculateDailyAppointments: (date: Date) => number;
  calculateMonthlyPayment: () => number;
  calculateMonthlyAppointments: () => number;
  calculateDailyCompletedAppointments: () => number;
  calculateMonthCompletedAppointments: () => number;
}

const Dashboard: React.FC<DashboardProps> = ({
  appointmentsData,
  selectedDate,
  calculateDailyPayment,
  calculateDailyAppointments,
  calculateMonthlyPayment,
  calculateMonthlyAppointments,
  calculateDailyCompletedAppointments,
  calculateMonthCompletedAppointments,
}) => {
  const isDaily = selectedDate !== null;

  return (
    <Row className="mt-5 container-appointment d-flex justify-content-around">
      <CardDashboard
        value={
          isDaily
            ? calculateDailyPayment(selectedDate)
            : calculateMonthlyPayment()
        }
        text={
          isDaily
            ? "Faturamento diário em reais"
            : "Faturamento mensal em reais"
        }
      />
      <CardDashboard
        value={
          isDaily
            ? calculateDailyAppointments(selectedDate)
            : calculateMonthlyAppointments()
        }
        text={isDaily ? "Agendamentos diário" : "Agendamentos mensais"}
      />

      <CardDashboard
        value={
          isDaily
            ? calculateDailyCompletedAppointments()
            : calculateMonthCompletedAppointments()
        }
        text={isDaily ? "Concluídos diário" : "Concluídos mensal"}
      />
    </Row>
  );
};

export default Dashboard;
