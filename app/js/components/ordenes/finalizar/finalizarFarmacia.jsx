import React from 'react';
import {Link, hashHistory} from 'react-router';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import ReactTable from 'react-table';
import Select from 'react-select';
import {instance,observacionesFotoURL, encounterTypeFinalizada_id} from '../../../axios-orders';
import 'react-datepicker/dist/react-datepicker.css';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import Simplert from 'react-simplert';


export default class finalizarFarmacia extends React.Component {
    constructor(...args){
        super(...args);
        this.state={
            date: moment(),
            pacienteSeleccionado: '',
            medico: '',
            ubicacion:{display:'', uuid:''},
            idorden: this.props.params.orderId,
            tipoOrden: '',
            data: [],
            comentarios:'',
            foto:'',
            fotoURL:'',
            dateFin: moment(),
            ordenes: [],
            showAlert:false,
            titleAlert: "titulo",
            messageAlert:"mensaje",
            typeAlert:'success',
        };
        this.handleChange = this.handleChange.bind(this);
        this.searchPaciente = this.searchPaciente.bind(this);
        this.handleChangePaciente = this.handleChangePaciente.bind(this);
        this.getMedico = this.getMedico.bind(this);
        this.handleChangeMedico = this.handleChangeMedico.bind(this);
        this.handleChangeFin = this.handleChangeFin.bind(this);
        this.handleChangeComentario = this.handleChangeComentario.bind(this);
        this.cerrarAlert = this.cerrarAlert.bind(this);
    }
    
    componentDidMount(){
        instance.get('/v1/encounter/'+this.props.params.orderId+'?v=full')
        .then(
            (res) => {
                if ('data' in res){
                    var medico = '';
                    var tipo = '';
                    var location = '';
                    var filas = [];
                    var ordenes = [];
                    if(res.data.encounterProviders.length>0){
                        medico = { value: res.data.encounterProviders[0].provider.uuid, label: res.data.encounterProviders[0].provider.display}
                                }
                    if(res.data.obs.length>0){
                        tipo = res.data.obs[0].display;
                    }
                    if(res.data.location != null){
                        location = res.data.location.display;
                    }
                    if(res.data.orders.length>0){
                        filas = res.data.orders.map((item,i)=>(
                            {
                                medicina: item.concept.display,
                                index: i,
                                uuid: item.uuid,
                                dosis : item.dose.display,
                                unidad : item.doseUnits.display,
                                frecuencia : item.frequency.display,
                                route : item.route.display, 
                                observaciones: item.orderReasonNonCoded,
                            }));
                        ordenes = res.data.orders.map((item,i)=>(
                            {
                                medicina: item.concept.uuid,
                                index: i+1,
                                uuid: item.uuid,
                                dosis : item.dose.uuid,
                                unidad : item.doseUnits.uuid,
                                frecuencia : item.frequency.uuid,
                                route : item.route.uuid, 
                                observaciones: item.orderReasonNonCoded,
                                careSetting: item.careSetting.uuid,
                            }));
                    };
        
                    this.setState({
                        pacienteSeleccionado: {value: res.data.patient.uuid, label: res.data.patient.display},
                        date: moment(res.data.encounterDatetime),
                        medico: medico,
                        ubicacion: location,
                        tipoOrden: tipo,
                        data: filas,
                        ordenes: ordenes,
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
    cerrarAlert(){
        this.setState({showAlert:false});
    }
  
    guardarOrden(e){
        e.preventDefault();
        
            var body = {
                'encounterType': encounterTypeFinalizada_id,
                
            }
            instance.post('/v1/encounter/'+this.state.idorden, body)
            .then(
                (res) => {
                    var i = 0;
                    for(i=0;i<this.state.data.length;i++){
                        var detalles={
                            "type":'drugorder',
                            "action": 'DISCONTINUE',
                            "previousOrder": this.state.ordenes[i].uuid,
                            "careSetting": this.state.ordenes[i].careSetting,
                            "concept": this.state.ordenes[i].medicina,
                            "encounter": this.state.idorden,
                            "orderer": this.state.medico.value,
                            "patient": this.state.pacienteSeleccionado.value,
                            //"dateActivated": this.state.dateFin.format(),
                            "orderReasonNonCoded": this.state.comentarios,
                        }
                        instance.post('/v1/order', detalles)
                        .then(
                            (res2) => {
                                hashHistory.push('/ordenes_atender');
                            }
                        ).catch(
                            (err) => {
                                console.log(err);
                            }
                        ) 
                    }
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
    
    handleChangeFin(date){
        this.setState({dateFin:date});
    }
    
    handleChangeComentario(e){
        this.setState({comentarios:e.target.value});
    }
    
    handleChangeFoto(e){
        this.setState({foto:e.target.value});
    }
    
    

    render() {
        const Style1 = {
            float: 'left',
		};
		const Style2 = {
            float: 'right',
		};
    const { showAlert,titleAlert,messageAlert,typeAlert} = this.state;
    const {tipoOrden, data} = this.state;
    const columnas = [
                        {
                        Header: 'Medicina',
                        accessor:'medicina'},{
                        Header: 'Dosis',
                        accessor:'dosis'},{
                        Header: 'Unidad',
                        accessor:'unidad'},{
                        Header: 'Frecuencia',
                        accessor:'frecuencia'}, {
                        Header: 'Via Administracion',
                        accessor:'route'},{
                        Header: 'Observaciones',
                        accessor:'observaciones'}
                     ]
    return (
      <div>
        <Simplert
            showSimplert={showAlert}
            type={typeAlert}
            title={titleAlert}
            message={messageAlert}
            onClose={this.cerrarAlert}
            onConfirm={this.cerrarAlert}/>
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
            <h2>{tipoOrden}</h2>
            <form onSubmit={this.guardarOrden.bind(this)} id="formOrden">
                <fieldset>
                    <legend>Datos Generales:</legend>
                    <label> Paciente: </label>
                    <Select.Async 
                    autoload={false}
                    name="paciente" 
                    value={this.state.pacienteSeleccionado} 
                    onChange={this.handleChangePaciente}
                    loadOptions={this.searchPaciente}
                    disabled={true}/>
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
                    <br></br>
                    <br></br>
                    <ReactTable 
                      data={data} 
                      noDataText="No existen medicamentos"
                      columns={columnas} 
                      defaultPageSize={5} 
                      sortable={true}/>
                </div>
                <fieldset>
                    <legend>Entrega:</legend>
                    <label> Fecha Realizacion: </label><DatePicker selected={this.state.dateFin} onChange={this.handleChangeFin}/>
                    <label htmlFor="comentarios">Comentario:</label>
                    <input type='text' name="comentarios" value={this.state.comentarios} id="comentarios" onChange={this.handleChangeComentario}/>
                </fieldset>
                
                <div>
                    <button className="btn" type="submit">Guardar</button>
                    <span>     </span>
                    <Link to="/ordenes_atender"><button className="btn" type="button">Descartar</button></Link>
                </div>
            </form>
        </div>
    </div>
    )
  }
}