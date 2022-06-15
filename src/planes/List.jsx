import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { planesAtom } from '_state';
import { useUserActions } from '_actions';

export { List };

function List({ match }) {
    const { path } = match;
    const planes = useRecoilValue(planesAtom);
    const userActions = useUserActions();

    useEffect(() => {
        userActions.getPlan();

        return userActions.resetPlanes;

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <h1>Planes</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add Plan</Link>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th style={{ width: '30%' }}>nombre</th>
                    <th style={{ width: '30%' }}>descripcion</th>
                    <th style={{ width: '30%' }}>precio</th>
                    <th style={{ width: '30%' }}>cantidadMeses</th>
                    <th style={{ width: '10%' }}></th>
                </tr>
                </thead>
                <tbody>
                {planes?.map(plan =>
                    <tr key={plan.id}>
                        <td>{plan.id}</td>
                        <td>{plan.nombre}</td>
                        <td>{plan.descripcion}</td>
                        <td>{plan.precio} <label>Bs.</label> </td>
                        <td>{plan.cantidadMeses}</td>
                        <td style={{ whiteSpace: 'nowrap' }}>
                            <Link to={`${path}/edit/${plan.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                            <button onClick={() => userActions.deletePlan(plan.id)} className="btn btn-sm btn-danger" style={{ width: '60px' }} disabled={plan.isDeleting}>
                                {plan.isDeleting
                                    ? <span className="spinner-border spinner-border-sm"></span>
                                    : <span>Delete</span>
                                }
                            </button>
                        </td>
                    </tr>
                )}
                {!planes &&
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
