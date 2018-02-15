import React from 'react';
import Header from '../global/Header';
import {Link} from 'react-router';
import ReactTable from 'react-table';
import 'react-table/react-table.css';



export default class serviceList extends React.Component{  
    
    constructor(){
        super();
        this.state = {
            data : [{
                id: 'P001',
                nombre: 'servicio 1',
                precio: 10,
                cantidad: 2,
                medida: 'cc'
              },{
                id: 'P002',
                nombre: 'servicio 2',
                precio: 20,
                cantidad: 1,
                medida: 'mm'
              }]
        };
    }
    
    render(){
        const { data } = this.state;
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
								<i className="icon-chevron-right link"></i>Modulo
								<Link to="/servicios"></Link>
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
                            <Link to='/servicios/nuevo'><button className="button confirm">
                                <i className="icon-plus"></i>Agregar Servicio
                            </button></Link>
                        </span>
                    </div>
                    <br/>
                    <br/>
                    <div style={{float: 'left'}}>
                        <ReactTable
                        data={this.state.data} 
                        noDataText="No existen ordenes"
                        columns={[{
                            Header: 'ID',
                            accessor:'id'},{
                            Header: 'Nombre',
                            accessor:'nombre'},{
                            Header: 'Precio',
                            accessor:'precio'},{
                            Header: 'Cantidad',
                            accessor:'cantidad'}, {
                            Header: 'Medida',
                            accessor:'medida'}
                        ]} 
                        />
                    </div>
				</div>
            </div>
        );       
    }
}