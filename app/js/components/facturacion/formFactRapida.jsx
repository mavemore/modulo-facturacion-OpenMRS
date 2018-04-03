import React from 'react';
import {Link} from 'react-router';
import request from 'superagent';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {instance} from '../../axios-orders';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
const selectRowProp = {
  mode: 'checkbox'
};

const options = {   // A hook for after insert rows
};

export default class FormFactRapida extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
            data:[],
            pacienteSeleccionado: '',
            usuario:'',
        };
        this.searchPaciente = this.searchPaciente.bind(this);
        this.handleChangePaciente = this.handleChangePaciente.bind(this);
        this.getUsuario = this.getUsuario.bind(this);
        this.handleChangeUsuario = this.handleChangeUsuario.bind(this);
    }
    
    getUsuario(){
        return instance.get('/v1/session')
        .then(
            (res) => {
                var opciones = [{value: res.data.user.person.uuid, label: res.data.user.person.display}];
                return {options: opciones};
            }
        )
    }
    
    componentDidMount(){
        instance.get('/v1/session')
        .then(
            (res) => {
                this.setState({usuario: {value: res.data.user.person.uuid, label: res.data.user.person.display}});
            }
        )
    }
    
    handleChangeUsuario(opcion){
        this.setState({usuario:opcion});
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
        
    render() {
    const { data } = this.state;
        const Style1 = {
            float: 'left',
		};
		const Style2 = {
            float: 'right',
		};
        
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
                        <Link to="/"><i className="icon-chevron-right link"></i>Facturacion</Link>
                    </li>
                    <li>
                        <i className="icon-chevron-right link"></i>Rapida
                    </li>
                </ul>
            </div>
        </section>
        <div>
            <form onSubmit={this.generarOrden.bind(this)} id="formOrden">
                <label htmlFor="usuario"> Usuario: </label>
                <Select.Async 
                    autoload={false}
                    name="usuario" 
                    value={this.state.usuario} 
                    onChange={this.handleChangeUsuario}
                    loadOptions={this.getUsuario}
                    disabled={true}/>
                <fieldset>
                    <legend>Paciente:</legend>
                    <Select.Async 
                    autoload={false}
                    name="paciente" 
                    value={this.state.pacienteSeleccionado} 
                    onChange={this.handleChangePaciente}
                    loadOptions={this.searchPaciente}/>
                    />
                </fieldset>
                <fieldset>
                    <legend>Lineas Items:</legend>
                   <BootstrapTable data={data} insertRow={ true } deleteRow={ true } selectRow={ selectRowProp } options={ options }>
                       <TableHeaderColumn dataField='codigo' isKey>ID</TableHeaderColumn>
                      <TableHeaderColumn dataField='descripcion'>Descripcion</TableHeaderColumn>
                      <TableHeaderColumn dataField='cantidad' >Cantidad</TableHeaderColumn>
                      <TableHeaderColumn dataField='precio' editable={false}>Precio</TableHeaderColumn>
                      <TableHeaderColumn dataField='total' editable={false}>Total</TableHeaderColumn>
                    </BootstrapTable>  
                    <label htmlFor='totaltodo'>Total: </label>
                   <input type='text' name='totaltodo' id='totaltodo'/>
                    <label htmlFor='totalpagar'>Total a Pagar: </label>
                   <input type='text' name='totalpagar' id='totalpagar'/>
               </fieldset>
                <fieldset>
                    <legend>Pagos:</legend>
                   <label htmlFor='formapago'>Forma de pago: </label>
                   <input type='text' name='formapago' id='formapago'/>
                   <label htmlFor='cuotas'>Cantidad: </label>
                   <input type='text' name='cuotas' id='cuotas'/>
               </fieldset>
                <div>
                    <Link to="/"><button className="btn" type="submit">Guardar Factura</button></Link>
                    <Link to="/"><button className="btn">Descartar</button></Link>
                </div>
            </form>
        </div>
    </div>
    )
  }
}