import { NavLink } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { authAtom } from '_state';
import { useUserActions } from '_actions';

export { Nav };

function Nav() {
    const auth = useRecoilValue(authAtom);
    const userActions = useUserActions();

    // only show nav when logged in
    if (!auth) return null;
    
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav">
                <NavLink exact to="/" className="nav-item nav-link">inicio</NavLink>
                <NavLink to="/users" className="nav-item nav-link">usuarios</NavLink>
                <NavLink to="/reclamosA" className="nav-item nav-link">reclamosA</NavLink>
                <NavLink to="/locales" className="nav-item nav-link">locales</NavLink>
                <NavLink to="/eventos" className="nav-item nav-link">eventos</NavLink>
                <NavLink to="/mesas" className="nav-item nav-link">mesas</NavLink>
                <NavLink to="/reclamos" className="nav-item nav-link">reclamos</NavLink>
                <NavLink to="/localesC" className="nav-item nav-link">localesC</NavLink>
                <NavLink to="/eventosC" className="nav-item nav-link">eventosC</NavLink>
                <NavLink to="/mesasC" className="nav-item nav-link">mesasC</NavLink>
                <NavLink to="/menus" className="nav-item nav-link">menus</NavLink>
                <NavLink to="/items" className="nav-item nav-link">items</NavLink>
                <NavLink to="/mesasC" className="nav-item nav-link">mesasC</NavLink>
                <NavLink to="/reservas" className="nav-item nav-link">reservas</NavLink>
                <NavLink to="/invitados" className="nav-item nav-link">Invitados</NavLink>
                <a onClick={userActions.logout} className="nav-item nav-link">Logout</a>
            </div>
        </nav>
    );
}
