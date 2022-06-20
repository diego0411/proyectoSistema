import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { mesasAtom } from '_state';
import { useUserActions } from '_actions';

export { List };

function List({ match }) {
    const { path } = match;
    const mesas = useRecoilValue(mesasAtom);
    const userActions = useUserActions();

    useEffect(() => {
        userActions.getMesaId(localStorage.getItem('ide'));

        return userActions.resetMesas;

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <h1>Mesas</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add Mesa</Link>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th style={{ width: '30%' }}>mesaId</th>
                    <th style={{ width: '30%' }}>Numero de Mesa</th>
                    <th style={{ width: '10%' }}></th>
                </tr>
                </thead>
                <tbody>
                {mesas?.map(mesa =>
                    <tr key={mesa.id}>
                        <td>{mesa.id}</td>
                        <td>{mesa.numeroMesa}</td>
                        <td style={{ whiteSpace: 'nowrap' }}>
                            <Link to={`${path}/edit/${mesa.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                            <button onClick={() => userActions.deleteMesa(mesa.id)} className="btn btn-sm btn-danger" style={{ width: '60px' }} disabled={mesa.isDeleting}>
                                {mesa.isDeleting
                                    ? <span className="spinner-border spinner-border-sm"></span>
                                    : <span>Delete</span>
                                }
                            </button>
                        </td>
                    </tr>
                )}
                {!mesas &&
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
