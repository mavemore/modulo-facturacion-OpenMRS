import React from 'react';
import {Link} from 'react-router';
import request from 'superagent';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import ReactTable from 'react-table';
import {instance} from '../../axios-orders';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
const selectRowProp = {
  mode: 'checkbox'
};

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
                        console.log(idMedico)
                        medicoObj = resultado.find(x => x.person == idMedico);
                        console.log(medicoObj);
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
        return instance.get('/v1/concept/162384AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
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
        return instance.get('/v1/concept/162394AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
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
  
    generarOrden(e){
        e.preventDefault();
        var ordenes = this.state.data.map((item) => ({
                  "type" : "drugorder",
                  "patient" : this.state.pacienteSeleccionado.value,
                  "concept" : item.medicina,
                  "orderer": this.state.medico.value,
                  "careSetting" : "c365e560-c3ec-11e3-9c1a-0800200c9a66",
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
            "encounterProviders": [{"provider": this.state.medico.value, "encounterRole": "240b26f9-dd88-4172-823d-4a8bfeb7841f"}],
            "encounterType": "bc26c537-023c-4284-b921-bc83bb16101c",
            "encounterDatetime": this.state.date.format(),
            "orders": ordenes,
            "obs": [
                {obsDatetime: this.state.date.format(), 
                concept:'70885eca-dfe9-4d6a-9dfd-cd2feebd77f3',
                value: 'Farmacia'}]
        }
        instance.post('/v1/encounter', body)
        .then(
            (res) => {
                console.log("yaaas");
            }
        ).catch(
            (err)=> {
                console.log(err);
            }
        )
    }

    handleChange(date){
        this.setState({date:date});
    }
    
    removerMed(index){
        /*var filas = this.state.data;
        var filashow = this.state.datashow;
        filas.splice(index,1);
        filashow.splice(index,1);
        this.setState({data:filas, datashow: filashow});*/
        console.log(index);
    }
    
    render() {
    const { data } = this.state;
        const Style1 = {
            float: 'left',
		};
		const Style2 = {
            float: 'right',
		};
       
    /*var filas = this.state.datashow.map(function(row,i){
            return (<tr key={i}>
                    <td>{row.medicina}</td>
                    <td>{row.dosis}</td>
                    <td>{row.unidad}</td>
                    <td>{row.frecuencia}</td>
                    <td>{row.route}</td>
                    <td>{row.observaciones}</td>
                    <td><button type="button" onClick={this.removerMed.bind(this)}>Remover</button></td>
                </tr>)
        }.bind(this))*/
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
                        id:'button',
                        accessor:'index',
                        Cell: ({value})=> (<button type="button" onClick={this.removerMed({value})}>Remover</button>)
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