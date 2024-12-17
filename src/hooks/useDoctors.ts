import { useState, useEffect } from "react";
import axios from "axios";

interface Doctor {
  id: string;
  name: string;
  licenseNumber: string;
  specialty: string;
  phone: string;
  photo: string;
}

const useDoctors = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:3000/doctors");
        setDoctors(response.data);
        setLoading(false);
      } catch (err) {
        setError("Erro ao carregar os dados.");
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  return { doctors, loading, error };
};

export default useDoctors;
