import { hamburgerMenu, sidebarContainer, sidebar, openSidebar, clsBtn } from './data.js';
import { cartIcon, cartMenu, clsMenuBtn, openCart } from './cartFunctionality.js';
import { addToCart, cartFunctionality, init } from './setupCart.js';

// addToCart()
// cartFunctionality()
// init()



hamburgerMenu.addEventListener('click', openSidebar);
clsBtn.addEventListener('click', openSidebar);
cartIcon.addEventListener('click', openCart);
clsMenuBtn.addEventListener('click', openCart);

// Variables

const pageTitle = document.querySelector('.page-title');
const domTitle = document.querySelector('.title-dom');
const domProductName = document.querySelector('.prod-name');
const domProductPrice = document.querySelector('.prod-price');
const domProductDescription = document.querySelector('.prod-desc');
const loadingContainer = document.querySelector('.page-loading');
const prodInfo = document.querySelector('.product-info');
const loadingIcon = document.querySelector('.loading');
const singleProduct = 'https://guided-fashion-ecomm-products-api.onrender.com/api/';
let productID;





// Change the title of the docutment to adde the prodcuts name

window.addEventListener('DOMContentLoaded', async () => {
    let urlId = window.location.search.split('').slice(4).join('')
    let res = await fetch(singleProduct + urlId);

    let info = await res.json();

    prodInfo.innerHTML = `<div class="product-image">
   <img src="http://${info[0].image}"
       alt="${info[0].name}">
</div>
<div class="product-details">
   <h1 class="prod-name">${info[0].name}</h1>
   <h5 class="prod-price">${info[0].price}</h5>
   <div class="prod-desc">
      ${info[0].description}
   </div>
   <button class="addToCartBtn" data-id="${info[0].id}">
       ADD TO CART
   </button>
</div>`

    pageTitle.innerHTML = `Product | ${info[0].name} `;
    domTitle.innerHTML = `Home / ${info[0].name}`

    loadingContainer.style.height = '0px';
    loadingIcon.style.display = 'none';

    const { id, field } = info;
    productID = info[0].id;

    const cartBtn = document.querySelector('.addToCartBtn');


    cartBtn.addEventListener('click', function () { addToCart(productID) })
})




