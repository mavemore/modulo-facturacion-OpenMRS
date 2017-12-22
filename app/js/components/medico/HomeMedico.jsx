import React from 'react';
import {Link} from 'react-router';
import Header from '../global/Header';
import ReactTable from 'react-table';
import 'react-table/react-table.css'

export default class HomeMedico extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        <div>
        	<button><Link to="/medico/nueva-orden">Crear Orden</Link></button>
        </div>
        <div>
          <ReactTable 
          data={[{
            idOrden: '221325',
            paciente: 'Juan Perez',
            medico: 'Gonzalo Torres',
            area: 'Farmacia',
            estado: 'Nuevo',
            fecha: '20-12-2017',
            acciones: ''
          }]} 
          columns={[{
            Header: 'ID Paciente',
            accessor:'idOrden'},{
            Header: 'Paciente',
            accessor:'paciente'},{
            Header: 'Medico',
            accessor:'medico'},{
            Header: 'Area de Servicio',
            accessor:'area'}, {
            Header: 'Estado',
            accessor:'estado'},{
            Header: 'Fecha Modificado',
            accessor:'fecha'},{
            Header: 'Acciones',
            accessor:'acciones'}
          ]} 
          sortable='true'/>
        </div>
      </div>
    )
  }
}