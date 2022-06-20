import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { itemsAtom } from '_state';
import { useUserActions } from '_actions';

export { List };

function List({ match }) {
    const { path } = match;
    const items = useRecoilValue(itemsAtom);
    const userActions = useUserActions();

    useEffect(() => {
        userActions.getItemId(localStorage.getItem('idm'));

        return userActions.resetItems;

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <h1>ITEMS</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">AGREGAR ITEM</Link>
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
                {items?.map(item =>
                    <tr key={item.id}>
                        <td>{item.nombre}</td>
                        <td>{item.descripcion}</td>
                        <td>{item.precio}<label>Bs.</label> </td>
                        <td style={{ whiteSpace: 'nowrap' }}>
                            <Link to={`${path}/edit/${item.id}`} className="btn btn-sm btn-primary mr-1">EDITAR</Link>
                            <button onClick={() => userActions.deleteItem(item.id)} className="btn btn-sm btn-danger" style={{ width: '60px' }} disabled={item.isDeleting}>
                                {item.isDeleting
                                    ? <span className="spinner-border spinner-border-sm"></span>
                                    : <span>ELIMINAR</span>
                                }
                            </button>
                        </td>
                    </tr>
                )}
                {!items &&
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
