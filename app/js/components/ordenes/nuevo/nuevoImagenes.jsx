import React from 'react';

import Header from '../../global/Header';
import FormImagenes from '../../global/FormImagenes';

export default class nuevoImagenes extends React.Component {
  render() {
    return (
      <div>
        <h1>Ingreso de Orden Imagenes</h1>
        <FormImagenes/>
      </div>
    )
  }
}