import React from 'react';
import {Link} from 'react-router';
import request from 'superagent';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Select from 'react-select';
import {instance} from '../../axios-orders';
import 'react-datepicker/dist/react-datepicker.css';

//import FormOrdenesEdit from '../global/FormOrdenesEdit';

export default class editarOrdenes extends React.Component {
    constructor(...args){
        super(...args);
        this.state={
            date: moment(),
            pacienteSeleccionado: '',
            medico: '',
            ubicacion:{display:'', uuid:''},
            idorden: this.props.params.orderId,
            tipoOrden: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.searchPaciente = this.searchPaciente.bind(this);
        this.handleChangePaciente = this.handleChangePaciente.bind(this);
        this.getMedico = this.getMedico.bind(this);
        this.handleChangeMedico = this.handleChangeMedico.bind(this);
        this.cancelarOrden = this.cancelarOrden.bind(this);
        this.procesarOrden = this.procesarOrden.bind(this);
    }
    
    componentDidMount(){
        instance.get('/v1/encounter/'+this.props.params.orderId)
        .then(
            (res) => {
                if ('data' in res){
                    var medico = '';
                    var tipo = '';
                    if(res.data.encounterProviders.length>0){
                        medico = { value: res.data.encounterProviders[0].uuid, label: res.data.encounterProviders[0].display}
                                }
                    if(res.data.obs.length>0){
                        tipo = res.data.obs.find(x => x.uuid == '70885eca-dfe9-4d6a-9dfd-cd2feebd77f3').display;
                    }
                    this.setState({
                        pacienteSeleccionado: {value: res.data.patient.uuid, label: res.data.patient.display},
                        date: moment(res.data.encounterDatetime),
                        medico: medico,
                        ubicacion: res.data.location.display,
                        tipoOrden: tipo,
                    });
                }
            }
        ).catch(
            (err) => {
                console.log(err);
            }
        )
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
    
    handleChangePaciente(opcion){
        instance.get('/v1/patient/'+opcion.value+'?v=full')
        .then(
            (res) => {
                this.setState({pacienteSeleccionado:opcion, ubicacion: res.data.identifiers[0].location});
            }
        )
    }
    
    handleChangeMedico(opcion){
        this.setState({medico:opcion});
    }
    
    getMedico(){
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
  
    guardarOrden(e){
        e.preventDefault();
        
    }
    
    cancelarOrden(){
        var body = {'encounterType': '4a98bb63-d12e-44ce-ba4b-ae27503ff769'}
        instance.post('/v1/encounter/'+this.state.idorden, body)
        .then(
            (res) => {
                instance.delete('/v1/encounter/'+this.state.idorden)
                .then(
                    (res2) => {
                        console.log(res2);
                    }
                )
            }
        ).catch(
            (err) => {
                console.log(err);
            }
        )
    }
    
    procesarOrden(){
        var body = {'encounterType': '08007d58-026e-44e0-92e0-6c1bd0a43a8c'}
        instance.post('/v1/encounter/'+this.state.idorden, body)
        .then(
            (res) => {
                console.log(res);
            }
        ).catch(
            (err) => {
                console.log(err);
            }
        )
    }

    handleChange(date){
        this.setState({date:date});
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
            <h2>{this.state.tipoOrden}</h2>
            <form onSubmit={this.guardarOrden.bind(this)} id="formOrden">
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
                <div>
                    <button className="btn" type="button" onClick={this.cancelarOrden}>Cancelar Orden</button>
                    <span>     </span>
                    <button className="btn" type="button" onClick={this.procesarOrden}>Aceptar Orden</button>
                </div>
                <div>
                    <button className="btn" type="submit">Guardar</button>
                    <span>     </span>
                    <Link to="/ordenes"><button className="btn" type="button">Descartar</button></Link>
                </div>
            </form>
        </div>
    </div>
    )
  }
}