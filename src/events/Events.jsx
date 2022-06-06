import React from "react";
import { Form, Button } from "react-bootstrap";
import {Link} from "react-router-dom";

function Events () {
    return (
        <div className="card m-3" style={{ maxWidth: '30vw', display: 'flex' }}>
            <h4 className="card-header">Registrar evento</h4>
            <div className="card-body">
                <form>
                    <div className="form-group" style={{ display: 'flex', flexDirection: 'column' , alignSelf: 'center'}}>
                        <label style={{ display: 'block' }}>nombre del evento</label>
                        <input style={{ maxWidth: '50%' }} name="evento" type="text"/>
                    </div>
                    <div className="form-group" style={{ display: 'flex', flexDirection: 'column' , alignSelf: 'center'}}>
                        <div>
                            <div className="row">
                                <div className="col-md-4">
                                    <label style={{ display: 'block' }}>hora de inicio del evento</label>
                                    <input style={{ maxWidth: '50%' }} name="horaInicio" type="text"/>
                                    <label style={{ display: 'block' }}>hora de finalizacion del evento</label>
                                    <input style={{ maxWidth: '50%' }} name="horaFinal" type="text"/>
                                    <label style={{ display: 'block' }}>fecha de evento</label>
                                    <input style={{ maxWidth: '50%' }} name="fechaEvento" type="text"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-group" style={{ display: 'flex', flexDirection: 'column' , alignSelf: 'center'}}>
                        <Form.Check type="checkbox" label="estado" />
                    </div>
                    <button className="btn btn-primary">
                        Registrar
                    </button>
                    <Link to="login" className="btn btn-link">Cancel</Link>
                </form>
            </div>
        </div>
    );
}

export { Events };