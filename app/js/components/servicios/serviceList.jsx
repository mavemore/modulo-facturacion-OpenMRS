import React from 'react';
import Header from '../global/Header';
import {Link} from 'react-router';
import moment from 'moment';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import {instance, servicios_id} from '../../axios-orders';


export default class serviceList extends React.Component{  
    
    constructor(){
        super();
        this.state = {
            data : [{
                nombre: 'servicio 1',
                precio: 10,
                fecha: '15-02-2018',
                acciones: <div><i className="icon-remove delete-action" title="Delete"></i></div>
              },{
                nombre: 'servicio 2',
                precio: 20,
                fecha: '15-02-2018',
                acciones: <div><i className="icon-remove delete-action" title="Delete"></i></div>
              }],
            loading : false
        };
        this.fetchData = this.fetchData.bind(this);   
        this.eliminarServicio = this.eliminarServicio.bind(this);
    }
    
    eliminarServicio(uuid){
        //console.log(uuid);
        instance.delete('/v1/concept/'+uuid, {params: {'uuid':uuid}})
            .then(response => {
                //console.log(response);
                //console.log('deleted');
            })
            .catch((err) => { console.log(err.response.data); })
    }

    fetchData(){
        this.setState( { loading: true } );
        instance.get('/v1/concept/'+ servicios_id +'?v=full')
            .then( response => {
                let newData = [];
                let name;
                let precio;
                let fecha = moment().format('L')
                let uuid;
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
                        acciones: <div><i className="icon-remove delete-action" title="Delete" onClick={this.eliminarServicio(uuid)}></i></div>
                    };
                    newData.push(newItem); 
                }
                this.setState({data: newData, loading: false});
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