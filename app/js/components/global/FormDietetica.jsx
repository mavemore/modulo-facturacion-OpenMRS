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
            observaciones:'',
            paquete:'',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeInicio = this.handleChangeInicio.bind(this);
        this.handleChangeFin = this.handleChangeFin.bind(this);
        this.searchPaciente = this.searchPaciente.bind(this);
        this.handleChangePaciente = this.handleChangePaciente.bind(this);
        this.getMedico = this.getMedico.bind(this);
        this.handleChangeMedico = this.handleChangeMedico.bind(this);
        this.handleChangeObs = this.handleChangeObs.bind(this);
        this.searchPaquete = this.searchPaquete.bind(this);
        this.handleChangePaquete = this.handleChangePaquete.bind(this);
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
        //return instance.get('/v1/session')
        return instance.get('/v1/provider')
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
    
    componentDidMount(){
        var resultado = [];
        var idMedico = '';
        var medicoObj = {};
        instance.get('/v1/provider?v=full')
        .then(
            (res) => {
                if ('data' in res){
                    resultado = res.data.results.map((item) => ({
                        value: item.uuid,
                        label: item.display,
                        person: item.person.uuid,
                    }));
                }
                instance.get('/v1/session')
                .then(
                    (res2) => {
                        idMedico = res2.data.user.person.uuid;
                        medicoObj = resultado.find(x => x.person == idMedico);
                        this.setState({medico: {value: medicoObj.value, label: medicoObj.label}});
                    } 
                ).catch(
                    (err) => {
                        console.log(err);
                    }
                )
            }
        ).catch(
            (err) => {
                console.log(err);
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
    
    searchPaquete(query){
        return instance.get('/v1/concept/767bfd99-0f7c-4c32-83fa-7302c8b3273b')
        .then(
            (res) => {
                var resultado = [];
                if ('data' in res){
                    resultado = res.data.setMembers.map((item) => ({
                        value: item.uuid,
                        label: item.display,
                    }));
                }
                return {options: resultado};
            }
        )
    }
        
    handleChangePaquete(opcion){
        this.setState({paquete:opcion});
    }
  
    generarOrden(e){
        e.preventDefault();
        var ordenes = this.state.data.map((item) => ({
                  "type" : "order",
                  "patient" : this.state.pacienteSeleccionado.value,
                  "concept" : item.paquete,
                  "orderer": this.state.medico.value,
                  "careSetting" : "c365e560-c3ec-11e3-9c1a-0800200c9a66",
                  "orderReasonNonCoded": item.observaciones,
                  "startDate": this.state.fechaInicio.format(),
                  "autoExpireDate":this.state.fechaFin.format(),
        }));

        const body = {
            "patient": this.state.pacienteSeleccionado.value,
            "location": this.state.ubicacion.uuid,
            "encounterProviders": [{"provider": this.state.medico.value, "encounterRole": "240b26f9-dd88-4172-823d-4a8bfeb7841f"}],
            "encounterType": "bc26c537-023c-4284-b921-bc83bb16101c",
            "encounterDatetime": this.state.date.format(),
            "orders": ordenes,
            "obs": [
                {obsDatetime: this.state.date.format(), 
                concept:'70885eca-dfe9-4d6a-9dfd-cd2feebd77f3',
                value: 'Dietetica'}]
        }
        instance.post('/v1/encounter', body)
        .then(
            (res) => {
                console.log("yaaas");
            }
        ).catch(
            (err)=> {
                console.log(err);
            }
        )
        
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
    
    handleChangeObs(e){
        this.setState({observaciones:e.target.value});
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
                   <label> Paquete: </label>
                    <Select.Async 
                        autoload={false}
                        name="paquete" 
                        value={this.state.paquete} 
                        onChange={this.handleChangePaquete}
                        loadOptions={this.searchPaquete}
                        />
                    <label htmlFor="observaciones">Observaciones:</label>
                    <input type='text' name="observaciones" id="observaciones" value={this.state.observaciones} onChange={this.handleChangeObs}/>
               </fieldset>
                <div>
                    <button className="btn" type="submit">Generar Orden</button>
                    <span>     </span>
                    <Link to="/"><button className="btn" type="button">Descartar</button></Link>
                </div>
            </form>
        </div>
    </div>
    )
  }
}