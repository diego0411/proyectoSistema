import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { eventosAtom} from '_state';
import { useUserActions } from '_actions';
import {string} from "yup";

export { List };

function List({ match }) {
    const { path } = match;
    const eventos = useRecoilValue(eventosAtom);
    const userActions = useUserActions();




    useEffect(() => {
        userActions.getEventoId(localStorage.getItem('idl'));

        return userActions.resetEventos;

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <h1>MIS EVENTOS</h1>
            <Link to={`${path}/add`}  className="btn btn-sm btn-success mb-2">AGREGAR EVENTO</Link>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th style={{ width: '30%' }}>nombre del evento</th>
                    <th style={{ width: '30%' }}>fecha</th>
                    <th style={{ width: '30%' }}>hora inicio</th>
                    <th style={{ width: '30%' }}>hora final</th>
                    <th style={{ width: '30%' }}>cantidad de personas adminitas</th>
                    <th style={{ width: '10%' }}></th>
                </tr>
                </thead>
                <tbody>
                {eventos?.map(evento =>
                    <>
                        <tr key={evento.id}>
                            <td>{evento.nombre}</td>
                            <td>{evento.fecha}</td>
                            <td>{evento.horaInicio}</td>
                            <td>{evento.horaFin}</td>
                            <td>{evento.cantidadPersonas}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${evento.id}`} className="btn btn-sm btn-primary mr-1">EDITAR</Link>
                                <Link to="/menus" onClick={() => userActions.saveDataEventos(evento.id)}  className="btn btn-sm btn-primary mr-1">MENUS</Link>
                                <Link to="/mesas" onClick={() => userActions.saveDataEventos(evento.id)}  className="btn btn-sm btn-primary mr-1">MESAS</Link>

                                <button onClick={() => userActions.deleteEvento(evento.id)} className="btn btn-sm btn-danger" style={{ width: '60px' }} disabled={evento.isDeleting}>
                                    {evento.isDeleting
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>ELIMINAR</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    </>
                )}
                {!eventos &&
                    <tr>
                        <td colSpan="4" className="text-center">
                            <span className="spinner-border spinner-border-lg align-center"></span>
                        </td>
                    </tr>
                }
                </tbody>
            </table>
        </div>
    );
}
