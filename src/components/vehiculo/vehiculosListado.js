import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Dialog } from 'primereact/dialog';


import { useNavigate } from 'react-router-dom';

import vehiculosService from '../../services/vehiculosService';

export default function VehiculosListado(props) {

    const [textoBusqueda, setTextoBusqueda] = useState("");
    const [vehiculos, setVehiculos] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [vehiculoActual, setVehiculoActual] = useState(null);
    const [dialogoBorrado, setDialogoBorrado] = useState(false);

    let navigate = useNavigate();


    useEffect(() => {
        vehiculosService.buscarTodos().then(res => {
            setVehiculos(res.data);
            setCargando(false);
        });
    }, [dialogoBorrado]); // vincula la recarga a cambios en dialogoBorrado (para forzar la recarga despues de un borrado)


    function nuevoVehiculo() {
        navigate("nuevo"); // navega a URL para creacion de nuevo cliente
    }

    function editarVehiculo(vehiculo) {
        //setPersonaActual(persona); // no necesario
        navigate(vehiculo.id.toString()); // navega a URL del cliente
    }

    function confirmarBorradoVehiculo(vehiculo) {
        setVehiculoActual(vehiculo);
        setDialogoBorrado(true);
    }

    async function borrarVehiculo() {
        await vehiculosService.eliminar(vehiculoActual.id).catch(error => {
            props.showError();
        });
        ocultarDialogoBorrado();
    }

    function ocultarDialogoBorrado() {
        setVehiculoActual(null);
        setDialogoBorrado(false);
    }

    function buscarPorModelo() {
        setCargando(true);
        vehiculosService.buscarPorModelo(textoBusqueda).then(res => {
            setVehiculos(res.data);
            setCargando(false);
        });
    }

    function buscarPorMatricula() {
        setCargando(true);
        vehiculosService.buscarPorMatricula(textoBusqueda).then(res => {
            setVehiculos(res.data);
            setCargando(false);
        });
    }

    function buscarPorConductorId() {
        setCargando(true);
        vehiculosService.buscarPorConductorId(textoBusqueda).then(res => {
            setVehiculos(res.data);
            setCargando(false);
        });
    }

    function buscarTodos() {
        setCargando(true);
        vehiculosService.buscarTodos().then(res => {
            setVehiculos(res.data);
            setCargando(false);
        });
    }

    function onBusquedaChange(e) {
        setTextoBusqueda(e.target.value);
    }


    function accionesVehiculo(rowData) {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editarVehiculo(rowData)} tooltip="Ver/editar el vehiculo" />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmarBorradoVehiculo(rowData)} tooltip="Eliminar el vehiculo" />
            </React.Fragment>
        );
    }


    const pieDialogoBorrado = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={ocultarDialogoBorrado}  />
            <Button label="Si" icon="pi pi-check" className="p-button-text" onClick={borrarVehiculo}  />
        </React.Fragment>
    );

    return (
        <div>
            <div className="text-3xl text-800 font-bold mb-4">Listado de vehiculos</div>

            <div className="grid">
                <InputText id="busqueda" className="col-6 mr-2" onChange={onBusquedaChange} />
                <Button label="Buscar por modelo" className="col-1 mr-2" onClick={buscarPorModelo} />
                <Button label="Buscar por matrícula" className="col-1 mr-2" onClick={buscarPorMatricula} />
                <Button label="Buscar por conductor id" className="col-1 mr-2" onClick={buscarPorConductorId} />
                <Button label="Buscar todos" className="col-1 mr-2" onClick={buscarTodos} />
            </div>


            <div className="flex justify-content-end">
                <Button label="Nueva vehiculo" icon="pi pi-plus" className="p-button-lg" onClick={nuevoVehiculo} tooltip="Crear un nuevo vehiculo" tooltipOptions={{ position: 'bottom' }} />
            </div>


            {cargando && <div> <ProgressSpinner /> Cargando... </div>}

            <div className="surface-card p-4 border-round shadow-2">
                <DataTable value={vehiculos} responsiveLayout="scroll" stripedRows emptyMessage="No hay vehiculos que mostrar">
                    <Column field="id" header="Id" />
                    <Column field="modelo" header="Modelo" sortable/>
                    <Column field="matricula" header="matrícula" sortable />
                    <Column field="conductor.id" header="Conductor Id" sortable />
                    <Column field="conductor.nombre" header="Nombre Conductor" sortable />
                    <Column body={accionesVehiculo} />
                </DataTable>
            </div>

            <Dialog visible={dialogoBorrado} style={{ width: '450px' }} header="Confirmar borrado" modal
                footer={pieDialogoBorrado} onHide={ocultarDialogoBorrado}>
                <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {vehiculoActual && <span>Confirmar el borrado de vehiculo <b>{vehiculoActual.matricula}</b>?</span>}
                </div>
            </Dialog>

        </div>
    );
}