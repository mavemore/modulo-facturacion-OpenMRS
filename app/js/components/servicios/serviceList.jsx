import React from 'react';
import Header from '../global/Header';
import ReactTable from 'react-table';
import 'react-table/react-table.css'

const data = [{
    id: 'P001',
    nombre: 'Agua Destilada',
    precio: 0.39,
    cantidad: 1,
    medida: 'cc'
}]

const columns = [{
    Header: 'Codigo',
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
                <h1>Servicios</h1>
                <div>
                    <ReactTable
                        data = {data}
                        columns = {columns}
                    />
                </div>
            </div>
        );       
    }
}