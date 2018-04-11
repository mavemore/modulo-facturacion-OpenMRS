import React from 'react';
import {Link} from 'react-router';
import request from 'superagent';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {instance, servicios_id,cirugias_id,consultas_id,examenes_id,imagenes_id,paquetesDietetica_id,encounterTypeFinalizada_id} from '../../axios-orders';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

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
            
        };
        this.searchPaciente = this.searchPaciente.bind(this);
        this.handleChangePaciente = this.handleChangePaciente.bind(this);
        this.getUsuario = this.getUsuario.bind(this);
        this.handleChangeUsuario = this.handleChangeUsuario.bind(this);
        this.searchServicios = this.searchServicios.bind(this);
        this.handleChangeServicio = this.handleChangeServicio.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.onAfterDeleteRow = this.onAfterDeleteRow.bind(this);
        this.findValue = this.findValue.bind(this);
        this.handleChangeArea = this.handleChangeArea.bind(this);
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
    
    handleChangePaciente(opcion){
        instance.get('/v1/patient/'+opcion.value+'?v=full')
        .then(
            (res) => {
                instance.get('/v1/encounter?patient='+opcion.value+'&encounterType='+encounterTypeFinalizada_id+'&v=full')
                .then(
                    (res2) => {
                        var ordenes = [];
                        var fila = [];
                        if(res2.data.results.length>0){
                            for (var encounter in res2.data.results){
                                for (var orden in res2.data.results[encounter].orders){
                                   if('concept' in res2.data.results[encounter].orders[orden]){
                                   instance.get('/v1/concept/'+res2.data.results[encounter].orders[orden].concept.uuid)
                                    .then(
                                        (res3) => {
                                            var precio = '';
                                            if (res3.data.descriptions.length>0){
                                                precio = res3.data.descriptions[0].display;
                                            }
                                            fila = {
                                                cod: res3.data.uuid,
                                                nombre: res3.data.display,
                                                cantidad: 1,
                                                precio: precio,
                                            }
                                            ordenes.push(fila);
                                        }
                                    ).catch((err)=>{console.log(err);})
                                   }
                                    
                                }
                            }
                        }
                        this.setState({pacienteSeleccionado:opcion, data:ordenes});
                    }
                ).catch((err)=>{console.log(err);})
            }
        ).catch((err)=>{console.log(err);})
    }
     
    searchServicios(){
        return instance.get('/v1/concept/'+ this.state.area +'?v=full')
        .then( response => {
            let resultado = [];
            console.log(response.data.setMembers);
            if ('data' in response){
                resultado = response.data.setMembers.map((item) => ({
                    value: item.uuid,
                    label: item.display,
                    //precio: item.descriptions[0].display,
                    //nombre: item.display,
                }));
                console.log(resultado);
            }
            return {options: resultado};
        })
    }
    
    handleChangeArea(event){
        console.log(event.target.value);
        this.setState({area: event.target.value});
    }

    handleChangeServicio(opcion){
        console.log('opcion:'+opcion);
        this.setState({servicioSeleccionado:opcion});
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

    fetchData(){
        let servicio = this.state.servicioSeleccionado;
        //console.log(servicio);
        const array = [...this.state.data];
        let newTotal;
        let serv = {
            id : servicio.value,
            cod: servicio.value.slice(0,5),
            nombre : servicio.nombre,
            precio: servicio.precio,
            cantidad: 1
        }

        let index = this.findValue(array, serv.id);
        //console.log('index: '+ index);
        if(index === false){
            //console.log('no lo incluye')
            array.push(serv)
            let oldTotal = this.state.total;
            //console.log(oldTotal);
            let actualPrice = servicio.precio;
            //console.log(actualPrice);
            //console.log(parseFloat(actualPrice));
            newTotal = oldTotal + parseFloat(actualPrice)
            //console.log('total:'+newTotal);
        }
        else{
            //console.log('repetidox2' + index);
            //console.log(array[index]);
            array[index].cantidad = array[index].cantidad +1;
            //console.log('nueva cantidad:' + array[index].cantidad);
            let oldTotal = this.state.total;
            let actualPrice = array[index].precio;
            //console.log(actualPrice);
            newTotal = oldTotal + parseFloat(actualPrice)
            parseFloat(newTotal).toFixed(2);
            array[index].precio = array[index].precio * array[index].cantidad;
           // console.log('total:'+newTotal);
 
        }
        console.log(array);
        this.setState({data: array, total: newTotal});
    }

    onAfterDeleteRow(rowKeys){
        const updateArray = [...this.state.data];
        let newTotal;
        for (let key in updateArray){
            console.log('id:'+ updateArray[key].cod + ' rowkey:' + rowKeys);
            if(updateArray[key].cod == rowKeys){
                //console.log('Eliminar esta:'+ updateArray[key].id);
                let oldTotal = this.state.total;
                let antPrice = updateArray[key].precio;
                newTotal = oldTotal - antPrice;
                //console.log(newTotal);
                newTotal.toFixed(2);
                //console.log(newTotal);
                updateArray.splice(key, 1);
                break;
            }
        }
        this.setState({data: updateArray, total: newTotal});
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
    

    const options = {
        afterDeleteRow: this.onAfterDeleteRow  // A hook for after droping rows.
    };

    // If you want to enable deleteRow, you must enable row selection also.
    const selectRowProp = {
        mode: 'checkbox'
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
                <br/>
                <br/>
                    <BootstrapTable data={ this.state.data } deleteRow={ true } selectRow={ selectRowProp } options={ options }>
                        <TableHeaderColumn dataField='cod' isKey>ID</TableHeaderColumn>
                        <TableHeaderColumn dataField='nombre'>Nombre</TableHeaderColumn>
                        <TableHeaderColumn dataField='cantidad'>Cantidad</TableHeaderColumn>
                        <TableHeaderColumn dataField='precio'>Total</TableHeaderColumn>
                    </BootstrapTable>
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
                    <input type='text' name='formapago' id='formapago'/>
                    <label htmlFor='cuotas'>Cantidad: </label>
                    <input type='text' name='cuotas' id='cuotas'/>
                </form>
            </fieldset>
            <br/>
            <br/>
            <div>
                <form onSubmit={this.generarFactura.bind(this)}>
                    <button className="btn" type="submit" style={{float:'left'}}>Guardar Factura</button>
                    <Link to="/"><button type="button" className="btn" style={{float:'right'}}>Descartar</button></Link>
                </form>
            </div>
            </div>
        {/*</form>*/}
    </div>
    )
  }
}