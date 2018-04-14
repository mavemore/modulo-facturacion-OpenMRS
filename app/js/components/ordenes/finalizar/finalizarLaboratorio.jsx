import React from 'react';
import {Link, hashHistory} from 'react-router';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Select from 'react-select';
import ReactTable from 'react-table';
import {instance,observacionesFotoURL, encounterTypeFinalizada_id,careSettingInpatient_id,encounterRoleClinician_id,encounterTypeOrdenNueva_id,examenesSangre_id,examenesOrina_id,examenesSputum_id,examenesSerum_id,examenesPlasma_id,examenesHeces_id,examenesCerebroEspinal_id,examenesFluidoAscitico_id,ObservacioneAreaServicio_id,sangre_id,orina_id,sputum_id,serum_id,plasma_id,heces_id,fluidoCerebro_id,fluidoAscitico_id,specimenSources_id} from '../../../axios-orders';
import 'react-datepicker/dist/react-datepicker.css';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import Simplert from 'react-simplert';

//import FormOrdenesEdit from '../global/FormOrdenesEdit';

export default class finalizarLaboratorio extends React.Component {
    constructor(...args){
        super(...args);
        this.state={
            date: moment(),
            pacienteSeleccionado: '',
            medico: '',
            idorden: this.props.params.orderId,
            tipoOrden: '',
            data:[],
            ordenes:[],
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
        this.handleChangeFoto = this.handleChangeFoto.bind(this);
        this.handleChangeObs = this.handleChangeObs.bind(this);
        this.searchMuestra = this.searchMuestra.bind(this);
        this.handleChangeMuestra = this.handleChangeMuestra.bind(this);
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
                    var muestra = '';
                    var obs = '';
                    if(res.data.orders.length>0){
                        ordenes = res.data.orders.map((item,i)=>{
                            muestra = {value:item.specimenSource.uuid, label:item.specimenSource.display};
                            obs = item.orderReasonNonCoded;
                            return {
                                        index:i,
                                        uuid: item.uuid,
                                        codigo: item.concept.uuid,
                                        nombre: item.concept.display,

                                    }
                            });
                            console.log(ordenes);
                            this.setState({
                                pacienteSeleccionado: {value: res.data.patient.uuid, label: res.data.patient.display},
                                date: moment(res.data.encounterDatetime),
                                medico: medico,
                                tipoOrden: tipo,
                                data: ordenes,
                                muestra:muestra,
                                observaciones:obs,
                            });
                        }
                    
                    };
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
                    var valor = false;
                    resultado = 
                    res3.data.setMembers.map((item,i) => {
                        
                        if (this.state.ordenes.indexOf(item.uuid)>=0){
                            valor = true;
                        }else{
                            valor = false;
                        }
                        return {
                        index:i,
                        codigo: item.uuid,
                        nombre: item.display,

                    }});
                }
                this.setState({muestra:opcion, data:resultado});
            }
        )}
    }
    
    handleChangeObs(e){
        this.setState({observaciones:e.target.value});
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
                    i
                    var detalles={
                        "type":'testorder',
                        "action": 'DISCONTINUE',
                        "previousOrder": this.state.data[i].uuid,
                        "careSetting": careSettingInpatient_id,
                        "concept": this.state.data[i].codigo,
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
    const {tipoOrden, data} = this.state;
      const { showAlert,titleAlert,messageAlert,typeAlert} = this.state;  
    const columnas = [{
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
                    loadOptions={this.searchPaciente}
                    disabled={true}/>
                    <label> Fecha: </label><DatePicker selected={this.state.date} onChange={this.handleChange}
                    disabled={true}/>
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
                    loadOptions={this.searchMuestra}
                    disabled={true}/>
                    <label> Observaciones: </label>
                    <input type="text" value={this.state.observaciones} onChange={this.handleChangeObs} readOnly/>
                    
                </fieldset>
                 <div>
                    <br></br>
                    <br></br>
                    <ReactTable 
                      data={data} 
                      noDataText="No existen ordenes"
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