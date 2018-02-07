import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8081/openmrs-standalone/ws/rest/v1',
    headers: {'X-Requested-With': 'XMLHttpRequest'},
    auth: {
        username: 'admin',
        password: 'Admin123'
    }
});

export default instance;