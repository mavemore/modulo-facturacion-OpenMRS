import React from 'react';

import Header from '../../global/Header';
import FormLaboratorio from '../../global/FormLaboratorio';

export default class nuevoLaboratorio extends React.Component {
  render() {
    return (
      <div>
        <h1>Ingreso de Orden Laboratorio</h1>
        <FormLaboratorio/>
      </div>
    )
  }
}