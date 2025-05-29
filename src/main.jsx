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
import { BrowserRouter as Router, Routes, Route, Navigate  } from 'react-router-dom';
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
            <Route index element={<Paciente />} /> 
            <Route path="paciente" element={<Paciente />} />
            <Route path="cita" element={<Cita />} />
            <Route path="exploracion" element={<ExploracionClinica />} />
            <Route path="receta" element={<RecetaMedica />} />
            <Route path="factura" element={<Facturacion />} />
            <Route path="historial" element={<HistorialClinico />} />
            <Route path="tratamiento" element={<TratamientoClinico />} />
          </Route>
        </Routes>
      </Router>
    </HeroUIProvider>
  </StrictMode>
)
