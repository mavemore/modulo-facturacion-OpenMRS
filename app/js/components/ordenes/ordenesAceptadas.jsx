import React from 'react';
import {Link} from 'react-router';
import Header from '../global/Header';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import moment from 'moment';
import {instance} from '../../axios-orders';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

export default class ordenesAceptadas extends React.Component {
  
  constructor(props){
        super(props);
        this.state={
            data:[],
            pacienteSeleccionado: '',
            usuario:'',
        };
        this.searchPaciente = this.searchPaciente.bind(this);
        this.handleChangePaciente = this.handleChangePaciente.bind(this);
    }
    
    componentDidMount(){
        instance.get('/v1/session')
        .then(
            (res) => {
                this.setState({usuario: {value: res.data.user.person.uuid, label: res.data.user.person.display}});
            }
        )
    }
    
    searchPaciente(query){
        return instance.get('/v1/patient?q='+query)
        .then(
            (res) => {
                var resultado = [];
                if ('data' in res){
                    resultado = res.data.results.map((item) => ({
                        value: item.uuid,
                        label: item.display,
                    }));
                }
                return {options: resultado};
            }
        )
    }
        
    handleChangePaciente(opcion){
        instance.get('/v1/patient/'+opcion.value+'?v=full')
        .then(
            (res) => {
                this.setState({pacienteSeleccionado:opcion, ubicacion: res.data.identifiers[0].location.display});
                instance.get('/v1/encounter?patient='+opcion.value+'&encounterType=08007d58-026e-44e0-92e0-6c1bd0a43a8c&v=full')
                .then(
                    (res2) => {
                        var ordenes = [];
                        if ('data' in res2){
                            ordenes = res2.data.results.map(function(item, i){
                                var medico = '';
                                var observaciones ='';
                                var idorden = {link: 'ordenes_atender/'+item.uuid, index: i+1};
                                if(item.encounterProviders.length>0){
                                    medico = item.encounterProviders[0].provider.display
                                }
                                if(item.obs.length>0){
                                    observaciones = item.obs.find(x => x.concept.uuid == '70885eca-dfe9-4d6a-9dfd-cd2feebd77f3').value;
                                    if (observaciones=='Dietetica'){
                                        idorden = {link: 'ordenes_atender/dietetica/'+item.uuid, index: i+1}
                                    }else if (observaciones=='Farmacia'){
                                        idorden = {link: 'ordenes_atender/farmacia/'+item.uuid, index: i+1}
                                    }else if (observaciones=='Cirugia'){
                                        idorden = {link: 'ordenes_atender/cirugia/'+item.uuid, index: i+1}
                                    }else if (observaciones=='Laboratorio'){
                                        idorden = {link: 'ordenes_atender/laboratorio/'+item.uuid, index: i+1}
                                    }
                                }
                                return {
                                idOrden: idorden,
                                paciente: item.patient.display,
                                medico: medico,
                                area: observaciones,
                                estado: item.encounterType.display,
                                fecha: moment(item.encounterDatetime).format('DD/MM/YYYY'),
                                }
                            });
                        }
                        this.setState({data: ordenes});
                    }
                )
            }
        ).catch(
            (err) => {
                console.log(err);
                this.setState({data: []});
            }
        )
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
                        <i className="icon-chevron-right link"></i>Órdenes
                    </li>
                </ul>
            </div>
        </section>
        <div>
        <div>
            <h1 className="h1-substitue-left" style={Style1}>Órdenes</h1>
        </div>
        <br/>
        <fieldset>
            <legend>Busqueda:</legend>
            <label> Paciente: </label>
            <Select.Async 
            autoload={false}
            name="paciente" 
            value={this.state.pacienteSeleccionado} 
            onChange={this.handleChangePaciente}
            loadOptions={this.searchPaciente}/>
        </fieldset>
        <br/>
        <div style={{marginTop: '30px'}}>
          <ReactTable 
          data={this.state.data} 
          noDataText="No existen ordenes"
          columns={[{
            Header: 'No.',
            accessor:'idOrden',
            Cell: ({value})=> (<Link to={value.link}>{value.index}</Link>)},{
            Header: 'Paciente',
            accessor:'paciente'},{
            Header: 'Medico',
            accessor:'medico'},{
            Header: 'Area de Servicio',
            accessor:'area'}, {
            Header: 'Estado',
            accessor:'estado'},{
            Header: 'Fecha Modificado',
            accessor:'fecha'}
          ]} 
          defaultPageSize={10} 
          sortable={true}/>
        </div>
        </div>
      </div>
    )
  }
}