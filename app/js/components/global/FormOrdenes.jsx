import React from 'react';
import {Link} from 'react-router';
import request from 'superagent';

export default class FormOrdenes extends React.Component {
  
    generarOrden(e){
        e.preventDefault();
        this.props.router.replace("/ordenes");
    }
    
    componentWillMount(){
      request.get('https://localhost:8080/openmrs/ws/rest/v1/patient')
      .then(function(response,err){
          if(err){
              alert(err.status);
          }else{
              var pacientes = response.body;
              const listaPaciente = pacientes.map(pacientes =>
                    <option value="pacientes.uuid">{pacientes.person.names}</option>
            );
              
          }
      });
    }
    
    render() {
    return (
      <div>
      	<form onSubmit={this.generarOrden.bind(this)} id="formOrden">
        	<fieldset>
        		<legend>Datos Generales:</legend>
	        	<label htmlFor="paciente">Paciente:</label>
                <select name="paciente" id="paciente">{listaPaciente}</select>
	        	<label htmlFor="fechaCreacion"> Fecha: </label><input type="date" name="fechaCreacion" id="fechaCreacion"/>
	        	<label htmlFor="medico"> M&eacute;dico: </label><input type="text" name="medico" id="medico"/> 
	        </fieldset>
	        <fieldset>
        		<legend>Detalles Orden:</legend>
	        	<label htmlFor="area"> Area de Servicio: </label>
                <select name="area" id="area">
                    <option value="farmacia">Farmacia</option>
                    <option value="icu">ICU</option>
                    <option value="cirugia">Cirug&iacute;a</option>
                    <option value="laboratorio">Laboratorio</option>
                    <option value="imagenes">Centro de Im&aacute;genes</option>
                    <option value="interconsulta">Interconsulta</option>
                    <option value="dietetica">Diet&eacute;tica</option>
                </select>
	        </fieldset>
            <button type="submit">Generar Orden</button>
        </form>
      </div>
    )
  }
}