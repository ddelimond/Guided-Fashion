

// IMPORTS
import { hamburgerMenu, sidebarContainer, sidebar, openSidebar, clsBtn, getProducts, displayProducts, loadingContainer, } from './data.js';
import { featureProductsContainer } from './data.js';
import { cartIcon, cartMenu, clsMenuBtn, openCart } from './cartFunctionality.js';
import { store, setupStore } from './store.js';
// import { addToCart, cartFunctionality, init } from './setupCart.js';



// import { toggleCircle } from './data.js';
// import { toggleContainer } from './data.js';
// import { enableDarkMode } from './data.js';
// import { settingsIcon } from './data.js';
// import { settingsMenu } from './data.js';
// import { openSettingsMenu } from './data.js';


// Event Listeners


hamburgerMenu.addEventListener('click', openSidebar);
clsBtn.addEventListener('click', openSidebar);
cartIcon.addEventListener('click', openCart);
clsMenuBtn.addEventListener('click', openCart);
// toggleContainer.addEventListener('click', enableDarkMode);
// settingsIcon.addEventListener('click', openSettingsMenu)





// Function Starts Gathering API Information  

const start = async () => {
    // Loading Icon appears while data is being fetched
    featureProductsContainer.innerHTML = `<div class="loading"></div>`;

    //information is fetched from API
    const products = await getProducts();

    // if the api returns data then the data returned is immediatly stored in local storage
    // or an error is returned
    if (products) {

        setupStore(products.products);

        // if the rating of the fetched data is a 1 it is returnded and displayed int the featured
        // products container 
        const featured = store.filter((item) => item.amount <= 2099)

        displayProducts(featured, featureProductsContainer);
    }

    // if data is not returned from the API the following error is displayed
    else {
        // Fails to return Data  
        featureProductsContainer.innerHTML = `OOPS... We were unable to return any products`


    }
}

// start function is immediatly invoked
start();






