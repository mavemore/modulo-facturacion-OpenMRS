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

//set de examenes-> creado en conceptos como conjunto y agregan miembros
export const examenesSangre_id = '29696d9d-2c84-4ad9-a6f0-89535467306e';
export const examenesOrina_id = 'a4cf2d34-224f-4e3b-8cc9-a93b6e566ce9';
export const examenesSputum_id = '22122cae-2ee7-40bf-a2ff-35afea6efdf1';
export const examenesSerum_id = '849f4301-70e9-4318-a7db-25d469b3d662';
export const examenesPlasma_id = '172aaa43-8cdf-4a3f-99e9-fd4e27bb4538';
export const examenesHeces_id = '1491c8e4-85d7-44f7-8b61-cd7f11e7114d';
export const examenesCerebroEspinal_id = '272b7892-0721-42eb-aa0b-c7718110fc15';
export const examenesFluidoAscitico_id = '28142441-5424-46e0-9530-b9bf6a451359';

export const examenes_id='999';

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
//-----------------------------------------------------------------------

//uuid del concepto de servicios
//export const servicios_id = 'a45d556e-e0c5-4d27-9a0c-17324ff284e3';

//uuid del datatype de servicio num
//export const datatype_id = '8d4a4488-c2cc-11de-8d13-0010c6dffd0f';

//uuid conceptclass de servicios
//export const conceptclass_id = '8d4907b2-c2cc-11de-8d13-0010c6dffd0f'