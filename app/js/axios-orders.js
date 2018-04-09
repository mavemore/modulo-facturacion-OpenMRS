import axios from 'axios';

export const instance = axios.create({
    //baseURL: 'http://localhost:8081/openmrs-standalone/ws/rest',
    baseURL: 'http://localhost:8080/openmrs/ws/rest',
    headers: {'Content-Type': 'application/json'},
    auth: {
        username: 'admin',
        password: 'Admin123'
    }
});

/*Servicio Imagenes*/
export const CLOUDINARY_UPLOAD_PRESET = 'fxtjvkml';
export const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/hleonbecerra2018/image/upload';

/*Conceptos Utilizados*/
//uuid del care setting de inpatients
export const careSettingInpatient_id = 'c365e560-c3ec-11e3-9c1a-0800200c9a66';

//set de cirugias -> creado en conceptos como conjunto y agregan miembros
export const cirugias_id = '0e24b5b6-cd0c-4215-989e-1bac76a013d5';

//set de consultas -> creado en conceptos como conjunto y agregan miembros
export const consultas_id = 'd0aaed00-a4af-4d2f-98d2-36a7148f0220';

//uuid del encounter role de usuario clinico
export const encounterRoleClinician_id = '240b26f9-dd88-4172-823d-4a8bfeb7841f';

//uuid del encounter type de orden aceptada -> creado para modulo
export const encounterTypeOrdenAceptada_id = '08007d58-026e-44e0-92e0-6c1bd0a43a8c';

//uuid del encounter type de orden cancelada -> creado para modulo
export const encounterTypeOrdenCancelada_id = '4a98bb63-d12e-44ce-ba4b-ae27503ff769';

//uuid del encounter type de orden finalizada -> creado para modulo
export const encounterTypeFinalizada_id ='26c0b07f-447f-4506-836c-edacef32886c';

//uuid del encounter type de orden nueva -> creado para modulo
export const encounterTypeOrdenNueva_id = 'bc26c537-023c-4284-b921-bc83bb16101c';

//set de examenes -> creado en conceptos como conjunto y agregan miembros
export const examenes_id = '4896e044-eec5-4295-bd16-a4c806fb5300';

//
export const imagenes_id = '48242b83-020b-4d9e-915a-7734e4dfcfcb';

//concepto creado para definir el area del servicio dado
export const ObservacioneAreaServicio_id = '70885eca-dfe9-4d6a-9dfd-cd2feebd77f3';

//concepto creado para guardar la url de la foto de evidencia de entrega de servicio
export const observacionesFotoURL = '4102718a-a02b-49da-86c9-a296b073610b';

//set de paquetes de dieta -> creado en conceptos como conjunto y agregan miembros
export const paquetesDietetica_id = '767bfd99-0f7c-4c32-83fa-7302c8b3273b';

//uuid de las posibles vias de administracion de medicamentos
export const routes_id = '162394AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';

//concept class specimen sources uuid
export const specimenSources_id ='8d492d0a-c2cc-11de-8d13-0010c6dffd0f';

//uuid de un specimen source "ninguno" para resolver el problema de creacion de ordenes que no sean de medicamentos o pruebas de lab -> creado para modulo
export const specimenSourceNA_id = '7d8ac6b8-c6c8-4eac-9b63-05cc03429b70';

//uuid de las unidades de medicion de dosis de medicamentos
export const unidades_id = '162384AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';

//uuid del concepto de servicios
export const servicios_id ='3ec05ea7-d02d-48c8-bf1c-1da61a411a3d';

//uuid del datatype de servicio num
export const datatype_id = '8d4a4488-c2cc-11de-8d13-0010c6dffd0f';

//uuid conceptclass de servicios
export const conceptclass_id = '8d4907b2-c2cc-11de-8d13-0010c6dffd0f';
-----------------------------------------------------------------------
/*
//uuid del concepto de servicios
export const servicios_id = 'a45d556e-e0c5-4d27-9a0c-17324ff284e3';

//uuid del datatype de servicio num
export const datatype_id = '8d4a4488-c2cc-11de-8d13-0010c6dffd0f';

//uuid conceptclass de servicios
export const conceptclass_id = '8d4907b2-c2cc-11de-8d13-0010c6dffd0f';*/