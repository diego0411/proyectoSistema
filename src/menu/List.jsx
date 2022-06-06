import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { usersAtom } from '_state';
import { useUserActions } from '_actions';
import { Item } from "./Item";

export { List };

function List({ match }) {
    const { path } = match;
    const users = useRecoilValue(usersAtom);
    const userActions = useUserActions();

    useEffect(() => {
        userActions.getAll();

        return userActions.resetUsers;

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <h1>Users</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">agregar Item</Link>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th style={{ width: '30%' }}>nombre</th>
                    <th style={{ width: '30%' }}>descripcion</th>
                    <th style={{ width: '30%' }}>precio</th>
                    <th style={{ width: '10%' }}></th>
                </tr>
                </thead>
                <tbody>
                {users?.map(user =>
                    <tr key={item.id}>
                        <td>{item.Name}</td>
                        <td>{item.Descrption}</td>
                        <td>{item.Precio}</td>
                        <td style={{ whiteSpace: 'nowrap' }}>
                            <Link to={`${path}/edit/${user.id}`} className="btn btn-sm btn-primary mr-1">editar</Link>
                            <button onClick={() => userActions.delete(user.id)} className="btn btn-sm btn-danger" style={{ width: '60px' }} disabled={user.isDeleting}>
                                {user.isDeleting
                                    ? <span className="spinner-border spinner-border-sm"></span>
                                    : <span>eliminar</span>
                                }
                            </button>
                        </td>
                    </tr>
                )}
                {!users &&
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