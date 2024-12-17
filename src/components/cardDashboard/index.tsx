import { Card } from "react-bootstrap/";
import "./style.css";

interface CardDashboardProps {
  value: number;
  text: string;
}

const CardDashboard: React.FC<CardDashboardProps> = ({ value, text }) => {
  return (
    <Card style={{ width: "12rem" }} className="mb-5">
      <Card.Body
        style={{
          display: "inline-flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Card.Title className="number-card text-center">{value}</Card.Title>
        <Card.Text className="text-center text-uppercase fw-light">
          {text}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CardDashboard;
