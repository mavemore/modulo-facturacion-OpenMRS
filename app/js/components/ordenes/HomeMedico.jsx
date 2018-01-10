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
        <div>
        	<button className="crearBtn"><Link to="/medico/nueva-orden">Crear Orden</Link></button>
        </div>
        <br/>
        <br/>
        <div>
          <ReactTable 
          data={[{
            idOrden: <Link to="/medico/edit">221325</Link>,
            paciente: 'Juan Perez',
            medico: 'Gonzalo Torres',
            area: 'Farmacia',
            estado: 'Nuevo',
            fecha: '20-12-2017',
            acciones: <div><Link to="/medico"><FaCalendarCheckO/></Link>  <Link to="/medico"><FaCalendarTimesO/></Link></div>
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