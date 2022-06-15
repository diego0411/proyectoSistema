import React from 'react';
import { Route, Switch } from 'react-router-dom';

import {  AddEdit } from './AddEdit';
import {List} from './List';

export { ReclamosA };

function ReclamosA({ match }) {
    const { path } = match;

    return (
        <div className="p-4">
            <div className="container">
                <Switch>
                    <Route exact path={path} component={List} />
                    <Route path={`${path}/add`} component={AddEdit} />
                    <Route path={`${path}/edit/:id`} component={AddEdit} />
                </Switch>
            </div>
        </div>
    );
}
