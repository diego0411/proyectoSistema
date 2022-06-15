import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { reclamosAtom } from '_state';
import { useUserActions } from '_actions';

export { List };

function List({ match }) {
    const { path } = match;
    const reclamos = useRecoilValue(reclamosAtom);
    const userActions = useUserActions();

    useEffect(() => {
        userActions.getReclamo();

        return userActions.resetReclamos;

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return(
        <div>
            <div>
                <h1> RECLAMOS REALIZADOS</h1>

            </div>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th style={{ width: '30%' }}>usuarioId</th>
                    <th style={{ width: '30%' }}>asunto</th>
                    <th style={{ width: '30%' }}>descripcion</th>
                    <th style={{ width: '10%' }}></th>
                </tr>
                </thead>
                <tbody>
                {reclamos?.map(reclamo =>
                    <tr key={reclamo.id}>
                        <td>{reclamo.usuarioId}</td>
                        <td>{reclamo.asunto}</td>
                        <td>{reclamo.descripcion}</td>
                        <td style={{ whiteSpace: 'nowrap' }}>
                            <Link to={`${path}/edit/${reclamo.id}`} className="btn btn-sm btn-primary mr-1">editar</Link>
                            <Link to="/reclamos" className="btn btn-sm btn-primary mr-1">reclamos</Link>
                            <button onClick={() => userActions.deleteReclamo(reclamo.id)} className="btn btn-sm btn-danger" style={{ width: '60px' }} disabled={reclamo.isDeleting}>
                                {reclamo.isDeleting
                                    ? <span className="spinner-border spinner-border-sm"></span>
                                    : <span>eliminar</span>
                                }
                            </button>
                        </td>
                    </tr>
                )}
                {!reclamos &&
                    <tr>
                        <td colSpan="4" className="text-center">
                            <span className="spinner-border spinner-border-lg align-center"></span>
                        </td>
                    </tr>
                }
                </tbody>
            </table>
        </div>
    );}