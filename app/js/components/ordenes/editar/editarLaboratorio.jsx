import React from 'react';
import {Link, hashHistory} from 'react-router';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Select from 'react-select';
import ReactTable from 'react-table';
import {instance,careSettingInpatient_id,encounterRoleClinician_id,encounterTypeOrdenNueva_id,examenesSangre_id,examenesOrina_id,examenesSputum_id,examenesSerum_id,examenesPlasma_id,examenesHeces_id,examenesCerebroEspinal_id,examenesFluidoAscitico_id,ObservacioneAreaServicio_id,sangre_id,orina_id,sputum_id,serum_id,plasma_id,heces_id,fluidoCerebro_id,fluidoAscitico_id,specimenSources_id,encounterTypeOrdenAceptada_id,encounterTypeOrdenCancelada_id} from '../../../axios-orders';
import 'react-datepicker/dist/react-datepicker.css';
import Simplert from 'react-simplert';

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
            ordenes:[],
            muestra: '',
            examen: '',
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
        this.cancelarOrden = this.cancelarOrden.bind(this);
        this.procesarOrden = this.procesarOrden.bind(this);
        this.searchMuestra = this.searchMuestra.bind(this);
        this.handleChangeMuestra = this.handleChangeMuestra.bind(this);
        this.searchExamen = this.searchExamen.bind(this);
        this.handleChangeExamen = this.handleChangeExamen.bind(this);
        this.cambiarEstado = this.cambiarEstado.bind(this);
        this.handleChangeObs = this.handleChangeObs.bind(this);
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
                            return item.concept.uuid
                            });
                        var examenid = '';
                        var resultado = [];
                        if (muestra.value == sangre_id){
                            examenid = examenesSangre_id;
                        }else if (muestra.value == orina_id){
                            examenid = examenesOrina_id;
                        }else if (muestra.value == sputum_id){
                            examenid = examenesSputum_id;
                        }else if (muestra.value == serum_id){
                            examenid = examenesSerum_id;
                        }else if (muestra.value == plasma_id){
                            examenid = examenesPlasma_id;
                        }else if (muestra.value == heces_id){
                            examenid = examenesHeces_id;
                        }else if (muestra.value == fluidoCerebro_id){
                            examenid = examenesCerebroEspinal_id;
                        }else if (muestra.value == fluidoAscitico_id){
                            examenid = examenesFluidoAscitico_id;
                        }
                        if (examenid != ''){
                        instance.get('/v1/concept/'+examenid+'?v=full')
                        .then(
                            (res3) => {
                                var resultado = [];
                                if ('data' in res3){
                                    var valor = false;
                                    resultado = 
                                    res3.data.setMembers.map((item,i) => {

                                        if (ordenes.indexOf(item.uuid)>=0){
                                            valor = true;
                                        }else{
                                            valor = false;
                                        }
                                        return {
                                        seleccion: valor, 
                                        index:i,
                                        codigo: item.uuid,
                                        nombre: item.display,

                                    }});
                                }
                                this.setState({
                                    pacienteSeleccionado: {value: res.data.patient.uuid, label: res.data.patient.display},
                                    date: moment(res.data.encounterDatetime),
                                    medico: medico,
                                    tipoOrden: tipo,
                                    data: resultado,
                                    muestra:muestra,
                                    observaciones:obs,
                                });
                            }
                        )}
                    };
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
                        seleccion: valor, 
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
    
    handleChangeObs(e){
        this.setState({observaciones:e.target.value});
    }
    
    cerrarAlert(){
        this.setState({showAlert:false});
    }
    
  
    guardarOrden(e){
        e.preventDefault();
        if(this.state.pacienteSeleccionado==''||this.state.data.length==0){
            this.setState({showAlert:true,
                          titleAlert: "Campos Vacios",
                          messageAlert:"falta por llenar campos requeridos: Paciente o Pruebas de Laboratorio.",
                          typeAlert: 'error'});
        }else{
            instance.delete('/v1/encounter/'+this.state.idorden)
            .then(
                (res2) => {
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
        
    cambiarEstado(item){
        var data = this.state.data;
        data[item].seleccion = !data[item].seleccion;
        this.setState({data:data});
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