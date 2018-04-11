/* * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */
import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import App from './components/App';
import HomeMedico from './components/ordenes/HomeMedico';
import nuevoFarmacia from './components/ordenes/nuevo/nuevoFarmacia';
import nuevoCirugia from './components/ordenes/nuevo/nuevoCirugia';
import nuevoConsulta from './components/ordenes/nuevo/nuevoConsulta';
import nuevoDietetica from './components/ordenes/nuevo/nuevoDietetica';
import nuevoImagenes from './components/ordenes/nuevo/nuevoImagenes';
import nuevoLaboratorio from './components/ordenes/nuevo/nuevoLaboratorio';
import nuevaFactOrden from './components/facturacion/nuevaFactOrden';
import nuevaFactRapida from './components/facturacion/nuevaFactRapida';
import Home from './components/global/Home';
import editarOrdenes from './components/ordenes/editar/editarOrdenes';
import editarFarmacia from './components/ordenes/editar/editarFarmacia';
import editarCirugia from './components/ordenes/editar/editarCirugia';
import editarDietetica from './components/ordenes/editar/editarDietetica';
import editarLaboratorio from './components/ordenes/editar/editarLaboratorio';
import editarConsulta from './components/ordenes/editar/editarConsulta';
import editarImagenes from './components/ordenes/editar/editarImagenes';
import serviceList from './components/servicios/serviceList';
import addService from './components/servicios/addService';
import formServicios from './components/servicios/formServicios';
import ordenesAceptadas from './components/ordenes/ordenesAceptadas';
import finalizarOrdenes from './components/ordenes/finalizar/finalizarOrdenes';
import finalizarFarmacia from './components/ordenes/finalizar/finalizarFarmacia';
import finalizarCirugia from './components/ordenes/finalizar/finalizarCirugia';
import finalizarDietetica from './components/ordenes/finalizar/finalizarDietetica';
import finalizarLaboratorio from './components/ordenes/finalizar/finalizarLaboratorio';
import finalizarConsulta from './components/ordenes/finalizar/finalizarConsulta';
import finalizarImagenes from './components/ordenes/finalizar/finalizarImagenes';

export default () => {
  return (
    <Router>
        <Route exact path="/" component={Home}/>
        <Route path="/facturacion/orden" component={nuevaFactOrden}/>
        <Route path="/facturacion/rapida" component={nuevaFactRapida}/>
        <Route path="/ordenes" component={HomeMedico}/>
        <Route path="/ordenes_atender" component={ordenesAceptadas}/>
        <Route path="/ordenes/:orderId" component={editarOrdenes}/>
        <Route path="/ordenes/dietetica/ver/:orderId" component={editarDietetica}/>
        <Route path="/ordenes/farmacia/ver/:orderId" component={editarFarmacia}/>
        <Route path="/ordenes/consulta/ver/:orderId" component={editarConsulta}/>
        <Route path="/ordenes/imagenes/ver/:orderId" component={editarImagenes}/>
        <Route path="/ordenes/cirugia/ver/:orderId" component={editarCirugia}/>
        <Route path="/ordenes/laboratorio/ver/:orderId" component={editarLaboratorio}/>
        <Route path="/ordenes_atender/:orderId" component={finalizarOrdenes}/>
        <Route path="/ordenes_atender/dietetica/:orderId" component={finalizarDietetica}/>
        <Route path="/ordenes_atender/consulta/:orderId" component={finalizarConsulta}/>
        <Route path="/ordenes_atender/imagenes/:orderId" component={finalizarImagenes}/>
        <Route path="/ordenes_atender/farmacia/:orderId" component={finalizarFarmacia}/>
        <Route path="/ordenes_atender/cirugia/:orderId" component={finalizarCirugia}/>
        <Route path="/ordenes_atender/laboratorio/:orderId" component={finalizarLaboratorio}/>
        <Route exact path="/ordenes/farmacia/nuevo" component={nuevoFarmacia}/>
        <Route exact path="/ordenes/imagenes/nuevo" component={nuevoImagenes}/>
        <Route exact path="/ordenes/laboratorio/nuevo" component={nuevoLaboratorio}/>
        <Route exact path="/ordenes/cirugia/nuevo" component={nuevoCirugia}/>
        <Route exact path="/ordenes/consultas/nuevo" component={nuevoConsulta}/>
        <Route exact path="/ordenes/dietetica/nuevo" component={nuevoDietetica}/>
        <Route path="/servicios" component={serviceList}/>
        <Route path="/servicios/nuevo" component={addService}/>
        <Route path="/servicios/nuevo2" component={formServicios}/>
    </Router>
  );
}
