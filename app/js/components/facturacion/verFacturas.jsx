import React from 'react';
import {Link} from 'react-router';
import request from 'superagent';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {instance, servicios_id,cirugias_id,consultas_id,examenes_id,imagenes_id,paquetesDietetica_id} from '../../axios-orders';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import {instance1} from '../../axios-openmrs';

export default class FormFactRapida extends React.Component { 
    constructor(props){
        super(props);
        this.state={
            data:[],
        };
        this.fetchData = this.fetchData.bind(this);  
    }

    fetchData(){
        instance1.get('/facturaRapida.json')
            .then( response => {
                console.log(response.data)
                const array = [];
                let factura;
                for(let key in response.data){
                    console.log(response.data[key]);
                    let _paciente = response.data[key].paciente.label;
                    let _fecha = response.data[key].fecha;
                    let _tipo = response.data[key].tipo;
                    let _total = response.data[key].total;
                    factura = {
                        paciente: _paciente,
                        fecha: _fecha,
                        tipo: _tipo,
                        total: _total
                    }
                    array.push(factura);
                    console.log(factura)
                }  
                console.log(array);
                this.setState({data: array}); 
            } )
            .catch((err) => { console.log(err.response.data); } );
    }

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
								<i className="icon-chevron-right link"></i>Facturas
							</li>
						</ul>
					</div>
				</section> 
                <div>
                    <h1 className="h1-substitue-left" style={Style1}>Facturas</h1>
                    <br/>
                    <br/>
                    <div style={{marginTop: '30px'}}>
                        <ReactTable 
                        data={this.state.data} 
                        noDataText="No existen facturas"
                        columns={[{
                            Header: 'Paciente',
                            accessor:'paciente'},{
                            Header: 'Fecha',
                            accessor: 'fecha'},{
                            Header: 'Tipo',
                            accessor:'tipo'},{
                            Header: 'Total',
                            accessor:'total'}
                        ]}
                        defaultPageSize={5} 
                        onFetchData={this.fetchData}
                        />
                    </div>
                </div>

            </div>

        )
  }
}