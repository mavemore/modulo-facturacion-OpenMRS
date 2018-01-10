import React from 'react';
import {Link} from 'react-router';
import request from 'superagent';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

export default class FormOrdenes extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
            date: moment(),
            area: "farmacia",
        };
        this.handleChange = this.handleChange.bind(this);
    }
  
    generarOrden(e){
        e.preventDefault();
        
    }

    handleChange(date){
        this.setState({date:date});
    }
    
    /*componentWillMount(){
      request.get('https://localhost:8080/openmrs/ws/rest/v1/patient')
      .then(function(response,err){
          console.log(response.body);
          if(err){
              alert(err.status);
          }else{
              var pacientes = response.body;
              const listaPaciente = pacientes.map(pacientes =>
                    <option value="pacientes.uuid">{pacientes.person.names}</option>
            );
              
          }
      });
    }*/
    
    render() {
    
    var pacientes = [{uuid:'1721989364',name:'Veronica Moreira'},{uuid:'1304014382',name:'Juan Perez'}];
    var listaPaciente = pacientes.map(pacientes =>
        <option value="pacientes.uuid">{pacientes.name}</option>
    );
                                      
    var medicos = [{uuid:'1721989315',name:'Gonzalo Torres'},{uuid:'1721989356',name:'Maria Morevna'}];
    var listaMedicos = medicos.map(medicos =>
        <option value="medicos.uuid">{medicos.name}</option>
    );
                                      
    /*const formArea = function(this.state.area){
        if(this.state.area=='farmacia'){
            return (<div><label htmlFor='medicina'>Medicina: </label><input type='text' name='medicina' id='medicina'/></div>);
        }else if(this.state.area=='icu'){
               return (<div><label htmlFor='insumo'>Insumo: </label><input type='text' name='insumo' id='insumo'/></div>);
        }else{
            return null;
        }
    }*/
                                                  
    return (
      <div>
      	<form onSubmit={this.generarOrden.bind(this)} id="formOrden">
        	<fieldset>
        		<legend>Datos Generales:</legend>
	        	<label htmlFor="paciente">Paciente:</label>
                <select name="paciente" id="paciente">{listaPaciente}</select>
                <br/>
                <label> Fecha: <DatePicker selected={this.state.date} onChange={this.handleChange}/></label>
	        	<label htmlFor="medico"> M&eacute;dico: </label>
                <select name="medico" id="medico">{listaMedicos}</select>
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
            
            <Link to="/ordenes"><button className="btn" type="submit">Generar Orden</button></Link>
            <Link to="/ordenes"><button className="btn">Descartar</button></Link>
        </form>
      </div>
    )
  }
}