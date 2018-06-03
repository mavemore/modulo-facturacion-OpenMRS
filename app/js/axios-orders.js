import axios from 'axios';

export const instance = axios.create({
    //baseURL: 'http://200.10.147.155:8080/openmrs/ws/rest', base url server espol
    baseURL: 'http://ec2-18-216-59-46.us-east-2.compute.amazonaws.com:8080/openmrs/ws/rest',
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
export const cirugias_id = '360f3493-a7e7-48fb-a093-0c50279c42ab';

//export const consultas_id = 'd0aaed00-a4af-4d2f-98d2-36a7148f0220';
export const consultas_id = 'a2691179-ded4-475e-b9b9-f15c077add5a';

//uuid del encounter role de usuario clinico
export const encounterRoleClinician_id = '240b26f9-dd88-4172-823d-4a8bfeb7841f';

//uuid del encounter type de orden aceptada -> creado para modulo
export const encounterTypeOrdenAceptada_id = '1990e673-5b76-4368-9597-50f63e57289c';

//uuid del encounter type de orden cancelada -> creado para modulo
export const encounterTypeOrdenCancelada_id = 'db4fda22-1cb2-40a4-b16d-4a0dc470612c';

//uuid del encounter type de orden finalizada -> creado para modulo
export const encounterTypeFinalizada_id ='1f19ea32-4473-43a1-b49c-9594983a0320';

//uuid del encounter type de orden nueva -> creado para modulo
export const encounterTypeOrdenNueva_id = 'fd704773-2db3-4ce5-8f3b-f448f884d9d9';

//uuid del encounter type de orden pagada -> creado para modulo
export const encounterTypeOrdenPagada_id = 'fd4d3a44-8ade-4392-996e-e6bccf510397';

//set de examenes-> creado en conceptos como conjunto y agregan miembros
export const examenesOrina_id = 'b2b96144-f692-41f5-8e45-286ca22b74cd';
export const examenesSputum_id = 'f5b89c12-a695-432b-a1d1-e48386cc546e';
export const examenesSangre_id = '86d96764-0de0-4167-86e0-610935144ead';
export const examenesSerum_id = 'daec257f-ecf4-48bf-8a82-604d7acd75a0';
export const examenesPlasma_id = '40b0bc09-e273-401f-ac37-7d402c189da1';
export const examenesHeces_id = 'c11f5bd6-1383-4610-ac86-ff4715e89d1c';
export const examenesCerebroEspinal_id = '68689b92-b896-4358-8b6b-7f00a2043547';
export const examenesFluidoAscitico_id = '700b07fb-d004-4904-bff6-6bba361ef013';

//export const examenes_id='999';
export const examenes_id='d8c832e4-a800-4de2-ad85-485dc6b59d12';

export const imagenes_id = 'efea207f-0719-4397-a511-dd1693ecb820';

//concepto creado para definir el area del servicio dado text
export const ObservacioneAreaServicio_id = '2d15616a-f185-43cb-b456-84706ed38462';

//concepto creado para guardar la url de la foto de evidencia de entrega de servicio
export const observacionesFotoURL = '4102718a-a02b-49da-86c9-a296b073610b';

//set de paquetes de dieta -> creado en conceptos como conjunto y agregan miembros
export const paquetesDietetica_id = '68d4bd94-d254-46a3-90ae-b511bbb145d5';

//lugares locations
export const inpatientWard_id = 'b1a8b05e-3542-4037-bbd3-998ee9c40574';
export const laboratory_id = '7fdfa2cb-bc95-405a-88c6-32b7673c0453';
export const pharmacy_id = '7f65d926-57d6-4402-ae10-a5b3bcbf7986';
export const registration_desk = '6351fcf4-e311-4a19-90f9-35667d99a8af';

//users
export const admin_id = '9024dd9e-65f9-11e8-8cd4-021ab3be8962';

//uuid de las posibles vias de administracion de medicamentos
export const routes_id = '162394AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';

//concept uuid specimen sources uuid
export const specimenSources_id ='162476AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';


//uuid de un specimen source "ninguno" para resolver el problema de creacion de ordenes que no sean de medicamentos o pruebas de lab -> creado para modulo
export const specimenSourceNA_id = 'e9265398-880a-4c00-9c9a-1adf5ae00d6e';

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
