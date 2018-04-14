import React from 'react';
import {Link} from 'react-router';
import request from 'superagent';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {instance, servicios_id,cirugias_id,consultas_id,examenes_id,imagenes_id,paquetesDietetica_id,encounterTypeFinalizada_id, 
    encounterTypeOrdenPagada_id} from '../../axios-orders';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import {instance1} from '../../axios-openmrs';


export default class FormFacturacion extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
            data:[],
            pacienteSeleccionado: '',
            usuario:'',
            servicioSeleccionado: '',
            total:0,
            area:consultas_id,
            formaPago: '',
            totalPago: ''
            
        };
        this.searchPaciente = this.searchPaciente.bind(this);
        this.handleChangePaciente = this.handleChangePaciente.bind(this);
        this.getUsuario = this.getUsuario.bind(this);
        this.handleChangeUsuario = this.handleChangeUsuario.bind(this);     
        this.findValue = this.findValue.bind(this);
        this.guardarFactura = this.guardarFactura.bind(this);  
        this.handleFormaPago = this.handleFormaPago.bind(this);
        this.handleTotalPago = this.handleTotalPago.bind(this);
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
                console.log(resultado);
                return {options: resultado};
            }
        )
    }
    
    handleFormaPago(event){
        console.log(event.target.value);
        this.setState({formaPago: event.target.value});
    }

    handleTotalPago(event){
        console.log(event.target.value);
        this.setState({totalPago: event.target.value});

    }

    findValue(array, value){
        for (let key in array){
            console.log(array[key].id);
            if (array[key].id == value){
                console.log('repetido');
                return key;
            }
        }
        return false;
    }

    handleChangePaciente(opcion){
        instance.get('/v1/patient/'+opcion.value+'?v=full')
        .then(
            (res) => {
                instance.get('/v1/encounter?patient='+opcion.value+'&encounterType='+encounterTypeFinalizada_id+'&v=full')
                .then(
                    (res2) => {
                        console.log(res2.data);
                        let ordenes = [];
                        let fila = [];
                        let oldtotal;
                        let newtotal;
                        let nombreOrden;
                        let uuid; // uuid de la orden
                        let encounter_id; // uuid del encounter -> ver tabla Encounter
                        if(res2.data.results.length>0){
                            for (let encounter in res2.data.results){
                                for (let orden in res2.data.results[encounter].orders){
                                   if('concept' in res2.data.results[encounter].orders[orden] && res2.data.results[encounter].orders[orden].previousOrder){
                                    instance.get('/v1/concept/'+res2.data.results[encounter].orders[orden].concept.uuid)
                                        .then(
                                            (res3) => {
                                                let precio = 10;
                                                if (res3.data.descriptions.length>0){
                                                    precio = res3.data.descriptions[0].display;
                                                }
                                                encounter_id = res2.data.results[encounter].orders[orden].encounter.uuid;
                                                nombreOrden = res2.data.results[encounter].orders[orden].orderNumber;
                                                uuid = res2.data.results[encounter].orders[orden].uuid;
                                                fila = {
                                                    cod: uuid,
                                                    encounter: encounter_id,
                                                    orderNumber: nombreOrden,
                                                    nombre: res3.data.display,
                                                    precio: precio,
                                                }
                                                oldtotal = this.state.total;
                                                newtotal = oldtotal + parseFloat(precio);
                                                newtotal.toFixed(2);
                                                ordenes.push(fila);
                                                console.log(ordenes);
                                                this.setState({data:ordenes, total: newtotal});
                                            }
                                        ).catch((err)=>{console.log(err);})
                                   }
                                }
                            }
                        }
                        this.setState({pacienteSeleccionado:opcion});
                    }
                ).catch((err)=>{console.log(err);})
            }
        ).catch((err)=>{console.log(err);})
    }
    
    guardarFactura(){
        const ordenes = [...this.state.data];

        const body = {"encounterType": encounterTypeOrdenPagada_id}

        const factura = {
            items: this.state.data,
            user: this.state.usuario,
            paciente: this.state.pacienteSeleccionado,
            total: this.state.total,
            fecha: moment().format('L').toString(),
            tipo: 'Facturación de Ordenes'
        } 
        instance1.post('/facturaOrdenes.json', factura)
            .then( response => {
                console.log('Save factura');
                for(let key in ordenes){
                    console.log(ordenes[key]);
                    instance.post('/v1/encounter/'+ ordenes[key].encounter, body)
                    .then(
                        (res) => {
                            console.log('Change Encounters');
                        }
                    ).catch((err)=>{console.log(err.response.data);})
                }
            } )
            .catch((err)=>{console.log(err.response.data);} );
    }

    generarFactura(e){
        e.preventDefault();
        /*var body = {
            cashPoint: "21e37966-e632-4ec9-8ca1-68d74416e5b1",
            cashier: "1296b0dc-440a-11e6-a65c-00e04c680037",
            lineItems: [
                {
                    item:'ff3c5ee2-444b-46f3-a24a-9a65e90f675c',
                    quantity: 1,
                    priceUuid: '861a2104-4020-4d41-94a7-156fae92464b',
                    price: 2,
                }
            ],
            patient: this.state.pacienteSeleccionado.value,
            payments: [
                {
                    instanceType: '60e7d8f4-6056-496c-be13-0030928b0824',
                    amount: 2.0,
                    amountTendered: 2.0,
                }
            ],
            status: 'PENDING',
        };
        instance.post('/v2/cashier/bill', body)
            .then(
                (res) => {
                    console.log(response);
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
            )*/
        hashHistory.push('/');
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
                        <i className="icon-chevron-right link"></i>Ordenes
                    </li>
                </ul>
            </div>
        </section>
        <br/>
        {/*<form  id="formOrden">*/}
            <div style={{align: 'center'}}>
            <fieldset style= {{width: '90%'}}>
                <label htmlFor="usuario"> Usuario: </label>
                    <Select.Async 
                        autoload={false}
                        name="usuario" 
                        value={this.state.usuario} 
                        onChange={this.handleChangeUsuario}
                        loadOptions={this.getUsuario}
                        disabled={true}/>
            </fieldset>
            <fieldset style= {{width: '90%'}}>
                <legend>Paciente:</legend>
                <Select.Async 
                    autoload={false}
                    name="paciente" 
                    value={this.state.pacienteSeleccionado} 
                    onChange={this.handleChangePaciente}
                    loadOptions={this.searchPaciente}/>
            </fieldset>
            <fieldset style= {{width: '90%'}}>
                <legend>Ordenes:</legend>
                <br/>
                <br/>
                    <ReactTable 
                    data={this.state.data} 
                    noDataText="No existen ordenes"
                    columns={[{
                        Header: 'No.',
                        accessor:'orderNumber'},{
                        Header: 'Nombre',
                        accessor:'nombre'},{
                        Header: 'Precio',
                        accessor:'precio'}
                    ]} 
                    defaultPageSize={10} 
                    sortable={true}/>
                <br/>   
                <form  id="formOrden"> 
                    <label htmlFor='totaltodo'>Total: </label>
                    <input type='text' name='totaltodo' id='totaltodo' value={this.state.total}/>
                    <label htmlFor='totalpagar'>Total a Pagar: </label>
                    <input type='text' name='totalpagar' id='totalpagar' value={this.state.total}/>
                </form>
            </fieldset>
            <fieldset style= {{width: '90%'}}>
                <legend>Pagos:</legend>
                <form>
                    <label htmlFor='formapago'>Forma de pago: </label>
                    <input type='text' name='formapago' id='formapago' onChange={this.handleFormaPago}/>
                    <label htmlFor='cuotas'>Cantidad: </label>
                    <input type='text' name='cuotas' id='cuotas' onChange={this.handleTotalPago}/>
                </form>
            </fieldset>
            <br/>
            <br/>
            <div>
                <form>
                    <Link to="/"><button className="btn" type="submit" style={{float:'left'}} onClick={this.guardarFactura}>Guardar Factura</button></Link>
                    <Link to="/"><button type="button" className="btn" style={{float:'right'}}>Descartar</button></Link>
                </form>
            </div>
            </div>
        {/*</form>*/}
    </div>
    )
  }
}