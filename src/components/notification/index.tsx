import React from "react";
import { Container, Toast } from "react-bootstrap";
import "./style.css";
import Title from "../title";

interface NotificationProps {
  notifications: Array<{
    id: string;
    name: string;
    message: string;
    date: string;
    hour: string;
  }>;
  deleteNotification: (id: string) => void;
}

const Notification: React.FC<NotificationProps> = ({
  notifications,
  deleteNotification,
}) => {
  const handleDeleteClick = (id: string) => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir esta notificação?"
    );
    if (confirmDelete) {
      deleteNotification(id);
    }
  };

  const sortedNotifications = notifications.sort((a, b) => {
    const dateTimeA = `${a.date}T${a.hour}`;
    const dateTimeB = `${b.date}T${b.hour}`;
    return new Date(dateTimeA).getTime() - new Date(dateTimeB).getTime();
  });

  return (
    <Container className="mt-5">
      <Title>Avisos</Title>

      {sortedNotifications.length > 0 ? (
        sortedNotifications.map((notification) => (
          <Toast
            key={notification.id}
            className="w-100 mb-3"
            onClose={() => handleDeleteClick(notification.id)}
          >
            <Toast.Header>
              <strong className="me-auto">{notification.name}</strong>
            </Toast.Header>
            <Toast.Body>{notification.message}</Toast.Body>
          </Toast>
        ))
      ) : (
        <div>Nenhuma notificação disponível</div>
      )}
    </Container>
  );
};

export default Notification;
