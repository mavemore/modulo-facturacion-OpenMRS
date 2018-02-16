import React from 'react';
import {Link} from 'react-router';
import request from 'superagent';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {buscarPaciente, getPaciente} from '../../api/serviciosPacientes';
import {instance} from '../../axios-orders';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
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
            pacienteSeleccionado: '',
            medico: '',
            ubicacion:'',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeInicio = this.handleChangeInicio.bind(this);
        this.handleChangeFin = this.handleChangeFin.bind(this);
        this.cambioArea = this.cambioArea.bind(this);
        this.searchPaciente = this.searchPaciente.bind(this);
        this.handleChangePaciente = this.handleChangePaciente.bind(this);
        this.getMedico = this.getMedico.bind(this);
        this.handleChangeMedico = this.handleChangeMedico.bind(this);
    }
    
    searchPaciente(query){
        return instance.get('/patient?q='+query)
        .then(
            (res) => {
                var resultado = [];
                if ('data' in res){
                    resultado = res.data.results.map((item) => ({
                        value: item.uuid,
                        label: item.display,
                    }));
                }
                return {options: resultado};
            }
        )
    }
    
    getMedico(){
        return instance.get('/session')
        .then(
            (res) => {
                var opciones = [{value: res.data.user.person.uuid, label: res.data.user.person.display}];
                return {options: opciones};
            }
        )
    }
    
    componentDidMount(){
        instance.get('/session')
        .then(
            (res) => {
                this.setState({medico: {value: res.data.user.person.uuid, label: res.data.user.person.display}});
            }
        )
    }
    
    handleChangeMedico(opcion){
        this.setState({medico:opcion});
    }
    
    handleChangePaciente(opcion){
        instance.get('/patient/'+opcion.value+'?v=full')
        .then(
            (res) => {
                this.setState({pacienteSeleccionado:opcion, ubicacion: res.data.identifiers[0].location.display});
            }
        )
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
        
    render() {
                                      
    const formArea = this.getArea(this.state.area);
    const { data } = this.state;
        const Style1 = {
            float: 'left',
		};
		const Style2 = {
            float: 'right',
		};
        
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
                        <Link to="/"><i className="icon-chevron-right link"></i>Modulo</Link>
                    </li>
                    <li>
                        <Link to="/ordenes"><i className="icon-chevron-right link"></i>Ordenes</Link>
                    </li>
                    <li>
                        <i className="icon-chevron-right link"></i>Nuevo
                    </li>
                </ul>
            </div>
        </section>
        <div>
      	<form onSubmit={this.generarOrden.bind(this)} id="formOrden">
        	<fieldset>
        		<legend>Datos Generales:</legend>
	        	<label> Paciente: </label>
                <Select.Async 
                autoload={false}
                name="paciente" 
                value={this.state.pacienteSeleccionado} 
                onChange={this.handleChangePaciente}
                loadOptions={this.searchPaciente}/>
                <label htmlFor="ubicacion">Ubicacion:</label>
                <input type='text' name="ubicacion" value={this.state.ubicacion} id="ubicacion" readOnly/>
                <br/>
                <label> Fecha: </label><DatePicker selected={this.state.date} onChange={this.handleChange}/>
                <label htmlFor="medico"> M&eacute;dico: </label>
                <Select.Async 
                autoload={false}
                name="medico" 
                value={this.state.medico} 
                onChange={this.handleChangeMedico}
                loadOptions={this.getMedico}
                disabled={true}
                />
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
      </div>
    )
  }
}