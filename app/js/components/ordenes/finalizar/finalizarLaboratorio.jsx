import React from 'react';
import {Link, hashHistory} from 'react-router';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Select from 'react-select';
import ReactTable from 'react-table';
import {instance,CLOUDINARY_UPLOAD_PRESET,CLOUDINARY_UPLOAD_URL,observacionesFotoURL, encounterTypeFinalizada_id} from '../../../axios-orders';
import 'react-datepicker/dist/react-datepicker.css';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import Simplert from 'react-simplert';

//import FormOrdenesEdit from '../global/FormOrdenesEdit';

export default class finalizarLaboratorio extends React.Component {
    constructor(...args){
        super(...args);
        this.state={
            date: moment(),
            pacienteSeleccionado: '',
            medico: '',
            idorden: this.props.params.orderId,
            tipoOrden: '',
            data:[],
            comentarios:'',
            foto:'',
            fotoURL:'',
            dateFin: moment(),
            ordenes: [],
            showAlert:false,
            titleAlert: "titulo",
            messageAlert:"mensaje",
            typeAlert:'success',
            
        };
        this.handleChange = this.handleChange.bind(this);
        this.searchPaciente = this.searchPaciente.bind(this);
        this.handleChangePaciente = this.handleChangePaciente.bind(this);
        this.getMedico = this.getMedico.bind(this);
        this.handleChangeMedico = this.handleChangeMedico.bind(this);
        this.handleChangeFin = this.handleChangeFin.bind(this);
        this.handleChangeComentario = this.handleChangeComentario.bind(this);
        this.handleChangeFoto = this.handleChangeFoto.bind(this);
        this.handleChangeObs = this.handleChangeObs.bind(this);
         this.cerrarAlert = this.cerrarAlert.bind(this);
    }
    
    componentDidMount(){
        instance.get('/v1/encounter/'+this.props.params.orderId+'?v=full')
        .then(
            (res) => {
                if ('data' in res){
                    var medico = '';
                    var tipo = '';
                    var location = '';
                    var filas = [];
                    var ordenes = [];
                    if(res.data.encounterProviders.length>0){
                        medico = { value: res.data.encounterProviders[0].provider.uuid, label: res.data.encounterProviders[0].provider.display}
                                }
                    if(res.data.obs.length>0){
                        tipo = res.data.obs[0].display;
                    }
                    if(res.data.orders.length>0){
                        filas = res.data.orders.map((item,i)=>(
                            {
                                examen: item.concept.display,
                                index: i,
                                uuid: item.uuid,
                                muestra : item.specimenSource.display,
                                observaciones: item.orderReasonNonCoded,
                            }));
                        ordenes = res.data.orders.map((item,i)=>(
                            {
                                examen: item.concept.uuid,
                                index: i+1,
                                uuid: item.uuid,
                                muestra : item.specimenSource.uuid, 
                                observaciones: item.orderReasonNonCoded,
                                careSetting: item.careSetting.uuid,
                            }));
                    };
                    this.setState({
                        pacienteSeleccionado: {value: res.data.patient.uuid, label: res.data.patient.display},
                        date: moment(res.data.encounterDatetime),
                        medico: medico,
                        tipoOrden: tipo,
                        data: filas,
                        ordenes: ordenes,
                    });
                }
            }
        ).catch(
            (err) => {
                console.log(err);
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
                this.setState({pacienteSeleccionado:opcion});
            }
        )
    }
    
    handleChangeMedico(opcion){
        this.setState({medico:opcion});
    }
    
