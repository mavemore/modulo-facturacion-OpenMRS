import React from 'react';
import {Link, hashHistory} from 'react-router';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Select from 'react-select';
import ReactTable from 'react-table';
import {instance,unidades_id,routes_id,ObservacioneAreaServicio_id,encounterTypeOrdenNueva_id,encounterRoleClinician_id,careSettingInpatient_id,encounterTypeOrdenAceptada_id,encounterTypeOrdenCancelada_id,inpatientWard_id} from '../../../axios-orders';
import 'react-datepicker/dist/react-datepicker.css';
import Simplert from 'react-simplert';

//import FormOrdenesEdit from '../global/FormOrdenesEdit';

export default class editarFarmacia extends React.Component {
    constructor(...args){
        super(...args);
        this.state={
            date: moment(),
            pacienteSeleccionado: '',
            medico: '',
            ubicacion:{display:'', uuid:''},
            idorden: this.props.params.orderId,
            tipoOrden: '',
            data:[],
            medicinaSeleccionada: '',
            unidad:'',
            dosis: 0.00,
            observaciones: '',
            frecuencia: '',
            route: '',
            datashow: [],
            showAlert:false,
            titleAlert: "titulo",
            messageAlert:"mensaje",
            typeAlert:'success',
            lugar:'',
            editar: false,
            
        };
        this.handleChange = this.handleChange.bind(this);
        this.searchPaciente = this.searchPaciente.bind(this);
        this.handleChangePaciente = this.handleChangePaciente.bind(this);
        this.getMedico = this.getMedico.bind(this);
        this.handleChangeMedico = this.handleChangeMedico.bind(this);
        this.cancelarOrden = this.cancelarOrden.bind(this);
        this.procesarOrden = this.procesarOrden.bind(this);
        this.handleChangeMedicina = this.handleChangeMedicina.bind(this);
        this.searchUnidad = this.searchUnidad.bind(this);
        this.handleChangeUnidad = this.handleChangeUnidad.bind(this);
        this.handleChangeDosis = this.handleChangeDosis.bind(this);
        this.handleChangeObs = this.handleChangeObs.bind(this);
        this.anadirFilas = this.anadirFilas.bind(this);
        this.removerMed = this.removerMed.bind(this);
        this.searchRuta = this.searchRuta.bind(this);
        this.handleChangeRuta = this.handleChangeRuta.bind(this);
        this.searchFrecuencia = this.searchFrecuencia.bind(this);
        this.handleChangeFrecuencia = this.handleChangeFrecuencia.bind(this);
        this.cerrarAlert = this.cerrarAlert.bind(this);
    }
    
