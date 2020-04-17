import axios from '../../axios/axios-orders';

const getIngredients = async () => {

    try {
        const { data: ingredients } = await axios.get('/ingredients.json');
        return ingredients;
    } catch (e) {
        throw e;
    }

};

export default getIngredients;