    getMedico(){
        return instance.get('/v1/provider')
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
    
    handleChangeObs(e){
        this.setState({observaciones:e.target.value});
    } 
    
    cerrarAlert(){
        this.setState({showAlert:false});
    }
  
    guardarOrden(e){
        e.preventDefault();
        if(this.state.fotoURL==''){
            this.setState({showAlert:true,
                          titleAlert: "Campos Vacios",
                          messageAlert:"falta por llenar campos requeridos.",
                          typeAlert: 'error'});
        }else{
        var body = {
            'encounterType': encounterTypeFinalizada_id,
            'obs': [
                {obsDatetime: this.state.date.format(), 
                concept:observacionesFotoURL,
                value: this.state.fotoURL}
            ]
        }
        instance.post('/v1/encounter/'+this.state.idorden, body)
        .then(
            (res) => {
                var i = 0;
                for(i=0;i<this.state.data.length;i++){
                    var detalles={
                        "type":'testorder',
                        "action": 'DISCONTINUE',
                        "previousOrder": this.state.ordenes[i].uuid,
                        "careSetting": this.state.ordenes[i].careSetting,
                        "concept": this.state.ordenes[i].examen,
                        "encounter": this.state.idorden,
                        "orderer": this.state.medico.value,
                        "patient": this.state.pacienteSeleccionado.value,
                        "dateActivated": this.state.dateFin.format(),
                        "orderReasonNonCoded": this.state.comentarios,
                    }
                    instance.post('/v1/order', detalles)
                    .then(
                        (res2) => {
                            hashHistory.push('/ordenes_atender');
                        }
                    ).catch(
                        (err) => {
                            console.log(err);
                        }
                    ) 
                }
            }
        ).catch(
            (err) => {
                console.log(err);
            }
        )}        
    }
    

    handleChange(date){
        this.setState({date:date});
    }
    
    handleChangeFin(date){
        this.setState({dateFin:date});
    }
    
    handleChangeComentario(e){
        this.setState({comentarios:e.target.value});
    }
    
    handleChangeFoto(e){
        this.setState({foto:e.target.value});
    }
    
    //UPLOAD IMAGEN
    onImageDrop(files) {
        this.setState({
          foto: files[0]
        });

        this.handleImageUpload(files[0]);
    }
    
    handleImageUpload(file) {
        let upload = request.post(CLOUDINARY_UPLOAD_URL)
                            .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                            .field('file', file);

        upload.end((err, response) => {
          if (err) {
            console.error(err);
          }

          if (response.body.secure_url !== '') {
            this.setState({
              fotoURL: response.body.secure_url
            });
          }
        });
      }
    
    render() {
        const Style1 = {
            float: 'left',
		};
		const Style2 = {
            float: 'right',
		};
    const {tipoOrden, data} = this.state;
      const { showAlert,titleAlert,messageAlert,typeAlert} = this.state;  
    const columnas = [{
                        Header: 'Examen',
                        accessor:'examen'},{
                        Header: 'Muestra',
                        accessor:'muestra'},{
                        Header: 'Observaciones',
                        accessor:'observaciones'}
                      ]
    
    return (
      <div>
        <Simplert
            showSimplert={showAlert}
            type={typeAlert}
            title={titleAlert}
            message={messageAlert}
            onClose={this.cerrarAlert}
            onConfirm={this.cerrarAlert}/>
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
                        <Link to="/ordenes_atender"><i className="icon-chevron-right link"></i>Ordenes</Link>
                    </li>
                    <li>
                        <i className="icon-chevron-right link"></i>Nuevo
                    </li>
                </ul>
            </div>
        </section>
        <div>
            <h2>{tipoOrden}</h2>
            <form onSubmit={this.guardarOrden.bind(this)} id="formOrden">
                <fieldset>
                    <legend>Datos Generales:</legend>
                    <label> Paciente: </label>
                    <Select.Async 
                    autoload={false}
                    name="paciente" 
                    value={this.state.pacienteSeleccionado} 
                    onChange={this.handleChangePaciente}
                    loadOptions={this.searchPaciente}/>
                    <label> Fecha: </label><DatePicker selected={this.state.date} onChange={this.handleChange}/>
                    <label htmlFor="medico"> M&eacute;dico: </label>
                    <Select.Async 
                    autoload={false}
                    name="medico" 
                    value={this.state.medico} 
                    onChange={this.handleChangeMedico}
                    loadOptions={this.getMedico}
                    disabled={true}
                    />
                </fieldset>
                 <div>
                    <br></br>
                    <br></br>
                    <ReactTable 
                      data={data} 
                      noDataText="No existen ordenes"
                      columns={columnas} 
                      defaultPageSize={5} 
                      sortable={true}/>
                </div>
                <fieldset>
                    <legend>Evidencia Entrega:</legend>
                    <label> Fecha Realizacion: </label><DatePicker selected={this.state.dateFin} onChange={this.handleChangeFin}/>
                    <label htmlFor="comentarios">Comentario:</label>
                    <input type='text' name="comentarios" value={this.state.comentarios} id="comentarios" onChange={this.handleChangeComentario}/>
                    
                </fieldset>
                <div>
                    <Dropzone
                      multiple={false}
                      accept="image/*"
                      onDrop={this.onImageDrop.bind(this)}>
                      <p>Arrastre una imagen o haga clic para seleccionar un archivo a cargar.</p>
                    </Dropzone>
                    <div>
                    {this.state.fotoURL === '' ? null :
                    <div>
                      <img src={this.state.fotoURL} />
                    </div>}
                  </div>
                </div>
                <div>
                    <button className="btn" type="submit">Guardar</button>
                    <span>     </span>
                    <Link to="/ordenes"><button className="btn" type="button">Descartar</button></Link>
                </div>
            </form>
        </div>
    </div>
    )
  }
}