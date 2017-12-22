import React from 'react';

export default class FormOrdenes extends React.Component {
  render() {
    return (
      <div>
        <form>
        	<fieldset>
        		<legend>Datos Generales:</legend>
	        	<label> Paciente: <input type="text" name="paciente"/> </label>
	        	<label> Fecha: <input type="date" name="fechaCreacion"/> </label>
	        	<label> Medico: <input type="text" name="paciente"/> </label>
	        </fieldset>
	        <fieldset>
        		<legend>Detalles Orden:</legend>
	        	<label> Area de Servicio: 
	        		<select>
	        			<option value="farmacia">Farmacia</option>
	        			<option value="icu">ICU</option>
	        			<option value="cirugia">Cirugia</option>
	        			<option value="laboratorio">Laboratorio</option>
	        			<option value="imagenes">Centro de Imagenes</option>
	        			<option value="interconsulta">Interconsulta</option>
	        			<option value="dietetica">Dietetica</option>
	        		</select>
	        	</label>
	        </fieldset>
        	<input type="submit" value="Generar Orden"/>
        </form>
      </div>
    )
  }
}