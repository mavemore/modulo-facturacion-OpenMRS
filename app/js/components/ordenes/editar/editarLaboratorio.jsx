import React from 'react';
import {Link, hashHistory} from 'react-router';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Select from 'react-select';
import ReactTable from 'react-table';
import {instance,careSettingInpatient_id,encounterRoleClinician_id,encounterTypeOrdenNueva_id,examenes_id,ObservacioneAreaServicio_id,specimenSources_id} from '../../axios-orders';
import 'react-datepicker/dist/react-datepicker.css';

//import FormOrdenesEdit from '../global/FormOrdenesEdit';

export default class editarLaboratorio extends React.Component {
    constructor(...args){
        super(...args);
        this.state={
            date: moment(),
            pacienteSeleccionado: '',
            medico: '',
            idorden: this.props.params.orderId,
            tipoOrden: '',
            data:[],
            muestra: '',
            examen: '',
            datashow: [],
            
        };
        this.handleChange = this.handleChange.bind(this);
        this.searchPaciente = this.searchPaciente.bind(this);
        this.handleChangePaciente = this.handleChangePaciente.bind(this);
        this.getMedico = this.getMedico.bind(this);
        this.handleChangeMedico = this.handleChangeMedico.bind(this);
        this.cancelarOrden = this.cancelarOrden.bind(this);
        this.procesarOrden = this.procesarOrden.bind(this);
        this.searchMuestra = this.searchMuestra.bind(this);
        this.handleChangeMuestra = this.handleChangeMuestra.bind(this);
        this.searchExamen = this.searchExamen.bind(this);
        this.handleChangeExamen = this.handleChangeExamen.bind(this);
        this.anadirFilas = this.anadirFilas.bind(this);
        this.removerExamen = this.removerExamen.bind(this);
        this.handleChangeObs = this.handleChangeObs.bind(this);
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
                    if(res.data.orders.length>0){
                        filas = res.data.orders.map((item,i)=>(
                            {
                                examen: item.concept.display,
                                index: i,
                                uuid: item.uuid,
                                muestra : item.specimenSource.display,
                                observaciones: item.orderReasonNonCoded,
                            }));
                        ordenes = res.data.orders.map((item,i)=>(
                            {
                                examen: item.concept.uuid,
                                index: i+1,
                                uuid: item.uuid,
                                muestra : item.specimenSource.uuid, 
                                observaciones: item.orderReasonNonCoded,
                                careSetting: item.careSetting.uuid,
                            }));
                    };
                    this.setState({
                        pacienteSeleccionado: {value: res.data.patient.uuid, label: res.data.patient.display},
                        date: moment(res.data.encounterDatetime),
                        medico: medico,
                        tipoOrden: tipo,
                        data: ordenes,
                        datashow: filas,
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
                this.setState({pacienteSeleccionado:opcion});
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
    
    searchMuestra(query){
        return instance.get('/v1/concept?searchType=fuzzy&name='+query+'&class='+specimenSources_id+'&v=custom:(uuid,display,conceptClass)')
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
        
    handleChangeMuestra(opcion){
        this.setState({muestra:opcion});
    }
    
    searchExamen(query){
        //return instance.get('/v1/concept?searchType=fuzzy&name='+query+'&class=8d4907b2-c2cc-11de-8d13-0010c6dffd0f&v=custom:(uuid,display,conceptClass)')
        return instance.get('/v1/concept/'+examenes_id)
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
        
    handleChangeExamen(opcion){
        this.setState({examen:opcion});
    }
    
    handleChangeObs(e){
        this.setState({observaciones:e.target.value});
    }
    
    anadirFilas(){
        var newdatashow = {medicina: this.state.medicinaSeleccionada.label, 
                      dosis: this.state.dosis,
                      unidad: this.state.unidad.label,
                      observaciones: this.state.observaciones,
                      route: this.state.route.label,
                      frecuencia: this.state.frecuencia.label}
        var newdata = {medicina: this.state.medicinaSeleccionada.value, 
                      dosis: this.state.dosis,
                      unidad: this.state.unidad.value,
                      observaciones: this.state.observaciones,
                      route: this.state.route.value,
                      frecuencia: this.state.frecuencia.value}
        this.setState({
            data: this.state.data.concat(newdata), 
            datashow: this.state.datashow.concat(newdatashow), 
            medicinaSeleccionada: {},
            unidad:{},
            dosis: 0.00,
            observaciones: '',
            frecuencia: {},
            route: {}
        });
    }
    
    removerExamen(index){
        var filas = this.state.data;
        var filashow = this.state.datashow;
        filas.splice(index,1);
        filashow.splice(index,1);
        this.setState({data:filas, datashow: filashow});
        console.log(index);
    }
  
    guardarOrden(e){
        e.preventDefault();
        instance.delete('/v1/encounter/'+this.state.idorden)
        .then(
            (res2) => {
                var ordenes = this.state.data.map((item) => ({
                          "type" : "testorder",
                          "patient" : this.state.pacienteSeleccionado.value,
                          "concept" : item.examen,
                          "orderer": this.state.medico.value,
                          "careSetting" : careSettingInpatient_id,
                          "orderReasonNonCoded": item.observaciones,
                          "specimenSource": item.muestra,
                }));

                const body = {
                    "patient": this.state.pacienteSeleccionado.value,
                    "location": this.state.ubicacion.uuid,
                    "encounterProviders": [{"provider": this.state.medico.value, "encounterRole": encounterRoleClinician_id}],
                    "encounterType": encounterTypeOrdenNueva_id,
                    "encounterDatetime": this.state.date.format(),
                    "orders": ordenes,
                    "obs": [
                        {obsDatetime: this.state.date.format(), 
                        concept:ObservacioneAreaServicio_id,
                        value: 'Laboratorio'}]
                }
                instance.post('/v1/encounter', body)
                .then(
                    (res) => {
                        hashHistory.push('/');
                    }
                ).catch(
                    (err)=> {
                        console.log(err);
                    }
                )
            }
        )
    }
    
    cancelarOrden(e){
        var body = {'encounterType': encounterTypeOrdenCancelada_id}
        instance.post('/v1/encounter/'+this.state.idorden, body)
        .then(
            (res) => {
                instance.delete('/v1/encounter/'+this.state.idorden)
                .then(
                    (res2) => {
                        hashHistory.push('/ordenes');
                    }
                )
            }
        ).catch(
            (err) => {
                console.log(err);
            }
        )
    }
    
    procesarOrden(e){
        var body = {'encounterType': encounterTypeOrdenAceptada_id}
        instance.post('/v1/encounter/'+this.state.idorden, body)
        .then(
            (res) => {
                console.log(res);
                hashHistory.push('/ordenes');
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
    const {tipoOrden, datashow} = this.state;
        
    const columnas = [{
                        Header: 'Examen',
                        accessor:'examen'},{
                        Header: 'Muestra',
                        accessor:'muestra'},{
                        Header: 'Observaciones',
                        accessor:'observaciones'},{
                        Header: 'Acciones',
                        accessor:'index',
                        Cell: ({value})=> (<button type="button" onClick={()=>{this.removerMed({value})}}>Remover</button>)
                        }
                      ]
    
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
                        <Link to="/ordenes_atender"><i className="icon-chevron-right link"></i>Ordenes</Link>
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
                    loadOptions={this.searchPaciente}/>
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
                    <fieldset>
                        <legend>Nueva Examen:</legend>
                        <label> Nombre Examen: </label>
                        <Select.Async 
                        autoload={false}
                        name="examen" 
                        value={this.state.examen} 
                        onChange={this.handleChangeExamen}
                        loadOptions={this.searchExamen}
                        />
                        <label> Tipo Muestra: </label>
                        <Select.Async 
                        autoload={false}
                        name="muestra" 
                        value={this.state.muestra} 
                        onChange={this.handleChangeMuestra}
                        loadOptions={this.searchMuestra}
                        />
                        <label htmlFor="observaciones">Observaciones:</label>
                        <input type='text' name="observaciones" id="observaciones" value={this.state.observaciones} onChange={this.handleChangeObs}/>
                        <br></br>
                        <button id="addfila" onClick={this.anadirFilas} type="button">Agregar Examen</button>
                    </fieldset>
                    <br></br>
                    <br></br>
                    <ReactTable 
                      data={datashow} 
                      noDataText="No existen ordenes"
                      columns={columnas} 
                      defaultPageSize={5} 
                      sortable={true}/>
                </div>
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