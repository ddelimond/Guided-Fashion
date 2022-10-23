import { hamburgerMenu, sidebarContainer, sidebar, openSidebar } from './data.js'
import { addToCart } from './setupCart.js'


export let cartIcon = document.querySelector('.cart-icon');
export let cartMenu = document.querySelector('.cartMenu');
export let clsMenuBtn = document.querySelector('.cls-cart-btn-container');




export let openCart = () => {

    if (sidebarContainer.classList.contains('show')) { openSidebar(); cartMenu.classList.toggle('open'); }
    else { cartMenu.classList.toggle('open') }
};


export let clsCart = () => { cartMenu.classList.toggle('open') };




// export let addToCart = (elementId) => {
//     console.log(elementId);
//     openCart();
//     setTimeout(clsCart, 1000);
// };

