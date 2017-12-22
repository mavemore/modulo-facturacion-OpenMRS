import React from 'react';

import Header from '../global/Header';
import FormOrdenes from '../global/FormOrdenes';

export default class ingresoOrdenes extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        <FormOrdenes/>
      </div>
    )
  }
}