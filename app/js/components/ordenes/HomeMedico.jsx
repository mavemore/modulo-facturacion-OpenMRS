import React from 'react';
import {Link} from 'react-router';
import Header from '../global/Header';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import FaCalendarCheckO from 'react-icons/lib/fa/calendar-check-o';
import FaCalendarTimesO from 'react-icons/lib/fa/calendar-times-o';

export default class HomeMedico extends React.Component {
    
  render() {
        const Style1 = {
            float: 'left',
		};
		const Style2 = {
            float: 'right',
		};
    
    return (
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
                        <i className="icon-chevron-right link"></i>Órdenes
                    </li>
                </ul>
            </div>
        </section>
        <div>
        <div>
            <h1 className="h1-substitue-left" style={Style1}>Órdenes</h1>
            <span style={Style2}>
                <Link to='/ordenes/nueva-orden'><button className="button confirm">
                    <i className="icon-plus"></i>Agregar Orden
                </button></Link>
            </span>
        </div>
        <br/>
        <br/>
        <div style={{marginTop: '30px'}}>
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
          defaultPageSize={5} 
          sortable={true}/>
        </div>
        </div>
      </div>
    )
  }
}