import React from 'react';
import {Link, hashHistory} from 'react-router';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Select from 'react-select';
import ReactTable from 'react-table';
import {instance, cirugias_id,careSettingInpatient_id,inpatientWard_id,specimenSourceNA_id,encounterRoleClinician_id,encounterTypeOrdenAceptada_id,encounterTypeOrdenCancelada_id,encounterTypeOrdenNueva_id,ObservacioneAreaServicio_id} from '../../../axios-orders';
import 'react-datepicker/dist/react-datepicker.css';
import Simplert from 'react-simplert';

//import FormOrdenesEdit from '../global/FormOrdenesEdit';

export default class editarCirugia extends React.Component {
    constructor(...args){
        super(...args);
        this.state={
            date: moment(),
            pacienteSeleccionado: '',
            medico: '',
            idorden: this.props.params.orderId,
            tipoOrden: '',
            data:[],
            observaciones: '',
            cirugia:'',
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
        this.handleChangeObs = this.handleChangeObs.bind(this);
        this.searchCirugia = this.searchCirugia.bind(this);
        this.handleChangeCirugia = this.handleChangeCirugia.bind(this);
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
                        var orden = '';
                        if(res.data.encounterProviders.length>0){
                            medico = { value: res.data.encounterProviders[0].provider.uuid, label: res.data.encounterProviders[0].provider.display}
                                    }
                        if(res.data.obs.length>0){
                            tipo = res.data.obs[0].display;
                        }
                        if(res.data.orders.length>0){
                            var ordenes = res.data.orders.map((item,i)=>(
                                {
                                    cirugia: {value: item.concept.uuid, label:item.concept.display},
                                    index: i,
                                    observaciones: item.orderReasonNonCoded,
                                }));
                            orden = ordenes[0];
                        };
                        this.setState({
                            pacienteSeleccionado: {value: res.data.patient.uuid, label: res.data.patient.display},
                            lugar: lugar,
                            date: moment(res.data.encounterDatetime),
                            medico: medico,
                            observaciones: orden.observaciones,
                            cirugia: orden.cirugia,
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
    
    searchCirugia(query){
        return instance.get('/v1/concept/'+cirugias_id)
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
        
    handleChangeCirugia(opcion){
        this.setState({cirugia:opcion});
    }
    
    handleChangeObs(e){
        this.setState({observaciones:e.target.value});
    }
    
    cerrarAlert(){
        this.setState({showAlert:false});
    }
        
    guardarOrden(e){
        e.preventDefault();
        if(this.state.pacienteSeleccionado==''||this.state.cirugia==''){
            this.setState({showAlert:true,
                          titleAlert: "Campos Vacios",
                          messageAlert:"falta por llenar campos requeridos: Paciente o Cirugia",
                          typeAlert: 'error'});
        }else{
            instance.delete('/v1/encounter/'+this.state.idorden)
            .then(
                (res2) => {
                    var ordenes = [{
                              "type" : "testorder",
                              "patient" : this.state.pacienteSeleccionado.value,
                              "location": this.state.ubicacion.uuid,
                              "concept" : this.state.cirugia.value,
                              "orderer": this.state.medico.value,
                              "careSetting" : careSettingInpatient_id,
                              "orderReasonNonCoded": this.state.observaciones,
                              "specimenSource": specimenSourceNA_id,
                    }];

                    const body = {
                        "patient": this.state.pacienteSeleccionado.value,
                        "encounterProviders": [{"provider": this.state.medico.value, "encounterRole": encounterRoleClinician_id}],
                        "encounterType": encounterTypeOrdenNueva_id,
                        "encounterDatetime": this.state.date.format(),
                        "orders": ordenes,
                        "obs": [
                            {obsDatetime: this.state.date.format(), 
                            concept:ObservacioneAreaServicio_id,
                            value: 'Cirugia'}]
                    }
                    instance.post('/v1/encounter', body)
                    .then(
                        (res) => {
                            hashHistory.push('/');
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
    const {tipoOrden} = this.state;
    
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
                    <legend>Informacion Cirugia:</legend>
                   <label> Cirugia: </label>
                    <Select.Async 
                        autoload={false}
                        name="cirugia" 
                        value={this.state.cirugia} 
                        onChange={this.handleChangeCirugia}
                        loadOptions={this.searchCirugia}
                        />
                   <label htmlFor="observaciones">Observaciones:</label>
                    <input type='text' name="observaciones" id="observaciones" value={this.state.observaciones} onChange={this.handleChangeObs}/>
               </fieldset>
                <div>
                    {this.state.editar?
                    <button className="btn" type="button" onClick={this.cancelarOrden}>Cancelar Orden</button>:null}
                    {this.state.editar?
                    <span>     </span>:null}
                    {this.state.editar?
                    <button className="btn" type="button" onClick={this.procesarOrden}>Aceptar Orden</button>:null}
                </div>
                <div>
                    {this.state.editar?
                    <button className="btn" type="submit">Guardar</button>:null}
                    <span>     </span>
                    <Link to="/ordenes"><button className="btn" type="button">Descartar</button></Link>
                </div>
            </form>
        </div>
    </div>
    )
  }
}