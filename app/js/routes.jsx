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

export default () => {
  return (
    <Router>
        <Route path="/" component={Home}/>
        <Route path="/notfound" component={App}/>
        <Route path="/ordenes" component={HomeMedico}/>
        <Route path="/ordenes/nueva-orden" component={ingresoOrdenes}/>
        <Route path="/ordenes/edit" component={editarOrdenes}/>
    </Router>
  );
}
