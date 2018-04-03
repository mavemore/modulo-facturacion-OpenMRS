import React from 'react';
import {Link} from 'react-router';
import request from 'superagent';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import ReactTable from 'react-table';
import {instance} from '../../axios-orders';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
const selectRowProp = {
  mode: 'checkbox'
};

const options = {   // A hook for after insert rows
};

export default class FormLaboratorio extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
            date: moment(),
            data:[],
            datashow: [],
            pacienteSeleccionado: '',
            medico: '',
            ubicacion:'',
            muestra: '',
            examen: '',
            observaciones: '',
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
        this.anadirFilas = this.anadirFilas.bind(this);
        this.removerExamen = this.removerExamen.bind(this);
        this.handleChangeObs = this.handleChangeObs.bind(this);
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
        return instance.get('/v1/concept?searchType=fuzzy&name='+query+'&class=8d492d0a-c2cc-11de-8d13-0010c6dffd0f&v=custom:(uuid,display,conceptClass)')
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
        return instance.get('/v1/concept?searchType=fuzzy&name='+query+'&class=8d4907b2-c2cc-11de-8d13-0010c6dffd0f&v=custom:(uuid,display,conceptClass)')
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
        
    handleChangeExamen(opcion){
        this.setState({examen:opcion});
    }
  
    generarOrden(e){
        e.preventDefault();
        var ordenes = this.state.data.map((item) => ({
                  "type" : "testorder",
                  "patient" : this.state.pacienteSeleccionado.value,
                  "concept" : item.examen,
                  "orderer": this.state.medico.value,
                  "careSetting" : "c365e560-c3ec-11e3-9c1a-0800200c9a66",
                  "orderReasonNonCoded": item.observaciones,
                  "specimenSource": item.muestra,
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
                value: 'Laboratorio'}]
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
    
    handleChangeObs(e){
        this.setState({observaciones:e.target.value});
    }

    handleChange(date){
        this.setState({date:date});
    }
    
    anadirFilas(){
        var newdatashow = {examen: this.state.examen.label, 
                      muestra: this.state.muestra.label,
                      observaciones: this.state.observaciones}
        var newdata = {examen: this.state.examen.value, 
                      muestra: this.state.muestra.value,
                      observaciones: this.state.observaciones}
        this.setState({
            data: this.state.data.concat(newdata), 
            datashow: this.state.datashow.concat(newdatashow), 
            examen: {},
            muestra:{},
            observaciones: '',
        });
    }
    
    removerExamen(index){
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
        
    const columnas = [{
                        Header: 'Examen',
                        accessor:'examen'},{
                        Header: 'Muestra',
                        accessor:'muestra'},{
                        Header: 'Observaciones',
                        accessor:'observaciones'},{
                        Header: 'Acciones',
                        id:'button',
                        accessor:'index',
                        Cell: ({value})=> (<button type="button" onClick={this.removerExamen({value})}>Remover</button>)
                        }
                      ]

    const filas = this.state.datashow.map(function(row,i){        
            return ({
                    index: i,
                    examen: row.examen,
                    muestra: row.muestra,
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