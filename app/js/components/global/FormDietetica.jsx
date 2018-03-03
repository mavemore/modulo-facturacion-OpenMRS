import React from 'react';
import {Link} from 'react-router';
import request from 'superagent';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {instance} from '../../axios-orders';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
const selectRowProp = {
  mode: 'checkbox'
};

const options = {   // A hook for after insert rows
};

export default class FormDietetica extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
            date: moment(),
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
        this.searchPaciente = this.searchPaciente.bind(this);
        this.handleChangePaciente = this.handleChangePaciente.bind(this);
        this.getMedico = this.getMedico.bind(this);
        this.handleChangeMedico = this.handleChangeMedico.bind(this);
    }
    
    searchPaciente(query){
        return instance.get('/v1/patient?q='+query)
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
        return instance.get('/v1/session')
        .then(
            (res) => {
                var opciones = [{value: res.data.user.person.uuid, label: res.data.user.person.display}];
                return {options: opciones};
            }
        )
    }
    
    componentDidMount(){
        instance.get('/v1/session')
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
        instance.get('/v1/patient/'+opcion.value+'?v=full')
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
        
    render() {
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
                    <legend>Informacion Dietetica:</legend>
                    <label> Fecha Inicio: </label><DatePicker selected={this.state.fechaInicio} onChange={this.handleChangeInicio}/>
                    <label> Fecha Fin: </label><DatePicker selected={this.state.fechaFin} onChange={this.handleChangeFin}/>
                   <label htmlFor='paquete'>Paquete: </label>
                   <input type='text' name='paquete' id='paquete'/>
                   <label htmlFor='observaciones'>Observaciones: </label>
                   <input type='text' name='observaciones' id='observaciones'/>
               </fieldset>
                <div>
                    <Link to="/"><button className="btn" type="submit">Generar Orden</button></Link>
                    <Link to="/"><button className="btn">Descartar</button></Link>
                </div>
            </form>
        </div>
    </div>
    )
  }
}