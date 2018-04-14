import React from 'react';
import {Link, hashHistory} from 'react-router';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import ReactTable from 'react-table';
import {instance,careSettingInpatient_id,encounterRoleClinician_id,encounterTypeOrdenNueva_id,examenesSangre_id,
    examenesOrina_id,examenesSputum_id,examenesSerum_id,examenesPlasma_id,examenesHeces_id,examenesCerebroEspinal_id,
    examenesFluidoAscitico_id,ObservacioneAreaServicio_id,sangre_id,orina_id,sputum_id,serum_id,plasma_id,heces_id,fluidoCerebro_id,
    fluidoAscitico_id,specimenSources_id} from '../../axios-orders';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import Simplert from 'react-simplert';

const options = {   // A hook for after insert rows
};

export default class FormLaboratorio extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
            date: moment(),
            data:[],
            pacienteSeleccionado: '',
            medico: '',
            ubicacion:'',
            muestra: '',
            examen: '',
            observaciones: '',
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
        this.searchMuestra = this.searchMuestra.bind(this);
        this.handleChangeMuestra = this.handleChangeMuestra.bind(this);
        this.searchExamen = this.searchExamen.bind(this);
        this.handleChangeExamen = this.handleChangeExamen.bind(this);
        this.cambiarEstado = this.cambiarEstado.bind(this);
        this.handleChangeObs = this.handleChangeObs.bind(this);
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
    
    searchMuestra(query){
        //return instance.get('/v1/concept?searchType=fuzzy&name='+query+'&class='+specimenSources_id+'&v=custom:(uuid,display,conceptClass)')
        return instance.get('/v1/concept/'+specimenSources_id)
        .then(
            (res) => {
                console.log(res.data);
                var resultado = [];
                if ('data' in res){
                    resultado = res.data.setMembers.map((item) => ({
                        value: item.uuid,
                        label: item.display,
                    }));
                }
                console.log('resultado:'+ resultado);
                return {options: resultado};
            }
        )
    }
        
    handleChangeMuestra(opcion){
        var examenid = '';
        if (opcion.value == sangre_id){
            examenid = examenesSangre_id;
        }else if (opcion.value == orina_id){
            examenid = examenesOrina_id;
        }else if (opcion.value == sputum_id){
            examenid = examenesSputum_id;
        }else if (opcion.value == serum_id){
            examenid = examenesSerum_id;
        }else if (opcion.value == plasma_id){
            examenid = examenesPlasma_id;
        }else if (opcion.value == heces_id){
            examenid = examenesHeces_id;
        }else if (opcion.value == fluidoCerebro_id){
            examenid = examenesCerebroEspinal_id;
        }else if (opcion.value == fluidoAscitico_id){
            examenid = examenesFluidoAscitico_id;
        }
        if (examenid == ''){
            this.setState({muestra:opcion});
        }else{
        instance.get('/v1/concept/'+examenid+'?v=full')
        .then(
            (res3) => {
                var resultado = [];
                if ('data' in res3){
                    resultado = 
                    res3.data.setMembers.map((item,i) => {

                        return {
                        seleccion: true, 
                        index:i,
                        codigo: item.uuid,
                        nombre: item.display,

                    }});
                }
                this.setState({muestra:opcion, data:resultado});
            }
        )}
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
    
    cerrarAlert(){
        this.setState({showAlert:false});
    }
  
    generarOrden(e){
        e.preventDefault();
        if(this.state.pacienteSeleccionado==''||this.state.data.length==0){
            this.setState({showAlert:true,
                          titleAlert: "Campos Vacios",
                          messageAlert:"falta por llenar campos requeridos: Paciente o Pruebas de Laboratorio.",
                          typeAlert: 'error'});
        }else{
            var ordenes = this.state.data.map((item) => {
                    if(item.seleccion){
                      return {"type" : "testorder",
                      "patient" : this.state.pacienteSeleccionado.value,
                      "concept" : item.codigo,
                      "orderer": this.state.medico.value,
                      "careSetting" : careSettingInpatient_id,
                      "orderReasonNonCoded": this.state.observaciones,
                      "specimenSource": this.state.muestra.value,
                    }
                    }});
            ordenes = ordenes.filter(x => x!= undefined);
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
            console.log(body);
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
    
    handleChangeObs(e){
        this.setState({observaciones:e.target.value});
    }

    handleChange(date){
        this.setState({date:date});
    }
    
    cambiarEstado(item){
        var data = this.state.data;
        data[item].seleccion = !data[item].seleccion;
        this.setState({data:data});
    }
    
    cambiarObservaciones(e){
        console.log(e);
    }
    
    render() {
    const { data ,showAlert,titleAlert,messageAlert,typeAlert} = this.state;
        const Style1 = {
            float: 'left',
		};
		const Style2 = {
            float: 'right',
		};
        
    const columnas = [{
                        Header: '',
                        accessor:'index',
                        Cell: ({value})=> (<input type="checkbox" checked={this.state.data[value].seleccion} onChange={()=>{this.cambiarEstado(value)}} onMouseOver={()=>{this.cambiarEstado(value)}}/>)},{
                        Header: 'Examen',
                        accessor:'nombre'}
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
                    <legend>Datos Examenes:</legend>
                    <label> Muestra: </label>
                    <Select.Async 
                    autoload={false}
                    name="muestra" 
                    value={this.state.muestra} 
                    onChange={this.handleChangeMuestra}
                    loadOptions={this.searchMuestra}/>
                    <label> Observaciones: </label>
                    <input type="text" value={this.state.observaciones} onChange={this.handleChangeObs}/>
                    
                </fieldset>
                <div>
                    <br></br>
                    <br></br>
                    <ReactTable 
                      data={data} 
                      noDataText="No existen examenes"
                      columns={columnas} 
                      defaultPageSize={10} 
                      sortable={true}/>
                </div>
                <br></br>
                <br></br>
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