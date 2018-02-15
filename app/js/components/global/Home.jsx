import React from 'react';
import {Link} from 'react-router';
import request from 'superagent';
import Header from '../global/Header';
import FaClipboard from 'react-icons/lib/fa/clipboard';
import FaMoney from 'react-icons/lib/fa/money';
import FaAmbulance from 'react-icons/lib/fa/ambulance';

export default class Home extends React.Component {
  /*constructor(){
      super();
      this.state={
          location: "",
      };
  }
    
  componentWillMount(){
     request.get('https://localhost:8080/openmrs/ws/rest/v1/appui/session')
      .then(function(response,err){
          if(err){
              alert(err.status);
          }else{
              var location = response.body.sessionLocation.name;
             console.log(response.body); if(location.localeCompare("Ordenes")==0){
                  this.props.router.replace("/ordenes");
              }else{
                  this.props.router.replace("/notfound");
              }
          }
      });
  }*/
  render() {
    //var location = this.state.location;
    
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
        <a className="button big app" href="#"><i className="icon-medical"></i>App button with big icon</a>

        <div role='nav'>
          <Link to="/ordenes" activeClassName="active"><button className='btnImg'><FaClipboard/><p className='labMod'>Ordenes</p></button></Link>
          <Link to="/notfound" activeClassName="active"><button className='btnImg'><FaMoney/><p className='labMod'>Facturacion</p></button></Link>
          <Link to="/servicios" activeClassName="active">
            <button className="button big app"><i className="icon-ambulance"></i>Servicios</button>
          </Link>
        </div>
        {this.props.children}
    </div>
    )
  }
}