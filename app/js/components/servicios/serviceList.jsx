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
        return(
            <div>
                <h1>Servicios V-3.5 </h1>
                <div>
                    <Link to='/servicios/nuevo'><button className="btn">Agregar Servicio</button></Link>
                </div>
                <div>
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
                      sortable='true'
                    />
                </div>
            </div>
        );       
    }
}