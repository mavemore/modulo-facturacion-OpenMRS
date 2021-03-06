import React from 'react';
import {Link, hashHistory} from 'react-router';
import request from 'superagent';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import ReactTable from 'react-table';
import {instance,unidades_id,routes_id,ObservacioneAreaServicio_id,encounterTypeOrdenNueva_id,encounterRoleClinician_id,careSettingInpatient_id,encounterTypeOrdenAceptada_id} from '../../axios-orders';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import Simplert from 'react-simplert';

const options = {   // A hook for after insert rows
};

export default class FormFarmacia extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
            date: moment(),
            data:[],
            datashow: [],
            fechaInicio: moment(),
            fechaFin: moment(),
            pacienteSeleccionado: '',
            medico: '',
            ubicacion:{display:'', uuid:''},
            medicinaSeleccionada: '',
            unidad:'',
            dosis: 0.00,
            observaciones: '',
            frecuencia: '',
            route: '',
            showAlert:false,
            titleAlert: "titulo",
            messageAlert:"mensaje",
            typeAlert:'success',
            guardar: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.searchPaciente = this.searchPaciente.bind(this);
        this.handleChangePaciente = this.handleChangePaciente.bind(this);
        this.getMedico = this.getMedico.bind(this);
        this.handleChangeMedico = this.handleChangeMedico.bind(this);
        this.searchMedicina = this.searchMedicina.bind(this);
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
                var ubicacion =res.data.identifiers[0].location;
                instance.get('/v1/encounter?patient='+opcion.value+'&v=full')
                .then(
                    (res2) => {
                        var ordenes = res2.data.results.filter(x => (x.encounterType.uuid==encounterTypeOrdenNueva_id||x.encounterType.uuid==encounterTypeOrdenAceptada_id))
                        ordenes = ordenes.filter(x=>x.obs[0].value == 'Farmacia');
                        var guardar = false;
                        if(ordenes.length>0){
                            guardar  = true;
                        }
                        console.log(res2.data.results);
                        console.log(ordenes);
                        console.log(guardar);
                        this.setState({pacienteSeleccionado:opcion, ubicacion: ubicacion, guardar:guardar});
                    }
                )
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
  
    generarOrden(e){
        e.preventDefault();
        if(this.state.pacienteSeleccionado==''||this.state.data.length==0){
            this.setState({showAlert:true,
                          titleAlert: "Campos Vacios",
                          messageAlert:"falta por llenar campos requeridos: Paciente o Medicamentos",
                          typeAlert: 'error'});
        }else{
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
        console.log(body);
        instance.post('/v1/encounter', body)
        .then(
            (res) => {
                hashHistory.push('/');
            }
        ).catch(
            (err)=> {
                console.log(err);
                console.log(err.response.data);

                this.setState({showAlert:true,
                          titleAlert: "Error Servidor",
                          messageAlert:"Ha ocurrido un error en el servidor",
                          typeAlert: 'error'});
            }
        )}
    }

    handleChange(date){
        this.setState({date:date});
    }
    
    removerMed(index){
        var filas = this.state.data;
        var filashow = this.state.datashow;
        filas.splice(index,1);
        filashow.splice(index,1);
        this.setState({data:filas, datashow: filashow});
        console.log(index);
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

    const filas = this.state.datashow.map(function(row,i){        
            return ({
                    index: i,
                    medicina: row.medicina,
                    dosis: row.dosis,
                    unidad: row.unidad,
                    frecuencia: row.frecuencia,
                    route: row.route,
                    observaciones: row.observaciones,
            })});
        
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
                    <label htmlFor="ubicacion">Ubicacion:</label>
                    <input type='text' name="ubicacion" value={this.state.ubicacion.display} id="ubicacion" readOnly/>
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
                    </fieldset>
                    <br></br>
                    <br></br>
                    <ReactTable 
                      data={filas} 
                      noDataText="No existen ordenes"
                      columns={columnas} 
                      defaultPageSize={5} 
                      sortable={true}/>
                </div>
                <br></br>
                <br></br>
                <div>
                    <button className="btn" type="submit" r disabled={this.state.guardar}>Generar Orden</button>
                    <span>     </span>
                    <Link to="/"><button className="btn" type="button">Descartar</button></Link>
                </div>
            </form>
        </div>
    </div>
    )
  }
}