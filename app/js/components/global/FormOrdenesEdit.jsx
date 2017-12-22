import React from 'react';

export default class FormOrdenesEdit extends React.Component {
  render() {
    return (
      <div>
      	<h2>Estado: Nuevo</h2>
      	<form>
        	<fieldset>
        		<legend>Datos Generales:</legend>
	        	<label> Paciente: <input type="text" name="paciente" value="Juan Perez"/> </label>
	        	<label> Fecha: <input type="date" name="fechaCreacion" value="2017-12-20"/> </label>
	        	<label> M&eacute;dico: <input type="text" name="paciente" value="Gonzalo Torres"/> </label>
	        </fieldset>
	        <fieldset>
        		<legend>Detalles Orden:</legend>
	        	<label> Area de Servicio: 
	        		<select>
	        			<option value="farmacia">Farmacia</option>
	        			<option value="icu">ICU</option>
	        			<option value="cirugia">Cirug&iacute;a</option>
	        			<option value="laboratorio">Laboratorio</option>
	        			<option value="imagenes">Centro de Im&aacute;genes</option>
	        			<option value="interconsulta">Interconsulta</option>
	        			<option value="dietetica">Diet&eacute;tica</option>
	        		</select>
	        	</label>
	        </fieldset>
        	<input type="submit" value="Guardar"/>
        </form>
      </div>
    )
  }
}