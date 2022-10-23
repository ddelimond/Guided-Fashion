import { hamburgerMenu, sidebarContainer, sidebar, openSidebar, clsBtn } from './data.js';
import { cartIcon, cartMenu, clsMenuBtn, openCart } from './cartFunctionality.js';
import { addToCart, cartFunctionality, init } from './setupCart.js';

// addToCart();
// cartFunctionality();
// init();

hamburgerMenu.addEventListener('click', openSidebar);
clsBtn.addEventListener('click', openSidebar);
cartIcon.addEventListener('click', openCart);
clsMenuBtn.addEventListener('click', openCart);

