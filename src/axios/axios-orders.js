import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-app-2ed44.firebaseio.com'
});

export default instance;
