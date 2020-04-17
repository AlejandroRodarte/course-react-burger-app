import axios from '../../axios/axios-auth';

const signup = async ({ credentials, isSignUp }) => {

    try {

        const url = 
            isSignUp ? 
            `:signUp?key=${process.env.REACT_APP_FIREBASE_API_KEY}` :
            `:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;

        const { data } = await axios.post(url, {
            ...credentials,
            returnSecureToken: true
        });

        return data;

    } catch (e) {
        throw e;
    }

};

export default signup;
