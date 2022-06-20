import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { reservasAtom } from '_state';
import { useUserActions } from '_actions';

export { List };

function List({ match }) {
    const { path } = match;
    const reservas = useRecoilValue(reservasAtom);
    const userActions = useUserActions();

    useEffect(() => {
        userActions.getReserva();
        return userActions.resetReservas;

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <h1>MIS RESERVAS</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">REALIZAR RESERVA</Link>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th style={{ width: '30%' }}>id</th>
                    <th style={{ width: '30%' }}>hora</th>
                    <th style={{ width: '30%' }}>cantidadInvitados</th>
                    <th style={{ width: '30%' }}>mesaId</th>
                    <th style={{ width: '30%' }}>usuarioId</th>
                    <th style={{ width: '30%' }}>invitados</th>
                    <th style={{ width: '10%' }}></th>
                </tr>
                </thead>
                <tbody>
                {reservas?.map(reserva =>
                    <tr key={reserva.id}>
                        <td>{reserva.id}</td>
                        <td>{reserva.hora}</td>
                        <td>{reserva.cantidadInvitados}</td>
                        <td>{reserva.mesaId}</td>
                        <td>{reserva.usuarioId}</td>
                        <td>{reserva.invitados}</td>
                        <td style={{ whiteSpace: 'nowrap' }}>
                            <Link to="/invitados" onClick={() => userActions.saveDataReserva(reserva.id)}  className="btn btn-sm btn-primary mr-1">AGREGAR INVITADO</Link>
                            <Link to={`${path}/edit/${reserva.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                            <button onClick={() => userActions.delete(reserva.id)} className="btn btn-sm btn-danger" style={{ width: '60px' }} disabled={reserva.isDeleting}>
                                {reserva.isDeleting
                                    ? <span className="spinner-border spinner-border-sm"></span>
                                    : <span>Delete</span>
                                }
                            </button>
                        </td>
                    </tr>
                )}
                {!reservas &&
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
