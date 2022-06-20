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
            <h1>Menus</h1>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th style={{ width: '30%' }}>menuId</th>
                    <th style={{ width: '30%' }}>nombre</th>
                    <th style={{ width: '10%' }}></th>
                </tr>
                </thead>
                <tbody>
                {menus?.map(menu =>
                    <>
                        <tr key={menu.id}>
                            <td>{menu.id}</td>
                            <td>{menu.nombre}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to="/itemsC" onClick={() => userActions.saveDataItem(menu.id)} className="btn btn-sm btn-primary mr-1">SELECCIONAR ITEM</Link>

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
