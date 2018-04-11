import React from 'react';
import Header from '../global/Header';
import {Link} from 'react-router';
import ReactTable from 'react-table';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import {instance, servicios_id, datatype_id, conceptclass_id,cirugias_id,consultas_id,examenes_id,imagenes_id,paquetesDietetica_id} from '../../axios-orders';

export default class formServicios extends React.Component{  
    constructor(){
        super();
        this.state = {
            nombre: '',
            precio: '',
            fecha: moment(),
            area:consultas_id,
        };
        this.handleChangeInicio = this.handleChangeInicio.bind(this);
        this.nombreChangedHandler = this.nombreChangedHandler.bind(this);
        this.precioChangedHandler = this.precioChangedHandler.bind(this);
        this.guardarServicio = this.guardarServicio.bind(this);
        this.handleChangeArea = this.handleChangeArea.bind(this);
    }

    handleChangeInicio(date){
        this.setState({fecha:date});
    }

    nombreChangedHandler(event){
        console.log(event.target.value);
        this.setState({nombre: event.target.value});
    }

    precioChangedHandler(event){
        console.log(event.target.value);
        this.setState({precio: event.target.value});
    }
    
    handleChangeArea(event){
        console.log(event.target.value);
        this.setState({area: event.target.value});
    }

    guardarServicio(){
        const prueba = {
            "names": [
                    {
                    "name": this.state.nombre,
                    "locale": "es",
                    "localePreferred": true,
                    "conceptNameType": "FULLY_SPECIFIED"
                    }
                ],
                "datatype": datatype_id,
                "set": false,
                "version":this.state.fecha.format('L').toString(),               
                "hiNormal": "10",
                "hiAbsolute": "10",
                "hiCritical": "10",
                "lowNormal": "1",
                "lowAbsolute": "1",
                "lowCritical": "1",
                "allowDecimal": true,
                "displayPrecision": 2,
                "conceptClass": conceptclass_id,
                "descriptions": [{
                    "description": this.state.precio	
                    } 
                ],
        }
        instance.post( '/v1/concept', prueba )
             .then( 
            (response) => {
                 console.log('guardado');
                 let uuid;
                 let members = {"setMembers":[]};
                instance.get('/v1/concept?v=full&q='+this.state.nombre)
                    .then(response => {
                        //console.log(response.data);
                        uuid = response.data.results[0];
                        //console.log(uuid);
                        instance.get('/v1/concept/'+ servicios_id +'?v=full')
                            .then(response => {
                                console.log(response.data);
                                response.data.setMembers.push(uuid)
                                for (let key in response.data.setMembers){
                                    members.setMembers.push(response.data.setMembers[key].uuid)
                                    console.log(members);
                                }
                                instance.post('/v1/concept/' + this.state.area +'?v=full', members)
                                    .then(response => {
                                        console.log("save")
                                    })
                                    .catch((err) => { console.log(err.response.data); } )
                            })
                            .catch( (err) => { console.log(err.response.data); });
                    })
                    .catch((err) => { console.log(err); })
            
             } )
             .catch( (err) => { console.log(err.response.data); }  );
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
                    <div style= {{align: 'center'}}>
                        <fieldset style= {{width: '90%'}}>
                            <div><input placeholder="Ingresar Nombre" type="text" onChange={this.nombreChangedHandler}/></div>
                            <div><input placeholder="Ingresar Precio" type="number" onChange={this.precioChangedHandler}/></div>
                            <div>
                                <label> Area: </label>
                                <select onChange={this.handleChangeArea}>
                                    <option value={consultas_id}>Consultas</option>
                                    <option value={cirugias_id}>Cirugias</option>
                                    <option value={examenes_id}>Laboratorio</option>
                                    <option value={imagenes_id}>Imagenes</option>
                                    <option value={paquetesDietetica_id}>Dietetica</option>
                                </select>
                            </div>
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
                                <Link to="/servicios"><button className="button cancel" style={{float:'right'}} >
                                    <i className=" icon-remove "></i>Cancelar
                                </button></Link>
                            </div>
                        </fieldset>   
                    </div>
                </form>
            </div>
        );
    }
}