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
                <NavLink to="/locales" className="nav-item nav-link">locales</NavLink>
                <NavLink to="/eventos" className="nav-item nav-link">eventos</NavLink>
                <NavLink to="/menu" className="nav-item nav-link">menu</NavLink>
                <a onClick={userActions.logout} className="nav-item nav-link">Logout</a>
            </div>
        </nav>
    );
}
