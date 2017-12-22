/* * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */
import React from 'react';
import {Router, Route} from 'react-router';
import App from './components/App';
import HomeMedico from './components/medico/HomeMedico';
import ingresoOrdenes from './components/medico/ingresoOrdenes';
import editarOrdenes from './components/medico/editarOrdenes';

export default () => {
  return (
  	<Router>
  		<Route path="/" component={App}/>
	    <Route path="/medico" component={HomeMedico}/>
	    <Route path="/medico/nueva-orden" component={ingresoOrdenes}/>
	    <Route path="/medico/edit" component={editarOrdenes}/>
    </Router>
  );
}
