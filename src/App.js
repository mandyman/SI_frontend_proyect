import {
  BrowserRouter,
  Routes,
  Route,
  NavLink
} from "react-router-dom";
import React, { useState, useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import Home from './components/home';


import PersonasListado from "./components/persona/personasListado";
import PersonasDetalle from "./components/persona/personasDetalle";

import VehiculosListado from "./components/vehiculo/vehiculosListado"
import VehiculosDetalle from "./components/vehiculo/vehiculosDetalle"

import AccidentesListado from "./components/accidente/accidentesListado"
import AccidentesDetalle from "./components/accidente/accidentesDetalle"

import MultasListado from "./components/multa/multasListado"
import MultasDetalle from "./components/multa/multasDetalle"

/*import ClientesListado from "./components/clientes/clientesListado";
import ClientesDetalle from "./components/clientes/clientesDetalle";

import FamiliasListado from "./components/familias/familiasListado";
import FamiliasDetalle from "./components/familias/familiasDetalle";

import ArticulosListado from "./components/articulos/articulosListado";
import ArticulosDetalle from "./components/articulos/articulosDetalle";

import AlmacenesListado from "./components/almacenes/almacenesListado";
import AlmacenesDetalle from "./components/almacenes/almacenesDetalle";
import AlmacenesInfo from "./components/almacenes/almacenesInfo";*/


import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './App.css';

function App() {
  const refvalues = {severity: 'error', summary: 'Error', detail: 'Error, comprueba si este valor es referenciado antes de borrarlo o modificarlo'}
  const toastRef = useRef();

  const notificationStyle = {
    zIndex: 9999,
  }

  const showErrorNotification = () => {
    toastRef.current.show(refvalues);
  }

  return (
    <div>
      <Toast style={notificationStyle} ref={toastRef} position="top-center"></Toast>
      <BrowserRouter>

        <nav className="flex">

        <NavLink to="/" className="px-5 py-3 no-underline text-900 text-xl border-bottom-2 border-300 hover:border-500">Home</NavLink>
        <NavLink to="/persona" className="px-5 py-3 no-underline text-700 text-xl border-bottom-2 border-300 hover:border-500">Personas</NavLink>
        <NavLink to="/vehiculo" className="px-5 py-3 no-underline text-700 text-xl border-bottom-2 border-300 hover:border-500">Veh??culos</NavLink>
        <NavLink to="/accidente" className="px-5 py-3 no-underline text-700 text-xl border-bottom-2 border-300 hover:border-500">Accidentes</NavLink>
        <NavLink to="/multa" className="px-5 py-3 no-underline text-700 text-xl border-bottom-2 border-300 hover:border-500">Multas</NavLink>
        </nav>

        <div className="p-5">
        
          <Routes>

          <Route path="/" element={<Home mensaje="P??gina principal" />} />
            <Route path="persona" >
              <Route index element={<PersonasListado showError={() => showErrorNotification()} />} />
              <Route path="nuevo" element={<PersonasDetalle />} />
              <Route path=":idPersona" element={<PersonasDetalle />} />
            </Route>

            <Route path="vehiculo" >
              <Route index element={<VehiculosListado showError={() => showErrorNotification()}/>} />
              <Route path="nuevo" element={<VehiculosDetalle />} />
              <Route path=":idVehiculo" element={<VehiculosDetalle />} />
            </Route>

            <Route path="accidente" >
              <Route index element={<AccidentesListado showError={() => showErrorNotification()}/>} />
              <Route path="nuevo" element={<AccidentesDetalle />} />
              <Route path=":idAccidente" element={<AccidentesDetalle />} />
            </Route>
            
            <Route path="multa" >
              <Route index element={<MultasListado showError={() => showErrorNotification()}/>} />
              <Route path="nuevo" element={<MultasDetalle />} />
              <Route path=":idMulta" element={<MultasDetalle />} />
            </Route>

          </Routes>
        </div>

      </BrowserRouter >
    </div >
  );
}

export default App;
