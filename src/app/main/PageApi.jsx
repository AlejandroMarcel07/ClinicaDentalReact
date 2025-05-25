import React from 'react'
import '../style/PageApi.css'
import IMAGEN04 from "../../assets/IMG-07.svg"


export function PageApi() {

    const spanStyle = {
        textShadow: '1px 1px 1px gray', // offsetX offsetY blurRadius color
        color: "#5f0dd1",
      };
  return (
        <div className='content-start'>
          <div className='start-left-api'>
            <div>
          <h1>
          <span style={{ color: "Black" }}>Conecta y expande tu aplicación con Dellta </span>
            <span style={spanStyle} >¡Api!</span>
          </h1>
          <p>
            Accede a herramientas avanzadas para gestionar pacientes, citas y más desde cualquier plataforma.
          </p>
          <div className='contenedor-doc'>
            <label>| Documentacion con:</label>
          <button className='btn-documentacion-01'>
            Redoc
          </button>
          <button className='btn-documentacion-02'>
            Swagger
          </button>
          </div>
          </div>
          </div>
          <div className='start-right-api'>
            <img src={IMAGEN04} alt='IMG-04' className='img-04' loading='lazy'/>
          </div>
        </div>
  )
}
