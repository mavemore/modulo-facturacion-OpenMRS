import React from 'react';

import Header from '../../global/Header';
import FormFarmacia from '../../global/FormFarmacia';

export default class nuevoFarmacia extends React.Component {
  render() {
    return (
      <div>
        <h1>Ingreso de Orden Farmacia</h1>
        <FormFarmacia/>
      </div>
    )
  }
}