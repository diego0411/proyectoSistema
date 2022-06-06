import React from "react";
import { Form, Button } from "react-bootstrap";
import {Link} from "react-router-dom";

function Item () {
    return (
        <div className="card m-3" style={{ maxWidth: '30vw', display: 'flex' }}>
            <h4 className="card-header">Igresar Item</h4>
            <div className="card-body">
                <form>
                    <div className="form-group" style={{ display: 'flex', flexDirection: 'column' , alignSelf: 'center'}}>
                        <div>
                            <div className="row">
                                <div className="col-md-4">
                                    <label style={{ display: 'block' }}>nombre de producto</label>
                                    <input style={{ maxWidth: '50%' }} name="nombreItem" type="text"/>
                                    <label style={{ display: 'block' }}>descripcion</label>
                                    <input style={{ maxWidth: '50%' }} name="descripcionItem" type="text"/>
                                    <label style={{ display: 'block' }}>precio</label>
                                    <input style={{ maxWidth: '50%' }} name="precioItem" type="text"/>
                                </div>
                            </div>
                        </div>
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

export { Item };