import React from 'react';
import {Link} from 'react-router';
import request from 'superagent';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {buscarPaciente, getPaciente} from '../../api/serviciosPacientes';
import {instance} from '../../axios-orders';

const selectRowProp = {
  mode: 'checkbox'
};

const options = {   // A hook for after insert rows
};

export default class FormOrdenes extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
            date: moment(),
            area: "farmacia",
            data:[],
            fechaInicio: moment(),
            fechaFin: moment(),
            list: [],
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeInicio = this.handleChangeInicio.bind(this);
        this.handleChangeFin = this.handleChangeFin.bind(this);
        this.cambioArea = this.cambioArea.bind(this);
        this.search = this.search.bind(this);
    }
    
    search(query){
        //var pacientes = buscarPaciente(query.target.value);
        //var persona = getPaciente('5b736682-1734-41cc-bef0-b57f3c058e4a');
        console.log('/patient?q='+query.target.value);
        instance.get('/patient?q='+query.target.value)
        .then(
            (res) => this.setState({list:res})
        ).catch(
            function(error){
                console.log(error);
            }
        );
    }
  
    generarOrden(e){
        e.getPreventDefault();
        
    }

    handleChange(date){
        this.setState({date:date});
    }
    
    handleChangeInicio(date){
        this.setState({fechaInicio:date});
    }
    
    handleChangeFin(date){
        this.setState({fechaFin:date});
    }
    
    cambioArea(area){
        this.setState({area: area.target.value});
    }
    
    getArea(area){
        const { data } = this.state.data;
        if(area=='farmacia'){
            return (
                <div>
                    <BootstrapTable data={data} insertRow={ true } deleteRow={ true } selectRow={ selectRowProp } options={ options }>
                      <TableHeaderColumn dataField='medicina'>Medicina</TableHeaderColumn>
                      <TableHeaderColumn dataField='codigo' editable={false} isKey>Codigo</TableHeaderColumn>
                      <TableHeaderColumn dataField='dosis'>Dosis</TableHeaderColumn>
                      <TableHeaderColumn dataField='cantidad'>Cantidad</TableHeaderColumn>
                      <TableHeaderColumn dataField='observaciones'>Observaciones</TableHeaderColumn>
                    </BootstrapTable>  
                </div>
            );
        }else if(area=='imagenes'){
            return(
                   <div>
                       <label htmlFor='examen'>Examen: </label>
                       <input type='text' name='examen' id='examen'/>
                       <label htmlFor='parteCuerpo'>Area Cuerpo: </label>
                       <input type='text' name='parteCuerpo' id='parteCuerpo'/>
                       <label htmlFor='indicaciones'>Indicaciones: </label>
                       <input type='textarea' name='indicaciones' id='indicaciones'/>
                   </div>);
        }else if(area=='laboratorio'){
            return(
                   <div>
                       <BootstrapTable data={data} insertRow={ true } deleteRow={ true } selectRow={ selectRowProp } options={ options }>
                          <TableHeaderColumn dataField='examen'>Examen</TableHeaderColumn>
                          <TableHeaderColumn dataField='idexamen' editable={false} isKey>Codigo</TableHeaderColumn>
                          <TableHeaderColumn dataField='muestra'>Muestra</TableHeaderColumn>
                          <TableHeaderColumn dataField='observaciones'>Observaciones</TableHeaderColumn>
                        </BootstrapTable>  
                   </div>);
        }else if(area=='cirugia'){
            return(
                   <div>
                       <label htmlFor='especialista'>Especialista: </label>
                       <input type='text' name='especialista' id='especialista'/>
                       <label htmlFor='parteCuerpo'>Area cirugia: </label>
                       <input type='text' name='parteCuerpo' id='parteCuerpo'/>
                       <label htmlFor='cirugia'>Cirugia: </label>
                       <input type='text' name='cirugia' id='cirugia'/>
                       <label htmlFor='diagnostico'>Diagnostico: </label>
                       <input type='textarea' name='diagnostico' id='diagnostico'/>
                   </div>);
        }else if(area=='interconsulta'){
            return(
                   <div>
                       <label htmlFor='especialista'>Especialista: </label>
                       <input type='text' name='especialista' id='especialista'/>
                       <label htmlFor='areesp'>Area: </label>
                       <input type='text' name='areesp' id='areesp'/>
                       <label htmlFor='diagnostico'>Diagnostico: </label>
                       <input type='textarea' name='diagnostico' id='diagnostico'/>
                   </div>);
        }else if(area=='dietetica'){
            return(
                   <div>
                        <label> Fecha Inicio: </label><DatePicker selected={this.state.fechaInicio} onChange={this.handleChangeInicio}/>
                        <label> Fecha Fin: </label><DatePicker selected={this.state.fechaFin} onChange={this.handleChangeFin}/>
                       <label htmlFor='paquete'>Paquete: </label>
                       <input type='text' name='paquete' id='paquete'/>
                       <label htmlFor='observaciones'>Observaciones: </label>
                       <input type='text' name='observaciones' id='observaciones'/>
                   </div>);
        }else{
            return null;
        }
    };
    
    getPersonas(list){
        var lista = [];
        if (list.length < 1 || list == undefined){
            lista = list;
        }else{
            lista=list.data.results;
        }
        
        return lista.map((item)=>(
            <tr key={item.uuid}>
                <td>{item.display}</td>
            </tr>
        ));
    }
    
    render() {
    
    /*var pacientes = [{uuid:'1721989364',name:'Veronica Moreira'},{uuid:'1304014382',name:'Juan Perez'}];
    var listaPaciente = pacientes.map(pacientes =>
        <option value="pacientes.uuid">{pacientes.name}</option>
    );
                                      
    var medicos = [{uuid:'1721989315',name:'Gonzalo Torres'},{uuid:'1721989356',name:'Maria Morevna'}];
    var listaMedicos = medicos.map(medicos =>
        <option value="medicos.uuid">{medicos.name}</option>
    );*/
                                      
    const formArea = this.getArea(this.state.area);
    const persons = this.getPersonas(this.state.list);
        
    return (
      <div>
            <table>
              <thead key="thead">
                  <tr><th>Nombre</th></tr>
              </thead>
              <tbody key="tbody">
                { persons }
              </tbody>
            </table>
      	<form onSubmit={this.generarOrden.bind(this)} id="formOrden">
        	<fieldset>
        		<legend>Datos Generales:</legend>
	        	<label htmlFor="paciente">Paciente:</label>
                <input type='text' name="paciente" id="paciente" onChange={this.search}/>
                <label htmlFor="ubicacion">Ubicacion:</label>
                <input type='text' name="ubicacion" id="ubicacion" readOnly/>
                <br/>
                <label> Fecha: </label><DatePicker selected={this.state.date} onChange={this.handleChange}/>
                <label htmlFor="medico"> M&eacute;dico: </label>
                <input type='text' name="medico" id="medico"/>
	        </fieldset>
	        <fieldset>
        		<legend>Detalles Orden:</legend>
	        	<label htmlFor="area"> Area de Servicio: </label>
                <select name="area" id="area" onChange={this.cambioArea}>
                    <option value="farmacia">Farmacia</option>
                    <option value="cirugia">Cirug&iacute;a</option>
                    <option value="laboratorio">Laboratorio</option>
                    <option value="imagenes">Centro de Im&aacute;genes</option>
                    <option value="interconsulta">Interconsulta</option>
                    <option value="dietetica">Diet&eacute;tica</option>
                </select>
	        </fieldset>
            {formArea}
            <Link to="/ordenes"><button className="btn" type="submit">Generar Orden</button></Link>
            <Link to="/ordenes"><button className="btn">Descartar</button></Link>
        </form>
      </div>
    )
  }
}