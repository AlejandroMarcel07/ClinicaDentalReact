import React, { useState, useEffect} from 'react';
import '../style/Sesion.css'
import IMAGEN03 from  "../../assets/IMG-09.svg"
import { IoLogInOutline } from "react-icons/io5";
import { AiOutlineCloseSquare } from "react-icons/ai";

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_ROUTES } from '../../services/Urls';

import { GetToken } from '../../services/TokenService';


const IcoBsFill = (
  <IoLogInOutline style={{color: "white", fontSize: "20px" }} />
);

const IcoClose= (
  <AiOutlineCloseSquare style={{color: "black", fontSize: "20px" }} />
);

export function Sesion({ isOpen, onClose }) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 
  const [isLoading, setIsLoading] = useState(false);  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); 
    try {
      const data = await GetToken(username, password);
      localStorage.setItem("access_token", data.access);

      const axiosInstance = axios.create({
        headers: {
          Authorization: `Bearer ${data.access}`,
         },
       });

       const domainResponse = await axiosInstance.get(API_ROUTES.GET_DOMAIN);
       const domain = domainResponse.data.domain; 
      
       localStorage.setItem('domain', domain);

       setTimeout(() => {
        navigate("/dashboard", { replace: true });
        setIsLoading(false); 
      }, 500);
    } catch (error) {
      setIsLoading(false); // Detiene la carga si hay error
      setErrorMessage("Verifica tus credenciales.");
      setTimeout(() => setErrorMessage(''), 5000);
    }
  };



  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
          {/* Mensaje de error dentro del modal y superpuesto */}
  {errorMessage && (
    <div className="error-bubble">
      {errorMessage}
    </div>
  )}
        <div className='modal-left'>
        <h2>| Inicia Sesión</h2>
        <p>Solo personal autorizado puede acceder.</p>
        <form onSubmit={handleSubmit}>
          <input type="text" disabled={isLoading} placeholder="Usuario" onChange={(e) => setUsername(e.target.value)} className='input-sesion' name='username' value={username}/>
          <input type="password" disabled={isLoading} placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} className='input-sesion' name='password' value={password}/>

          <div className='form-btn'>
          <button className='btn-sesion' disabled={isLoading} onClick={onClose} style={{background:"white", color:"black", border:"1px solid lightgray"}}>
          {IcoClose}
            Cancelar
            </button>
          <button type="submit"  className='btn-sesion' disabled={isLoading} style={{background:"#5f0dd1", color:"white"}}>
          {isLoading ? <span className="spinner"></span> : IcoBsFill}
          {isLoading ? "Cargando..." : "Ingresar"}
          </button>
          
          </div>
        </form>
        </div>
        <div className='modal-right'>
           <img src={IMAGEN03} alt='IMG-03' className='img-03'/>
        </div>

      </div>
    </div>
  )
}
