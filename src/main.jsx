import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PageHome } from './app/main/PageHome'
import { Dashboard } from './app/main/Dashboard';
import { Sesion } from './app/main/Sesion';
import { PageAbout } from './app/main/PageAbout';
import { PageContant } from './app/main/PageContant';
import { PageApi } from './app/main/PageApi';
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
        <Route path="about" element={<PageAbout />} />
        </Route>
        <Route path='/sesion' element={<Sesion/>}/>
        <Route path='/dashboard' element={<AuthRoute><Dashboard/></AuthRoute>}/>
        </Routes>
      </Router>
  </HeroUIProvider>
  </StrictMode>,
)
