import { hamburgerMenu, sidebarContainer, sidebar, openSidebar, clsBtn, displayProducts, getProducts } from './data.js';
import { cartIcon, cartMenu, clsMenuBtn, openCart } from './cartFunctionality.js';
import { setupStore, store } from './store.js';
import { catArr, storeCopy, createFilterButtons, setupSearch, displayMaxPrice } from './filter.js';
export { allProductsContainer };
import { addToCart, cartFunctionality, init } from './setupCart.js';

// addToCart()
// cartFunctionality()
// init()


// All Products Container
let allProductsContainer = document.querySelector('.all-products');

// Filter Btn Container
let filterBtnContainer = document.querySelector('.filter-btn-container');

window.addEventListener('DOMContentLoaded', getProducts)

// Loading Icon appears while data is being fetched
let loading = document.querySelector('.page-loading');

// EventListeners
hamburgerMenu.addEventListener('click', openSidebar);
clsBtn.addEventListener('click', openSidebar);
cartIcon.addEventListener('click', openCart);
clsMenuBtn.addEventListener('click', openCart);
clsMenuBtn.addEventListener('click', openCart);


// Creates rating Filter Buttons and displays them in the 
// filter button container
filterBtnContainer.innerHTML = createFilterButtons(catArr);

// displays the max price of all the products
displayMaxPrice()

// Gives the user the ability to filter all the products based on their Rating
filterBtnContainer.addEventListener('click', function (e) {

    let category = e.target.dataset.category;
    let filteredArray = storeCopy.filter((product) => { if (product.category === category) { return product } });
    return displayProducts(filteredArray, allProductsContainer);
});


// import  getproducts



const init = async () => {
    if (store.length < 1) {

        const products = await getProducts();


        await setupStore(products.products)


    }
    // Displays products
    displayProducts(store, allProductsContainer);

    // Sets display of the loading element to none 
    loading.style.display = 'none';
    setupSearch(storeCopy);
}
init()


