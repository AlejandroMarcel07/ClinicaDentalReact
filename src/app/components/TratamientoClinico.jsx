import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ROUTES } from '../../services/Urls';
import { FaEdit, FaTrashAlt, FaSearch, FaPlus } from 'react-icons/fa';
import '../style/TratamientoClinico.css';

export function TratamientoClinico() {
  const [tratamientos, setTratamientos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ id: null, nombre: "" });
  const [isEditing, setIsEditing] = useState(false);

  const fetchTratamientos = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("access_token");
      const axiosInstance = axios.create({
        headers: { Authorization: `Bearer ${token}` },
      });

      const response = await axiosInstance.get(API_ROUTES.GET_TRATAMIENTO());
      setTratamientos(response.data);
    } catch (err) {
      setError(err.message || "Error al cargar datos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTratamientos();
  }, []);

  const openCreateModal = () => {
    setIsEditing(false);
    setModalData({ id: null, nombre: "" });
    setModalOpen(true);
  };

  const openEditModal = (tratamiento) => {
    setIsEditing(true);
    setModalData(tratamiento);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const axiosInstance = axios.create({
        headers: { Authorization: `Bearer ${token}` },
      });

      if (isEditing) {
        await axiosInstance.patch(API_ROUTES.TRATAMIENTO_BY_ID(modalData.id), {
          nombre: modalData.nombre,
        });
      } else {
        await axiosInstance.post(API_ROUTES.GET_TRATAMIENTO(), {
          nombre: modalData.nombre,
        });
      }

      closeModal();
      fetchTratamientos();
    } catch (err) {
      alert("Error guardando datos: " + (err.response?.data?.error || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro que quieres eliminar este tratamiento?")) return;

    try {
      const token = localStorage.getItem("access_token");
      const axiosInstance = axios.create({
        headers: { Authorization: `Bearer ${token}` },
      });

      await axiosInstance.delete(API_ROUTES.TRATAMIENTO_BY_ID(id));
      fetchTratamientos();
    } catch (err) {
      alert("Error eliminando tratamiento: " + (err.response?.data?.error || err.message));
    }
  };

  if (loading) return <div className="loading">Cargando tratamientos clínicos...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="centro-mando-container">
      <h1 className="dashboard-title">Tratamientos Clínicos</h1>

      <div className="search-container-line">
        <div className="search-box-line">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Buscar tratamiento..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="new-patient-button-line" onClick={openCreateModal}>
          <FaPlus /> Nuevo Tratamiento
        </button>
      </div>

      <div className="table-container-line">
        <table className="dashboard-table-line">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tratamientos.filter(t => 
              t.nombre.toLowerCase().includes(searchTerm.toLowerCase())
            ).length === 0 ? (
              <tr>
                <td colSpan="3" className="no-results">
                  No hay tratamientos registrados.
                </td>
              </tr>
            ) : (
              tratamientos.filter(t => 
                t.nombre.toLowerCase().includes(searchTerm.toLowerCase())
              ).map(tratamiento => (
                <tr key={tratamiento.id}>
                  <td>{tratamiento.id}</td>
                  <td>{tratamiento.nombre}</td>
                  <td className="actions-cell">
                    <button 
                      className="action-btn-line edit"
                      onClick={() => openEditModal(tratamiento)}
                      title="Editar"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      className="action-btn-line delete"
                      onClick={() => handleDelete(tratamiento.id)}
                      title="Eliminar"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{isEditing ? "Editar Tratamiento" : "Nuevo Tratamiento"}</h3>

            <label>
              Nombre:
              <input
                type="text"
                value={modalData.nombre}
                onChange={(e) => setModalData({ ...modalData, nombre: e.target.value })}
                className="modal-input"
              />
            </label>

            <div className="modal-actions">
              <button onClick={closeModal} className="cancel-button">
                Cancelar
              </button>
              <button onClick={handleSave} className="save-button">
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}