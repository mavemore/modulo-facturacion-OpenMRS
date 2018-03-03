import React from 'react';

import Header from '../global/Header';
import FormConsulta from '../global/FormConsulta';

export default class nuevoConsulta extends React.Component {
  render() {
    return (
      <div>
        <h1>Ingreso de Orden Interconsultas</h1>
        <FormConsulta/>
      </div>
    )
  }
}