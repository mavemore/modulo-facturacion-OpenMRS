import React from 'react';
import {Link} from 'react-router';
import request from 'superagent';
import FaClipboard from 'react-icons/lib/fa/clipboard';
import FaMoney from 'react-icons/lib/fa/money';

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
      <div role='nav'>
          <Link to="/ordenes" activeClassName="active"><button className='btnImg'><FaClipboard/><p className='labMod'>Ordenes</p></button></Link>
          <Link to="/notfound" activeClassName="active"><button className='btnImg'><FaMoney/><p className='labMod'>Facturacion</p></button></Link>
          <Link to="/servicios"><button className="btn">Servicios</button></Link>
        </div>
        {this.props.children}
    </div>
    )
  }
}