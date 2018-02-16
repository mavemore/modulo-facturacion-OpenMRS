import axios from 'axios';

export const instance = axios.create({
    //baseURL: 'https://react-my-burger-b36e2.firebaseio.com/',
    baseURL: 'https://react-openmrs.firebaseio.com/'
});
