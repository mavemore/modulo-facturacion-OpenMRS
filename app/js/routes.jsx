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
import {Router, Route} from 'react-router';
import App from './components/App';
import HomeMedico from './components/ordenes/HomeMedico';
import ingresoOrdenes from './components/ordenes/ingresoOrdenes';
import Home from './components/global/Home';
import editarOrdenes from './components/ordenes/editarOrdenes';
import serviceList from './components/servicios/serviceList';
<<<<<<< HEAD
import ingresarServicio from './components/servicios/ingresarServicio';
=======
import addService from './components/servicios/addService';
>>>>>>> 06696f6af3ae60c106ede98554079f7363954cbf

export default () => {
  return (
      <Router>
        <Route path="/" component={Home}/>
  		  <Route path="/notfound" component={App}/>
	      <Route path="/ordenes/nueva-orden" component={ingresoOrdenes}/>
	      <Route path="/ordenes" component={HomeMedico}/>
        <Route path="/ordenes/edit" component={editarOrdenes}/>
        <Route path="/servicios" component={serviceList}/>
<<<<<<< HEAD
        <Route path="./servicios/nuevo" component={ingresarServicio}/>
=======
        <Route path="/servicios/nuevo" component={addService}/>
>>>>>>> 06696f6af3ae60c106ede98554079f7363954cbf
    </Router>
  );
}
