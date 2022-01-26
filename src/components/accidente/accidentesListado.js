import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Dialog } from 'primereact/dialog';


import { useNavigate } from 'react-router-dom';

import accidentesService from '../../services/accidentesService';

export default function AccidentesListado(props) {

    const [textoBusqueda, setTextoBusqueda] = useState("");
    const [accidentes, setAccidentes] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [accidenteActual, setAccidenteActual] = useState(null);
    const [dialogoBorrado, setDialogoBorrado] = useState(false);

    let navigate = useNavigate();


    useEffect(() => {
        accidentesService.buscarTodos().then(res => {
            setAccidentes(res.data);
            setCargando(false);
        });
    }, [dialogoBorrado]); // vincula la recarga a cambios en dialogoBorrado (para forzar la recarga despues de un borrado)


    function nuevoAccidente() {
        navigate("nuevo"); // navega a URL para creacion de nuevo Accidente
    }

    function editarAccidente(accidente) {
        navigate(accidente.id.toString()); // navega a URL del Accidente
    }

    function confirmarBorradoAccidente(accidente) {
        setAccidenteActual(accidente);
        setDialogoBorrado(true);
    }

    async function borrarAccidente() {
        await accidentesService.eliminar(accidenteActual.id).catch(error => {
            props.showError();
        });
        ocultarDialogoBorrado();
    }

    function ocultarDialogoBorrado() {
        setAccidenteActual(null);
        setDialogoBorrado(false);
    }

    function buscarPorProvincia() {
        setCargando(true);
        accidentesService.buscarPorProvincia(textoBusqueda).then(res => {
            setAccidentes(res.data);
            setCargando(false);
        });
    }

    function buscarPorCodigoPostal() {
        setCargando(true);
        accidentesService.buscarPorCodigoPostal(textoBusqueda).then(res => {
            setAccidentes(res.data);
            setCargando(false);
        });
    }

    function buscarPorDescripcion() {
        setCargando(true);
        accidentesService.buscarPorDescripcion(textoBusqueda).then(res => {
            setAccidentes(res.data);
            setCargando(false);
        });
    }
    

    function buscarTodos() {
        setCargando(true);
        accidentesService.buscarTodos().then(res => {
            setAccidentes(res.data);
            setCargando(false);
        });
    }

    function onBusquedaChange(e) {
        setTextoBusqueda(e.target.value);
    }


    function accionesAccidente(rowData) {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editarAccidente(rowData)} tooltip="Ver/editar el accidente" />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmarBorradoAccidente(rowData)} tooltip="Eliminar el accidente" />
            </React.Fragment>
        );
    }


    const pieDialogoBorrado = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={ocultarDialogoBorrado}  />
            <Button label="Si" icon="pi pi-check" className="p-button-text" onClick={borrarAccidente}  />
        </React.Fragment>
    );

    return (
        <div>
            <div className="text-3xl text-800 font-bold mb-4">Listado de accidentes</div>

            <div className="grid">
                <InputText id="busqueda" className="col-5 mr-2" onChange={onBusquedaChange} />
                <Button label="Buscar por provincia" className="col-1 mr-2" onClick={buscarPorProvincia} />
                <Button label="Buscar por codigoPostal" className="col-1 mr-2" onClick={buscarPorCodigoPostal} />
                <Button label="Buscar por contenido de Descripcion" className="col-1 mr-2" onClick={buscarPorDescripcion} />
                <Button label="Buscar todos" className="col-1 mr-2" onClick={buscarTodos} />
            </div>


            <div className="flex justify-content-end">
                <Button label="Nuevo accidente" icon="pi pi-plus" className="p-button-lg" onClick={nuevoAccidente} tooltip="Crear un nuevo accidente" tooltipOptions={{ position: 'bottom' }} />
            </div>


            {cargando && <div> <ProgressSpinner /> Cargando... </div>}

            <div className="surface-card p-4 border-round shadow-2">
                <DataTable value={accidentes} responsiveLayout="scroll" stripedRows emptyMessage="No hay accidentes que mostrar">
                    <Column field="id" header="Id" />
                    <Column field="descripcion" header="Descripcion" sortable />
                    <Column field="localizacion.provincia" header="Provincia" sortable />
                    <Column field="localizacion.codigoPostal" header="Código Postal" sortable />
                    <Column body={accionesAccidente} />
                </DataTable>
            </div>

            <Dialog visible={dialogoBorrado} style={{ width: '450px' }} header="Confirmar borrado" modal
                footer={pieDialogoBorrado} onHide={ocultarDialogoBorrado}>
                <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {accidenteActual && <span>Confirmar el borrado del accidente <b>{accidenteActual.descripcion}</b>?</span>}
                </div>
            </Dialog>

        </div>
    );
}