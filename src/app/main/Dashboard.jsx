import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import "../style/Dashboard.css"



import { SlOptions } from "react-icons/sl";
import { FaRegUserCircle } from "react-icons/fa";
import { CiViewList } from "react-icons/ci";
import { HiOutlineClipboardList } from "react-icons/hi";
import { FiUsers } from "react-icons/fi";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";

import { VscKebabVertical } from "react-icons/vsc";
import { PiUserCircleLight } from "react-icons/pi";


export function Dashboard() {

  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef();

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };


  // Cerrar el popup si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setShowPopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

// Cambia esto en tu menú:
const menuItems = [
  { text: 'Pacientes', icon: <FiUsers />, path: 'paciente',  end: true }, // Cambiado a singular
  { text: 'Citas', icon: <IoCalendarOutline />, path: 'cita',  end: true },
  { text: 'Facturas', icon: <IoCalendarOutline />, path: 'factura',  end: true },
  { text: 'Historiales', icon: <HiOutlineClipboardList />, path: 'historial',  end: true },
  { text: 'Exploraciones', icon: <IoCalendarOutline />, path: 'exploracion',  end: true },
  { text: 'Tratamientos', icon: <IoCalendarOutline />, path: 'tratamiento',  end: true }, 
  { text: 'Recetas', icon: <IoCalendarOutline />, path: 'receta',  end: true },// Cambiado a singular
  // ... otros items
];




  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("access_token"); // Elimina el token de acceso
    localStorage.removeItem("refresh_token"); // Elimina el token de actualización
    localStorage.removeItem("domain");  // Elimina el nombre del dominio

    navigate("/");
  };

  const gomain = () => {
    navigate("/", { replace: true });
  };

  const isActive = (path) => {
  // Verifica rutas exactas o que comiencen con el path
  return location.pathname === `/dashboard/${path}` || 
         location.pathname.startsWith(`/dashboard/${path}/`) ||
         (path === 'paciente' && location.pathname === '/dashboard');
};

  return (
    <div className='container-dasboard'>
      <div className='dashboard-menu'>
        <div className='menu-top'>
          <div className='menu-top-box'>
          <h5>| Dellta</h5>
          </div>  
        </div>
<div className='menu-center'>
  <div className='menu-center-box'>
    <div className='box-menu-center'>
      <label className='lb-clinica-center'>Clínica:</label>
      <label className='lb-nameclinica-center'>Nombre de la clínica</label>
    </div>
    <label className='lb-menu-center'>Main</label>


{menuItems.map((item) => {
  const active = isActive(item.path);
  return (
    <Link
      key={item.path}
      to={item.path}
      className={`btn-menu-center ${active ? 'active' : ''}`}
    >
      <span className={`icon-wrapper ${active ? 'active' : ''}`}>
        {item.icon}
      </span>
      {item.text}
    </Link>
  );
})}
  </div>
</div>
        <div className='menu-bottom'>
        <div className='box-menu-bottom'> 
            <div className='bottom-left'>
            <PiUserCircleLight style={{color: "black", fontSize: "27px",}} />
            </div>
            <div className='bottom-center'>
              <label className='bottom-center-lb' style={{}}>Admin</label>
              <label className='bottom-center-lb' style={{color:"gray", fontSize:"13px"}}>Marcel Zuniga</label>
            </div>
<div className='bottom-right'>
  <button 
    className='btn-bottom-right' 
    onClick={togglePopup}
    type="button"
    aria-haspopup="true"
    aria-expanded={showPopup}
  >
    <VscKebabVertical style={{color: "black", fontSize: "17px"}} />
  </button>

  {showPopup && (
    <div className='popup-opciones' ref={popupRef} role="menu">
      <button type="button" role="menuitem">Configuracion</button>
      <button onClick={logout} type="button" role="menuitem">Cerrar sesión</button>
      <button onClick={gomain} type="button" role="menuitem">Ir a inicio</button>
    </div>
  )}
</div>

        </div>
        </div>
      </div>
      <div className='dashboard-body'>
        <div className='dasboard-body-panel'>
           <Outlet />
        </div>
      </div>
    </div>     
  )
}


{/* <button onClick={logout}>
Cerrar Sesión
</button>
<button onClick={gomain}>
Ir a Inicio
</button> */}