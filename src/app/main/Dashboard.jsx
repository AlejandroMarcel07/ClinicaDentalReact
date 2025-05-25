import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import "../style/Dashboard.css"

import { SlOptions } from "react-icons/sl";
import { FaRegUserCircle } from "react-icons/fa";
import { CiViewList } from "react-icons/ci";
import { HiOutlineClipboardList } from "react-icons/hi";


export function Dashboard() {



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
              <label className='lb-clinica-center'>Clinica</label>
              <label className='lb-nameclinica-center'>Nombre de la clinica</label>
            </div>
            <label className='lb-menu-center'>Main</label>
            <button className='btn-menu-center'>
            <HiOutlineClipboardList style={{color: "black", fontSize: "17px",}} /> Paciente
            </button>
            <button className='btn-menu-center'>hola</button>
          </div>
        </div>
        <div className='menu-bottom'>
        <div className='box-menu-bottom'> 
            <div className='bottom-left'>
            <FaRegUserCircle style={{color: "black", fontSize: "25px",}} />
            </div>
            <div className='bottom-center'>
              <label className='bottom-center-lb' style={{}}>Admin</label>
              <label className='bottom-center-lb' style={{color:"gray", fontSize:"13px"}}>Marcel Zuniga</label>
            </div>
            <div className='bottom-right'>
               <button className='btn-bottom-right'>
              <SlOptions style={{color: "black", fontSize: "17px",}} />
               </button>
            </div>
        </div>
        </div>
      </div>
      <div className='dashboard-body'>
        <div className='dasboard-body-panel'>

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