import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Dialog } from 'primereact/dialog';


import { useNavigate } from 'react-router-dom';

import multasService from '../../services/multasService';

export default function MultasListado(props) {

    const [textoBusqueda, setTextoBusqueda] = useState("");
    const [multas, setMultas] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [multaActual, setMultaActual] = useState(null);
    const [dialogoBorrado, setDialogoBorrado] = useState(false);

    let navigate = useNavigate();


    useEffect(() => {
        multasService.buscarTodos().then(res => {
            setMultas(res.data);
            setCargando(false);
        });
    }, [dialogoBorrado]); // vincula la recarga a cambios en dialogoBorrado (para forzar la recarga despues de un borrado)


    function nuevoMulta() {
        navigate("nuevo"); // navega a URL para creacion de nuevo multa
    }

    function editarMulta(multa) {
        //setPersonaActual(persona); // no necesario
        navigate(multa.id.toString()); // navega a URL del cliente
    }

    function confirmarBorradoMulta(multa) {
        setMultaActual(multa);
        setDialogoBorrado(true);
    }

    async function borrarMulta() {
        await multasService.eliminar(multaActual.id);
        ocultarDialogoBorrado();
    }

    function ocultarDialogoBorrado() {
        setMultaActual(null);
        setDialogoBorrado(false);
    }

    function buscarPorTipo() {
        setCargando(true);
        multasService.buscarPorTipo(textoBusqueda).then(res => {
            setMultas(res.data);
            setCargando(false);
        });
    }

    function buscarPorSancion() {
        setCargando(true);
        multasService.buscarPorSancion(textoBusqueda).then(res => {
            setMultas(res.data);
            setCargando(false);
        });
    }

    function buscarPorAccidenteId() {
        setCargando(true);
        multasService.buscarPorAccidenteId(textoBusqueda).then(res => {
            setMultas(res.data);
            setCargando(false);
        });
    }

    function buscarTodos() {
        setCargando(true);
        multasService.buscarTodos().then(res => {
            setMultas(res.data);
            setCargando(false);
        });
    }

    function onBusquedaChange(e) {
        setTextoBusqueda(e.target.value);
    }


    function accionesMulta(rowData) {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editarMulta(rowData)} tooltip="Ver/editar la multa" />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmarBorradoMulta(rowData)} tooltip="Eliminar la multa" />
            </React.Fragment>
        );
    }


    const pieDialogoBorrado = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={ocultarDialogoBorrado}  />
            <Button label="Si" icon="pi pi-check" className="p-button-text" onClick={borrarMulta}  />
        </React.Fragment>
    );

    return (
        <div>
            <div className="text-3xl text-800 font-bold mb-4">Listado de multas</div>

            <div className="grid">
                <InputText id="busqueda" className="col-6 mr-2" onChange={onBusquedaChange} />
                <Button label="Buscar por tipo" className="col-1 mr-2" onClick={buscarPorTipo} />
                <Button label="Buscar por sanción" className="col-1 mr-2" onClick={buscarPorSancion} />
                <Button label="Buscar por accidente Id" className="col-1 mr-2" onClick={buscarPorAccidenteId} />
                <Button label="Buscar todos" className="col-1 mr-2" onClick={buscarTodos} />
            </div>


            <div className="flex justify-content-end">
                <Button label="Nueva multa" icon="pi pi-plus" className="p-button-lg" onClick={nuevoMulta} tooltip="Crear una nueva multa" tooltipOptions={{ position: 'bottom' }} />
            </div>


            {cargando && <div> <ProgressSpinner /> Cargando... </div>}

            <div className="surface-card p-4 border-round shadow-2">
                <DataTable value={multas} responsiveLayout="scroll" stripedRows emptyMessage="No hay multas que mostrar">
                    <Column field="id" header="Id" />
                    <Column field="tipo" header="Tipo" sortable/>
                    <Column field="sancion" header="Sanción" sortable />
                    <Column field="accidente.id" header="Accidente Id" sortable />
                    <Column field="accidente.descripcion" header="Descripción del Accidente" sortable />
                    <Column body={accionesMulta} />
                </DataTable>
            </div>

            <Dialog visible={dialogoBorrado} style={{ width: '450px' }} header="Confirmar borrado" modal
                footer={pieDialogoBorrado} onHide={ocultarDialogoBorrado}>
                <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {multaActual && <span>Confirmar el borrado de multa <b>{multaActual.sancion}</b>?</span>}
                </div>
            </Dialog>

        </div>
    );
}