import React from 'react';
import Header from '../global/Header';
import {Link} from 'react-router';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

<<<<<<< HEAD
    const data = [{
        id: 'P001',
        nombre: 'Agua Destilada',
        precio: 0.39,
        cantidad: 1,
        medida: 'cc'
    }]

    const columns = [{
        Header: 'Codigo',
        accesor: 'id'},{
        Header: 'Insumo',
        accesor: 'nombre'},{
        Header: 'Precio',
        accesor: 'precio'},{
        Header: 'Cantidad',
        accesor: 'cantidad',},{
        Header: 'Medida',
        accesor: 'medida'}];

export default class serviceList extends React.Component{  
    

=======


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
    
>>>>>>> 06696f6af3ae60c106ede98554079f7363954cbf
    render(){
        const { data } = this.state;
        return(
            <div>
<<<<<<< HEAD
                <h1>Servicios</h1>
=======
                <h1>Servicios V-3.5 </h1>
>>>>>>> 06696f6af3ae60c106ede98554079f7363954cbf
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