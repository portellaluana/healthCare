import { useState, useEffect } from "react";
import axios from "axios";

interface Appointment {
  id: string;
  doctor: string;
  patient: string;
  status: string;
  date?: string;
  hour?: string;
}

const useAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("http://localhost:3000/appointments");

        const appointments = response.data.map((appointment: any) => {
          return {
            ...appointment,
          };
        });

        setAppointments(appointments);
        setLoading(false);
      } catch (err) {
        console.error("Erro ao carregar os dados:", err);
        setError("Erro ao carregar os dados.");
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const editAppointment = async (
    id: string,
    updatedAppointment: Appointment
  ) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/appointments/${id}`,
        updatedAppointment
      );

      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment.id === id
            ? { ...appointment, ...updatedAppointment }
            : appointment
        )
      );
    } catch (err) {
      console.error("Erro ao editar o compromisso:", err);
      setError("Erro ao editar o compromisso.");
    }
  };

  const createAppointment = async (newAppointment: Appointment) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/appointments",
        newAppointment
      );

      setAppointments((prevAppointments) => [
        ...prevAppointments,
        response.data,
      ]);
    } catch (err) {
      console.error("Erro ao criar novo compromisso:", err);
      setError("Erro ao criar novo compromisso.");
    }
  };

  const deleteAppointment = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/appointments/${id}`);

      setAppointments((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment.id !== id)
      );
    } catch (err) {
      console.error("Erro ao excluir o compromisso:", err);
      setError("Erro ao excluir o compromisso.");
    }
  };

  return {
    appointments,
    loading,
    error,
    editAppointment,
    createAppointment,
    deleteAppointment,
  };
};

export default useAppointments;
