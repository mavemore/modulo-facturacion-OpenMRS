import React from 'react';
import {Link} from 'react-router';
import Header from '../global/Header';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import FaCalendarCheckO from 'react-icons/lib/fa/calendar-check-o';
import FaCalendarTimesO from 'react-icons/lib/fa/calendar-times-o';

export default class HomeMedico extends React.Component {
    
  render() {
    return (
      <div>
        <h1>Órdenes</h1>
        <div className='row col-md-12'>
            <Link to="/"><button className="btn">Regresar</button></Link>
        	<Link to="/ordenes/nueva-orden"><button className="btn btn-primary crearBtn">Crear Orden</button></Link>
        </div>
        <br/>
        <br/>
        <div>
          <ReactTable 
          data={[{
            idOrden: <Link to="/ordenes/edit">221325</Link>,
            paciente: 'Juan Perez',
            medico: 'Gonzalo Torres',
            area: 'Farmacia',
            estado: 'Nuevo',
            fecha: '20-12-2017',
            acciones: <div className='acciones'><Link to="/ordenes"><FaCalendarCheckO/></Link>  <Link to="/ordenes"><FaCalendarTimesO/></Link></div>
          }]} 
          noDataText="No existen ordenes"
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