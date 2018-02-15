import axios from 'axios';

export const instance = axios.create({
    baseURL: 'localhost:8082/openmrs-standalone/ws/rest/v1',
    //baseURL: 'http://localhost:8080/openmrs/ws/rest/v1',
    headers: {'Content-Type': 'application/json'},
    auth: {
        username: 'admin',
        password: 'Admin123'
    }
});
