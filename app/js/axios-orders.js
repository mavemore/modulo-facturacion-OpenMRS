import axios from 'axios';

export const instance = axios.create({
    baseURL: 'http://localhost:8080/openmrs/ws/rest/v1',
    headers: {'X-Requested-With': 'XMLHttpRequest'},
    auth: {
        username: 'admin',
        password: 'Admin123'
    }
});
