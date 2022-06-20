import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { invitadosAtom } from '_state';
import { useUserActions } from '_actions';

export { List };

function List({ match }) {
    const { path } = match;
    const invitados = useRecoilValue(invitadosAtom);
    const userActions = useUserActions();

    useEffect(() => {
        userActions.getInvitado();

        return userActions.resetInvitados;

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <h1>Invitados</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">agregar Invitado</Link>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th style={{ width: '30%' }}>nombre</th>
                    <th style={{ width: '30%' }}>apellido</th>
                    <th style={{ width: '30%' }}>CI</th>
                    <th style={{ width: '30%' }}>reservaId</th>
                    <th style={{ width: '10%' }}></th>
                </tr>
                </thead>
                <tbody>
                {invitados?.map(invitado =>
                    <tr key={invitado.id}>
                        <td>{invitado.nombre}</td>
                        <td>{invitado.apellidos}</td>
                        <td>{invitado.ci}</td>
                        <td>{invitado.reservaId}</td>
                        <td style={{ whiteSpace: 'nowrap' }}>
                            <Link to={`${path}/edit/${invitado.id}`} className="btn btn-sm btn-primary mr-1">editar</Link>
                            <button onClick={() => userActions.deleteInvitado(invitado.id)} className="btn btn-sm btn-danger" style={{ width: '60px' }} disabled={invitado.isDeleting}>
                                {invitado.isDeleting
                                    ? <span className="spinner-border spinner-border-sm"></span>
                                    : <span>eliminar</span>
                                }
                            </button>
                        </td>
                    </tr>
                )}
                {!invitados &&
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
