import React from 'react';
import {Link} from 'react-router';
import request from 'superagent';
import FaClipboard from 'react-icons/lib/fa/clipboard';
import FaMoney from 'react-icons/lib/fa/money';
import FaAmbulance from 'react-icons/lib/fa/ambulance';
import '../../../css/index.css';
import axios from '../../axios-orders'

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
    axios.get('/person/37b2ab41-2631-4e31-855d-cfe48de811de')
        .then(function (response) {
            console.log('axios')
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    
    return (
    <div>
        <openmrs-breadcrumbs>Link</openmrs-breadcrumbs>
        <ul id="breadcrumbs">
              <li>
                  <a href="#">
                  <i class="icon-home small"></i></a>
              </li>
              <li>
                  <i class="icon-chevron-right link"></i>
                  <a href="#">Ramos, Glauber</a>
              </li>
              <li>
                  <i class="icon-chevron-right link"></i>Visits
              </li>
          </ul>
      <div role='nav'>
          <Link to="/ordenes" activeClassName="active"><button className='btnImg'><FaClipboard/><p className='labMod'>Ordenes</p></button></Link>
          <Link to="/notfound" activeClassName="active"><button className='btnImg'><FaMoney/><p className='labMod'>Facturacion</p></button></Link>
          <Link to="/servicios" activeClassName="active"><button className='btnImg'><FaAmbulance/><p className='labMod'>Servicios</p></button></Link>
        </div>
        {this.props.children}
    </div>
    )
  }
}