import "./style.css";
import { Row } from "react-bootstrap";
import Calendar from "react-calendar";
import { useState } from "react";
import useAppointments from "../../hooks/useAppointments";

interface ReactCalendarProps {
  onDateSelect?: (date: Date) => void;
  className?: string;
}

const ReactCalendar: React.FC<ReactCalendarProps> = ({
  onDateSelect,
  className,
}) => {
  const { appointments } = useAppointments();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const getTileClassName = ({ date }: { date: Date }) => {
    const dateString = date.toISOString().split("T")[0];
    const hasAppointment = appointments.some(
      (appointment) => appointment.date === dateString
    );

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const appointmentDate = new Date(dateString);

    const isPastDate = appointmentDate < today;
    const isToday =
      appointmentDate.toISOString().split("T")[0] ===
      today.toISOString().split("T")[0];

    let className = "";

    if (isToday) {
      className = "highlight highlight-today";
    } else if (hasAppointment) {
      className = isPastDate ? "highlight highlight-pass" : "highlight";
    }

    if (
      selectedDate &&
      selectedDate.toISOString().split("T")[0] === dateString
    ) {
      className += " highlight-selected";
    }

    return className;
  };

  return (
    <Row className="calendar mb-5 ">
      <Calendar
        tileClassName={getTileClassName}
        onChange={(date: Date) => {
          setSelectedDate(date);
          onDateSelect(date);
        }}
        className={className}
      />
    </Row>
  );
};

export default ReactCalendar;
