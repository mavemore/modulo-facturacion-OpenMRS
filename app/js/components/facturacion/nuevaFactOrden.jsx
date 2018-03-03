import React from 'react';

import Header from '../global/Header';
import FormFacturacion from '../facturacion/formFacturacion';

export default class nuevaFactOrden extends React.Component {
  render() {
    return (
      <div>
        <h1>Crear Factura</h1>
        <FormFacturacion/>
      </div>
    )
  }
}