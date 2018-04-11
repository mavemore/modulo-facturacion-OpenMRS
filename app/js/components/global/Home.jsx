import React from 'react';
import {Link} from 'react-router';
import request from 'superagent';
import Header from '../global/Header';
import FaClipboard from 'react-icons/lib/fa/clipboard';
import FaMoney from 'react-icons/lib/fa/money';
import FaAmbulance from 'react-icons/lib/fa/ambulance';
import {instance,registration_desk,inpatientWard_id,laboratory_id,pharmacy_id,admin_id} from '../../axios-orders';

export default class Home extends React.Component {
    constructor(props){
        super(props);
        this.state={
            lugar: '',
            user: '',
        };
    }
    
    componentDidMount(){
        instance.get('/v1/appui/session')
        .then(
            (res) => {
                var lugar = res.data.sessionLocation.uuid;
                instance.get('/v1/appui/session')
                .then(
                    (res2) => {
                        var user = res2.data.user.uuid;
                        this.setState({lugar: lugar, user:user});
                    }
                )
            }
        ).catch(
            (err) => {
                console.log(err);
            }
        )
    }
    
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
        { this.state.lugar != inpatientWard_id?null:
          <Link to="/ordenes/farmacia/nuevo" activeClassName="active">
            <button className="button big app"><i className="icon-medkit"></i>Nueva Orden Farmacia</button>
          </Link>}
            { this.state.lugar != inpatientWard_id?null:
          <Link to="/ordenes/imagenes/nuevo" activeClassName="active">
            <button className="button big app"><i className="icon-tasks"></i>Nueva Orden Imágenes</button>
          </Link>}
            { this.state.lugar != inpatientWard_id?null:
          <Link to="/ordenes/laboratorio/nuevo" activeClassName="active">
            <button className="button big app"><i className="icon-beaker"></i>Nueva Orden Laboratorio</button>
          </Link>}
            { this.state.lugar != inpatientWard_id?null:
          <Link to="/ordenes/cirugia/nuevo" activeClassName="active">
            <button className="button big app"><i className="icon-user-md"></i>Nueva Orden Cirugía</button>
          </Link>}
            { this.state.lugar != inpatientWard_id?null:
          <Link to="/ordenes/dietetica/nuevo" activeClassName="active">
            <button className="button big app"><i className="icon-food"></i>Nueva Orden Dietética</button>
          </Link>}
            { this.state.lugar != inpatientWard_id?null:
          <Link to="/ordenes/consultas/nuevo" activeClassName="active">
            <button className="button big app"><i className="icon-stethoscope"></i>Nueva Orden Interconsulta</button>
          </Link>}
          <Link to="/ordenes" activeClassName="active">
            <button className="button big app"><i className="icon-tasks"></i>Ordenes Nuevas</button>
          </Link>
          <Link to="/ordenes_atender" activeClassName="active">
            <button className="button big app"><i className="icon-ok"></i>Ordenes Aceptadas</button>
          </Link>
            { this.state.lugar != registration_desk?null:
          <Link to="/facturacion/orden" activeClassName="active">
            <button className="button big app"><i className="icon-money"></i>Facturación Ordenes</button>
          </Link>}
            { this.state.lugar != registration_desk?null:
          <Link to="/facturacion/rapida" activeClassName="active">
            <button className="button big app"><i className="icon-money"></i>Facturación Rápida</button>
          </Link>}
            { this.state.user != admin_id?null:
          <Link to="/servicios" activeClassName="active">
            <button className="button big app"><i className="icon-ambulance"></i>Administrar Servicios</button>
          </Link>}
        </div>
        {this.props.children}
    </div>
    )
  }
}