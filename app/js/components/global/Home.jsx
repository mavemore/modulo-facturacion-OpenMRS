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
          <Link to="/ordenes" activeClassName="active">
            <button className="button big app"><i className="icon-clipboard"></i>Ordenes</button>
          </Link>
          <Link to="/notfound" activeClassName="active">
            <button className="button big app"><i className="icon-money"></i>Facturacion</button>
          </Link>
          <Link to="/servicios" activeClassName="active">
            <button className="button big app"><i className="icon-ambulance"></i>Servicios</button>
          </Link>
        </div>
        {this.props.children}
    </div>
    )
  }
}