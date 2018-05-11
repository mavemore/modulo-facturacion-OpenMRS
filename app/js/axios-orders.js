import axios from 'axios';

export const instance = axios.create({
    baseURL: 'http://200.10.147.155:8081/openmrs/ws/rest',
    //baseURL: 'http://localhost:8080/openmrs/ws/rest',
    headers: {'Content-Type': 'application/json'},
    auth: {
        username: 'admin',
        password: 'Admin123'
    }
});


/*Conceptos Utilizados*/
//uuid del care setting de inpatients
export const careSettingInpatient_id = 'c365e560-c3ec-11e3-9c1a-0800200c9a66'

//set de cirugias -> creado en conceptos como conjunto y agregan miembros
export const cirugias_id = 'ced6da8b-76c6-4d01-b93b-d5c54f585bbd';

//export const consultas_id = 'd0aaed00-a4af-4d2f-98d2-36a7148f0220';
export const consultas_id = '81b8ceb4-64c9-4706-9fd1-dea67b797f6c';

//uuid del encounter role de usuario clinico
export const encounterRoleClinician_id = '240b26f9-dd88-4172-823d-4a8bfeb7841f';

//uuid del encounter type de orden aceptada -> creado para modulo
export const encounterTypeOrdenAceptada_id = '34602d34-d15c-4c7e-bf2a-012c72aeabde';

//uuid del encounter type de orden cancelada -> creado para modulo
export const encounterTypeOrdenCancelada_id = '	e6e7a42f-a8d3-4ac9-9018-9e589c89f9df';

//uuid del encounter type de orden finalizada -> creado para modulo
export const encounterTypeFinalizada_id ='f06bf0be-6b50-4cfd-85ac-6cb286ea781f';

//uuid del encounter type de orden nueva -> creado para modulo
export const encounterTypeOrdenNueva_id = '0becaac6-3e3c-4cb0-955c-2baf6d05b755';

//uuid del encounter type de orden pagada -> creado para modulo
export const encounterTypeOrdenPagada_id = '108c7b76-4559-47c3-8e82-892a71fedec0';

//set de examenes-> creado en conceptos como conjunto y agregan miembros
export const examenesOrina_id = '3648522a-07cf-4c4c-9f63-a5e489f41a53';
export const examenesSputum_id = '097735c0-28f9-45a2-a8e2-77c058fa233d';
export const examenesSangre_id = '3486fcfc-e343-417b-92a1-829a00c89402';
export const examenesSerum_id = 'b8620406-8065-47a4-92ce-bb648748ebb1';
export const examenesPlasma_id = '5d898978-3334-44b2-8d65-eb7a29c2d0ae';
export const examenesHeces_id = '0a7cd863-d974-4029-8d53-f82e03106fe1';
export const examenesCerebroEspinal_id = '6a929dcc-661c-4af1-b210-b5dacd91f1d8';
export const examenesFluidoAscitico_id = '369140d5-2e68-4c06-a0de-12f8c18e73f3';

//export const examenes_id='999';
export const examenes_id='d8c832e4-a800-4de2-ad85-485dc6b59d12';

export const imagenes_id = 'd4e9f034-deb1-48de-b6ec-2fd77ebe275c';

//concepto creado para definir el area del servicio dado
export const ObservacioneAreaServicio_id = '63bdf20f-1dbf-46b7-ae2a-dbfc936bc304';

//concepto creado para guardar la url de la foto de evidencia de entrega de servicio
export const observacionesFotoURL = '4102718a-a02b-49da-86c9-a296b073610b';

//set de paquetes de dieta -> creado en conceptos como conjunto y agregan miembros
export const paquetesDietetica_id = 'ec316aa9-8494-4ec7-9211-a6ad154132a2';

//lugares locations
export const inpatientWard_id = 'b1a8b05e-3542-4037-bbd3-998ee9c40574';
export const laboratory_id = '7fdfa2cb-bc95-405a-88c6-32b7673c0453';
export const pharmacy_id = '7f65d926-57d6-4402-ae10-a5b3bcbf7986';
export const registration_desk = '6351fcf4-e311-4a19-90f9-35667d99a8af';

//users
export const admin_id = '30274f4e-f159-11e7-b4fb-506b8d820489';

//uuid de las posibles vias de administracion de medicamentos
export const routes_id = '162394AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';

//concept class specimen sources uuid
export const specimenSources_id ='8d492d0a-c2cc-11de-8d13-0010c6dffd0f';


//uuid de un specimen source "ninguno" para resolver el problema de creacion de ordenes que no sean de medicamentos o pruebas de lab -> creado para modulo
export const specimenSourceNA_id = '8ced21b0-1084-4516-94c0-48278f0a8ad3';

//specimenSOurces
export const sangre_id = '1000AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
export const orina_id = '159994AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
export const sputum_id = '1004AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
export const serum_id = '1001AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
export const plasma_id = '1002AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
export const heces_id = '159993AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
export const fluidoCerebro_id = '159995AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
export const fluidoAscitico_id = '162403AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';

//uuid de las unidades de medicion de dosis de medicamentos
export const unidades_id = '162384AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';


//uuid del concepto de servicios
export const servicios_id ='3ec05ea7-d02d-48c8-bf1c-1da61a411a3d';

//uuid del datatype de servicio num
export const datatype_id = '8d4a4488-c2cc-11de-8d13-0010c6dffd0f';

//uuid conceptclass de servicios
export const conceptclass_id = '8d4907b2-c2cc-11de-8d13-0010c6dffd0f';