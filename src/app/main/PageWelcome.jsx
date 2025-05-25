import React from 'react'
import { FaUsers } from "react-icons/fa";
import { TbMessageReportFilled } from "react-icons/tb";
import { BsFillCalendarDateFill } from "react-icons/bs";
import IMAGEN01 from "../../assets/IMG-01.svg"
import IMAGEN03 from  "../../assets/IMG-03.svg"
import '../style/PageHome.css'


const IcoFaUser = (
  <FaUsers style={{color: "#5f0dd1", fontSize: "30px", marginBottom:"10px" }} />
);

const IcoTbMessage = (
  <TbMessageReportFilled style={{color: "#5f0dd1", fontSize: "30px", marginBottom:"10px" }} />
);

const IcoBsFill = (
  <BsFillCalendarDateFill style={{color: "#5f0dd1", fontSize: "25px", marginBottom:"10px" }} />
);


export function PageWelcome() {

    const spanStyle = {
        textShadow: '1px 1px 1px gray', // offsetX offsetY blurRadius color
        color: "#5f0dd1",
      };

  return (
        <>
        <div className='content-start'>
          <div className='start-left'>
            <div>
          <h1>
          <span style={{ color: "Black" }}> Descubre cómo nuestro </span>
            <span style={spanStyle} >¡Sistema!</span>

            <span style={{ color: "Black" }}> revolucionará tu clinica 🚀</span>


          </h1>
          <p>
            Simplifica tus procesos administrativos y mejora la atención al paciente con Dellta.
          </p>
          </div>
          </div>
          <div className='start-right'>
            <img src={IMAGEN01} alt='IMG-01' className='img-01'/>
          </div>
        </div>
        <div className='content-third'>
          <div className='third-1'>

              <div className='C-third-1'>
                  <div className='I-third-1'>
                    {IcoFaUser}
                    <h5>Manejo de pacientes</h5>
                    <p>Resgistra, edita y organiza la información de tus pacientes en un solo lugar de manera mas eficiente.</p>
                  </div>
              </div>
              
          </div>
          <div className='third-2'>
          <div className='C-third-2'>
                  <div className='I-third-2'>
                  {IcoBsFill}
                  <h5>Agenda citas</h5>
                  <p>Puedes visualizar de forma mas clara tu agenda diaria y programar horarios de citas de tus pacientes.</p>
                  </div>
              </div>
          </div>
          <div className='third-3'>
          <div className='C-third-3'>
                  <div className='I-third-3'>
                  {IcoTbMessage}
                  <h5>Reportes y análisis</h5>
                  <p>Obten informes detallados sobre el historial clinico y tratamientos de tus pacientes con presición.</p>
                  </div>
              </div>
          </div>
          <div className='third-4'>
          <div className='C-third-4'>
                  <h5>¡Caracteristicas!</h5>
                  <p>Descubre algunas de las funciones y herramientas diseñadas para facilitar tu gestión de tu clínica.</p>
              </div>
          </div>
        </div>
        <div className='content-second'>
          <div className='second-title'>
          <div className='second-left'>
              <label></label>
          </div>
          <div className='second-right'>
            <label></label>
          </div>
          </div>
          <div className='second-question'>
            <div className='question-left'>
                <img src={IMAGEN03} alt='IMG-03' className='img-03'/>
            </div>
            <div className='question-rigth'>
              <h5>¿Cuales son los beneficios que Dellta trae para tu clinica?</h5>
              <p>Gestión eficiente de citas: Permite agendar y gestionar citas de manera rápida y sin complicaciones.</p>
              <p>Acceso fácil al historial clínico: Accede a los historiales clínicos de tus pacientes de manera segura y organizada.</p>
              <p>Facturación simplificada: Genera facturas electrónicas en minutos con toda la información relevante.</p>
              <p>Seguridad y privacidad: Protege la información de tus pacientes con medidas de seguridad avanzadas.</p>
            </div>
          </div>
        </div>
        </>
  )
}
