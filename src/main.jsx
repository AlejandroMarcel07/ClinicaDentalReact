import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PageHome } from './app/main/PageHome'
import { Dashboard } from './app/main/Dashboard';
import { Sesion } from './app/main/Sesion';
import { PageAbout } from './app/main/PageAbout';
import { PageContant } from './app/main/PageContant';
import { PageApi } from './app/main/PageApi';
import { Paciente } from './app/components/Paciente';
import { Cita } from './app/components/Cita';
import { ExploracionClinica } from './app/components/ExploracionClinica';
import { RecetaMedica } from './app/components/RecetaMedica';
import { HistorialClinico } from './app/components/HistorialClinico';
import { Facturacion } from './app/components/Facturacion';
import { TratamientoClinico } from './app/components/TratamientoClinico';
import { MontoDescuento } from './app/components/MontoDescuento';
import { Clinica } from './app/components/Clinica';
import { Usuario } from './app/components/Usuario';
import { CentroMando } from './app/components/CentroMando';
import { Estadistica } from './app/components/Estadistica';
import { Calendario } from './app/components/Calendario';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HeroUIProvider } from '@heroui/react';
import { PageWelcome } from './app/main/PageWelcome';
import { AuthRoute } from './services/AuthRoute';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HeroUIProvider>
      <Router>
        <Routes>
          <Route path='/' element={<PageHome/>}>
            <Route index element={<PageWelcome />} />
            <Route path="api" element={<PageApi />} />
            <Route path="contact" element={<PageContant />} />
            <Route path="about" element={<PageAbout />}/>
          </Route>
          <Route path='/sesion' element={<Sesion/>}/>
          <Route path='/dashboard' element={<AuthRoute><Dashboard/></AuthRoute>}>
            <Route index element={<Navigate to="centroMando" replace />} />
            
            <Route path="centroMando" element={<CentroMando />}>
              <Route path="paciente/:id" element={<Paciente />} />
            </Route>
            
            <Route path="exploracion" element={<ExploracionClinica />} />
            <Route path="tratamiento" element={<TratamientoClinico />} />
            <Route path="montoDescuento" element={<MontoDescuento />} />
            <Route path="clinica" element={<Clinica />} />
            <Route path="usuario" element={<Usuario />} />
            <Route path="estadistica" element={<Estadistica />} />
            <Route path="calendario" element={<Calendario />} />
          </Route>
        </Routes>
      </Router>
    </HeroUIProvider>
  </StrictMode>
)