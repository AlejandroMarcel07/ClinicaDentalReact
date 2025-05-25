import React, { useState } from 'react';
import '../style/PageHome.css'
import { Link, Outlet, useLocation  } from "react-router-dom";
import { isAuthenticated } from '../../services/Auth';
import { API_ROUTES } from '../../services/Urls';
import { useNavigate } from 'react-router-dom';
import { Sesion } from './Sesion';




export function PageHome() {

  const [menuActive, setMenuActive] = useState(false);
  const location = useLocation(); 

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  
  // Actualiza la ubicación cuando cambia la página
  window.onpopstate = () => {
    setLocation(window.location.pathname);
  };

  const [isLoginOpen, setLoginOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    if (isAuthenticated()) {
      navigate("/dashboard"); // Redirigir si ya está autenticado
    } else {
      setLoginOpen(true); // Abrir modal si no está autenticado
    }
  };

  return (
    <>
    <div className='page-background'>
              <div className="BolaGradiente ba1  "></div>
              <div className="BolaGradiente ba2 "></div>
              <div className="ba3 "></div>
              <div className="ba4 "></div>
              <div className="ba5 "></div>
              <div className="ba6 "></div>
    </div>
    <div className='nav-wapper'>
      <nav className={`navbar ${menuActive ? 'active' : ''}`}>
        <button className="nav-toggle" onClick={toggleMenu}>
          &#9776; 
        </button>
        <ul className="nav-menu" style={{background: "Transparent", padding:"0px 10px", borderRadius:"8px"}}>
          <div className='nav-left'>
          <li className="nav-item">
            <Link to="/" className="nav-dellta">
              | Dellta
            </Link>
          </li>
          <li className="nav-item">
              <Link to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`}>
              Home
            </Link>
          </li>
          <li className="nav-item">
              <Link to="api" className={`nav-link ${location.pathname === "/api" ? "active" : ""}`}>
              Api
            </Link>
          </li>
          <li className="nav-item">
            <Link to="about" className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}>
              About us
            </Link>
          </li>
          <li className="nav-item">
            <Link to="contact" className={`nav-link ${location.pathname === "/contact" ? "active" : ""}`}>
              Contact
            </Link>
          </li>
          </div>
          <div className='nav-center'>  
            <p>🌟 ¡Welcome to <span className="highlight">Dellta</span>!</p>
          </div>
          <div className='nav-rigth'>
          <li className="nav-item">
            <Link to="/sesion" className="nav-link">
              Admin
            </Link>
          </li>
          <li className="nav-item">
            <button className="nav-sesion" onClick={handleClick}>
            {isAuthenticated() ? "Entrar" : "Iniciar Sesión"}
            </button>
          </li>
          </div>


        </ul>
      </nav>
      <Sesion isOpen={isLoginOpen} onClose={() => setLoginOpen(false)}/>
      </div>
    <div className="page-container">

      {/* Main Content */}
      <main className="content">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Dellta. All rights reserved.</p>
      </footer>
    </div>
    </>
  )
}
