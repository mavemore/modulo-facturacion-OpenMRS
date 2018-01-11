import React from 'react';
import {Link} from 'react-router';
import request from 'superagent';

export default class Home extends React.Component {
  constructor(){
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
              if(location.localeCompare("Ordenes")==0){
                  this.props.router.replace("/ordenes");
              }else{
                  this.props.router.replace("/notfound");
              }
          }
      });
  }
  render() {
    var location = this.state.location;
    return (
      <div>
        <Link to="/ordenes"><button className="btn">Ordenes</button></Link>
        <Link to="/notfound"><button className="btn">Facturacion</button></Link>
        <Link to="/servicios"><button className="btn">Servicios</button></Link>
      </div>
    )
  }
}