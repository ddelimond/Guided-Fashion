export { store, setupStore }
import { setStorageItem } from './data.js'
import { getStorageItem } from './data.js'

// Variables

// function that gets the key name from local storage and returns the products array that 
// has be stored
// let store = getStorageItem('store');
let store;

// function returns the specific information that I want to use from the API
const setupStore = (arr) => {

    store = arr.map((product) => {

        let amount = parseInt(product.price.split('').filter(letter => letter !== '$').join(''), 10) * 100;
        let image = "http://" + product.image;

        let { id, name, description, category, colors, material, price } = product

        price = parseInt(price.split('').filter(l => l !== '$').join(''), 10) * 100;



        return { id, amount, image, name, description, category, colors, price };
    });
    setStorageItem('store', store);
};

store = getStorageItem('store');

export let findProduct = (id) => {
    let product = store.find(product => product.id === id)
    return product
};






