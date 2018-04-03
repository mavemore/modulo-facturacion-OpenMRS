import React from 'react';
import {Link} from 'react-router';
import request from 'superagent';
import Header from '../global/Header';
import FaClipboard from 'react-icons/lib/fa/clipboard';
import FaMoney from 'react-icons/lib/fa/money';
import FaAmbulance from 'react-icons/lib/fa/ambulance';

export default class Home extends React.Component {
  render() {
    return (
    <div>
        <section>
            <div className="example">
                <ul id="breadcrumbs">
                    <li>
                        <a href="#">
                        <i className="icon-home small"></i></a>
                    </li>
                    <li>
                        <i className="icon-chevron-right link"></i>Modulo
                    </li>
                </ul>
            </div>
        </section>    
        <div role='nav'>
          <Link to="/ordenes/farmacia/nuevo" activeClassName="active">
            <button className="button big app"><i className="icon-medkit"></i>Nueva Orden Farmacia</button>
          </Link>
          <Link to="/ordenes/imagenes/nuevo" activeClassName="active">
            <button className="button big app"><i className="icon-tasks"></i>Nueva Orden Imágenes</button>
          </Link>
          <Link to="/ordenes/laboratorio/nuevo" activeClassName="active">
            <button className="button big app"><i className="icon-beaker"></i>Nueva Orden Laboratorio</button>
          </Link>
          <Link to="/ordenes/cirugia/nuevo" activeClassName="active">
            <button className="button big app"><i className="icon-user-md"></i>Nueva Orden Cirugía</button>
          </Link>
          <Link to="/ordenes/dietetica/nuevo" activeClassName="active">
            <button className="button big app"><i className="icon-food"></i>Nueva Orden Dietética</button>
          </Link>
          <Link to="/ordenes/consultas/nuevo" activeClassName="active">
            <button className="button big app"><i className="icon-stethoscope"></i>Nueva Orden Interconsulta</button>
          </Link>
          <Link to="/ordenes" activeClassName="active">
            <button className="button big app"><i className="icon-tasks"></i>Aceptar, Cancelar, Editar Ordenes</button>
          </Link>
          <Link to="/ordenes" activeClassName="active">
            <button className="button big app"><i className="icon-ok"></i>Atender Ordenes</button>
          </Link>
          <Link to="/facturacion/orden" activeClassName="active">
            <button className="button big app"><i className="icon-money"></i>Facturación Ordenes</button>
          </Link>
          <Link to="/facturacion/rapida" activeClassName="active">
            <button className="button big app"><i className="icon-money"></i>Facturación Rápida</button>
          </Link>
          <Link to="/servicios" activeClassName="active">
            <button className="button big app"><i className="icon-ambulance"></i>Administrar Servicios</button>
          </Link>
        </div>
        {this.props.children}
    </div>
    )
  }
}