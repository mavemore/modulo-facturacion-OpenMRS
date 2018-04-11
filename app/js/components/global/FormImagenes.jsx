import React from 'react';
import {Link, hashHistory} from 'react-router';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {instance, imagenes_id,careSettingInpatient_id,specimenSourceNA_id,encounterRoleClinician_id,encounterTypeOrdenNueva_id,ObservacioneAreaServicio_id} from '../../axios-orders';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import Simplert from 'react-simplert';

const options = {   // A hook for after insert rows
};

export default class FormImagenes extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
            date: moment(),
            data:[],
            pacienteSeleccionado: '',
            medico: '',
            ubicacion:'',
            observaciones:'',
            imagenes:'',
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
        this.handleChangeObs = this.handleChangeObs.bind(this);
        this.searchImagen = this.searchImagen.bind(this);
        this.handleChangeImagen = this.handleChangeImagen.bind(this);
        this.cerrarAlert = this.cerrarAlert.bind(this);
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
    
    searchImagen(query){
        return instance.get('/v1/concept/'+imagenes_id)
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
        
    handleChangeImagen(opcion){
        this.setState({imagenes:opcion});
    }
    
    cerrarAlert(){
        this.setState({showAlert:false});
    }
  
    generarOrden(e){
        e.preventDefault();
        if(this.state.pacienteSeleccionado==''||this.state.imagenes==''){
            this.setState({showAlert:true,
                          titleAlert: "Campos Vacios",
                          messageAlert:"falta por llenar campos requeridos: Paciente o Imagen",
                          typeAlert: 'error'});
        }else{
            var ordenes = [{
                      "type" : "testorder",
                      "patient" : this.state.pacienteSeleccionado.value,
                      "location": this.state.ubicacion.uuid,
                      "concept" : this.state.imagenes.value,
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
                    value: 'Imagenes'}]
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
    }

    handleChange(date){
        this.setState({date:date});
    }  
    
    handleChangeObs(e){
        this.setState({observaciones:e.target.value});
    }
        
    render() {
    const { data ,showAlert,titleAlert,messageAlert,typeAlert} = this.state;
        const Style1 = {
            float: 'left',
		};
		const Style2 = {
            float: 'right',
		};
        
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
                    <legend>Informacion Imagenes:</legend>
                    <label htmlFor="imagenes"> Imagen: </label>
                    <Select.Async 
                        autoload={false}
                        name="imagenes" 
                        value={this.state.imagenes} 
                        onChange={this.handleChangeImagen}
                        loadOptions={this.searchImagen}
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