import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ROUTES } from '../../services/Urls';
import { FaUser, FaMale, FaFemale, FaSearch, FaPlus, FaEdit, FaEye, FaClock } from 'react-icons/fa';
import '../style/CentroMando.css';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

export function CentroMando() {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    hombres: 0,
    mujeres: 0,
    adultos: 0,
    menores: 0
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [recientes, setRecientes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    cedula: '',
    nombre: '',
    edad: '',
    genero: '',
    direccion: '',
    ocupacion: '',
    antecedentes: ''
  });

  const openEditModal = (paciente) => {
    setIsEditing(true);
    setModalData({
      id: paciente.id,
      cedula: paciente.cedula || '',
      nombre: paciente.nombre || '',
      edad: paciente.edad || '',
      genero: paciente.genero?.id || paciente.genero || '',
      direccion: paciente.direccion || '',
      ocupacion: paciente.ocupacion || '',
      antecedentes: paciente.antecedentes || ''
    });
    setModalOpen(true);
  };


  const [generos, setGeneros] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const axiosInstance = axios.create({
          headers: { Authorization: `Bearer ${token}` }
        });

        const generosResponse = await axiosInstance.get(API_ROUTES.GET_GENERO());
        setGeneros(generosResponse.data);

        console.log("Datos de géneros:", generosResponse.data);

        const response = await axiosInstance.get(API_ROUTES.GET_PACIENTECONSULTA());
        const pacientesData = response.data;

        setPacientes(pacientesData);

        const pacientesRecientes = [...pacientesData]
          .sort((a, b) => new Date(b.fecha_creacion) - new Date(a.fecha_creacion))
          .slice(0, 3);

        setRecientes(pacientesRecientes);

        // Calculacion de las estadisticas
        const hombres = pacientesData.filter(p => p.genero === 'M' || p.nombregenero?.toLowerCase().includes('masculino')).length;
        const mujeres = pacientesData.filter(p => p.genero === 'F' || p.nombregenero?.toLowerCase().includes('femenino')).length;
        const adultos = pacientesData.filter(p => p.edad >= 18).length;
        const menores = pacientesData.filter(p => p.edad < 18).length;

        setStats({
          total: pacientesData.length,
          hombres,
          mujeres,
          adultos,
          menores
        });

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const openCreateModal = () => {
    setModalData({
      cedula: '',
      nombre: '',
      edad: '',
      genero: '',
      direccion: '',
      ocupacion: '',
      antecedentes: ''
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModalData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const axiosInstance = axios.create({
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!modalData.nombre || !modalData.edad || !modalData.genero) {
        alert("Nombre, edad y género son campos obligatorios");
        return;
      }

      if (isEditing) {
        const pacienteId = modalData.id;
        if (pacienteId) {
          await axiosInstance.patch(API_ROUTES.PACIENTE_BY_ID(pacienteId), modalData);
        }
      }
      const response = await axiosInstance.get(API_ROUTES.GET_PACIENTECONSULTA());
      setPacientes(response.data);

      const hombres = response.data.filter(p => p.genero === 'M' || p.nombregenero?.toLowerCase().includes('masculino')).length;
      const mujeres = response.data.filter(p => p.genero === 'F' || p.nombregenero?.toLowerCase().includes('femenino')).length;
      const adultos = response.data.filter(p => p.edad >= 18).length;
      const menores = response.data.filter(p => p.edad < 18).length;

      setStats({
        total: response.data.length,
        hombres,
        mujeres,
        adultos,
        menores
      });

      const pacientesRecientes = [...response.data]
        .sort((a, b) => new Date(b.fecha_creacion) - new Date(a.fecha_creacion))
        .slice(0, 3);
      setRecientes(pacientesRecientes);

      closeModal();
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving patient:", error);
      alert("Error al guardar paciente: " + (error.response?.data?.error || error.message));
    }
  };

  if (loading) return <div className="loading">Cargando datos...</div>;
  const isViewingPatient = location.pathname.includes('/paciente/');



  return (
    <div className="centro-mando-container">
      {isViewingPatient && (
        <div className="navigation-bar">
          <button
            onClick={() => navigate('/dashboard/centroMando')}
            className="breadcrumb-link"
          >
            Centro de Control
          </button>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Detalle Paciente</span>
        </div>
      )}

      {!isViewingPatient ? (
        <>

          <h1 className="dashboard-title">Centro de Control de Pacientes</h1>

          <div className="kpi-container-line">
            <div className="kpi-item">
              <FaUser className="kpi-icon" />
              <div>
                <h3>Total</h3>
                <p>{stats.total}</p>
              </div>
            </div>
            <div className="kpi-divider"></div>
            <div className="kpi-item">
              <FaMale className="kpi-icon male" />
              <div>
                <h3>Hombres</h3>
                <p>{stats.hombres}</p>
              </div>
            </div>
            <div className="kpi-divider"></div>
            <div className="kpi-item">
              <FaFemale className="kpi-icon female" />
              <div>
                <h3>Mujeres</h3>
                <p>{stats.mujeres}</p>
              </div>
            </div>
            <div className="kpi-divider"></div>
            <div className="kpi-item">
              <FaUser className="kpi-icon" />
              <div>
                <h3>Adultos</h3>
                <p>{stats.adultos}</p>
              </div>
            </div>
            <div className="kpi-divider"></div>
            <div className="kpi-item">
              <FaUser className="kpi-icon" />
              <div>
                <h3>Menores</h3>
                <p>{stats.menores}</p>
              </div>
            </div>
          </div>

          {/* Seccin de pacientes recientes */}
          <div className="recientes-section">
            <h3><FaClock /> Últimos registros</h3>
            <div className="recientes-grid">
              {recientes.map(paciente => (
                <div key={paciente.id} className="reciente-card">
                  <div className="reciente-avatar">
                    {paciente.nombre.charAt(0).toUpperCase()}
                  </div>
                  <div className="reciente-info">
                    <h4>{paciente.nombre}</h4>
                    <p>Nombre: {paciente.nombre}</p>
                    <p>Edad: {paciente.edad} años</p>
                    <p>Dirección: {paciente.direccion}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Busquedad */}
          <div className="search-container-line">
            <div className="search-box-line">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Buscar paciente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="new-patient-button-line" onClick={openCreateModal}>
              <FaPlus /> Nuevo
            </button>
          </div>

          {/* tabla paciente */}
          <div className="table-container-line">
            <table className="dashboard-table-line">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Cédula</th>
                  <th>Edad</th>
                  <th>Género</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {pacientes.filter(p =>
                  p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  p.cedula.includes(searchTerm)
                ).map(paciente => (
                  <tr key={paciente.id}>
                    <td>{paciente.id}</td>
                    <td>{paciente.nombre}</td>
                    <td>{paciente.cedula}</td>
                    <td>{paciente.edad}</td>
                    <td>{paciente.nombregenero || (paciente.genero === 'M' ? 'Masculino' : 'Femenino')}</td>
                    <td className="actions-cell">
                      <button className="action-btn-line edit"
                        onClick={() => openEditModal(paciente)}

                      >
                        <FaEdit />
                      </button>
                      <button className="action-btn-line view"
                        onClick={() => navigate(`/dashboard/centroMando/paciente/${paciente.id}`)}
                      >
                        <FaEye />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : null}

      <Outlet />
      {modalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content compact-form" onClick={(e) => e.stopPropagation()}>
            <h3>{isEditing ? "Editar Paciente" : "Nuevo Paciente"}</h3>

            <div className="form-grid">
              {/* Fila 1 */}
              <div className="form-group">
                <label>Nombre*</label>
                <input
                  type="text"
                  name="nombre"
                  value={modalData.nombre}
                  onChange={handleInputChange}
                  className="modal-input"
                  required
                />
              </div>

              <div className="form-group">
                <label>Edad*</label>
                <input
                  type="number"
                  name="edad"
                  value={modalData.edad}
                  onChange={handleInputChange}
                  className="modal-input"
                  min="0"
                  max="120"
                  required
                />
              </div>

              <div className="form-group">
                <label>Cédula</label>
                <input
                  type="text"
                  name="cedula"
                  value={modalData.cedula}
                  onChange={handleInputChange}
                  className="modal-input"
                />
              </div>

              <div className="form-group">
                <label>Género*</label>
                <select
                  name="genero"
                  value={modalData.genero}
                  onChange={handleInputChange}
                  className="modal-input"
                  required
                >
                  <option value="">Seleccione...</option>
                  {generos.map(genero => (
                    <option key={genero.id} value={genero.id}>
                      {genero.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Ocupación</label>
                <input
                  type="text"
                  name="ocupacion"
                  value={modalData.ocupacion}
                  onChange={handleInputChange}
                  className="modal-input"
                />
              </div>

              <div className="form-group">
                <label>Antecedentes</label>
                <input
                  type="text"
                  name="antecedentes"
                  value={modalData.antecedentes}
                  onChange={handleInputChange}
                  className="modal-input"
                />
              </div>

              <div className="form-group full-width">
                <label>Dirección</label>
                <input
                  type="text"
                  name="direccion"
                  value={modalData.direccion}
                  onChange={handleInputChange}
                  className="modal-input"
                />
              </div>
            </div>

            <div className="modal-actions">
              <button onClick={closeModal} className="cancel-button">
                Cancelar
              </button>
              <button onClick={handleSave} className="save-button">
                {isEditing ? "Actualizar" : "Guardar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}