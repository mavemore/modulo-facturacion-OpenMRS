import React from 'react';
import Header from '../global/Header';
import {Link} from 'react-router';
import ReactTable from 'react-table';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import {instance} from '../../axios-openmrs';

export default class formServicios extends React.Component{  
    constructor(){
        super();
        this.state = {
            codigo: '',
            nombre: '',
            precio: '',
            fecha: moment()
        };
        this.handleChangeInicio = this.handleChangeInicio.bind(this);
        this.codigoChangedHandler = this.codigoChangedHandler.bind(this);
        this.nombreChangedHandler = this.nombreChangedHandler.bind(this);
        this.precioChangedHandler = this.precioChangedHandler.bind(this);
        this.guardarServicio = this.guardarServicio.bind(this);
    }

    handleChangeInicio(date){
        this.setState({fecha:date});
    }

    codigoChangedHandler(event){
        console.log(event.target.value);
        this.setState({codigo: event.target.value});
    }

    nombreChangedHandler(event){
        console.log(event.target.value);
        this.setState({nombre: event.target.value});
    }

    precioChangedHandler(event){
        console.log(event.target.value);
        this.setState({precio: event.target.value});
    }

    guardarServicio(){
        const service = {
            codigo: this.state.codigo,
            nombre: this.state.nombre,
            precio: this.state.precio,
            fecha: this.state.fecha,
            //acciones: <div><i className="icon-pencil edit-action" title="Edit"></i><i className="icon-remove delete-action" title="Delete"></i></div>
        }
        instance.post( '/servicios.json', service )
             .then( response => {
                 console.log('guardado')
             } )
             .catch( error => { console.log('error')} );
    }

    render(){
        
        return(
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
								<Link to="/servicios"><i className="icon-chevron-right link"></i>Servicios</Link>
							</li>
                            <li>
								<i className="icon-chevron-right link"></i>Añadir Servicio
							</li>
						</ul>
					</div>
				</section>  
                <h2 style = {{marginLeft: '30px'}}>Ingresar Datos: </h2>
                <form style = {{marginLeft: '50px'}}>
                    <div><input placeholder="Ingresar Código" type="text" onChange={this.codigoChangedHandler}/></div>
                    <div><input placeholder="Ingresar Nombre" type="text" onChange={this.nombreChangedHandler}/></div>
                    <div><input placeholder="Ingresar Precio" type="number" onChange={this.precioChangedHandler}/></div>
                    <div>
                        <label> Fecha: </label>
                        <DatePicker selected={this.state.fecha} onChange={this.handleChangeInicio}/>
                    </div>
                    <br/>
                    <br/>
                    <div>
                        <Link to="/servicios"><button className="button confirm" style={{float:'left'}} onClick={this.guardarServicio}>
                            <i className="icon-ok"></i>Aceptar
                        </button></Link>
                        <Link to="/servicios/nuevo2"><button className="button cancel" style={{float:'right'}} >
                            <i className=" icon-remove "></i>Cancelar
                        </button></Link>
                    </div>
                </form>
            </div>
        );
    }
}