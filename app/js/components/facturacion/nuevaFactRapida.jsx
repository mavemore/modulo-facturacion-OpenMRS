import React from 'react';

import Header from '../global/Header';
import FormFactRapida from '../facturacion/formFactRapida';

export default class nuevaFactRapida extends React.Component {
  render() {
    return (
      <div>
        <h1>Crear Factura</h1>
        <FormFactRapida/>
      </div>
    )
  }
}