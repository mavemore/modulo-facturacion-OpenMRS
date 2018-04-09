import React from 'react';

import Header from '../../global/Header';
import FormCirugia from '../../global/FormCirugia';

export default class nuevoCirugia extends React.Component {
  render() {
    return (
      <div>
        <h1>Ingreso de Orden Cirugia</h1>
        <FormCirugia/>
      </div>
    )
  }
}