    componentDidMount(){
        instance.get('/v1/appui/session')
        .then((response) => {
            var lugar = response.data.sessionLocation.uuid;
            var editar = false;
            if (lugar == inpatientWard_id){
                editar= true;
            }
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
                                dosis : item.dose,
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
                                dosis : item.dose,
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
                        data: ordenes,
                        datashow: filas,
                        editar:editar,
                    });
                }
            }
        ).catch(
            (err) => {
                console.log(err);
            }
        )})
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
    
    searchMedicina(query){
        return instance.get('/v1/drug?q='+query+'&v=full')
        .then(
            (res) => {
                var resultado = [];
                if ('data' in res){
                    resultado = res.data.results.map((item) => ({
                        value: item.concept.uuid,
                        label: item.display,
                    }));
                }
                return {options: resultado};
            }
        )
    }
        
    handleChangeMedicina(opcion){
        this.setState({medicinaSeleccionada:opcion});
    }
    
    searchUnidad(query){
        return instance.get('/v1/concept/'+unidades_id)
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
        
    handleChangeUnidad(opcion){
        this.setState({unidad:opcion});
    }
    
    searchRuta(query){
        return instance.get('/v1/concept/'+routes_id)
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
        
    handleChangeRuta(opcion){
        this.setState({route:opcion});
    }
    
    searchFrecuencia(query){
        return instance.get('/v1/orderfrequency')
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
        
    handleChangeFrecuencia(opcion){
        this.setState({frecuencia:opcion});
    }
    
    handleChangeDosis(e){
        this.setState({dosis:e.target.value});
    }
    
    handleChangeObs(e){
        this.setState({observaciones:e.target.value});
    }
    
    cerrarAlert(){
        this.setState({showAlert:false});
    }
    
    anadirFilas(){
        if(this.state.medicinaSeleccionada==''||this.state.dosis==0.00||this.state.unidad==''||this.state.route==''||this.state.frecuencia==''||this.state.observaciones==''){
            this.setState({showAlert:true,
                          titleAlert: "Campos Vacios",
                          messageAlert:"falta por llenar campos requeridos para agregar el medicamento.",
                          typeAlert: 'error'});
        }else{
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
                medicinaSeleccionada: '',
                unidad:'',
                dosis: 0.00,
                observaciones: '',
                frecuencia: '',
                route: '',
            });
        }
    }
    
    removerMed(index){
        if(this.state.editar){
        var filas = this.state.data;
        var filashow = this.state.datashow;
        filas.splice(index,1);
        filashow.splice(index,1);
        this.setState({data:filas, datashow: filashow});
        console.log(index);}
    }
  
    guardarOrden(e){
        e.preventDefault();
        if(this.state.pacienteSeleccionado==''||this.state.data.length==0){
            this.setState({showAlert:true,
                          titleAlert: "Campos Vacios",
                          messageAlert:"falta por llenar campos requeridos: Paciente o Medicamentos",
                          typeAlert: 'error'});
        }else{
            instance.delete('/v1/encounter/'+this.state.idorden)
            .then(
                (res2) => {
                    var ordenes = this.state.data.map((item) => ({
                              "type" : "drugorder",
                              "patient" : this.state.pacienteSeleccionado.value,
                              "concept" : item.medicina,
                              "orderer": this.state.medico.value,
                              "careSetting" : careSettingInpatient_id,
                              "drug": item.medicina,
                              "dose" : item.dosis,
                              "doseUnits" : item.unidad,
                              "frequency" : item.frecuencia,
                              "route" : item.route, 
                              "orderReasonNonCoded": item.observaciones,
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
                            value: 'Farmacia'}]
                    }
                    instance.post('/v1/encounter', body)
                    .then(
                        (res) => {
                            hashHistory.push('/ordenes');
                        }
                    ).catch(
                        (err)=> {
                            console.log(err);
                            this.setState({showAlert:true,
                          titleAlert: "Error Servidor",
                          messageAlert:"Ha ocurrido un error en el servidor",
                          typeAlert: 'error'});
                        }
                    )
                }
            )
        }
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
    const { data ,showAlert,titleAlert,messageAlert,typeAlert} = this.state;
        const Style1 = {
            float: 'left',
		};
		const Style2 = {
            float: 'right',
		};
    const {tipoOrden, datashow} = this.state;
        
    const columnas = [{
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
                        accessor:'observaciones'},{
                        Header: 'Acciones',
                        accessor:'index',
                        Cell: ({value})=> (<button type="button" onClick={()=>{this.removerMed({value})}}>Remover</button>)
                        }
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
                     {this.state.editar?
                    <fieldset>
                        <legend>Nueva Medicina:</legend>
                        <label> Nombre Medicina: </label>
                        <Select.Async 
                        autoload={false}
                        name="medicina" 
                        value={this.state.medicinaSeleccionada} 
                        onChange={this.handleChangeMedicina}
                        loadOptions={this.searchMedicina}
                        />
                        <label htmlFor="dosis">Dosis:</label>
                        <input value={this.state.dosis} type='number' name="dosis" id="dosis" step="0.01" onChange={this.handleChangeDosis}/>
                        <label htmlFor="unidad">Unidad:</label>
                        <Select.Async 
                        autoload={false}
                        name="unidad" 
                        value={this.state.unidad} 
                        onChange={this.handleChangeUnidad}
                        loadOptions={this.searchUnidad}
                        />
                        <label htmlFor="frecuencia">Frecuencia:</label>
                        <Select.Async 
                        autoload={false}
                        name="frecuencia" 
                        value={this.state.frecuencia} 
                        onChange={this.handleChangeFrecuencia}
                        loadOptions={this.searchFrecuencia}
                        />
                        <label htmlFor="route">Via:</label>
                        <Select.Async 
                        autoload={false}
                        name="route" 
                        value={this.state.route} 
                        onChange={this.handleChangeRuta}
                        loadOptions={this.searchRuta}
                        />
                        <label htmlFor="observaciones">Observaciones:</label>
                        <input type='text' name="observaciones" id="observaciones" value={this.state.observaciones} onChange={this.handleChangeObs}/>
                        <br></br>
                        <button id="addfila" onClick={this.anadirFilas} type="button">Agregar Medicina</button>
                    </fieldset>:null}
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
                    {this.state.editar?
                    <button className="btn" type="button" onClick={this.cancelarOrden}>Cancelar Orden</button>:null}
                    {this.state.editar?
                    <span>     </span>:null}
                    {this.state.editar?null:
                    <button className="btn" type="button" onClick={this.procesarOrden}>Aceptar Orden</button>}
                </div>
                <div>
                    {this.state.editar?
                    <button className="btn" type="submit">Guardar</button>:null}
                    {this.state.editar?
                    <span>     </span>:null}
                    <Link to="/ordenes"><button className="btn" type="button">Descartar</button></Link>
                </div>
            </form>
        </div>
    </div>
    )
  }
}