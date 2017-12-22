/* * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */
import React from 'react';
import {Link} from 'react-router';
import Header from './global/Header';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        <div>
        	<ul>
	        	<li><Link to="/medico">M&eacute;dico</Link></li>
	        	<li><Link to="/enfermera">Enfermera</Link></li>
	        	<li><Link to="/admin">Administrador</Link></li>
	        	<li><Link to="/caja">Caja</Link></li>
	        	<li><Link to="/farmacia">Farmacia</Link></li>
	        	<li><Link to="/laboratorio">Laboratorio</Link></li>
	        </ul>
        </div>
      </div>
    )
  }
}
