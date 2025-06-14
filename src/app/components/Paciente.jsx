import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_ROUTES } from '../../services/Urls';
import '../style/Paciente.css';
import { FaUser, FaBirthdayCake, FaIdCard, FaVenusMars, FaPhone, FaMapMarkerAlt, FaNotesMedical, FaCalendarAlt, FaHistory } from 'react-icons/fa';

export function Paciente() {
  const { id } = useParams();
  const [paciente, setPaciente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [historial, setHistorial] = useState([]);
  const [proximaCita, setProximaCita] = useState(null);

  useEffect(() => {
    const fetchPaciente = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.get(API_ROUTES.PACIENTECONSULTA_BY_ID(id), {
          headers: { Authorization: `Bearer ${token}` },
          params: { id }
        });
        
        if (response.data) {
          setPaciente(response.data);
          // Datos de ejemplo para historial y próxima cita
          setHistorial([
            { id: 1, fecha: '2023-10-15', motivo: 'Consulta Semanal', diagnostico: 'Limpieza dental' },
            { id: 2, fecha: '2023-08-22', motivo: 'Dolor dental', diagnostico: 'Chequeo rapido' },
            { id: 3, fecha: '2023-05-10', motivo: 'Limpieza dental', diagnostico: 'Ninguno' }
          ]);
          setProximaCita({
            fecha: '2023-11-20',
            hora: '10:30 AM',
            motivo: 'Limpieza dental',
            medico: 'Dr. Juan Pérez'
          });
        } else {
          setError("No se encontraron datos del paciente");
        }
      } catch (err) {
        setError("Error al cargar los datos del paciente");
        console.error("Error fetching patient:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPaciente();
  }, [id]);

  if (loading) return <div className="loading">Cargando datos del paciente...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!paciente) return <div>No se encontró el paciente</div>;

  return (
    <div className="paciente-container">
      {/* Sección principal */}
      <div className="paciente-main-section">
        {/* Encabezado */}
        <div className="paciente-header">
          <div className="paciente-avatar">
            {paciente.nombre?.charAt(0).toUpperCase() || 'P'}
          </div>
          <div className="paciente-title-container">
            <h1 className="paciente-title">{paciente.nombre || 'Nombre no disponible'}</h1>
            <p className="paciente-subtitle">Paciente desde: {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        {/* Información básica */}
        <div className="paciente-info-grid">
          <div className="info-card">
            <FaIdCard className="info-icon" />
            <div>
              <h3>Cédula</h3>
              <p>{paciente.cedula || 'No registrada'}</p>
            </div>
          </div>

          <div className="info-card">
            <FaBirthdayCake className="info-icon" />
            <div>
              <h3>Edad</h3>
              <p>{paciente.edad ? `${paciente.edad} años` : 'No registrada'}</p>
            </div>
          </div>

          <div className="info-card">
            <FaVenusMars className="info-icon" />
            <div>
              <h3>Género</h3>
              <p>{paciente.nombregenero || (paciente.genero === 'M' ? 'Masculino' : paciente.genero === 'F' ? 'Femenino' : 'No especificado')}</p>
            </div>
          </div>

          <div className="info-card">
            <FaMapMarkerAlt className="info-icon" />
            <div>
              <h3>Dirección</h3>
              <p>{paciente.direccion || 'No registrada'}</p>
            </div>
          </div>

          <div className="info-card">
            <FaUser className="info-icon" />
            <div>
              <h3>Ocupación</h3>
              <p>{paciente.ocupacion || 'No registrada'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar derecha */}
      <div className="paciente-sidebar">
        {/* Próxima cita */}
        <div className="sidebar-card">
          <h2 className="sidebar-title"><FaCalendarAlt /> Próxima Cita</h2>
          {proximaCita ? (
            <div className="cita-info">
              <p><strong>Fecha:</strong> {proximaCita.fecha}</p>
              <p><strong>Hora:</strong> {proximaCita.hora}</p>
              <p><strong>Motivo:</strong> {proximaCita.motivo}</p>
              <p><strong>Odontologo:</strong> {proximaCita.medico}</p>
            </div>
          ) : (
            <p>No hay citas programadas</p>
          )}
        </div>

        {/* Historial clínico */}
        <div className="sidebar-card">
          <h2 className="sidebar-title"><FaHistory /> Historial Clínico</h2>
          <div className="historial-list">
            {historial.length > 0 ? (
              historial.map(registro => (
                <div key={registro.id} className="historial-item">
                  <div className="historial-fecha">{registro.fecha}</div>
                  <div className="historial-motivo">{registro.motivo}</div>
                  <div className="historial-diagnostico">{registro.diagnostico}</div>
                </div>
              ))
            ) : (
              <p>No hay registros de historial</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}