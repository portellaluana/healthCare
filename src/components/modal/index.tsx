import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./style.css";

interface ModalFormProps {
  show: boolean;
  onHide: () => void;
  title: string;
  initialData: any;
  onSave: (updatedData: any) => void;
  fields: Array<{ name: string; label: string; type: string; value: any }>;
  doctors: Array<{ id: string; name: string }>;
}

const ModalForm: React.FC<ModalFormProps> = ({
  show,
  onHide,
  title,
  initialData,
  onSave,
  fields,
  doctors,
}) => {
  const [formData, setFormData] = useState<any>(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [show, initialData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDoctorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData((prevState: any) => ({
      ...prevState,
      doctor: value,
    }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      keyboard={false}
      dialogClassName="custom-modal-dialog"
      className="custom-modal-backdrop"
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {fields.map((field) => {
            if (field.name === "doctor") {
              return (
                <Form.Group
                  key={field.name}
                  className="mb-3"
                  controlId={field.name}
                >
                  <Form.Label>{field.label}</Form.Label>
                  <Form.Control
                    as="select"
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleDoctorChange}
                  >
                    <option value="">Selecione um médico</option>
                    {doctors.map((doctor) => (
                      <option key={doctor.id} value={doctor.name}>
                        {doctor.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              );
            }
            return (
              <Form.Group
                key={field.name}
                className="mb-3"
                controlId={field.name}
              >
                <Form.Label>{field.label}</Form.Label>
                <Form.Control
                  type={field.type}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleInputChange}
                />
              </Form.Group>
            );
          })}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Fechar
        </Button>
        <Button variant="primary" className="save-button" onClick={handleSave}>
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalForm;
