import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { authAtom } from '_state';
import { Nav, Alert, PrivateRoute } from '_components';
import { history } from '_helpers';
import { Home } from 'home';
import { Users } from 'users';
import { Account } from 'account';
import { Locales } from "./locales/Locales";
import { Eventos } from "./eventos/Eventos";
import { Menus } from "./menus/Menus";
import { Mesas } from "./mesas/Mesas";
import { Reservas } from "./reservas/Reservas";
import { Items } from "./items/Item";
import { Invitados } from "./invitados/Invitados";
import { Solicitudes } from "./solicitudes/Solicitudes";
import { ReclamosA } from "./reclamosA/ReclamosA";
import { Reclamos } from "./reclamos/Reclamos";
import { Planes } from "./planes/Planes";
import { LocalesC } from "./localesC/LocalesC";
import { EventosC } from "./eventoC/EventosC";
import { MesasC } from "./mesasC/MesasC";


export { App };

function App() {
    const auth = useRecoilValue(authAtom);

    return (
        <div className={'app-container' + (auth ? ' bg-light' : '')}>
            <Router history={history}>
                <Nav />
                <Alert />
                <Switch>
                    <PrivateRoute exact path="/" component={Home} />
                    <PrivateRoute path="/users" component={Users} />
                    <PrivateRoute path="/locales" component={Locales} />
                    <PrivateRoute path="/localesC" component={LocalesC} />
                    <PrivateRoute path="/eventos" component={Eventos} />
                    <PrivateRoute path="/eventosC" component={EventosC} />
                    <PrivateRoute path="/menus" component={Menus} />
                    <PrivateRoute path="/items" component={Items} />
                    <PrivateRoute path="/mesas" component={Mesas} />
                    <PrivateRoute path="/mesasC" component={MesasC} />
                    <PrivateRoute path="/invitados" component={Invitados} />
                    <PrivateRoute path="/reservas" component={Reservas} />
                    <PrivateRoute path="/solicitudes" component={Solicitudes} />
                    <PrivateRoute path="/reclamos" component={Reclamos} />
                    <PrivateRoute path="/reclamosA" component={ReclamosA} />
                    <PrivateRoute path="/planes" component={Planes} />
                    <Route path="/account" component={Account} />
                    <Redirect from="*" to="/" />
                </Switch>
            </Router>
        </div>
    );
}
