import React, { useState, useRef, useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  FiUsers,
  FiHome,
  FiChevronDown,
  FiChevronRight,
  FiMenu,
  FiLogOut,
  FiSettings,
  FiBarChart2,
  FiUser,
  FiCalendar,
  FiDollarSign,
  FiFileText,
  FiClipboard,
  FiBook,
  FiGrid,
  FiActivity,
  FiScissors,
  FiPercent,
  FiLayers
} from "react-icons/fi";
import {
  MdDashboard,
  MdAnalytics,
  MdAccessTime
} from "react-icons/md";

import '../style/Dashboard.css';

export function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(true);
  const [submenuOpen, setSubmenuOpen] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  const usernamenow = localStorage.getItem('username');

  // Datos del usuario
  const [userData] = useState({
    name: usernamenow,
    clinic: "Clínica Dental Sonrisa Feliz"
  });

  // Redirige a /dashboard/paciente si está en la raíz /dashboard
  useEffect(() => {
    if (location.pathname === "/dashboard") {
      navigate("/dashboard/centroMando", { replace: true });
    }
  }, [location.pathname, navigate]);

  // Toggle el menú lateral
  const toggleMenu = () => setMenuOpen((o) => !o);

  // Toggle submenús
  const toggleSubmenu = (id) =>
    setSubmenuOpen((prev) => ({ ...prev, [id]: !prev[id] }));

  // Cerrar popup si se clickea fuera
  useEffect(() => {
    function handleClickOutside(e) {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setShowPopup(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Cerrar menú en móvil al cambiar ruta
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("username");
    localStorage.removeItem("domain");
    navigate("/", { replace: true });
  };

  const gomain = () => {
    navigate("/", { replace: true });
  };

  // Función para determinar si una ruta está activa
  const isActive = (path) => {
    if (location.pathname === path) return true;
    if (path === "/dashboard/centroMando" && location.pathname === "/dashboard") return true;
    return false;
  };

  // Función para determinar si algún item del submenú está activo
  const isSubmenuActive = (subitems) => {
    return subitems?.some(item => isActive(item.path));
  };

  // Items del menú
  const menuItems = [
    { id: "centromando", text: "Centro Control", icon: <MdDashboard />, path: "/dashboard/centroMando" },
    { id: "estadistica", text: "Estadistica", icon: <FiBarChart2 />, path: "/dashboard/estadistica" },
    { id: "calendario", text: "Calendario", icon: <FiCalendar />, path: "/dashboard/calendario" },
    {
      id: "catalogos",
      text: "Catalogos",
      icon: <FiGrid />,
      subitems: [
        { id: "exploracion", text: "Exploraciones", path: "/dashboard/exploracion", icon: <FiActivity /> },
        { id: "tratamiento", text: "Tratamientos", path: "/dashboard/tratamiento", icon: <FiScissors /> },
        { id: "montoDescuento", text: "Descuentos", path: "/dashboard/montoDescuento", icon: <FiPercent /> },
      ],
    },
    {
      id: "config",
      text: "Configuración",
      icon: <FiSettings />,
      subitems: [
        { id: "usuario", text: "usuarios", path: "/dashboard/usuario", icon: <FiUser /> },
        { id: "clinica", text: "Clinica", path: "/dashboard/clinica", icon: <FiLayers /> },
      ],
    },
  ];

  return (
    <div className="dashboard-container">
      {/* Botón hamburguesa para móvil */}
      <header className="dashboard-header">
        <div className="header-left">
          <button className="btn-menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
            <FiMenu size={24} />
          </button>
          <h1 className="system-name">Dellta</h1>
        </div>
        <div className="user-info">
          <div className="user-details">
            <span className="user-name">{userData.name}</span>
            <span className="clinic-name">{userData.clinic}</span>
          </div>
          <div className="user-avatar">
            <FiUser size={20} />
          </div>
        </div>
      </header>

      <nav className={`sidebar ${menuOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-system-name">Dellta</h2>
          <div className="sidebar-user-info">
            <FiUser size={16} />
            <span>{userData.name}</span>
          </div>
        </div>

        <ul className="menu-list">
          {menuItems.map(({ id, text, icon, path, subitems }) => (
            <li key={id} className="menu-item">
              {subitems ? (
                <>
                  <button
                    className={`menu-btn submenu-toggle ${isSubmenuActive(subitems) ? "active" : ""}`}
                    onClick={() => toggleSubmenu(id)}
                    aria-expanded={!!submenuOpen[id]}
                    aria-controls={`${id}-submenu`}
                  >
                    <span className="menu-icon">{icon}</span>
                    <span>{text}</span>
                    <span className="submenu-icon">
                      {submenuOpen[id] ? <FiChevronDown /> : <FiChevronRight />}
                    </span>
                  </button>
                  <ul
                    id={`${id}-submenu`}
                    className={`submenu ${submenuOpen[id] ? "open" : ""}`}
                  >
                    {subitems.map(({ id: subId, text: subText, path: subPath }) => (
                      <li key={subId}>
                        <Link
                          to={subPath}
                          className={`submenu-link ${isActive(subPath) ? "active" : ""}`}
                        >
                          {subText}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <Link to={path} className={`menu-btn ${isActive(path) ? "active" : ""}`}>
                  <span className="menu-icon">{icon}</span>
                  <span>{text}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div className="sidebar-footer">
          <div className="footer-buttons">
            <button
              className="footer-btn logout"
              onClick={() => {
                const confirmLogout = window.confirm("¿Está seguro que desea cerrar sesión?");
                if (confirmLogout) logout();
              }}
            >
              <FiLogOut style={{ marginRight: "0.5rem" }} />
              Cerrar sesión
            </button>

            <button
              className="footer-btn home"
              onClick={gomain}
              title="Volver al inicio"
            >
              <FiHome />
            </button>
          </div>
        </div>
      </nav>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}