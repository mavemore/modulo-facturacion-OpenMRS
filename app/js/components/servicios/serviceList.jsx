import React from 'react';
import Header from '../global/Header';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

const data = [{
    id: 'P001',
    nombre: 'Agua Destilada',
    precio: 0.39,
    cantidad: 1,
    medida: 'cc'
}]

const columns = [{
    Header: 'Sodigo',
    accesor: 'id'
},{
    Header: 'Insumo',
    accesor: 'nombre'
},{
    Header: 'Precio',
    accesor: 'precio'
},{
    Header: 'Cantidad',
    accesor: 'cantidad',
},{
    Header: 'Medida',
    accesor: 'medida'
}]

export default class serviceList extends React.Component{  
    render(){
        return(
            <div>
                <h1>SSSSSServicios</h1>
                <div>
                    <Link to='/nuevo'><button className="btn">Agregar Servicio</button></Link>
                </div>
                <div>
                    <ReactTable
                        data = {[{
                            id: 'P001',
                            nombre: 'Agua Destilada',
                            precio: 0.39,
                            cantidad: 1,
                            medida: 'cc'
                        }]}
                        columns = {columns}
                    />
                </div>
            </div>
        );       
    }
}