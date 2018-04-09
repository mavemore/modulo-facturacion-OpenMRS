import React from 'react';

import Header from '../../global/Header';
import FormDietetica from '../../global/FormDietetica';

export default class nuevoDietetica extends React.Component {
  render() {
    return (
      <div>
        <h1>Ingreso de Orden Dietetica</h1>
        <FormDietetica/>
      </div>
    )
  }
}