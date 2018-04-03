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
import nuevoFarmacia from './components/ordenes/nuevoFarmacia';
import nuevoCirugia from './components/ordenes/nuevoCirugia';
import nuevoConsulta from './components/ordenes/nuevoConsulta';
import nuevoDietetica from './components/ordenes/nuevoDietetica';
import nuevoImagenes from './components/ordenes/nuevoImagenes';
import nuevoLaboratorio from './components/ordenes/nuevoLaboratorio';
import nuevaFactOrden from './components/facturacion/nuevaFactOrden';
import nuevaFactRapida from './components/facturacion/nuevaFactRapida';
import Home from './components/global/Home';
import editarOrdenes from './components/ordenes/editarOrdenes';
import serviceList from './components/servicios/serviceList';
import addService from './components/servicios/addService';
import formServicios from './components/servicios/formServicios';

export default () => {
  return (
    <Router>
        <Route path="/" component={Home}/>
        <Route path="/facturacion/orden" component={nuevaFactOrden}/>
        <Route path="/facturacion/rapida" component={nuevaFactRapida}/>
        <Route path="/ordenes" component={HomeMedico}/>
        <Route path="/ordenes/:orderId" component={editarOrdenes}/>
        <Route path="/ordenes/farmacia/nuevo" component={nuevoFarmacia}/>
        <Route path="/ordenes/imagenes/nuevo" component={nuevoImagenes}/>
        <Route path="/ordenes/laboratorio/nuevo" component={nuevoLaboratorio}/>
        <Route path="/ordenes/cirugia/nuevo" component={nuevoCirugia}/>
        <Route path="/ordenes/consultas/nuevo" component={nuevoConsulta}/>
        <Route path="/ordenes/dietetica/nuevo" component={nuevoDietetica}/>
        <Route path="/servicios" component={serviceList}/>
        <Route path="/servicios/nuevo" component={addService}/>
        <Route path="/servicios/nuevo2" component={formServicios}/>
    </Router>
  );
}
