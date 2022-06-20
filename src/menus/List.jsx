import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import {menusAtom} from '_state';
import { useUserActions } from '_actions';

export { List };

function List({ match }) {
    const { path } = match;
    const menus = useRecoilValue(menusAtom);
    const userActions = useUserActions();

    useEffect(() => {
        userActions.getMenuId(localStorage.getItem('ide'));

        return userActions.resetMenus;

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <h1>MIS MENUS</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">AGREGAR MENU</Link>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th style={{ width: '30%' }}>menuId</th>
                    <th style={{ width: '30%' }}>nombre</th>
                    <th style={{ width: '30%' }}>localId</th>
                    <th style={{ width: '10%' }}></th>
                </tr>
                </thead>
                <tbody>
                {menus?.map(menu =>
                    <>
                        <tr key={menu.id}>
                            <td>{menu.id}</td>
                            <td>{menu.nombre}</td>
                            <td>{menu.localId}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${menu.id}`} className="btn btn-sm btn-primary mr-1">EDITAR</Link>
                                <Link to="/items" onClick={() => userActions.saveDataItem(menu.id)}  className="btn btn-sm btn-primary mr-1">AGREGAR ITEM</Link>
                                <button onClick={() => userActions.deleteMenu(menu.id)} className="btn btn-sm btn-danger" style={{ width: '60px' }} disabled={menu.isDeleting}>
                                    {menu.isDeleting
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>ELIMINAR</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    </>
                )}
                {!menus &&
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
