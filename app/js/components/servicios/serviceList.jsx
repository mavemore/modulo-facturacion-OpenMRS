import React from 'react';
import Header from '../global/Header';
import {Link} from 'react-router';
import moment from 'moment';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import {instance, servicios_id,cirugias_id,consultas_id,examenesSangre_id,examenesOrina_id,examenesSputum_id,examenesSerum_id,examenesPlasma_id,examenesHeces_id,examenesCerebroEspinal_id,examenesFluidoAscitico_id,ObservacioneAreaServicio_id,sangre_id,orina_id,sputum_id,serum_id,plasma_id,heces_id,fluidoCerebro_id,fluidoAscitico_id,specimenSources_id,imagenes_id,paquetesDietetica_id} from '../../axios-orders';


export default class serviceList extends React.Component{  
    
    constructor(){
        super();
        this.state = {
            data : [],
            loading : false
        };
        this.fetchData = this.fetchData.bind(this);   
        this.eliminarServicio = this.eliminarServicio.bind(this);
    }
    
    eliminarServicio(uuid){
        console.log(uuid);
        

        instance.delete('/v1/concept/'+uuid, {params: {'uuid':uuid}})
            .then(response => {
                console.log(response);
                console.log('deleted');
                const updateData = [...this.state.data];
                for (let key in updateData){
                    //console.log(updateData[key])
                    if(updateData[key]._uuid == uuid ){
                        console.log('son iguales');
                        updateData.splice(key, 1);
                        break;
                    }
                }
                this.setState({data: updateData});
            })
            .catch((err) => { console.log(err.response.data); })
    }

