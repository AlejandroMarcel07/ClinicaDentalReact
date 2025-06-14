import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ROUTES } from '../../services/Urls';
import { FaEdit, FaTrashAlt, FaSearch, FaPlus } from 'react-icons/fa';
import '../style/MontoDescuento.css';

export function MontoDescuento() {
  const [montos, setMontos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ id: null, cantidad: "" });
  const [isEditing, setIsEditing] = useState(false);

  const fetchMontos = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("access_token");
      const axiosInstance = axios.create({
        headers: { Authorization: `Bearer ${token}` },
      });

      const response = await axiosInstance.get(API_ROUTES.GET_MONTODESCUENTO());
      setMontos(response.data);
    } catch (err) {
      setError(err.message || "Error al cargar datos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMontos();
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setSearchTerm(value);
  };

  const openCreateModal = () => {
    setIsEditing(false);
    setModalData({ id: null, cantidad: "" });
    setModalOpen(true);
  };

  const openEditModal = (monto) => {
    setIsEditing(true);
    setModalData(monto);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const handleSave = async () => {
    const cantidad = parseFloat(modalData.cantidad);
    if (isNaN(cantidad)) {
      alert("Por favor ingrese un valor numérico válido");
      return;
    }
    
    if (cantidad < 0 || cantidad > 100) {
      alert("El descuento debe estar entre 0% y 100%");
      return;
    }

    try {
      const token = localStorage.getItem("access_token");
      const axiosInstance = axios.create({
        headers: { Authorization: `Bearer ${token}` },
      });

      if (isEditing) {
        await axiosInstance.patch(API_ROUTES.MONTODESCUENTO_BY_ID(modalData.id), {
          cantidad: cantidad
        });
      } else {
        await axiosInstance.post(API_ROUTES.GET_MONTODESCUENTO(), {
          cantidad: cantidad
        });
      }

      closeModal();
      fetchMontos();
    } catch (err) {
      alert("Error guardando datos: " + (err.response?.data?.error || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro que quieres eliminar este monto de descuento?")) return;

    try {
      const token = localStorage.getItem("access_token");
      const axiosInstance = axios.create({
        headers: { Authorization: `Bearer ${token}` },
      });

      await axiosInstance.delete(API_ROUTES.MONTODESCUENTO_BY_ID(id));
      fetchMontos();
    } catch (err) {
      alert("Error eliminando monto de descuento: " + (err.response?.data?.error || err.message));
    }
  };

  if (loading) return <div className="loading">Cargando montos de descuento...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="centro-mando-container">
      <h1 className="dashboard-title">Montos de Descuento</h1>
      
      <div className="search-container-line">
        <div className="search-box-line">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Buscar por porcentaje..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <button className="new-patient-button-line" onClick={openCreateModal}>
          <FaPlus /> Nuevo Descuento
        </button>
      </div>

      <div className="table-container-line">
        <table className="dashboard-table-line">
          <thead>
            <tr>
              <th>ID</th>
              <th>Porcentaje de Descuento</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {montos.filter(m => 
              m.cantidad.toString().includes(searchTerm)
            ).length === 0 ? (
              <tr>
                <td colSpan="3" className="no-results">
                  No hay montos de descuento registrados.
                </td>
              </tr>
            ) : (
              montos.filter(m => 
                m.cantidad.toString().includes(searchTerm)
              ).map(monto => (
                <tr key={monto.id}>
                  <td>{monto.id}</td>
                  <td>{monto.cantidad}%</td>
                  <td className="actions-cell">
                    <button 
                      className="action-btn-line edit"
                      onClick={() => openEditModal(monto)}
                      title="Editar"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      className="action-btn-line delete"
                      onClick={() => handleDelete(monto.id)}
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
            <h3>{isEditing ? "Editar Monto de Descuento" : "Nuevo Monto de Descuento"}</h3>

            <label>
              Porcentaje de descuento (0-100%):
              <input
                type="number"
                min="0"
                max="100"
                step="0.01"
                value={modalData.cantidad}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9.]/g, '');
                  setModalData({ ...modalData, cantidad: value });
                }}
                className="modal-input"
                placeholder="Ej. 15.50"
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