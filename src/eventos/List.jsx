import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import {localesAtom, usersAtom, eventosAtom} from '_state';
import { useUserActions } from '_actions';

export { List };

function List({ match }) {
    const { path } = match;
    const locales = useRecoilValue(localesAtom);
    const eventos = useRecoilValue(eventosAtom);
    const userActions = useUserActions();

    useEffect(() => {
        userActions.getAllEventos();

        return userActions.resetEventos;

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <h1>Eventos</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">agregar evento</Link>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th style={{ width: '30%' }}>nombre</th>
                    <th style={{ width: '30%' }}>fecha</th>
                    <th style={{ width: '30%' }}>hora inicio</th>
                    <th style={{ width: '30%' }}>hora final</th>
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
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${evento.id}`} className="btn btn-sm btn-primary mr-1">editar</Link>
                                <button onClick={() => userActions.deleteEventos(evento.id)} className="btn btn-sm btn-danger" style={{ width: '60px' }} disabled={evento.isDeleting}>
                                    {evento.isDeleting
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>eliminar</span>
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
