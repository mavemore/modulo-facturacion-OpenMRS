import axios from 'axios';

var instance = exports.instance = _axios2.default.create({
	    baseURL: 'http://200.10.147.155:8080/openmrs/ws/rest',
	    //baseURL: 'http://localhost:8080/openmrs/ws/rest',
	    headers: { 'Content-Type': 'application/json' },
	    auth: {
	        username: 'admin',
	        password: 'Admin123'
	    }
	});
	
	/*Conceptos Utilizados*/
	//uuid del care setting de inpatients
	var careSettingInpatient_id = exports.careSettingInpatient_id = 'c365e560-c3ec-11e3-9c1a-0800200c9a66';
	
	//set de cirugias -> creado en conceptos como conjunto y agregan miembros
	var cirugias_id = exports.cirugias_id = 'ced6da8b-76c6-4d01-b93b-d5c54f585bbd';
	
	//export const consultas_id = 'd0aaed00-a4af-4d2f-98d2-36a7148f0220';
	var consultas_id = exports.consultas_id = 'd1746ad3-0fa3-4d07-991d-f2e93ef2124d';
	
	//uuid del encounter role de usuario clinico
	var encounterRoleClinician_id = exports.encounterRoleClinician_id = '240b26f9-dd88-4172-823d-4a8bfeb7841f';
	
	//uuid del encounter type de orden aceptada -> creado para modulo
	var encounterTypeOrdenAceptada_id = exports.encounterTypeOrdenAceptada_id = '34602d34-d15c-4c7e-bf2a-012c72aeabde';
	
	//uuid del encounter type de orden cancelada -> creado para modulo
	var encounterTypeOrdenCancelada_id = exports.encounterTypeOrdenCancelada_id = '	e6e7a42f-a8d3-4ac9-9018-9e589c89f9df';
	
	//uuid del encounter type de orden finalizada -> creado para modulo
	var encounterTypeFinalizada_id = exports.encounterTypeFinalizada_id = 'f06bf0be-6b50-4cfd-85ac-6cb286ea781f';
	
	//uuid del encounter type de orden nueva -> creado para modulo
	var encounterTypeOrdenNueva_id = exports.encounterTypeOrdenNueva_id = '0becaac6-3e3c-4cb0-955c-2baf6d05b755';
	
	//uuid del encounter type de orden pagada -> creado para modulo
	var encounterTypeOrdenPagada_id = exports.encounterTypeOrdenPagada_id = '108c7b76-4559-47c3-8e82-892a71fedec0';
	
	//set de examenes-> creado en conceptos como conjunto y agregan miembros
	var examenesOrina_id = exports.examenesOrina_id = '3648522a-07cf-4c4c-9f63-a5e489f41a53';
	var examenesSputum_id = exports.examenesSputum_id = '097735c0-28f9-45a2-a8e2-77c058fa233d';
	var examenesSangre_id = exports.examenesSangre_id = '3486fcfc-e343-417b-92a1-829a00c89402';
	var examenesSerum_id = exports.examenesSerum_id = 'b8620406-8065-47a4-92ce-bb648748ebb1';
	var examenesPlasma_id = exports.examenesPlasma_id = '5d898978-3334-44b2-8d65-eb7a29c2d0ae';
	var examenesHeces_id = exports.examenesHeces_id = '0a7cd863-d974-4029-8d53-f82e03106fe1';
	var examenesCerebroEspinal_id = exports.examenesCerebroEspinal_id = '6a929dcc-661c-4af1-b210-b5dacd91f1d8';
	var examenesFluidoAscitico_id = exports.examenesFluidoAscitico_id = '369140d5-2e68-4c06-a0de-12f8c18e73f3';
	
	//export const examenes_id='999';
	var examenes_id = exports.examenes_id = 'd8c832e4-a800-4de2-ad85-485dc6b59d12';
	
	var imagenes_id = exports.imagenes_id = 'd4e9f034-deb1-48de-b6ec-2fd77ebe275c';
	
	//concepto creado para definir el area del servicio dado
	var ObservacioneAreaServicio_id = exports.ObservacioneAreaServicio_id = '63bdf20f-1dbf-46b7-ae2a-dbfc936bc304';
	
	//concepto creado para guardar la url de la foto de evidencia de entrega de servicio
	var observacionesFotoURL = exports.observacionesFotoURL = '4102718a-a02b-49da-86c9-a296b073610b';
	
	//set de paquetes de dieta -> creado en conceptos como conjunto y agregan miembros
	var paquetesDietetica_id = exports.paquetesDietetica_id = 'ec316aa9-8494-4ec7-9211-a6ad154132a2';
	
	//lugares locations
	var inpatientWard_id = exports.inpatientWard_id = 'b1a8b05e-3542-4037-bbd3-998ee9c40574';
	var laboratory_id = exports.laboratory_id = '7fdfa2cb-bc95-405a-88c6-32b7673c0453';
	var pharmacy_id = exports.pharmacy_id = '7f65d926-57d6-4402-ae10-a5b3bcbf7986';
	var registration_desk = exports.registration_desk = '6351fcf4-e311-4a19-90f9-35667d99a8af';
	
	//users
	var admin_id = exports.admin_id = '30274f4e-f159-11e7-b4fb-506b8d820489';
	
	//uuid de las posibles vias de administracion de medicamentos
	var routes_id = exports.routes_id = '162394AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
	
	//concept class specimen sources uuid
	var specimenSources_id = exports.specimenSources_id = '162476AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
	
	//uuid de un specimen source "ninguno" para resolver el problema de creacion de ordenes que no sean de medicamentos o pruebas de lab -> creado para modulo
	var specimenSourceNA_id = exports.specimenSourceNA_id = '8ced21b0-1084-4516-94c0-48278f0a8ad3';
	
	//specimenSOurces
	var sangre_id = exports.sangre_id = '1000AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
	var orina_id = exports.orina_id = '159994AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
	var sputum_id = exports.sputum_id = '1004AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
	var serum_id = exports.serum_id = '1001AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
	var plasma_id = exports.plasma_id = '1002AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
	var heces_id = exports.heces_id = '159993AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
	var fluidoCerebro_id = exports.fluidoCerebro_id = '159995AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
	var fluidoAscitico_id = exports.fluidoAscitico_id = '162403AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
	
	//uuid de las unidades de medicion de dosis de medicamentos
	var unidades_id = exports.unidades_id = '162384AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
	
	//uuid del concepto de servicios
	var servicios_id = exports.servicios_id = '3ec05ea7-d02d-48c8-bf1c-1da61a411a3d';
	
	//uuid del datatype de servicio num
	var datatype_id = exports.datatype_id = '8d4a4488-c2cc-11de-8d13-0010c6dffd0f';
	
	//uuid conceptclass de servicios
	var conceptclass_id = exports.conceptclass_id = '8d4907b2-c2cc-11de-8d13-0010c6dffd0f';
