import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { authAtom } from '_state';
import { Nav, Alert, PrivateRoute } from '_components';
import { history } from '_helpers';
import { Home } from 'home';
import { Users } from 'users';
import { Account } from 'account';
import { Locales } from "./locales/Locales";
import { Events } from "./events/Events";
import { Item } from "./menu/Item";

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
                    <Route path="/account" component={Account} />
                    <Route path="/eventos" component={Events} />
                    <Route path="/menu" component={Item} />
                    <Redirect from="*" to="/" />
                </Switch>
            </Router>
        </div>
    );
}
