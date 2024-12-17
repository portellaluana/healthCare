import { useState, useEffect } from "react";
import axios from "axios";

interface Notification {
  id: string;
  doctorName: string;
  message: string;
  date: string;
  hour: string;
}

const useNotification = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const response = await axios.get("http://localhost:3000/notifications");
        setNotifications(response.data);
        setLoading(false);
      } catch (err) {
        setError("Erro ao carregar os dados.");
        setLoading(false);
      }
    };

    fetchNotification();
  }, []);

  const deleteNotifications = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/notifications/${id}`);

      setNotifications((prevNotification) =>
        prevNotification.filter((notification) => notification.id !== id)
      );
    } catch (err) {
      console.error("Erro ao excluir notificação:", err);
      setError("Erro ao excluir notificação.");
    }
  };

  return { notifications, deleteNotifications, loading, error };
};

export default useNotification;
