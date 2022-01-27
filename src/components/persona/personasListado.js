import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Dialog } from 'primereact/dialog';

import { useNavigate } from 'react-router-dom';

import personasService from '../../services/personasService';

export default function PersonasListado(props) {

    const [textoBusqueda, setTextoBusqueda] = useState("");
    const [personas, setPersonas] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [personaActual, setPersonaActual] = useState(null);
    const [dialogoBorrado, setDialogoBorrado] = useState(false);

    let navigate = useNavigate();

    useEffect(() => {
        personasService.buscarTodos().then(res => {
            setPersonas(res.data);
            setCargando(false);
        });

    }, [dialogoBorrado]); // vincula la recarga a cambios en dialogoBorrado (para forzar la recarga despues de un borrado)


    function nuevoPersona() {
        navigate("nuevo"); // navega a URL para creacion de nuevo Persona
    }

    function editarPersona(persona) {
        navigate(persona.id.toString()); // navega a URL del Persona
    }

    function confirmarBorradoPersona(persona) {
        setPersonaActual(persona);
        setDialogoBorrado(true);
    }

    async function borrarPersona() {
        await personasService.eliminar(personaActual.id).catch(error => {
            props.showError();
        });
        ocultarDialogoBorrado();
    }

    function ocultarDialogoBorrado() {
        setPersonaActual(null);
        setDialogoBorrado(false);
    }

    function buscarPorDNI() {
        setCargando(true);
        personasService.buscarPorDNI(textoBusqueda).then(res => {
            setPersonas(res.data);
            setCargando(false);
        });
    }

    function buscarPorNombre() {
        setCargando(true);
        personasService.buscarPorNombre(textoBusqueda).then(res => {
            setPersonas(res.data);
            setCargando(false);
        });
    }

    function buscarPorApellidos() {
        setCargando(true);
        personasService.buscarPorApellidos(textoBusqueda).then(res => {
            setPersonas(res.data);
            setCargando(false);
        });
    }

    function buscarPorProvincia() {
        setCargando(true);
        personasService.buscarPorProvincia(textoBusqueda).then(res => {
            setPersonas(res.data);
            setCargando(false);
        });
    }

    function buscarPorCodigoPostal() {
        setCargando(true);
        personasService.buscarPorCodigoPostal(textoBusqueda).then(res => {
            setPersonas(res.data);
            setCargando(false);
        });
    }
    

    function buscarTodos() {
        setCargando(true);
        personasService.buscarTodos().then(res => {
            setPersonas(res.data);
            setCargando(false);
        });
    }

    function onBusquedaChange(e) {
        setTextoBusqueda(e.target.value);
    }


    function accionesPersona(rowData) {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editarPersona(rowData)} tooltip="Ver/editar la persona" />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmarBorradoPersona(rowData)} tooltip="Eliminar la persona" />
            </React.Fragment>
        );
    }


    const pieDialogoBorrado = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={ocultarDialogoBorrado}  />
            <Button label="Si" icon="pi pi-check" className="p-button-text" onClick={borrarPersona}  />
        </React.Fragment>
    );

    return (
        <div>
            <div className="text-3xl text-800 font-bold mb-4">Listado de personas</div>

            <div className="grid">
                <InputText id="busqueda" className="col-5 mr-2" onChange={onBusquedaChange} />
                <Button label="Buscar por dni" className="col-1 mr-2" onClick={buscarPorDNI} />
                <Button label="Buscar por nombre" className="col-1 mr-2" onClick={buscarPorNombre} />
                <Button label="Buscar por apellidos" className="col-1 mr-2" onClick={buscarPorApellidos} />
                <Button label="Buscar por provincia" className="col-1 mr-2" onClick={buscarPorProvincia} />
                <Button label="Buscar por codigoPostal" className="col-1 mr-2" onClick={buscarPorCodigoPostal} />
                <Button label="Buscar todos" className="col-1 mr-2" onClick={buscarTodos} />
            </div>


            <div className="flex justify-content-end">
                <Button label="Nueva persona" icon="pi pi-plus" className="p-button-lg" onClick={nuevoPersona} tooltip="Crear una nueva persona" tooltipOptions={{ position: 'bottom' }} />
            </div>


            {cargando && <div> <ProgressSpinner /> Cargando... </div>}

            <div className="surface-card p-4 border-round shadow-2">
                <DataTable value={personas} responsiveLayout="scroll" stripedRows emptyMessage="No hay personas que mostrar">
                    <Column field="id" header="Id" />
                    <Column field="dni" header="DNI" />
                    <Column field="nombre" header="Nombre" sortable />
                    <Column field="apellidos" header="Apellidos" sortable />
                    <Column field="direccion.domicilio" header="Domicilio" sortable />
                    <Column field="direccion.localidad" header="Localidad" sortable />
                    <Column field="direccion.codigoPostal" header="Código Postal" sortable />
                    <Column field="direccion.provincia" header="Provincia" sortable />
                    <Column body={accionesPersona} />
                </DataTable>
            </div>

            <Dialog visible={dialogoBorrado} style={{ width: '450px' }} header="Confirmar borrado" modal
                footer={pieDialogoBorrado} onHide={ocultarDialogoBorrado}>
                <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {personaActual && <span>Confirmar el borrado de persona <b>{personaActual.nombre}</b>?</span>}
                </div>
            </Dialog>

        </div>
    );
}