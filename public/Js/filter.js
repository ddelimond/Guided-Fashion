import { displayProducts } from './data.js';
import { store } from './store.js'
import { allProductsContainer } from './products.js'

// copy of store array
let storeCopy = [...store];

// Creates a object of all the ratings then puts them in a array
let catArr = Array.from(new Set(storeCopy.map((prodcut) => { return prodcut.category }))).sort((a, b) => a - b);

// Dynamically Creates filter buttons from the unique ratings array

let createFilterButtons = function (catArr) {

    return catArr.map((cat) => {
        return `<button data-category="${cat}">${cat}</button>`
    }).join('')
}

// Function checks the value the user enters and sees if 
// it matches the name of any item in the store, then displays it

let setupSearch = function (arr) {

    // Form element
    let form = document.querySelector('.search');

    // Seach Input
    let inputName = document.querySelector('.search-field');

    // Event listener triggered when user types in the form
    form.addEventListener('keyup', function () {

        // The users input value, what they typed in.
        const inputValue = document.querySelector('.search-field').value;

        // a new array that is created containing all the products whose name
        // includes the users value
        let filteredArray = arr.filter((product) => {
            if (product.name.toLowerCase().includes(inputValue.toLowerCase())) { return product }
        });


        // Condition that states that if the new array contains objects to display them 
        // in the product container, if it is empty, inform the user that nothing matched
        // their search 
        if (filteredArray.length > 0) {
            return (displayProducts(filteredArray, allProductsContainer, true))
        }
        else {
            allProductsContainer.innerHTML = `Sorry... Nothing matches your search`
        }

    });
}


let displayMaxPrice = () => {
    let priceInput = document.querySelector('.price-filter');
    let priceValue = document.querySelector('.max-price-container')
    let maxPrice = [...store].map((product) => { return parseInt(product.amount, 10) / 100 });
    maxPrice = Math.max(...maxPrice);
    priceInput.value = maxPrice;
    priceInput.max = maxPrice;
    priceInput.min = 0;
    priceValue.textContent = `Value: $${maxPrice}`;

    return priceInput.addEventListener('input', function () {
        let storeCopy = [...store];

        let value = parseInt(priceInput.value, 10);

        let priceFilteredArr = storeCopy.filter((product) => { if (product.amount / 100 === value) { return product } });

        priceValue.textContent = `Value: $${value}`;

        if (priceFilteredArr.length === 0) { allProductsContainer.innerHTML = `Sorry... Nothing matches your search` }
        else { displayProducts(priceFilteredArr, allProductsContainer, true) };
    })

}


export { storeCopy, catArr, createFilterButtons, setupSearch, displayMaxPrice };