    fetchData(){
        this.setState( { loading: true } );
        let newData = [];
                let name;
                let precio;
                let fecha = moment().format('L')
                let uuid;
        instance.get('/v1/concept/'+ cirugias_id +'?v=full')
            .then( response => {
            for (let key in response.data.setMembers){
                    name = response.data.setMembers[key].name.name;
                    uuid = response.data.setMembers[key].uuid;
                    if (response.data.setMembers[key].descriptions.length>0){
                        precio = response.data.setMembers[key].descriptions[0].display;
                    } 
                    if(response.data.setMembers[key].version){
                        fecha = response.data.setMembers[key].version
                    }
                    let newItem = {
                        nombre: name,
                        precio: parseFloat(precio),
                        fecha: fecha,
                        _uuid: uuid,
                        acciones:   <div>
                                        <button className="button"  onClick={() => this.eliminarServicio(newItem._uuid)}>
                                            Remover</button>
                                    </div>,
                        area: 'Cirugia',
                        /**acciones: <div><i className="icon-remove delete-action" title="Delete" onClick={this.eliminarServicio(uuid)}></i></div>**/
                    };
                    //console.log(newItem);
                    newData.push(newItem); 
                }
                instance.get('/v1/concept/'+ consultas_id +'?v=full')
                .then( response => 
                      {for (let key in response.data.setMembers){
                        name = response.data.setMembers[key].name.name;
                        uuid = response.data.setMembers[key].uuid;
                        if (response.data.setMembers[key].descriptions.length>0){
                            precio = response.data.setMembers[key].descriptions[0].display;
                        } 
                        if(response.data.setMembers[key].version){
                            fecha = response.data.setMembers[key].version
                        }
                        let newItem = {
                            nombre: name,
                            precio: parseFloat(precio),
                            fecha: fecha,
                            _uuid: uuid,
                            area: 'Consulta',
                            acciones:   <div>
                                        <button className="button"  onClick={() => this.eliminarServicio(newItem._uuid)}>
                                            Remover</button>
                                    </div>,
                            /**acciones: <div><i className="icon-remove delete-action" title="Delete" onClick={this.eliminarServicio(uuid)}></i></div>**/
                        };
                        newData.push(newItem); 
                }
                    instance.get('/v1/concept/'+ examenesSangre_id +'?v=full')
                    .then( response => 
                      {for (let key in response.data.setMembers){
                        name = response.data.setMembers[key].name.name;
                        uuid = response.data.setMembers[key].uuid;
                        if (response.data.setMembers[key].descriptions.length>0){
                            precio = response.data.setMembers[key].descriptions[0].display;
                        } 
                        if(response.data.setMembers[key].version){
                            fecha = response.data.setMembers[key].version
                        }
                        let newItem = {
                            nombre: name,
                            precio: parseFloat(precio),
                            fecha: fecha,
                            _uuid: uuid,
                            area: 'Examenes',
                            acciones:   <div>
                                        <button className="button"  onClick={() => this.eliminarServicio(newItem._uuid)}>
                                            Remover</button>
                                    </div>,
                        };
                        newData.push(newItem); 
                    }
                    instance.get('/v1/concept/'+ imagenes_id +'?v=full')
                    .then( response => 
                          {for (let key in response.data.setMembers){
                            name = response.data.setMembers[key].name.name;
                            uuid = response.data.setMembers[key].uuid;
                            if (response.data.setMembers[key].descriptions.length>0){
                                precio = response.data.setMembers[key].descriptions[0].display;
                            } 
                            if(response.data.setMembers[key].version){
                                fecha = response.data.setMembers[key].version
                            }
                            let newItem = {
                                nombre: name,
                                precio: parseFloat(precio),
                                fecha: fecha,
                                _uuid: uuid,
                                area:'Imagenes',
                                acciones:   <div>
                                        <button className="button"  onClick={() => this.eliminarServicio(newItem._uuid)}>
                                            Remover</button>
                                    </div>,
                            };
                            newData.push(newItem); 
                        }
                        instance.get('/v1/concept/'+ paquetesDietetica_id +'?v=full')
                        .then( response => 
                              {for (let key in response.data.setMembers){
                                name = response.data.setMembers[key].name.name;
                                uuid = response.data.setMembers[key].uuid;
                                if (response.data.setMembers[key].descriptions.length>0){
                                    precio = response.data.setMembers[key].descriptions[0].display;
                                } 
                                if(response.data.setMembers[key].version){
                                    fecha = response.data.setMembers[key].version
                                }
                                let newItem = {
                                    nombre: name,
                                    precio: parseFloat(precio),
                                    fecha: fecha,
                                    _uuid: uuid,
                                    area: 'Dietetica',
                                    acciones:   <div>
                                        <button className="button"  onClick={() => this.eliminarServicio(newItem._uuid)}>
                                            Remover</button>
                                    </div>,
                                };
                                newData.push(newItem); 
                            }
                            instance.get('/v1/concept/'+ examenesOrina_id +'?v=full')
                        .then( response => 
                              {for (let key in response.data.setMembers){
                                name = response.data.setMembers[key].name.name;
                                uuid = response.data.setMembers[key].uuid;
                                if (response.data.setMembers[key].descriptions.length>0){
                                    precio = response.data.setMembers[key].descriptions[0].display;
                                } 
                                if(response.data.setMembers[key].version){
                                    fecha = response.data.setMembers[key].version
                                }
                                let newItem = {
                                    nombre: name,
                                    precio: parseFloat(precio),
                                    fecha: fecha,
                                    _uuid: uuid,
                                    area: 'Examenes',
                                    acciones:   <div>
                                        <button className="button"  onClick={() => this.eliminarServicio(newItem._uuid)}>
                                            Remover</button>
                                    </div>, 
                                };
                                newData.push(newItem); 
                            }
                            instance.get('/v1/concept/'+ examenesSputum_id +'?v=full')
                        .then( response => 
                              {for (let key in response.data.setMembers){
                                name = response.data.setMembers[key].name.name;
                                uuid = response.data.setMembers[key].uuid;
                                if (response.data.setMembers[key].descriptions.length>0){
                                    precio = response.data.setMembers[key].descriptions[0].display;
                                } 
                                if(response.data.setMembers[key].version){
                                    fecha = response.data.setMembers[key].version
                                }
                                let newItem = {
                                    nombre: name,
                                    precio: parseFloat(precio),
                                    fecha: fecha,
                                    _uuid: uuid,
                                    area: 'Examenes',
                                    acciones:   <div>
                                        <button className="button"  onClick={() => this.eliminarServicio(newItem._uuid)}>
                                            Remover</button>
                                    </div>,
                                };
                                newData.push(newItem); 
                            }
                            instance.get('/v1/concept/'+ examenesSerum_id +'?v=full')
                        .then( response => 
                              {for (let key in response.data.setMembers){
                                name = response.data.setMembers[key].name.name;
                                uuid = response.data.setMembers[key].uuid;
                                if (response.data.setMembers[key].descriptions.length>0){
                                    precio = response.data.setMembers[key].descriptions[0].display;
                                } 
                                if(response.data.setMembers[key].version){
                                    fecha = response.data.setMembers[key].version
                                }
                                let newItem = {
                                    nombre: name,
                                    precio: parseFloat(precio),
                                    fecha: fecha,
                                    _uuid: uuid,
                                    area: 'Examenes',
                                    acciones:   <div>
                                        <button className="button"  onClick={() => this.eliminarServicio(newItem._uuid)}>
                                            Remover</button>
                                    </div>,
                                };
                                newData.push(newItem); 
                            }
                            instance.get('/v1/concept/'+ examenesPlasma_id +'?v=full')
                        .then( response => 
                              {for (let key in response.data.setMembers){
                                name = response.data.setMembers[key].name.name;
                                uuid = response.data.setMembers[key].uuid;
                                if (response.data.setMembers[key].descriptions.length>0){
                                    precio = response.data.setMembers[key].descriptions[0].display;
                                } 
                                if(response.data.setMembers[key].version){
                                    fecha = response.data.setMembers[key].version
                                }
                                let newItem = {
                                    nombre: name,
                                    precio: parseFloat(precio),
                                    fecha: fecha,
                                    _uuid: uuid,
                                    area: 'Examenes',
                                    acciones:   <div>
                                        <button className="button"  onClick={() => this.eliminarServicio(newItem._uuid)}>
                                            Remover</button>
                                    </div>,
                                };
                                newData.push(newItem); 
                            }
                            instance.get('/v1/concept/'+ examenesHeces_id +'?v=full')
                        .then( response => 
                              {for (let key in response.data.setMembers){
                                name = response.data.setMembers[key].name.name;
                                uuid = response.data.setMembers[key].uuid;
                                if (response.data.setMembers[key].descriptions.length>0){
                                    precio = response.data.setMembers[key].descriptions[0].display;
                                } 
                                if(response.data.setMembers[key].version){
                                    fecha = response.data.setMembers[key].version
                                }
                                let newItem = {
                                    nombre: name,
                                    precio: parseFloat(precio),
                                    fecha: fecha,
                                    _uuid: uuid,
                                    area: 'Examenes',
                                    acciones:   <div>
                                        <button className="button"  onClick={() => this.eliminarServicio(newItem._uuid)}>
                                            Remover</button>
                                    </div>,
                                };
                                newData.push(newItem); 
                            }
                            instance.get('/v1/concept/'+ examenesCerebroEspinal_id +'?v=full')
                        .then( response => 
                              {for (let key in response.data.setMembers){
                                name = response.data.setMembers[key].name.name;
                                uuid = response.data.setMembers[key].uuid;
                                if (response.data.setMembers[key].descriptions.length>0){
                                    precio = response.data.setMembers[key].descriptions[0].display;
                                } 
                                if(response.data.setMembers[key].version){
                                    fecha = response.data.setMembers[key].version
                                }
                                let newItem = {
                                    nombre: name,
                                    precio: parseFloat(precio),
                                    fecha: fecha,
                                    _uuid: uuid,
                                    area: 'Examenes',
                                    acciones:   <div>
                                        <button className="button"  onClick={() => this.eliminarServicio(newItem._uuid)}>
                                            Remover</button>
                                    </div>,
                                };
                                newData.push(newItem); 
                            }
                            instance.get('/v1/concept/'+ examenesFluidoAscitico_id +'?v=full')
                        .then( response => 
                              {for (let key in response.data.setMembers){
                                name = response.data.setMembers[key].name.name;
                                uuid = response.data.setMembers[key].uuid;
                                if (response.data.setMembers[key].descriptions.length>0){
                                    precio = response.data.setMembers[key].descriptions[0].display;
                                } 
                                if(response.data.setMembers[key].version){
                                    fecha = response.data.setMembers[key].version
                                }
                                let newItem = {
                                    nombre: name,
                                    precio: parseFloat(precio),
                                    fecha: fecha,
                                    _uuid: uuid,
                                    area: 'Examenes',
                                    acciones:   <div>
                                        <button className="button"  onClick={() => this.eliminarServicio(newItem._uuid)}>
                                            Remover</button>
                                    </div>,
                                };
                                newData.push(newItem); 
                            }
                            this.setState({data: newData, loading: false});
                            } );
                            } );
                            } );
                            } );
                            } );
                            } );
                            } );
                            } );
                        } );
                    } );
                } );
            } )
            .catch( (err) => { console.log(err); });
    }

    render(){
       
        const Style1 = {
            float: 'left',
		};
		const Style2 = {
            float: 'right',
        };
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
								<i className="icon-chevron-right link"></i>Servicios
							</li>
						</ul>
					</div>
				</section>  
				<div>
                    <div>
                        <h1 className="h1-substitue-left" style={Style1}>Servicios</h1>
                        <span style={Style2}>
                            <Link to='/servicios/nuevo2'><button className="button confirm">
                                <i className="icon-plus"></i>Agregar Servicio
                            </button></Link>
                        </span>
                    </div>
                    <br/>
                    <br/>
                    <div style={{marginTop: '30px'}}>
                        <ReactTable 
                        data={this.state.data} 
                        noDataText="No existen servicios"
                        columns={[{
                            Header: 'Nombre',
                            accessor:'nombre'},{
                            Header: 'Precio',
                            accessor:'precio'},{
                            Header: 'Fecha',
                            accessor: 'fecha'},{
                            Header: 'Area',
                            accessor:'area'},{
                            Header: 'Acciones',
                            accessor:'acciones'}
                        ]}
                        defaultPageSize={5} 
                        onFetchData={this.fetchData}
                        />
                    </div>
				</div>
            </div>
        );       
    }
}