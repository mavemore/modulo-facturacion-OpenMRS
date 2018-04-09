import axios from 'axios';

export const instance = axios.create({
    baseURL: 'http://localhost:8081/openmrs-standalone/ws/rest',
    //baseURL: 'http://localhost:8080/openmrs/ws/rest',
    headers: {'Content-Type': 'application/json'},
    auth: {
        username: 'admin',
        password: 'Admin123'
    }
});
