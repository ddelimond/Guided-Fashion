// imports
import { getStorageItem, setStore, setStorageItem, formatPrice } from "./data.js";
import { openCart, clsCart } from "./cartFunctionality.js";
import { findProduct } from "./store.js";
import { addToCartDom } from "./addToCartDom.js";

const cartItemCountDom = document.querySelector('.item-amount');
const cartItemsDom = document.querySelector('.item-container');
const cartTotalDom = document.querySelector('.total');
const plus = document.querySelector('.increase');
const minus = document.querySelector('.decrease');
const cartItemDomElement = [...document.querySelectorAll('.item-amount')];



// let cart = getStorageItem('cart');
let cart = getStorageItem('cart');

export let addToCart = (id) => {
    openCart();
    let item = cart.find((cartItem) => { if (cartItem.id === id) { return cartItem } })


    if (!item) {
        let product = findProduct(id);
        product = { ...product, amount: 1 };
        cart = [...cart, product];

        addToCartDom(product)
    }
    else {

        cart = getStorageItem('cart');
        const amount = increaseAmount(id);

        let items = [...cartItemsDom.querySelectorAll('.item-amount')]

        items.find(cartItem => cartItem.dataset.id === id).textContent = amount
        // DomAmt.textContent = amount;

    }

    // displays cart total in the dom
    displayCartTotal();

    // displays the amount of items in a cart
    displayCartItemCount();

    // set item in local storage
    setStorageItem('cart', cart);

    // closes cart automatically
    setTimeout(clsCart, 1000);
};



// display cart total
function displayCartTotal() {

    const total = cart.reduce((acc, num) => {
        return acc += num.price * num.amount
    }, 0);
    document.querySelector('.total').textContent = `Total : ${formatPrice(total)}`;
}

// display cart items in the dom while moving from page to page 
function displayCartItemsDom() {
    cart.forEach((cartItem) => { addToCartDom(cartItem) })
}

// displays cart  item count
function displayCartItemCount() {

    const amount = cart.reduce((acc, num) => acc += num.amount, 0)
    document.querySelector('.item-count').textContent = amount;
}

function increaseAmount(id) {
    let newAmount;
    cart = cart.map(cartItem => {

        if (cartItem.id === id) {
            newAmount = cartItem.amount + 1;
            cartItem = { ...cartItem, amount: newAmount };
            return cartItem
        }
        else {
            return cartItem
        }
    })

    return newAmount
}


function decreaseAmount(id) {
    let newAmount;
    cart = cart.map(cartItem => {

        if (cartItem.id === id) {
            newAmount = cartItem.amount - 1;
            cartItem = { ...cartItem, amount: newAmount };
            return cartItem
        }
        else {
            return cartItem
        }
    })

    return newAmount
}




function remove(id) {

    cart = cart.filter(cartItem => { return cartItem.id !== id })

    displayCartItemCount()
    displayCartTotal()
    setStorageItem('cart', cart)


}

export function cartFunctionality() {
    cartItemsDom.addEventListener('click', function (e) {
        const element = e.target;
        const parent = e.target.parentElement.parentElement.parentElement;
        const id = element.dataset.id;
        const parentID = parent.dataset.id;

        if (element.classList.contains('remove')) {

            parent.remove()
            remove(parentID);
        }
        else if (element.classList.contains('increase')) {


            const newAmount = increaseAmount(element.nextElementSibling.dataset.id)
            element.nextElementSibling.textContent = newAmount;

            displayCartItemCount()

            displayCartTotal()

            setStorageItem('cart', cart)

        }
        else if (element.classList.contains('decrease')) {


            const newAmount = decreaseAmount(id)


            if (newAmount === 0) { remove(id); element.parentElement.parentElement.remove() }


            element.previousElementSibling.textContent = newAmount;

            displayCartItemCount()

            displayCartTotal()

            setStorageItem('cart', cart)

        }
    })
}


export const init = () => {


    // display cart item count (total) in the dom while moving from page to page 
    displayCartItemCount()
    // display  sync cart item total in the dom while moving from page to page 
    displayCartTotal()
    // display cart items in the dom while moving from page to page
    displayCartItemsDom()
    // removes ,increase and decrease amount
    cartFunctionality()
}
init()