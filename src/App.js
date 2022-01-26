import {
  BrowserRouter,
  Routes,
  Route,
  NavLink
} from "react-router-dom";

import Home from './components/home';


import PersonasListado from "./components/persona/personasListado";
import PersonasDetalle from "./components/persona/personasDetalle";

import VehiculosListado from "./components/vehiculo/vehiculosListado"
import VehiculosDetalle from "./components/vehiculo/vehiculosDetalle"

import AccidentesListado from "./components/accidente/accidentesListado"
import AccidentesDetalle from "./components/accidente/accidentesDetalle"

import MultasListado from "./components/multa/multasListado"
import MultasDetalle from "./components/multa/multasDetalle"

import ClientesListado from "./components/clientes/clientesListado";
import ClientesDetalle from "./components/clientes/clientesDetalle";

import FamiliasListado from "./components/familias/familiasListado";
import FamiliasDetalle from "./components/familias/familiasDetalle";

import ArticulosListado from "./components/articulos/articulosListado";
import ArticulosDetalle from "./components/articulos/articulosDetalle";

import AlmacenesListado from "./components/almacenes/almacenesListado";
import AlmacenesDetalle from "./components/almacenes/almacenesDetalle";
import AlmacenesInfo from "./components/almacenes/almacenesInfo";


import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
//import './App.css';

function App() {
  return (
    <div>

      <BrowserRouter>

        <nav className="flex">
        {/*
          <NavLink to="/" className="px-5 py-3 no-underline text-900 text-xl border-bottom-2 border-300 hover:border-500">Home</NavLink>
          <NavLink to="/clientes" className="px-5 py-3 no-underline text-700 text-xl border-bottom-2 border-300 hover:border-500">Clientes</NavLink>
          <NavLink to="/articulos" className="px-5 py-3 no-underline text-700 text-xl border-bottom-2 border-300 hover:border-500">Articulos</NavLink>
          <NavLink to="/familias" className="px-5 py-3 no-underline text-700 text-xl border-bottom-2 border-300 hover:border-500">Familias</NavLink>
          <NavLink to="/almacenes" className="px-5 py-3 no-underline text-700 text-xl border-bottom-2 border-300 hover:border-500">Almacenes</NavLink>
          <NavLink to="/pedidos" className="px-5 py-3 no-underline text-700 text-xl border-bottom-2 border-300 hover:border-500">Pedidos</NavLink>
        */}

        <NavLink to="/" className="px-5 py-3 no-underline text-900 text-xl border-bottom-2 border-300 hover:border-500">Home</NavLink>
        <NavLink to="/persona" className="px-5 py-3 no-underline text-700 text-xl border-bottom-2 border-300 hover:border-500">Personas</NavLink>
        <NavLink to="/vehiculo" className="px-5 py-3 no-underline text-700 text-xl border-bottom-2 border-300 hover:border-500">Vehículos</NavLink>
        <NavLink to="/accidente" className="px-5 py-3 no-underline text-700 text-xl border-bottom-2 border-300 hover:border-500">Accidentes</NavLink>
        <NavLink to="/multa" className="px-5 py-3 no-underline text-700 text-xl border-bottom-2 border-300 hover:border-500">Multas</NavLink>
        </nav>

        <div className="p-5">
        
          <Routes>

          <Route path="/" element={<Home mensaje="Página principal" />} />
            <Route path="persona" >
              <Route index element={<PersonasListado />} />
              <Route path="nuevo" element={<PersonasDetalle />} />
              <Route path=":idPersona" element={<PersonasDetalle />} />
            </Route>

            <Route path="vehiculo" >
              <Route index element={<VehiculosListado />} />
              <Route path="nuevo" element={<VehiculosDetalle />} />
              <Route path=":idVehiculo" element={<VehiculosDetalle />} />
            </Route>

            <Route path="accidente" >
              <Route index element={<AccidentesListado />} />
              <Route path="nuevo" element={<AccidentesDetalle />} />
              <Route path=":idAccidente" element={<AccidentesDetalle />} />
            </Route>

            
            <Route path="multa" >
              <Route index element={<MultasListado />} />
              <Route path="nuevo" element={<MultasDetalle />} />
              <Route path=":idMulta" element={<MultasDetalle />} />
            </Route>

          {/*
            <Route path="/" element={<Home mensaje="Página principal" />} />
            <Route path="clientes" >
              <Route index element={<ClientesListado />} />
              <Route path="nuevo" element={<ClientesDetalle />} />
              <Route path=":dniCliente" element={<ClientesDetalle />} />
            </Route>

            <Route path="articulos" >
              <Route index element={<ArticulosListado />} />
              <Route path="nuevo" element={<ArticulosDetalle />} />
              <Route path=":idArticulo" element={<ArticulosDetalle />} />
            </Route>

            <Route path="familias" >
              <Route index element={<FamiliasListado />} />
              <Route path="nuevo" element={<FamiliasDetalle />} />
              <Route path=":idFamilia" element={<FamiliasDetalle />} />
            </Route>

            <Route path="almacenes" >
              <Route index element={<AlmacenesListado />} />
              <Route path="nuevo" element={<AlmacenesInfo />} />
              <Route path=":idAlmacen" element={<AlmacenesDetalle />} />
            </Route>

            <Route path="pedidos" >
              <Route index element={<Home mensaje="Vista de Pedidos <pendiente>" />} />
              <Route path=":id" element={<Home mensaje="Detalle de un pedido <pendiente>" />} />
            </Route>*/}

          </Routes>
        </div>

      </BrowserRouter >
    </div >
  );
}

export default App;
