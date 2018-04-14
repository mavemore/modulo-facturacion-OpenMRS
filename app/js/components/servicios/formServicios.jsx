import React from 'react';
import Header from '../global/Header';
import {Link, hashHistory} from 'react-router';
import ReactTable from 'react-table';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import Select from 'react-select';
import {instance, servicios_id, datatype_id, conceptclass_id,cirugias_id,consultas_id,examenesSangre_id,examenesOrina_id,examenesSputum_id,examenes_id,examenesSerum_id,examenesPlasma_id,examenesHeces_id,examenesCerebroEspinal_id,examenesFluidoAscitico_id,sangre_id,orina_id,sputum_id,serum_id,plasma_id,heces_id,fluidoCerebro_id,fluidoAscitico_id,specimenSources_id,imagenes_id,paquetesDietetica_id} from '../../axios-orders';

export default class formServicios extends React.Component{  
    constructor(){
        super();
        this.state = {
            nombre: '',
            precio: '',
            fecha: moment(),
            area:consultas_id,
            muestra: '',
        };
        this.handleChangeInicio = this.handleChangeInicio.bind(this);
        this.nombreChangedHandler = this.nombreChangedHandler.bind(this);
        this.precioChangedHandler = this.precioChangedHandler.bind(this);
        this.guardarServicio = this.guardarServicio.bind(this);
        this.handleChangeArea = this.handleChangeArea.bind(this);
        this.searchMuestra = this.searchMuestra.bind(this);
        this.handleChangeMuestra = this.handleChangeMuestra.bind(this);
    }

    handleChangeInicio(date){
        this.setState({fecha:date});
    }
    
    searchMuestra(query){
        //return instance.get('/v1/concept?searchType=fuzzy&name='+query+'&class='+specimenSources_id+'&v=custom:(uuid,display,conceptClass)')
        return instance.get('/v1/concept/'+specimenSources_id)
        .then(
            (res) => {
                console.log('res.data');
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
        
    handleChangeMuestra(opcion){
        this.setState({muestra:opcion});
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
        this.setState({area: event.target.value});
    }

    guardarServicio(e){
        e.preventDefault();
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
        instance.post( '/v1/concept/', prueba )
             .then( 
            (response) => {
                
                var area = this.state.area;
                console.log('Area 0:' + area);
                if (this.state.area == examenes_id){
                    console.log('Area == examen id');
                    var muestra = this.state.muestra;
                    console.log('muestra:' + muestra);
                    if (muestra.value == sangre_id){
                            area = examenesSangre_id;
                        }else if (muestra.value == orina_id){
                            area = examenesOrina_id;
                        }else if (muestra.value == sputum_id){
                            area = examenesSputum_id;
                        }else if (muestra.value == serum_id){
                            area = examenesSerum_id;
                        }else if (muestra.value == plasma_id){
                            area = examenesPlasma_id;
                        }else if (muestra.value == heces_id){
                            area = examenesHeces_id;
                        }else if (muestra.value == fluidoCerebro_id){
                            area = examenesCerebroEspinal_id;
                        }else if (muestra.value == fluidoAscitico_id){
                            area = examenesFluidoAscitico_id;
                        }
                }
                console.log('Area:' + area);
                console.log('guardado');
                 var uuid='';
                 var members = {"setMembers":[]};
                instance.get('/v1/concept/'+response.data.uuid+'?v=full')
                    .then(response => {
                        uuid = response.data.uuid;
                        console.log('uuid:'+ uuid);
                        console.log(response.data);
                        instance.get('/v1/concept/'+ area +'?v=full')
                            .then(response => {
                                console.log('members:'+ response.data.setMembers);
                                members.setMembers.push(uuid);
                                for (let key in response.data.setMembers){
                                    members.setMembers.push(response.data.setMembers[key].uuid)
                                    console.log(members);
                                }
                                console.log(members);
                                instance.post('/v1/concept/' + area, members)
                                    .then(response => {
                                        console.log("save")
                                        hashHistory.push('/servicios');
                                    })
                                    .catch((err) => { console.log(err); } )
                            })
                            .catch( (err) => { console.log(err); });
                    })
                    .catch((err) => { console.log(err); })
            
             })
            .catch( (err) => { console.log(err); }  );
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
                <form onSubmit={this.guardarServicio.bind(this)} style = {{marginLeft: '50px'}}>
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
                            {this.state.area!=examenes_id?null:
                                <div>
                                    <label> Muestra: </label>
                                    <Select.Async 
                                    autoload={false}
                                    name="muestra" 
                                    value={this.state.muestra} 
                                    onChange={this.handleChangeMuestra}
                                    loadOptions={this.searchMuestra}
                                    />
                                </div>}
                            <div>
                                <label> Fecha: </label>
                                <DatePicker selected={this.state.fecha} onChange={this.handleChangeInicio}/>
                            </div>
                            <br/>
                            <br/>
                            <div>
                                <button type="submit" className="button confirm" style={{float:'left'}}>
                                    <i className="icon-ok"></i>Aceptar
                                </button>
                                <Link to="/servicios"><button className="button cancel" type="button" style={{float:'right'}} >
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