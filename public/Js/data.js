import { cartIcon, cartMenu, clsCart } from './cartFunctionality.js'
import { addToCart } from './setupCart.js'


// Variables
let allProductsURL = 'https://guided-fashion-ecomm-products-api.onrender.com/api/products';

// const options = {
//     method: 'GET',
//     headers: {
//         'X-RapidAPI-Key': '5aba3f31d2msh39c805469004bc2p14ac8bjsna14d2a37384d',
//         'X-RapidAPI-Host': 'dbm.p.rapidapi.com'
//     }
// };


// Exports

// function takes the product url and options to fetch data from the API
export let getProducts = async () => {
    let response = await fetch(allProductsURL).catch((err) => {
        throw (Error(`Your request return ${err}`))
    });
    return response.json()
};


// Feature Product Container
export let featureProductsContainer = document.querySelector('.featured-container');

// Hamburger 
export let hamburgerMenu = document.querySelector('.hamburger');

// Sidebar Container
export let sidebarContainer = document.querySelector('.nav-sidebar-overlay');

// Sidebar
export let sidebar = document.querySelector('.sidebar');

// function that allows sidebar to open
export let openSidebar = () => {

    if (cartMenu.classList.contains('open')) { clsCart(); sidebarContainer.classList.toggle('show'); }
    else {
        sidebarContainer.classList.toggle('show');
    }
    if (sidebarContainer.classList.contains('show')) { sidebar.style.transform = 'scale(1)' } else { sidebar.style.transform = 'scale(0)' }
};


// Close Button
export let clsBtn = document.querySelector('.cls-btn');

// Loading Container
export let loadingContainer = document.querySelector('.loading-container');

// Function takes a name that your would like to add as a key and the products that you 
// would like to add as its value and adds it to the local storeage
export const setStorageItem = (name, products) => {




    //products array is stored in local storage to be accessible on different pages 
    localStorage.setItem(name, JSON.stringify(products));
}

// functions grabs the stated values stored in the item in local storeage and returns it 
// if something is in local storage with the stated key it is returned or a empty array 
// is returned
export const getStorageItem = (item) => {

    let storageItem = localStorage.getItem(item);
    if (storageItem) {
        storageItem = (JSON.parse(localStorage.getItem(item)))
    }
    else {
        storageItem = []
    }
    return storageItem;

}

// Takes the amount stored in localstorage and turns into proper currency format 
// instead of pennies

export let formatPrice = (price) => {



    let amt = price / 100;

    let usd = new Intl.NumberFormat("en-US",
        { style: "currency", "currency": "USD" }).format(amt)

    return usd

}




// function goes through the products array stored in the local storage and tunes it into 
// html to be displayed in the Featured section.
export let displayProducts = (products, element, filters) => {

    element.innerHTML = products.map((product) => {



        //if the image property of a item in the products array has an comma the function will slice
        // the propertys string up to that comma to return on image then id turns the remainder of the data
        // to html to be displayed
        let img = product.image;

        // if (img.includes(',')) {
        //     let index = img.split('').findIndex(letter => letter === ',');
        //     img = img.split('').slice(0, index).join('')
        // }
        // else { img }


        return `<div data-category="${product.category}" class="product">
        <img src="${img}" alt="${product.name}">

        <div class="product-icon-container">
            <a class="product-icon" href="product.html?id=${product.id}"><i
                    class="fa-solid fa-magnifying-glass search-icon "></i></a>
            <button data-id="${product.id}" class="product-icon product-cart"><i class="fa-solid fa-cart-shopping add-to-cart-icon "></i></button>
        </div>
        <h5 class="product-name">${product.name}</h5>
        <span class="price">${formatPrice(product.amount)}</span>
    </div>`
    }).join('');

    if (filters) { return; }

    element.addEventListener('click', function (e) {
        let parent = e.target.parentElement;

        if (parent.classList.contains('product-cart')) { addToCart(parent.dataset.id) }
    })
}

export let setStore;



// // export let toggleContainer = document.querySelector('.toggle-container');
// // export let toggleCircle = document.querySelector('.toggle-circle');
// // export let enableDarkMode = () => { toggleCircle.classList.toggle('toggle') };
// // export let settingsIcon = document.querySelector('.settings-container');
// // export let settingsMenu = document.querySelector('.settings-menu');
// // export let openSettingsMenu = () => { settingsMenu.classList.toggle('opn') };







