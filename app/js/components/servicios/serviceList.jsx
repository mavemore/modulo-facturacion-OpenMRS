import React from 'react';
import Header from '../global/Header';
import {Link} from 'react-router';
import moment from 'moment';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
<<<<<<< HEAD
import {instance, servicios_id} from '../../axios-orders';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

=======
import {instance, servicios_id,cirugias_id,consultas_id,examenes_id,imagenes_id,paquetesDietetica_id} from '../../axios-orders';
>>>>>>> 9f687e82014632dfe706337008c2c60b1b611b18


export default class serviceList extends React.Component{  
    
    constructor(){
        super();
        this.state = {
            data : [/**{
                nombre: 'servicio 1',
                precio: 10,
                fecha: '15-02-2018',
                acciones: <div><i className="icon-remove delete-action" title="Delete"></i></div>
              },{
                nombre: 'servicio 2',
                precio: 20,
                fecha: '15-02-2018',
                acciones: <div><i className="icon-remove delete-action" title="Delete"></i></div>
              }**/],
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
                                    </div>
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
                            acciones: <div><i className="icon-remove delete-action" title="Delete" onClick={this.eliminarServicio(uuid)}></i></div>
                        };
                        newData.push(newItem); 
                }
                    instance.get('/v1/concept/'+ examenes_id +'?v=full')
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
                            acciones: <div><i className="icon-remove delete-action" title="Delete" onClick={this.eliminarServicio(uuid)}></i></div>
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
                                acciones: <div><i className="icon-remove delete-action" title="Delete" onClick={this.eliminarServicio(uuid)}></i></div>
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
                                    acciones: <div><i className="icon-remove delete-action" title="Delete" onClick={this.eliminarServicio(uuid)}></i></div>
                                };
                                newData.push(newItem); 
                            }
                            this.setState({data: newData, loading: false});
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
                        noDataText="No existen ordenes"
                        columns={[{
                            Header: 'Nombre',
                            accessor:'nombre'},{
                            Header: 'Precio',
                            accessor:'precio'},{
                            Header: 'Fecha de modificacion',
                            accessor: 'fecha'},{
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