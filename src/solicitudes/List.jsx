import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { solicitudesAtom } from '_state';
import { useUserActions } from '_actions';

export { List };

function List({ match }) {
    const { path } = match;
    const solicitudes = useRecoilValue(solicitudesAtom);
    const userActions = useUserActions();

    useEffect(() => {
        userActions.getSolicitud();

        return userActions.resetSolicitudes;

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <h1>Solicitud de Registro como Cliente</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">realizar solicitud</Link>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th style={{ width: '30%' }}>descripcion</th>
                    <th style={{ width: '10%' }}></th>
                </tr>
                </thead>
                <tbody>
                {solicitudes?.map(solicitud =>
                    <tr key={solicitud.id}>
                        <td>{solicitud.descripcion}</td>
                        <td style={{ whiteSpace: 'nowrap' }}>
                            <Link to={`${path}/edit/${solicitud.id}`} className="btn btn-sm btn-primary mr-1">editar</Link>
                            <Link to="/solicitudes" className="btn btn-sm btn-primary mr-1">solicitudes</Link>
                            <button onClick={() => userActions.deleteSolicitud(solicitud.id)} className="btn btn-sm btn-danger" style={{ width: '60px' }} disabled={solicitud.isDeleting}>
                                {solicitud.isDeleting
                                    ? <span className="spinner-border spinner-border-sm"></span>
                                    : <span>eliminar</span>
                                }
                            </button>
                        </td>
                    </tr>
                )}
                {!solicitudes &&
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
