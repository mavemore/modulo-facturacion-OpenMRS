import React from 'react';
import {Link, hashHistory} from 'react-router';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Select from 'react-select';
import ReactTable from 'react-table';
import {instance,cirugias_id,encounterTypeFinalizada_id,observacionesFotoURL,CLOUDINARY_UPLOAD_URL,CLOUDINARY_UPLOAD_PRESET} from '../../../axios-orders';
import 'react-datepicker/dist/react-datepicker.css';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import Simplert from 'react-simplert';

//import FormOrdenesEdit from '../global/FormOrdenesEdit';

export default class finalizarCirugia extends React.Component {
    constructor(...args){
        super(...args);
        this.state={
            date: moment(),
            pacienteSeleccionado: '',
            medico: '',
            idorden: this.props.params.orderId,
            tipoOrden: '',
            data:[],
            observaciones: '',
            cirugia:'',
            orden:'',
            fechaFin: moment(),
            foto:'',
            fotoURL:'',
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
        this.handleChangeObs = this.handleChangeObs.bind(this);
        this.searchCirugia = this.searchCirugia.bind(this);
        this.handleChangeCirugia = this.handleChangeCirugia.bind(this);
        this.handleChangeFin = this.handleChangeFin.bind(this);
        this.handleChangeComentario = this.handleChangeComentario.bind(this);
        this.handleChangeFoto = this.handleChangeFoto.bind(this);
        this.cerrarAlert = this.cerrarAlert.bind(this);
    }
    
    componentDidMount(){
        instance.get('/v1/encounter/'+this.props.params.orderId+'?v=full')
        .then(
            (res) => {
                if ('data' in res){
                    var medico = '';
                    var tipo = '';
                    var orden = '';
                    if(res.data.encounterProviders.length>0){
                        medico = { value: res.data.encounterProviders[0].provider.uuid, label: res.data.encounterProviders[0].provider.display}
                                }
                    if(res.data.obs.length>0){
                        tipo = res.data.obs[0].display;
                    }
                    if(res.data.orders.length>0){
                        var ordenes = res.data.orders.map((item,i)=>(
                            {
                                cirugia: {value: item.concept.uuid, label:item.concept.display},
                                index: i,
                                uuid: item.uuid,
                                observaciones: item.orderReasonNonCoded,
                                careSetting: item.careSetting.uuid,
                            }));
                        orden = ordenes[0];
                    };
                    this.setState({
                        pacienteSeleccionado: {value: res.data.patient.uuid, label: res.data.patient.display},
                        date: moment(res.data.encounterDatetime),
                        medico: medico,
                        observaciones: orden.observaciones,
                        cirugia: orden.cirugia,
                        orden: orden,
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
    
    searchCirugia(query){
        return instance.get('/v1/concept/'+cirugias_id)
        .then(
            (res) => {
                var resultado = [];
                if ('data' in res){
                    resultado = res.data.setMembers.map((item) => ({
                        value: item.uuid,
                        label: item.display,
                    }));
                }
                return {options: resultado};
            }
        )
    }
        
    handleChangeCirugia(opcion){
        this.setState({cirugia:opcion});
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
                    var detalles={
                        "type":'testorder',
                        "action": 'DISCONTINUE',
                        "previousOrder": this.state.orden.uuid,
                        "careSetting": this.state.orden.careSetting,
                        "concept": this.state.orden.cirugia.value,
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
            ).catch(
                (err) => {
                    console.log(err);
                }
            )   
        }
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
    

    handleChange(date){
        this.setState({date:date});
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
    const { data ,showAlert,titleAlert,messageAlert,typeAlert} = this.state;
        const Style1 = {
            float: 'left',
		};
		const Style2 = {
            float: 'right',
		};
    const {tipoOrden} = this.state;
    
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
                    loadOptions={this.searchPaciente}
                    disabled={true}/>
                    <label> Fecha: </label>
                    <DatePicker 
                    selected={this.state.date} 
                    onChange={this.handleChange}
                    disabled={true}/>
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
                 <fieldset>
                    <legend>Informacion Cirugia:</legend>
                   <label> Cirugia: </label>
                    <Select.Async 
                        autoload={false}
                        name="cirugia" 
                        value={this.state.cirugia} 
                        onChange={this.handleChangeCirugia}
                        loadOptions={this.searchCirugia}
                        disabled={true} />
                   <label htmlFor="observaciones">Observaciones:</label>
                    <input type='text' name="observaciones" id="observaciones" value={this.state.observaciones} onChange={this.handleChangeObs} readOnly/>
               </fieldset>
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
                    <Link to="/ordenes_atender"><button className="btn" type="button">Descartar</button></Link>
                </div>
            </form>
        </div>
    </div>
    )
  }
}